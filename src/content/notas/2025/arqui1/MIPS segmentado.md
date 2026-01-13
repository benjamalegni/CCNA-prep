### segmentacion intro
tecnica utilizada para optimizar el tiempo de ejecucion de procesos que se realizan mediante la repeticion de una secuencia basica de pasos
- seperar el proceso en etapas y ejecutar cada una en un recurso independiente
- mejorar la productividad, cantidad de procesos terminados por unidad de tiempo
- cuando una etapa termina, el recurso librerado puede ejecutar la misma etapa del siguiente proceso

funcionamiento segmentado
![[Pasted image 20250608141117.png]]
![[Pasted image 20250608141132.png]]
- para 4 procesos de lavado
	- secuencial 8hs -> segmentado 3,5hs => aceleracion = ==2.28
- para 10 procesos de lavado
	- secuencial 20hs -> segmentado 6,5hs => aceleracion = ==3.07

la aceleracion aumenta en la medida que aumenta la cantidad de procesos completos de lavado

- para un solo proceso de lavado **NO**  hay aceleracion
	- T_p(1) = T_s(1)
- para M procesos de lavado con M tendiendo a infinito
	- T_s(M) -> M.T_etapa
	- aceleracion maxima -> T_p(1)/T_etapa
- para el ejemplo del lavado de ropa
	- aceleracion maxima 2/0.5 = 4
- ==la aceleracion maxima es igual a la cantidad de etapas del proceso segmentado

- las etapas tardan lo mismo: 1/2 hs
- cada proceso de lavado completo lleva 2hs
- primer proceso completo sale despues de 2hs
- una vez en regimen, el resto de los procesos salen cada 1/2 hora
y si las etapas no tardan el mismo tiempo?


![[Pasted image 20250608141940.png]]
- la etapa mas lenta es la que determina la segmentacion
- una vez en regimen, el resto de los procesos salen cada 45 minutos
- aceleracion maxima es 2.66 (antes era de 4)
- ==la aceleracion ya no es igual a la cantidad de etapas de segmentacion

la latencia es el tiempo que tarda en salir un proceso completo
en ejemplo de la filmina anterior:
- latencia= 3x45 + 15 minutos = 150 minutos (T_s(1))
- la latencia original del proceso sin segmentar es de 120 minutos (T_p(1))

- analice un proceso segmentado en 5 etapas con:
	- E1=30', E2=30', E3=45', E4=15' y E5=30'
cual seria la latencia?
	 latencia = 3x45+2x30min = 195min

defs.
- la latencia de un proceso segmentado es siempre mayor o igual a la latencia de un proceso sin segmentar
- **throughput** es la cantidad de procesos completos que se realizan por unidad de tiempo
- considerando N la cantidad de etapas y T_etapa el tiempo de etapa mas lento
	- latencia = N * T_etapa (llevado a etapas que duren lo mismo)
	- throughput = 1/T_etapa

## pipeline
- en diseno de circuitos digitales, la segmentacion de procesos es conocida como la tecnica del *pipeline*
- una "tuberia" de procesos conectados en cadena
el flujo de entrada es el mismo al flujo de salida
no puede entrar nada a la tuberia sin salir algo del otro lado
la velocidad del flujo de entrada no depende de la longitud de la tuberia

## microprocesador MIPS - pipeline
- observar el procesador como una "tuberia" de instrucciones
![[Pasted image 20250608150402.png]]

- lw $1, 134($2)
	- obtener instruccion lw. acceso a memoria de instrucciones
![[Pasted image 20250608160819.png]]
decodificar instruccion lw. lectura de operando $2
![[Pasted image 20250608160844.png]]
calcula direccion de acceso a memoria
![[Pasted image 20250608160859.png]]
obtener dato. acceso a memoria de datos
![[Pasted image 20250608160915.png]]
escritura del resultado en $1
![[Pasted image 20250608160928.png]]
![[Pasted image 20250608160941.png]]
- tuberia de instrucciones
![[Pasted image 20250608161026.png]]

#### pipeline
- division del datapath del MIPS en 5 etapas de *pipelining*
	- IF (instruction fetch) obtiene la instruccion desde la memoria de programa
	- ID (instruction decode) lectura de registros mientras decodifica la instruccion
	- EX (execute) ejecuta los operandos o calcula la direccion efectiva de memoria
	- MEM (memory) acceso a memoria o escribir en PC direccion de salto
	- WB (write back) escribe el resultado en un registro

- diseno con 5 etapas
	- ![[Pasted image 20250608161220.png]]
- ciclo unico vs segmentado. ejemplo

| instruction class                 | instruction fetch | register read | ALU operation | data access | register write | total time |
| --------------------------------- | ----------------- | ------------- | ------------- | ----------- | -------------- | ---------- |
| load word (lw)                    | 200ps             | 100ps         | 200ps         | 200ps       | 100ps          | 800ps      |
| store word (sw)                   | 200ps             | 100ps         | 200ps         | 200ps       |                | 700ps      |
| r-format (add, sub, AND, OR, slt) | 200ps             | 100ps         | 200ps         |             | 100ps          | 600ps      |
| branch (beq)                      | 200ps             | 100ps         | 200ps         |             |                | 500ps      |
![[Pasted image 20250608161516.png]]

- algunas cosas a tener en cuenta
- ![[Pasted image 20250608161534.png]]
- ![[Pasted image 20250608163758.png]]
- solucion para determinar el registro de escritura:
	- el numero de registros de escritura se pasa por los registros pipe
![[Pasted image 20250608175112.png]]

