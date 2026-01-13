Un estilo arquitectónico define una familia dearquitecturas, restringidas por:
- Vocabulario de tipos de elementos y de relaciones
- Reglas topológicas
- Restricciones semánticas

Un estilo puede verse como un “paquete” predefinido de decisiones de diseño

No define la funcionalidad de un sistema!

#### otras definiciones
-  “Una descripción de tipos de relaciones y elementos, junto con restricciones sobre cómo deben usarse” (Bass, Clements, Kazman)
- “Los estilos arquitectónicos son idiomas y patrones de organización que se repiten” (Garlan & Shaw)
- “Un estilo arquitectónico es una abstracción de características de composición e interacción recurrentes de un conjunto de arquitecturas” (Taylor)
- “Los estilos son idiomas de diseño que permiten la explotación de patrones de estructura y evolución y que facilitan el reuso de componentes, conectores y procesos” (Medvidovic)

## taxonomia
![[Pasted image 20251013173421.png]]

### cliente-servidor como patron
**Overview**  
Clients initiate interactions with servers, invoking services as needed from those servers and waiting for the results of those requests

**Client**, a component that invokes services of a server component. Clients have ports that describe the services they require.  
**Server**, a component that provides services to clients. Servers have ports that describe the services they provide. Important characteristics include information about the nature of the server ports (such as how many clients can connect) and performance characteristics (e.g., maximum rates of service invocation).  
**Request/reply connector**, a data connector employing a request/reply protocol, used by a client to invoke services on a server. Important characteristics include whether the calls are local or remote, and whether data is encrypted.
**Constraints**  
Clients are connected to servers through request/reply connectors.  
Server components can be clients to other servers.  
Specializations may impose restrictions:  
- Numbers of attachments to a given port  
- Allowed relations among servers  
Components may be arranged in tiers, which are logical groupings of related functionality or functionality that will share a host computing environment (covered more later in this chapter).

**Weaknesses**  
Server can be a performance bottleneck.  
Server can be a single point of failure.  
Decisions about where to locate functionality (in the client or in the server) are often complex and costly to change after a system has been built.


## vistas (estructurales) de arquitectura
- Vista de Módulos
	→ construcción, análisis de impacto de cambios, testeo
	- Cómo se estructura en términos de un conjunto de unidades de código
- Vista de Componentes y Conectores (C&C)
	→ performance, disponibilidad
	- Cómo se estructura en términos de un conjunto de elementos que poseen comportamiento en tiempo de ejecución e interacciones con otros elementos
- Vista de Asignación (allocation)
	→ disponibilidad, seguridad, performance
	- Como se relaciona con las estructuras no-software en su ambiente

#### instanciacion cliente-servidor (C&C)
![[Pasted image 20251013174033.png]]

#### otros estilos arquitectonicos
- Model-View-Controller
- Broker
- Cliente-server (n-tier)
- Service-oriented architectures
- Cloud computing
- Map-Reduce
- Microservicios?
- Blockchain?
- etc

### estilos "puros" y "aplicados"
Como primer finalidad, los estilos tienen un propósito “explicativo”, pero al aplicarlos a menudo se realizan ciertas concesiones
- Estilos puros: Son una idealización
	- Se corresponden con las descripciones dadas en la literatura, pero pocas veces aparecen como tales en implementaciones
- Estilos aplicados: Es una variante de un estilo puro que aparece en un sistema real
	- A menudo violan algunas de las restricciones (estrictas) de los estilos puros, involucrando puntos de balance con respecto a las propiedades del estilo original


### pipes al filters
![[Pasted image 20251013174234.png]]
### layers
![[Pasted image 20251013174255.png]]
### publisher-subscriber
![[Pasted image 20251013174316.png]]
### service-oriented architecture
![[Pasted image 20251013174342.png]]
### shared data
![[Pasted image 20251013174755.png]]
### multi-tier (client-server)
![[Pasted image 20251013174824.png]]

### arquitecturas heterogéneas: overlay
son las que resultan de la combinación de distintos estilos
![[Pasted image 20251013175036.png]]

### arquitecturas heterogéneas: jerarquico
![[Pasted image 20251013175052.png]]

#### llevando la arquitectura a codigo
![[Pasted image 20251013175859.png]]

## algunos ejemplos de criterios
Escalabilidad
	1. Costos (monetario, o mano de obra de desarrollo)
	2. Historial de la información (al menos es una suposición)

1. Performance de las consultas del operador (dependender de la conectividad)
2. Fiabilidad/”frescura”/integridad
3. Interoperabilidad
4. Usabilidad de los mecanismos de consultas
5. Seguridad
6. Tolerancia a fallas/disponibilidad
7. …
- Infraestructura


# resumen
Los estilos son claves para alcanzar los requerimiento de atributos de calidad
- Pueden tener impactos positivos y/o negativos sobre ellos
- Distintos estilos pueden combinarse
- Los estilos, bien entendidos, son unas de las principales herramientas de un buen arquitecto de software