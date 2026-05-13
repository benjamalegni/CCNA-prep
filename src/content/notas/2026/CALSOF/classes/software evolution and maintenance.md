# leyes de Lehman
1. cambio continuo
2. complejidad creciente
3. auto regulacion
4. conservacion de la estabilidad organizacional
5. conservacion de la familiaridad
6. crecimiento constante
7. disminucion de la calidad
8. sistema de feedback

cambio continuo:
"An E-type program that is used in a real-world environment must be continually adapted, else it becomes progressively less satisfactory"

complejidad creciente:
"As a program is evolved its complexity increases unless work is done to maintain or reduce it"

auto regulacion:
"Program evolution is a self-regulating process. System attributes such as size, time between releases and the number of reported errors is approximately invariant for each system release"

conservacion de la estabilidad organizacional:
"The average effective global activity rate on an evolving system is invariant over the product life time.“

conservacion de la familiaridad:
"Over the lifetime of a system, the incremental change in each release is approximately constant"

crecimiento continuo:
"Functional content of a program must be continually increased to maintain user satisfaction over its lifetime”

disminucion de la calidad:
"E-type programs will be perceived as of declining quality unless rigorously maintained and adapted to a changing operational environment"

sistema de feedback:
"E-type programming processes constitute multiloop, multi-level feedback systems and must be treated as such to be successfully modified or improved"

## resumen leyes de Lehman
- software util debe **evolucionar o morir**
- a medida que el software crece, su complejidad limita sus posibilidades de crecer
- el esfuerzo de desarrollo es constante (lineal)

a diferencia de las personas, el software no envejece por el tiempo sino por no cumplir con las necesidades de los stakeholders

## razones de envejecimiento
- Nuevos requerimientos 
- Cambios en el ambiente de negocio
- Nuevas tecnologias y equipamiento 
- Atributos de calidad 
- Bugs 
- Uso de malas prácticas de programación/diseño


**SonarQube** es una plataforma para evaluar código fuente. Es software libre y usa diversas herramientas de análisis estático de código fuente como Checkstyle, PMD o FindBugs para obtener métricas que pueden ayudar a mejorar la calidad del código de un programa.​

# linters
- Herramientas que analizan el código fuente sin ejecutarlo 
- Detectan errores, inconsistencias y malas prácticas 
- Primera línea de defensa contra bugs, deuda técnica y código difícil de mantener  
- Fundamentales para sostener la calidad y la consistencia en el tiempo

## linters y evolucion
- Detectan problemas antes de que el código llegue a producción 
- Promueven consistencia entre múltiples desarrolladores y equipos 
- Previenen la acumulación de deuda técnica silenciosa 
- Ayudan a mantener el código refactorizable y legible en el tiempo 
- Son clave en procesos de CI/CD y revisiones automáticas de código

## linters: detecciones
- Uso de variables no definidas o no utilizadas 
- Nombres de funciones inconsistentes o confusos 
- Código duplicado o estructuras innecesarias 
- Violaciones a convenciones de estilo (ej. PEP8) 
- Riesgos de seguridad o performance (linters avanzados)

# mantenimiento
- es el proceso de modificar un sistema de software o un componente despues de que este fue entregado con el objetivo de:
	- corregir fallas
	- mejorar la performance u otros atributos
	- adaptar a cambios en el ambiente

## mantenimiento vs evolucion
- consideramos la evolucion una vez que se libera la primera version
	- mantenimiento: conjunto de actividades planificadas para realizar cambios
	- evolucion: lo que realmente sucede en el software
- El mantenimiento no involucra generalmente cambios en la arquitectura 
- La evolución es más que arreglar requerimientos “deficientes” – La evolución se enfoca en mejoras para los objetivos del negocio 
- En ocaciones no se puede evolucionar sin cambios “mayores” en la arquitectura

## tipos de mantenimiento
![[Pasted image 20260508095650.png]]
![[Pasted image 20260508095707.png]]

# diseñar para el cambio
- Nuestra habilidad para diseñar para el cambio depende de nuestra habilidad para predecir el futuro 
- El cambio es inevitable – No todo puede anticiparse en tiempo de diseño

## estrategias de diseño para el cambio
- Separación de concerns
	- el criterio de descomponer sistemas en modulos.
- Information hiding 
- Interfaces 
- Layers 
- Herencia + polimorfismo 
- Documentación actualizada 
- Test-driven development
![[Pasted image 20260508100013.png]]

## ingenieria inversa
- Analizar un sistema para: 
	- Identificar componentes del sistema y sus relaciones 
	- Crear un modelo del sistema 
- Técnicas: 
	- Inspección de código 
	- Profiling 
	- Entrevistas 
	- Análisis de historia

## reingenieria
- Modificar el sistema para: 
	- Mejorar su diseño 
		- Reducir complejidad 
	- Incorporar nuevos requisitos
![[Pasted image 20260508100222.png]]
“Es el proceso mediante el cual se hacen cambios en un sistema de software de forma tal que se mejore la estructura interna del mismo"

## tecnicas de refactoring
- Extract Method 
- Rename Method 
- Inline Method 
- Pull Up 
- Pull Down 
- Extract Class