# SMTP [RFC 5321]
- usa TCP para transferir confiablemente mensajes e-mail desde el cliente al servidor, puerto 25 en servidor
- transferencia directa: servidor envia correos al servidor receptor
- 3 fases de la transferencia
	- handshaking (apreton de manos para establecer conexion)
	- transferencia de mensajes
	- cierre
- interaccion comandos/respuestas
	- comandos: texto ASCII
	- respuesta: codigo de estatus y frase
- mensajes deben ser enviados en ASCII de 7-bits
- que pasa con las fotografias y archivos binarios?

### escenario: alicia envia mensaje a benito
1. alicia usa agente usuario para componer el mensaje para benito@someschool.edu
2. el agente de alicia envia en mensaje a su servidor de correo; el mensaje es puesto en cola de salida
3. lado cliente de SMTP abre una conexion TCP con el servidor de correo de benito
4. el cliente SMTP envia el mensaje de alicia por la conexion TCP
5. el servidor de correo de benito pone el mensaje en su casilla
6. benito invoca su agente usuario para leer el mensaje
![[Pasted image 20250607023219.png]]


### wireshark flow stream
![[Pasted image 20250607023240.png]]

### formato de mensajes de correo (comando DATA)
- SMTP: protocolo para intercambio de mensajes de correo
- RFC 822: standard para el formato de los mensajes:
	- e.g. lineas de encabezado (opcional), entre otros:
		- to:
		- from:
		- subject:
	- diferente a los comandos SMTP
- cuerpo
	- el "mensaje", solo caracteres ASCII
![[Pasted image 20250607023421.png]]
### formato de mensaje: extensiones multimedia
- ==MIME== "multimedia mail extension" RFC2045, 2056
- lineas adicionales en el encabezado del mensaje declaran el tiempo de contenido MIME
- la codificacion base64 usa solo los caracteres: A-Z, a-z, 0-9 y +/=
![[Pasted image 20250607023545.png]]

### SMTP: palabras finales
- SMTP usa conexiones persistentes
- SMTP requiere qeu el mensaje (encabezado y cuerpo) sean en ASCII de 7-bits
- servidor SMTP usa ==CRLF.CRLF== para terminar el mensaje: es decir, una linea con solo un punto en ella

### comparacion con http:
- HTTP: pull (saca contenido desde servidor)
- SMTP: push (pone contenido en servidor)
- ambos tienen interaccion comando/respuesta en ASCII y tienen codigos de estatus
- HTTP: cada objeto es encapsulado en su propio mensaje
- SMTP: multiples objetos son enviados en un mensaje multiparte

