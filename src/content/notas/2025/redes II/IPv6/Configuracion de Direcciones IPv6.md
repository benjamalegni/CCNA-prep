### alternativas de configuracion
configuracion de direcciones en los equipos
- configuracion automatica de direcciones IPv6 de alcance local en cada interfaz (fe80::/8)
- configuracion automatica de direcciones de alcance site (ULA) y global: los routers pueden anunciar prefijos, los hosts crean una direccion por cada prefijo recibido en cada interfac (proceso "router discovery" -radvd-)
- configuracion automatica (DHCPv6)
- configuracion de direcciones especificas
- configuracion manual (ip -6 addr add)

configuracion de rutas
- configuracion manual (ip -6 route add ...)
- configuracion automatica (RIPng, OSPFv3, etc)

## neighbor discovery
protocolo basado en ICMPv6

funciones:
- descubrimiento de routers en el link
- autoconfiguracion de direcciones (de diferentes alcances)
- configuracion con parametros asignados al link
- resolucion de direcciones (ARP de IPv4)
- chequeo de direcciones duplicadas en el link
- descubrimiento del router correcto para un destino
- determinacion del estado de los nodos vecinos en el link (network unreachability detection -NUD-)

funciones ICMPv6 utilizados
- neighbor solicitation (NS)
- neighbor advertisement (NA)
- router solicitation (RS)
- router advertisement (RA)
- redirect

![[Pasted image 20250518191121.png]]
![[Pasted image 20250518191133.png]]
![[Pasted image 20250518191403.png]]
![[Pasted image 20250518191413.png]]
![[Pasted image 20250518191420.png]]
![[Pasted image 20250518191428.png]]

![[Pasted image 20250518191439.png]]

## router discovery
objeto
- ubicar routers adyacentes (en el mismo link)
- conocer cuales pueden actuar como default routers
- conocer prefijos de direcciones de red locales al link
- adquirir informacion relativa a autoconfiguracion de direcciones
- MTU
- tipo de autoconfiguracion
- tiempos de validez de los parametros anunciados

- periodicamente los routers en el link anuncian su presencia (unsolicited advertisement)
	- disponibilidad de actuar como default router
	- prefijos de red
	- otros parametros de configuracion de hosts
- un router puede emitir un advertisement en cualquier momento, en circunstancias especiales (unsolicited advertisements)
- un router puede emitir un (solicited) advertisement a pedido de un host
- checkeos de consistencia entre advertisements en los diferentes routers
- un host en el link utiliza la info de los advertisements para mantener su info local
	- lista de default routers
	- lista de prefijos
	- MTU, etc
- acepta info de distintos routers (prevalece ultimo valor si hay inconsistencias)
- un host que necesite configurarse puede enviar un mensaje router solicitation
- todos los routers en el link responderan con advertisements unicast

### router discovery linux IPv6 router advertisement daemon (radvd)

radvd
- permite configurar a los host de manera stateless
- configuracion en /etc/raddv/radvd.config
- utiliza router advertisements y router solicitations
- puede configurarse una variedad de parametros

radvdump
- permite monitorear los anuncios emitidos y parametros enviados

![[Pasted image 20250518192740.png]]
![[Pasted image 20250518192749.png]]


| funcion                   | IPv4                  | IPv6                                                     |
| ------------------------- | --------------------- | -------------------------------------------------------- |
| asignacion de direcciones | DHCPv4                | DHCPv6, SLAAC, reconfiguracion                           |
| resolucion de direcciones | ARP, RARP             | NS, NA (ICMPv6)<br>neighbor solicitation y advertisement |
| descubrimiento de routers | ICMP router discovery | RS, RA (ICMPv6)<br>router solicitation y advertisement   |
| resolucion de nombres     | DNSv4                 | DNSv6                                                    |
