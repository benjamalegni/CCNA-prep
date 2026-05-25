# saber si estamos construyendo el producto correcto

| verificacion                                                 | validacion                                                |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| Evalúa si el sistema cumple las especificaciones técnicas    | Evalúa si el sistema cumple las necesidades del usuario   |
| ¿Estamos construyendo el producto CORRECTAMENTE?             | ¿Estamos construyendo el producto CORRECTO?               |
| Proceso formal e interno                                     | Orientada al cliente / usuario final                      |
| Reviews de código, pruebas de unidad, pruebas de integración | Pruebas de aceptación (UAT), prototipos, demos            |
| Responde a: ¿el software hace lo que el diseño especifica?   | Responde a: ¿el software hace lo que el usuario necesita? |

## niveles del proceso de testing

### estatico

Sin ejecutar el código. Revisiones, inspecciones, análisis de código estático (linters, SonarQube).

### dinamico

Con ejecución del código. Unit tests, integration tests, E2E, stress tests.

### V&V temprana

Detectar defectos cuanto antes reduce exponencialmente el costo de corregirlos (regla del 1-10- 100).

### V&V continua

CI/CD automatiza la ejecución de la suite de tests en cada commit, cerrando el loop de feedback.

# tipos de tests

![[Pasted image 20260509072601.png]]

## unit tests

- Prueban una unidad de comportamiento de forma aislada (una función, método o clase).
- Velocidad: milisegundos por test — se pueden ejecutar miles por segundo.
- Aislamiento total: no dependen de bases de datos, red, filesystem ni sistema operativo.
- Son la base del feedback rápido en el ciclo de desarrollo (TDD).
- Khorikov (2020): 'El objetivo es verificar que una unidad de comportamiento funciona correctamente bajo una condición específica.'
- Deben ser deterministas: el mismo test siempre produce el mismo resultado.

### dos escuelas de unit testing

| escuela de Londres                                 | escuela clasica                                         |
| -------------------------------------------------- | ------------------------------------------------------- |
| Unidad = clase individual.                         | Unidad = comportamiento del sistema.                    |
| Todos los colaboradores se mockean.                | Sólo se mockean dependencias out-of-process (DB, APIs). |
| Mayor aislamiento entre clases.                    | Tests más resistentes al refactoring.                   |
| Feedback muy preciso sobre la clase fallida.       | Un fallo puede afectar múltiples tests.<br>             |
| Riesgo: tests muy acoplados a la implementación.   | Foco en el resultado observable, no en internals.       |
| Popularizada por: Steve Freeman, Nat Pryce (GOOS). | Popularizada por: Kent Beck (TDD).                      |

## integration tests

- Prueban la interacción entre dos o más módulos o componentes del sistema.
- Verifican que la integración con dependencias externas (DB, APIs, filesystem) funciona.
- Son más lentos que los unit tests pero más realistas.
- Detectan problemas de configuración, mapeo ORM, queries SQL, contratos de APIs.
- Khorikov distingue dependencias 'managed' (DB propia) vs. 'unmanaged' (APIs externas) — sólo se mockean las últimas.
- No reemplazan los unit tests: son complementarios.

## end-2-end tests y otros tipos

| E2E tests                                                      | otros tipos                                                         |
| -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Simulan el flujo completo del usuario desde la interfaz.       | Smoke Tests: verificación mínima de que el sistema arranca.         |
| Incluyen toda la pila: UI → backend → DB → servicios externos. | Performance Tests: carga, estrés, escalabilidad.                    |
| Son los más costosos de mantener y los más lentos.             | Security Tests: SAST, DAST, penetration testing (pentesting).       |
| Son subconjunto de los integration tests (Khorikov).           | Regression Tests: previenen que un bug corregido vuelva a aparecer. |
| Herramientas: Selenium, Cypress, Playwright.                   | Acceptance Tests (UAT): validación con el usuario final.            |

## modalidades de testing: black-box vs white-box testing

