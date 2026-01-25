VHSIC (very high speed integrated circuit)
Hardware
Description
Language

- lenguaje de alto nivel para el modelado de cirtuitos
- alternativa al uso de esquematicos

### historia
- propuesto por el DoD de EEUU en 1980
- primera version en 1985
- estandarizado por IEEE en 1987
- primer exito: programa F-22 (1986-1993)
- revisiones: 1993, 2000, 2002, 2008

### comparacion con otros lenguajes
- similitudes
	- VHDL es un lenguaje estructurado
	- reutilizacion de modulos
	- portable
- diferencias
	- el paradigma es diferente: ==orientado a procesos
	- las sentencias no siempre son ejecutadas secuencialmente
	- en VHDL la info temporal es explicita
	- VHDL no se compila en un ejecutable, sino que se sintetiza en un circuito digital
![[Pasted image 20250529115522.png]]

## uso de VHDL
- documentar disenos
- especificar requerimientos
- simular
	- comprobar funcionalidad
	- detectar errores
- sintetizar
	- implementacion hardware del diseno

## ventajas
- lenguaje estandarizado
	- soporte gubernamental e industrial
	- portable
- permite el diseno modular y jerarquico
	- reusabilidad
- posee una metodologia de diseno
- admite diferentes modelos de abstraccion
	- nivel comportamental
	- RTL (register-transfer-level)
	- nivel logico o de compuertas

### descripcion de VHDL
![[Pasted image 20250529115718.png]]
==es conveniente describir VHDL en el nivel de abstraccion mas alto que sea sintetizable (RTL)==

### estructura de un diseno VHDL
- un diseno en VHDL cuenta con dos unidades de diseno obligatorias
	- entidad (ENTITY)
	- arquitectura (ARCHITECTURE)
![[Pasted image 20250529115835.png]]
## entidad y arquitectura
- una unidad hardware se visualiza como una caja negra
	- interfaz completamente definida
		- puertos(modo,tipo)
	- interior oculto
	- -> en VHDL "entity"
![[Pasted image 20250529115937.png]]

- descripcion del diseno
	- -> en VHDL "architecture"
![[Pasted image 20250529120243.png]]

### ports: puertos de una entidad
**ports=canales de comunicacion**
- un nombre que debe ser unico dentro de la entidad
- una lista de propiedades como:
	- la direccion del flujo de datos, entrada, salida, bidireccional y se conoce como MODO del puerto
	- los valores que puede tomar el puerto: '1', '0' o ('Z'), etc. los valores posibles dependen de lo que se denomina TIPO de senal
- los puertos son una clase especial de senales que adicionalmente al tipo de senal anade el modo

### tipos
- VHDL es un lenguaje fuertemente tipado
- todos los objetos poseen un tipo en la declaracion
- las asignaciones solo pueden hacerse entre objetos del mismo tipo
- los tipos predefinidos son:
	- escalares: integer, floating point, enumerated
	- compuestos: array, record
	- punteros: access
	- archios: file
- tipo ==Std_logic==: valor presente en un cable de un 1 bit
	- declarado en IEEE.standard_logic_1164
	- extension a bus: Std_logic_vector

### tipos basicos
- BIT: solo puede tomar valor de '0' o '1'. para modelar senales digitales
- BIT_VECTOR: array unidimensional (vector) de bits. para modelar buses
- INTEGER: tipo entero. usado como valor indice en lazos, constante o valores genericos
- BOOLEAN: tipo logico. puede tomar valor TRUE o FALSE
- REAL: tipo para numeros de coma flotante
- ENUMERATED: enumeracion. conjunto de valores definido por el usuario
	- ej **type** estados **is** (inicio, lento, rapido)

### tipo std_logic
- los 2 valores del tipo bit no alcanzan para modelar todos los estados de una senal digital en la realidad
- el paquete IEEE.standard_logic_1164 define el tipo std_logic; que representa todos los estados de una senal real

![[Pasted image 20250529120957.png]]

