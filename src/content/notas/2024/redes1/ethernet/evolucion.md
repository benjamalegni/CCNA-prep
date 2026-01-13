# ethernet II / IEEE 802.3
- desarrollada por DEC, xerox e intel
- dan origen a ethernet 2 o DIX ethernet (DEC, intel, xerox)
- normalizada por la IEEE como IEEE 802.3
- ambas normas (ethernet2 e IEEE 802.3) coexisten actualmente
- en un principio, pensada para ambientes tecnicos y oficinas (no se adecuaba a trafico de tiempo real)
- desde sus comienzos, sufrio importantes cambios, tanto en el protocolo como en el nivel fisico
- en todas sus versiones, conservo la compatibilidad con versiones anteriores
- actualmente es la tecnologia mas difundida y utilizada no solo en la LAN

## evolucion de ethernet
1970 - ethernet tuvo sus origenes en xerox PARC, a comienzos de la decada de 1970. El soporte fisico era cable coaxil y la velocidad 2,94 mbps

1983 - aparece la primer norma de la IEEE, (IEEE 802.3). que describe la ethernet de 10mbps, con protocolo CSMA/CD. Esta norma contempla dos tipos de cableado (coaxil), denominados thin(10base2) y tick (10base5)

1990 - 802.3i (10baseT): usa 2 pares UTP, cable categoria 3 o categoria 5. topologia star, con switch o hub

![[Pasted image 20241102115131.png]]

1995 - fast ethernet
- transmision a 100mbps
- topologia star(switches)
- compatible con 10mbps
	- uso de UTP cat 3
	- transmision half duplex y full duplex
- incluye varias normas, sobre UTP y sobre fibra optica
	- 1995 - 802.3u (100base-T): utilizado con UTP cat 5 y transmision full duplex (2 pares)
	- 1995 - 802.3u(100base-FX): y otras versiones de fibra optica

1998 - ethernet 1gbps
- transmision a 1000mbps
- topologia star(switches)
- solo full duplex(half duplex contemplado en la norma pero no utilizado)
- diferentes medios fisicos(UTP, fibra optica)
- al comienzo en el backbone, luego en las pcs
- compatible con instalaciones previas - fast ethernet - (cableado y protocolo)
- 1998 - IEEE 802.3z(1000baseX)(solo fibra optica)
- 1999 - IEEE 802.3ab(1000baseT) UTP 5, 5e y 6(4 pares)

Ethernet 10gbps
- IEEE 802.3ae(2002): 10gbps sobre fibra optica
- IEEE 802.3an(2006)(10baseT): hasta 100 mts con cable cat 6a

Ethernet 40gbps/100gbps
- 2006 formacion del grupo de trabajo higher speed study group (HSSG). Se percibe la necesidad de velocidades de 40 y 100gbps
- normas para fibra optica y par trenzado

IEEE 802.3bz-2016
- objetivo: lograr velocidades intermedias entre 1gbps y 10gbps sobre par trenzado (no se puede correr 10gbps en cat 5e)
- 2.5gbit/s hasta 100m con cat 5e
- 5 gbit/s hasta 100m con cat 6

IEEE 802.3bp-2016 1000base-t1: aplicaciones industriales y automotrices (in-vehicle):
- 1 par trenzado - variantes 15 y 40 mts, con POE


#### aplicaciones
![[Pasted image 20241102120126.png]]


## aspectos en que ha evolucionado ethernet

topologia
- bus(obsoleto)
- star(actual)

medio de transmision y senalizacion
- coaxil (obsoleto)
- UTP(actual)
- fibra(actual)

protocolo
- half duplex(CSMA/CD)(obsoleto)
- full duplex(sin colision)(actual)

dispositivos
- repetidores en el cable(coaxil)(obsoleto)
- hubs(obsoleto)
- bridges(o switches)(actual)















