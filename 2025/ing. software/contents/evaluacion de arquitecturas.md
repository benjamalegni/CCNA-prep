metodos centrados en arquitecturas
![[Pasted image 20251102181327.png]]

## formas de evaluacion
1. Realizada por el diseñador (dentro del proceso de diseño)
	- Similar a testing, pero de decisiones de diseño
	- Rápido, pero puede haber problemas de subjetividad
2. Realizada por pares (dentro del proceso de diseño)
	- Similar a peer review para código
	- Unas pocas horas, o ½ día, cuando existe algún diseño intermedio (o porción de la arquitectura)
	- Captura de problemas y monitoreo, a medida que el diseño progresa
3. Realizado por un equipo externo, una vez que la arquitectura ya ha sido diseñada
	- Evaluación mas objetiva, pero también mas costosa
	- En general se evalúa la arquitectura completa

## por que evaluar una arquitectura?
- ### porque es posible hacerlo
- La arquitectura de software es una de los artefactos tempranos del ciclo de vida, y captura las decisiones de diseño más significativas
- Tiene como objetivo analizar las consecuencias de las decisiones arquitectónicas con respecto a los requerimientos de calidad y a los objetivos del negocio
- Detectar riesgos en forma temprana
- Para luego proceder con el diseño detallado e implementación

### proposito del metodo ATAM
- El ATAM es un método de evaluación desarrollado por el SEI, que ayuda a los stakeholders a realizar las preguntas correctas y a descubrir y analizar decisiones que son potencialmente problemáticas en base a la arquitectura del sistema
- Identificación temprana de riesgos
- Planeamiento de acciones de mitigación
- ej., diseño adicional, modelos de análisis de atributos de calidad, prototipación
- Documentación (explicita) de tradeoffs relacionados con atributos de calidad

![[Pasted image 20251102181742.png]]
![[Pasted image 20251102181759.png]]

#### fases de ATAM
- las evaluaciones de ATAM tienen 4 fases:
![[Pasted image 20251102181912.png]]

### pasos de ATAM por arriba
1. Present the ATAM
2. Present business drivers
3. Present architecture
4. Identify architectural approaches
5. Generate quality attribute utility tree
6. Analyze architectural approaches
7. Brainstorm and prioritize scenarios
8. Analyze architectural approaches
9. Present results ( la organizacion debe tomar las medidas necesarias para capitalizar estos resultados)

### cuando utilizar ATAM?
- ATAM se puede utilizar durante todo el ciclo de vida, siempre y cuando **exista una arquitectura definida que se pueda evaluar**
- Algunos ejemplos de uso:
	- Luego que sea ha especificado una arquitectura, pero todavía no hay casi código implementado
	- Para evaluación de alternativas arquitectónicas
	- Para evaluación de la arquitectura de un sistema existente (a menudo, la documentación arquitectónica debe ser primero “reconstruida”)

- ATAM no es apropiado si la arquitectura del sistema no se ha creado

### beneficios de ATAM
Realizar una evaluación arquitectónica con ATAM permite:
- Clarificar requerimientos de atributos de calidad
- Mejorar la documentación de la arquitectura
- Crear una base de decisiones arquitectónicas clave
- Identificar riesgos en forma temprana (y tomar acciones en consecuencia)
- Mejorar la comunicación entre los stakeholders
el resultado genera en una **mejora substancial de la arquitectura**

# pasos de ATAM detallados
### 1. Presentar ATAM
El equipo de evaluadores (del SEI) presenta una resumen del ATAM
- Pasos de ATAM
- Técnicas utilizadas
-> 
	Utility tree
	Pattern-based elicitation
	Scenarios



- Salidas incluyen una lista de
	->
	Scenarios
	Architectural approaches
	Quality attribute questions
	Risks and “non-risks"

### 2. Presentar drivers del negocio
Un representante del cliente (o el manager) describe los objetivos de negocio principales del sistema, que incluyen:
- Contexto de negocio del sistema
- Requerimientos funcionales de alto nivel
- Requerimientos de calidad de alto nivel

**Architectural drivers**
quality attributes that “shape” the architecture
**Critical requirements**
quality attributes most central to system

### 3. Presentar la arquitectura
El arquitecto presenta un resumen de la arquitectura del sistema (diseño), que incluye:
- Restricciones técnicas tales como OS, middleware o hardware que vienen predeterminadas para el sistema
- Otros sistemas con los cuales el sistema en cuestión debe interactuar
- Enfoques arquitectónicos utilizados para satisfacer los requerimientos de calidad

El equipo del SEI comienza a analizar:
- riesgos
- patrones y mecanismos arquitectónicos

### 4. Identificar mecanismos arquitectonicos
La descripción de alto nivel de la arquitectura se completa, listando los patrones/mecanismos arquitectónicos utilizados en la arquitectura

- Ejemplos
	- Client-server
	- 3-tier
	- Pipeline
	- Publisher-subscriber
	![[Pasted image 20251102183613.png]]

### 5. Generar árbol de utilidad
Identificar, priorizar y refinar los objetivos relacionados con atributos de calidad mediante la construcción de un “árbol de utilidad”
- Un árbol de utilidad es un modelo jerárquico conducido por los requerimientos de calidad principales
- Típicamente, los nodos raíz son **performance, seguridad, y disponibilidad**; que luego se refinan en intereses (concerns) para cada atributo
- Las hojas del árbol son escenarios de calidad

output: una priorizacion de escenarios de atributos de calidad