- para describir buses std_logic_vector(un array de std_logic)
- std_logic y std_logic_vector son estandares industriales
- todos los valores son validos en un simulador VHDL, sin embargo solo : '1', '0', 'Z', 'L', 'H' y '-' se reconocen para la sintesis
- en el paquete IEEE.standard_logic_1164 aparecen otros dos tipos: std_ulogic y std_ulogic_vector. son los mismos pero sin haber pasado por la funcion de resolucion
	- esta funcion decide cual debe ser el valor de la senal cuando tienen dos fuentes que le asignan valores distintos
	- por ej, si una fuente asigna un '1' y la otra un 'L', la funcion de resolucion dice que la senal se queda a '1'

### arrays
los vectores se pueden definir tanto en rangos ascendentes como descendentes
	signal a: bit_vector (0 to 3); -- rango ascendente
	signal b: bit_vector (3 downto 0); -- rango descendente a <= “0101”; b<=“0101”;
produce como resultado:
	a(0) = `0´; a(1) = `1´; a(2) = `0´; a(3) = `1´; b(0) = `1´; b(1) = `0´; b(2) = `1´; b(3) = `0´;
una manera rapida de asignar valores a los vectores son los aggregates
	`a <= ( 0 => '1', 1 => c and d, others => 'Z');

### ports: modos de un puerto
indican la direccion y si el puerto puede leerse o escribirse dentro de la entidad
- **IN** una senal que entra a la entidad y no sale. La senal puede ser leida pero no escrita
- **OUT** una senal que sale de la entidad y no es usada internamente. la senal no puede ser leida dentro de la entidad
- **BUFFER** una senal que sale de la entidad y tambien es realimentada dentro de la netidad. esta senal puede ser leida
- **INOUT** una senal que es bidireccional entrada/salida de la entidad

#### descripcion de entidad: ejemplo
![[Pasted image 20250529125526.png]]

### estructura de un diseno VHDL
 - una arquitecturaz en VHDL se compone de:
	 - parte declarativa
	 - cuerpo de la arquitectura
![[Pasted image 20250529131221.png]]


## senal (signal)
- modela un cable
- puede conectar puertos (E/S) de entidades y "construcciones basicas" dentro de la arquitectura
- se declara **en la parte declarativa de la arquitectura**
- **su asignacion (<=) no es inmediata**, solo tiene efecto cuando avanza el tiempo
	- signal idle: std_logic <= '0';

### fundamentos: conceptos de senal
- las senales permiten comunicacion entre procesos
- cada senal posee una historia. Los valores pasados, presente y futuros (previstos) se almacenaran en forma permanente
![[Pasted image 20250529131631.png]]

### fundamentos: tipos de retardo
- las senales posee dos tipos de retardo: **inercial** (por defecto) y **de transporte**
![[Pasted image 20250529131712.png]]

### operadores definidos
- logicos: and, or, not, xor y xnor
- relacionales: =, =/, < , <=, > y >=
- adicion: +, -< y & (concatenacion de vectores)
- multiplicativos: * , /, rem(resto) y mod (modulo)
- signos (unarios): +,-
- desplazamiento (bit_vector): sll, srl, sla, sra, rol, ror
- miscelaneos: abs, ** (exponenciacion), not

### diseno concurrente en VHDL
- VHDL soporta la nocion de "ejecucion concurrente"
- los metodos para describir la concurrencia dentro de una arquitectura son:
	- instanciaciones
	- asignaciones concurrentes
	- procesos. un proceso es un conjunto de sentencias secuenciales que se ejecutan segun el orden
- el orden relativo de procesos y asignaciones concurrentes dentro de una arquitectura no es relevante
- las senales se utilizan para controlar la activacion de los procesos

## construcciones basicas
![[Pasted image 20250529173045.png]]
- procesos
	- constituidos por instrucciones que se ejecutan y evaluan secuencialmente
	- ![[Pasted image 20250529173302.png]]
- sentencias concurrentes
	- en la arquitecture se encuentran fuera de los procesos y se evaluan concurrentemente(asignaciones concurrentes)
	- ![[Pasted image 20250529173335.png]]
- instanciaciones de componentes (otras entidades) -> diseno jerarquico
	- se evaluan concurrentemente
	- ![[Pasted image 20250529173407.png]]

## procesos: ejecucion
- semanticamente un proceso es un bucle infinito de instrucciones secuenciales
- el tiempo no avanza durante la ejecucion del proceso
- como avanza el tiempo si un proceso se activa?

instruccion wait
- **wait on** a,b(cambio en a o b)
- **wait for** retraso (un cierto tiempo)
- **wait until** condicion
![[Pasted image 20250529173542.png]]

lista de sensibilidad: conjunto de senales que activan el proceso cuando se produce un cambio en alguna de ellas

## procesos
- un proceso puede ser explicito o implicito
	- ![[Pasted image 20250529173648.png]]
- proceso implicito: la lista de sensibilidad se obtiene de la propia expresion:
	- ![[Pasted image 20250529173701.png]]
	- asignaciones concurrentes
	- instanciacion de componentes
- procesos explicitos: la lista de sensibilidad se declara explicitamente
	- ![[Pasted image 20250529173753.png]]

#### senales y procesos: ejemplo

![[Pasted image 20250529221559.png]]

### instrucciones concurrentes
![[Pasted image 20250529221730.png]]
==asignaciones concurrentes==
- una instruccion se ejecutra cuando cambia una de sus entradas
- la asignacion de los nuevos valores se realiza una vez ejecutadas todas las instrucciones cuyas entradas han cambiado
- si como consecuencia del nuevo valor cambia alguna de las entradas de otra instruccion, se ejecuta dicha instruccion

### asignaciones concurrentes
![[Pasted image 20250529221852.png]]
asignacion por ecuaciones booleanas
- x<=(a and not sel) or (b and sel) -> proceso implicito
asignacion condicionales de las senales:
- x<=a when sel='0' else
	- b; -> proceso implicito

### asignaciones condicionales
![[Pasted image 20250529222125.png]]
x<=when selc='1' else
	b when selb='1' else
		a; -> proceso implicito

![[Pasted image 20250529222157.png]]
with sel select
	x<=a when sel="00",
		b when sel="01",
		c when sel="10",
		d when others,
		-> procesos implicitos
la clausula others cubre todas las posibilidades que no son descritas


## instrucciones secuenciales
- las sentencias dentro de un proceso son evaluadas secuencialmente
- un proceso puede estar *activo* o *inactivo*
- tipicamente un proceso posee una lista de sensitibilidad: el proceso para a estar *activo* cuando cambia un valor de esta lista
- tambien puede tener una o varias sentencias wait, que hacen que el proceso pase a *inactivo*
- el tiempo avanza cuando el proceso pasa a inactivo
![[Pasted image 20250529222829.png]]


### sentencias secuenciales IF-THEN-ELSE
![[Pasted image 20250529223432.png]]
`process(selc, selb, a, b, c)`
`begin`
	`if(selc='1') then`
		`x<=c;`
	`elsif(selb='1') then`
		`x<=b;`
	`else`
		`x<=a;`
	`end fi;`
`end process;` -> proceso explicito

con prioridad: las condiciones son evaluadas en orden de arriba hacia abajo. La primera condicion TRUE hace que se evalue la instruccion asociada. Si todas las condiciones son falsas se evalua la instruccion asociada ELSE

### sentencias secuenciales CASE
![[Pasted image 20250529223734.png]]

process(sel, a, b, c, d)
begin
	case sel is
		when "00" =>
			x<=a;
		when "01" =>
			x<=b;
		when "10" =>
			x<=c;
		when others =>
			x<=d;
	end case;
end process;

las condiciones son evaluadas de una vez, sin prioridad. La clausula OTHERS sirve para evaluar los casos no especificados

### bucles secuenciales: LOOP

bucle infinito con instruccion de salida
[label_loop] loop
	sentencias secuenciales
end loop [label_loop];

bucle infinito con condicion
`while<condicion> loop`
	`sentencias secuenciales`
`end loop;`

bucle for iterativo
`for <identificador> in <rango> loop`
	`sentencias secuenciales`
`end loop`

## asignacion de senales: ejemplo
![[Pasted image 20250529225159.png]]

**ESTO ES INCORRECTO: cuando en='1', a x se le asigna el valor previo de c**
`library ieee;`
`use ieee.std_logic_1164.all;`

`entity mux2latch is`
	`port(a,b,sel,en: in std_logic; x: buffer std_logic);`
`end mux2latch;`

`architecture comp of mux2latch is`
`signal c:std_logic;`
`begin`
	`mux: process(a,b,sel,en)`
	`begin`
		`if(sel='0') then c<=a;`
		`else c<=b;`
		`end if;`

		`x<=(x and (not en)) or (c and en);`
	`end process;  --c cambia aqui`
`end comp;`

**CORRECTO:** proceso con sentencias secuenciales y una asignacion concurrente
cuando en='1', a x se le asigna el valor actualizado de c
#### solucion
`library ieee;`
`use ieee.std_logic_1164.all;`
`entity mux2latch is`
	`port(a,b,sel, en: in std_logic; x: buffer std_logic);`
`end mux2latch;`

`architecture comp of mux2latch is`
`signal c: std_logic;`
`begin`
	`mux: process(a,b,sel)`
	`begin`
		`if (sel='0') then c<=a;`
		`else c<=b;`
		`end if;`
	`end process; -- c cambia aqui`

	`x<=(x and (not en)) or (c and en);`
`end comp;`

## resumen: procesos y senales
- una arquitectura puede tener tantos procesos como queramos y todos se ejecutan en paralelo
- **los procesos se activan cuando alguna de las senales en su lista de sensibilidad cambia**
- **el tiempo no avanza durante su ejecucion**
- **el tiempo solo avanza cuando el proceso se suspende**
- **las senales modelan cables, y solo pueden cambiar de valor si el tiempo avanza**

### variables
- almacenamiento local de un dato temporal
- pueden ser de los mismo tipos de una senal (signal)
- **visible solo en el interior de un proceso**
- **se declara en el proceso**
- **su asignacion (:=) es inmediata**
	- variable idle: std_logic:='0';

### asignacion de senales: solucion con variable
**CORRECTO** la asignacion a la variable es inmediata
![[Pasted image 20250529230439.png]]
`architecture comp of mux2latch is`
`being`
	`mux: process(a,b,sel)`
		`variable c:std_logic;`
	`begin`
		`if(sel='0') then c:=a; --inmediato`
		`else c:=b;`
		`end if;`

		`x<=(x and (not en)) or (c and en);`
	`end process;`
`end comp`


## objetos disponibles en VHDL
**constante:** es una asociacion de un nombre a un determinado valor
	constant pi: real:=3.1416;

**variable**: es un almacenamiento local de un dato temporal visivle solo en el interior de un proceso. Su valor es modificado por una asignacion (:=)
	variable parada: std_logic :='0';

**senal** es la modelizacion de un cable, el cual puede conectar puertos (E/S) de entidades y tambien conectar procesos dentro de la arquitectura. Es una forma de onda que cambia con el tiempo, por lo que su asignacion (<=) no es inmediata, solo tiene efecto cuando avanza el tiempo
	signal parada: std_logic <='0';

## senales vs variables


|                | SENALES                                                        | VARIABLES                        |
| -------------- | -------------------------------------------------------------- | -------------------------------- |
| sintaxis       | destino<=fuente                                                | destino:=fuente                  |
| utilidad       | modelan nodos fisicos del circuito                             | representan almacenamiento local |
| visibilidad    | global (comunicacion entre procesos)                           | local (dentro del proceso)       |
| comportamiento | se actualizan cuando avanza el tiempo (se suspende el proceso) | se actualizan inmediatamente     |
### asignacion de senales en buses
signal tmp: std_logic_vector(7 downto 0);
todos los bits
	tmp<="10100011";
	tmp<=x"A3"; --> VHDL 93

un solo bit
	tmp(7)<='1'

un rango de bits
	tmp(3 down to 0)<="0011";

### uso correcto de las asignaciones a senales
agregador para compactar y hacer codigo mas rapido en simulacion
y<=others=>'0';
y<=('0','1', a xor b, a and b);
y<=(3=> a xor b, 1=>'1', 2=> '0', a and b);
y<= y(2 downto 0) & '0'


no usar bucles para inicializar senales
- **en vez de hacer:**
for i in 0 to 4 loop
	a(1)<='0';
end loop

- **hacer**
a<=others=>'0';

no usar bucles para desplazar datos
- **en vez de hacer**
for i in 3 downto 0 loop
	if (i/=0) then
		d(i)<=d(i-1);
	else
		d(i)<='0';
	end if;
end loop;

- **hacer**
d<=d(2 downto 0) & '0';

## niveles de abstraccion
![[Pasted image 20250529232821.png]]
- funcional o comportamental:
	- conjunto de instrucciones secuenciales
	- no se detallan relojes o retrasos
	- no siempre es sintetizable
- RTL (register transfer level):
	- es la entrada para la sintesis
	- las operaciones se realizan en un ciclo de reloj especifico
	- no se detallan retrasos
- logico o de puertas
	- es la salida de la sintesis
	- expresado en termino de ecuaciones logicas o puertas y elementos de una biblioteca (generica o especifica)
	- se incluye informacion de retraso para cada puerta

### RTL: register transfer level
- flujo de datos entre registros y bloques funcionales
	- ![[Pasted image 20250529233131.png]]
- tienen en cuenta el ciclo de reloj
- independiente de la tecnologia
- definicion del sistema en terminos de:
	- registros, logica combinacional y operaciones

### estilos de modelado: algoritmico
- descripciones similares a programas de software
- refleja funcionalidad del circuito mediante procesos concurrentes que poseen descripciones secuenciales del algoritmo

```
entity comparador is
	port(A, B:in bit; C: out bit);
