la unica forma de ir rapido es ir bien

### cohesion y acoplamiento

| alta cohesion (SRP)                                         | bajo acoplamiento (OCP y DIP)                |
| ----------------------------------------------------------- | -------------------------------------------- |
| todos los metodos de la clase trabajan con los mismos datos | los modulos conocen lo minimo de los demas   |
| la clase tiene un proposito unico y bien definido           | cambiar una implementacion no afecta a otros |
| facil de entender, testear y modificar                      | componentes reemplazables e intercambiables  |
| cambios localizados: un cambio no se propaga                | posibilita el testing unitario con mocks     |
# SRP - Single responsibility principle
si dos departamentos (rrhh, logistica, contabilidad ) pueden pedir cambios sobre la misma clase, hay violacion SRP

- Alta cohesión: todo lo que está en la clase pertenece a la misma responsabilidad 
- Bajo acoplamiento: aislar cambios previene efectos secundarios 
- Facilita el testing unitario: cada clase tiene un propósito único 
- No confundir con «una sola función» — una clase puede tener muchos métodos relacionados

violacion SRP, clase dios:
```java
class OrderService {
	public void process(Order order) {
	// Responsabilidad 1: Validacién de dominio
	if (order.getTtems().isEmpty())
		throw new IllegalArgumentException("Order has no items");
	
	// Responsabilidad 2: Reglas de negocio — descuento
	if (order.getCustomer().isVip())
		order.setTotal(order.getTotal() * 8.8);

	// Responsabilidad 3: Persistencia / infraestructura
	Connection c = DriverManager. getConnection("jdbc:mysql://prod/db");
	Preparedstatement st = c.prepareStatement("INSERT INTO orders ...");
	st.execute();
	
	// Responsabilidad 4: Notificaciones
	SmtpClient smtp = new SmtpClient("smtp. company.com”, 587);
	smtp.send(order. getCustomer() .getEnail(), "Tu orden fue confirmada");
	
	// Responsabilidad 5: Logging / auditoria
	Logger. getLogger("Orderservice”) . info("Processed: " + order.getTd());
	}
}
```
refactor de la clase dios:
```java
// Cada interfaz pertenece a un actor diferente del negocio
interface OrderValidator { void validate(Order order); } // equipo de dominio
interface DiscountPolicy { double apply(Order order); }  // equipo de pricing
interface OrderRepository { void save(Order order); }      // equipo de DB
interface Notifier { void notify(Order order); }  // equipo de comms

class Orderservice {
	private final Ordervalidator validator;
	private final DiscountPolicy discount;
	private final OrderRepository repo;
	private final Notifier        notifier;
	
	// Constructor injection — cada dependencia es reemplazable
	public OrderService(Ordervalidator v, DiscountPolicy d,
						OrderRepository r, Notifier n) {
		this.validator = v; this.discount = d;
		this.repo = r;      this.notifier = n;
	}
	
	public void process(Order order) {
	validator.validate(order);
	order.setTotal(discount.apply(order));
	repo.save(order);
	notifier.notify(order);
	}
```

detectar violaciones SRP
- nombre vago
- muchos imports
	- si mezcla IO, DB, HTTP, tiene multiple capaz mezcladas
- test dificiles
- multiples actores

#### SRP - arquitectura resultante
![[Pasted image 20260505060216.png]]

# OCP - Open-closed principle. Abierto para extension, cerrado para modificacion
- reduce probabilidad de bugs al no tocar codigo que ya funciona
- el codigo existente puede tener tests - no rompemos tests al extender

