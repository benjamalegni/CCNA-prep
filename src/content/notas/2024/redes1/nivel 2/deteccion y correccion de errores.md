### objetivos
- detectar errores: impide que datos erroneos sean procesados por las aplicaciones
- corregir errores: permite que las aplicaciones puedan disponer de los datos necesarios

### tipos de errores
- uno o mas bits erroneos dentro de un frame
- frames perdidos
- frames duplicados

### aspectos
- deteccion
- recuperacion

# tecnicas para la deteccion de errores
- codificacion de redundancia
	- para deteccion
	- para correccion
![[Pasted image 20241017094111.png]]

- retransmision 
![[Pasted image 20241017094152.png]]

- tratamiento de errores
	- casos extremos
		- solo redundancia: codigo autocorrector
		- solo retransmision: (comparacion) eco en una terminal
	- uno normal: redundancia para deteccion y retransmision para correccion

## control de errores por redundancia
- codigos correctores de errores
	- usos
		- imposibilidad de retransmision
		- retransmision muy costosa
		- errores persistentes
	- utilizados en 802.11, GSM, Wimax, Ethernet 10GB
- codigos detectores de errores
	- bit de paridad
		- baja capacidad de deteccion
		- utilizados en hardware por cada byte (transmision asincronica)
	- codigos ciclicos 
		- implementacion en hardware y software
		- muy eficientes
		- buena capacidad de deteccion de errores
		- utilizados en Ethernet 802.11, HDLC, etc
	- checksum IP
		- muy simple y rapido (aritmetica modulo 1)
		- incremental
		- indiferente al orden de los bytes en palabras
		- puede realizarse en paralelo
		- capacidad de deteccion limitada
		- utilizado en los niveles IP y transporte de la arquitectura TCP/IP, (IP, ICMP, UDP, TCP)

## checksum IP
![[Pasted image 20241017094856.png]]

- generacion de checksum
	- agrupar los bytes en grupos de a 2 (16 bits). si hay un numero impar rellenar con 0
	- poner campo checksum en cero
	- suma modulo 1 de los grupos de 16 bits
	- complementar a 1 el resultado y colocarlo en el campo checksum
- chequeo de checksum
	- sumar el complemento a 1 la totalidad de grupos de 16 bits (incluido checksum)
	- si el resultado el todos 1, el resultado es correcto
- calculo incremental para cambio de un grupo de 16 bits (de valor_anterior a valor_nuevo)
	- nuevo_CHK= ~(~CHK_anterior + ~valor_anterior + nuevo_valor)

### uso de redundancia en algunos protocolos
![[Pasted image 20241017095201.png]]
![[Pasted image 20241017095223.png]]

### control de errores-retransmision
mecanismo basado en un acuerdo entre emisor y el receptor, para que el primero reenvie ciertos frames

- combinacion de retransmision y deteccion de errores por redundancia
	- elementos necesarios
		- generacion y chequeo de redundancia
		- indicacion del receptor respecto a reenvio
		- timers en el emisor
		- indentificacion de bloques
	- aspectos
	- cuando reenviar
		- receptor enviar OK
		- receptor enviar OK y NAKs
		- vencimiento de timer
	- cuantos bloques reenviar
		- depende del mecanismo de control de flujo utilizado
![[Pasted image 20241017095540.png]]