end comparador;

architecture algoritmo of comparador is
begin
	process
	begin
		if(A=B) then C<='1';
		else C<='0';
		end if;

		wait on A,B;
	end process;
end algoritmo;
```

### estilos de modelado: flujo de datos
- descripciones basadas en expresiones y ecuaciones
- reflejan el flujo de informacion y las dependencias entre datos y operaciones

```
entity comparador is
	port(A, B:in bit; C:out bit);
end comparador;

architecture dataflow of comparador is
begin
	C<=(A and B) or (not(A) and not(B));
end algoritmo;

```


### estilos de modelado: estructural
- una unidad de alto nivel se divide en unidades nivel mas bajo
- descripcion que contiene los componentes y las conexiones entre los mismos

```
entity comparador is
	port(A, B: in bit; C:out bit);
end comparador;

architecture structural of comparador is
	component XOR2
		port(0: out bit;I1, I2: in bit);
	end component;

	component INV
		port(0: out bit; I: in bit);
	end component;
signal S:bit;


begin
	C C1: XOR port map(O=>S, I1=>A, I2=>B);
	C2: INV port map(C,S);
end algoritmo

```


### nivel abstraccion/estilo de modelado
![[Pasted image 20250529234026.png]]

### paquetes
- proveen una forma conveniente de almacenar y compartir info en un modelo
- se componen de:
	- declaracion(obligatorio)
		- declaraciones de tipos
		- declaraciones de subprogramas
	- cuerpo (opcional)
		- definiciones de subprogramas
- ejemplos: standard, textio

#### paquete: ejemplo
```
--- declaracion
LIBRARY IEEE;
USE IEEE.std_logic_1164.all;
PACKAGE filt_cmp IS
	TYPE state_type IS (idle, tap1, tap2, tap3, tap4);
	COMPONENT acc
		port(xh: in std_logic_vector(10 downto 0);
			clk, first: in std_logic;
			yn: out std_logic_vector(11 down to 4));
	END COMPONENT;

FUNCTION compare (SIGNAL a, b: integer) RETURN BOOLEAN;
END filt_cmp;

---declaracion---

---cuerpo---
PACKAGE BODY filt_cmp IS
FUNCTION compare(SIGNAL a, b:integer) RETURN boolean IS
VARIABLE temp: boolean;

begin
	if a<b then
		temp:=true;
	else
		temp:=false;
	end if;
	RETURN temp;

END compare;
END filt_cmp;


---cuerpo---
```



### librerias 
- contiene un paquete o una coleccion de paquetes
- libreria standar:
	- package STD:
		- bit, boolean, integer, real, time;
		- operadores para los tipos soportados
	- package TEXTIO:
		- funciones de archivos
- la libreria de trabajo (work) es en donde los modulos VHDL son compilados (o sintetizados)