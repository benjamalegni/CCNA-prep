# introduccion

## que es una red de computadora?

un red en generico es un conjunto de nodos (hosts) conectados mediante links

en las redes de computadoras, cada nodo es una estacion que envia y/o recibe datos (computadoras o dispositivos) y los canales de comunicacion son los medios que transportan datos, de un dispositivo emisor a otro receptor. Ademas, para que la red funcione, se requiere software especializado para majenar la comunicacion de datos

## componentes de una red de computadoras

- emisores y/o receptores: son las computadoras o dispositivos perifericos que envian y/o reciben datos. son los nodos de la red
- canales de comunicacion: un canal puede ser un medio fisico (cable) o un medio inalambrico (frecuencia de radio especifica)
- protocolo de comunicacion: es un conjunto de reglas, normas y procedimientos que garantizan la integridad y correcta secuecia de los datos transmitidos
- mensajes: son el conjunto de datos que se envian y reciben, que en una red se transmiten a traves de paquetes

## red, interredes y sistemas distribuidos

- sistema centralizado: procesamiento y almacenamiento en el equipo central, acceso a traves de terminales. En un comienzo, limitados al area local (i.e.: IBM/360 con terminales). Actualmente, servidores accedidos via internet. Una de las primeras cosas que se uso fue el uso de las terminales a traves de las lineas telefonicas, luego las terminales comenzaron a tener mas capacidad y ese sistema ya no es tan efectivo
- red: conjunto de computadoras autonomas interconectadas. Sistema en el que las funciones se hallan distribuidas en varios lugares fisicos (ej. red ethernet)

una definicion de red es un sistema en que los distintos equipos estan distribuidos en varios lugares que forman la red

interred es un conjunto de redes interconectadas, por ej un modem y una red wifi

sistema distribuido

## beneficios de redes de computadoras

permiten compartir recursos

es posible duplicar los recursos

- confiabilidad
- balanceo de carga

disminucion de costos de hardware

medio de comunicacion

acceso a informacion remota

escalabilidad

flexibilidad

# clasificacion de redes de computadoras

por alcance geografico:

- PAN: (personal area network) conexion de perifericos a la pc, generalmente usa bluetooth
- LAN (local area network) ej ethernet, wifi. son privadas, area limitada, tecnologia de transmision mas sofisticada
- MAN (metropolitan area network) ej tv por cable, wimax. cubren areas mas extensas, tecnologia similar a LAN y mayor cantidad de usuarios
- WAN (wide area network) ej telefonia celular, redes satelitales. areas mayores(pais), gran cantidad de usuarios, tecnologias de menores costos y performance
- Interredes (ej internet) tecnologias diversas, cubren todo el planeta

por tecnologia de transmision:

- punto a punto
- acceso multiple

por el medio de comunicacion que utilizan

- cableado
- inalambrico

tipos de redes segun alcance

| distancia entre procesadores | procesadores ubicados en el mismo | ejemplo |
| --- | --- | --- |
| 1m | metro cuadrado | PAN |
| 10m | cuarto | LAN |
| 100m | edificio | LAN |
| 1km | campus | LAN |
| 10km | ciudad | MAN |
| 100km | pais | WAN |
| 1000km | continente | WAN |
| 10000km | planeta | internet |

### redes multiacceso(todos reciben las emisiones)

- problemas de escalabilidad
- ruteo muy simple
- cumunicacion grupal mas simples
- complicaciones para administrar el uso del canal
- problemas de seguridad
- ejemplo wifi, ethernet original
- 

### redes punto a punto (circuit switching/packet switching)

- equipos conectados de a pares
- ruteo complicado
- mayor seguridad
- escalabilidad
- mayores demoras
- generalmente cubren areas mas extensas
- ejemplo: switched ethernet, internet