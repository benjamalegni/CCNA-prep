Servicio utilizado: nivel fisico, transmision de bits
servicio ofrecido: transferencia de bloques de bits (frames) entre dos equipos conectados a traves de un vinculo fisico

variantes del servicio:
- orientado o no orientado a la conexion
- confiable o no confiable

combinaciones clasicas:
- orientado a la conexion, confiable
- no orientado a la conexion, no confiable

## protocolos de la capa de enlace
protocolos mas comunes 
- PPP (point to point protocol)
- LLC (logical link control)
- ethernet
- IEEE 802.11

## caracteristicas generales de los protocolos de nivel 2
independientes del codigo
soportan transmision sincronica y asincronica
eficientes
funciones en hardware
frames con info de control posicional
derivan de HDLC (high level data link control)
![[Pasted image 20241016225829.png]]

## funciones de nivel 2
configuracion inicial del link
direccionamiento
delimitacion del bloque
control de errores
control de flujo

![[Pasted image 20241016225913.png]]

# transmision asincronica y sincronica
asincronica:
- cada caracter se transmite independientemente
- canal de reposo. senal alta (stop) sincronizacion: start
- reloj en emisor y receptor
- relojes independientes

sincronica:
- los bits se transmiten continuamente
- canal en reposo, se envia secuencia de pulsos altos y bajos (0 y 1)
- sincronizacion: en cada transicion
- reloj en emisor y receptor, sincronizados
- reloj en emisor, el receptor sincroniza con info de reloj enviada en la senal
- ![[Pasted image 20241016230200.png]]

