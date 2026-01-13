### protocolo
conjunto de reglas que definen el formato y orden de mensajes enviados y recibidos entre entidades de la red, y las acciones tomadas al transmitir o recibir mensajes. protocolos humanos: ej.: que hora es?.

protocolos de red:
- maquinas en lugar de humanos
- todas las actividades de comunicación en internet son gobernadas por protocolos

![[Pasted image 20240920121353.png]]

### capas o niveles:
 - cada capa implementa un clase de servicio
	 - un nivel agrupa funciones que corresponden a un mismo grado de abstraccion
	 - ofrece servicios bien especificados al nivel superior, utilizando los que le son provistos por el nivel inferior

![[Pasted image 20240920121802.png]]


## historia modelo TCP/IP
- surge como proyecto de investigacion del departamento de defensa de EEUU y varias univeridades (red ARPANET - 1969-)
- evoluciona dando lugar a la aparicion de los protocolos TCP e IP
- posteriormente, se extiende a varios continentes y al ambito comercial, dando lugar al internet

# niveles
nivel de aplicacion:
corren en espacio usuario, con o sin privilegios de superusuario. referido a diferencias en representaciones internas de datos, interfaces de usuario y otros requerimientos del mismo
- clases de aplicaciones:
	- orientadas a usuarios (FTP,SSH,etc)
	- soporte para la red(SNMP, DNS, DHCP)

nivel de transporte: punta a punta P2P (programas que residen en los equipos que se comunican)
- protocolos mas comunes:
	- TCP (orientado a conexion, no pierde datos)
	- UDP (conectionless, puede perder datos

nivel de red, IP o internet: abarca parte del nivel de red OSI/ISO. envia datos en la forma de paquetes desde un origen a un destino, a lo largo de tantos vinculo como sea necesario aunque los mismos no sean adyacentes
- protocolos:
	- IP: envia la info en la interred
	- ICMP: protocolo de control y diagnostico
	- IGMP: permite la conexion grupal

nivel de enlace: equivalo a los niveles de red, data link y fisico del modelo OSI/ISO (todo lo que se encuentra debajo de IP y sobra la capa fisica) no tratado en el modelo TCP/IP. solo se establece el metodo de transmision de paquetes IP sobre este nivel (IP over ...)

![[Pasted image 20240920122626.png]]

