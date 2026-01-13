# Herramienta: arp-scan
**Descripción:** Escanea la red local utilizando paquetes ARP para descubrir dispositivos conectados, incluso si tienen firewalls que bloquean el ping.

### Comandos y Uso
- `arp-scan -I eno2 --localnet`: Escanea todos los dispositivos en la red local usando la interfaz `eno2`.

### Parámetros adicionales útiles
- `--file <lista>`: Lee direcciones IP desde un archivo.
- `--retry=3`: Número de reintentos para cada host.