(address resolution protocol)

## direccion fisica o MAC
- MAC(media access control)
- es un numero asignado a cada tarjeta de red
- 48 bits
	- 24 bits asignados por la IEEE al fabricante (OUI, organizationally unique identifier)
	- 24 bits asignados por el fabricante como numero de serie
- en la mayoria de los casos no se necesita conocerla, salvo para hacer filtrado en redes wireless por dir MAC
- comandos en Windows: IPCONFIG /ALL y GETMAC
- comandos en linus: ip address y if config
- ej MAC:  **00:1a:64:74:e0:9d**

### relacion de IP con la red fisica
- se ocupa de especificar de que manera correr IP sobre las diferentes tecnologias de red
- tratados en los RFCs (ip over...) por ej "ip over Ethernet"

- aspectos mas importantes a considerar
	- encapsulacion de datagrams IP en frames de la red
		- por ej, IP en Ethernet
	- resolucion de direcciones (mapeo de direcciones IP en direcciones de la red)
		- procedimiento que asocia una direccion IP a una direccion de la red fisica
		- deben ser metodos escalables (la red pueden crecer en numero de equipos)
		- deben presentar flexibilidad (las asociaciones pueden cambiar)
	- mapeo de direcciones Multicast y Broadcast en la subred
		- por ej:  **-  IP 255.255.255.255 a MAC FF:FF:FF:FF:FF:FF**

- tipos de protocolos involucrados
	- IP (tipo 800 hex): el datagram IP es la info que queremos encapsular en el flame Ethernet para que llegue al equipo de destino en la red Ethernet
	- ARP (tipo 806 hex): es el protocolo que se encarga de asociar las direcciones IP con las direcciones Ethernet
- encapsulacion
	- el datagram IP se coloca como la parte de datos del frame Ethernet
	- se utiliza relleno (PAD) para lograr la longitud minima del frame ethernet
- mapping o resolucion de direcciones (IP/Ethernet)
	- a traves del protocolo ARP
- mapeo de direcciones especiales IP
	- broadcast limitado de IP (255.255.255.255) en broadcast Ethernet (FF.FF.FF.FF.FF.FF)
	- direccion no especifica IP (0.0.0.0) se utiliza la direccion Ethernet (MAC) de la placa

## MAC a IP (ARP)
- ARP (address resolution protocol) tiene como mision precisamente traducir la direccion IP de una maquina a la direccion fisica del adaptador de red
- internet esta basado en direcciones IP
- ethernet esta basado en direcciones MAC
![[Pasted image 20241008113728.png]]

### funcionamiento
- un equipo envia un ARP request en broadcast preguntando por la direccion fisica de una determinada IP
- le responde el equipo que tiene esa IP con un ARP reply que le informa la direccion fisica
- debido a que enviar ARP request/reply para cada paquete IP introduce demasiado overhead, cada host mantiene una tabla ARP donde cada entrada expira despues de 20 minutos

#### formato paquete ARP
![[Pasted image 20241008113949.png]]
### tablas ARP
por cada interfaz del router se construye una tabla ARP (adress resolution protocol), la cual contiene info que asocia una direccion hardware (Ethernet mac) con una determinada direccion IP
![[Pasted image 20241008114053.png]]

### comandos ARP
**arping:** envia ARP requests (man arping)
**arp:** permite consultar y/o modificar el estado de la tabla ARP del equipo (man arp)
**ip neigh:** similar a arp pero actualizado (man ip-neigh)

# resumen ARP
surge como necesidad en las primeras redes Ethernet (broadcast multiple acceso)
- una maquina conoce:
	- su direccion IP (por ej almacenada en disco)
	- su direccion de hardware (grabada en placa Ethernet)
	- la direccion IP del equipo a quien desea enviar un datagram
	- para poder enviar el datagram debe encapsularse en un frame ethernet, es decir, necesita conocer la direccion de hardware del equipo destino
	- lo resuelve a traves del protocolo ARP
- caracteristicas del medioambiente para ARP
	- direcciones de subred en hardware, de mayor longitud que las direcciones IP
	- redes dinamicas, los equipos se conectan y desconectan y cambiar sus direcciones (placas) de subred
- los mappings ARP (IP/MAC) en cada equipo se almacenan en una tabla dinamica para no generar frames ARP cada vez que se necesita un mapping
	- las entradas se eliminan luego de un cierto tiempo
	- pueden utilizarse los ARP request (broadcast) para generar entradas en las tablas para las direcciones origen
	- gratuitous ARP (ARP preguntando por su propia direccion): permite determinar direcciones IP duplicadas (DAD)
- permite que los hosts actualicen sus tablar ARP
	- control de envio de ARP request (timers y reintentos)