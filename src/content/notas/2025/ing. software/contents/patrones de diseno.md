strategy, decorator, factory, singleton, adapter, command, visitor, template

### tipos de design patterns e idioms
tipos:
- creacionales
- estructurales
- comportamentales

idioms: implementacion del patron de diseno dentro de un programa como c# o java

*si obstraigo demasiado comportamiento puede darse el caso que:*
**lo que originalmente se penso que era un buen uso de la herencia para el REUSO, no resulto bueno para el MANTENIMIENTO**


### cambios
no importa que se este haciendo, en que lenguaje de programacion se este programando, siempre van a existir: cambios
esto lleva a pensar en la **modificabilidad y modularidad** de un sistema de software, en lo posible, desde etapas tempranas

#### uso de interfaces
- la herencia puede no ser la mejor opcion en ciertos casos, mas si hay que hacer modificaciones frecuentes al diseno
	- modificaciones que a menudo no se sabe cuales podran ser...

las interfaces, en general, complican el reuso del codigo, con lo que un cambio potencialmente genera tener que buscar donde hacer esos cambios

**identificar los aspectos que puedan variar y separarlos de los que no vayan a cambiar**

encapsular esos aspectos de forma que luego se los pueda modificar o extender sin afectar aquello que no cambia

# strategy
## programar para interfaces, no para implementaciones
![[Pasted image 20250915072815.png]]
- se va a usar una interface para representar el comportamiento y cada implementacion implementara esa interfaz
- las instancias de Duck no implementaran estos comportamientos, sino que seran estas nuevas clases las que lo haran
- esto es diferente a lo anterior donde el comportamiento estaba o en la superclase o en alguna de las implementaciones
- en ese caso, se esta atado a un implementacion, la cual no se podia cambiar (sin cambiar el codigo de la clase)
- con esta nueva implementacion, las subclases de Duck utilizaran un comportamiento representado por una *interface*, de forma que la *implementacion* del comportamiento no estara fijo en las subclases de Duck

la idea es aprovechar el polimorfismo
- se programa para un super-tipo para evitar que el objeto en tiempo de ejecucion no se encuentre realmente definido en compilacion
- los objetos asignados a dichas variables pueden ser de cualquiera de las implementaciones del super tipo
```java
//programando para una implementacion (mal)
MallardDuck d = new MallardDuck();

//programando para un supertipo (bien)
Duck d = new MallardDuck();
```
![[Pasted image 20250916110039.png]]
con un diseno asi, otros tipo de objetos pueden reutilizar el comportamiento de fly() y quack(), ya que no son especificas de las clases Duck
se puede agregar nuevo comportamiento sin modificar las clases de comportamiento ya existentes o alguna de las clases de Duck

![[Pasted image 20250916110223.png]]
![[Pasted image 20250916110637.png]]
```java
public class Duck{
QuakBehavior quackBehavior;
//...

public void performQuack(){
	quackBehavior.quack();
}

public void setFlyBehavior(FlyBehavior fb){
	flyBehavior = fb;
}

public void setQuackBehavior(QuackBehavior qb){
	quackBehavior = qb;
}
}
```
en luegar de implementar el comportamiento, lo que hace es delegar el comportamiento al objeto referenciado por quackBehavior. osea no nos importa que tipo de tipo de objeto es, solo que pueda hacer quak.

en definitiva, la idea es abstraer el comportamiento a un atributo de la clase y no implementar directamenta en esta clase el funcionamiento, sino que se usa la interfaz de comportamiento para hacer los metodos de la clase.


![[Pasted image 20250916110837.png]]
es preferible tiene-un antes que es-un

este es un **patron: strategy**: define una familia de algoritmos, los encapsula y permite que se usen de forma intercambiable. Permite que los algoritmos varien de forma independiente a los clientes que los usan

- buenos OO (object oriented) son reusables, extensibles y "faciles" de mantener
- los patrones ofrecen alternativas para disenar sistemas "de calidad"
- los patrones no proveen codigo, sino que son soluciones generales para problemas de diseno
- los patrones no se inventan, se descubren
- la mayoria de los patrones se abocan a cuestiones relacionadas al cambio
- la mayoria de los patrones intentan ver que es lo que cambia en el sistema para encapsularlo
- los patrones proveen un lenguaje compartido



# decorator
- un cafe tiene la fama de agregar constantemente bebidas nuevas a su carta
- su primer diseno de clases era
![[Pasted image 20250916111328.png]]
ademas se pueden combinar ingredientes, los cuales afectan el precio de la bebida
![[Pasted image 20250916111411.png]]
esto es horrible

### primera aproximacion

| Beverage         |
| ---------------- |
| description      |
| milk: bool       |
| soy: bool        |
| mocha: bool      |
| whip: bool       |
| ---------------- |
| getDescription() |
| cost(): abstract |
|                  |
| hasMilk()        |
| setMilk()....    |
y luego cada clase como HouseBlend, DarkRoast implementa el moto cost()


