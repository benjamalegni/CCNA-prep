java persistance API

Arquitecturas Cliente-Servidor:
- El backend a menudo se implementa en Java
- E involucra algún tipo de persistencia de datos

## conexion
el medio a traves del cual se conectan servers (o clientes) a una instancia de base de datos
- es independiente de si estan en la misma maquina o en maquinas separadas
- el servidor envia comandos a la base de datos
- normalmente, la base admite un numero maximo de conexiones
- la conexion se establece con un *driver* y requiere *credenciales de autenticacion*

### transaccion
![[Pasted image 20250921154754.png]]
- es una "unidad de trabajo" que se trata "como un todo"
- tiene exito sobre la base de datos, o bien fall (y se deben deshacer los resultados parciales)
- propiedades ACID
	- atomic: si se hace commit de un cambio, este se efectua "completamente"
	- consistent: el cambio solo se produce si la BD queda en un estado consistente
	- isolated: nadie ve partes de la transaccion hasta que se hizo el commit
	- durable: una vez que el cambio se efectuo, el cambio permanece en la BD
- una secuencia de operaciones SQL
- depende de contar con una conexion abierta

# arquitectura JDBC
es un conjunto de clases que permite a las aplicaciones java comunicarse con distintas tecnologias de base de datos
- el mecanismo de intermediacion es una fachada (API) que se comunica con un driver especifico para cada base
- permite transformar resultados de las consultas en ciertos objetos java

la traduccion de POO a tablas queda a cargo del programador

![[Pasted image 20250922171750.png]]

## principales clases
- paquetes java.sql y javax.sql
- pasos:
	1. cargar el driver correspondiente
	2. conectarse a la base de datos
	3. crear y ejecutar sentencias JDBC
	4. gestionar excepciones SQL

- DriverManager class : Loads the driver for the database.
- Driver (interface / Class) : Represents a database driver. All JDBC driver classes must implement the Driver interface.
- Connection interface : Enables you to establish a connection between a Java application and a database.
- Statement interface : Enables you to execute SQL statements
- ResultSet interface: Represents the information retrieved from a database.
- SQLException class: Provides information about the exceptions that occur while interacting with databases.

inconvenientes:
- Código Java y SQL mezclados
- Actualizar manualmente el esquema de la base de datos
- Dependencia de la sintaxis SQL con cada base de datos
- Lidiar con aspectos de bajo nivel: conexiones, transacciones, etc.

### mapeo objeto-relacional ORM
Reglas y técnicas de programación para convertir, de manera transparente,
elementos entre el modelo de objetos de una aplicación y el esquema
relacional de la base de datos

el desarrollador:
- Trabaja con una “base de datos orientada a objetos”
- Se desliga de los aspectos de bajo nivel y la tecnología subyacente de base de datos


|                | OOP                                        | base de datos relacional                                     |
| -------------- | ------------------------------------------ | ------------------------------------------------------------ |
| elementos      | Clases<br>Objetos<br>Atributos<br>Métodos  | Tablas<br>Tuplas<br>Atributos<br>Stored procedures, Triggers |
| relaciones     | referencias en memoria                     | foreign keys                                                 |
| identificacion | Identificadores de objetos                 | Primary Keys                                                 |
| otros aspectos | Encapsulamiento, Herencia,<br>Polimorfismo | Restricciones de integridad,<br>Transacciones                |
| design         | Diagrama de clases, secuencia              | Diagrama de entidades y relaciones,<br>Esquema relacional    |
| lenguajes      | Java, C++, Python, C# ...                  | SQL                                                          |
ej: diagrama de entidades y relaciones (DER) y diagrama de clases
![[Pasted image 20250922172345.png]]

## framework JPA y proovedores ORM
![[Pasted image 20250922172514.png]]
- java persistence api sirve para implementar un mapeo objeto-relacional
	- es una abstraccion sobre JDBC
- JPA es solo la api. para usarla, se necesita una implementación o “proveedor” de la misma, como Hibernate, EclipseLink, OpenJPA, etc.
- El mapeo se configura a través de metadatos (archivos XML y/o anotaciones de código)


### suponiendo un proyecto con JPA, que se necesita?
- Driver JDBC + Base de datos. Ej: Apache Derby
- Proveedor JPA. Ej: Hibernate
- Archivo de configuración JPA (persistence.xml)
- Entidades: clases Java extendidas con metadatos que describen el mapeo desus atributos a tablas
	- Mediante archivos de mapeo (entity.xml)
	- Mediante anotaciones (@Entity)
