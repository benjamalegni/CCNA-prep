### caracteristicas principales
- estructura simple
- bajo costo
- soporta todo tipo de aplicaciones
- compatibilidad con versiones anteriores
	- a nivel red(cableado, protocolo)
	- a nivel OS
- en el ambito LAN
	- utilizada en el desktop y en el backbone
	- compatible con wifi
- integracion LAN-MAN(metroEthernet)-WAN (10gb y mayores velocidades)


# topologias
![[Pasted image 20241103225205.png]]


# hubs, bridges, switches, routers
- hub
	- opera a nivel fisico del modelo ISO
	- permite pasar de topologias bus a centralizadas(star), facilitando deteccion de fallas
	- solo replica la senal recibida por un port en todos los demas
- bridge
	- opera a nivel MAC(analiza los frames ethernet)
	- representan el pas de la Ethernet tradicional a la Ethernet switcheada
	- posibilita separar dominios de colision
	- permite crear topologias redundantes (resistentes a fallas) (STP: spanning tree protocol)
	- permiten crear diferentes redes ethernet "logicas" independientes sobre un unico soporte de cableado (VLANs)
- switch
	- basicamente es un bridge con mas recursos (ports, CPU, RAM, etc)
	- agregan funciones a nivel MAC(ethernet)
	- muchos switches agregan funciones de niveles superiores (IP y TCP)


## ethernet half y full duplex
- half duplex (uso de CSMA/CD)
	- actualmente no utilizado
	- solo un equipo puede usar el canal en un momento dado, de lo contrario hay colision (existen dominios de colision)
	- usado en redes soportadas por coacil, hub y los primeros switches
- full duplex (no usa CSMA/CD)
	- solo en los medios que soportan transmision bidireccional simultanea
	- hay solo dos estaciones en un segmento de la LAN
	- las dos estaciones pueden operar en full duplex (enviar y recibir al mismo tiempo)
	- se requiere un control de flujo para que un equipo no sature al otro (MAC control)


# dominio de colision y dominio broadcast
- dominio de colision (DC)
	- parte de la red en que la transmision de un equipo interfiere con la de los demas
	- dos equipos que transmiten a la vez en el mismo DC, producen colision
	- presente en ethernet half duplex
	- problemas de escalabilidad (ethernet soporta carga hasta 40%)
	- ==solucion: segmentacion de un dominio de colision(nivel 2 o superior)(separa DCs)==
- dominio broadcast(DB)
	- parte de la red (equipos y canales) que se ve afectada cuando uno de los equipos transmite un frame ethernet con direccion de destino broadcast
	- coincide con el DC en half duplex
	- es igual o mayor que el DC en full duplex
	- problemas de escalabilidad:
		- debe limitarse el numero de equipos de la red, de otro modo se puede saturar con broadcasts a la red y a los equipos
![[Pasted image 20241103230144.png]]


#### cable ethernet - UTP (cobre)
![[Pasted image 20241103230205.png]]

## tipos de cable ethernet
- cable directo
	- conexion de dispositivos "no iguales" (PC-hub, etc)
	- normas A o B en ambos conectores
- cable cruzado
	- conexion de dispositivos iguales (PC-PC, hub-hub)
	- normas diferentes en los conectores
![[Pasted image 20241103230331.png]]


| PIN | conector 1     | conector 2     |
| --- | -------------- | -------------- |
| 1   | blanco-naranja | blanco-verde   |
| 2   | naranja        | verde          |
| 3   | blanco-verde   | blanco-naranja |
| 4   | azul           | azul           |
| 5   | blanco-azul    | blanzo-azul    |
| 6   | verde          | naranja        |
| 7   | blanco-marron  | blanco-marron  |
| 8   | marron         | marron         |
