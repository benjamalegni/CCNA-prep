### HTTP no persistente
- a lo mas un objeto es enviado por una conexion TCP. Es como hacer una llamada opr objeto
- HTTP/1.0 usa HTTP no persistente

### HTTP persistente
- multiples objetos pueden ser enviados por una unica conexion TCP entre el cliente y el servidor
- HTTP/1.1 usa conexiones persistentes a menos que se indique lo contrario (default)
![[Pasted image 20250604170444.png]]

#### ejemplos
HTTP no-persistente
supongamos que el usuario ingresa url:
www.algunaEscuela.edu/algunDepto/home/index
contiene texto y referencia a 10 imagenes jpeg
1. a. cliente HTTP inicia una conexion TCP al servidor HTTP (proceso) en www.algunaEscuela.edu en puerto 80. 
   b. servidor HTTP en host www.algunaEscuela.edu esperando por conexiones TCP en puerto 80 "acepta" conexion, notifica al cliente
2. cliente HTTP envia mensaje de requerimiento (conteniendo el URL) por el socket de la conexion TCP. El mensaje indica qeu el cliente quiere el objeto someDepartment/home/index
3. el servidor HTTP recibe el mensaje de requerimiento, forma el mensaje de respuesta que contieneel objeto requeria y envia el mensaje por su socket
4. servidor HTTP cierra la conexion
5. cliente HTTP recibe el mensaje respuesta que contiene el archivo html y despliega el html. Analizando el archivo html file, encuentra 10 referencias a objetos jpeg
6. ==pasos 1-5 son repetidos para cada uno de los 10 objetos jpeg==
![[Pasted image 20250604170833.png]]
![[Pasted image 20250604170955.png]]

### modelo para tiempo de respuesta
- definicion de RTT (round-trip time): tiempo ocupado desde el envio de un paquete pequeno desde el cliente al servidor y hasta su regreso
- tiempo de respuestas
	- un RTT para iniciar la conexion
	- un RTT por requerimiento HTTP y primeros bytes de la respuesta
	- tiempo de transmision del archivo
total = 2RTT + tiempo de transmision
![[Pasted image 20250604171134.png]]

### HTTP persistente
- problemas de HTTP no-persistente:
	- requiere al menos 2 RTTs por objeto
	- el navegador abre conexiones paralelas generalmente para traer objetos referenciados => OS debe trabajar y dedicar recursos para cada conexion TCP

http persistente:
- servidor deja las conexiones abiertas despues de enviar la respuesta
	- persistencia sin pipelining:
		- cliente envia un nuevo requerimiento solo cuando el previo ha sido recibido
		- un RTT por cada objeto referenciado
	- persistencia con pipelining
		- default en HTTP/1.1
		- cliente envia requerimientos tan pronto este encuentra un objeto referenciado
		- tan poco como un RTT para todas las referencias
- mensajes HTTP siguientes entre los mismos cliente/servidor son enviados por la conexion

#### HTTP no persistente: un .html chico con varios objetos en el
![[Pasted image 20250604171618.png]]

#### HTTP persistente
![[Pasted image 20250604171634.png]]