| black-box testing                                | white-box testing                                      |
| ------------------------------------------------ | ------------------------------------------------------ |
| El tester no conoce el código interno.           | El tester conoce la implementación interna. <br>       |
| Se basa en requisitos y comportamiento esperado. | Permite cubrir paths de código específicos.            |
| Útil para tests de aceptación y E2E. <br>        | Útil para analizar cobertura de ramas. <br>            |
| Mejor resistencia al refactoring.                | Riesgo de acoplarse a detalles de implementación. <br> |
| Khorikov recomienda black-box en unit tests.     | Valioso para identificar código no ejercitado.         |

# unit testing - conceptos fundamentales

## patron AAA - arrange / act / assert

Arrange:
preparar el estado inicial: instanciar objetos, configurar dependencias, inicializar valores.

Act:
ejecutar el metodo o funcion bajo prueba. Debe ser una sola llamada al SUT (system under test)

Assert:
verificar que el resultado es el esperado. Una assertion principal por test.

ejemplo:
![[Pasted image 20260509074108.png]]

## nomenclaturas de tests

- Convención recomendada: \[Método]\_\[Escenario]\_\[ResultadoEsperado]
- Mal nombre: 'Test1', 'TestSum', 'ShouldWork' → no comunican nada.
- Bien: 'Delivery_ForPastDate_IsInvalid' — describe qué, cómo y el resultado.
- El nombre del test ES la documentación viva del comportamiento esperado.
- Evitar 'Should' al inicio — es redundante: todo test debería verificar algo.
- Incluir el escenario en el nombre permite entender el fallo sin leer el código.

## test doubles - tipos

mock:
Verifica interacciones (llamadas a métodos). Se configura con expectativas antes del Act. Produce false positives si se abusa.

stub:
Proporciona respuestas predefinidas a llamadas del SUT. No verifica interacciones. No se debe hacer Assert sobre stubs.

spy:
Como un stub pero también registra cómo fue llamado. Permite assertions post-facto. Más flexible que mocks.

fake:
Implementación alternativa funcional (e.g. in-memory DB). No se usa para verificación, sino como reemplazo liviano.

#### stub vs mock - ejemplo practico

![[Pasted image 20260509074816.png]]

stub:
![[Pasted image 20260509074838.png]]

mock:
![[Pasted image 20260509075037.png]]

# principios, practicas y patrones

### 1. proteccion contra regresiones

El test detecta cuando una funcionalidad existente se rompe tras un cambio. Cuanto más código ejerce, más valioso

### 2. resistencia al refactoring

El test no falla cuando se refactoriza la implementación sin cambiar el comportamiento (no hay false positives).

### 3. feedback rapido

El test corre en milisegundos. Cuanto más rápido, más veces se ejecuta y más temprano se detectan errores.

### 4. mantenibilidad

El test es fácil de leer, entender y modificar. Poco código de setup, sin complejidad artificial.

## false positives y false negatives

| false positives                                                          | false negatives                                                  |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Test falla cuando el código NO está roto.                                | Test pasa cuando el código SÍ está roto (bug no detectado). <br> |
| Causado por: tests acoplados a implementación, no al comportamiento.     | Causado por: cobertura insuficiente, assertions débiles.         |
| Consecuencia: equipo pierde confianza en el suite de tests. <br>         | Consecuencia: bugs llegan a producción.                          |
| Solución: testear el RESULTADO observable, no los internals.             | Solución: escribir assertions precisas, cobertura de ramas.      |
| Khorikov: 'Los false positives erosionan la confianza más que los bugs.' | Son tan peligrosos como la ausencia de tests.                    |

## comportamiento observable vs detalles de implementacion

- Regla de oro: sólo testear lo que el sistema expone como contrato público.
- Detalles de implementación cambian durante el refactoring → los tests deben sobrevivir.
- Un test que verifica métodos privados está acoplado a internals → es frágil.
- Khorikov: 'Un test ideal verifica el resultado final desde la perspectiva del usuario del SUT.'
- Patrón útil: testear desde la API pública aunque internamente haya múltiples clases.
- API pública ≠ siempre public en el lenguaje — se refiere al contrato observable.

