# Auditoría de Servicio FTP
**Puerto por defecto:** 21

### Descripción
El protocolo FTP se utiliza para la transferencia de archivos. En entornos de prueba, se puede utilizar el contenedor **Docker-FTP-Server** (https://github.com/garethflowers/docker-ftp-server).

### Reconocimiento y Escaneo
Para una identificación inicial de versiones y scripts básicos:
- `nmap -sCV -p21 127.0.0.1`

### Fuerza Bruta
Se utiliza **Hydra** para intentar descifrar credenciales. 
*Nota: Algunos servidores (como el mencionado de Docker) pueden apagarse automáticamente si detectan un ataque de fuerza bruta.*

- **Comando:** `hydra -l kali -P /usr/share/wordlists/rockyou.txt ftp://127.0.0.1:21 -t 15`
    - `-l kali`: Define el nombre de usuario.
    - `-P <ruta>`: Especifica el diccionario de contraseñas (Rockyou).
    - `-t 15`: Define 15 hilos de ejecución paralela.

### Acceso Anónimo
Si el servidor permite el usuario `anonymous`:
- `ftp <ip_del_servidor>` (Simplemente conectarse sin contraseña).

### Parámetros adicionales útiles
- `-vV`: En Hydra, muestra el usuario y contraseña intentados en cada paso.
- `-s 21`: En Hydra, para especificar el puerto si no es el estándar.