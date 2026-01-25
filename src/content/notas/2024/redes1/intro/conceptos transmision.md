![[Pasted image 20240920091348.png]]
VS=  velocidad a la que se desplaza la señal electromagnetica en el conductor (cercana a la velocidad de la luz)

L= longitud del conductor, la distancia en los los equipos que se comunican

dp= demora de propagacion de la señal: tiempo que tarda la señal desde que comienza a ser emitidad en un extremo hasta que comienza a llegar al otro

dp = L/VS

dp = L * tiempo por kilometro 

## velocidad de transmision
en una transmision, la representacion de los bits se hace manteniendo un pulso durante cierto tiemop para que sea reconocido por el otro extremo. llamamos a ese tiempo Tiempo de bit(Tb)

![[Pasted image 20240920092220.png]]

Vt= velocidad de transmision, cantidad de bits que podemos enviar en la unidad de tiempo, la expresamos en bits por segundo

Por ejemplo, si el emisor debe mantener el pulso de la señal durante 1 décima de segundo (0,1 s) por cada bit, entonces en 1 segundo se podrán enviar 10 bits:

  
Tb = (1 décima) = 0,1 s      Vt = 1 b / Tb Vt = 1 b / 0,1 s = 10 b/s = 10 bps

Mbps significa millones de bits por cada segundo, entonces 100 Mbps = 100000000 b/s

#### capacidad de buffer del canal = dp * Vt
dp = 5 usec
Vt = 1 Mbps (1000000 b/s)

![[Pasted image 20240920092540.png]]
### tiempo para que un bit sea recibido en el destino: dp + Tb (o dp +1/Vt)

### tiempo para que ==n== bits(enviados uno a continuacion del otro) sean recibidos por el destino: dp + ==n== * Tb (o dp+n/Vt)

### tiempo para que f frames contiguos sean recibidos por el destino: dp + f * (n/Vt)

