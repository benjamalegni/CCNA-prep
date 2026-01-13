
- mascara de red de tamano variable
- se utiliza cuando se desea dividir un red en subredes de distintos tamanos
- la mascara puede variar de una red a otra, es decir, la parte red y host no es la misma para todas las subredes
- se debe tener especial cuidado para no solpar las direcciones de las subredes

- uso mas eficiente del espacio de direcciones
	- posibilidad de asignar un numero de direcciones acorde al numero de equipos de la red, en lugar de asignar una clase (ej.: C completa)
- requerimientos
	- algoritmo "longest match prefix" para reenvio
	- protocolos de ruteo que intercambien prefijos de red

- reglas para la asignacion de direcciones a las redes
	- dado un bloque de direcciones contiguas:
		- es posible dividir en bloques de $2^k$ direcciones, identificados por una red de prefijo (32-k). por ejemplo, para k=4, prefijo 28 con 16 direcciones de red
		- la primera direccion es multiplo de $2^k$, es la direccion de red
		- el bloque de direcciones asignado, puede dividirse recursivamente, hasta llegar a bloques de prefijo 30
	- procedimiento:
		- ordenar las redes de mayor a menor cantidad de direcciones necesarias
		- desde la primer direccion del bloque, asignar una cantidad de direcciones contiguas a la primera red. esta cantidad debe ser la minima potencia de dos tal que alcance para las direcciones que se necesitan en esa red
		- desde la siguiente direccion libre, realizar el mismo procedimiento para la siguiente red

## ejemplol VLSM
Se tiene la red donde la Oficina 1 hay 14 PCs, en la Oficina 2 hay 10 PCs y que en la Oficina 3 hay 5 Pcs. La red disponible es la 192.168.160.0/24 (192.168.160.0 - 192.168.160.255)

- ##### paso uno: ordenar las redes de mayor a menor cantidad de direcciones necesarias
	1. oficina 1: 14 PCs
	2. oficina 2: 10 PCs
	3. oficina 3: 5 PCs
	4. red e/ router: 2 router

- #### paso 2: calcular cantidad de IP necesarias
	1. oficina 1: 14 PCs + 1 base + 1 broadcast + 1 router = 17
	2. oficina 2: 10 PCs + 1 base + 1 broadcast + 1 router = 13
	3. oficina 3: 5 PCs + base + 1 broadcast + 1 router = 8
	4. red e/router: 2 router + 1 base + 1 broadcast = 4

- #### paso 3: pasar a potencias de 2:
	1. $2^5=32$ -> 192.168.160.0/27
	2. $2^4=16$ -> 192.168.160.32/28
	3. $2^3=8$ -> 192.168.160.48/29
	4. $2^2=4$ -> 192.168.160.56/30

 

| Nombre    | Base           | Broadcast      | Másc | Rango Asig. |
| --------- | -------------- | -------------- | ---- | ----------- |
| Oficina 1 | 192.168.160.0  | 192.168.160.31 | /27  | .1 a .30    |
| Oficina 2 | 192.168.160.32 | 192.168.160.47 | /28  | .33 a .46   |
| Oficina 3 | 192.168.160.48 | 192.168.160.55 | /29  | .49 a .54   |
| Router    | 192.168.160.56 | 192.168.160.59 | /30  | .57 a .58   |
