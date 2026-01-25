### redes con distintas longitudes maximas de paquetes
- diferente longitud de paquetes en cada subred, determinada por:
	- caracteristicas de soporte de transmision
		- protocolo de acceso al medio (ethernet 10mbps)
		- tasa de errores (paquetes de poca longitud para disminuir errores -wifi-)
	- protocolos (long maxima definida de frame)
	- capacidades (buffers) en los sistemas operativos
	- demora de transito de los paquetes en la red
	- distribucion equitativa del uso de la capacidad de transmision
	- limites impuesto por razones de compatibilidad (switched ethernet con ethernet original)

# MTU Y PMTU
MTU: maximum transmission unit: longitud maxima soportada por la subred (ethernet 1500 bytes)
PMTU (path MTU): longitud maxima soportada por el camino origen-destino = minimo de los MTU de todas las subredes recorridas por el datagram
![[Pasted image 20240923083517.png]]
PMTU entre PC1 y PC2: 500 bytes
![[Pasted image 20240923083658.png]]


### alternativas para interworking sobre redes con MTUs diferentes
- uso de la menor longitud de paquete permitida por las subredes (descubrimiento de MTU)
	- no requiere proceso en los routers
	- el origen debe conocer las longitudes maximas de cada subred que se utilizara para llegar al destino (a traves de ICMP)
		- muchos routers restringen el paso de ICMP
		- el camino seguido por los paquetes puede cambiar
- implementacion de fragmentacion y reensamblado
	- el host origen, o un router, al recibir un paquete demasiado largo para la subred de salida, lo divide en varios paquetes de menor longitud (fragmentacion)
	- el host de destino reconstruye el datagram original en base a los fragmentos recibidos (reensamblado)

### descubrimiento de MTU
- el equipo de origen debe determinar el PMTU al destino
- los datagrams emitidos, no deben superar la longitud del PMTU
- como?
	- se envian datagrams indicando que no se permite fragmentacion (bit dont fragment)
	- el origen comienza utilizando longitud de datagrams igual al MTU de su interfaz de salida
	- cuando el MTU de salida de un router es emnor que la longitud del datagram a reenviar, el router notifica del error al origen (ICMP)
	- el origen disminuye la longitud de los datagrams a enviar
	- luego de un tiempo, puede enviar un datagram con mayor longitud, por si la ruta cambio y el PMTU aumento
![[Pasted image 20240923085016.png]]


## fragmentacion IP
- se fragmenta cuando
	- MTU< longitud del datagram
	- el datagram indica que puede fragmentarse (bit dont fragment off)
- la unidad de fragmentacion es el byte
- puede refragmentarse un fragmento
- puede fragmentarse en el origen y en routers intermedios
- solo se produce reensamblado en el destino

fragmentacion: 
- en cada fragmento se copia header IP, cambian flags, long total y fragment offset
- se copian o no las opciones, dependiendo del bit de copia de cada opcion
- todo offset es multiplo de 8 (13 bytes offset vs 16 de long total)

reensamblado:
- se reconoce los fragmentos por los campos identificacion y direccion de origen
- se reconoce el primer fragmento por offset cero
- se reconoce el ultimo fragmento por el bit de flag de ultimo fragmento (more fragments = 0)
- se rearma el dg en base a los fragment offset
- timer para reensamblado (inicia con el primero de los fragmentos recibidos)

## fragmentacion en IPv4 y IPv6
- IPv4
	- fragmentacion en el origen
	- fragmentacion en routers intermedios
	- reensamblado en el destino
- IPv6
	- fragmentacion en el origen
	- los routers intermedios no fragmentan
	- reensamblado en el destino