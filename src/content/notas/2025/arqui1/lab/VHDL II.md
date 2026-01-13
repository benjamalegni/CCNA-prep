### circuitos basicos: Multiplexores
multiplexores por asignacion concurrente: simple, condicional y por seleccion
![[Pasted image 20250601221812.png]]
mulitiplexores usando sentencias secuenciales: if-then-else. con prioridad
![[Pasted image 20250601221855.png]]
multiplexores usando sentencias secuenciales: case. sin prioridad
![[Pasted image 20250601221915.png]]

### registros
- existen dos metodos para crear flip-flops
	- instanciacion del componente flip-glop desde una libreria
	- utilizar un proceso sensible al flanco de reloj
![[Pasted image 20250601221955.png]]

#### registro: instanciacion de componentes
ej flip-flop tipo D
![[Pasted image 20250601222021.png]]

#### registro: descripcion basada en proceso
![[Pasted image 20250601222048.png]]
==el sintetizador infiere que debe crear registro para la senal q basandose en:
- el elemento es unicamente sensible a la senal de reloj clock
- la expresion **clock' event and clock=1'** implica que la asignacion de la senal se realiza en el flanco de subida de reloj
- se sintetiza un elemento sincrono
- la especificacion incompleta de la sentencia IF-THEN por faltar la clausula ELSE implica que si la condicion **clock'event and clock='1'** no se satisface (no hay flanco de subida), q debe mantener su valor hasta la siguiente asinacion (memoria implicita)

#### ejemplos basicos de codificacion
![[Pasted image 20250601222404.png]]                                                                                  
![[Pasted image 20250601222414.png]]
![[Pasted image 20250601225405.png]]

### concepto de *driver* de una senal
- el *driver* es el elemento que da valores a una senal
- para cada senal que se le asigna un valor dentro de un proceso se crea un *driver* para esa senal
	- independientemente de cuentas veces se le asigne valor a una senal, se crea un unico *driver* por proceso
	- tanto para procesos explicitos como implicitos
	- cuando hay multiples *drivers* se usa una funcion de resolucion
![[Pasted image 20250601225542.png]]

### inferencia triestado
- cuando se quiere que un *driver* de la senal se quede en alto impedancia, se le asigna a la senal el valor 'Z'
	- es valido para el tipo std_logic
- igual que ocurre en la realidad, el estado de la senal lo fijara el *driver* que no este en alta impedancia
![[Pasted image 20250601230103.png]]

### ejemplos de inferencia de buffer triestado
- con asignacion condicional
	- ![[Pasted image 20250601230128.png]]
- con un proceso
	- ![[Pasted image 20250601230138.png]]

## diseno jerarquico
- componentes pequenos son utilizados por otros mas grandes
- es fundamental para la reutilizacion de codigo
- permite mezclar componentes creaos con distintos metodos de diseno: VHDL, verilog, esquematicos
- genera disenos mas legibles y mas portables
- necesario para estrategias de diseno *top-down* o *bottom-up*
![[Pasted image 20250601230302.png]]

### utilizacion de componentes
- antes de poder usar un componente, se debe declarar
	- especificar sus puertos (PORT)
	- especificar parametros(GENERIC)
- una vez instanciado el componente, los puertos de la instancia se conecta a las senales del circuito usando PORT MAP
- los parametros se especifican usando GENERIC MAP
- la declaracion de los componentes se puede hacer en un PACKAGE
	- para declarar el componente, solo hablar que importar el PACKAGE
	- la declaracion de los componentes no aporta nada al lector

#### ejemplo de diseno jerarquico: top-level
![[Pasted image 20250601230447.png]]

#### ejemplo de diseno jerarquico: componente inferior
![[Pasted image 20250601230742.png]]

### instanciacion repetitiva y condicional: GENERATE
- la instruccion GENERATE permite generar codigo iterativamente o condicionalmente
- generacion iterativa: ideal para circuitos repetitivos como arreglos de componentes
	- ![[Pasted image 20250601230827.png]]
- generacion condicional: menos usada, por ejempo para el primer elemento de un arreglo
	- ![[Pasted image 20250601230852.png]]

#### ejemplo de estrucutra repetitiva
conversor serie paralelo de 32 bits
![[Pasted image 20250601231302.png]]

#### ejemplo: solucion con GENERATE
![[Pasted image 20250601231316.png]]

### configuracion
- una configuracion es ==una unidad de diseno==
- se usan para realizar asociaciones dentro de los modelos
	- asociar entidad con arquitectura
	- en la instanciacion de un componente asociarlo a una entidad y arquitectura
- muy utilizados en entornos de simulacion: una manera rapida y flexible de probar distintas alternativas de diseno
- limitada o no soportada en entorno de sintesis
![[Pasted image 20250601231442.png]]

aplicandolo a un componente en particular: *for* nombre_instancia: nom_comp *use* ...
aplicandolo a todas las instancias: *for all*: nom_comp *use entity* work.nom_entidad (nom_arq)

