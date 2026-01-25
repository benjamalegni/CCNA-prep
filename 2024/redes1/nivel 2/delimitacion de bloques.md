permite distinguir grupos de bits (frames) que son tratador como una unidad a nivel 2
alternativas:

- delimitacion por caracteres
	- se indica comienzo y fin de frame con un caracter -delimitador-
	- mecanismo de insercion de caracter (character stuffing). permite enviar el caracter delimitador como info
- delimitacion por secuencia de bits
	- se indica comienzo y fin de frame con una secuencia de bits -delimitador-
	- mecanismo de insercion de bits (bit stuffing): permite enviar como dato la secuencia de bits de delimitacion
- delimitacion por senales especiales (violacion de codigo)
	- se indica comienzo y fin de frame con senales que no son ni cero ni uno
	- es necesario que el metodo de codificacion de bits en senales lo permita
- delimitacion por cuenta de caracteres
	- se destina un campo en el frame para indicar la longitud del mismo
	- solo se usa como complemento de los metodos anteriores
	- se arrastra la perdida de sincronismo en frames consecutivos

## por caracteres
utilizado por PPP en lineas asincronicas
overhead significativo
utilizacion de caracteres de transparencia y delimitadores

==delimitador: 7E==
==relleno: 7D==

procedimiento en el emisor:
- comienzo del frame: insertar caracter delimitador (0x7E)
- dentro del frame: para todo caracter "C" igual a 0x7E o 0x7D
	- -> insertar caracter de transparencia 0x7D
	- -> reemplazar caracter "C" por "C" XOR 0x20
- fin del frame: agregar caracter delimitador (0x7E)

procedimiento en el receptor:
- recibe caracter 0x7E: lo considera delimitador
	- si esta recibiendo frame , delimitador de fila
	- si no esta recibiendo frame, delimitador de comienzo
- dentro del frame, recibe caracter 0x7D
	- elimina el caracter (0x7D)
	- toma como dato, el siguiente caracter XOR 0x20
![[Pasted image 20241016235954.png]]

## por bits
- utilizado por PPP en lineas sincronicas
- bajo overhead
- eficiente (implementado en hardware)
- delimitacion de bloque. flag 01111110
- transparencia: mecanismo de insercion de ceros
- emisor: cuando detecta 5 unos seguidos, inserta cero
- receptor: cuando detecta cinco unos seguidos, si el siguiente es cero, lo elimina
![[Pasted image 20241017001050.png]]

## por senales especiales
violacion de codigo:
- aplicable en los casos en que la codificacion de bits en senales contiene redundancia (p.ej. Manchester en Ethernet de 10Mbps)
- se utilizan estados distintos a bits 0 o bit 1 como caracteres de control
![[Pasted image 20241017001253.png]]
## por cuenta de caracteres
dentro de la info se envia el largo del frame
perdida de sincronismo en vinculos propensos a errores
poco utilizado en nivel 2
![[Pasted image 20241017001345.png]]