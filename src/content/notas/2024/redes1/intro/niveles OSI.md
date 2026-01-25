## nivel 1. incluido en el nivel link layer TCP/IP

aspectos a considerar:
- como conectarse al vinculo fisico?
- como convertir bits en señales
	- cuanto tiempo debe durar la señal?
	- que forma y voltaje representa un 0 y un 1?
- como establecer y terminar el vinculo fisico entre ambas partes?
- es posible enviar señales en ambos sentidos a la vez?
![[Pasted image 20240918131358.png]]

## nivel 2. incluido en el nivel link layer TCP/IP
aspectos a considerar
- como delimitar cada conjunto de bits que integran un bloque?
- como detectar (y corregir) bloques perdidos?
- como detectar (y corregir) bloques duplicados?
- como evitar que un emsiro rapido satura a un receptor mas lento?
- en vinculos broadcast, como determinar que equipo puede utilizar el canal en un momento dado?
![[Pasted image 20240918131748.png]]

## nivel 3. link e internet layers TCP/IP
provee transporte de paquetes de un equipo a otro independizandolos de la tecnologia y topologia de las redes involucradas
==involucra a todos los equipos de la red==

IP es packet switching
aspectos a considerar
- como identificar a los equipos que se conectan a la red (addressing: ==cada usuario tiene una direccion IP==)?
- que equipos intermedios debe recorrer un paquete para llegar a destino con un costo minimo (ruteo)?
- como establecer, controlar y terminar conexiones a nivel de red (ofrecidas a N4)?
- como evitar que se congestione parte o la totalidad de la red?
- como evitar que un emisor rapido sature la red?
- como cobrar a los equipos por el uso que hacen de la red?
- como tratar las diferencias de tecnologia entre los diferentes tipos de red que integran la interred (internetworking)?
![[Pasted image 20240918132414.png]]

## nivel 4 transporte. nivel transporte TCP/IP
provee transmision de mensajes punta a punta: independiente del nivel de red
aspectos a considerar:
- administracion de conexiones de red
- provision de diferentes tipos de servicio. ==TCP es un confiable mientras que UDP no es tan confiable pero es mas rapido==
- lleva a cabo (o completa) el control de errores
- adaptacion de la longitud de los mensajes de niveles superiores a la longitud admitida por el nivel de red
- control de flujo entre hosts. que un equipo no sature a otro
- control de errores y secuencia de la informacion enviada (si provee el servicio)
- controlar la saturacion de la red TCP colabora con IP para que no se sature. en base al tiempo que TCP manda un paquete regula la cantidad o velocidad en que los paquetes van a ser enviados
![[Pasted image 20240918235723.png]]


## niveles 5,6 y 7. incluidos en nivel aplicacion TCP/IP
nivel 5: sesion: provee un servicio mejorado a las aplicaciones (p.ej. sincronizacion)
nivel 6: aspectos de representacion de datos (el formato de los datos)
nivel 7: elementos comunes utilizados por las aplicaciones
![[Pasted image 20240919000439.png]]