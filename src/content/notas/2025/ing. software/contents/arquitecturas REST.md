## servicios web
Funcionalidad ofrecida por un componente (ej., aplicación Web en un servidor) a otros, a través de una API Web
-  Mecanismo de comunicación basado en protocolos Web (ej., HTTP), como SOAP y REST
-  Independiente de la tecnología (lenguaje de implementación)
	- Transferencia de datos basada en formatos de texto, como XML y JSON
- Alternativa a protocolos con formatos binarios cómo Sockets, RPC, etc.
- Menor performance pero mayor integrabilidad y modificabilidad

# servicios rest
1. Usar los métodos HTTP explícitamente como acciones sobre recursos
![[Pasted image 20251010130724.png]]
2. exponer recursos a traves de su URL
	- URLs como estructura jerarquica de "Endpoints"
		http://www.miservicio.com/recursos/usuarios
		http://www.miservicio.com/recursos/usuarios/{idUsuario}
		http://www.miservicio.com/recursos/usuarios/{idUsuario}/actividades
		http://www.miservicio.com/recursos/usuarios/{idUsuario}/actividades/{idActividad
	- se desacopla la API del servicio de su implementacion: ejemplo de lo que no se hace
		http://www.miservicio.com/usuarios.jsp
		http://www.miservicio.com/actividades.php
3. sin estado (stateless)
	- logica del servidor mas facil de implementar
	- el estado lo maneja el cliente (o una BD)
	- facil de escalar y almacenar en cache dentro de proxies y clientes
4. transferir los datos de recursos mediante XML, JSON o ambos

#### tabla de metodos http

| endpoint (url) | POST                                 | GET                                             | PUT                                           | DELETE                    |
| -------------- | ------------------------------------ | ----------------------------------------------- | --------------------------------------------- | ------------------------- |
| /recursos      | crear un nuevo recurso (201 created) | listar recursos (200 ok)                        | actualizar simultaneamente varios recursos    | borrar todos los recursos |
| /recursos/{id} | error (ej. 400 bad request)          | si existe devolver recurso {id}, sino error 404 | si existe {id} actualizar recurso, sino error | borrar recurso segun {id} |

## manejo de estado
- Para poder escalar, es importante gestionar el estado asociado a una sesión
- El almacenamiento de estados “intermedios” tiene que ver con:
	- Datos de autenticación
	- Datos relacionados con selecciones del usuario (por ej., carrito de compras)
	- Datos de acciones realizadas
	- Contenido dinámico
- La estrategia de manejo de estado impacta en la carga del sistema
![[Pasted image 20251010132045.png]]

#### manejo de estado ej 1
- Consideremos la siguiente función que cuenta cuantas veces es llamada por un cliente

- La cuenta recuerda i entre una llamada y la siguiente
- Se mantiene el estado dentro de la función -> stateful
opcion 1 stateful
```c
int i=0; // declare i and initialize it to 0
int coutv1(){
	i=i+1;
	return (i);
}
```
opcion 2 stateless
- La cuenta no recuerda i entre una llamada y la siguiente. El cliente debe pasar el último valor
- Se le pasa el estado a la función -> stateless
```c
int coutv2(int i){
	int a;
	a=i+1;
	return (a);
}
```

opcion 3 stateless
- La cuenta no recuerda i entre una llamada y la siguiente. El cliente debe pasar el último valor
- Se le pasa estado a la función -> stateless
```c
int coutv3(){
	int a;
	a=dbase.get("count"); // retrieve current value
	dbase.write("count",a); //save current value
	return (a);
}
```


### Proyecto con JPA y JDBC
![[Pasted image 20251010141147.png]]


### Proyecto Web con Spring, JPA y JDBC
![[Pasted image 20251010141223.png]]

#### REST controller en Sprint boot
==es una clase en Java que actúa como un servicio web para manejar solicitudes HTTP y devolver datos (normalmente en formato JSON o XML) en lugar de una vista HTML==. Es una anotación de conveniencia que combina `@Controller` y `@ResponseBody` (`@RestController`), lo que significa que los métodos de la clase devuelven directamente el cuerpo de la respuesta en lugar de una cadena de vista. 

Funciones principales
- **Creación de APIs RESTful:**
    Se utiliza para construir APIs (Interfaces de Programación de Aplicaciones) que permiten la comunicación entre diferentes sistemas, como una aplicación de frontend (React, Angular) y una aplicación móvil. 
- **Manejo de solicitudes HTTP:**
    Maneja los métodos HTTP comunes como GET, POST, PUT y DELETE. 
- **Procesamiento de datos:**
    Gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y procesa los datos entrantes para enviar una respuesta. 
- **Devolución de datos:**
    Los resultados de los métodos se serializan automáticamente a formatos como JSON o XML y se envían como respuesta al cliente.

### arquitectura por tiers - a nivel design
![[Pasted image 20251010141710.png]]

## Spring framework
Es una infraestructura para la creación de aplicaciones Web en Java (Kotlin, y Groovy), con integración con un gran abanico de tecnologías
- Distintos tipos de accesos a datos
- Incorpora el mecanismo de Inyección de Dependencias: `En la inyección de dependencias ‘alguien’ externo se encarga de las dependencias que las clases necesitan `


Spring Boot apunta a simplificar la creación y (auto-)configuración de una aplicación sobre Spring
- Integración de todo en un único contenedor

- Spring se ocupa de mantener en su ‘contexto’ todas las instancias de la aplicación y de inyectarle esa instancias a quien lo necesite
- Spring llama a estas instancias beans 
	- Son las instancias de las clases que están disponibles para ser reutilizados y son gestionados dentro del contenedor de Spring

#### spring: inyeccion de dependencias y anotacinoes
- @SpringBootApplication: es el disparador para que se ejecute la aplicación.
	- @Configuration: indica que en la clase se encuentra la configuración del proyecto.
	- @EnableAutoConfiguration: indica que se aplicará configuración automática a partir del starter que se configuró.
	- @ComponentScan: ayuda a la localización de elementos etiquetados con otras anotaciones.
- @RestController: esta sustituye a @Controller + @ResponseBody.
	- @Controller: con esta anotación Spring detecta a la clase.
	- @ResponseBody: con ello definimos lo que será el cuerpo de la respuesta.
- @CheckPermissions: se utiliza para definir los permisos que se necesitará para ejecutar dicho servicio.
- @RequestMapping: especificamos la ruta desde la que escuchará el servicio, y qué método le corresponde.
- @AutoWired: a través de esta Spring realiza la inyección de dependencias y no es necesario instanciarla.
- @PathVariable: sirve para indicar con qué variable de la url se relaciona el parámetro sobre el que se esté usando la anotación.
- …



