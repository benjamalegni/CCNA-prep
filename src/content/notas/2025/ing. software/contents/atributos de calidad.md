# requerimientos de software
 Para diseñar un sistema, se necesitan:
- El contexto del sistema
- Los requerimientos funcionales
	→ casos de uso, historias de usuario
- Los requerimientos de atributos de calidad
	→ escenarios de atributos de calidad
- Restricciones impuestas por el contexto o por los stakeholders

 Los atributos de calidad son no operacionales, y por lo tanto deben ser interpretados en contexto!
## como se usan los atributos de calidad
- En licitaciones
- Liderando un grupo
- Cuando analizamos un requerimiento
- Evaluando o eligiendo arquitecturas (o herramientas)
- Complementando metodologías (agiles)
- Comunicando …

distintas clasificaciones
ISO Srd 9126
IEEE Std 1061
Mitre

### tradeoffs (puntos de balance)
 - Los atributos de calidad pueden entrar en conflicto unos con otros
	- Performance versus seguridad
	- Seguridad versus disponibilidad
	- Performance versus modificabilidad

- El objetivo es evaluar múltiples atributos de calidad
- Y diseñar un sistema que sea “good enough” para los stakeholders

## CAPTURA DE ESCENARIOS DE CALIDAD
De la misma manera que hay templates para capturar requerimientos funcionales, debieran poder capturarse los atributos de calidad
- Esto es de gran ayuda para analistas, arquitectos, y desarrolladores
Un posible template son los escenarios de calidad del SEI, que se basan
en un formato con 6 partes
- Existe un template específico para cada atributo de calidad

#### idea del proceso
![[Pasted image 20251010143908.png]]

#### ejemplo de disponibilidad: importante para ejercicios (este es el template SEI)
![[Pasted image 20251010144124.png]]

### escalabilidad 
se refiere al impacto de agregar o remover recursos de TI

Tiene impacto principalmente en 3 aspectos:
- Capacidad: La cantidad de datos que el sistema puede manejar o usar
- Tiempo de respuesta: Lo que tarda el sistema en responder a un evento, o realizar un cierto procesamiento
	- A diferencia del atributo de Performance, la cuestión es qué sucede si el sistema escala (por ej., crece la demanda)
- Throughput: la cantidad de unidades de trabajo que el sistema puede realizar en un período de tiempo dado

### escenarios de escalabilidad
Reutilizar el modelo de template del SEI, pero (re-)definiendo
los valores de las 6 partes
- Se debe determinar, por ejemplo:
- Número de usuarios
- Volumen de datos
- Número de dispositivos externos
- …

“El sistema debe ser capaz de gestionar despliegues de hasta
1000 dispositivos, que pueden genera un gran volumen de
eventos, sin degradar sus tiempos de procesamiento”

#### arbol de utilidad
![[Pasted image 20251010145748.png]]
(importancia, riesgo)

#### escenarios y casos de uso
![[Pasted image 20251010145923.png]]

#### captura de restricciones
![[Pasted image 20251010150036.png]]


## metodo QAW
Es un método facilitado que involucra a los stakeholders del sistema desde etapas tempranas en el ciclo de vida, a fin de descubrir los atributos de calidad clave para un **sistema**
![[Pasted image 20251010150631.png]]
puntos clave:
- centrado en el sistema
- focalizado en los stakeholders
- utilizado normalmente antes de que se construyera la arquitectura

cuando realizar un QAW:
- Fase inicial de un enfoque centrado en Arquitectura
	-> Inception
- Compatible con métodos ágiles como Scrum (sprint 0)
- Caso de un sistema legado (donde ya existe una arquitectura inicial)
	- Sistema brownfield
	- Plan de arquitectura, sistema as-is versus sistema to-be

##### config tipica del workshop![[Pasted image 20251010150715.png]]

#### dinamicas agiles para QAW
- Entrevistar stakeholders
	- Entrevistas (normalmente semi-estructuradas) con cada uno de los stakeholders
- Mini QAW
	- Es una versión “liviana” del QAW del SEI
- Response measure Straw man
	- Mecanismo para aproximar medidas de respuesta de escenarios
- Stakeholder map
	- Crear un diagrama (tipo red) de los distintos actores involucrados o impactados por el sistema

#### entrevistar stakeholders
- Partir de información general
- Validar escenarios iniciales de atributos de calidad, así como otros requerimientos significativos arquitecturalmente
- Una vez realizadas todas las entrevistas, resumir en una visión global de concerns y posibles riesgos

#### stakeholder map
- Mayormente realizado por el equipo del proyecto
- Conectar a los stakeholders en términos de necesidades, relaciones, objetivos, etc.

#### mini QAW
- Brainstorming
- Partir de escenarios “crudos”, para ir priorizarlos y refinar aquellos que se determinen como de alta prioridad


| agenda item                                    | timing                  | hints                              |
| ---------------------------------------------- | ----------------------- | ---------------------------------- |
| introduce the mini-QAW                         | 10 min                  |                                    |
| Teach participants about<br>Quality Attributes | 15 min                  | set up participants up for success |
| brainstorm raw scenarios                       | 30 min - 2+ hours       | walk the system properties web     |
| prioritize raw scenarios                       | 5 min                   | use dot voting                     |
| refine scenarios                               | ==until time runs out== | finish as homework                 |
| review the results                             | 1 hour                  | separate, future meeting           |

# resumen
- Funcionalidad y atributos de calidad son ortogonales
- El alcance de los atributos de calidad debe ser considerado a lo largo del diseño, implementación y deployment
- Los atributos de calidad normalmente llevan a tradeoffs
- Existen los escenarios para relevar atributos de calidad
- Los resultados satisfactorios dependen de la arquitectura (big picture) y también de la correcta implementación (los detalles)

