- [x] enumeracion de servicios comunes y gestores de contenido
		- (00) adds, lw, sw
		- (01) sub, beq
		- (10) determined by function field in the instruction
	- 9 senales de control de ctrl unit
	- el resultado de la ALU puede dirigirse al address de la memoria de datos (como con un offset en un sw) o puede dirigirse al registro mem/wb para que luego se escriba en un registro. En este ultimo caso, la memoria principal no recibe el address como input (esto es manejado por el ctrl unit)
	- ahora el input de write register viene desde el mem/wb register para preservar la integridad de los datos en el pipeline
	- fward unit condiciones de forwarding:
		- ex: reg ex/mem.RegWrite y ex/mem.RegisterDestination !=0 (prohibido)
			- si el id/ex.registerSource = ex/mem.registerDestination => forwardA
			- si el id.ex.registerTarget = ex/mem.registerDestination => forwardB
		- mem: reg mem/wb.RegWrite y mem.wb.RegisterDestination !=0 (prohibido)
			- si el id/ex.registerSource = mem/wb.registerDestination => forwardA
			- si el id.ex.registerTarget = mem/wb.registerDestination => forwardB
		- siempre adelatar un dato desde ex (osea el mas nuevo) si hay datos en ambas etapas que cumplan las condiciones de forwarding
		- esta prohibido que el registro destino sea = 0 porque el registro $zero no se puede sobreescribir
	- hazard detection unit funciona para insertar un stall o una burbuja en aquellos casos donde forwarding es fisicamente imposible
	- la comparacion del beq se puede realizar en la etapa ID entre $rs y $rt
	- **la direccion de la instruccion que causa excepciones sera guardada en un exception program counter (EPC) en la etapa ex**
	- el ultimo mux en la etapa ex indica cual sera el registro destino, que cambia para tipo r (\$rd) y tipo I ($rt)
- branch delay slot
- branch prediction
- riesgos y tecnicas de mitigacion de riesgos (forwarding):
	- de datos
	- de control
	- estructurales
- diferencia riesgos y conflicto
4. Diferencia entre Riesgos y Conflictos
*   Sugerencia: En la literatura de arquitectura, un "Riesgo" (Hazard) es la condición potencial en el hardware que impediría que la siguiente instrucción se ejecute en el ciclo de reloj designado. Un "Conflicto" (a veces usado como sinónimo de riesgo estructural) ocurre cuando dos instrucciones compiten por el mismo recurso de hardware al mismo tiempo. Todo conflicto estructural es un riesgo, pero no todos los riesgos (ej. dependencia de datos) son conflictos de hardware.
5. Excepciones e Interrupciones
*   Mencionaste el EPC (Exception Program Counter). Debes agregar el registro Cause, el cual guarda un código que indica por qué ocurrió la excepción (ej. desbordamiento aritmético vs. código de operación indefinido).
*   Manejo en Pipeline: Cuando ocurre una excepción (ej. en la etapa EX por un add que desborda), el procesador debe hacer flush (descartar) la instrucción actual y todas las instrucciones posteriores en el pipeline (las que están en IF e ID), guardar la dirección de la instrucción en el EPC, y forzar al PC a cargar la dirección de la rutina de manejo del sistema operativo. Las instrucciones anteriores (en MEM y WB) se dejan terminar normalmente.
cache
- LRU y otras tecnicas
- tipos de cache misses
- 
entradas y salidas
- northbridge, southbridge
- lineas de control, lineas de datos, transacciones
- buses sincronos, asincronos
	- protocolo asincrono de handshaking
- arbitros de bus
	- daisy chain
	- arbitraje paralelo centralizado
- modulos de i/o -> funcionalidades
- tecnicas de i/o (con ventajas y desventajas)
	- programadas (polling)
	- manejadas por interrupciones
	- direct memory access (DMA)
