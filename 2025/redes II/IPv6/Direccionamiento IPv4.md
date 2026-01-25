## problema de direccionamiento classful
prefijos de longitud fija, provoca un uso muy ineficiente en el espacio de direcciones
crecimiento acelerado de la internet, evidencia la falta de escalabilidad de direccionamiento (agotamiento de clases B, incremento de tamano de tablas de ruteo al utilizar direcciones de clase C)
solucion temporal:
- prefijos variables (classless)
- asignacion racional de direcciones (CIDR)
- NAT

### CIDR y NAT
CIDR propone un uso racional de las direcciones IPv4
- cambio en la estructura de las direcciones IPv4(classful a classless)
- reasignacion de direcciones
- asignacion topologica de bloques de direcciones ex clase C

NAT permite compartir una direccion IP public entre varios equipos
- NAT44:
	- realizado en el route de entrada a la intranet del usuario
	- el usuario final obtiene una IP publica
- NAT444 (CGNAT):
	- realizado por el ISP
	- el usuario final no adquiere una IP publica


### crecimiento de Host en internet (1994-2019)
![[Pasted image 20250321150359.png]]

## asignacion de direcciones globales
![[Pasted image 20250321150433.png]]![[Pasted image 20250321150441.png]]



## penetracion IPv6
![[Pasted image 20250321150504.png]]