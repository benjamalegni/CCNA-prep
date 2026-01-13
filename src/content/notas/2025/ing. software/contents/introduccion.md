### diseno de software
- planificar antes de construir
- facilitar la comunicacion con multiples stakeholders
- proveer con un **modelo de analisis** "manejable" para sistemas complejos
- brindar **preescripciones** para la implementacion del sistema
- la arquitectura es un artefacto, pero tambien parte del proceso de desarrollo (architecting)

#### example: client-server architecture
![[Pasted image 20250906182504.png]]
Estructura:
![[Pasted image 20250906182534.png]]
Category: Component & Connector or Allocation 

Elements: Tier—a logical grouping of runtime components. There are many ways to partition tiers. Some examples include functional responsibilities, compute platforms, team responsibilities, communication mechanisms, security requirements, and data access. 

Relations Belongs to—used to group components into a tier. Communicates with—shows how tiers or the components within interact with one another. This relation may be specialized to include information about protocols and communication constraints. Allowed to communicate with—indicates which tiers may communicate with components in other tiers. Allocated to—maps tiers to physical compute platforms. 

Rules for use: A component may belong to only one tier. Components within a tier are only allowed to communicate with other Rules for Use components within the same. Additional constraints describing tier communication can enhance reasoning and improve maintainability. A common approach is to allow communication only among adjacent tiers. 

Strengths: Promotes security, performance, availability, maintainability, modifiability. Can be used to reason about costs and deployment. Strengths 

Weaknesses: As a runtime construct, tiers can be difficult to enforce in large systems. Systems with many tiers can inhibit performance and maintainability.

## filosofia
crear -> comunicar -> analizar

## referencias bibliograficas
Software architecture in practice
Design it!
Designing software architecures
Design patterns

# Arquitectura de software
## requerimientos e implementacion
la breca entre los requerimientos y la implementacion es a menudo demasiado grande.

El rol de la arquitectura:
la arquitectura actua como "puente" entre los requerimientos del sistema y su implementacion
![[Pasted image 20250906183117.png]]

### def. Arquitectura
"software architecture is the structure of a software product. This includes elements, the externally visible properties of the elements, and the relationships between the elements"
"all architecture is design but not all design is architecture. Architecture represents the significant design decisions that shape a system, where significant is measured by cost of change"

![[Pasted image 20250906183316.png]]

#### funcion de un arquitecto de software
![[Pasted image 20250906190819.png]]

### ej: mi calculadora app
![[Pasted image 20250906185833.png]]

### arquis como blueprints
![[Pasted image 20250906190221.png]]

### arquis como decisiones
![[Pasted image 20250906190244.png]]

#### ejemplos de decisiones de arquitectura
- uso de un patron de layers para organizar el sistema
- insercion de un intermediario para separar la aplicacion que requiere un web service de la aplicacion que provee (e implementa) dicho servicio
- utilizacion de encriptacion con clave simetrica?
- utilizacion de un algoritmo que garantiza que no se producen memory leaks?

Are you a software architect? https://www.infoq.com/articles/brown-are-you-a-software-architect/

### concepciones erroneas
- la arquitectura de software no es la arquitectura del sistema (o de la computadora)
- la arquitectura de software no es una vista de la funcionalidad
- la arquitectura de software no es un dibujo "conceptual" de cajas y flechas
![[Pasted image 20250914200543.png]]

#### algunos casos de la vida real
- un sistema de procesamiento de logs (de peliculas) para crear un dashboard funciona correctamente, pero presenta problemas cuando se quiere incrementar el numero de dispositivos que envian sus logs para procesar
- un sistema de BI existente debe integrar fuentes de datos no estructuradas ( e importantes para el negocio), y el esfuerzo para implementar dicha integracion demora 6 meses mas de lo previsto
- un sistema de reservas turisticas presenta fallas en ciertos servicios (en tiempo de ejecucion), que hace que se pierdan las consultas previas a distintos proveedores, y degrada la experiencia de usuario

### que tienen en comun?: atributos de calidad
sin atributos de calidad:
- el sistema implementa la funcionalidad correcta pero:
	- "anda lento"
	- permite que los hackers roben datos
	- esta caido la mayor parte del tiempo
	- no escala
	- dificil realizar cambios o integraciones
con atributos de calidad:
- hablan sobre la calidad esperada del sistema:
	- estan definidos desde el punto de vista de los stakeholders de manera precisa (no ambigua)
	- permite "testear" si el requerimiento de atributo de calidad se satisface o no

## atributos de calidad (en general)
propiedades (sistemicas) de un producto de software a traves de las cuales los stakeholders juzgan la calidad del producto
- performance
- seguridad
- modificabilidad
- disponibilidad
- usabilidad
- portabilidad
- estabilidad
- escalabilidad
- "webifyability"
- sustentabilidad
- *y otros*

