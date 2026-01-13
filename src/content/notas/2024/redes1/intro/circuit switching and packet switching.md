# circuit switching and packet switching

## circuit switching/packet switching

organizacion basada en circuitos virtuales

- establecimiento del circuito (conexion)
- se asignan y reservan recursos (buffers y capacidad en los canales) para cada conexion
- envio de la info por el camino establecido
- en condiciones normales, no se pierde info
- no se adapta a fallas(se debe reestablecer la conexion)

organizacion basada en datagramas

- no se establece conexion entre las partes
- no se reservan recursos
- se comparten buffers y capacidad de las lineas de transmision
- puede perder info
- se adapta a fallas y cambios en la topologia
- es adecuado para la comunicacion entre equipos (generalmente en rafagas)

### circuit switching (circuito virtual)

la idea detras de los circuitos virtuales (circuit switching) es evitar la necesidad de elegir una nueva ruta para cada paquete enviado

cada paquete lleva un identificador que indica a que circuito virtual pertenece el mismo

### packet switching

por ej con un mensaje que es 4 veces mas largo que el tamano de un paquete, hay que dividirlo 4 veces. el host 1(en que envia) va a enviar cada uno de estos paquetes por turnos al router A, a su vez cada router tiene una tabla interna para donde enviar los paquetes para cada uno de los posibles destinos y puede variar.

puede ser que uno de los paquetes se envie por una ruta distinta

esta situacion puede ocacionar que los paquetes no lleguen al destino con el mismo orden que fueron emitidos

cada uno de los nodos lo que hace es almacenar un paquete y en el tiempo siguiente enviarlo, como una fila

### tiempo de envio de un paquete: bits del mensaje/velocidad de transmision

ejemplo para tiempo de transmision de un frame ethernet de 1518 bytes en una red de 100MBps, t=1518bytes * 8 bits/byte / 100000000 bits/segundo = 0,000012144 segs = 12,144 microsegundos