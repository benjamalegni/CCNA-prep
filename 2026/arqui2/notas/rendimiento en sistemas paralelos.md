nueva formula de rendimiento para P procesadores:
$$T_{CPU}= \frac {RI}{P} * \frac {1}{IPC} * t_{ciclo}$$

limites del paralelismo
La máxima aceleración ideal, p, se verá limitada por el tamaño de la parte secuencial del problema

fs = fraccion secuencial
fn/p = fraccion paralelizable (nunca es 100% paralelizable en la practica)

![[Pasted image 20260907155004.png]]

si tengo infinitos procesadores, la parte paralelizable va a tener a 0

**formula de aceleracion**
$$A_{p, fs} = \frac {p}{1+fs(p-1)}$$
### perfil de paralelismo
"cantidad de paralelismo" que una aplicacion posee
caracterizado por dos parametros:
- grado de paralelismo
	- nro de tareas que se pueden realizar en paralelo durante la ejecucion de una aplicacion
- grano de paralelismo
	- tamano promedio de las acciones (tamano promedio de una tarea elemental) en termino de:
		- nro de intrucciones ejecutadas
		- nro de palabras de memorias usadas
		- duracion de su tiempo de ejecucion

### granularidad
tambien puede verse como la cantidad de procesamiento que una tarea realiza antes de necesitar comunicarse con otra tarea

relacion entre la computacion y la comunicacion de una aplicacion
- granularidad pequena: implica mas comunicacion y cambios de contexto entre las tareas
- granularidad grande: implica menos comunicacion

### grado de paralelismo (DOP)
representa el grado de mapeo entre el paralelismo del software y la capacidad de procesamiento paralelo del hardware

se mide en intervalos de tiempo cuantos elementos de procesamiento paralelo (HW) se estan utilizando para un algoritmo dado (SW)

si:
- p=capacidad de procesamiento paralelo del sistema
- m=maximo paralelismo posible de un algoritmo dado
- DOP=numero de elementos paralelos en los que se puede dividir un programa en un momento dado, entonces
DOP<=m\<P

- **numero de elementos paralelos Δs:** cantidad de acciones que se pueden realizar en paralelo segun la granularidad que se analice (instrucciones, procesos, tareas). se puede ver como paralelismo de software
- **capacidad de procesamiento paralelo Δh:** del sistema es la cantidad de elementos de proceso que dispone el hardware respecto de la granularidad que se analice. se puede ver como paralelismo de hardware

![[Pasted image 20260909104730.png]]

carga de trabajo (**W**):
es el **numero de instrucciones ejecutadas entre todos los procesadores de un sistema para llevar a cabo la ejecucion de un programa**
si un sistema esta formado por suficientes procesadores ∆h MIPS y el tiempo esta en segundos, la carga de trabajo del programa en ese sistema sera.

![[Pasted image 20260909104928.png]]
**∆ es la cantidad de instrucciones que puede ejecutar un procesador en un segundo**
hay dos ecuaciones porque puedo elegir en contar las filas o contar las columnas (dan el mismo resultado)

paralelismo promedio: valor medio del perfil de paralelismo durante todo el tiempo de ejecucion del programa
- ![[Pasted image 20260909105049.png]]
tasa de utilizacion: relacion entre el grado medio de paralelismo explotado (referido a la capacidad maxima de procesamiento) y el maximo grado de paralelismo
- ![[Pasted image 20260909105121.png]]

## metricas de rendimiento
#### **tiempo de respuesta:**
variables: 
- $$W_i = i * \Delta s * t_i$$
	- W significa la carga de trabajo cuando el grado de paralelismo = i
- i = es el grado de paralelismo (DOP) 

casos:
- cuando i\<P (hay suficientes procesadores para el paralelismo del software)
	- $$T_i(P)= \frac {W_i}{i * \Delta h}$$
- cuando i>=P (el paralelismo requerido supera la cantidad de procesadores)
	- $$T_i(P)=\lceil \frac {i}{P} \rceil \frac {W_i}{i * \Delta h}$$
	- la funcion techo representa la distribucion del trabajo adicional entre los procesadores disponibles

#### speedup asintotico
que era el speedup? es el tiempo de ejecucion con n procesadores respecto al tiempo de ejecucion con uno

T(1) = > completar formula
T(infinito) => completar formula

S_infinito = T(1)/T(inf) => completar formula


el speedup asintotico sera el cociente de T(1) y T(inf), osea un parametro que mide la aceleracion del tiempo de calculo por el hecho de poder paralelizar al maximo la aplicacion

con lo que S_infinito = P en el caso ideal y S_infinito <= P en el caso real

## modelos de medicion del speed-up
- Limitación por carga de trabajo fija: 
	- Modelo sugerido por Amdahl (1967) 
	- Basado en una carga de trabajo fija o en un problema de tamaño fijo 
- Limitación por tiempo fijo: 
	- Modelo sugerido por Gustafson (1987) 
	- Problemas escalables 
	- El tamaño del problema se incrementa al aumentar el tamaño de la máquina 
	- Se dispone de un tiempo fijo para realizar una determinada tarea 
- Limitación por memoria fija: 
	- Modelo sugerido por Sun & Ni (1993) 
	- Se aplica a problemas escalables limitados por la capacidad de memoria

