## estructura de una direccion IPv4
- direccionamiento jerarquico: <prefijo,host>
	- *prefijo* (indica la red a la que pertenece la direccion)j:
		- conjunto de bits contiguos a la izquierda
		- utilizado por los routers para determinar el camino a la red, para direcciones no locales
	- *sufijo* (dentro de la red, identifica el host):
		- los bits restantes ubicados a la derecha
		- utilizado para ubicar el equipo dentro de la red a la que pertenece

- alternativas para especificar la longitud del prefijo
	- direcciones classfull(**obsoleto**)
		- longitud determinada por los primeros bits de la direccion (clase de direccion A, B, etc)
	- direcciones classless
		- **longitud del prefijo no incluida en la direccion IP**
		- **se indica explicitamente en "/" seguida de la cantidad del bits del prefijo**
		- **ejemplo (una clase C) 192.168.4.0/24**


## clases de direccionamiento: classful addressing
dada una direccion IP, podemos determinar el host y la red por ejemplo:
192.169.2.1
indica: red: 192.169.2.0 y host 1 dentro de esa red

- los routers operan solo con determinadas longitudes de prefijos (8,18 y 24 bits, dadas por la clsae de la direccion IP)
- los protocolos de ruteo no transmiten informacion acerca de los prefijos
- para rutear un datagram, se busca en la tabla de rutas una direccion de red que coincida con el prefijo de la direccion de destino

### problemas del direccionamiento classful
- prefijos de longitud fija (clases), provoca un uso ineficiente en el espacio de direcciones
- crecimiento acelerado de la internet, evidencia de la falta de escalabilidad del esquema de direccionamiento (agotamiento de clases B, incremento del tamano de tablas de ruteo al utilizar direcciones de clase C).
- **soluciones:**
	- estos problemas se solucionan a corto plazo en el contexto de IPv4
		- prefijos variables (classless)
		- asignacion racional de direcciones (CIDR)
	- definitivamente solucionado en IPv6

## clases de direccionamiento: classless addressing
- dada una direccion IP, no podemos determinar el host y la red (se necesita el prefijo)
- los routers aceptan longitudes de prefijo variables
- los protocolos de ruteo transmiten informacion de longitud de prefijo junto con cada direccion
- para rutear un datagram, se utiliza el criterio de ruta mas especifica ("longest match" al buscar en las tablas)
![[Pasted image 20240921185707.png]]

### direcciones IPv4: mascara
#### mascara de red: su proposito es indicar que parte de la direccion IP es el numero de la red y que parte es la correspondiente al host

## classless inter domain routing (CIDR): origen
el crecimiento no provisto de la internet produce la siguiente situacion:

- redes clase A, muy pocas y reservadas a grandes instituciones
- asignacion de clases B a empresas y usuarios normales
	- uso ineficiente del espacio de direcciones (clases B cada red con 65534 hosts)
	- agotamiento de las direcciones clase B (solo hay 16382)
- necesidad de asignacion de direcciones clase C, que podria provocar:
	- crecimiento inmanejable de tablas de ruteo (memoria y proceso)
	- consumo excesivo de vinculos de transmision debido a la propagacion de informacion

## CIDR: (RFC 1519,1993) propone
- asignacion jerarquica y topologia de grupos de direcciones de clase C
- direcciones classless: la division entre la parte de la direccion que corresponde a la red y al host es variable, indicada por una mascara  o prefijo (ej 200.2.2.2/24)
- los routers pueden "resumir" info respecto de un grupo de direcciones y propagar la info resumida (aggregation)
- en las tablas de ruteo, se almacena la informacion resumida
- para reenvio, los routers soportan el mecanismo de matching mas especifico (longest match) ya que es utilizado en subnetting


Asignación propuesta para las direcciones clase C (1993)

- Direcciones 194.0.0.0 a 195.255.255.255 Europa
    
- Direcciones 198.0.0.0 a 199.255.255.255 América del Norte
    
- Direcciones 200.0.0.0 a 201.255.255.255 América Central y América del Sur
    
- Direcciones 202.0.0.0 a 203.255.255.255 Asia y el Pacífico
    

## classless addressing
subnetting (VLSM - variable length subnet masking)
![[Pasted image 20240921190938.png]]

supernetting (sumarizacion)
![[Pasted image 20240921191016.png]]

### sumarizacion
classless: me asignan el bloque equivalente a las 256 redes clase C
anunciamos: 201.1.0.0/16
![[Pasted image 20240921191104.png]]

