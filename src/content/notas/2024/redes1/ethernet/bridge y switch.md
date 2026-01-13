# bridges
- relays a nivel 2(MAC)
- reconocen, analizan y modifican frames MAC
- funciones:
	- recibe frame MAC de LAN_1 por un port
	- analiza encabezamiento
	- determina por que port enviar
	- realiza conversiones necesarias (en caso de los los MACs sean distintos)
	- genera nuevo encabezamiento para LAN_2 (si los MACs son distintos) y envia
![[Pasted image 20241104064049.png]]


##### mejoras de los switches
- mayor throughput
- mayor flexibilidad
- mas ports, menor costo por port
- soporte full duplex
- soporte VLANs

### ventajas
- integracion de LANs ya instaladas pertenecientes a un mismo propietario
- conexion de LANs separadas por distancias mayores a las soportadas por el medio fisico
- balanceo de carga en una LAN para evitar saturacion
- confiabilidad (evitar la caida de la red completa debido a una falla)(STP)
- seguridad(placas en modo promiscuo, filtrado de frames(ACL))

![[Pasted image 20241104064440.png]]

### arquitectura de los switches
![[Pasted image 20241104064455.png]]

## algunas funciones y caracteristicas de los switches
- Access Control List 
- link aggregation
- port mirroring
- port density
- blocking/no blocking 
- buffers
- proceso de los frames (cut through, etc)
- SNMP
- VLAN
- spanning tree
- Mnultirate 
- PoE
- ruteo
- tabla direcciones MAC

### access control lists
- permiten darle un trato especial al trafico que recibe el switch
- un ACL es un conjunto de reglas que debe cumplir un frame
- se dejan pasar los frames a traves del port de entrada o no, segun cumplan las condiciones especificadas por las reglas
- tipos de condiciones
	- nivel 2: MACs(origen y destino), tipo de protocolo(ethertype)
	- nivel 3: direcciones IP (origen y destino)
	- nivel 4: ports (TCP o UDP) de origen y destino
- se aplican a paquetes entrantes a ports o a interfaces VLAN
- solo un ACL(conjunto de reglas) en un port o interfaz

## link aggregation
- creacion de un link logico a partir de varios links fisicos
- protocolo LCAP(link aggregation control protocol)(802.2ad)
- protocolo PAgP(port aggregation protocol) de cisco (fast etherchannels)
- usos:
	- ADSL
	- wireless
	- ethernet
	- etc
![[Pasted image 20241104065121.png]]
- aplicaciones
	- switch-switch
	- router-router
	- switch-server
	- (soporte en linux: channel bonding)
- ventajas
	- mayor throughput
	- aumentar throughput sin necesidad de cambio de equipo (p.ej 100mbps a 1gbps)
	- redundancia para confiabilidad ante fallas
	- balanceo de carga
	- flexibilidad(uso de links ya instalados)
	- respecto de aggregation estatica
		- no susceptible a errores de configuracion
		- recuperacion automatica ante falla
- caracteristicas
	- los links fisicos no son vistos por los niveles superiores
	- uso de una unica MAC para el link logico
	- algoritmo de distribucion de paquetes entre los links fisicos
		- round robin
		- hashing por nivel 3 o 4(para paquetes en orden)
- restricciones
	- conecta ports de la misma velocidad
	- conexion entre solo 2 equipos


## port mirroring
- utilizado para analisis de trafico
- consiste en redirigir el trafico de un port determinado, al port que actua como mirror
- gran parte de los switches lo soportan
- conocido como SPAN(switch port analizer - CISCO)

- desventajas
	- no captura errores de nivel 1 ni 2
	- descarta paquetes si el trafico en el vinculo full duplex analizado satura al del mirror - analizador
	- proceso adicional en el switch
- ventajas
	- flexible
	- bajo costo
![[Pasted image 20241104065655.png]]
![[Pasted image 20241104065703.png]]


## port density
- port density: cantidad de ports soportada por el switch
- consideraciones para el uso de un switch de alta densidad o varios de baja densidad
	- demora introducida por cada switch
	- costo
	- espacio fisico
	- alimentacion
	- nivel de arquitectura (access, distribution, core)