## calidad de la arquitectura
- integridad conceptual
	- el sistema se construye a partir de un numero pequeno de estructuras arquitectonicas que interactuan en un numero pequeno de formas (predeterminadas)
	- se logra tipicamente via un solo arquitecto, o un grupo de arquitectos pequeno y coordinado
- correctitud/completitud
	- la arquitectura debe permitir la satisfaccion de todos sus requerimientos funcionales y de calidad
- buildability
	- el sistema debe poder construirse con los recursos disponibles

diseno de software motivacion: maestro en ajedrez

1. Aprender las reglas del juego
2. Aprender los principios
3. Ver jugar a otros
4. Aprender aperturas, teoría de finales, de medio juego, etc.
5. Estudiar las partidas de otros maestros
• Estas partidas contienen docenas de patrones, que deben ser entendidos, memorizados, y
aplicados (con variaciones) a situaciones prácticas
### la solucion a distintos niveles de abstracion
idioms (uso de un lenguaje de implementacion) -> design patterns (soluciones a cuestiones especificas de diseno) -> architectural styles (organizacion global del sistema)

soluciones estructurales (de software) que se encuentras en forma repetida en la practica con ventajas y desventajas conocidas



## estilos arquitectonicos
![[Pasted image 20250914201956.png]]

## arquitectura e implementacion
- las decisiones de arquitectura sirven como **guias** para la implementacion de un sistema
- adicionalmente, existen **otras decisiones (de diseno detallado, de implementacion)** que deben tomarse cuando se materializa un arquitectura en codigo
- por otro lado, existen arquitecturas de referencia y tecnologias que facilitan la implementacion




# design patterns (libro)
- reconocer y **catalogar estos patrones ofrece un vocabulario de diseno,** a traves del cual comunicar soluciones entre disenadores
- el proceso de diseno deja de ser una actividad intensiva de resolucion de problemas, para ser una actividad sistematica de aplicacion de conocimiento establecido

## catalogo de gang of four

| **jurisdiccion** | **creacional**   | estructural | comportamental          |
| ---------------- | ---------------- | ----------- | ----------------------- |
| *clase*          | factory method   | adapter     | template method         |
| *objeto*         | abstract factory | adapter     | chain of responsibility |
|                  | prototype        | bridge      | command                 |
|                  | singleton        | facade      | iterator                |
|                  |                  | proxy       | mediator                |
|                  |                  | flyweight   | memento                 |
|                  |                  |             | observer                |
|                  |                  |             | state                   |
|                  |                  |             | strategy                |
|                  |                  |             | visitor                 |
| *compuestos*     | builder          | composite   | iterator                |
|                  |                  | decorator   | visitor                 |

# diseno con design patterns
- metodo clasico: separar el problema en clases y distribuir responsabilidades entre ellas para resolverlo
- mejora de diseno: analizar el diseno (actual) de la aplicacion y aplicar patrones para aumentar la flexibilidad y reusabilidad de partes especificas del diseno
	- bajo la forma de refactoring
- diseno conducido por patrones: para cada problema relevante: procurar un patron que resuelva algun problema similar y aplicar el patron al diseno actual

# documentacion de un patron
*intencion:* que es lo que el patron hace? que problema particular de diseno resuelve?

*motivacion:* un escenario en el cual el patron es aplicable, el problema de diseno que el patron encara y las estructuras de clases y objetos utilizadas para resolver el problema

*aplicabilidad:* en cuales situaciones el patron puede ser aplicado? cuales ejemplos de diseno inadecuados el patron puede mejorar? como reconocer tales situaciones?

*participantes:* descripcion de las clases y/o objetos participantes en el patron y sus responsabilidades

*colaboraciones:* describe como los participantes colaboran para realizar sus responsabilidades

*diagrama:* una representacion grafica del patron utilizando notacion UML, extendida con el pseudo-codigo de los metodos

*consecuencias:* como soporta sus objetivos el patron? cuales son los compromisos y resultados de utilizarlo? que aspectos de la estructura del sistema permite que sean variados independientemente

*implementacion:* cuales tecnicas deberian ser tomadas en cuenta cuando se implementa el patron? existen dependencias con aspectos especificos del lenguaje de programacion?

*ejemplos:* ejemplos de sistemas reales, en diferentes dominios de aplicacion

# resumen
- mas alla de la escala del sistema, la arquitectura es una **abstraccion apropiada** para razonar acerca de como se satisfacen ciertos objetivos del negocio o de calidad
- los **atributos de calidad** tienen una influencia dominante en la arquitectura de un sistema
- la obtencion de un diseno satisfactorio depende de la arquitectura (big picture) pero tambien de su correcta implementacion (los detalles)
- el codigo debe reflejar las **decisiones de diseno arquitectural**