es la division de una tarea grande en partes mas pequenas para que los elementos de proceso las ejecuten en simultaneo

se introducen nuevos problemas:
- sincronizacion de las tareas
- control de ejecucion simultanea
- conflictos debidos a dependencias

la eficiencia se mejora cuando:
- se logra un balance de carga entre procesadores: igual numero de tareas de igual tamaño 
- se minimiza la interacción entre tareas: se minimiza la comunicación o, al menos, se mejoran los canales de comunicación

### niveles de paralelismo
- Trabajo: Dos programas distintos pueden ejecutarse en paralelo 
- Tarea: En este nivel se consideran varias tareas independientes entre si formando parte de un programa determinado. Es posible la interacción de las tareas (Ej: clientes) 
- Proceso: Varios procesos componen una tarea. Son bloques con funcionalidad bien definida (Ej: bucles de un for). 
- Variable: El paralelismo puede darse a nivel de variables ya que varias instrucciones pueden ser ejecutadas en paralelo siendo el punto de conflicto las variables en común (Ej: arreglos) 
- Bit: Todos los computadores usan paralelismo a nivel de bit (Ej: sumadores)

## limites tecnologicos
el feature size (d) determina el tamano de las compuertas en la tecnologia CMOS de manera que:
- Un aumento de la velocidad de reloj es proporcional a λ=1/d 
- Un aumento del número de transistores es proporcional a λ^2

evolucion de la tecnologia
1. procesadores escalares
2. procesadores superescalares
3. multiprocesadores
4. multi GPUs

$$T = \frac N P * \frac 1 {IPC} * T_c$$

- T: Tiempo total de ejecución
- N: Número total de instrucciones
- P: Número de procesadores
- IPC: Instrucciones por ciclo
- T_c: Período del reloj (1/frecuencia)
%%>quisiera entender mejor la formula %%
## medidas de performance
speedup (S_p para P procesadores)
- promedio entre el tiempo de proceso secuencial y paralelo en P procesadores
- $$S_p = \frac{T_1}{T_p}$$
- T1: tiempo en 1 procesador
- T_p: tiempo en p procesadores
- S_p\<p

eficiencia (E_p para p procesadores)
- cociente entre S_p y p
- medida de la relacion costo/efectividad de la computacion
- p: numero de procesadores
- S_p speedup con p procesadores
- $$E_p =\frac{S_p}{p}$$
- la eficiencia maxima es que E(p) = 1. osea que todos los procesadores estan siendo completamente utilizados durante todo el periodo de ejecucion
- 0<E_p<1
%%> eficiencia se relaciona con speedup%%


escalabilidad:
- se dice que es escalable para un rango de procesadores \[1...p], si:
	- la eficiencia E(p) del sistema se mantiene constante y
	- en todo momento por encima de un factor 0.5

redundancia (R_p para p procesadores)
- promedio entre el numero total de operaciones ejecutadas en p procesadores y el numero de operaciones necesarias en 1 procesador
- $$R_p = \frac{O_P}{O_1}$$
- O_p: numero de operaciones en p procesadores
- O_1: numero de operaciones en 1 procesador
- 1<=R_p<=p
- indica la relacion entre paralelismo software y hardware

utilizacion (U_p para p procesadores)
- $$U_p = R_p * E_p$$
- nro de operaciones totales ejecutadas con p procesadores ponderada por la eficiencia de trabajo en esos p procesadores
- la utilizacion del sistema indica el porcentaje de recursos que se utilizan durante la ejecucion de un programa en paralelo
- el nro ideal es rondando 1
	- Rp ≈ Ep ≈ 1

%%> una redundancia de 1 es buena? %%

calidad de paralelismo (Q_p para p procesadores)
- esta medida es proporcional al speedup y a la eficiencia e inversamente proporcional a la redundancia
- $$Q_p = \frac{S_p * E_p}{R_p}$$
- la calidad Q(p) siempre esta limitada por el speed-up S(p)
- en general Q_p <= S_p

#### resumen - medidas de performance
 - speed-up S(p) se usa para indicar el grado de ganancia de velocidad de una computacion paralela
 - eficiencia E(p) mide porcion util de trabajo total realizado por p procesadores
 - redundancia R(p) mide el grado de incremento de la carga
 - utilizacion U(p) indica el grado de utilizacion de recursos durante un calculo paralelo
 - calidad Q(p) combina el efecto del speed-up, eficiencia y redundancia en una unica expresion para indicar el merito relativo de un calculo paralelo sobre un sistema

## limites de la computacion paralela
- t_s = tiempo de sincronización 
- t = granularidad de tarea (tiempo de ejecución promedio de las tareas) 
- t_o = overhead de tareas causado por la ejecución paralela 
- N = cantidad de tareas entre puntos de sincronización 
- P = número de procesadores