que sucede con las senales de control?
![[Pasted image 20250608175130.png]]
![[Pasted image 20250608175137.png]]

- las senales de control se determinan en la etapa de decodificacion (ID)
- los valores de las senales de control son los mismos que los calculados en el control del microprocesador uniciclo

### pipeline-riesgos
- en el microprocesador escalar segmentado idealmente el CPI  es igual a 1
- existen situaciones en el *pipelining* en las que las instrucciones no pueden ejecutarse en el siguiente ciclo de reloj
- en esos casos el rendimiento del procesador disminuye, el CPI>1
- existen 3 tipos de riesgos
	- **estructurales**
	- **dependencia de datos**
	- **control**

## riegos
- **estructurales**
	- se intenta utilizar el mismo recurso hardware por 2 instrucciones diferentes al mismo tiempo
	- el hardware impide cierta combinacion de operaciones
- **dependencia de datos**
	- se intenta utilizar el dato antes que este disponible
	- el operando de una instruccion depende del resultado de una operacion precedentes que aun no se ha obtenido
- **control**
	- se intenta tomar una decision antes de evaluarse la condicion
	- si se salta, las instrucciones posteriores no deben terminar su ejecucion

la forma mas sencilla de solucionar un riesgo es detener el *pipeline* hasta que el riesgo desaparezca
- las instrucciones que preceden a la causante del riesgo pueden continuar
- la instruccion que causa el riesgo y las siguientes no continuan su ejecucion hasta que el riesgo no exista
el control del *pipeline* debe
- detectar las causas del riesgo
- decidir acciones que resuelvan el riesgo

- ### riesgo estructural
	- sucede con accesos simultaneos a memorias, registros o unidades funcionales
	- se soluciona
		- agregando esperas
		- duplicar recursos
	- ejemplo: con utilizacion de arquitectura Von Neumann
		- conflicto estructural entre instruccion lw y el fetch de nueva instruccion (3 instrucciones despues)
		- soluciona utilizando memoria de programa y datos separadas (Harvard)
		- Von Newmann ![[Pasted image 20250608181237.png]]
		- entre 2 instrucciones pueden existir 3 tipos de dependencias
			- RAW (read after write), WAW (write after write), WAR (write after read)
			- ![[Pasted image 20250608181356.png]]

## riesgos por dependencia de datos
- RAW  (read after write): una instruccion posterior intenta leer una fuente antes que una instruccion anterior la haya determinado
- WAW (write after write): una instruccion posterior intenta modificar el destino antes que la instruccion anterior lo haya hecho (se modifica el orden de la escritura)
- WAR (write after read): una instruccion posterior intenta modificar su destino antes que la instruccion anterior lo haya leido como fuente
![[Pasted image 20250608181715.png]]
![[Pasted image 20250608181723.png]]![[Pasted image 20250608181746.png]]

- escritura en banco de registros
	- en flanco ascendente la instruccion lw escribe en el ciclo 6
		- el alcance de riesgo por dependencia RAW es de 3 instrucciones
	- en flanco descendente la instruccion lw escribe en el ciclo 5
		- el alcance de riesgo por dependencia RAW es de 2 instrucciones
		- en el estado alto del ciclo se debe resolver el mux
![[Pasted image 20250608182005.png]]

#### riesgos por dependecias RAW
- unidad de adelantamiento de datos (forwarding)
	- un bloque combinacional para detectar el riesgo
	- multiplexores para adelantar los datos
![[Pasted image 20250608182223.png]]
![[Pasted image 20250608182237.png]]
![[Pasted image 20250608182248.png]]
![[Pasted image 20250608182305.png]]
![[Pasted image 20250608182316.png]]
![[Pasted image 20250608182330.png]]
![[Pasted image 20250608182347.png]]

- riesgos de control
	- producido por las instrucciones de salto
	- la condicion de salto se determina en la etapa EXE
	- en la cuarta etapa MEM, se actualiza el PC con la direccion de salto efectiva
	- perdida de 3 ciclos en el caso que se cumpla la condicion
posible mejora puede ser adelantar el calculo de la direccion y condicion en la segunda etapa
![[Pasted image 20250608182504.png]]
![[Pasted image 20250608182540.png]]

que hacer con las siguientes instrucciones al salto condicional
- salto retardado, las instrucciones posteriores siempre se ejecutan
	- el compilador rellena con instrucciones validas los huecos del retardo
- esperar a que la direccion y condicion de salto esten definidas
- asumir que no se da la condicion de salto
	- en caso de error se vacia el pipeline
- reducir o adelantar el calculo de la direccion y condicion de salto
	- agrega logica adicional en etapa que realiza el calculo
	- posible adelantamiento de datos involucrados para el calculo de la condicion
- prediccion dinamica del salto
	- se ejecuta especulativamente, en caso de error se vacia el pipeline
	- implementacion basada en buffer de prediccion y/o maquinas de estado

![[Pasted image 20250608182828.png]]
![[Pasted image 20250608182834.png]]

# pipelining y paralelismo
- el pipelining explota el paralelismo a nivel instruccion (ILP - instruction-level paralelism)
- en el MIPS escalar con pipeline 
	- se trata de lograr que el CPI=1, es dificil debido a los riesgos
	- las instrucciones son "lanzadas" (launched) una por ciclo de reloj
- como mejora. replicar componentes del procesador para "lanzar" mas de una instruccion por ciclo de reloj (multiple issue)
	- posibilita CPI<1
	- multiple issue estatico
		- decisiones tomadas en compilacion. VLIW (very long instruction word)
	- multiple issue dinamico
		- decisiones tomadas durante la ejecucion: superescalares
