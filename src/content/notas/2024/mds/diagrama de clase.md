se utilizan para:
- explorar conceptos del dominio
- analizar requerimientos
- mostrar el diseño detallado de software orientado a objetos
generalmente contiene:
- clases
- interfaces
- relaciones

### cuando lo uso?
- venta/docu tecnico/ vision
- inicio de un sprint (acuerdo entre devs)
- post-mortem: documentacion acordada con el cliente o interna

# clase
una clase es la descripcion de un conjunto de objetos que comparten los mismos:
- atributos
- operaciones
- semantica

las clases se captura el vocabulario del sistema que se esta desarrollando
representan objetos del mundo real y elementos conceptuales(ej. conversacion, politica de ordenamiento, etc.)

# clases en UML

Nombre(CamelCase. primer letra mayus)
Atributos(CamelCase, primer letra en minuscula)
Operaciones(CamelCase. primer letra en minuscula)

| Usuario           |
| ----------------- |
| nombreDelUsuario  |
| password          |
|                   |
| login()           |
| cerrarSesion()    |
| cambiarPassword() |

## mayor detalle de la clase
accesibilidad de atributos y operaciones:
- public: +
- private: -
- protected: #
clases abstractas: su nombre se pone en cursiva
tipo de los atributos: luego del nombre del atributo se debe poner ":" y el tipo
parametros: similar a la declaracion de los atributos (pero sin accesibilidad)
retorno de los metodos
![[Pasted image 20241001211436.png]]

### relaciones entre clases
- las relaciones son conexiones entre clases
- modelan la colaboracion entre objetos
- tipos:
	- generalizacion
	- realizacion
	- asociacion
	- agregacion
	- composicion
	- clase de asociacion
	- dependencia

- dos clases A y B estan relacionadas si:
	- un objeto de la clase **A envia un mensaje a** un objeto de la clase B
	- un objeto de la clase **A crea un objeto de** la clase B
	- un objeto de la clase **A tiene un atributo** cuyo **tipo** es **B** o que es una coleccion de objetos de tipo B
	- un objeto de la clase **A  recibe un mensaje con un objeto de** la clase **B** como parametro
	- un objeto de la clase **A define un metodo con un objeto** de la clase **B** como retorno
	- la clase **A es superclase de B**
	- la clase **A implementa la clase B**

### relacion de generalizacion
- indica una relacion entre una clase general (superclass) y un tipo mas especifico de clase (subclass)
- usamos generalizaciones para modelar conexiones del tipo: "es un tipo de"
- una clase A es del tipo de otra clase B en case que:
	- la clase A es subclass de B
- los atributos, operaciones y relaciones comunes se muestran en la superclass
![[Pasted image 20241001212000.png]]

### relacion de realizacion
- indica una relacion donde una de las partes especifica un "contrato" y la otra parte garantiza llevarlo a cabo
- es una mezcla entre dependencia y generalizacion
- usamos realizaciones para modelar conexiones del tipo: "implementa"
- se usan principalmente para especificar la relacion entre una interface y la clase que provee una operacion para ella
![[Pasted image 20241001212205.png]]

### relacion de asociacion
- es una relacion estructural
- 2 clases A y B estan asociadas si:
	- un obj de la clase **A tiene un atributo cuyo tipo es B** o que es una coleccion de objs de tipo B
- usamos asociaciones para modelar conexiones del tipo: "tiene", "es de", "conoce"
- se dibuja como una linea entre dos clases
![[Pasted image 20241001212503.png]]
##### adornos de asociaciones:
- las asociaciones pueden tener adornos que agregan mas info a la relacion
	- nombre que describe la naturaleza de la relacion x ej
		![[Pasted image 20241001225106.png]]
	- rol que cumple una clase en la relacion (la misma clase puede jugar el mismo o diferentes roles en otras asociaciones)
		![[Pasted image 20241001225215.png]]
	- la multiplicidad inidca cuantos elementos de una instancia se relacionan con otra. por ej:
		- 0..1
		- 3..4
		- 6..* 6 o mas objs
		- 0..1, 3..4, 6..* : cualquier numero de objs que no sea 2 o 5
	 ![[Pasted image 20241001225957.png]]

	- navegabilidad: indica en que direccion se pueden enviar los mensajes
		- permite indicar restricciones en el diseño detallado
	 ![[Pasted image 20241001230158.png]]

	- ### adornos: resumen
		- una asociacion debe tener minimamente:
			- **nombre de relacion y direccion (o en su defecto roles)
			- **multiplicidad
	 ## notas
		- no es un adorno
		- se suelen utilizar en los diagramas UML cuando queremos:
			- hacer comentarios
			- agregar info que el diagrama no muestra
 
### relacion de agregacion
- es un tipo especial de relacion de asociacion
- se utiliza solamente cuando una de las clases representa **el "todo" y las/s otra/s la/s "partes"**
- modelan conexiones del tipo: "esta formado por"
- se dibuja como una linea entre dos clases con un rombo sobre la clase que representa el "todo"
- puede incluir adornos
![[Pasted image 20241001230826.png]]

### relacion de composicion
- es un tipo especial de relacion de agregacion
- tambien representa el **"todo" y la/s "partes** pero ==el tiempo de vida de las partes esta ligada al del todo==
- las partes se pueden crear despues del todo pero cuando se destruye el todo tambien se destruyen las partes
- de dibuja como una linea entre dos clases con un rombo lleno sobre la clase que representa el "todo"
- puede incluir adornos
![[Pasted image 20241001231032.png]]

### clase de asociacion
- se da principalmente cuando tenemos una relacion de asociacion con multiplicidad **muchos a muchos**
- permite generar una clase que guarda info de esa relacion
![[Pasted image 20241001231127.png]]

## relacion de dependencia
- es una relacion para indicar que una clase usa a otra clase
- una clase A depende de otra clase B en alguno de los siguientes casos:
	- un objeto de la clase **A envia un mensaje a** un obj de la clase B
	- un objeto de la clase **A crea un objeto de** la clase B
	- un objeto de la clase **A recibe un mensaje con un objeto** de la clase B como parametro
	- un objeto de la clase **A define un metodo con un objeto** de la clase B como retorno
- usamos dependencias para modelar conexiones del tipo: "usa"
- se dibuja como una linea punteada entre dos clases con una flecha que indica de que clase se depende
- solo se muestra si no existe otro tipo de relacion entre las dos clases
![[Pasted image 20241001231439.png]]

## diagrama de objetos
- modelan las instancias de las clases contenidas en un diagrama de clases
- muestra un conjunto de objetos y sus relaciones en un momento dado
- graficamente el objeto se dibuja como un rectangulo con su nombre de instancia y clase subrayados
![[Pasted image 20241001231604.png]]