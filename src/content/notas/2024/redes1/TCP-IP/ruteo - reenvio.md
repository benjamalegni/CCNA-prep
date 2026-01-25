### definicion
el enrutamiento o ruteo es la funcion de buscar un camino entre todos los posibles. se intenta encontrar la mejor ruta posible
- mejor ruta?
- cual es la metrica considerada?
	- menos saltos?
	- mas economico?
	- ...

### ruteo de datagrams
- funcion correspondiente al nivel IP
- para un datagram (originado en el equipo o entrante) debe decidirse, en base a su direccion de destino, hacia que equipo enviarlo
- la decision se toma en base a tablas de reenvio o ruteo
- las tablas pueden ser estaticas o dinamicas (si se utiliza un protocolo de ruteo)
- un equipo que solo funcione como host no reenvia datagrams

### tabla de ruteo
tabla de ruteo
- red destino
- directa o indirecta (D/I)
- proximo router
- interface de solida

rutas:
- directas
- indirectas (hay un router de por medio)
- default

## obtener red
por ej, si la interfaz 1 del router tiene la direccion IP 192.168.1.56 y mascara de red /24
![[Pasted image 20240922174323.png]]
con una mascara /24 como esta, podremos ubicar 256 direcciones IP ($2^8$). quedan reservadas la primera y la ultima (direccion de red y direccion broadcast), por lo cual podremos ubicar 254 interfaces con direcciones de IP distintas dentro de la misma subred


## tabla de ruteo: que pasa si una IP coincide con dos entradas
![[Pasted image 20240922174828.png]]

### tabla de ruteo:minimicacion por sumarizacion
![[Pasted image 20240922175655.png]]
los primeros 23 bits son iguales, entonces se puede correr la mascara a un numero menor (corriendo un bit).
lo que hay que tener en cuenta es que los bits que se muevan armen todas las combinaciones posibles, que tengan todas la representaciones