- excepciones e interrupciones (mencionar diferencias entre ellas)
	- que modificaciones ocurren en el datapath
- todo eso en profundidad
memoria virtual: 
- Segmentación vs Paginación (y segmentos paginados).
* MMU (Unidad de Gestión de Memoria): Su rol en el hardware.
* TLB (Translation Lookaside Buffer): ¡Importantísimo! Es la caché de la tabla de páginas.
* Integración TLB + Caché: (Punto 4.4 del programa) Cómo interactúan ambas al buscar un dato (¿La caché se accede con dirección virtual o física?).


# coaching
trabajar la presencia en cada paso.
	practicar meditacion o actividades que me hagan estar presentes.

hacer agenda semanal, todos los domingos.
plan con metas semanales, mensuales, de concecion definidas:
tener medio dia libre despues de las 12 todas las semanas
con presencia: tener algo para hacer especial
sin trabajos luego de las 19
que sea realista y con limites
en un mes tener 4 momentos de relax


checkpoint diarios con lo que estuvo dentro del plan del dia y al final del dia hacer el resumen
checkpoint semanal con una planificacion: 
espectativa/realidad, como me voy adaptando
ver que ajusto para la proxima semana, que me gusto que no me gusto 
calculo mensual y de fechas de conseguir resultados viene del semanal. entonces despues de la primer semana puedo hacer el calculo y tener las fechas limites
juntarme con equipos que me motiven a desarrollar habilidades. que puedo aprender de ellos

# aplicar
1. seguir con el armado de los esquemas de preguntas opcionales (ia)
	- deteccion de tipos de mails
- tratar de calcular cuanto costaria el flujo de personalizacion con ia en tokens
	- pensar cada campo
2. epica: empezar a idear el flujo de creacion de puestos de trabajo (orientado a las empresas)
3. seguir creciendo la pool de trabajos con variedad de roles

armar excel con empresas qeu voy viendo para agregar y aquellas que son posible agregar o no

ir pensando la idea de roomix para buscar empleos
- buscando gente honestamente

fijarme el query especifico para request filtrando solo argentina

- reducir el tiempo de payload, que sea instaneo y no termine cuando termina el autofill
- revisar que pasa el headless
- fijarme como funciona cuando se hacen varios requests, se hace una fila? se usa el entorno virtual para ejecutarlos en paralelo, simultaneo?
	- load balancer?

- caso de no existe un job => que el scraping notifique y actualice db
- separar las ramas por feature asi no queda todo junto!

cuando se inicia el autofilling se crea una nueva fila con el requestID (indicado por el cliente en el request)
luego en el put de email verification se indica el requestID y se usa el verification code que nos devuelve sendgrid

formato cv's en storage:
- 4a3c509a-dedd-4781-9555-4d16d2e4a4c9/cv.pdf
	- userid/cv.pdf

