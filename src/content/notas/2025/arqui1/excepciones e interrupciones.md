# excepciones
tanto las excepciones como las interrupciones provocan *riesgos de control* 
- cambian el flujo normal de ejecucion
muchas arquis/autores no distinguen entre excepciones o interrupciones y son tratadas de igual manera

**en MIPS:**
- excepcion: cambio inesperado en el flujo de control sin *sin distinguir si la causa es interna o externa*
	- ex: instruccion no definida, invocacion al OS, fall del hardware
- interrupcion: *evento externo*
	- ex: requerimiento de entrada/salida, falla de hardware

## tratamiento de excepciones en MIPS
cuando ocurre una excepcion:
1. el PC de la instruccion que causo la excepcion se debe almacenar eln EPC (exception PC)
2. transfiere el control al OS
3. el OS realiza alguna de estas acciones
	- provee un servicio de atencion a la excepcion
	- realiza una accion predefinida
	- detiene la ejecucion del programa y reporta el error
4. el programa puede o no continuar su ejecucion
![[Pasted image 20250801161056.png]]

## trat. de excp (sistema op)
es necesario conocer la causa de la excepcion para su tratamiento
dos metodos:
- incluir registro de estados (**cause register**)
	- utilizado en MIPS. el OS debe decodificar el reg para su tratamiento
- interrupciones vectorizadas
	- el OS conoce la causa de la excepcion por su direccion
	- cada direccion separada por 8 instrucciones para su tratamiento
![[Pasted image 20250801161431.png]]

## trat. de excp (hardware)
forzar a que la proxima instruccion del pipeline sea la de la rutina de tratameinto de instrucciones

hacer un flush del pipeline de las instrucciones posteriores
- las insts cargadas previamente pueden continuar su ejecucion

luego del tratamiento de la excp, restaurar el PC, en caso que sea posible

## hardware adicional para soporte de excepciones
- EPC: reg de 32 bits utilizado para contener la direcc. de la inst afectada
- causa: reg utilizado que indica la causa de la excp. el MIPS este reg es de 32 bits, aunque algunos bits no se utilizan
- senales de control de write de causa y EPC
- capacidad de write de direccion de excp en PC
- capacidad de deshacer PC=PC+4 debido a que *EPC apunta a su sucesora*
- realizar un flush del pipeline

## modificacion del pipeline para el soporte de excp
![[Pasted image 20250801161955.png]]
![[Pasted image 20250801162020.png]]
![[Pasted image 20250801162029.png]]
![[Pasted image 20250801162035.png]]