violacion OCP
```java
public double calcularTotal(Order order) {
	double total = order. getsubtotal();
	// Agregar un nuevo tipo = modificar aqui = riesgo de romper los demas
	if (order. getType().equals("VIP")) {
		total *- 0.80;         // 20% descuento
	} else if (order.getType().equals("STUDENT")) {
		total *= 0.85;         // 15% descuento
	} else if (order.getType().equals("EMPLOYEE")) {
		total *= 0.75;         // 25% descuento
	} else if (order.getType().equals("BLACKFRIDAY")) {
		total *= 0.60;         // 40% descuento
	} else if (order.getType().equals("PARTNER")) {
		total *= 0.70;         // 30% descuento
	}
	// Qué pasa si se agrega "FLASH SALE"? » modificar aqui de nuevo
	
	return total;
}
```
OCP - patron strategy
```java
// Abstraccién cerrada para modificacion
interface Discountpolicy {
	double apply(Order order);
	boolean appliesTo(Order order); // auto-seleccion
}

// cada politica es una clase independiente  abierta para extension
Class VipDiscount implements DiscountPolicy {
	public double apply(Order o)      { return o.getSubtotal() * 0.80; }
	public boolean appliesTo(Order o) { return o.getCustomer().Isvip(); }
}

Class StudentDiscount implements DiscountPolicy {
	public double apply(Order o)      { return o.getSubtotal() * 0.85; }
	public boolean appliesTo(Order o) { return o.getCustomer().IsStudent(); }
}

Class FlashSaleDiscount implements DiscountPolicy { // nueva » sin tocar nada
public double apply (Order o)      { return o.getsubtotal() * 0.55;}
public boolean appliesTo(Order o) { return FlashSaleService.isActive(); }
}

// orderservice nunca cambia al agregar politicas
Class orderservice (
	private final List<DiscountPolicy> policies;
	public double calcularTotal(Order order) {
	return policies.strean()
		.filter(p -> p.appliesTo(order))
		.findFirst()
		.map(p -> p.apply(order))
		.orElse(order.getsubtotal());
	}
}
```

recap [[patrones de diseno]] strategy y template:
- Strategy: 
	- **Qué hace:** Permite seleccionar un algoritmo específico en tiempo de ejecución, encapsulando variantes en clases separadas que implementan una misma interfaz.
	- **Cuándo usarlo:** Cuando tienes muchas clases similares que solo difieren en su comportamiento, o cuando necesitas varias formas de realizar una acción (ej. diferentes métodos de pago: tarjeta, PayPal).
	- **Beneficio:** Evita estructuras condicionales (`if`/`switch`) complejas, promoviendo flexibilidad y el principio abierto/cerrado.
- Template:
	- **Qué hace:** Define la estructura (pasos) de un algoritmo en una clase abstracta, obligando a las subclases a implementar ciertos pasos sin cambiar la estructura general.
	- **Cuándo usarlo:** Cuando varios algoritmos comparten una estructura común, pero tienen variaciones en subpasos específicos.
	- **Beneficio:** Promueve la reutilización de código al mantener la lógica invariable en la clase superior, evitando la duplicación.

### que abrir (extender) y que cerrar (proteger)
![[Pasted image 20260505061744.png]]

# LSP - Liskov substitution principle
- Cualquier lugar que espere un tipo base T debe funcionar correctamente con un subtipo S 
- El subtipo no debe fortalecer precondiciones (exigir más del cliente) 
- El subtipo no debe debilitar postcondiciones (garantizar menos resultados) 
- El subtipo no debe lanzar excepciones que el supertipo no declara 
- Las invariantes del supertipo deben preservarse en el subtipo

violacion LSP
```java
class Account { 
	protected double balance; 
	public void deposit(double amount) { balance += amount; } 
	public void withdraw(double amount) { balance -= amount; } // contrato 
} 
	
// ⚠ ⚠ Viola LSP: cambia el comportamiento prometido por Account 
class FixedTermDeposit extends Account { 
	@Override public void withdraw(double amount) { 
		// El cliente de Account NO espera esta excepción 
		throw new UnsupportedOperationException( "No se puede retirar antes del vencimiento"); 
		}
	} 
		
// Código cliente: explota si se le pasa FixedTermDeposit 
void processTransfer(Account from, Account to, double amount) { 
		from.withdraw(amount); // ← RuntimeException si from es FixedTermDeposit 
		to.deposit(amount); 
	} 
// LSP roto: el cliente tiene que conocer el subtipo concreto → alto acoplamiento
```

