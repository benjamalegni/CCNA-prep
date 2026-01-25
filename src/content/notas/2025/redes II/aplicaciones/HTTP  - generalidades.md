### web y HTTP
- una pagina web esta compuesta de objetos
- en este contexto objetos pueden ser archivos HTML, imagenes (JPEG, GIF, ...), archivos de audio, archivos de video, ...
- paginas web consisten generalmente de un archivo HTML base el cual incluye referencias a objetos
- cada objeto es direccionable por un Uniform Resource Identifier (URI)
- URL , (Universal Resource Locator), es un URI para un recurso de red

### URL
![[Pasted image 20250604164905.png]]
- *esquema*: le dice al cliente como acceder al recurso. Ej: http, https, file
- *hostname*: en un URL o URI HTTP, lo siguiente que aparece despues del esquema es un nombre de host, que le dice al cliente a que servidor conectarse
- *camino*: identifica un recurso en particula dentro de un servidor. Puede corresponderse a la ruta de un archivo en el sistema de archivos del servidor (/pages/index.html) o a un consulta (/search?q=IPv4)

### HTTP generalidades
![[Pasted image 20250604165125.png]]
- HTTP: hypertext transfer protocol
- es un protocolo de la capa aplicacion usado por la web
- usa modelo cliente/servidor
	- cliente: browser primero requiere y luego recibe y "despliega" objetos web
	- servidor: servidor web envia objetos en respuesta a requerimientos
- HTTP 1.0: RFC 1945 (1996)
- HTTP 1.1: RFC 2068 (1997)
- HTTP 1.1: mejorado RFC 2616 (1999)

usa TCP:
1. cliente inicia conexcion TCP (crea socket) al servidor puerto 80 (puede ser otro!)
2. servidor acepta conexion TCP del cliente
3. mensajes HTTP (mensajes del protocolo de capa aplicacion) son intercambiados entre browser (cliente HTTP) y servidor Web (servidor HTTP)
4. se cierra la conexion TCP

HTTP no guarda "estado"
- el servidor no mantiene informacion sobre los requerimientos de los clientes
protocolos que mantienen "estado" son complejos, por que?
- historia pasada (estado) debe ser mantenida
- si servidor o cliente se cae, las vistas del estado pueden ser inconsistentes y deben ser sincronizadas