se esta insertando la pregunta opcional correctamente
lo que falta es que al volver a hacer el autofilling detecte automaticamente esa pregunta opcional y la llene
{
    "success": true,
    "data": {
        "runId": "65f88faa-e0d2-4b2a-9649-f258696b3030",
        "applicationId": null,
        "jobId": "0095a9b7-bda5-42e7-981a-67b776dcedf3",
        "providerId": "mercadolibre",
        "status": "partially_filled",
        "queueStatus": null,
        "statusUrl": "http://localhost:3000/jobs/scraper/autofill/runs/65f88faa-e0d2-4b2a-9649-f258696b3030",
        "reused": false,
        "createdAt": "2026-06-19T13:57:02.321445+00:00",
        "queuedAt": null,
        "atsId": "eightfold",
        "companyId": null,
        "attemptCount": 0,
        "maxAttempts": 3,
        "startedAt": "2026-06-19T13:57:09.601+00:00",
        "finishedAt": "2026-06-19T13:58:07.47+00:00",
        "nextRetryAt": null,
        "missingFields": [],
        "errorCode": "OPTIONAL_QUESTIONS_REQUIRED",
        "errorMessage": null,
        "fieldDiagnostics": [],
        "missingInformation": [
            {
                "type": "optional_question",
                "atsId": "eightfold",
                "reason": "missing_answer",
                "message": "Required question \"Phone(You authorize us to contact you via WhatsApp Business to share updates about your application.)\" was not filled.",
                "options": null,
                "blocking": true,
                "required": true,
                "valueType": "single_select",
                "providerId": "mercadolibre",
                "questionId": "d90ade99-fa04-4b4f-8fb0-61672e9e6e9f",
                "controlKind": "custom_combobox",
                "questionKey": "mercadolibre_phoneyou_authorize_us_to_contact",
                "questionText": "Phone(You authorize us to contact you via WhatsApp Business to share updates about your application.)",
                "validationMessage": "Enter a valid phone number and country code.",
                "validationSummary": null,
                "providerQuestionId": "1acc1d71-3bac-4ecf-ba51-c35db935203a",
                "questionTextSource": "field_label",
                "associationConfidence": 1,
                "reusableQuestionCreated": false
            },
            {
                "type": "optional_question",
                "atsId": "eightfold",
                "reason": "select_required",
                "message": "Please select a value for \"Do you authorize us to contact you via WhatsApp to share updates about your application?\". Available options: \"I agree\".",
                "options": [
                    {
                        "label": "I agree",
                        "value": "1"
                    }
                ],
                "blocking": true,
                "required": true,
                "valueType": "single_select",
                "providerId": "mercadolibre",
                "questionId": "2f52034d-1d98-439b-a65d-0831e1b69aae",
                "controlKind": "checkbox",
                "questionKey": "mercadolibre_do_you_authorize_us_to",
                "questionText": "Do you authorize us to contact you via WhatsApp to share updates about your application?",
                "validationMessage": "Error: Select at least one value.",
                "validationSummary": null,
                "providerQuestionId": "b02d1082-f719-433c-a5a0-cf7815cb6aee",
                "questionTextSource": "field_label",
                "associationConfidence": 1,
                "reusableQuestionCreated": false
            }
        ],
        "result": {
            "status": "partially_filled",
            "finalUrl": "https://mercadolibre.eightfold.ai/careers/apply?pid=41941381&locale=en_US",
            "filledFields": [
                "cv",
                "linkedinUrl",
                "phoneCountryCode",
                "phone",
                "email",
                "firstName",
                "lastName",
                "location",
                "country",
                "state",
                "privacyStatement",
                "mercadoLibreRelationship"
            ],
            "missingFields": [],
            "autofillCompleted": false,
            "missingInformation": [
                {
                    "type": "optional_question",
                    "atsId": "eightfold",
                    "reason": "missing_answer",
                    "message": "Required question \"Phone(You authorize us to contact you via WhatsApp Business to share updates about your application.)\" was not filled.",
                    "options": null,
                    "blocking": true,
                    "required": true,
                    "valueType": "single_select",
                    "providerId": "mercadolibre",
                    "questionId": "d90ade99-fa04-4b4f-8fb0-61672e9e6e9f",
                    "controlKind": "custom_combobox",
                    "questionKey": "mercadolibre_phoneyou_authorize_us_to_contact",
                    "questionText": "Phone(You authorize us to contact you via WhatsApp Business to share updates about your application.)",
                    "validationMessage": "Enter a valid phone number and country code.",
                    "validationSummary": null,
                    "providerQuestionId": "1acc1d71-3bac-4ecf-ba51-c35db935203a",
                    "questionTextSource": "field_label",
                    "associationConfidence": 1,
                    "reusableQuestionCreated": false
                },
                {
                    "type": "optional_question",
                    "atsId": "eightfold",
                    "reason": "select_required",
                    "message": "Please select a value for \"Do you authorize us to contact you via WhatsApp to share updates about your application?\". Available options: \"I agree\".",
                    "options": [
                        {
                            "label": "I agree",
                            "value": "1"
                        }
                    ],
                    "blocking": true,
                    "required": true,
                    "valueType": "single_select",
                    "providerId": "mercadolibre",
                    "questionId": "2f52034d-1d98-439b-a65d-0831e1b69aae",
                    "controlKind": "checkbox",
                    "questionKey": "mercadolibre_do_you_authorize_us_to",
                    "questionText": "Do you authorize us to contact you via WhatsApp to share updates about your application?",
                    "validationMessage": "Error: Select at least one value.",
                    "validationSummary": null,
                    "providerQuestionId": "b02d1082-f719-433c-a5a0-cf7815cb6aee",
                    "questionTextSource": "field_label",
                    "associationConfidence": 1,
                    "reusableQuestionCreated": false
                }
            ],
            "submissionConfirmed": false
        }
    },
    "error": null
}

