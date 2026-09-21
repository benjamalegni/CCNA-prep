un proceso de software es un conjunto estructurado de actividades para desarrollar un sistema

specification (que hacer) -> 
design and implementation (como construirlo)
-> validation (verificar valor) 
-> evolution (adaptarse al cambio)

*esto es una representacion abstracta*

como describir un proceso:
- actividades
	- especificar
	- disenar
	- probar
	- desplegar
- productos
	- modelos
	- codigo
	- builds
	- documentacion
	- reportes
- roles
	- responsabilidades de devs
	- QA
	- cliente
	- manager
- condiciones
	- que debe ser cierto antes/despues de una actividad

en la practica, la mayoria de proyectos mezcla enfoques **agiles** y **plan-driven**
- plan-driven:
	- actividades planificadas por adelantado
	- progreso contra plan, hitos y documentacion
	- util cuando hay estabilidad y mucha coordinacion
- agile:
	- planificacion incremental
	- cambio incorporado durante el desarrollo
	- util con incertidumbre y feedback frecuente

## los tres modelos generales
waterfall: coordina bien, **tolera mal el cambio tardio**
incremental: entre valor temprano, **requiere disciplina tecnica**
- funciona bien si el equipo mantiene el codigo y la arquitectura en buenas condiciones mientreas va agregando funcionalidades
reuse-oriented: reduce desarrollo desde cero, exige compromiso de requisitos

### waterfall
etapas (ordenadas):
- requirement analysis
- system and software design
- implementation and unit testing
- integration and system testing
- operation and maintenance

| encaja mejor cuando                     | encaja peor cuando                              |
| --------------------------------------- | ----------------------------------------------- |
| requisitos bien entendidos              | el negocio cambia rapido                        |
| cambios esperados limitados             | el cliente descubre necesidades al ver software |
| necesidad de documentacion formal       | la solucion tecnica es incierta                 |
| trabajo coordinado entre sitios/equipos | el feedback llega tarde                         |
cuanto mas tarde aparece el cambio, **mas artefactos quedan desalineados**

### desarrollo incremental
el sistema crece por increments que se evaluan antes de seguir. **no significa improvisar, requiere arquitectura evolutiva, testing y refactoring**
- inc. 1: valor temprano
- inc. 2: feedback aplicado
- inc. n: sistema completo
la especificacion se desarrolla junto con el software, esto aumenta la adaptabilidad, pero exige control tecnico

beneficios:
- menos costo para acomodar requisitos cambiantes
- feedback temprano del cliente sobre el software ejecutable
- delivery y deployment de valor antes del final
- menor riesgo de descubrir problemas demasiado tarde

riesgos de este enfoque

| visibilidad                                         | estructura                                    |
| --------------------------------------------------- | --------------------------------------------- |
| managers piden entregables regulares                | cada increment agrega presion sobre el diseno |
| documentar cada version puede no ser costo-efectivo | sin refactoring aparece deuda tecnica         |
| el progreso puede parecer menos medible             | los cambios futuros se vuelven claros         |
### reuse oriented
COTS: aplicaciones configurables para un entorno particular
componentes: paquetes integrables en frameworks como .NET/J2EE
web services: servicios invocados remotamente como estandares

los requisitos se refinen segun lo que el mercado y los componentes permitan

requirements specification ->
software discovery ->
requirements refinement ->
system configuration ->
component adaptation

menos codigo propio no significa menos ingenieria: el desafio se mueve a integracion, adaptacion y control de evolucion


| ventajas                                 | trade offs                                   |
| ---------------------------------------- | -------------------------------------------- |
| menos software desarrollado desde cero   | compromisos inevitables en requisitos        |
| delivery y deployment mas rapidos        | dependencia de proveedores y roadmap externo |
| menor riesgo tecnico en partes conocidas | menor control sobre cambios futuros          |
# actividades del proceso

**requirements engineering process:**
establecer servicios requeridos y restricciones de operacion/desarrollo
- ¿Qué requieren o esperan los stakeholders? 
- ¿Cómo se definen los requisitos en detalle? 
- ¿Cómo verificamos que son válidos y consistentes?

elicitation y analysis ->
specification ->
validation

**design and implementation**
convertir la especificacion en un sistema ejecutable

| software design                               | implementation                               |
| --------------------------------------------- | -------------------------------------------- |
| definir estructura del sistema                | traducir la estructura a codigo ejecutable   |
| asignar responsabilidades a componentes       | configurar sistemas existentes cuando aplica |
| tomar decisiones de arquitectura e interfaces | debugging: encontrar y corregir faults       |
**actividades de disenio**
del sistema completo a componentes concretos

architectural design ->
database design ->
interface design ->
component selection/design

la calidad del disenio afecta mantenibilidad, performance, seguridad y facilidad para evolucionar

**implementacion y debugging**
programar no tiene un proceso universar, pero si practicas de ingenieria
- desarrollar programas o configurar aplicaciones
- disenio e implementacion suelen intercalarse
- debugging: localizar faults y corregirlos
- el proceso agrega revision, integracion, testing y control

**software validation**
V&V busca conformidad con la especificacion y valor para el cliente
- V&V es **verification and validation**, y son 2 procesos independientes usados conjuntamente en ingenieria, manufactura y desarrollo de software para checkear que un sistema cumple su proposito


