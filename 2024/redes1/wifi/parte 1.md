
# redes wireless
- redes en las que los equipos estan conectaos a traves de vinculos de radio
- cubren distintas areas geograficas (PAN, LAN, MAN, WAN)
- diferentes calidades de servicio
- pueden reemplazar o complementar a las instalaciones cableadas
	- alta tasa de errores
	- demora de propagacion variable (p.ej wifi vs satelite)
	- su caracteristica mas importante es permitir movilidad

## portabilidad y movilidad
portabilidad:
- un equipo puede conectarse a la red desde distintos lugares fisicos
- para desplazarse de un lugar a otro, es necesario desconectarse de la red
- puede ser soportado por conexion por cable o por radio

movilidad:
- un equipo puede desplazarse geograficamente sin necesidad de interrumpir su conexion
- requiere conexion por radio
- se debe distinguir entre:
	- movilidad a nivel 2 (wifi)
	- movilidad a nivel IP

![[Pasted image 20241104074746.png]]

# ventajas y desventajas de las redes wireless
ventajas:
- movilidad
- menores costos
- facilidad de instalacion
- se eliminan los problemas asociados al cableado
- menor tiempo de instalacion
- flexibilidad

desventajas:
- disminucion de la potencia de la senal
- interferencias:
	- producidas por objetos externos entre las redes cercanas
- seguridad
- autonomia de los equipos
- ancho de banda limitado

# tipos de redes wireless segun su alcance
- bluetooth:
	- normalizado por IEEE 802.15
	- red de area personal(PAN)
	- uso: conexion de perifericos a la PC
- wifi(wireless fidelity):
	- normalizado en la familia de normas
	- IEEE 802.11
	- red de area local(LAN)
	- uso: reemplazo o complemento de ethernet en el desktop y en el backbone
- wimax (worldwide interoperability for microwave access)
	- normalizado en la IEEE 802.16 (a y e)
	- red de area metropolitana (MAN)
	- uso: acceso a internet (ultima milla), comunicaciones multimedia, telefonia, etc
- redes basadas en telefonia celular (WAN)
	- tecnologias de acceso a la estacion base
	- uso: telefonia, acceso a internet, otros servicios
	- varias tecnologias de acceso movil-base


## IEEE 802.11 - WIFI
- wifi (wireless fidelity): familia 802.11:
	- usos: oficinas, aeropuertos, etc
	- desde el equipo, como placas ethernet
	- frecuencias de 2,4 y 5 ghz
	- velocidades: 11mbps, 54mbps, 600mbps, gbps(ac,ax)(throughputs menores)
	- standards:
		- IEEE:
			  define especificaciones
			  asegura interoperabilidad
			  normas: 802.11 original,
			  802.11a,802.11b,802.11g,802.11n,802.11ac, etc
		- wireless fidelity alliance
			- certificacion de conformance
			- promocion del uso de la tecnologia

## arquitectura 802.11
- logical link control: comun a todas las normas IEEE 802
- MAC: implementa MACA
- nivel fisico:
	- PLCP: physical layer convergence procedure sublayer
		- sincronizacion
		- indicaciones de estado de canal
	- PMD: physicdal medium dependent sublayer
		- modulacion, demodulacion

![[Pasted image 20241104075832.png]]