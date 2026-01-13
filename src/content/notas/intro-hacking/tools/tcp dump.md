# Herramienta: tcpdump
**Descripción:** Analizador de paquetes de red de línea de comandos. Permite interceptar y mostrar el tráfico que pasa por una interfaz específica.

### Comandos y Uso
- `tcpdump -i wlan0 -w captura.cap -v`: Captura el tráfico de la interfaz `wlan0` y lo guarda en un archivo compatible con Wireshark.

### Parámetros del texto
- `-i`: Especifica la interfaz de red.
- `-w`: Escribe la salida en un archivo `.cap` o `.pcap`.
- `-v`: Verbose.

### Parámetros adicionales útiles
- `-c <número>`: Detiene la captura después de recibir N paquetes.
- `-A`: Muestra los paquetes en formato ASCII (útil para ver texto plano).
- `port 80`: Filtra para capturar solo tráfico del puerto 80.