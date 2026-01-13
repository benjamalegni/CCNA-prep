![[Pasted image 20250521212551.png]]

## servicios provistos y funciones principales
Servicio provisto
- transporte de paquetes (datagrams) entre procesos de nivel transporte
- independiente de la topologia
- independiente de la tecnologia
- direccionamiento uniforme

Funciones:
- reenvio de paquetes: determinacion del proximo equipo a quien entregar un paquete
- ruteo de paquetes: determinacion del camino que deben seguir los paquetes para llegar a destino
- control de congestion: evitar que la red colapse por trafico excesivo
- calidad de servicio: proveer caracteristicas de envio (ancho de banda throughput, errores, etc. de acuerdo a lo que solicitan las aplicaciones)
- seguridad: autenticacion de interlocutores, cifrado de la informacion
- como cobrar a los equipos por el uso que hacen de la red
- adaptacion del tamano del paquete soportado al MTU de las redes
- establecer, controlar y terminar conexiones a nivel de red (ofrecidas a N4). solo en el caso de prestar servicio orientado a conexion

## organizacion interna a nivel de red
==organizacion basada en circuitos virtuales==
- crea una relacion (circuito virtual) entre emisor y receptor
- los paquetes son tratados por la red de la misma manera
- generalmente ofrece un servicio confiable, orientado a conexion
![[Pasted image 20250521213248.png]]


==organizacion basada en datagrams==
- no crea ninguna realcion entre el emisor y el receptor
- cada paquete es enviado independientemente de los demas
- generalmente ofrece un servicio no orientado a conexcion, no confiable
![[Pasted image 20250521213257.png]]

# CS vs PS

| asunto                         | red de circuitos virtuales                                                     | red de datagramas                                                       |
| ------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| configuracion del circuito     | requerida                                                                      | no requerida                                                            |
| direccionamiento               | cada paquete contiene un numeor de CV corto                                    | cada paquete contiene la direccion de origen y de destino completas     |
| informacion de estado          | cada CV requiere espacio de tabla del enrutador por cada conexion              | los enrutadores no contienen informacion de estado sobre las conexiones |
| enrutamiento                   | la ruta se elije cuando se establece el CV; todos los paquetes siguen esa ruta | cada paquete se enruta de manera independiente                          |
| efecto de fallas del enrutador | terminan todos los CVs que pasaron por el enrutador defectuoso                 | ninguno, excepto para paquetes perdidos durante una caida               |
| calidad del servicio           | facil si se pueden asignar suficientes recursos por adelantado para cada CV    | dificil                                                                 |
| control de congestion          | facil si se pueden asignar suficientes recursos por adelantado para cada CV    | dificil                                                                 |
## reenvio y ruteo
- # reenvio
	- proceso local en un ruter
	- cada paquete, se debe enviar lo mas rapidamente al siguiente router camino al destino
	- el reenvio se realiza en base a informacion provista por el componente de ruteo
- # ruteo
	- envio de un paquete a su destino de la manera mas eficiente posible
	- requiere un conocimiento global de la topologia de la red
	- se adquiere a traves de un protocolo de ruteo
		![[Pasted image 20250521213900.png]]

## reenvio
funcion correspondiente al nivel IP
para un datagram (originado en el equipo o entrante) debe decidirse, en base a su direccion de destino, hacia que equipo enviarlo
la decision se toma en base a tablas de ruteo
las tablas pueden ser estaticas o dinamicas (si se utiliza un protocolo de ruteo)
un equipo que solo funcione como host no reenvia datagrams
![[Pasted image 20250521214025.png]]


## ruteo
consiste en determinar, desde un nodo dado, como llegar al destino
origen y destino pueden estar en distintas subredes
realizando manualmente o a traves de aplicaciones (protocolos de ruteo)
granularidad:
- datagram 
- circuito virtual
tipos:
- source routing
- hop by hop routing

### componentes de la funcion de ruteo
protocolos de ruteo
- difunden la info necesaria para ruteo
base de datos de info de ruteo (RIB)
- info en cada router acerca de las rutas a los distintos destinos, con cierta(s) metrica(s)
algoritmos de ruteo
- usan la info de la base de datos para determinar (calculo en background) las rutas a seguir para cada destino. El reenvio de los paquetes (en tiempo real) se hara en base a estas tablas (FIB)
![[Pasted image 20250521214326.png]]

## clasificacion de los algoritmos de ruteo
segun donde se toma la decision
- centralizados
- descentralizados
segun como se actualizan las tablas de ruteo
- estaticos
- dinamicos
segun la sensitibilidad a la carga
- adaptativos
- no adaptativos