las clases deben estar *abiertas* para la *extension*, pero *cerradas* para la *modificacion*

- el objetivo es que las clases puedan ser facilmente extensibles para agregar nuevo comportamiento sin modificar lo que ya esta
- que se logra con esto?
	- disenos flexibles y tolerantes a los cambios

- pero NO hay que aplicarlo en todo!
	- puede ser costoso y dar lugar a codigo complejo y dificiil de comprender

### la idea
- hacer una clase por cada posible combinacion de bebida + ingrediente, no funciona
- hacer una clase para la bebida base y agregarle ingredientes, nos deja un diseno poco flexible
- tener todos los ingredientes en la super-clase hace que todas las subclases los hereden, aun cuando la combinacion no sea posible
- para esto esta el patron **decorator**:
	- se va a tener una bebida base y la vamos de "decorar" en tiempo de ejecucion

- suponiendo que el cliente quiere un DarkRoast con Mocha y crema Whip
- ![[Pasted image 20250916112507.png]]
- ![[Pasted image 20250916112726.png]]
clase Mocha
```java
public class Mocha extends IngredientDecorator{
	Beverage beverage;
	
	public Mocha(Beverage beverage){
		this.beverage = beverage;
	}
	
	public String getDescription(){
		return beverage.getDescription() + ", Mocha";
	}
	
	public double cost(){
		return beverage.cost() + .20;
		// retorna el valor de decorador, mas el valor de la bebida que es el beverage
	}

}
```

la idea es agregar responsabilidades adicionales en forma dinamica a un objeto
proveen un alternativa flexible a la creacion de subclases para el agregado de comportamiento
## recap
- la herencia es una forma de extension que quizas no sea la mejor para lograr flexibilidad
- composicion/asociacion y delegacion son otras formas de agregar comportamiento en tiempo de ejecucion
- el Decorator provee una alternativa a la creacion de subclases para el agregado de comportamiento
- el Decorator involucra un conjunto de clases que se usan para decorar componentes concretos
- los Decorators son del mismo tipo que las clases que decoran
- los Decorators cambian el comportamiento de los componentes agregando nueva funcionalidad antes, despues o en lugar de invocaciones a metodos de componente
- se puede utilizar una cantidad arbitraria de decorators
- son usualmente "transparentes" para el (objeto) usuario
- puede resultar en muchos objetos pequenos
- su sobre-uso puede derivar en programas mas complejos


# factory
## factory method

Se comentó de programar para una interfaz, y tratar de no atarse a una implementación concreta, ya que esto reduce la flexibilidad de la solución

Una factory method se encarga de la creacion de objetos y la encapsula en una subclase
Desacopla el codigo del cliente en la superclase de la creacion de los objetos en la subclase
Permite que las subclases "decidan" que objetos crear

#### las clases creadoras
clase abstracta. Define el abstract factory method que las subclases deben implementar
A menudo contiene codigo que depende de un producto abstracto, el cual es producido por una de las subclases. El creador no sabe que producto concreto fue creado
![[Pasted image 20250916144342.png]]
el createPizza es el factory method. Producen los productos, de la forma que quieran


#### las clases producto
![[Pasted image 20250916144424.png]]
Los productos concretos, todos los tipos de pizzas que se ofrezcan

### relacion
las jerarquias son paralelas. Ambas tienen clases abstractas extendidas por clases concretas y encapsulan el conocimiento para crear pizzas de estilo NewYork
![[Pasted image 20250916144542.png]]

#### ejemplo - pizza version 2

cheese pizza estilo NewYork
1. hace falta un NY Pizza Store
		PizzaStore nyPizzaStore = new NYPizzaStore();
2. ahora se puede tomar la orden
		nyPizzaStore.orderPizza("cheese");
3. el metodo orderPizza invoca al metodo createPizza
		Pizza pizza = createPizza("cheese"); -> createPizza es implementado en la subclase
4. finalmente, tenemos la pizza, terminamos de prepararla
		pizza.prepare();
		pizza.cut().
		...

como hago con los ingredientes?
- se tiene flexibilidad en la creacion de las pizzas
- las franquicias tienen que respetar los procesos definidos
- pero, se deja a las franquicias la libertar de elegir sus ingredientes
-  ==se pueden crear familias de ingredientes con factories

##### version 3


![[Pasted image 20250916145004.png]]
```java
public class NYPizzaIngredientFactory implements PizzaIngredientFactory{
	public Dough createDough(){
		return new ThinCrustDough();
	}
	public Sauce createSauce(){
		return new MarinaraSauce();
	}
	public Cheese createCheese(){
		return new ReggianitoCheese();
	}
	public Veggie [] createVeggies() { … }
	public Pepperoni createPepperoni(){ … }
}
```
ahora, con el Factory para los ingredients no hace falta tener dos clases NYCheesePizza y ChicagoCheesePizza
```java
public class CheesePizza extends Pizza{
	PizzaIngredientFactory ingredientFactory;
	public CheesePizza(PizzaIngredientFactory ingredientFactory) {
		this.ingredientFactory = ingredientFactory;
	}
	public void prepare(){
		dough = ingredientFactory.createDough();
		sauce = ingredientFactory.createSauce();
		cheese = ingredientFactory.createCheese();
		}
	}
	
sauce = ingredientFactory.createSauce()
```
a la Pizza no le importa que factory es, siempre y cuando sea un IngredientFactory