https://www.getonbrd.com.ar/

- probar webwright solo cuando el response del autofill devuelve partially filled porque hay preguntas opcionales.
	- NO muy muy lento
- no se esta llenando correctamente despues de completar las preguntas opcionales, se rompe campo CV
	- ok visto
- question_key no es necesario => sacarlo si no se usa y usar el question_id
	- pendiente
- PUT de a varias preguntas en vez de una sola y volver a llamar al autofilling automaticamente con el mismo puesto


#### aplicar que hacer!!??
actualmente no se esta podiendo llegar a scrapear correctamente cuando hay preguntas opcionales
tampoco quiero dejar que todo el flujo lo haga webwright o algun otro scraper con ia
mi plan es:
1. aunque se sepa que x postulacion tiene preguntas opcionales iniciar el scraping con patch wright normalmente
2. si aparece algun mensaje de error y que patchright lo detecte
3. no se cierra el scraping (queda en segundo plano) y entra el llm scraper suponiendo webwright
4. busca los datos en la db que ya existe para responder esas preguntas y si no las hay se avisa en el response y se autoinyectan en la base de datos
5. se repiten pasos 1 y 2, se envia correctamente la postulacion

# carrera

## Estado actual

| Punto                                     | Estado                                                           |
| ----------------------------------------- | ---------------------------------------------------------------- |
| Carrera actual                            | Ingeniería de Sistemas, UNICEN, plan 2023                        |
| Materias con final/promoción/equivalencia | 11                                                               |
| Materias curriculares del grado           | 37 + PPS/Proyecto Integrador                                     |
| Pendientes curriculares                   | 26 + PPS/PI                                                      |
| Atraso vs plan ideal                      | aprox. 1,5 a 2 años                                              |
| Objetivo corto                            | cerrar título intermedio                                         |
| Objetivo internacional                    | usar intermedio para continuar bachelor en Europa y luego máster |

## Título Intermedio AUDeS

| Te falta para el intermedio | Estado |
|---|---|
| AyDA I | Regularizada, falta final |
| AyDA II | Regularizada, falta final |
| Arquitectura de Computadoras I | En curso |
| Base de Datos I | En curso |
| Sistemas Operativos | Falta cursar/aprobar o rendir libre, si la cátedra lo permite |
| Programación Web | Falta cursar/aprobar o rendir libre, si la cátedra lo permite |
| 60 hs electivas | Hay que gestionarlas |

Cuello de botella principal:

```text
AyDA II + Arquitectura I -> Sistemas Operativos -> Programación Web
```

Si esa cadena se atrasa, se atrasa el título intermedio.

## Cronograma académico recomendado

Fechas aproximadas. El día exacto depende de SIU/cátedra.

