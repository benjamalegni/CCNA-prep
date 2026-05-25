regression testing: es la practica de re-ejecutar tests existentes para detectar que un cambio no rompio funcionalidad previamente correcta

# tipos de testing - ademas de unit testing
## integration testing
- Un integration test es cualquier test que NO cumple los tres criterios de un unit test. 
- En la práctica: verifica cómo el sistema funciona en integración con dependencias out-of-process (DB, APIs, filesystem, message bus). 
- Cubre el código del cuadrante de 'Controllers': la capa que conecta el dominio con las dependencias externas. 
- Khorikov: 'No podés estar seguro de que el sistema funciona como un todo si sólo dependés de unit tests.' 
- Detecta problemas que los unit tests no pueden: mapeos ORM, queries SQL, contratos de APIs, configuraciones.

responsabilidades
- Cubren los controllers y la capa de integración. 
- Lentos: segundos (acceso a DB, red). 
- Usan dependencias externas reales o mocks. 
- Verifican el estado final del sistema. 
- Menor cantidad: 1 happy path + edge cases no cubribles. 
- Fallan cuando la integración con sistemas externos falla.

| managed dependecies                           | unmanaged dependencies                               |
| --------------------------------------------- | ---------------------------------------------------- |
| tu aplicacion tiene control total sobre ellas | dependencias que no controlas completamente          |
| no son visibles a sistemas externos           | sus interacciones son observables externamente       |
| ejemplo: tu propia base de datos              | ejemplos: SMTP server, message bus, APIs de terceros |
| usar instancia real en integration tests      | usar MOCKS en integration tests                      |
| verificar estado final, no las interacciones  | verificar el patron de comunicacion (llamadas)       |
"Use real instances of managed dependencies; replace unmanaged dependencies with mocks."

### estrategia: happy path + edge cases
- Cubrir el happy path más largo + los edge cases que los unit tests NO pueden cubrir. 
- Happy path: ejecución exitosa del escenario de negocio completo. 
- El 'más largo' significa aquel que toca TODAS las dependencias out-of-process. 
- Si no existe un solo camino que pase por todas las dependencias, escribir tests adicionales. 
- Edge cases que pueden cubrirse con unit tests → NO necesitan integration tests. 
- Edge cases donde la aplicación falla rápido (Fail Fast) → NO necesitan integration tests.

### principio fail test - alternativa a integration test
loop de feedback corto
- bug detectado antes = mas barato de corregir
implementacion tipica
- precondiciones + excepciones en startup
protege la persistencia
- evita que los datos lleguen a la DB
cuando usarlo
- si el bug revela solo en la primera ejecucion, no necesitas un integration test

### best practices - integration tests
boundaries explicitos del dominio
- definir claramente donde termina el dominio y comienza la infrastructura. Facilita el testing y el mantenimiento
eliminar dependencias circulares
- las dependencias ciclicas entre modulos impiden testear de forma aislada y senalan problemas de diseno
reducir capas de la app
- menos capas = menos codigo que configurar en los tests. Khorikov recomienda evitar la abstraccion innecesaria
DB separada por developer
- cada desarrollador y entorno CI/CD debe tener su propia instancia de DB para evitar interferencias entre tests

### diferencias entre E2E vs integration tests
![[Pasted image 20260518180641.png]]

### testing de base de datos - guia practica
- Mantener el schema de DB en el sistema de control de versiones: las migraciones son parte del código. 
- Datos de referencia (tablas con valores fijos) son parte del schema, no datos de test. 
- Cada desarrollador y entorno CI tiene su propia instancia de DB separada. 
- State-based delivery (EF Migrations, Flyway) vs. migration-based (scripts SQL). 
- No usar bases de datos in-memory como sustituto (SQLite en lugar de SQL Server): esconden bugs reales. 
- Limpiar datos entre tests: truncar tablas, no borrar/recrear la DB (muy lento).

### herramientas para integration testing
![[Pasted image 20260518181129.png]]

@DataJpaTest => solo contexto JPA. sin controllers ni servicios. verifica queries, mapeo ORM y constraints de DB. Mas rapido.

@SpringBootTest => contexto completo. HTTP -> service -> repo -> postgreSQL real. Verifica el flujo end-to-end. Mas lento.

### resumen comparativo
![[Pasted image 20260518181343.png]]

## user acceptance testing
UAT es el proceso de validación en el que los usuarios finales (o sus representantes) verifican que el sistema satisface los requisitos de negocio antes de su aceptación formal.

