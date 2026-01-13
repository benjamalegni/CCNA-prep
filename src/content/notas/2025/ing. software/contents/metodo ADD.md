1. idea vaga
2. escribir
3. idea enriquecida (conocimiento)
4. comunicar/revisar

### enfoques para diseno
![[Pasted image 20251102121821.png]]

### attribute-driven design (ADD 3.0)
-  El ADD fue desarrollado por el SEI a fin de aplicar atributos de calidad en la creación de arquitecturas de software
- Sirve como guía para asegurarse que se están tomando bien las decisiones, y también para diseñar sistemáticamente
- El ADD sigue un proceso de diseño recursivo basado en la descomposición de un sistema (o elemento del sistema) por medio de tácticas y patrones que satisfacen los requerimientos claves

### el contexto del diseno
![[Pasted image 20251102122944.png]]

### descomposicion en ADD
![[Pasted image 20251102123019.png]]

### iteraciones de diseno (ADD)
![[Pasted image 20251102123140.png]]

## sesiones de diseno
- Un grupo (pequeño) de arquitectos, desarrolladores, analistas, y expertos, que toma ítems de un backlog de arquitectura (ej. JIRA)
	- Requerimientos funcionales claves
	- Escenarios de atributos de calidad (calidad de servicio, volumetría, etc.)
- Toma de decisiones y otras consideraciones
	- Pizarrón (sketch) + notas
	- No es estrictamente un “documento de arquitectura” (SAD)
	- La fase de consolidación de un SAD puede venir más tarde

#### ejemplo de sketch + notas
![[Pasted image 20251102123532.png]]
![[Pasted image 20251102123646.png]]

### registro de dicisiones
- Puede utilizarse un template (por ej., 1-2 páginas) o algún otro mecanismo
	- Lo importante es capturar las decisiones y sus consecuencias
	- Suele acompañarse con alguna vista de arquitectura
	- También se capturan los puntos “abiertos/pendientes” de la sesión (issues)
![[Pasted image 20251102123734.png]]
![[Pasted image 20251102124156.png]]

## conceptos de diseño 
- Los sub-problemas atacados en una iteración generalmente pueden resolverse (re-)usando soluciones existentes
- Ejemplos de conceptos de diseño incluyen:
	- Arquitecturas de Referencia
	- Patrones
	- Tácticas
	- Componentes de terceros (ej., frameworks)
	- Familias de tecnologías
![[Pasted image 20251102124300.png]]

## objetivo de la iteracion (paso 2)
- Architectural Drivers: Un sub-conjunto de requerimientos que “dan forma” a la arquitectura
	- Requerimientos funcionales
	- Requerimientos de atributos de calidad (escenarios)
	- Restricciones
- Otros posibles drivers incluyen:
	- El tipo de sistema que se está diseñando (greenfield, brownfield)
	- Objetivos de diseño (diseño rápido para estimar, incremento de un sistema evolutivo, etc.)
	- Concerns (decisiones a tomar, aún cuando esté implícito)

## seleccion de conceptos de diseno (paso 4)
![[Pasted image 20251102124619.png]]


### seleccion en "greenfield" con dominio maduro
![[Pasted image 20251102124746.png]]
- Pueden no existir arquitecturas de referencia o patrones de despliegue
- Como alternativa, se pueden desarrollar “prototipos”
	- Que puedan irse evolucionando
	- Analizando atributos de calidad
	- Aplicando distintas tácticas

### seleccion en "brownfield"
Requiere (inicialmente) un buen entendimiento de la arquitectura existente
- Sistemas legados
Generalmente involucra actividades de refactoring (de diseño)
- Mejoras estructurales
- Mejor soporte de ciertos atributos de calidad
- Evaluar impacto de realizar el refactoring
![[Pasted image 20251102125520.png]]


### ANALIZAR DISEÑO,Y VERIFICAR CUMPLIMIENTO DEL OBJETIVO DE LA ITERACIÓN (PASO 7)

Al finalizar cada iteración, es recomendable verificar si las decisiones tomadas y el análisis realizado proveen suficiente evidencia para justificar que: 
- Se cumplen con los escenarios de calidad deseados (tanto los de la iteración) como los atacados en iteraciones previas
- Se satisfacen los lineamientos generales de arquitectura
- Las decisiones de diseño guardan conformidad con la implementación
 
 Las revisiones pueden ser:
- Manuales, basadas en herramientas (por ej., chequeos estáticos), análisis de logs, basadas en prototipos
Son útiles para identificar pendientes/issues/riesgos hasta el momento en el proyecto


### caso de estudio con ADD
Aplicado a una arquitectura Big Data
- Una empresa provee servicios contenidos y servicios online a millones de usuarios Web
- La empresa recolecta y analiza logs de datos masivos,
que se generan de su infraestructura
- Distintos requerimientos de recolección (y cambiantes)
por parte de distintos clientes
- Volumen y velocidad (near real-time)
- Es un contexto de diseño greenfield

#### casos de uso
![[Pasted image 20251102153928.png]]


#### escenarios de atributos de calidad
![[Pasted image 20251102153945.png]]

#### restricciones y concerns
![[Pasted image 20251102154004.png]]

#### priorizacion
- La priorización es importante para focalizar el esfuerzo y “forzar” tradeoffs
![[Pasted image 20251102154024.png]]

#### conceptos de diseno para big data
https://patterns.arcitura.com/big-data-patterns
https://smartdecisionsgame.com/
http://lambda-architecture.net/
![[Pasted image 20251102154332.png]]

#### relacion con tecnologias
![[Pasted image 20251102154353.png]]


### resumen del analisis de un caso
- se identifican las diferentes entradas requeridas por el método
- se parte de una arquitectura de referencia (particionamiento inicial)
- se instancia la arquitectura en base a los requerimientos funcionales (horizontal)
- se seleccionan las distintas tecnologías y patrones (horizontal y vertical)
- en el camino, se tomaron decisiones y se crearon diagramas
