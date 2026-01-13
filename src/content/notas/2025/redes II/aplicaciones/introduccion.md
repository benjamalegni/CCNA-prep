## nivel de aplicaciones introduccion, HTTP, web
### algunas aplicaciones de red
- email
- web
- mensajeria instantanea
- login remoto
- etc

### creacion de una aplicacion de red
- aplicaciones de red
	- corren en diferentes sistemas y se comunican por la red
	- ej. web: programa del servidor web se comunica con el programa del navegador
no se refiere a software escrito para los dispositivos en la red interna
- dispositivos internos de la red (routers, switches) ==no funcionan== en la capa aplicacion
- este diseno permite desarrollar rapido
![[Pasted image 20250604154629.png]]

## arquitecturas de aplicacion
- cliente-servidor
- peer-to-peer(P2P)
- hibridos de cliente-servidor y P2P

#### arquitectura cliente-servidor
![[Pasted image 20250604155042.png]]
servidor: 
- computador siempre on
- direccion IP permanente
- cluster de servidores por **escalamiento**
	- escalabilidad: es la habilidad de entender la operacion (mas clientes) sin perder calidad. ej.radio
cliente:
- se comunica con el servidor
- puede conectarse intermitentemente
- puede tener direcciones IP dinamicas (no estatica)
- no se comunican directamente entre si (dos cientes puros)



### arquitectura P2P pura
![[Pasted image 20250604155217.png]]
- no hay servidor siempre on
- sistemas terminales arbitrarios se comunican directamente
- pares se conectan intermitentemente y cambian sus direcciones IP
- ejemplo: Gnutella

altamente escalable pero dificil de administrar
### hibridos de cliente-servidor y P2P
- napster
	- busqueda de archivos centralizada:
		- pares registran contenidos en servidor central
		- pares consultan algun servidor central para localizar el contenido
	- transferencia de archivos P2P

- mensajeria instantanea
	- dialogo entre los usuarios es P2P (no pasa por servidor)
	- deteccion/localizacino de presencia es centralizada
		- usuario registra su direccion IP en un servidor central cuando ingresa al sistema
		- usuarios contactan servidor cenral para encontrar las direcciones IP de sus amigos