- Última barrera antes de ir a producción — si falla aquí, el impacto es alto. 
- Verifica VALIDACIÓN (¿construimos el producto correcto?), no verificación técnica. 
- Lo ejecutan usuarios finales, product owners o clientes — no el equipo técnico. 
- Define si el producto es 'aceptado' formalmente por el cliente (en contratos, SLAs). 
- Complementa todos los tests anteriores: es posible que el sistema funcione técnicamente pero falle en UAT.

### tipos de UAT
alpha testing
- realizado por usuarios internos en el ambiente de desarrollo. antes del beta. detecta problemas graves antes de la exposicion externa

contract acceptance testing
- verifica cumplimientos de criterios contracturales especificos. Formal y documentado. Requerido para gobierno, enterprise y compliance

beta testing
- grupo selecto de usuarios reales en su propio entorno. Feedback antes del lanzamiento general. comun en productos de software masivos

regulation acceptance testing
- cumplimiento de estandares legales o industriales (ISO, HIPAA, GDPR, PCI-DSS). Auditado externamente

### proceso de UAT 
1. definir criterios
	- criterios de aceptacion claros, trazables a requisitos. Formato given/when/then o user stories
2. preparar entorno
	- ambiente de UAT estable, con datos representativos (anonimizados si contienen PII (informacion personal sensible))
3. crear test cases
	- casos de prueba basados en flujos reales de usuario, no en detalles tecnicos
4. ejecutar y registrar
	- usuarios ejecutan los casos. toda desviacion se documenta con evidencia
5. corregir y re-testear
	- defectos corregidos, confirmados y re-testeados antes de continuar
6. sign-off formal
	- aprobacion documenta del cliente. condicion para el despligue a produccion

### BDD - puente entre UAT y tests automatizados

| BDD / gherkin                                                         | estructura given/when/then                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| behavior-driven development: tests escritos en lenguaje natural       | given: estado inicial del sistema                                         |
| formato gherkin: given/when/then                                      | when: accion que ejecuta el actos                                         |
| legibles por POs, QAs, clientes y desarrolladores                     | then: resultaod esperado observable                                       |
| los escenarios gherkin son los criterios de aceptacion                | scenario outline + examples: parametrizar multiples casos                 |
| se ejecutan automaticamente con herramientas como cucumber o specflow | living documentation: los tests actualizados son la documentacion vigente |

### UAT desafios y estrategias

| desafios comunes                                                                   | estrategias recomendadas                                                                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| usuarios no disponibles para testear                                               | involucrar al PO como representante del usuario                                            |
| datos de produccion sensibles (personally identifiable information) no disponibles | datos sinteticos o anonimizados + generadores de datos                                     |
| ambiente de UAT inestable o diferente a produccion                                 | infrastructure as code para ambientes identicos (usar archivos de configuracion como YAML) |
| criterios de aceptacion vagos o incompletos                                        | definition of done incluye criterios de aceptacion antes de empezar                        |
| presion de tiempo - UAT se saltea antes del release                                | UAT continua: subset de tests en cada sprint no solo al final                              |

## system testing
- verifica el sistema completo como un todo - todos los modulos integrados
- se ejecuta sobre el sistema completamente integrado y desplegado
- trata al sistema como caja negra: no importa la implementacion interna
- foco en: funcionlidad, rendimiento, seguridad, usabilidad, compatibilidad
- realizado por el equipo de QA - independiente del equipo de desarrollo
- detecta defectos que no son visibles en tests unitarios ni de integracion
- precede al UAT: el sistema debe pasar system testing antes de entregarse al cliente

### tipos de system testing
performance testing:
- load, stress, endurance, spike. Verifica comportamiento bajo carga normal y extrema
security testing
- SAST, DAST, penetration testing. detecta vulnerabilidades antes de produccion
reliability testing
- verifica comportamiento durante fallas, recuperacion y failover
compatibility testing
- navegadores, SOs, dispositivos, versiones de APIs y librerias
usability/A11y
- accesibilidad (WCAG), experiencia del usuario, flujos de navegacion
localization testing
- idiomas, formateado de fecha/moneda, zonas horarias, codificacion de caracteres
### subtipos y metricas
load test
- carga normal y maxima esperada. el sistema funciona bajo uso real?
spike test
- aumentos repentinos de carga. el sistema escala rapido?
stress test
- carga mas alla del limite. como falla el sistema? se recupera solo?
endurance test
- carga normal durante horas/dias. detecta memory leaks y degradacion

### system testing vs integration testing
![[Pasted image 20260519002552.png]]

