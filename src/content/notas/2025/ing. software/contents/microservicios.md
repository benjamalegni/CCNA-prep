### SOA y diseño monolitico
- Si bien las arquitecturas orientadas a servicios (SOA) son un estilo muy popular para las aplicaciones Web …
- Todos los servicios (o lógica de negocio) de la aplicación están empaquetados en un único artefacto para despliegue 
	- el monolito
	- Esto implica que cualquier cambio en la aplicación requiere un re-despliegue de todo la aplicación
	- Adicionalmente, si se desea escalar, debe escalarse toda la aplicación

## implicancias para el desarrollo
![[Pasted image 20251029092129.png]]
Los distintos equipos de desarrollo y operaciones trabajan sobre
el mismo repositorio y sobre distintas partes de toda la aplicación, y no en forma desacoplada

### por que usar microservicios?
- La forma en que un sistema de software se empaqueta y se despliega afecta directamente ciertos atributos de calidad
	- Escalabilidad, disponibilidad, mantenibilidad, performance, etc.
- Esto suele alinear bien con procesos/equipos ágiles

- En 2002, Amazon formuló un conjunto de reglas para sus desarrolladores, que luego derivó en el concepto de microservicios
- Muchas de las guias de diseño para SOA también aplican a microservicios
	- Entonces cuál es la diferencia?

### explicacion detallada
Un (micro)servicio debe ser lo suficientemente “pequeño” como para ser desarrollado por un único equipo y ser facilmente testeable

- Principio de Responsabilidad Unica (POO), en el sentido que una clase o conjunto de clases deben tener una funcionalidad cohesiva y bajo acoplamiento con otras clases (que implementan otras responsabilidades)
- El servicio debe “encapsular” cambios relacionados a su responsabilidad

- Un microservicio no solo involucra su código fuente (por ej., SpringBoot) sino la capacidad de ser desplegado independientemente de otros microservicios -> runtime

## de monolito a micro-servicios
monolito:
- Un solo archivo ejecutable
- Que se despliega/escala como un todo

micro-servicios:
- Varios archivos ejecutables
- Que se despliega cada uno de forma autónoma
- Cada microservicio es multi-funcional: front-end, back-end, BD

Relación con la Ley de Conway
- Mayor independencia (y responsabilidad) de los equipos respecto a los servicios desarrollados


## microservicios y equipos
Cada servicio es propiedad de un único equipo
- Lo cuál significa que el equipo es responsable por todo el ciclo de vida del microservicio 
	 ->“you build it, you run it”
- La coordinación entre los equipos debiera estar limitada a las responsabilidades implementadas por cada microservicio y a las interfaces del servicio

#### gestion de DB
![[Pasted image 20251029095828.png]]

#### tipos de arquitecturas
![[Pasted image 20251029095842.png]]

### principios de arquitectura
Una arquitectura de microservicios es un tipo de arquitectura SOA 
- Aunque no toda arquitectura SOA tiene que ser de microservicios

Una arquitectura de microservicios prescribe que cada unidad de despliegue debe contener solo un servicio o uno pocos servicios cohesivos
- La restricción de despliegue es un factor distintivo

microservicios y contenedores:
Docker, Kubernetes, Rancher, etc.
	- Normalmente se suelen desplegar en ambientes cloud

### protocolos de comunicacion
- Los microservicios se comunican sólo mediante mensajes a través de la red
- La comunicación debe ser independiente de la tecnología de implementación de cada microservicio
- Algunos mecanismos comunes son:
	- REST (sobre HTTP)
	- Mensajes/eventos asíncronos

### ejemplo de aplicacion
![[Pasted image 20251029101016.png]]

### ejemplo mas complejo
![[Pasted image 20251029101038.png]]

## microservicios y atributos de calidad
(Como otros estilos arquitectónicos), los microservicios tienden a favorecer ciertos atributos de calidad:
- Availability and reliability
- Modifiability
- Performance
- Scalability
- Deployability
- Service autonomy
- …