| Fecha objetivo                | Acción                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| Mayo-julio 2026               | Terminar cursadas actuales: Álgebra Lineal, Arquitectura I, Base de Datos I, Calidad, Redes II |
| Julio 2026                    | Rendir AyDA I                                                                                  |
| Agosto 2026                   | Rendir AyDA II                                                                                 |
| Agosto-noviembre 2026         | Cursar Cálculo II, Probabilidad, Base de Datos II, Lenguajes y Paradigmas                      |
| Septiembre 2026               | Rendir Ingeniería de Software I                                                                |
| Octubre 2026                  | Rendir Arquitectura I                                                                          |
| Noviembre/diciembre 2026      | Rendir Base de Datos I                                                                         |
| Diciembre 2026 / febrero 2027 | Rendir Álgebra Lineal, Cálculo II, Probabilidad                                                |
| Marzo-julio 2027              | Cursar Sistemas Operativos, Organización, Teoría de la Información                             |
| Julio/agosto 2027             | Rendir Sistemas Operativos                                                                     |
| Agosto-noviembre 2027         | Cursar Programación Web                                                                        |
| Diciembre 2027                | Rendir Programación Web y cerrar electivas                                                     |
| Diciembre 2027 / febrero 2028 | Título intermedio terminado                                                                    |

## Estimación de finalización

| Camino | Fecha probable | Edad aproximada |
|---|---:|---:|
| Título intermedio UNICEN | dic 2027 / feb 2028 | 23 |
| Grado completo en Argentina | 2029 / 2030 | 25-26 |
| Intermedio + bachelor europeo con créditos reconocidos | 2029 / 2030 | 24-25 |
| Intermedio + bachelor europeo + máster europeo | 2031 / 2032 | 26-27 |
| Empezar bachelor europeo casi desde cero | 2030 / 2031 | 25-26 |
| Bachelor de cero + máster europeo | 2032 / 2033 | 27-28 |

## Argentina vs Europa

| Opción                                   | Pros                                                             | Contras                                                    |
| ---------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| Terminar Ingeniería en Argentina         | Credencial segura, menor costo, acceso más claro a máster        | Más lento, menos red europea, más burocracia internacional |
| Intermedio + terminar bachelor en Europa | Título europeo, ECTS, red local, internships, mejor inserción UE | Incertidumbre de equivalencias, costo de vida, idioma      |
| Intermedio + máster directo en Europa    | Sería ideal si ocurre                                            | Poco probable; normalmente piden bachelor completo         |
| Empezar Europa de cero                   | Ruta limpia y estándar                                           | Perdés años ya invertidos salvo que te reconozcan créditos |

## Veredicto estratégico

| Pregunta | Respuesta |
|---|---|
| ¿Conviene abandonar UNICEN ahora? | No |
| ¿Conviene cerrar el intermedio? | Sí, es la mejor jugada |
| ¿Conviene esperar sí o sí al grado argentino? | No necesariamente |
| ¿Tiene más valor internacional estudiar en Europa? | Para carrera europea, sí |
| ¿El grado argentino vale afuera? | Sí, pero requiere más evaluación y no te da red local |
| ¿Tu ciudadanía italiana cambia la ecuación? | Mucho: reduce fricción migratoria y laboral |

## Regla de decisión para Europa

| Reconocimiento europeo | Decisión sugerida |
|---|---|
| 90+ ECTS reconocidos | Ir a Europa tiene mucho sentido |
| 60-90 ECTS | Probablemente conviene, según costo/país |
| 30-60 ECTS | Evaluar caso por caso |
| Casi nada reconocido | Seguir Ingeniería en Argentina o buscar otra universidad |
| Entrada directa a máster | Excelente, pero no plan base |

## Materias libres/rápidas

| Conviene intentar rápido/libre | Motivo                                   |
| ------------------------------ | ---------------------------------------- |
| Probabilidad y Estadística     | Desbloquea varias materias fuertes       |
| Organización                   | Más rendible si la cátedra permite libre |
| Ética                          | Buena candidata para acelerar            |
| Formulación TICs               | Posible acelerar con buena preparación   |
| Sistemas Operativos            | Atajo enorme, pero riesgoso              |