LSP refactor:
```java
// Contratos separados por capacidad real
interface Depositable { void deposit(double amount); }
interface Withdrawable { void withdraw(double amount); }

// Cuenta corriente cumple ambos contratos — sustitucién segura
class CheckingAccount implements Depositable, Withdrawable {
	public void deposit(double a) { balance += a; }
	public void withdraw(double a) {
		if (a > balance) throw new InsufficientFundsException(); // esto SI es esperado
		balance -= a;
	}
}

// Plazo fijo solo promete depésito — sin mentiras
class FixedTermDeposit implements Depositable {
	public void deposit(double a) { balance += a; }
// No hay withdraw ~ el tipo lo comunica al compilador
}

// Funcion que solo acepta cuentas que realmente soportan retiro
void processTransfer (Withdrawable from, Depositable to, double amount) {
	from.withdraw(amount);  // seguro: garantizado por el tipo
	to.deposit(amount);
}	
```
### Señales de violación y reglas prácticas
- instanceof/type of en el cliente
- UnsupportedOperationException
	- implementar una interfaz con metodos vacios o que lanzan excepcion es violar el contrato
- override que elimina comportamiento
- tests que dependen del subtipo

# ISP - Interfaces pequeñas y cohesivas
- ISP y SRP son complementarios: SRP aplica cohesión a clases, ISP a interfaces 
- Un cambio en un método de la interfaz afecta a todos sus clientes aunque no usen ese método 
- Interfaces pequeñas permiten combinaciones más flexibles (múltiples interfaces) 
- Mejor: muchas interfaces específicas que una sola de propósito general

```java
// Interfaz gorda — mezcla responsabilidades de distintos actores
interface Worker {
	void work();        // relevante para todos
	void eat();         // solo relevante para hunanos
	void sleep();       // solo relevante para humanos
	void requestLeave(); // solo relevante para empleados con contrato
	void receiveBonus(); // solo relevante para empleados
}

// Robot esta forzado a implementar cosas que no tienen sentido
Class Robot implements Worker {
	public void work()        { /* hace su tarea */ }
	public void eat()         { /* stub vacio — no tiene sentido */ }
	public void sleep()       { /* stub vacio — no tiene sentido */ }
	public void requestLeave() { throw new UnsupportedoperationException(); }
	public void receiveBonus() { throw new UnsupportedoperationException(); }
}
// Problema extra: si Worker cambia (ej: se agrega clocking()), Robot debe recompilar
// aunque el cambio no le concierna en absoluto
```

ISP - refactor
```java
// Interfaces segregadas por dominio
interface Workable  { void work(); }
interface Feedable {void eat(); void sleep(); }
interface Enmployable  { void requestLeave(); void receiveBonus(); }

// Combinaciones naturales mediante miltiples interfaces
class HumanEmployee implements Workable, Feedable, Employable {
	public void work()
	public void eat()
	public void sleep()
	public void requestLeave()
	public void receiveBonus()
}

// Robot. solo pronete lo que puede cumplir
class Robot implements Workable {
	public void work() { /* ejecuta tarea */ }
	// sin stubs, sin excepciones ~ clean
}

// Contractor: trabaja y cobra, pero no pide licencias
class Contractor implements Workable, Employable {
	public void work()
	public void requestLeave()
	public void receivesonus()
}
```

# DIP - Depender de abstracciones, no de concreciones

> regla 1: modulos de alto nivel (logica de negocio, casos de uso) no deben depender de modulos de bajo nivel (DB, SMTP, HTTP). Deberan depender de abstracciones (interfaces)

> regla 2: abstracciones vs detalles.
> detalles dependen de abstracciones. La interfaz la define el modulo de alto nivel, no el de bajo nivel