## blocking /no blocking
- non-blocking: cuando el soporte de comunicacion interno del switch es capaz de un throughput igual a la suma del maximo posible del throughput de todos los ports funcionando simultaneamente
- ej: el switch de 8 ports de 100mbps -> 1.6 gbps
- no es el unico factor de performance (p.ej, buffers)
- muy pocas veces se justifica su mayor costo
- raras veces la tasa de uso de un port es de 100%

## buffering
- casos en que se requiere almacenar frames en buffers
	- diferente velocidad entre ports de entrada y de salida
	- varios ports de entrada enviando por uno de salida
	- colisiones (half duplex) en el port de salida
	- control de flujo (MAC control) en el port de salida
- tipos de buffering
	- buffers compartidos
	- buffers por cada port

## recepcion/almacenamiento/envio del frame
- cut-through
	- almacenan solo los primeros bytes del frame
	- baja demora
	- uso limitado
- store and forward
	- almacenan la totalidad del frame
	- mas simples
	- mayor funcionalidad
	- mayor demora
	- demora dependiente de la longitud del frame
- fragment-free
	- requiere recibir los primeros 64 bytes
	- evita fragmentos, deja pasar errores CRC

## PoE (power over Ethernet)(802.3af)
- objetivo: alimentar dispositivos ethernet a traves del par trenzado (AP, camaras, telefonos IP, etc)
- diferentes potencias y diferentes distancias
- alternativas para alimentacion
	- uso de conductores no usados para datos
	- uso de conductores de datos(phantom power)(permite PoE sobre 1000baseT)
- dispositivos
	- endspan injector (switch PoE)
	- midspan injector
	- PoE splitter
	- powered device(soporta o no PoE)
- evolucion
	- 802.3af(2003), provee 13 W
	- 802.3at (2009), provee 25.5 W
	- 802.3bt(2018), provee 71.3 W
![[Pasted image 20241104070724.png]]
![[Pasted image 20241104070731.png]]

## ruteo
 - funciones relativas al ruteo de frames
	 - **learning:** aprende direcciones MAC(backward learning)
	 - **flooding:** reenvio de frames con direccion no conocida
	 - **filtering:** no reenviar frames cuando llegan por un port hacia ellos
	 - **forwarding**: reenvio de frames con direcciones conocidas
	 - **aging:** duracion limitada de las entradas en la tabla de ruteo

# diseno jerarquico
- ventajas
	- escalabilidad
	- redundancia
	- administracion y mantenimiento
	- seguridad
	- performance
- consideraciones a tener en cuenta
	- diametro
	- agregado de ancho de banda

# topologias redundantes
- topologias con switches y/o links adicionales
	- provocan que haya mas de un camino posible entre un par de equipos (caminos duales)
	- ventajas
		- eliminacion de puntos de falla
		- mayor tiempo de uso util de la red
	- posibles problemas
		- inundacion de la red con frames multicast o broadcast
		- duplicacion de frames
		- inestabilidad en las tablas de ruteo de los bridges
	- solucion:
		- limitar la topologia de la red a una topologia ficticia de tal manera que solo haya un unico camino entre cualquier par de equipos
	- procedimiento:
		- utilizacion del algoritmo spanning tree
![[Pasted image 20241104071303.png]]

# spanning tree protocol
- algoritmo que transforma una red fisica arbitrariamente conectada en una red logica sin caminos duales - Radia Perlman (DEC), 1985
- especificado en la norma IEEE 802.1d en 1990
- los switches (bridges) intercambian mensajes de control (B-PDUs)
- 2001: rapid spanning tree protocol(IEEE 802.1w). acelera convergencia (de entre 30 y 50 segs a menos de 6 segs)
- otras variantes (IEEE y cisco) para VLANs

# translational bridges
conectan dos LANs con diferentes MACs: los mas comunes: wifi-ethernet
![[Pasted image 20241104072111.png]]
#### ethernet a wifi
1. chequear integridad del ethernet: descartar si error
2. chequear si el destino del frame ethernet es una estacion asociada al AP. descartar si no lo es
3. agregar al frame un header SNAP con el ethertype del frame ethernet
4. poner el frame en cola de transmision, asignar un numero de secuencia(sequence control field)
5. fragmentar si es necesario
6. si se requiere proteccion, cifrar el contenido de cada segmento
7. transformacion del header ethernet en address 1(origen)
	1. copiar direccion de destino ethernet en address 1(origen)
	2. copiar direccion BSSID en address 2 (MAC que envia en el medio wireless)
	3. copiar direccion de origen ethernet en address 3
	4. colocar valor estimado de tiempo de transmision en duration; colocar valores adecuados en los demas bits del campo frame control
	5. recalcular el FCS para cada fragmento del frame 802.11

