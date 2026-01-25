
objetivo: satisfacer el requerimiento del cliente sin involucrar al servidor destino

- usuario configura el browser: acceso web via cache
- browser envia todos los requerimientos HTTP al cache
	- si objeto esta en cache: cache retorna objeto
	- si no, cache requiere los objetos desde el servidor Web, los almacena y retorna el objeto al cliente
![[Pasted image 20250605190714.png]]

## caches v/s proxy
- la idea del ==cache== es almacenar "localmente" datos ya solicitados y asi poder acceder a estos mas rapidamente en el futuro
	- un problema que debe atender el cache es la osolescencia que puede tener los datos locales
	- el cache puede usar tiempos de expiracion, o consultar a la fuente por vigencia del dato local
- un ==proxy== es un servicio que ==consiste en realizar un solicitud a pedido de otro
- les ha pasado que para algunas cosas ustedes desean pedir a otro enviar un mensaje por ustedes?
- por ej queremos usar proxy para acceder a servicios externos de una intranet, para que desde afuera no se sepa que computadores hay dentro. El origen es siempre el mismo

### mas sobre web caching
- cache actua como cliente y servidor
- tipicamente el cache es instalando por ISP (universidad, compania, ISP residencial)

por que web caching?
- reduce tiempo de respuesta a las peticiones del cliente
- reduce trafico en el enlace de acceso al ISP
- internet densa con caches permite a proveedores de contenido "chicos" (no `$$`) entregar contenido en forma efectiva

### GET condicional
- objetivo: verificare que el cache tiene la version actualizada de un objeto
- cache: especifica la fecha de la copia en el requerimiento HTTP
	- If-modified-since: `<date>
- servidor: responde sin el objeto si la copia de la cache es la ultima.:
	- HTTP/1.0 304 not modified
![[Pasted image 20250605191406.png]]