Evitaría rendir libre de entrada: Compiladores, IA, Base de Datos II, Programación Web, Arquitectura II, salvo que tengas muy buen material y la cátedra lo permita.

## Plan sintetizado

### 2026

- Matar finales trabados: AyDA I, AyDA II, Ingeniería I, Arquitectura I, Base I.
- Cursar materias que desbloquean 2027.

### 2027

- Cursar y aprobar Sistemas Operativos, si todavía no está aprobada.
- Cursar y aprobar Programación Web, si todavía no está aprobada.
- Completar 60 hs electivas.
- Cerrar título intermedio.

### 2027/2028

- Aplicar a Europa con título intermedio, analítico, programas y traducciones.
- Buscar bachelor completion / advanced entry / riconoscimento crediti.

### 2029-2030

- Terminar bachelor europeo si reconocen créditos suficientes.

### 2031-2032

- Máster europeo.

## Documentos que tenés que preparar

- Analítico actualizado.
- Título intermedio cuando lo tengas.
- Plan de estudios 2023.
- Programas de materias aprobadas.
- Carga horaria y contenidos mínimos.
- Traducciones oficiales.
- Pasaporte italiano.
- Portfolio/proyectos.
- Certificados laborales si querés pedir PPS reconocida o fortalecer admisión.

## Conclusión

La mejor ruta para tu objetivo internacional parece ser:

```text
Cerrar intermedio UNICEN -> Europa -> terminar bachelor -> máster
```

No descartaría el grado argentino, pero lo usaría como plan B si Europa te reconoce pocos créditos. Fuentes principales usadas: plan 2023 y plan interactivo de Exactas UNICEN, reglamento PPS/PI, sistema ECTS europeo y reconocimiento académico UE.

## cursos/certificaciones en curso
ahora estoy preparando el examen CCNA para septiembre
tambien certificacion en project management y cybersecurity de google
luego puedo comenzar a estudiar gratis cursos associate/professional de gcp
tener en cuenta!! security+ de comptia

# calsof
repasar bien los refactorings y con que code smells re relacionan

test doubles
- stub devuelve los datos preparados para que el test avance
- mock: sirve para verificar interacciones
- fake: implementacion simple pero funcional, ej base de datos en memoria
- dummy: objeto que solo se pasa porque la firma (parametro) lo exige, pero no se usa
- spy: objeto real parcialmente observado o intervenido

no se puede hacer thenReturn en metodos void, se usa verify(), doThrow()...

No confundas assertEquals(...) con verify(...): si querés comprobar un resultado, usás assert; si querés comprobar que se llamó a una dependencia, usás verify.

principios solid:
explicar bien la violacion concreta, estudiar casos de ejemplo para reconocerlos bien
- consecuencias de la violacion
- refactor concreto

code smells:
- long method
- god class
- feature envy
- data class
- lazy class

***Code smell	Refactoring principal***
Long Method	Extract Method
God Class / Large Class	Extract Class
Feature Envy	Move Method
Data Class	Move Method hacia la clase de datos

inline son lo opuesto de extract:
extract method/class: separa algo porque esta haciendo demasiado
inline method/class: elimina una separacion porque no aporta nada


# portfolio 
poner un planeta en mi portfolio de three js mostrando los paises que visite

# chiken stop
chicken stop: ir viendo tema marketing, packaging, ideas de receta, flujo de trabajo de cocina

# komanda
usar los creditos de azure para infra => opentofu
- single-tenant to multi-tenant => todos con dominio en comun
- no creo bds ni containers por cada negocio, redirigo a su pagina de acuerdo a su slug
- tauri/electron pagina para el print worker


# otro
- rellenar el forms de movilidad a francia
- responder al mail diciendo que estoy interesado por la propuesta y que quedo a la espera para las inscripciones de las clases de frances