-  Código de la aplicación, que manipula las entidades a través de un EntityManager

uso EntityManager:
```java
EntityManagerFactory emf=Persistence.createEntityManagerFactory("pers_unit");
EntityManager manager = emf.createEntityManager();
entitymanager.getTransaction( ).begin( );
Equipo equipo = new Equipo(1, "River");
entitymanager.persist(equipo);
Jugador jugador = new Jugador();
jugador.setDni(34287439);
jugador.setNombre("Emiliano");
jugador.setApellido("Sanchez");
jugador.setEquipo(equipo);
entitymanager.persist(jugador);
entitymanager.getTransaction().commit();
manager.close();
emf.close();
```


| metodo                                              | descripcion                                                           |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| EntityTransaction<br>getTransaction();              | Accede al controlador de transacciones                                |
| T find(Class<T> entityClass,<br>Object primaryKey); | Busca y devuelve una instancia (SELECT) a partir de su identificador. |
| void persist(Object entity)                         | Persiste una entidad (INSERT)                                         |
| void flush();                                       | Actualiza el estado de las entidades a la<br>base de datos (UPDATE)   |
| void refresh(Object entity);                        | Actualiza el estado de la entidad desde la<br>base de datos (SELECT)  |
| void remove(Object entity);                         | Remueve la entidad de la base de datos (DELETE)                       |

### asociacion en JPA
 Las posibles anotaciones en JPA para las asociaciones son:
- @ManyToOne
- @OneToMany
- @OneToOne
- @ManyToMany
## lectura temprana o demorada
Ciertas propiedades pueden no ser necesarias en el momento de la creación
del objeto
os modalidades:
- Leer una propiedad desde la base de datos la primera vez que un cliente intenta leer su valor (lectura demorada)
- Leerla cuando la entidad que la contiene es creada (lectura temprana)
Si la propiedad nunca es accedida, nos evitamos el costo de crearla

- uno-a-uno y muchos-a-uno: temprana (eager) (por defecto)
- uno-a-muchos y muchos-a-muchos: demorada (lazy) (por defecto)

# patron repository
Es una abstracción del concepto de repositorio
Permite agrupar las operaciones lógicas de read/write de entidad(es) específica(s)
La lógica de negocio accede al repositorio, independientemente de su implementación
La implementación puede basarse en JPA, JPQL, etc.

```java
// Domain Layer: Interface
public interface IProductRepository{    
	Product GetById(int id);
    IEnumerable<Product> GetAll();
    void Add(Product product);
    void Update(Product product);    
    void Delete(Product product);
}
// Infrastructure Layer: Implementation
public class EfProductRepository : IProductRepository{    
	private readonly ApplicationDbContext _context;    
	public EfProductRepository(ApplicationDbContext context){        
		_context = context;
    }    
	
public Product GetById(int id){        
	return _context.Products.Find(id);    
	}    

// ... other method implementations using Entity Framework

}
// Application Layer: Usage
public class ProductService{    
	private readonly IProductRepository _productRepository;    
	public ProductService(IProductRepository productRepository){  
	    _productRepository = productRepository;    
	    }    
	
	public void CreateNewProduct(Product product){        
	// Business logic here        
		_productRepository.Add(product);    
}}
```

# patron DTO (data transfer object)
- En un backend Java, normalmente se tiene una capa de servicios o presentación, que “expone” datos a los clientes
- Por distintas razones, no se quiere exponer directamente las entidades (y sus datos), sino un “resumen” de una o varias entidades (o fuentes)
- Seguridad, separación de intereses, performance, reducir invocaciones, etc.
- Normalmente, un DTO es una entidad de transferencia de datos, de solo lectura

```java
public class UserDTO {
    private String username;
    private String email;

    public UserDTO(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
```
In this example, `UserDTO` represents a simplified view of a user, potentially excluding sensitive information like passwords that might be present in a full `User` entity. This `UserDTO` can then be safely transferred to a client or presentation layer

# antipatrones en JDBC/JPA
- Sesiones que se abren en un lado (del código) y se cierran en otro lado “lejos” de la apertura
- Resolver toda la complejidad de una consulta en Java (y en memoria), en vez de hacerlo con consultas en JPQL (más eficiente) … o al menos en SQL
- Gestión de excepciones
- Definición de ámbito/granularidad de las transacciones