### parte del system testing
- SAST (Static Application Security Testing): analiza el código fuente sin ejecutarlo. Detecta vulnerabilidades conocidas, inyecciones, hard-coded credentials. 
- DAST (Dynamic Application Security Testing): ataca el sistema en ejecución. Simula un atacante externo. Herramientas: OWASP ZAP, Burp Suite. 
- Penetration Testing: equipo especializado busca explotar vulnerabilidades activamente. 
- OWASP Top 10: lista de las vulnerabilidades más críticas en aplicaciones web — referencia obligada. 
- Automatizar SAST en el pipeline CI (SonarQube, Checkmarx, Snyk) y DAST en prerelease.

## regression testing
garantizar que lo que funcionaba sigue funcionando

que es una regresion:
- Una regresión es un defecto introducido en funcionalidad que previamente funcionaba correctamente. 
- Causa habitual: un cambio en el código (feature, bugfix, refactoring) rompe algo no relacionado. 
- La regresión no es un tipo de test separado — es el OBJETIVO de re-ejecutar tests existentes. 
- Khorikov: la 'protección contra regresiones' es el primer pilar de un buen unit test. 
- Un test que no detecta regresiones (test superficial, assertions débiles) es un test sin valor real. 
- El costo de una regresión en producción es órdenes de magnitud mayor que en desarrollo.

regresion vs defecto

| regresion                                           | defecto nuevo                                          |
| --------------------------------------------------- | ------------------------------------------------------ |
| la funcionalidad previamente pasaba todos los tests | la funcionalidad nunca funciono correctamente          |
| un nuevo cambio introduce el problema               | el problema ya existia pero no estaba testeado         |
| se detecta al re-ejecutar tests existentes          | se decta con tests nuevos (no regresion)               |
| indica que el cambio rompio algo preexistente       | indica ausencia de cobertura o diseno incorrecto       |
| requiere revertir o corregir el cambio reciente     | requiere implementar la funcionalidad correctamente    |
| la suite de tests actua como red de seguridad       | la cobertura insuficiente lo permite pasar inadvertido |

### estrategia de regression testing
1. regresion total
	- re-ejecutar todos los tests del suite. Garantia maxima. costosa en tiempo: usada antes de releases importante
2. regresion selectiva
	- ejecutar tests del area impactada por el cambio + tests de smoke. mas rapida. riesgo: perdida de cobertura lateral
3. regresion priorizada
	- tests priorizados por criticidad de negocio y frecuencia de uso. primero los mas importantes, luego los demas
4. regresion continua
	- automatizada en cada commit. suite rapida en minutos. el estandar modeno con pipelines CI/CD

### tests para incluir en la suite de regresion
- Criterio 1 - Funcionalidades críticas de negocio: siempre incluir, sin importar el cambio. 
- Criterio 2 - Áreas con historia de bugs: zonas del código donde hubo defectos repetidos. 
- Criterio 3 - Paths de alta frecuencia de uso: lo que los usuarios hacen a diario. 
- Criterio 4 - Módulos con alta complejidad o muchos colaboradores. 
- Criterio 5 - Tests con alta cobertura de ramas (branch coverage alto). 
- Evitar: tests superficiales que nunca fallan - dan falsa seguridad sin detectar regresiones.

## CI/CD y testing integrado
- CI (Continuous Integration): cada commit activa el pipeline — build + test automatizados. 
- CD (Continuous Delivery/Deployment): todo cambio que pasa los tests puede desplegarse automáticamente. 
- El pipeline de testing es la primera defensa: si un test falla, el deploy se bloquea. 
- Feedback rápido: el developer sabe en minutos si su cambio rompió algo. 
- Regresión automatizada = ejecutar el suite completo en cada PR/commit → no más 'funciona en mi máquina'. 
- El pipeline debe ser tratado como código de primera clase: mantenido, documentado y mejorado.

# comparacion completa
![[Pasted image 20260519010328.png]]
![[Pasted image 20260519010352.png]]

# antipatrones de testing avanzado
ice cream cone antipattern
- mas E2E que unit tests. Resultado: suite lenta, fragil, costosa. El opuesto a la piramide correcta
mocking de dependencias managed
- mockear la DB propia elimina el valor del integration test. se pierden bugs reales de integracion
testeando con DB in-memory
- khorikov: SQLite no replica el comportamiento de SQL server. oculta bugs reales de queries y transacciones
UAT sin criterios previos
- UAT sin criterios de aceptacion definidos antes del desarrollo lleva a prueba ad-hoc y resultados ambiguos

![[Pasted image 20260519011708.png]]