- las direcciones identifican unívocamente un punto de acceso (interfaz)
- constan de 32 digitos en notacion binaria (4 bytes)
	- podriamos tener $2^{32} = 4.294.967.296$  direcciones IP unicas (distintas)
	- las expresamos en notacion decimal para mayor comprension
		- ej 123.3.45.77 equivale a 01111.11.XXXXXX
- corresponde al nivel de red o network del modelo OSI
- DNS (domain name system) es un mapeo estatico para dar mayor legibilidad a los usuarios. ej www.exa.unicen.edu.ar equivale a 131.221.0.191
- tienen un significado global en la internet
- son asignadas por una autoridad central: ICCAN (internet corporation for assigned names and numbers)

### estructura de las direcciones IPv4

192.169.1.1
convertido a binario:
red -> 11000000.10101000.00000001.      host -> 00000001

![[Pasted image 20240920133615.png]]

### direccionamiento IPv4 por clases (CLASSFULL YA NO SE UTILIZA)
![[Pasted image 20240920133808.png]]

## direccionamiento IPv4 con significado especial
significados especiales de los campos "red" y "host"
	campo en 0: indeterminado "este" (el equipo que mando, no conoce su direccion)
	campo en 1: todo (el destino del dgram es la totalidad - de las redes o de los equipos de una red)

| <red,host> | descripcion                                                                 | ejemplo         | accion                         |
| ---------- | --------------------------------------------------------------------------- | --------------- | ------------------------------ |
| <0,0>      | host y red indeterminados                                                   | 0.0.0.0         | host no inicializado           |
| <0,H>      | host H en red indeterminada                                                 | 0.0.0.5         | host parcialmente inicializado |
| <R,0>      | host indeterminado en red                                                   | 201.0.0.0       | host parcialmente inicializado |
| <R,H>      | host H en red R                                                             | 201.3.1.54      | ==operacion formal==           |
| <R,1>      | todos los equipos de red R(directed broadcast)                              | 201.3.1.255     | equipo envia a toda su red     |
| <1,1>      | todos los equipos de todas las redes (toda la internet) (limited broadcast) | 255.255.255.255 | equipo envia a todos los demas |
 ![[Pasted image 20240920134845.png]]
## direcciones de IPv4 privadas
- asignadas para demorar el agotamiento de direcciones IPv4
	- el ISP asigna una direccion publica a una intranet de un usuario
	- dentro de la intranet, se usan direcciones privadas
	- desde afuera, solo se conoce la direccion publica (NAT)
- no son asignadas por la IANA (via ISP) a ninguna organizacion
- los usuarios de internet, pueden usarlas libremente dentro de sus intranets
- no son propagadas por los ISP


| nombre            | rango de direcciones IP     | cantidad de IP | N de redes | clase   | mayor bloque de CIDR (mascara de subred) |
| ----------------- | --------------------------- | -------------- | ---------- | ------- | ---------------------------------------- |
| bloque de 24 bits | 10.0.0.0 - 10.255.255.255   | 16.777.214     | 1          | clase A | 10.0.0.0/8 (255.0.0.0)                   |
| bloque de 16 bits | 172.16.0.0 - 172.31.255.255 | 1.048.576      | 16         | clase b | 172.16.0.0/12 (255.240.0.0)              |
| bloque de 16 bits | 192.169.0.0                 | 65.534         | 256        | clase c | 192.169.0.0/16 (255.255.0.0)             |

## direccion de loopback (127.0.0.0/8)
- interfaz loopback:
	- interfaz virtual
	- direcciones asignadas: 127.0.0.0 a 127.255.255.255 (127.0.0.0/8) ultima clase A. generalmentese usa la 127.0.0.1 puede usarse cualquiera o varias
- uso:
	- prueba de aplicaciones si no tenemos interfaces fisicas funcionando
	- acceso a aplicaciones si no tenemos interfaces fisicas funcionando
- direcciones IP en red 127.0.0.0
	- no son enviadas a ninguna interfaz que no sea loopback
	- no son aceptadas si provienen de una interfaz no loopback