| verification                                      | validation                                      |
| ------------------------------------------------- | ----------------------------------------------- |
| el sistema cumple su especificacion?              | resuelve la necesidad real del usuario?         |
| revisiones, inspecciones, tests contra requisitos | testing con datos reales y feedback del cliente |
testing es la actividad de V&V mas usada, pero no reemplaza la conversacion con el usuario

**testing stages**
componentes individuales
- funciones, objetos, modulos
system testing
- interaccion y propiedades emergentes
customer testing
- datos reales y necesidades reales

**testing en proceso plan-driven: V-MODEL**
![[Pasted image 20260916152007.png]]
la forma de "v" obliga a la validacion antes de codificar

**software evolution**
- nuevas circunstancias del negocio cambian requisitos
- nuevas tecnologias habilitan mejores implementaciones
- cambios de platafgorma obligan a adaptar aplicaciones
- la frontera entre development y maintenance es cada vez menos clara

# gestionar el cambio
puede cambiar el negocio y que surgan nuevos requisitos
la tecnologia abre nuevas posibilidades
la plataforma cambia y exige adaptar la aplicacion

el cambio genera rework: análisis, diseño, código, pruebas y documentación.

2 estrategias para reducir el rework:

| change anticipation                                         | change tolerance                                     |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| actividades para descubrir cambios antes de que sean claros | proceso preparado para absorber cambios a bajo costo |
| ejemplo: prototype para validar requisitos o disenio        | **ejemplo: incremental development**                 |
| reduce sorpresas tardias                                    | afecta un increment en vez de todo el sistema        |
para los requisitos cambiantes hay 2 (dos) herramientas
system prototyping (anticipar) -> incremental delivery (tolerar y aprender)

- prototyping: construir rapido para probar ideas, requisitos y factibilidad
- incremental delivery: entregar increments al cliente para uso, comentario y experimentacion

## software prototyping
requirements:
- ayuda a elicitar y validar
design:
- explora alternativas y UI
testing:
- permite pruebas comparativas o back-to-back

**prototype development**
debe concentrarse en lo que no se entiende bien
- Puede usar lenguajes o herramientas rápidas.
- Puede dejar afuera funcionalidad no crítica.
- Debe enfocarse en áreas inciertas del producto.
- Suele priorizar funcionalidad sobre reliability/security.

beneficios esperados: mejor usabildad, menor ajuste a necesidades reales, mejor disenio y menor esfuerzo desperdiciado

**throw-away prototypes**
para que descartarlos?
- Difícil cumplir non-functional requirements. 
- Normalmente poco documentados.
- Estructura degradada por cambios rápidos.
- No cumplen estándares de calidad organizacional.
osea **si el objetivo era aprender rapido, no asumas que la base tecnica sirve para produccion**

**incremental delivery**
priorizar requisitos ->
congelar increment actual ->
desarrollar + probar ->
deploy para uso

#### incremental development vs delivery
no es lo mismo evaluar internamente que desplegar ante usuarios reales

| incremental development                  | incremental delivery                           |
| ---------------------------------------- | ---------------------------------------------- |
| se desarrolla y evalua cada increment    | se despliega cada increment a usuarios finales |
| frecuente en metodos agiles              | evaluacion realista en uso practico            |
| evaluacion por usuario/proxy del cliente | dificil si reemplaza un sistema existente      |

### incremental delivery: ventajas y problemas
mas valor temprano, **pero mas complejidad contractual y tecnica**

| ventajas                                   | problemas                                                              |
| ------------------------------------------ | ---------------------------------------------------------------------- |
| valor para el cliente en cada increment    | dificil identificar facilidades comunes al principio                   |
| early increments actuan como prototype<br> | **conflicto con contratos que exigen especificacion completa**         |
| menor riesgo de fracaso total<br>          | increments pueden tener menos funcionalidad que el sistema reemplazado |
| servicios prioritarios reciben mas testing |                                                                        |
# process improvement
mejorarlo significa:
- mejorar calidad del producto
- reducir costos de desarrollo y retrabajo
- acelerar el proceso sin perder el control
- basar cambios en objetivos organizacionales

la medicion ayuda a evaluar mejoras, pero no deberia reemplazar los objetivos del negocio

## dos enfoques de mejora

| process maturity                                                | agile approach                                     |
| --------------------------------------------------------------- | -------------------------------------------------- |
| mejorar process y project management                            | desarrollo iterativo                               |
| introducir buenas practicas de ingenieria                       | reducir overhead del proceso                       |
| madurez=adopcion consistente de practicas tecnicas y de gestion | entrega rapida y respuesta a requisitos cambiantes |
**ciclo de process improvement**
measurement:
- construir baseline con datos
analysis: 
- detectar debildades y bottlenecks
change:
- introducir cambios y evaluar efecto

## metricas de mejora de proceso
1. tiempo de actividades: calendar time -effort
2. recursos requeridos: person-days - costo
3. eventos observados: defects - incidents -> builds
metrica util: conecta con una decision. medio por medir puede empeorar el proceso

# ideas clave
los modelos son **herramientas, no dogmas**

todo proceso combina actividades tecnicas colaborativas y de gestion
waterfall, incremental y reuse-oriented resuelven trade-offs distintos
el cambio es inevitable: prototyping e incremental delivery ayudan a gestionarlo
majorar procesos requiere objetivos, medicion y aprendizaje continuo