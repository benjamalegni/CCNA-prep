# conexiones
es el medio a trves del cuel se conectan servers (o clientes) a una BD
- independiente de si estan en la misma maquina o en maquinas separadas
- el servidor envia comandos
- la BD admite un *numero maximo de conexiones*
- la conexion se establece con un **driver** y requiere **credenciales de autenticacion**
##### pool de conexiones
- las conexiones son finitas, y toma cierto tiempo establecerlas
- el mecanismo de pool tiene por objetivo mejorar performanc e
- reuso de conexiones
- *buena practica*: abrir una conexion solo cuando es necesario, y liberarla lo antes posible

# transacciones
![[Pasted image 20251010102536.png]]
es una "unidad de trabajo" que se trata "como un todo"
- tiene exito sobre la BD o falla (y se deshacen resultados parciales) ej transferencia bancaria entre cuentas

propiedades ACID:
- Atomic: Si se hace commit de un cambio, esté se efectúa “completamente”
- Consistent: El cambio solo se produce si la BD queda en un estado consistente
- Isolated: Nadie “ve” partes de la transacción hasta que se hizo el commit
- Durable: Una vez que el cambio se efectuó, el cambio permanece en la BD

es una secuencia de operaciones SQL

depende contar con una conexión abierta 
- la conexion (o gestor de transacciones) no puede ser thread-safe

# patron DAO: DATA ACCESS OBJECT
intermediario entre la logica del negocio y la BD
- Proporciona una “interface abstracta” de la base de datos, y encapsula los mecanismos de acceso (por ej., gestión de conexión)
- Implementa el principio de Single Responsibility
- Puede cambiarse el mecanismo de persistencia en forma “controlada”
- Minimizar los detalles (de persistencia) que se exponen
- Generalmente asociado a Java EE, pero también puede implementarse en otros lenguajes (por ej., PHP)

- Ventajas → Modificabilidad
- Desventajas → Performance?
![[Pasted image 20251010103038.png]]

- BusinessObject
	- Representa el objeto que requiere los datos (o servicio) de la fuente de datos
- DataAccessObject (DAO)
	- Rol principal, que abstrae la implementation del acceso a la fuente de datos y permite un acceso transparente. Encapsula conexión, carga y almacenamiento de datos
- DataSource
	- Representa la implementación de la persistencia (base de datos o archivo) http://www.oracle.com/technetwork/java/dataaccessobject-138824.html
- DataTransferObject (DTO)
	- Acarrea datos entre objetos

comportamiento tipico:
![[Pasted image 20251010103446.png]]

#### si la BD no va a cambiar
- alcanza con definir una serie de **factory methods**
- para cada DAO es conveniente separar la interface de su implementacion y que dicha implementacion gestione la conexiones y operaciones con la BD
 ![[Pasted image 20251010103543.png]]

- o con un unico mecanismo de persistencia (DB), con varios tipos de objetos DAO
![[Pasted image 20251010104305.png]]
#### la BD puede cambiar
- Se incorpora un Abstract Factory, que luego puede ser extendido por cada una de las tecnologías de almacenamiento
 ![[Pasted image 20251010103716.png]]

##### esquima con Abstract Factory
![[Pasted image 20251010103828.png]]

ejemplo de implementacion
![[Pasted image 20251010104133.png]]
- entidad **Customer**
- DB: **cloudscapeDB**

- el DAO crea un customer (DTO) cuando se invoca el metodo findCustomer()


## patron DAO ej 1
- Combinación de Abstract Factory y FactoryMethod
- Permite gestionar distintos tipos de persistencia
- Hay que definir la inicialización de cada una de las bases de datos
- 
```java
public abstract class DAOFactory {
	public static final int MYSQL_JDBC = 1;
	public static final int DERBY_JDBC = 2;
	public static final int JPA_HIBERNATE = 3;

	public abstract CustomerDAO getCustomerDAO();

	public static DAOFactory getDAOFactory(int whichFactory) {
		switch (whichFactory) {
		case MYSQL_JDBC : return new MySqlJDBCDAOFactory();
		case DERBY_JDBC: return new DerbyJDBCDAOFactory();
		case JPA_HIBERNATE: …
		default: return null;
		}
	}
}
```

## patron DAO ej 2

```java
// MySQL concrete DAO Factory implementation
import java.sql.*;
public class MySQLDAOFactory extends DAOFactory {
	public static final String DRIVER= …
	public static final String DBURL= …
	
// method to create DB connection
public static Connection createConnection() {
// Use DRIVER and DBURL to create a connection
}

public CustomerDAO getCustomerDAO() {
	// MySQLCustomerDAO implements CustomerDAO
	return new MySQLCustomerDAO();
}

// Other DAOs
}
```

```java


// Interface that all CustomerDAOs must support
public interface CustomerDAO {
	public int insertCustomer(...);
	public boolean deleteCustomer(...);
	public Customer findCustomer(...);
	public boolean updateCustomer(...);
	public RowSet selectCustomersRS(...);
	public Collection selectCustomers(...);
...
}

public class MySQLCustomerDAO implements CustomerDAO {
…
}
```

## patron DAO ej 3
```java
// create the required DAO Factory
DAOFactory mysqlFactory = DAOFactory.getDAOFactory(DAOFactory. MYSQL_JDBC);
CustomerDAO custDAO = mysqlFactory.getCustomerDAO();
// create a new customer
int newCustNo = custDAO.insertCustomer(...);
// Find a customer object.
Customer cust = custDAO.findCustomer(...);
// modify the values in the Transfer Object and update it using the DAO
cust.setAddress(...);
cust.setEmail(...);
custDAO.updateCustomer(cust);
// select all customers in the same city
CustomerCriteria criteria=new CustomerCriteria();
criteria.setCity("New York");
Collection customersList = custDAO.selectCustomers(criteria);
```

# solucion a problemas de JDBC: mapeo objeto-relacional
JDBC tiene Algunos inconvenientes
- Código Java y SQL mezclados
- Actualizar manualmente el esquema de la base de datos
- Dependencia de la sintaxis SQL con cada base de datos
- Lidiar con aspectos de bajo nivel: conexiones, transacciones, caching de datos

entonces se propone usar mapeo objeto-relacional (ORM)
- Reglas y técnicas de programación para convertir, de manera transparente, elementos entre el modelo de objetos de una aplicación y el esquema relacional de la base de datos.
- El desarrollador ...
	- “ve” una base de datos orientada a objetos
	- se “desliga” de los aspectos de bajo nivel y la tecnología subyacente de base de datos

![[Pasted image 20251010110231.png]]


|                | OOP                                        | base de datos relacionales                                   |
| -------------- | ------------------------------------------ | ------------------------------------------------------------ |
| elementos      | Clases<br>Objetos<br>Atributos<br>Métodos  | Tablas<br>Tuplas<br>Atributos<br>Stored procedures, Triggers |
| relaciones     | Referencias en memoria                     | Foreign Keys                                                 |
| identificacion | Identificadores de objetos                 | Primary Keys                                                 |
| otros aspectos | Encapsulamiento, Herencia,<br>Polimorfismo | Restricciones de integridad,<br>Transacciones                |
| design         | Diagrama de clases, secuencia              | Diagrama de entidades y<br>relaciones, Esquema relacional    |
| lenguajes      | Java, C++, Python, C# ...                  | SQL                                                          |
se usa **JPA** [[jpa]]

# patron DAO con JPA
- JPA simplifica el DAO y permite contar con DAOs "genericos"
- algunos casos especificos
	- persistencia != acceso a datos
	- queries complejos
	- sistemas legados (no compatibles con JPA)
