![[Pasted image 20250607023950.png]]
- SMTP: permite envio y almacenamiento de correo en servidor del destinatario
- protocolo de acceso a correo: permite extraer correo desde el servidor
	- POP: Post Office Protocol [RFC 1939]
		- autenticacion (agent<--> server) y bajada
	- IMAP: Internet Mail Access Protocol [RFC 1730]
		- mas caracteristicas que POP (IMAP es mas complejo)
		- permite manipulacion de los mensajes almacenados en el servidor
	- HTTP: Hotmail, Yahoo mail, etc

# protocolo POP3
- fase de autorizacion ->![[Pasted image 20250607024232.png]]
	- comandos del cliente:
		- user: declara username
		- pass: password
- respuestas del servidor: 
	- +OK
	- -ERR
fase transaccional cliente: -> ![[Pasted image 20250607024309.png]]
- list: lista de numeros de mensajes
- retr: extrae mensajes por su numero
- dele: borra
- quit

#### mas sobre POP3
- ejemplo previo usa modo "bajar y borrar"
- bob no puede releer el correo si cambia el cliente
- "bajada y conserva": obtiene copia de los mensajes en diferentes clientes
- POP3 no mantiene el estado de una sesion a otra ("stateless)

### IMAP
- puede mantener los mensajes en el servidor
- permite que el usuario organice sus correos en carpetas
- IMAP mantiene el estado del usuario de una sesion a otra:
	- nombre de carpetas mapeo entre IDs (identificadores) de mensajes y nombres de carpetas

/* si usted sabe programar sockets, usted puede escribir un cliente de correo */

### origen de web mail
- diciembre 98: 2 personas aparecen con la idea frente a un inversionista. formaron hotmail
- 3 empleados y 14 part-times desarrollaron y lanzaron la primera version 7 meses mas tarde (julio 96)
- en menos de 1 ano y medio hotmail tenia 12 millones de cuentas y fue comprado por microsoft en 400 m de usd
- exito se logra por ==haber sido los primeros y por tratarse de una aplicacion que se difunde sola