# ruteo jerarquico
- se subdivide una red en regiones (Sistemas Autonomos, AS)
- la topologia de una region no es visible a las demas
- se logra disminuir el volumen de informacion que deben manejar los routers
- es posible utilizar diferentes metricas o politicas de ruteo en las distintas regiones
- puede producir caminos con mayor costo

**definiciones**
- normalmente en un AS, los router utilizan el mismo algoritmo de ruteo
- IGP (interior gateway protocol)
- border router o router de frontera
- EGP (exterior gateway protocol)
![[Pasted image 20250522145055.png]]

## flooding
- cada paquete es enviado por todos los vinculos excepto por el que llego
- muy resistente a fallas
- llega por el camino mas corto
- gran overhead en la red
- usos:
	- aplicaciones militares
	- bases de datos distribuidas
- mejoras:
	- no reenviar un paquete mas de una vez
	- contador de nodos y eliminacion de paquete
	- flooding selectivo
![[Pasted image 20250522145455.png]]

### backward learning
utilizados por los switches en redes ethernet
el router aprende rutas en funcion de los paquetes que pasan por el, provenientes de otros nodos
tablas con entradas que son eliminadas por tiempo
broadcast si un destino no tiene entrada
puede incorporarse informacion acerca de costos (p.ej nodos)

### distance vector
utilizado en la internet, dentro de un SA
se adapta a redes con pocos nodos (diametro de la red)
simple de instalar y adminstrar
puede soportar una unica metrica (pura o combinada)
presenta problemas de convergencia (count to infinity)
IPv4 RIPv1 (routing information protocol): metrica simple. RIPv2 (routing information protocol v2): metrica simple, CIDR, seguridad
IPv6 RIPng (routing information protocol, next generation) : adaptaciones de RIPv2 a IPv6

cada nodo conoce el costo de cada uno de sus vinculos (distancia, demora, etc)
un nodo intercambia periodicamente sus tablas de ruteo con sus nodos adyacentes
el calculo del camino mas corto se realia distribuido entre los nodos
![[Pasted image 20250522150553.png]]

### link state
utilizado en la internet, OSPF
- reemplaza al ruteo distance vector (RIP), OSPF es un standard desde 1990
- convergencia rapida
- cada router genera y propaga informacion acerca de sus links (costos)
- los routers intercambian entre si informacion topologica
- el calculo de rutas se realiza por separado en cada nodo
- puede presentar pricos de calculo en la red
- mayor complejidad que un distance vector para instalar y administrar

#### generacion de informacion topologica en link state
- cada nodo detecta los links y los propaga junto con sus costos
- los nodos retransmiten la informacion recibida
- cada nodo construye una tabla con la topologia de la red
- aplicacion del algoritmo de Dijkstra para obtener caminos de costo minimo
![[Pasted image 20250522150906.png]]

### path vector
- extension de ruteo distance-vector
- no provee nocion de distancia
- soporta aplicacion de politicas de ruteo
- evita el problema de conteo a infinito
- un router publica el camino hacia un destino, en lugar de su costo (distancia)
- utilizado en Border Gateway Protocol 4 (BGP4)
- eleccion de ruta a un destino
	- distance vector: la ruta de menor costo
	- path vector: de las rutas sin ....
![[Pasted image 20250522151152.png]]

#### BGP4
![[Pasted image 20250522151208.png]]