### tiempo de ejecución secuencial
el tiempo de ejecución secuencial de N tareas de tiempo t será:
$$T_1 = N \cdot t$$

### tiempo de ejecución paralelo
en un ambiente paralelo cada tarea requiere (t + t_o) unidades de tiempo. si hay N tareas en P procesadores, el número de pasos paralelos será ⌈N/P⌉. entonces el tiempo de ejecución paralelo será:
$$T_{N,P} = t_s + \lceil N/P \rceil \cdot (t + t_o)$$

si N es múltiplo de P no hay penalizaciones de balance de carga al final de cada computación

### speedup
el speedup del sistema será:
$$S_{N,P} = \frac{T_1}{T_{N,P}} = \frac{N \cdot t}{t_s + \lceil N/P \rceil \cdot (t + t_o)}$$

### eficiencia
la eficiencia del sistema será:
$$E_{N,P} = \frac{S_{N,P}}{P} = \frac{N \cdot t}{P \cdot \big(t_s + \lceil N/P \rceil \cdot (t + t_o)\big)}$$

#### límites de las métricas
| Métrica | P→∞, N fijo | N→∞, P fijo |
|---|---|---|
| S_N,P | limitada por N | P |
| E_N,P | 0 | 1 |

#### conclusiones
- la primera columna muestra que el speedup resultante de incrementar el número de procesadores está limitado por el número de tareas N, mientras que la eficiencia tiende a 0
- la segunda columna muestra que un speedup igual a la cantidad de procesadores puede ser logrado realizando un gran número de tareas, siempre y cuando el overhead sea ínfimo respecto a la granularidad de tareas

# clasificacion de arquitecturas paralelas
- SISD
	- escalares
- SIMD
	- vector processors
	- array processors
- MISD
- MIMD
	- superescalares

## SISD
cpu controla todas las operaciones que se realizan en la maquina extrayendo secuencialmente las instrucciones de programa desde la memoria

CPU:
- ctrl unit: ejecuta una a una las instrucciones de programa
- ALU: realiza las operaciones sobre los datos
- registros internos: se almacenan datos parciales y direcciones
es un von neumann clasico

![[Pasted image 20260830233028.png]]
![[Pasted image 20260830233039.png]]

## MISD
- info circula entre las celdas como un pipeline
- comunicaion con el exterior se produce en las celdas frontera
- varias instrucciones trabajan sobre el mismo flujo de datos (caso poco usado)

## MIMD
![[Pasted image 20260830233117.png]]
flujo multiple de instrucciones, flujo multiple de datos
- Es la mejor estrategia de diseño orientada a obtener el más alto rendimiento y la mejor relación costo/rendimiento. 
- Idea general: conectar varios procesadores para obtener un rendimiento global lo más cercano a la suma de rendimientos de cada procesador por separado. 
- La filosofía de trabajo plantea la división de un problema en varias tareas independientes y asignar a cada procesador la resolución de cada una de estas tareas.

# clasificación de las arquitecturas de computadoras

la clasificacion de las arquitecturas se hace según los **flujos de instrucciones** (stream de instrucciones que ejecuta el procesador) y los **flujos de datos** (stream de datos sobre los que se opera). de aqui nace la **taxonomia de Flynn**:

| | una instrucción | varias instrucciones |
|---|---|---|
| un dato | **SISD** | **MISD** |
| varios datos | **SIMD** | **MIMD** |

- **SISD** (Single Instruction Single Data): un solo procesador, un dato por vez. es la maquina von neumann clasica.
- **SIMD** (Single Instruction Multiple Data): la misma instruccion se aplica a muchos datos a la vez.
- **MISD** (Multiple Instruction Single Data): varias instrucciones sobre un mismo dato (no es muy común).
- **MIMD** (Multiple Instruction Multiple Data): varios procesadores, cada uno con su stream de instrucciones sobre sus propios datos. es la mejor estrategia para obtener el maximo rendimiento.

### niveles / formas de paralelismo
se ordenan de la granularidad mas fina (unidad mas chica) a la mas gruesa:

- **ILP** (Instruction Level Parallelism): se ejecutan varias instrucciones al mismo tiempo dentro de un mismo procesador. lo explotan los procesadores superescalares y los pipelines.
- **DLP** (Data Level Parallelism): se aplica la misma operacion a muchos datos simultaneamente. lo explotan las unidades SIMD (vector processing).
- **TLP** (Thread Level Parallelism): se ejecutan en paralelo distintos hilos (threads) de un mismo proceso. lo explota el SMT y los multicore.
- **PLP** (Process Level Parallelism): se ejecutan en paralelo procesos/programas completos e independientes sobre multiples procesadores o maquinas.

