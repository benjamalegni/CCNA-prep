regression testing: es la practica de re-ejecutar tests existentes para detectar que un cambio no rompio funcionalidad previamente correcta

# tipos de testing - ademas de unit testing
## integration testing
- Un integration test es cualquier test que NO cumple los tres criterios de un unit test. 
- En la práctica: verifica cómo el sistema funciona en integración con dependencias outof-process (DB, APIs, filesystem, message bus). 
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
