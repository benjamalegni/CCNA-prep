![[Pasted image 20241103230634.png]]
- definido para las ethernet de 10mbps, half duplex
- su tamano minimo dependia de la longitud maxima de la red(2500mts) a causa del protoloco CSMA/CD
- se conserva debido a razones de compatibilidad

PRE(preambulo):
- 7 bytes 10101010 (duracion 5,6 microseg): sincronizacion de clock
SF(delimitador de frame):
- 1 byte 10101011, sincronizacion a frame
Direcciones (6bytes)
- asignadas(globales) por la IEEE
- registradas por hardware en la placa
	- grupos:
		- unicast: una sola placa (1er bit en 0)(origen, destino)
		- multicast: grupo logico de placas (1er bit en 1)(destino)
		- broadcast: todas las placas (todos los bits en 1)(destino)
	- administracion:
		- significado local (solo en la red): segundo bit en 1
		- significado global: segundo bit en 0
![[Pasted image 20241103231043.png]]

L/T:
- cantidad de bytes en el campo de datos (0 a 1500)(IEEE 802.3)
- tipo de protoloco encapsulado en el frame (ethernet)
datos:
- datos del nivel superior(LLC si IEEE 802.3)
pad:
- campo de relleno para lograr el tamano minimo permitido para un frame (64 bytes desde direccion de origen hasta FCS inclusive)
FCS:
- codigo ciclico que cubre desde direccion de destino hasta PAD inclusive



## preservacion del formato y longitudes minima y maxima del frame ethernet
se han mantenido desde la ethernet de 10mb hasta la actualidad
objetivo: mantener la compatibilidad hacia atras(backward compatibility)

ethernet 10mbps (solo half duplex)
fast ethernet (half y full duplex, reduce distancia)
gigabit ethernet (half y full, reduce distancia -> frame extension, bursting)
actualmente no se contempla half duplex
![[Pasted image 20241103231611.png]]


## longitud minima del frame ethernet
![[Pasted image 20241103231646.png]]

CSMA/CD contempla que los frames colisionen y se pierdan en el canal (la placa ethernet debe reintentar y solucionar el problema)
un equipo descarta un frame inmediatamente al terminar de enviarlo
un equipo que transmite un frame, debe saber que no sufrio colision antes de descartarlo. por lo tanto, la transmision de un frame debe durar al menos 2*dp

**ethernet original**:
Vt=10mbps
2dp = 51,2 microseg (incluido segmentos, repetidores, etc)
por lo tanto, el tiempo de transmision de un frame debe ser mayor o igual a 51,2 microsegundos

tiempo_transm = long_frame/Vt
long_frame = tiempo_transm * Vt
long_frame = 0,0000512 seg * 10000000 bits/seg = 512 bits = 64 bytes


## longitud maxima del frame ethernet (jumboframes)
- frames ethernet con longitud maxima de 9000 bytes (puede haber mayores)
- utilizados a partir de 1 gbps
- no son parte de la norma IEEE 802
- incrementan la eficiencia en la red
	- menor overhead en el canal
	- proceso mas eficiente (GSO?)
- aumentan la latencia (demora de acceso al medio)
- no todos los switches o placas ethernet lo soportan
- alternativa a jumboframes: GSO (*generic fragmentation offload*)
	- el SO genera frames de mayor longirud que el MTU
	- la placa ethernet fragmenta

![[Pasted image 20241103232310.png]]

## MAC control(ethernet full duplex)
- funcion agregada al MAC, transparente al resto del protocolo
- funcion PAUSE(codigo 1)
	- permite a una estacion indicar a la otra que pause su transmision
	- frames ethernet con direccion multicast especial(PAUSE)
	- tiempo expresado en multiplos de tiempo de transmision de 512 bits
![[Pasted image 20241103232422.png]]

# autonegociacion
- proceso standard que permite la configuracion automatica de dispositivos ethernet
- no es visible al operador de la red
- los dispositivos seleccionan el modo de operacion mas eficiente en aspectos
	- velocidad
	- modo half o full duplex
	- uso de mac control
- caracteristicas
	- senalizacion propia
	- utilizada solo en vinculos punto a punto
	- se realiza solo al comienzo de la operacion del link
- operacion
	- cada dispositivo anuncia sus capaciades para cada caracteristica a negociar
	- se elige la comun de mayor prioridad (p.ej 100mbps y 10mbps)
	- no chequea cable, puede requerir configuracion manual