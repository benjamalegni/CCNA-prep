
### procesos que se comunican
proceso: es un programa coriendo en un computador
def.
	proceso cliente: proceso que inicia la comunicacion
	proceso servidor: proceso que espera ser contactado

nota: en aplicaciones con arquitectura P2P un mismo proceso actua como cliente y servidor

- dentro de la maquina 2 procesos se comunican usando **comunicacion entre procesos** (definida por sistema operativo)
- procesos en diferentes hosts se comunican via intercambio de mensajes

### sockets
![[Pasted image 20250604161811.png]]
- un proceso envia/recibe mensajes a/desde su **socket**
- socket es un punto de comunicacion entre 2 partes (analogo a una puerta)
	- proceso transmisor envia mensajes por un socket
	- proceso transmisor confia en la infrastructura de transporte al otro lado de la puerta, la cual lleva los mensajes al socket en el proceso receptor
- API: interfaz de programacion de aplicaciones: los lensajes ofrecen mecanismos para comunicarse con el sistema operativo y la capa de transporte


### direccionamiento de procesos
- para que un proceso reciba un mensaje, este debe tener una forma para identificarlo (diferenciarlo)
- un terminal/host tiene al menos una direccion IP unica de 32 bits
- Q: es suficiente la direccion IP para identificar un proceso en un host?
- respuesta: no, mucho procesos pueden estar corriendo en el mismo host
- el identificar del proceso incluye la direccion IP y un numero de puerto (port) asociado con el proceso en el host. este numero es positivo y de 16 bits
- ejemplo de numero de puerto: 
	- servidor HTTP(web): 80
	- servidor de mail: 25

### viendo las conexiones de nuestra maquina
- en linus y windows netstat (network statistic)
	- netstat -t para ver conexiones TCP
	- netstat -u para ver conexiones UDP
- hasta aqui sabemos
	- relacion entre aplicacion y proceso
	- necesidad de los puertos
	- mecanismo de software usado para pedir servicios a capa transporte
- ahora estudiaremos algunos protocolos

