# Herramienta: Nmap (Network Mapper)
**Descripción:** El estándar de la industria para el escaneo de redes, descubrimiento de hosts y auditoría de seguridad.

### Comandos y Uso
- `sudo nmap -p- -T5 <IP> -v -n`: Escaneo agresivo.
- `sudo nmap -sn <IP>/24`: Descubrimiento de hosts vivos (Ping Scan).
- `sudo nmap -sT <IP>`: Escaneo TCP Connect (completa el saludo de tres vías).
- `sudo nmap -sS <IP>`: SYN Scan (más sigiloso, no completa la conexión).

### Parámetros del texto
- `-p-`: Escanea los 65535 puertos.
- `-T5`: Modo de temporización ultra rápido ("modo loco").
- `-v`: Verbose, muestra resultados en tiempo real.
- `-n`: Sin resolución DNS.
- `--top-ports 500`: Escanea solo los 500 puertos más frecuentes.
- `-Pn`: Omite el descubrimiento de host (asume que está encendido).
- `--min-rate 5000`: Envía al menos 5000 paquetes por segundo.
- `-sC` / `-sV`: Scripts predeterminados y detección de versiones.

### Evasión de Firewalls
- `-D <IP1,IP2>`: Uso de "Decoys" (señuelos) para camuflar tu IP.
- `-f`: Fragmentación de paquetes.
- `--mtu 8`: Define el tamaño máximo de paquete (múltiplo de 8).
- `--source-port 53`: Simula que el tráfico proviene de un puerto DNS.
- `--data-length 21`: Añade bytes aleatorios al cuerpo del paquete.
- `--spoof-mac <Marca>`: Suplanta la dirección MAC (ej. Dell).

### Parámetros adicionales útiles
- `-oN <archivo>`: Guarda el resultado en un archivo de texto normal.
- `--script-help <script>`: Muestra ayuda sobre un script específico de Nmap.