## abstract factory
provee una interfaz para la creacion de familias de objetos relacionados sin especificar sus clases concretas.
el cliente queda desacoplado de los productos concretos que son creados
![[Pasted image 20250916151738.png]]
![[Pasted image 20250916151758.png]]

## abstract factory vs factory method en este caso
abstract family poruqe se quiere poder crear familias de productos.
la interfaz para crear los productos
deciden que ingredientes concretos utilizar

cada ingrediente representa un producto concreto a crear

## recap
Abstract Factory
- Provee una interfaz para crear familias de objetos relacionados o dependientes sin especificar sus clases concretas.
Factory Method
- Define una interfaz para crear un objeto, pero deja que las subclases decidan la clase a instanciar.
- Difiere la instanciación a las subclases.

- Todos los factory encapsulan la creación de objetos
- Factory Method se basa en la herencia. La creación de objetos es delegada a las subclases, los cuales implementan el factory method para crear los objetos
- AbstractFactory se basa en la composición. La creación de objetos es implementada en métodos expuestos en la interface
- Todos los patrones factory favorecen el desacoplado mediante la reducción de las dependencias entre la aplicación y las clases concretas
- Factory Method intenta diferir la instanciación de objetos a las subclases
- Abstract Factory crea familias de objetos relacionados sin tener que depender de las clases concreta

# singleton
unico en su especie
- permite que se cree una y solo una instancia de una clase
	- objetos que solo se necesita uno: thread pools, caches, manejos de preferencias,loggers...
	- Si de estos hubiera más de una instancia, es probable que se encuentren problemas como comportamientos incorrecto, sobre-uso de recursos, o resultados inconsistentes

```java
public class Singleton{
	private static Singleton uniqueInstance;
	//otros atributos

	
	private Singleton() {}

	public static Singleton getInstance(){
		if (uniqueInstance == null)
			uniqueInstance = new Singleton();
		return uniqueInstance
	}
	
// otros métodos
}
```
- hay un atributo estatico que contiene la unca instancia de la clase Singleton
- el constructor es declarado privado para que solo esta clase pueda accederlo
- el metodo permite crear la instancia si es null y retornar la unica instancia si ya fue creada


ejemplo ChocolateBoiler
esto tiene un problema de sincronizacion porque podria haber dos objetos que llamen a getInstance(), den null y se creen dos instancias separadas
```java
public class ChocolateBoiler {
	private boolean empty;
	private boolean boiled;
	private static ChocolateBuilder uniqueInstance;

	private ChocolateBoiler() {
		empty = true;
		boiled = false;
	}

	public static ChocolateBuilder getInstance(){
		if (uniqueInstance == null)
			uniqueInstance = new ChocolateBuilder();
		return uniqueInstance;
	}
// el resto de los métodos sigue igual…
}
```
version mejorada:
```java
public class Singleton{
	private volatile static Singleton uniqueInstance; // mantiene consistencia entre threads.

	public static Singleton getInstance(){
		if(uniqueInstance==null){
			synchronized(uniqueInstance){//la sincronizacion solo se usa en la primer instancia
				if(uniqueInstance==null){
					uniqueInstance = new Singleton();
				}
			}
		}
		return uniqueInstance;
	}
}
```
The `volatile` keyword in Java is a variable modifier used to ensure visibility and ordering guarantees for variables shared across multiple threads. It addresses potential issues in multithreaded environments where threads might maintain local copies of variables in their caches, leading to inconsistencies.

The `synchronized` keyword in Java is a mechanism used to control access to shared resources in a multithreaded environment, preventing data corruption and race conditions. It ensures that only one thread can execute a specific block of code or method at a time, effectively acting as a lock.

### recap
- Para la implementación se tiene un constructor privado, un atributo estático y un método estático
- Si se necesita multi-thread, ver los requerimientos de performance, para elegir la mejor opción
- Tener cuidado con el uso de múltiples class-loaders

# como elegir los patrones
1. Considerar cómo los patrones ayudan a resolver problemas
	- Qué problema tengo?
	- Para qué sirve el patrón?
	- Qué hace?
2. Analizar la utilidad e intención de los patrones
	- Cuál podría ser útil?
	- Cuál sirve para lo que quiero?
3. Analizar las interrelaciones entre los patrones
4. Analizar las causas de un re-diseño
	- Analizar qué puede forzar a un cambio de diseño
	- Ver qué patrones puede ayudar a evitar ese re-diseño
5. Considerar qué puede cambiar en el diseño
6. Lo opuesto al punto anterior
	- Qué es lo que querríamos que pueda cambiar sin forzar a un re-diseño?