## 3 estilos de unit testing

### output-based

Verifica el valor de retorno del SUT. Sin efectos secundarios. El más resistente al refactoring.

```java
int suma(int a, int b) {return a+b;} assertEquals(5, suma(2,3));
```

★★★★★ Mejor calidad

### state-based

Verifica el estado del SUT o sus colaboradores después del Act. Más complejo de mantener.

```java
cuenta.depositar(100); assertEquals(100, cuenta.getSaldo());
```

★★★★ Buena calidad

### communication-based

Verifica que el SUT envió los mensajes correctos a sus colaboradores (via mocks).

```java
verify(emailService).enviarEmail(usuario);
```

★★★ Usar con cuidado

## principios FIRST para unit tests

### F - fast

Los tests deben ejecutarse en milisegundos. Miles de tests < 10 segundos. Si son lentos, nadie los corre.

### I - isolated

Cada test es independiente. El orden de ejecución no importa. Sin estado compartido entre tests.

### R - repeatable

El mismo test, mismo resultado siempre. Sin dependencias de hora, red, datos externos o aleatoriedad.

### S - self-validating / T - timely

El test dice PASS o FAIL solo. Se escribe antes o junto al código de producción (TDD).

## antipatrones de unit testing

- Testear métodos privados directamente → acoplamiento innecesario a implementación.
- Exponer estado privado sólo para tests → contamina el API de producción.
- Code pollution: agregar código de testing en el código de producción.
- Mockear clases concretas en lugar de interfaces → frágil y difícil de mantener.
- Tests con múltiples Act sections → no es un unit test, es un integration test.
- Usar DateTime.Now directamente → tests no deterministas. Solución: inyectar IDateTimeProvider.

# TDD - test-drive development

el ciclo TDD:
![[Pasted image 20260509080546.png]]
![[Pasted image 20260509080632.png]]
![[Pasted image 20260509080643.png]]

## beneficios y desafios de TDD

| beneficios                                                                | desafios                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Diseño emergente: el código se diseña para ser testeable desde el inicio. | Curva de aprendizaje: requiere disciplina y práctica constante.           |
| Documentación viva: los tests describen el comportamiento esperado.       | No aplica igual a todos los contextos (UI, algorítmos exploratorios).     |
| Confianza para refactorizar: la suite verde avala los cambios.            | No garantiza buenos tests si no se entienden los principios.              |
| Reduce over-engineering: solo se implementa lo que pide el test.          | El refactoring de tests puede ser costoso si los tests son frágiles. <br> |
| Detecta requisitos ambiguos temprano.                                     | Combinarlo con pair programming mejora los resultados.                    |

## TDD vs test-after - comparacion

| aspecto     | test-driven (TDD)      | test-after           |
| ----------- | ---------------------- | -------------------- |
| momento     | antes de codificar     | despues de codificar |
| diseno      | guiado por tests       | codigo primero       |
| cobertura   | alta por construccion  | depende del esfuerzo |
| refactoring | seguro con suite verde | mas riesgoso         |
| feedback    | inmediato (segundos)   | tardio               |
| adopcion    | requiere disciplina    | mas facil de iniciar |

# cobertura de codigo

## line/statement

lineas ejecutadas/total lineas

La más simple. Puede ser engañosa: una línea ejecutada no implica todas las ramas testeadas.

## brach coverage

ramas tomadas/total ramas

Mide si cada rama (if/else, switch) fue ejecutada. Más robusta que line coverage.

## path coverage

caminos ejecutados/total caminos

Combinatoriamente explosiva. Impráctica para código real con múltiples condiciones.

## notas del tipo de cobertura de codigo