### arquitecturas segun como explotan el paralelismo
- **Pipeline**: superpone las etapas de distintas instrucciones (cada instruccion pasa por etapas: fetch, decode, execute...). aumenta el throughput sin aumentar el tiempo de una instruccion.
- **Superescalar**: emite varias instrucciones por ciclo, con multiples unidades funcionales que las ejecutan en paralelo (explotan ILP de forma dinamica).
- **VLIW** (Very Long Instruction Word): la instruccion es muy larga y codifica varias operaciones que se ejecutan en paralelo. el compilador decide el paralelismo (explota ILP de forma estatica).
- **EPIC** (Explicitly Parallel Instruction Computing): variante de VLIW en la que el compilador emite explicitamente instrucciones paralelas (ej: Itanium).
- **TTA** (Transport Triggered Architecture): la ejecucion la disparan los movimientos de datos entre unidades funcionales.
- **Dataflow**: la ejecucion de una instruccion se dispara cuando estan disponibles todos sus operandos (el paralelismo surge de las dependencias de datos, no de un orden de programa).
- **Short vector processing (SIMD)**: extensiones SIMD de longitud corta (ej: SSE, AVX en CPUs).
- **Vector processors (SIMD)**: procesadores con unidades que operan sobre vectores de datos enteros (ej: Cray).

### clasificacion por granularidad de las tareas
- **Fine grain**: tareas muchos y chicas, con alto costo relativo de sincronizacion/comunicacion.
- **Coarse grain**: tareas pocas y grandes, con poca comunicacion relativa.

### clasificacion por organizacion de procesadores
- **SMT** (Simultaneous Multithreading): un mismo procesador ejecuta instrucciones de varios hilos en el mismo ciclo reutilizando las unidades funcionales (ej: Hyperthreading).
- **Multi core processors**: varios nucleos dentro de un solo chip (TLP a nivel de nucleo).
- **Multi processor systems (MIMD)**: varios procesadores completos compartiendo recursos.
- **Multi computer (MIMD)**: maquinas completas conectadas por una red, cada una con su propia memoria.

### locking en multiprocesadores
en un multiprocesador, si varias CPUs acceden a un mismo recurso compartido, hace falta un mecanismo de **lock** (bloqueo) para garantizar la exclusion mutua:

- **Locked**: el acceso a la zona compartida se protege con un mecanismo de bloqueo (la operacion atomica tipo read-modify-write). el hardware garantiza la atomicidad.
- **Not locked**: no se usa bloqueo y se asume que el acceso es seguro o se maneja por otro medio.

(esto se relaciona con la columna que menciona "MIPS Multiprocessor without Interlock Pipeline Stages": el nombre original MIPS venia de *Microprocessor without Interlocked Pipeline Stages*, es decir, un pipeline sin etapas interconectadas por hardware que requieran tracking de conflictos; en el contexto multiprocesador el paralelismo se coordina con locks a nivel de software/hardware de memoria.)

# clasificación de las arquitecturas de computadoras por tipo de memoria

organiza las computadoras paralelas según **cómo acceden los procesadores a la memoria principal**:

- **Sistemas de memoria compartida** (multiprocesadores, fuertemente acoplados): todos los procesadores comparten una misma memoria. la comunicacion entre procesadores es via la memoria comun, lo que facilita el intercambio de datos pero genera conflictos de acceso.
- **Sistemas de memoria distribuida** (multicomputadoras, débilmente acoplados): cada procesador tiene su propia memoria privada. la comunicacion entre procesadores se hace por mensajes a traves de una red, sin memoria comun.
- **Sistemas hibridos**: combinan ambos (nodos con memoria compartida conectados entre si por red, como los clusters).

### memoria compartida: multiprocesadores
- **UMA** (Uniform Memory Access): el tiempo de acceso a cualquier direccion de memoria es el mismo para todos los procesadores. es la mas simple: hay un solo bus/memoria central.
- **NUMA** (Non-Uniform Memory Access): cada procesador tiene su memoria local mas rapida, pero puede acceder a la memoria de otro procesador mas lento. el acceso no es uniforme.

### memoria distribuida: multicomputadoras
- **MPP** (Massively Parallel Processor/Processing): multicomputadora con una gran cantidad de nodos, capaz de escalar a miles/millones de procesadores conectados por una red de alta velocidad.
- **Cluster**: grupo de maquinas (nodos) independientes conectadas por una red local que trabajan juntas como un solo sistema. si cada nodo es a su vez un multiprocesador con memoria compartida, se llama **Cluster-Nodo** (estructura hibrida: multicomputadora con multiprocesadores adentro).

### resumen comparativo
| | memoria compartida | memoria distribuida |
|---|---|---|
| tipo de sistema | multiprocesador | multicomputadora |
| acoplamiento | fuerte | débil |
| comunicacion | memoria comun | paso de mensajes |
| ejemplos | UMA, NUMA | MPP, Cluster |