### modificabilidad
- El equipo puede re-diseñar y re-desplegar cada microservicio independientemente
- El equipo tiene liberar para emplear distintos lenguajes, frameworks, bibliotecas y patrones para diseñar e implementar cada microservicio
- Los microservicios son componentes poco acoplados, y accesibles solo a través de sus contratos
- Sin embargo, el desarrollo de microservicios suele implicar un esfuerzo extra de programación (en comparación a ”sin microservicios”)

### reusabilidad
- El objetivo es reusar un microservicio dado en otra aplicación
- Una posible limitación es la dependencia de otros componentes
- Otro aspecto a considerar es la “cantidad” de funcionalidad asignada a un microservicio (la regla de “las 2 pizzas” es discutible)
- Fan-out: el número de servicios “hijos” dependientes de un microservicio que los invoca directamente

tipos de fan-out:
- Fan-out en amplitud (shallow): el microservicio tiene varios hijos (directos) y la cadena de solicitudes (profundidad) es normalmente corta
	- Menos paso de mensajes
		-> menor latencia
- Fan-out en profundidad (deep): el microservicio tiene un número pequeño de hijos (directos), pero la cadena de solicitudes puede ser larga
	- Mayor paso de mensajes -> mayor latencia, pero también un mayor potencial de reusabilidad de microservicios Deployment and Operations for Software Engineers


### escalabilidad
- Cada microservicio puede ser escalado independientemente, utilizando pools, clusters y grids (entre otros mecanismos)
	- Escalado horizontal, que generalmente involucra contenedores o VMs
- Las facilidades de despliegue de los microservicios hacen que tengan una buena alineación con la elasticidad de los ambientes de cloud computing

#### relacion con spring
![[Pasted image 20251029101529.png]]

# desarollo de microservicios
- Descomposición del problema y modelamiento/diseño en términos de entidades y servicios
- Granularidad de cada uno de los servicios
- Protocolos de comunicación
- Diseño de las interfaces
- Endpoints a exponer
- Gestión de configuración y despliegue
- Procesamiento de eventos
- Por ej., para comunicar cambios de estado o datos
- Descubrimiento y ruteo de servicios
- Balanceo de servicios y resiliencia
- Seguridad
- Logging y trazabilidad
- …

# algunos patrones

ruteo y descubrimiento:
![[Pasted image 20251102110900.png]]

resiliencia:
![[Pasted image 20251102110921.png]]

seguridad:
![[Pasted image 20251102111452.png]]

logging y trazabilidad:
![[Pasted image 20251102111512.png]]

## estandarizacion de servicios REST
- Uso de URIs descriptivas. Ejemplo:
	- www.myweather.com/avg/{city}/{month} [Not OK]
	- www.myweather.com/averages/city/{city}/month/{month} [OK]
- Uso de parámetros en queries para
	- Paginación. Ejemplo: /forecast/monthly/{city}?page=1
	- Filtrado de atributos. Ejemplo:
		/forecast/monthly/{city}?attributes=max,min
	- Criterios de búsqueda. Ejemplo:
		/severeweatheralerts?year=2015&month=9

- Elección de use-of-hyphen por sobre use_of_underscore
	- Alternativas: useOfCamelCase, lowercaseonly
- Usar ya sea singular o plural para los sustantivos, de forma consistente

- Usar métodos HTTP para indicar la acción a realizar. Ejemplo:
	- http://www.myweather.com/getCurrentTemp/zip/{zipCode} [Not OK]
	- GET http://www.myweather.com/currentTemp/zip/{zipCode} [OK]

- Elegir qué método HTTP utilizar en cada situación. Ejemplos:

| http method | when to use it                                                                   |
| ----------- | -------------------------------------------------------------------------------- |
| get         | Queries and read-only operations (no data should be modified)                    |
| put         | Updates on resources in an idempotent fashion                                    |
| delete      | Removal of resources in an idempotent fashion                                    |
| post        | Resource creation; or<br>non-idempotent updates or other operations on resources |
| patch       | Partial updates (i.e., only part of the resource is updated)                     |
HTTP **status codes** para respuestas:
- 200: success
- 201: successful resource creation
- 202: successful start of a request that will be handled asynchronously
- 400: data validation error or request processing error
- 401: invalid user credentials provided for authentication
- 403: access denied (authorization failure)
- 404: the requested resource was not found
- 409: the request creates a conflict (e.g., duplicate key on resource creation)
- 415: the request content-type header is an unsupported media type
- 500: unexpected error processing the request

