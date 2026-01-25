fue la solucion definitiva a la falta de direcciones
antes de ipv6 se generaron soluciones temorales de CIDR y NAT

### caracteristicas
- espacio de direcciones ampliado
- header IP mas simple:
	- longitud fija. los routers ya saben cuenta informacion tienen que procesar
	- opciones fuera del header
- incorpora seguridad (IPsec)
- incorpora nocion de flujos. 
- fragmentacion solo en el origen. **routers intermedios no fragmentan**
- autoconfiguracion (SLAAC) **en IPv4 las ip de los hosts se configuran manualmente y ahora se autoconfiguran ni bien se encienden**
- simplicidad y flexibilidad en la administracion
- mejora en mobilidad
- uso de direcciones multicasting
- jumbogramas
- compatibilidad con IPv4!!!!

### datagram IPv6
compuesto de un numero variable de headers
![[Pasted image 20250404055935.png]]
- el primero, header IPv6: **OBLIGATORIO**, reemplaza al datagram IPv4 (sin opciones) numero variable de headers intermedios
- ultimo header (no es necesario que este presente), protocolo encapsulado en IP (ej TCP)
- un router procesa el header IPv6 y opcionalmente, en orden, los demas headers

**ventajas:**
- mayor eficiencia
- mayor funcionalidad

header primero (el obligatorio)
![[Pasted image 20250404060310.png]]
flow label: la etiqueta de flujo sirve para tratar paquetes que requieren un mismo tratamiento de forma que facilite la manipulacion en tiempo real, **los que tengan la misma etiqueta van a ser tratados de la misma manera**

payload length: cantidad de datos enviados **no incluye la longitud de la cabecera, solo los datos que siguen a la cabecera**

hop limit: el numero de saltos de un datagram


### diferencias IPv4 y IPv6
IPv4
- longitud variable: entre 20 y 60 bytes
- direcciones de 4 bytes

IPv6 (header)
- longitud (fija): 40 bytes
- direcciones: 32 bytes
- soporte para headers adicionales
- incremento por cada extension header: multiplo de 8 bytes

mejoras IPv6 respecto a IPv4
- longitud fija de header a analizar por los routers
- no se calcula checksum
- no se fragmenta en los routers intermedios
- identificación de flujo mas eficiente

### diferencias de formato entre ambas versiones
![[Pasted image 20250404061407.png]]


## extension headers IPv6
orden de los headers
- el hop by hop DEBE ir al comienzo (luego del v6)
- se recomienda que para los demás se respete el siguiente orden

(se recomienda que siga el orden de abajo pero no es obligatorio)
tipos de headers
- hop by hop header
- destination options header
- routing header (0 y 2)
- fragment header
- authentication
- encapsulating security payload
- destination options header

## tipos de header IP
![[Pasted image 20250404062000.png]]

### ejemplo secuencia headers
![[Pasted image 20250404062142.png]]

