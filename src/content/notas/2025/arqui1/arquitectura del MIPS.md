repasar:
- clase: intro arqui de MIPs en intro arqui de sistemas
conceptos requeridos
- principios de diseno
- juego de instrucciones
- formato de memoria y registros internos
- modos de direccionamiento

#### repaso
- procesador MIPS (microprocessor without interlocked pipeline stages)
- 32 registros de uso general: $0..$31 (excepto el $0=0)
- datos, memoria e instrucciones de 32 bits
- memoria de datos y programa separados (Harvard)
- memoria con 2^30 palabras de 32 bits (2^32 bytes)
- dos intrucciones para accesos a memorias
	- load (carga el contenido de memoria a un registro)
	- store (carga el contenido de un registro a la memoria)
- existen instrucciones que transfieren datos desde memoria de datos y registros internos: load y store
- cada byte posee su direccion
- tamano de memorias es de 2^30 palabras de 32 bits (4 bytes) o 2^32 bytes
- la memoria de programa se accede por palabras. Direccionando bytes cuya direccion es multiplo de 4
	- ![[Pasted image 20250602071115.png]]

### repertorio de instrucciones
conjunto de intrucciones del MIPS (32 bits)
- tres formatos de instrucciones
![[Pasted image 20250602071158.png]]

tipo-R
![[Pasted image 20250602071220.png]]

op:codigo de operacion
rd: identificador de registro destino
rt y rs: identificador de registros fuentes
shamt: desplazamiento deseado
funct: seleccion de funcion asociada
![[Pasted image 20250602071309.png]]
![[Pasted image 20250602071323.png]]

tipo-I
![[Pasted image 20250602071336.png]]
op:codigo de operacion
rt: identificador de registro destino
rs: identificador de registros fuente
inmediate: dato inmediato 16 bits
![[Pasted image 20250602071418.png]]
![[Pasted image 20250602071429.png]]![[Pasted image 20250602071542.png]]
![[Pasted image 20250602071558.png]]

tipo-j
![[Pasted image 20250602071608.png]]
op: codigo de operacion
target address: direccion de destino de salto
![[Pasted image 20250602071626.png]]
![[Pasted image 20250602071637.png]]

### repaso
 - 5 modos de direccionamiento
	 - mediante registros
		 - tipo-R ej: add, sub, and...
	- inmediato
		- tipo-I: ej: addi, subi, andi...
	- mediante registro base
		- tipo-I. ej: lw y sw
	- relativo a PC
		- tipo-I. ej: beq, bne
	- pseudo directo
		- tipo-J. ej: j, jal
![[Pasted image 20250602071830.png]]


### diseno del microprocesador MIPS
- microprocesador de 32 bits de un ciclo
	- tambien llamado uniciclo o combinacional
	- cada instruccion se ejecuta en un ciclo de reloj
- se disenara para las siguientes instrucciones
	- referencias a memorias: lw y sw
	- aritmeticas-logicas de tipo-R: add, sub, and, slt, ...
	- saltos: beq y j
- ejecucion RTL (register transfer level) de una instruccion
	- ![[Pasted image 20250602072003.png]]
- para todas las intrucciones los 2 primeros pasos son los mismos:
	- obtener la instruccion desde la memoria y actualizar el PC
	- leer uno o dos registros
- el resto de los pasos depende de la instruccion a ejecutar
- todas usan de alguna manera la ALU
	- referencia a memoria: calculo de direccion de acceso
	- aritmeticas-logicas: segun campo funct de la instruccion
	- saltos: para determinar condicion
- vista a muy alto nivel
	- ![[Pasted image 20250602072208.png]]
	- ![[Pasted image 20250602072214.png]]
	- ![[Pasted image 20250602072221.png]]
	- ![[Pasted image 20250602072228.png]]
	- ![[Pasted image 20250602072303.png]]
	- ![[Pasted image 20250602073300.png]]
	- ![[Pasted image 20250602073312.png]]
	- ![[Pasted image 20250602073320.png]]
	- ![[Pasted image 20250602073329.png]]
	- ![[Pasted image 20250602073337.png]]
	- ![[Pasted image 20250602073346.png]]
- control de la ALU
	- ![[Pasted image 20250602074259.png]]  