**branch coverage mira decisiones individuales, mientras que path coverage mira secuencias completas de decisiones**
![[Pasted image 20260509081534.png]]

#### el problema con los numeros magicos de cobertura

- Khorikov: 'La cobertura de código no puede ser un objetivo en sí mismo.'
- Un test puede ejercer una línea sin verificar su comportamiento → cobertura sin valor.
- 100% coverage no garantiza ausencia de bugs: sólo confirma que el código se ejecutó.
- Imponer umbrales (ej: 80%) incentiva escribir tests superficiales para 'subir el número'.
- La cobertura es un indicador negativo: cobertura baja ES una señal de alerta.
- Pero cobertura alta NO prueba que el suite sea de buena calidad.

#### herramientas de cobertura de codigo

herramientas populares:

- dotCover / OpenCover (.NET)
- JaCoCo (Java/Kotlin)
- Istanbul / nyc (JavaScript/TypeScript)
- coverage.py (Python)
- gcov / lcov (C/C++)
- SimpleCov (Ruby)

integracion en CI/CD

- Integrar en el pipeline CI/CD (GitHub Actions, GitLab CI).
- Reportes HTML para visualizar código no cubierto.
- Badges de cobertura en README para visibilidad.
- SonarQube: análisis estático + cobertura + code smells.
- Umbral de alerta (no de bloqueo) en CI: < 50% → warning.

# mutation testing - mas alla de la cobertura

- Introduce mutaciones (bugs artificiales) en el código de producción.
- Si el test suite NO detecta la mutación → el test es débil (survived mutant).
- Si el test suite SÍ detecta la mutación → el test es fuerte (killed mutant).
- Mutation score = mutantes eliminados / total mutantes.
- Herramientas: PIT (Java), Stryker (JS/.NET/Scala), Mutmut (Python).
- Es el indicador más preciso de la calidad del suite de tests.

# distribucion tipica de tests en un proyecto

![[Pasted image 20260509082157.png]]

# arquitectura hexagonal y testing

- La arquitectura hexagonal (Ports & Adapters) facilita el testing al separar el dominio de la infraestructura.
- El dominio puro (sin dependencias externas) se testea con output-based testing.
- Los adaptadores (DB, APIs) se testean con integration tests.
- Los mocks se usan para las comunicaciones inter-sistema (unmanaged dependencies).
- No se mockean las comunicaciones intra-sistema (entre clases del mismo módulo).
- Diseñar para la testeabilidad desde el inicio es más barato que refactorizar después.

# checklist para un buen test

- [ ] ¿Testea comportamiento observable, no implementación interna?
- [ ] ¿Tiene un nombre que describe escenario y resultado esperado?
- [ ] ¿Sigue el patrón AAA con secciones claras y separadas?
- [ ] ¿Es determinista y no depende de estado externo o tiempo?
- [ ] ¿Corre en menos de 100ms sin acceso a red o disco?
- [ ] ¿Falla cuando la funcionalidad que verifica está rota?
- [ ] ¿Tiene una sola razón para fallar?
- [ ] ¿Es independiente del orden de ejecución?

# resumen comparativo y conclusiones

| tipo              | velocidad  | aislamiento | costo mantenimiento | donde fallan      |
| ----------------- | ---------- | ----------- | ------------------- | ----------------- |
| unit tests        | muy rapida | total       | bajo                | logica de negocio |
| integration tests | media      | parcial     | medio               | integracio db/api |
| E2E               | lenta      | ninguno     | alto                | flujos de usuario |

### conclusiones

1. V&V son procesos complementarios: verificar que construimos bien + que construimos lo correcto.
2. La pirámide de testing propone: muchos unit tests, algunos integration, pocos E2E.
3. Un buen unit test es: protector de regresiones, resistente al refactoring, rápido y mantenible.
4. TDD no es solo testing — es una práctica de diseño que guía la arquitectura del código.
5. La cobertura de código es un indicador negativo, no un objetivo. 100% no garantiza calidad.
