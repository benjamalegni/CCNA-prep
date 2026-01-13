- dos tipos de mensajes http: *requerimiento y respuesta*
- mensaje de requerimiento HTTP:
	- ASCII (es decir, formato legible)

### ejemplo mensaje de requerimiento
GET /somedir/page.html HTTP/1.1 => (linea de requerimiento (request line) (metodos GET,POST,HEAD,PUT, Delete))
host: www.someschool.edu

User-agent: Mozilla/4.0
Connection: close
Accept-language:fr
	(estas son lineas de encabezado)

(carriage return, line feed extra)


### formato general de mensaje HTTP de requerimiento
![[Pasted image 20250605182721.png]]

### ejemplo mensaje de respuesta
HTTP/1.1 200 ok => linea de estatus (codigo de estatus del protocolo frase de estatus)

Connecition close
Date: Thu, 06 Aug 1998 12:00:12 GMT
Server: Apache/1.3.0 (Unix)
Last-Modified: Mon, 22 jun 1998...
Content-Length:6821
Content-Type: text/html
	(estas son las lineas de encabezado)

data data data data data ... => data e.g. archivo html solicitado

### codigos HTTP de respuesta
en primera linea de respuesta del servidor al cliente

1xx - informativo
	la solicitud esta en curso o hay otro paso que dar
	ej : 101 switching protocols
	indica que el protocolo al que esta cambiando el servidor segun lo solicitado por un cliente que envio el mensaje, incluyendo en el encabezado de request. *Upgrade*

2xx - Exito
	la solicitud tuvo exito. El servidor esta enviando los datos que solicito el cliente
	ej: 200 ok
	request exitoso, objeto requerido es incluido luego en mensaje

3xx - Redireccionamiento
	el servidor le esta diciendo al cliente un URL diferente al que debe redirigirse. Los encabezados generalmente contendran un encabezado de ubicacion con el URL actualizado. Diferentes codigos le dicen al cliente si un redireccionamiento es permanente o temporal
	ej 301 moved permanently
	se movio el objeto requerido, nueva ubicacion es especificada luego en el mensaje (Location:)

4xx - error del cliente
	el servidor no entendio la solicitud del cliente, o no puede o no quiere procesarla. Los diferentes codigos le dicen al cliente si fue un URL incorrecto, un problema de permisos u otro tipo de error
	ej 400 bad request: requerimiento no entendido por el servidor
	404 not found: documento no encontrado en servidor

5xx - error del servidor
	algo salio mal del lado del servidor
	ej: 505 HTTP version not supported