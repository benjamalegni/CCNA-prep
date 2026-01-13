- espacio de direcciones significativamente mayor que IPv4 (128 bits de longitud)
- facilidad de administracion en la intranet
- organizacion eficiente en la internet
- eliminacion de NAT
- una interfaz de red puede tener un numero arbitrario de direcciones, de diferentes alcances
- autoconfiguracion: en el arranque, el equipo genera automaticamente una direccion de alcance link
- se posibilitan nuevas aplicaciones(p.ej IoT)

- representada en notacion hexa grupos de 16 bits separados por ":"
- uso de prefijo igual que en IPv4, se dividen en una parte de red y una de host (indicada con /)
	- 2001:1234:0000:0000:0000:0001:0000:ab54/64 
	- Red: 2001:1234:0000:0000 --- Host:0000:0001:0000:ab54
- son validos todos los valores "todos ceros" y "todos unos", en la parte de red o de host
- debido a su longitud, se representan "compactadas", eliminando los ceros segun ciertas reglas
![[Pasted image 20250516221601.png]]

## reglas de representacion de direcciones IPv6
- Dirección Completa: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

- Supresión de ceros: 2001:db8:85a3:0:0:8a2e:370:7334
	- se suprimen ceros al comienzo de cada bloque (no al final) 
	- cada bloque debe tener al menos un dígito hexadecimal 

- Compresión de ceros: 2001:db8:85a3::8a2e:370:7334
	- grupos de ceros contiguos se reemplazan por “::” 
		- solo es posible comprimir grupos completos y no partes 
		- solo se puede utilizar una única vez en una dirección 
			- Debe aplicarse al mayor grupos de ceros contiguos (se reemplaza por “::”) 
			- Si hay dos grupos iguales, debe aplicarse al que está más a la izquierda

- Representación de dígitos hexadecimales mayores que 9 en minúsculas
- Representación de direcciones mixtas: solo los últimos 32 bits (v4) en notación decimal con puntos, cuando esto se pueda deducir del prefijo. Ejemplo:IPv6 del tipo IPv4-mapeada ::ffff:c000:280 => ::ffff:192.0.2.128
- Representación de ports: [2001:db8::1]:80

## tipos de direcciones IPv6
- Unicast
	- el alcance esta dado por sus primeros bits
	- identifican una unica interfaz de conexion a la red
	- un datagram enviado a una direccion unicast es entregado a esta interfaz
- Multicast
	- el alcance esta dado por los bits de scope
	- identifican multiples interfaces de conexion a la red
	- un datagram enviado a una direccion multicast es entregado a todas las interfaces asociadas a esta direccion
- Anycast
	- identifican multiples interfaces de conexion a la red
	- un datagram enviado a una direccion anycast es entregado a una sola de las interfaces asociadas a la direccion
- NO se definen direcciones broadcast

#### tipos de direcciones unicast
- direcciones de alcance global (Global)
	- identificadores unicos de alcance global
	- asignados explicitamente a una interfaz
	- se requiere solicitarlas a un RIR
	- utilizadas para comunicar equipos en la internet
- direcciones de alcance en el link (link local)
	- validas solo en la red fisica (p.ej. ethernet)
	- generadas automaticamente
	- utilizadas para procesos de autoconfiguracion
	- utiles para interfaces punto a punto
- direcciones de alcance en el site (Unique Local Address - ULA)
	- similares a las direcciones privadas IPv4
	- usadas para comunicar equipos dentro del site
	- no permitidas en la internet puede ser unicas para cada site

#### representacion de direcciones globales unicast
- reconocidas en toda la internet
- identificadas por prefijo 2000::/3
- espacio dividido en bloques para:
	- asignacion a proveedores
	- propositos especiales
![[Pasted image 20250518182646.png]]


#### reprentacion Link Local Address
generadas automaticamente
![[Pasted image 20250518182903.png]]
#### representacion de Unique Local Address (ULA)
FC00::/8 reservado para uso futuro

FD00::/8 ULA
![[Pasted image 20250518182824.png]]

### ejemplo direcciones IPv6
![[Pasted image 20250518182929.png]]
![[Pasted image 20250518182942.png]]


### direcciones multicast IPv6
![[Pasted image 20250518183251.png]]
SCOPE:
- 1 interface-local
- 2 link-local
- 5 site-local
- E global

FLAGS:
- R (RFC 3956)
	- 0: indica que la direccion multicast no contiene una direccion de RP
	- 1: indica que la direccion multicast contiene la direccion del RP (debe tener T=1, P=1)
- P (RFC 3306)
	- 0: la direccion multicast no esta basada en un prefijo unicast
	- 1: la direccion multicast incluye el prefijo de la red donde se encuentra el emisor (debe tener T=1)
- T: indica direccion temporaria (1) o permanente (0)

### ejemplo de direcciones multicast
solicited node address (SNA)
- son utilizadas para realizar el neighbor discovery
- se debe agregar una SNA por cada una de las direcciones
- mejora la perfomance de ARP utilizado en IPv4
- se genera con el prefijo FF02::1:ff00:0/104 y se completa con los ultimos 24 bits de la direccion IPv6

otras direcciones multicast conocidas
- FF02::1 -> todos los nodos de la red local
- FF02::2 -> todos los routers de la red local
- FF05::2 -> todos los routers de la red site

![[Pasted image 20250518183813.png]]
![[Pasted image 20250518183945.png]]

### direcciones anycast IPv6
- sintacticamente iguales a las direcciones unicast
- asignadas a mas de una interfaz
- son de utilidad cuando un servicio es ofrecido por mas de un nodo
- requieren soporte del sistema de ruteo
- por el momento, solo utilizadas como direcciones de destino y asignadas a routeres
- uso restringido de direcciones anycast globales (no escalable)
- ejemplo, "direccion anycast del router de la subred"
![[Pasted image 20250518184238.png]]