violacion DIP
```java
class OrderService {
	// Dependencias concretas instanciadas directamente
	private MySQLDatabase db     = new MySQLDatabase("jdbc:mysql://prod");
	private StripeGateway payment = new StripeGateway(STRIPE_API_KEY);
	private SmtpMailSender mailer = new SmtpMailSender(“smtp.company.com”);
	private FileAuditlogger logger = new FileAuditLogger("/var/log/orders.log");
	
	public void process(Order order) {
	db.save(order);         // « no se puede cambiar a PostgresQL
	payment.charge(order);  // « no se puede cambiar a PayPal
	mailer.send(order);     // « no se puede cambiar a SendGrid
	logger.log(order) ;       // « no se puede cambiar a Cloudwatch
	}
}
// Para ejecutar UN test unitario necesités:
// MySQL corriendo, cuenta Stripe, servidor SMTP, directorio /var/log
// + tests lentos, fragiles, imposibles en CI/CD sin infraestructura real
```
refactor - DIP: inyeccion de dependencias

```java
// Abstracciones definidas por el dominio (no por la infra)
interface OrderRepository { void save(Order order); }
interface PaymentGateway { void charge(Order order); }
interface Notifier      { void notify(Order order); }
interface Auditlogger  { void log(Order order); }

// OrdersService depende SOLO de abstracciones
class Orderservice {
	private final OrderRepository repo;
	private final PaymentGateway payment;
	private final Notifier       notifier;
	private final Auditlogger logger;

	public OrderService (OrderRepository r, PaymentGateway p,
						Notifier n, Auditlogger 1) {
		this. repo = r; this.payment = p;
		this.notifier = n; this. logger = 1;
	}
	
	public void process(order order) {
		repo.save(order); payment.charge(order) ;
		notifier.notify(order); logger.log(order);
}
// Produccion: new OrderService (new MySQLRepo(), new StripeGateway(), -..)
// Tests: new orderService(new ToMemoryRepo() new FakePayment(} |)
```

## DIP - arquitectura hexagonal
![[Pasted image 20260505065715.png]]

# Aspectos de Solid
## SOLID como sistema integrado
![[Pasted image 20260505065805.png]]

## SOLID y Patrones de Diseño
![[Pasted image 20260505070036.png]]

## anti-patrones SOLID
- god object
- concrete inheritance para reutilizar: viola LSP y OCP
- service locator
- anemic domain model: objetos sin logica de negocio, la logica termina migrando a ServiceManagers gigantes
- interfaces omnicientes: viola ISP
- New en el interior. new ConcreteClass() viola DIP
## cuando no aplicar SOLID
- prototipos/spikes
- sistemas muy pequenos
- scripts de un solo uso
- sobre-ingenieria anticipada

## SOLID y testing
![[Pasted image 20260505070458.png]]

## metricas de calidad
- complejidad ciclomatica (nro de caminos independientes. >10 por metodo. SRP violado): 
![[Pasted image 20260505070952.png]]
- acoplamiento eferente (Ce)
	- de cuantas clases depende esta -> clase fragil ante cambios externos
- cobertura de tests
- acoplamiento aferente (Ca)
	- cuantas clases dependen de esta -> clase dificil de cambiar
- inestabilidad (I = Ce/(Ca+Ce))
	- 0: muy estable, 1: muy inestable
- lineas por metodo (LOC/m)
	- >20 lineas por metodo es senal de que el metodo hace demasiado SRP

## refactoring seguro
![[Pasted image 20260505071438.png]]

## checklist SOLID para code review
![[Pasted image 20260505071458.png]]
# clean code
- nombres con intencion:
	- revelar intencion
	- distincion significativa
	- buscables
	- evitar desinformacion
	- pronunciables
	- sin encodings
- small functions
- comentarios 
- ley de Demeter - delegar funcionamiento