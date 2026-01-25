address** (man ip address)
- direcciones del protocolo de nivel 3 (ipv4 o ipv6) asignadas a los dispositivos
- permite agregar, eliminar o modificar direcciones
**neighbour** (man ip neighbour)
- cache conteniendo info relativa a los nodos vecinos (en la misma red fisica) para cada dispositivo existe una tabla
- permite agregar, borrar y cambiar parametros de las entradas
**ntable** (man ip ntable)
- permite ver y cambiar parametros de las tablas con info de los nodos vecinos (neighbour)
**token** (man ip token)
- permite especificar el host ID para configuracion SLAAC (radvd)
**monitor** (man ip monitor)
- muestra la actividad en los diferentes objectos (rutas, dispositivos, etc)
**route** (man ip route)
- entradas en las tablas de ruteo
- permite agregar, borrar y modificar las rutas que conoce el equipo
**rule** (man ip rule)
- reglas en la base de datos de politicas de ruteo
**maddress** (man ip maddress)
- permite administrar las direcciones multicast asociadas al equipo
**mroute** (man mroute)
- cache de ruteo multicast
- permite ver las entradas que se utilizan cuando el equipo actua como router (multicast)
- para eso debe estar corriendo algun protocolo de ruteo multicast, como pimd, etc
- por el momento, solo es posible verlas pero no modificarlas ni agregar
**tcp_metrics** (man tcp_metrics)
- permite ver y borrar las entradas relativas a las conexiones TCP mantenidas por el kernel
- contienen parametros especificos TCP
**tunnel** (man ip tunnel)
- permite crear y adminstrar varios tipos de tuneles


### tipos de rutas
unicast
- indica el camino (nexthop) a destinos reales
- por defecto una ruta es unicast
	- ip -6 add **2001:db8:1::2/64** dev eth0
	- ip -6 route add unicast **2001:db8:1::2/64** via **2001:db8:3::4**

unreachable
- para cualquier direccion comprendida en la red, se elimina el paquete y se envia al origen un ICMP host unreachable
	- ip -6 route add unreachable **2001:db8:8::/64**

blackhole
- para cualquier direccion comprendida en la red, se elimina el paqeute sin enviar ningun aviso
	- ip -6 route add blackhole **2001:db8:8::/64**

prohibit
- para cualquier direccion comprendida en la ruta, se elimina el paquete y se envia al origen un ICMP communication administratively prohibited
	- ip -6 route add prohibit **2001:db8:8::/64**

local
- se refiere a destinos en el mismo equipo. los paquetes son reenviados al mismo host
- tener en cuenta: tabla local diferente a ruta local
- solo valido en IPv6
- para cualquier tipo de ruta se puede especificar un host - prefijo 128 - o ausencia de prefijo
	- ip -6 route add local 2001:10::/64 dev eth0 – agrega ruta local en tabla local 
	- ip -6 route add 2001:10::/64 dev eth0 table local - agrega una dirección unicast en tabla local 
	- ip -6 route add local 2001:10::/64 dev eth0 table local – agrega ruta local en tabla local 
	- ip -6 route add local 2001:10::/64 dev eth0 table 100 – agrega ruta local en tabla 100

broadcast
- indica los destinos que deben ser enviados como broadcast en la red fisica (link layer)
- solo valido en IPv4
	- ip route add broadcast 10.1.1.0/24 dev eth0 – agrega por defecto en tabla local 
	- ip route add broadcast 10.1.1.0/24 dev eth0 table 100 – agrega en tabla 100

anycast
- son direcciones unicast que seran utilizadas como anycast. La diferencia es que no se pueden utilizar como direcciones de origen
- no se pueden definir desde ip2
- se generan automaticamente en el router, al definir una direccion (y su red)
	- ip -6 addr add 2001:999::3/64 dev eth0 generará la entrada en la tabla local
		- anycast 2001:999:: dev eth0 proto kernel scope global metric 0 pref medium

throw
 - ruta de control utilizada en conjunto con policy routing
 - si un destino coincide con una ruta de tipo throw, el efecto es el mismo que si no hubiera ruta para ese destino
 - si no usamos policy routing, se descarta el paquete y se genera ICMP net unreachable
 - si usamos policy routing, se evalua la siguiente regla en la RPDB
 - ip -6 add throw **2001:9898::/64**

## politicas de ruteo
ruteo standard
- seleccion del next-hop en funcion de la direccion de destino del paquete (longest match prefix)
- no permite seleccionar rutas en base a otras caracteristicas del trafico
![[Pasted image 20250521222448.png]]
ruteo avanzado
- utilizacion del Routing Policy Data Base
- permite eleccion de ruta segun otras caracteristicas de los paquetes Direccion de origen
	- tipo de servicio
	- tamano del paquete
	- tipo de trafico
	- protocolos de nivel aplicacion
	- otros
![[Pasted image 20250521222504.png]]

### funcionamiento ruteo avanzado
 componentes
 - Routing Policy Data Base
 - reglas
 - tablas de ruteo

procedimiento
- chequear reglas en orden de prioridad (0 a 32767)
- si matching, decidir segun la regla y terminar

condiciones de matching
- tipo de servicio
- dir de origen y/o destino
- otros

posibles decisiones de las reglas
- utilizar una tabla
- blackhole
- otros


# reglas en la RPDB
 - formato regla: selectores target
 - selectores (sobre campos del paquete y marks):
	 - dir origen (from)
	 - dir destino (to)
	 - interfaz de entrada (iif)
	 - interfaz de salida (oif)
	 - tipo de servicio (tos, dsfield)
	 - fwmark
- targets (tipos de reglas)
	- unicast: la ruta al destino se busca en la tabla indicada
	- blackhole: se descarta el paquete sin enviar ninguna respuesta
	- unreachable: se genera un error "network unreachable"
	- prohibit: se genera un error 'communication is administratively prohibited'
- ejemplos
	- ip rule add blackhole to 10.182.17.64/28  
	- ip rule add prohibit from 209.10.26.51 
	- ip rule add unreachable iif wan0 fwmark 5 (Previamente: iptables -t mangle -A INPUT -m mark --mark 5)  
	- ip rule add unicast from 192.168.100.17 table 5

### funcionamiento de ruteo avanzado
![[Pasted image 20250521224618.png]]

# ejemplos
### reglas y tablas de ruteo (v4)
![[Pasted image 20250521224642.png]]

### reglas y tablas de ruteo (v6)
![[Pasted image 20250521224700.png]]

## ejemplo de uso de policy routing (v4)
![[Pasted image 20250521224825.png]]

## ejemplo de uso de policy routing (v6)
![[Pasted image 20250521224844.png]]