### configuracion: ejemplo
![[Pasted image 20250601231841.png]]


### metodologia: diseno de circuitos secuenciales
![[Pasted image 20250601232544.png]]
maquinas de estados: FSM
- utilizacion de subtipos
	- definicion de estados
- tres bloques funcionales
	- logica combinacional: decision de cambio de estado
	- registros; mantienen el estado
	- logica combinacional: definicion de salidas

definicion de estados:
![[Pasted image 20250601232744.png]]

logica combinacional: decision de cambio de estado y definicion de salidas
![[Pasted image 20250601232810.png]]

registros: mantienen el estado
![[Pasted image 20250601232827.png]]

### FSM : maquinas de moore
- FSM MOORE: una maquina de estados en la que las salidas cambian solo cuando cambia el estado
- las salidas son decodificadas a partir del valor de los estados
![[Pasted image 20250601232908.png]]

#### ejemplo: generador "wait states"
![[Pasted image 20250601232933.png]]

#### ejemplo: declaracion de la entidad
![[Pasted image 20250601233014.png]]
la declaracion de entidad es la misma para todas la implementaciones

#### ejemplo solucion 1
salidas combinacionales decodificadas a partir de los estados
![[Pasted image 20250601233147.png]]
![[Pasted image 20250601233155.png]]

#### ejemplo solucion 2
salidas registradas decodificadas desde el valor de los estados
![[Pasted image 20250601233242.png]]
![[Pasted image 20250601233252.png]]

### FSM de mealy
- las salidas cambian por un cambio de estado o por un cambio en el valor de las entradas
	- hay que tener mucho cuidado con las entradas asincronas![[Pasted image 20250601233333.png]]

#### ejemplo: generador "wait states"
![[Pasted image 20250601233356.png]]

#### ejemplo: solucion
![[Pasted image 20250601233419.png]]
![[Pasted image 20250601233426.png]]


### verificacino con TestBenches
- un diseno sin verificacion no esta completo:
	- existen muchas maneras de verificar, la ma utilizada es el banco de pruebas: TestBench
- simular basicamente es:
	- generar estimulos
	- observar resultados
- un TestBench es un codigo VHDL que automatiza estas dos operaciones
- los TestBenches no se sintetizan
	- se puede utilizar un VHDL algoritmico
	- usualmente con algoritmos secuenciales

### como hacer un TestBench?
- instanciar el diseno que vamos a verificar
	- el testbench sera el nuevo top-level
	- sera una entidad sin ports
- escribir el codigo que:
	- genera los estimulos
	- observa los resultados
	- informa al usuario
![[Pasted image 20250601233631.png]]

#### instanciando la unidad bajo test (UUT)
![[Pasted image 20250601233813.png]]

### generando estimulos
- dar valores a las senales que van hacia las entradas de la UUT
- en sintesis no tiene sentido el tiempo
	- en los testbench el tiempo es el concepto principal
- asignacion concurrente
	- ![[Pasted image 20250601233859.png]]
- asignacion secuencial
	- ![[Pasted image 20250601233914.png]]

### observando senales con Assert
- assert se usa para comprobar si se cumple una condicion: equivalente al IF (not condicion)
	- ![[Pasted image 20250601233955.png]]
- tras report se anade una cadena de texto que se muestra si no se cumple la condicion
- severity puede tener 4 niveles
	- NOTE
	- WARNING
	- ERROR (nivel por defecto sino se incluye severity)
	- FAILURE

### algoritmo basico para los testbenches
algoritmo elemental de verificacion:
- dar valores a las senales de entrada a la UUT
- esperar con *wait for*
- comprobar los resultados con *assert*
- volver a dar valores a las senales de entrada a la UUT
- y repetir...

#### ej de codigo
![[Pasted image 20250601234225.png]]

### procedimientos
- VHDL permite definir procedimientos (subrutinas)
	- ![[Pasted image 20250601234248.png]]
- la clase de los parametros pueden ser: variable, constant, signal
- la direccion: in, inout, out
- los procedimientos se pueden declarar en la arquitectura o en un proceso, y se llaman desde un proceso o concurrentemente
interesante para encapsular tareas repetitivas en la simulacion

ejemplo:
![[Pasted image 20250601234402.png]]

### acceso a archivos
- las simulaciones mas potentes trabajan sobre archivos
	- simulacion de un multiplicador que escribe los resultados en un archivo de texto
	- testbench para un microprocesador que lee un programa ensamblador de un archivo, lo ensambla y lo ejecuta
- acceso basico: std.textio
	- archivos de texto
	- acceso linea a linea: readline y writeline
	- dentro de una linea los campos se procesan con: read y write
- acceso especifico para std_logic: ieee.std_logic_textio

#### instrucciones para acceder a archivos
![[Pasted image 20250601234635.png]]