#### limitacion por carga de trabajo fija (fixed workload):
- usada en aplicaciones donde es importante la respuesta mas rapida posible
- carga de trabajo W se mantiene fija y el tiempo de ejecucion lo que se intenta reducir
- factor de speed-up esta acotado superiormente por el cuello de botella secuencial
- casos posibles:
	- DOP = i>=P. los P procesadores se usan para ejecutar Wi
		- ![[Pasted image 20260909132146.png]]
	- DOP = i\<P. i procesadores se usan para ejecutar Wi
		- ![[Pasted image 20260909132217.png]]
- de T(1) y T(P) se puede derivar el speed-up para P procesadores
	- ![[Pasted image 20260909132329.png]]
- en un caso real se debe considerar factores como latencias de sync, demoras de acceso a memoria, accesos a buses, etc.
	- **sea Q(P) la suma de todas las sobrecargas**:
	- ![[Pasted image 20260909132433.png]]
el tiempo de la parte secuencial W1 no cambia, pero la parte paralela Wp se ejecuta en P procesadores y por lo tanto se ejecuta P veces mas rapido

entonces:
- si Wp=1-alfa
- y si W1=alfa
$$S_p= \frac {1}{\alpha + (1-\alpha)/P }$$
$$S_pmax = \frac {1}{\alpha}$$
![[Pasted image 20260909135623.png]]
#### limitacion por tiempo fijo (fixed execution time)
lo que debe quedar fijo es el tiempo de calculo.
entonces si aumenta la potencia de calculo, **se puede aumentar la precision**

en problemas de precision critica, se desea resolver el problema de mayor tamano en una maquina mayor en (aproximadamente) el mismo tiempo de ejecucion que costaria resolver un problema menor en una maquina menor
![[Pasted image 20260909135603.png]]
sea:
- m el maximo DOP del problema original
- m' el maximo DOP del problema escalado
- W'i la carga de trabajo para DOP=i
con
- W'i>Wi para 2<=i<=m' (la carga de trabajo escalada es mayor que la original)
- W'1 = W1
y el supuesto que el tiempo del problema original sin escalar es igual al tiempo de ejecucion del problema escalado. **osea lo aumento en complejidad, el tiempo no varia**
![[Pasted image 20260909140035.png]]

si la computadora opera en un modo totalmente secuencial (DOP=1) o un modo totalmente paralelo (DOP=P); o sea Wi = 0 para i≠1 ó i ≠P
- speedup sera:
	- ![[Pasted image 20260909140411.png]]
- si W_p =1-alfa y W1=alfa, entonces:
	- 
		![[Pasted image 20260909140454.png]]

es la ley de Gustafson que permite soportar el rendimiento escalable al aumentar el tamano de la maquina

#### limitacion por memoria fija (fixed memory)
generaliza a la ley de amdahl y gustafson

genera una ecuacion que se la puede interpretar de las dos formas
- idea basica: resolver el mayor problema posible limitado por el espacio de memoria

sean:
- M la demanda de memoria para un problema dado
- W la carga computacional para dicho problema
- sean g la relacion entre M y W dependiendo de las restricciones de la arquitectura de modo que 
	- W = g(M)
	- M = g^-1(W)
- $$W = \sum^{m}_{i=1} W_i$$ la carga para una ejecucion secuencial del programa en un unico nodo

- $$W^*=\sum^{m*}_{i=1}W^*_i$$ la carga para el problema aplicado a P nodos
- m* el maximo DOP para el problema escalado
entonces el speedup sera:
![[Pasted image 20260909142027.png]]
el asterisco es para diferenciar entre amdahl y gustafson
![[Pasted image 20260909142809.png]]
hay 3 casos particulares de esta aplicacion:
- G(P) = 1, entonces el problema es fijo y el modelo se corresponde a la ley de amdahl
- G(P) = P, **aplica al caso en que la carga se incrementa P veces cuando la memoria se incrementa P veces**. se comporta segun la ley de Gustafson con un tiempo de ejecucion fijo
- G(P) > P, la carga computacional se incrementa mas rapido que los requisitos de memoria -> **osea va a terminar fallando**
![[Pasted image 20260909143038.png]]

### comparacion de rendimiento
en la practica si se tiene N programas ejecutandose en diferentes maquinas. cuales son las formas de comparar la maquina mas rendidora?

### metodos:

rendimiento basado en media aritmetica
- **simple**
	- rendimiento inversamente proporcional a la suma de los tiempos de ejecucion
	- $$\frac {1}{R_a} = \frac {\sum^n_{i=1} tiempo_i}{n}$$
	- con el tiempo_I, tiempo de ejecucion del programa i-esimo de un total de n de la carga de trabajo

- **ponderada**
	- rendimientos inversamente proporcional a la suma de los tiempos de ejecucion ponderados por la frecuancia en la carga de trabajo
	- $$\frac {1}{R_a} = \sum^n_{i=1} f_1 * tiempo_i$$
	- con tiempo_i, tiempo de ejecucion del programa i-esimo de un totral de n de la carga de trabajo y Fi, la frecuencia relativa del i-esimo programa en la carga de trabajo

- **normalizada**
	- se usan distintas maquinas, tomando una de ellas como referencia (norma). se ponderan las otras segun la norma
	- ![[Pasted image 20260909143446.png]]
	- el rendimiento de la media aritmetica varia dependiendo de cual sea la maquina de referencia

rendimiento basado en media geometrica
- simple 
- ponderada
	- rendimiento inversamente proporcional al producto de los tiempos de ejecucion
		 - Rg es el rendimiento mediante la medida geometrica
	- $$\frac{1}{R_g} = T_g = \sqrt[n]{\prod{}^n_{i=1} f_i*tiempo_i}$$
%%> que es Rg?%%
- normalizada
