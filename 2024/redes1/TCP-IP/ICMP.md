INTERNET CONTROL MESSAGE PROTOCOL - PROTOCOLO DE CONTROL DE MENSAJES DE INTERNET

- los hosts y routers lo utilizan para intercambiar info acerca de la capa de red
- encapsulado en IP (protocolo =1), parte necesaria de toda implementacion IP
- funciones
	- chequeo de conectividad (ping, traceroute)
	- info al origen sobre errores producidos por un datagram enviado
	- autoconfiguracion de equipos
- no se generan paquetes ICMP sobre
	- condiciones de error producidas por ICMP
	- datagrams multicast o broadcast
	- fragmentos de datagrams IP, excepto el primero

### formato
![[Pasted image 20241008115114.png]]
- tipo: identifica el tipo de mensaje
- codigo: info adicional, dependiendo del tipo
- checksum: solo para ICMP, calculado como en IP

##### tipos:
	0: Echo reply
	3: Destination Unreachable
	4: Source Quench
	5: Redirect
	8: Echo Request
	11:Time Exceeded
	12:Parameter Problem
	13:Timestamp Request
	14:Timestamp Reply
	15:Information Request (obsoleto)
	16:Information Reply (obsoleto)
	17:Address Mask Request
	18:Address Mask Reply

#### echo request y reply (tipos 8 y 0)
- un equipo envia un request: el destino envia el reply con los mismos datos
- se comprueba el funcionamiento del destino y nodos intermedios
- campos identificador y secuencia, para uso del emisor, se devuelven iguales
- codigo = 0
- utilizado por ping
![[Pasted image 20241008115613.png]]

#### destination unreachable (tipo 3)
- enviado por un router o host (destino) que no puede entregar el datagram
- codigos 0 a 5

#### time exceeded (tipo 11)
- enviados por un router si TTL llega a 0
- codigos 0 a 1
![[Pasted image 20241008115629.png]]
![[Pasted image 20241008115651.png]]
