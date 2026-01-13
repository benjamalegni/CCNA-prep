- objetivo: el emisor no debe sobrepasar la capacidad del receptor
- complejidad: nivel 2: parametros constantes (demoras, buffers, etc)
- evaluacion
	- recursos utilizados (proceso, buffers)
	- aprovechamiento del canal(eficiencia)
- mecanismos de control de flujo
	- parada y espera
	- ventana
		- fija
		- deslizante
			- de longitud fija
				- retransmision continua (HDLC-REJ-)
				- retransmision selectiva (HDLC-SREJ-)
			- de longitud variable
				- retransmision continua (TCP)
				- retransmision selectiva (TCP con opcion SACK)

### parada y espera
- el emisor envia un bloque y espera respuesta
- utilizable en vinculos bidireccionales alternativos
- simplicidad en el protocolo y uso de un unico buffer
- poco eficiente
- **e = Tb/(Tb * Tok + 2*dp)**

Tb: tiempo de transmision de un bloque
Tok: tiempo de transmision del asentimiento
dp: demora de propagacion

![[Pasted image 20241017102008.png]]

## ventana fija
- un permiso para todos los bloques de la ventana
- mayor capacidad de buffers (W: cantidad de bloques de la ventana)
- puede utilizarse en vinculos bidireccionales alternativos
- mejora la eficiencia de parada y espera
- **e= Tb * W/(Tb * W + Tok + 2 * dp)**
![[Pasted image 20241017102218.png]]

## ventana delizante
- el mecanismo mas utilizado
- capacidad de buffers: W (tamano ventana) en emisor, uno o mas en receptor
- permisos (acumulativos) enviados por cada bloque recibido
- debe disponerse de un vinculo bidireccional simultaneo
- se logra transmision continua de bloques si **2 * dp+Tok <= Tb * (W-1) ****
- mas flexible respecto al tratamiento de errores que ventana fija con asentimiento al comienzo
![[Pasted image 20241017102540.png]]