#### arbol de calidad
Es un vehículo para organizar de manera jerárquica los aspectos y escenarios de calidad que conducen el diseño de un sistema
- La raíz del árbol expresa la utilidad global
- El 1er nivel de nodos se corresponde con los principales atributos de calidad
- Los nodos internos especifican distintos aspectos de cada atributo
- Las hojas son escenarios de calidad

Los escenarios son priorizados en base a 2 criterios:
- Importancia del escenario para el negocio
- Dificultad para soportar el escenario en la arquitectura

ej:
![[Pasted image 20251102183803.png]]

### 6. analizar enfoques arquitectonicos
El equipo del SEI investiga los enfoques arquitectónicos desde el punto de vista de los atributos de calidad, a fin de identificar riesgos
- Identificar enfoques que soportan los requerimientos de calidad con mas alta prioridad
- Generar preguntas especificas de atributos de calidad para dichos requerimientos con alta prioridad
- Realizar las preguntas especificas de atributos de calidad
- Identificar y asentar los riesgos y no-riesgos

ej: analisis de enfoques para un escenario
![[Pasted image 20251102183851.png]]


#### preguntas de atributo de calidad
- Estas preguntas investigan y analizan los enfoques/mecanismos arquitectónicos, a fin de extraer decisiones de diseño que involucran atributos de calidad
- Performance
	- How are priorities assigned to processes?
	- What are the message arrival rates?
- Modifiability
	- Are there any places there where the layers/facades are circumvented ?
	- What components rely on knowledge of message formats?

#### riegos y no-riesgos
- Los riesgos son decisiones arquitectónicas potencialmente problemáticas
- Los no-riesgos son buenas decisiones, que se apoyan en suposiciones implícitas
- Las partes de un riesgo y no-riesgo incluyen
	- La decisión arquitectónica en cuestión
	- El requerimiento de calidad afectado
	- El racional de diseño aplicado
	
- A menudo, los riesgos relacionados se agrupan en risk themes, y se utilizan al final del ATAM para elaborar recomendaciones

#### ejemplos de riesgos y no-riesgos
- Riesgo:
	- Rules for writing business logic modules in the second tier of your 3-tier style are not clearly articulated. This could result in replication of functionality thereby compromising modifiability of the third tier
- No-riesgo:
	- Assuming message arrival rates of once per second, a processing time of less than 30 ms, and the existence of one higher priority process, a 1 second soft deadline seems reasonable

#### puntos de sensibilidad y de tradeoff
- Un sensitivity point se define como una decisión o parámetros de la arquitectura que afecta (o hace que varíe) la respuesta de un escenario de calidad
	- ej., la disponibilidad de un subsistema depende del numero de backups activos y pasivos
- Los sensitivity points generalmente indican posibles riesgos
- Un tradeoff point se define como un sensitivity point donde confluyen mas de un escenario de calidad (en general, para atributos de calidad diferentes)
	- ej., el numero de backups afecta la latencia de la red, y en consecuencia, afecta la performance

### 7. Brainstorming y priorizacion
- Los stakeholders generan escenarios utilizando un proceso de brainstorming
- A cada stakeholder se le asigna un numero de votos, en general equivalente a .3x (nro. de escenarios)
- El equipo del SEI compara los escenarios priorizados con la salida del árbol de utilidad, y se trata de reconciliar las diferencias

#### generacion de escenarios "semilla"
- Los escenarios se usan para
	- Representar los intereses de los stakeholders
	- Entender (hacer concretos) los requerimientos de calidad
- Los escenarios “semilla” son muestras de escenarios

Los escenarios son específicos
Usos anticipados del sistema(use cases)
Cambios anticipados (growth scenarios)
Usos no-anticipados y de stress (exploratory scenarios)

#### ejemplos de escenarios
Los escenarios debieran ser lo mas especifico posibles
- Use case
	- Remote user comes via the web to access report database
- Growth scenario
	- Add a new data server to reduce latency by 50%
- Exploratory scenario
	- Half of the servers go down during operation

### 8. Mapear escenarios y analizar enfoques
- Identificar enfoques/mecanismos arquitectónicos, y elementos dentro de ellos que son afectados por cada escenario
	- ej., layers especificas afectadas por un cambio, dentro de un layered style
	
- Continuar identificando riegos y no-riesgos

- Este paso esta estrechamente relacionado con el conocimiento de patrones arquitectónicos, tácticas y mecanismos
	- Tanto en los evaluadores como en los representantes de la arquitectura evaluada

###  9. Presentar resumen
recapitular los pasos de ATAM

Presentar las salidas del ATAM
- Risks
- Non-risks
- Utility tree
- Scenarios
- Styles
- Questions
Ofrecer recomendaciones


## otros metodos de evaluacion
- PBAR - Basado en reviews que identifican y analizan patrones de arquitecturas de software
	- Para proyectos focalizados “en el producto”
	- No requiere documentación, solo realizar inferencias entre los patrones detectados y los QAs
	- Intenta reducir tiempo/esfuerzo
- LiSCia - Basado en chequeos (sanity checks) sobre la estructura de módulos del sistema
	- Orientado mayormente a mantenibilidad

# retrospectiva
- ATAM es un método útil y probado para identificar riesgos en la arquitectura
	- Las revisiones de arquitecturas se han difundido en los últimos años
	- Existen variaciones del ATAM para diferentes propósitos
	
- Dificultades percibidas
	- Se requiere cierta disciplina, para lograr progreso en las reuniones
	- Pueden existir problemas culturales
	- Reunir a los stakeholders principales puede ser complicado
	- Ante presiones de tiempo, las revisiones se recortan
	- No necesariamente la organización se hace cargo o utiliza los riesgos/resultados
