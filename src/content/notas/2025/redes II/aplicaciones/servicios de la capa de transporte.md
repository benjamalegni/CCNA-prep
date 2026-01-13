### protolocos de capa aplicacion definen
- tipos de mensajes intercambiados e.g.. mensajes de requerimiento y respuesta
- sintaxis de los mensajes: los campos en los mensajes y como estos son delimitados
- semantica de los campos: i.e. significado de la informacion en los campos
- reglas para cuando y como los procesos envian y responden a mensajes

- protocolos de dominio publico
	- refinidos en RFC's
	- permite inter-operabilidad
	- ej: HTTP(WEB), SMTP (email)

- protocolos propietarios
	- secreto industrial de una empresa
	- ej KaZaa
	- skype

### servicios de los protocolos de transporte en internet
- #### servicio TDP (transmission control protocol)
	- es orientado a conexion (setup) requerido entre procesos cliente y servidor antes de transferencia 
	- ofrece transporte confiable entre proceso transmisor (Tx) y receptor (Rx)
	- tiene control de flujo: Tx no sobrecargara a Rx
	- tiene control de congestion : el Tx se frena cuando la red esta sobrecargada
	- no provee garantias de retardo ni ancho de banda minimas

- #### servicio UDP (user datagram protocol)
	- transferencia de datos no confiable entre proceso Tx y Rx
	- no provee: establecimiento conexion, confiabilidad, control de flujo, control de congestion, garantias de retarno o ancho de banda

## aplicaciones internet: aplicacion, protocolo de transporte

| aplicacion             | protocolo capa aplicacion      | protocolo de transporte que lo sustenta |
| ---------------------- | ------------------------------ | --------------------------------------- |
| e-mail                 | SMTP [RFC 2821]                | TCP                                     |
| remote terminal access | Telnet [RFC 854]               | TCP                                     |
| Web                    | HTTP [RFC 2616]                | TCP                                     |
| file transfer          | FTP [RFC 959]                  | TCP                                     |
| streaming multimedia   | propietario (ej. realnetworks) | TCP o UDP                               |
| internet telephony     | propietario (ej. skype)        | tipicamente UDP                         |
