### historia
la primer red fue ARPANET para conectar grupos militares, a principios de los 80s fue reemplazada por NSFNet formada por unas pocas universidades conectadas primero es estados unidos y luego en europa.

### definicion
- conjunto de redes interconectadas (interred)
- alcance mundial
- organizacion jerarquica
- tecnologia heterogenea
- basada en TCP/IP
- red de packet switching (envio router a router)
- soporta diferentes tipos de servicios
- diferentes administraciones
- normas(RFCs a cargo por IETF)

# estructura
- redes tier 1 (backbone de internet): conectadas entre si. tendidos de fibra optica en dos o mas continentes. acceso a cualquier punto en la internet
- redes tier 2: acceso limitado. necesitan conectarse a las tiers 1.
- redes tier 3 (ISP): ofecen servicios de conectividad. starlink i.e.:
- usuarios de la internet (organizaciones, empresas y clientes residenciales
cada una de estas redes se les llama ==sistema autonomo:== son manejadas por una misma empresa
hay empresas que tienen presencia en mas de un nivel. fibertel nivel 2 y 3
 ![[Pasted image 20240919065248.png]]
para envio de paquetes por ejemplo para una persona de Tokio, el paquete debe recorres desde tier 3(usuario) hasta tier 1(continentes) y luego pasar por tier2 hasta tier 3 nuevamente a la casa del japones. si fuera dirigido a alguien de tandil posiblemente no haga falta salir de tier 3


- # ISP (internet service provider)
	- proveedor de servicios de internet (venden capacidad de comunicacion)
	- de tamanos variados segun el area que cubren (tier 1,2 y 3)
	
- # conexion entre proveedores
	- peering:
		- acuerdo de intercambio de trafico entre dos ISPs generalmente de la misma magnitud
		- no se cobran por el trafico
		- **tipos de peering**:
			- peering publico: conecta 3 o mas ISPs a traves de un IXP
			- peering privado: conexion de dos ISPs a traves de una linea dedicada
	- transit: acuerdo por el cual un ISP de mayor jerarquia cobra a otro por servicios de trafico

- # tier: red o SA de un ISP capaz de conectarse con otros
	- tier1: alcance internaciones (aprox 10 empresas), generalmente se conectan via peering
	- tier2: alcance nacional, requieren servicio (transito) de los tier1
	- tier3: requieren servicio de los tier2, ofrecen conectividad a los usuarios

- ### sistema autonomo (SA): conjunto de redes bajo la misma administracion
- ### a nivel de los ISPs, solo se conocen los SA 

- # IXP (internet exchange point)
	- infraestructura fisica que permite la conexion de SA diferentes
	- compuesto de switches (generalmente ethernet)
	- propagacion de rutas(BGP)
	- tipos:
		- costos compartidos por los ISPs
		- provistos por terceros
	- ventajas:
		- reduccion de costos
		- menor demora de transito
		- conectividad regional/nacional independiente de links internacionales
	- servicios adicionales:
		- root server mirrors
		- DNS servers
		- web caches
		- route servers
	- en argentina: ==CABASE== (camara argentina de internet)

- # NAP (network access point)
	- termino utilizado hasta hace algun tiempo para referirse a los IXP
	- marcaron la transición entre el backbone NSFNet y la actual internet

### IXPs CABASE
 - 32 IXPs
 - 485 miembros
 - 66% de penetracion
 - 21 millones de usuarios finales
 - 40,67 Mbps velocidad promedio
 - 2794 localidades con internet
 - 859 localidades con fibra óptica

### acceso a internet:
![[Pasted image 20240919071838.png]]

## tipos de acceso
last mile - WIMAX:
![[Pasted image 20240919072231.png]]

last mile - xDSL:
![[Pasted image 20240919072350.png]]
se colocaba un modem en cada uno de los extremos de la linea. había un modem que transformaba la senal analógica y splitter dividia la senal. se podía con una sola linea transmitir la senal de modem y la senal de voz

last mile - CableModem
![[Pasted image 20240919072726.png]]

# alternativas ISPs
(lado izquierdo) non propietary ISP
![[Pasted image 20240919072814.png]]

# principales soportes de comunicacion de internet
entre proveedores:
- cable submarino (fibra optica)
- redes terrestres (fibra optica)
- satelites geoestacionarios (==solamente se usa si no es posible la comunicacion mediante fibra optica==)
- starlink??
entre proveedores y usuarios (redes de acceso o last mile)
- cablemodem
- ADSL
- WIMAX
- 4G