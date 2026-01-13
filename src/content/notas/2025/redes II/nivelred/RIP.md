intercambio de tablas
para simplificar no se contempla las redes punto a punto. Se considera un intercambio de tablas cada 30 seg
![[Pasted image 20250525225959.png]]
![[Pasted image 20250525230006.png]]
![[Pasted image 20250525230034.png]]

## proceso de entradas - actualizacion
- vector de elementos  de costo del nodo vecino al destino: costo, destino(C,D)
- link de recepcion de la tabla LR
- entrada en tabla: destino, costo, link de recepcion (D,CT,LT)
por cada elemento que me informan
- si no existe entrada para D
	- calcular costo CN=C + costo(LR)
	- agregar entrada (D,CN,LR)
- si existe entrada
	- calcular costo CN = C + costo(LR)
		- if CN < CT,
			- modificar costo y link en la entrada (D,CN,LR)
		- elseif CN>CT && LR == LT,
			- modificar costo en tabla (D,CN,LT)

## caida de un link - efecto rebote -> count to infinity
![[Pasted image 20250525230433.png]]
![[Pasted image 20250525230443.png]]
![[Pasted image 20250525230452.png]]
![[Pasted image 20250525230501.png]]
esto se conoce como efecto rebote y dependiendo de la topologia puede quedar ciclando hasta infinito


### evitar count to infinity
**posible solucion**:
poner un limite dando un valor (de metrica) a infinito, por ejemplo poner de valor limite 6

**problemas**
restringe el limite de la red
produce inconsistencai hasta llegar ese valor


### split horizon
tecnica para minimizar bouncing effect
modificacion al algoritmo:
- si el nodo A esta enviando paquetes al nodo X a traves del nodo B, B no podra tratar de llegar a X a traves de A

dos formas de implementarlo
1. un nodo A que esta enviando paquetes a otro X a traves de uno B, no anunciara a B (por ese vinculo) ruta a X (tecnica conservadora, basada en timeouts de entradas)
2. un nodo A que esta enviando paquetes a otro X a traves de B, anunciara por ese vinculo un costo infinito a X (split horizon with poisonus reverse). Tecnica mas agresiva, inmediatamente cancela la ruta

### triggered updates
esta tecnica no espear al proximo intercambio para enviar la informacion. Ante un cambio en su tabla envia ese cambio a los vecinos
- aceleran tiempos de convergencia del algoritmo
- complementan al intercambio periodico de tablas
- pueden dar lugar a un volumen de trafico considerable (dependiendo del estado de las tablas)

### timers que se configuran en RIPng
- intercambio de informacion de ruteo: 30segs
- validez de una ruta 180segs
- garbage collection: 120segs
- timer para triggered updates: al azar, entre 1 y 5 segs