#### wifi a ethernet
1. chequear integridad del frame 802.11 (PLCP header, FCS, etc). descartar si error
2. chequear si address 1 del frame es la MAC del AP(BSSID). descartar si diferente
3. chequear si frame es duplicado y descartar si lo es
4. desencriptar el frame
5. determinar si es un fragmento y reensamblar
6. transformacion del header 802.11 en el header ethernet
	1. copiar direccion de destino 802.11 (address 3) en direccion destino ethernet 
	2. copiar direccion de origen 802.11 (address 2) en una direccion de origen ethernet
	3. copiar el campo ethertype del frame 802.11 (SNAP) en el ethertype del ethernet
	4. recalcular el FCS para el frame ethernet
no se hacen consideraciones sobre calidad de servicio



# VLANs: virtual local area networks
- VLAN (IEEE 802.1Q): mecanismo que permite la creacion por software de redes virtuales de nivel 2
- switches especiales con capacidad VLAN
- compatibilidad con bridges sin capacidad VLAN

- facilitan la administracion de grupos logicos de PCs que deban comunicarse entre si
	- movimiento fisico de equipos
	- cambios de VLAN por parte de los equipos
	- altas y bajas de equipos en las VLANs
- se reduce el dominio broadcast al separar en VLANs
- el dominio broadcast virtual puede extenderse a diferentes redes fisicas (trunking)

- VLANs definidas en funcion de los ports del switch
- base de datos de filtrado: info configurable para definir las VLANs
- proceso de frames MAC: reglas que indican como se procesara cada frame MAC (p.ej si se descarta, o acepta, y por que port(s) se envia)
- PVID: identificador de VLAN nativa para cada port
- el switch no comunica ports que pertenecesn a diferentes VLANs
![[Pasted image 20241104073250.png]]
## comunicacion entre VLANs
- a traves de un relay de nivel 3 (router)
	- switches con funciones de nivel 2 solamente: router externo
		- con interfaces fisicas a cada VLAN
		- con una unica interfaz fisica soportando trunking
	- dispositivos con funciones de switch y router; router "interno" al switch, interfaces logicas a cada VLAN

## conformacion de grupos en VLANs (membership)
- asignacion por ports
	- estatica
	- eficiente
	- no flexible
	- cada port es de uso exclusivo de una VLAN
- asignacion por direccion MAC
	- flexible
	- dinamica
	- problemas con la asignacion inicial MAC-VLAN
	- problemas de seguridad ( clonado de MACs)
- asignacion por informacino del nivel 3 (protocolo, red IP, etc)
	- flexible
	- baja performance
	- un equipo puede moverse sin reconfigurar su IP

## VLANs abarcando mas de un switch
- conexion fisica de ports asignados a cada VLAN
	- complicado de administrar
	- propenso a errores
	- ports dedicados por VLAN
	- tecnicamente posible, pero no recomendado
![[Pasted image 20241104073758.png]]
- trunking
![[Pasted image 20241104073818.png]]


# trunking
- access link: vinculo switch/equipo final, frames sin tag
- trunk port: puerto configurado para trunking , de alta velocidad (100mb, 1gb)
- trunk link: vinculo entre switches (entre dos trunk ports), frames con tag, de varias VLANs
- tag indica la VLAN del frame (IEEE 802.1Q, cisco ISL - inter switch link)
- trunk protocol: protocolo para configuracion y administracion de VLANs (cisco VTP - VLAN trunk protocol)
- PVID: port VLAN ID (VLAN activa)
![[Pasted image 20241104074044.png]]


## tagging![[Pasted image 20241104074054.png]]

# alcance de una VLAN
- end to end VLAN
	- los equipos de la VLAN pueden estar distribuidos en la intranet 
	- provee flexibilidad
	- riesgo de cargar el nivel core
	- requiere trunking 
- local VLAN
	- los equipos se encuentran fisicamente cercanos entre si
	- mejora eficiencia (separa dominios broadcast)
	- mejora seguridad
	- permite ubicacion estrategica de servidores