# recapitulacion
- Un (micro)servicio debe ser lo suficientemente “pequeño” como para ser desarrollado por un único equipo y ser facilmente testeable
	- Principio de Responsabilidad Unica (POO), en el sentido que una clase o conjunto de clases deben tener una funcionalidad cohesiva y bajo acoplamiento con otras clases (que implementan otras responsabilidades)
	- El servicio debe “encapsular” cambios relacionados a su responsabilidad 
- Un microservicio no solo involucra su código fuente (por ej., SpringBoot) sino la capacidad de ser desplegado independientemente de otros microservicios 
	- -> runtime

### modelado de microservicios
Dos estrategias
1. Descomponer el problema en base a capacidades del negocio
2. Descomponer el problema en base a sub-dominios

Mas generalmente, se aplica un enfoque denominado DDD (Domain-Driven Design)


### descomposicion por capacidades del negocio
![[Pasted image 20251102113945.png]]

### domain-driven design (DDD)
- Es una técnica de modelamiento que captura “dominios” y servicios asociados, que luego progresivamente sirven para derivar los microservicios del sistema
![[Pasted image 20251102114038.png]]

descomposicion por sub-dominio
![[Pasted image 20251102114056.png]]

![[Pasted image 20251102114113.png]]


## patrones mas tecnicos
- Database per microservice
- Shared database
- Wrapper service
- Service data replication
- Gateway
- EDA (Event-driven Architecture)
	- Orquestación
	- Coreografía
- Circuit-breaker

### patron: base de datos por microservicio
- A fin de incrementar la autonomía de cada servicio (por ej., cuando se despliega), cada microservicio funciona con una base de datos dedicada
	- Puede ser una base de datos fisicamente separada, lo cual permite distintos tipos de bases de datos (por ej., relacionales, NoSQL, etc.)
	- Pueden ser tablas distintas, y separadas lógicamente, dentro de la misma base de datos
- Otros componentes no conocen dicha base de datos
- Todas las llamadas a otros microservicios se hacen via APIs REST
![[Pasted image 20251102114333.png]]

#### ejemplo de BD por microservicio
![[Pasted image 20251102114546.png]]

- puede requerir sincronizaciones de datos entre las bases de datos


## patron: service data replication
- Un servicio necesita acceder a datos que pertenecen a otro servicio, o son compartidos con otros
- Una solución es crear una base dedicada para el servicio que replique los datos requeridos desde la base maestra
	- Esto requiere un mecanismo de sincronización para actualizar la réplica
	- Triggers, integración vía ETLs, mensajería punto-a-punto a pub/sub
	- Puede generar stale data, o necesidad de sincronizar de ambos lados

## event-driven architecture (EDA)
- Es un estilo arquitectónico en el cual los componentes se comunican principalmente a través del envío de mensajes o eventos de manera asincrónica
![[Pasted image 20251102115831.png]]

## microservicios sin EDA
 - Los consumidores invocan operaciones sobre los servicios
- Las llamadas a los servicios son sincrónicas (solicitud-respuesta)
![[Pasted image 20251102115934.png]]


## microservicios con EDA
- En EDA, los publicadores anuncian eventos, y los servicios actúan en base a ellos
- Esto aporta mantenibilidad, escalabilidad y confiabilidad (pero también, complejidad)

![[Pasted image 20251102120119.png]]

- Para mejorar la autonomía, se puede crear una base de datos dedicada por microservicio, con una replica de los datos que necesita tomados de una base de datos (master) compartida
![[Pasted image 20251102120146.png]]

# migracion ( de monolito ) a microservicios
- por ejemplo, a traves del patron Strangler
![[Pasted image 20251102120228.png]]

## productividad versus complejidad
- La complejidad disminuye la productividad
- En sistemas poco complejos, microservicios agrega complejidad técnica que no tiene ROI positivo respecto al monolito
- En sistemas complejos, la independencia de cada equipo ofrece un aumento de productividad que compensa el costo técnico

![[Pasted image 20251102120515.png]]

