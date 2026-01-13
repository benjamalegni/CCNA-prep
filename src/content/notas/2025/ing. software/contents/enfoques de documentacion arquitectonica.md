### def de una arquitectura
*"The software architecture of a program or computing system is the* *structure or structures of the system, which comprise software* *components, the externally visible properties of those components, and* *the relationships among them”*

todos los sistemas tienen una arquitectura
- querida o no, probablemente no muy documentada
- puede ser ambigua, informal, inconsistente
- apela a la descripción verbal (y ambigua!)

#### que y cuando documentar?
![[Pasted image 20251102193404.png]]

## contenido de la documentacion
- Features y requerimientos funcionales
- Requerimientos de atributos de calidad (drivers)
- Restricciones

- Architecturally-significant decisions
- Estructuras arquitectónicas capturadas por medio de vistas arquitectónicas
- Comportamiento arquitectónico
- Interfaces (de componentes)
- Trazabilidad entre elementos

### multiples estructuras
- Una arquitectura es una entidad multi-dimensional que usualmente es demasiado compleja como para ser vista/comprendida toda de una vez

- Los sistemas están compuestos por varias estructuras
	- Aspectos estáticos
	- Aspectos dinámicos
	- Correspondencia entre aspectos estáticos y dinámicos
	- Comportamiento

### relacion entre estructuras
![[Pasted image 20251102193521.png]]

no siempre es un mapeo 1-1
![[Pasted image 20251102193532.png]]

## 3 vistas basicas
- Vista de Módulos
	→ construcción, análisis de impacto de cambios, testeo
	- Cómo se estructura en términos de un conjunto de unidades de código
- ![[Pasted image 20251102193721.png]]

- Vista de Componentes y Conectores (C&C)
	→ performance, disponibilidad
	- Cómo se estructura en términos de un conjunto de elementos que poseen comportamiento en tiempo de ejecución e interacciones con otros elementos
- ![[Pasted image 20251102193733.png]]

- Vista de Asignación (allocation)
	→ disponibilidad, seguridad, performance
	- Como se relaciona con las estructuras no-software en su ambiente
- ![[Pasted image 20251102193743.png]]

vista de asignacion de trabajo:
![[Pasted image 20251102193816.png]]

### documentacion de comportamiento
- trace-oriented
	- use cases
	- collaboration diagrams
	- sequence diagrams
	- message sequence charts
	- activity diagrams
	- …

- static
	- Statecharts
	- SDL diagrams
	- Z specifications
	- some ADLs
	- …

### asignacion de responsabilidades
![[Pasted image 20251102194006.png]]

## estrategias de documentacion
depende de la audiencia (stakeholders) a la que se esta apuntando con la documentacion
![[Pasted image 20251102194032.png]]

### views and beyond templates
![[Pasted image 20251102194058.png]]

### modalidad overlay
![[Pasted image 20251102194108.png]]

### modalidad jerarquico
![[Pasted image 20251102194120.png]]

## haiku
- requiere que el lector entienda el contexto
-  y tener un **vocabulario compartido**
![[Pasted image 20251102194147.png]]

#### otro ej de haiku
![[Pasted image 20251102194251.png]]

## architecture decision records (ADR)
- se persisten como parte del codigo fuente
- en formado md (markdown)
![[Pasted image 20251102194325.png]]
ejemplo de ADRs
![[Pasted image 20251102194424.png]]

### decisiones descentralizadas
- La descentralización no es “gratis”, requiere un “champion” y progresivamente que las capacidades arquitectónicas se propaguen a todo el equipo (por ej., desarrolladores)
![[Pasted image 20251102194444.png]]

### evolucion de decisiones
![[Pasted image 20251102194500.png]]

## HLD - entre haiku y ADRs
Puede utilizarse un template (por ej., 1-2 páginas) o algún otro mecanismo
- Lo importante es capturar las decisiones y sus consecuencias
- Suele acompañarse con alguna vista de arquitectura
- También se capturan los puntos “abiertos/pendientes” de la sesión (issues)
![[Pasted image 20251102194708.png]]

### diseno de alto nivel (HDL)
Una HLD es una pieza de **conocimiento arquitectónico** que captura un **conjunto de decisiones de diseño** relacionadas para una **parte del sistema**, en un formato conciso
- Describe uno o mas features de arquitectura, involucrando atributos de calidad y otros aspectos de diseño
- No es diseño detallado
- A menudo afecta varias historias de usuario
- Debiera ser un documento “vivo”

HLD Template
1. description
2. solution design
3. quelity-attribute-analyses
4. issues

## partes de una HLD
![[Pasted image 20251102195237.png]]
- Descripción
	- Principales requerimientos operacionales o contexto funcional
	- 3-4 párrafos
- Solución
	- Vista(s) arquitectónica(s)
	- Decisiones de diseño
	- Racional y otros aspectos
	- Suposiciones
	- 1-2 páginas

![[Pasted image 20251102195329.png]]
- Si las suposiciones cambian, se debieran revisar las decisiones

- Atributos de calidad
	- Explicar cómo se ataca cada atributo, en base a evidencia
		- Ej. información de volumetría

- Issues
- Aspectos no incluidos en la solución actual
	- Ej., falta de información de QAs
- Otros aspectos
	- Ej., prueba de concepto

### algunas lecciones aprendidas sobre HLDs
- Un buen mecanismo para capturar y comunicar la arquitectura a los stakeholders (no necesariamente desarrolladores)
- Aprovechamiento de los ”issues” para gestionar deuda técnica
- Desafíos
	- Los consumidores de las HLDs las consideran “artefactos informativos” más que prescriptivos
	- Los desarrolladores o analistas pueden tomar decisiones adicionales (que incluyo contradigan una HLD) y no comunicar estas decisiones al equipo de arquitectos
	- Resistencia a incorporar versiones refinadas de una HLD, una vez que la implementación ya se encuentra avanzada
	- Elicitación de información de atributos de calidad
	- Combinación de varias HLDs “parciales” en un diseño “global”


# resumen
-  La captura de las decisiones de arquitectura y de los issues correspondientes es clave
- Un desafío es la gestión de la deuda técnica

- ¿Cuáles de estas ideas/técnicas son factibles de implementar en el contexto de un proyecto?
- Estrategia de dosificación