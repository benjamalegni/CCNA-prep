- [x] enumeracion de servicios comunes y gestores de contenido
- [x] conceptos basicos de enumeracion y explotacion 3/1
- [ ] crear calendario interactivo que sea facil para crear reuniones compartidas y que tenga los juegos de linkedin
- [x] crear pagina con astro de mis notas de CCNA con los labs de jeremy's IT lab
- [ ] crear instagram clone (que los links se vean parecidos) para que gente ponga su cuenta y password
- [ ] pasar proyectos de cubepath a servidor propio (incluyendo komanda)
- [ ] 
# contenidos del final AyDA1
- especificar TDA, con operaciones y especificarlas
	- ejemplo TDA cuadricula generico
- clasificar operaciones en constructoras, observadoras, y transformadoras
- clases de c++
	- inicializacion de atributos en la definicion del constructor
- header de c++
- algoritmos divide y conquista (y otras tecnicas de diseno)
- greedy
	- greedy optimo
- programacion dinamica
	- aprender multiplicacion encadenada de matrices
	- top-down
	- bottom-up
- complejidad temporal, ***teorema maestro***
	- si el tiempo de ejecucion de un algoritmo es O(n^2) en el peor caso, es posible que sea O(n^3) sobre algunas entradas? **no***
	- si el tiempo de ejecucion de un algoritmo es O(n^2) en el peor caso, es posible que sea O(n)sobre algunas entradas? **si***
	- si el tiempo de ejecucion de un algoritmo es theta(n^2) en el peor caso, es posible que sea O(n)sobre algunas entradas? **no, porque en la notacion asintotica $\theta$ (theta), el mejor caso debera ser igual al peor de los casos***
	- aprender lo 3 tipos de notaciones asintoticas
- seguimiento de codigo
- multiplicacion de cadena de matrices

realice un seguimineto de algoritmo propuesto para multiplicar 4 matrices M1 x M2 x M3 x M4, donde
M1 es de tamano 5x3
M2 es de tamano 3x2
M3 es de tamano 2x6
M4 es de tamano 6x4
debe quedar claro el orden de la multiplicacion que minimice el numero de operaciones y como se obtiene

#### notas relevantes:
- se le pone const en la declaracion (en el header) y en la implementacion en archivos cpp a aquellas operaciones observadoras que no cambien ningun valor
``` cpp
class MyClass {
public:
    void getValue() const; // Declaration
};

void MyClass::getValue() const { // Definition
    // Function body
}
```
- en el header se declaran como:
```cpp
public:  
    FilaDeClientes();  
  
    // operaciones transformadoras  
    void llamarCliente(bool estaPresente);
```
- en el archivo cpp se van implementando como Clase::metodo(parametros){cuerpo} y no es necesario indicar cual es el tipo de dato que devuelve



# arquitectura de computadoras I

rendimiento/amdahl:
- tiempo de CPU = cantidad de instrucciones * CPI * tiempo de ciclo de reloj

MIPS segmentado
- diagrama del CPU
	- registros se escriben en flanco ascendente (primera mitad del ciclo) y se leen en flanco ascendente (en la segunda mitad de ciclo) para evitar riesgo de datos
	- alu ops:
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

# carrera

## Estado actual

| Punto | Estado |
|---|---|
| Carrera actual | Ingeniería de Sistemas, UNICEN, plan 2023 |
| Materias con final/promoción/equivalencia | 11 |
| Materias curriculares del grado | 37 + PPS/Proyecto Integrador |
| Pendientes curriculares | 26 + PPS/PI |
| Atraso vs plan ideal | aprox. 1,5 a 2 años |
| Objetivo corto | cerrar título intermedio |
| Objetivo internacional | usar intermedio para continuar bachelor en Europa y luego máster |

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
