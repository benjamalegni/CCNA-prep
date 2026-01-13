NAT: network address translation
NAT consiste en cambiar las direcciones (y/o ports) de los datagrams

motivacion: como podemos dar salida a internet a una red con direcciones IP privadas?

==usamos un representante==
la ==idea== es solo usar una direccion IP para acceder al mundo exterior:
- no necesitamos asignacion de un rango de ISP: solo una direccion externa es usada por todos los equipos internos
- podemos cambiar la direccion de equipos en red local sin notificar al mundo exterior
- podemos cambiar ISP sin cambiar direcciones de equipos en red local
- equipos dentro de la red no son explicitamente direccionables o visibles desde afuera (una ventaja de seguridad)

- NAT consiste en cambiar las direcciones (y/o ports) de los datagrams
- la funcion NAT se situa en el router de entrada/salida de una intranet desde y hacia la internet
- surge debido a la falta de direcciones publicas IPv4
- el ISP nos asigna una unica (o un grupo reducido) de direcciones IP
	- dentro de nuestra intranet, utilizamos direcciones privadas para los equipos
	- desde afuera, toda nuestra intranet se ve como si fuera un solo equipo
- exiten diferentes tipos de NAT, adaptados a distintas necesidades

## tipos de NAT:
## dinamico (SNAT o MASQUERADE)
![[Pasted image 20240923141343.png]]
![[Pasted image 20240923141406.png]]
implementacion enrutador NAT:
- para datagrams salientes: reemplazar (IP origen, #puerto) de cada datagrama saliente por (IP NAT, nuevo #puerto)
		clientes y servidores remotos responderan usando (IP NAT, nuevo #puerto) como direccion destino
- recordar (en tabla de traduccion NAT) cada par de traduccion (IP origen, #puerto) a (IP NAT, nuevo #puerto)
- para datagramas entrantes: reemplazar(IP NAT, nuevo #puerto) en campo destino de cada datagrama entrante por correspondiente (IP origen, #puerto) almacenado en tabla NAT

![[Pasted image 20240923141729.png]]


## NAT estatico (DNAT)
que pasa si se quiere publicar en internet un servidor web de la PC 10.0.0.0.2?
se debe añadir una entrada fija en la tabla de NAT, indicando que todo el trafico que vaya a derminado puerto, sea dirigido a un equipo de la red privada

por ej, si queremos un servidor WEB en nuestra red
- se debe crear una entrada fija en la tabla de NAT en la que se indique que lo que llegue al puerto 80 (web) sea dirigido al equipo en el que corre el servidor web

se conoce habitualmente como "abrir y redirigir puertos" en el router
![[Pasted image 20240923142448.png]]