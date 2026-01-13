# Auditoría de SMB (Server Message Block)
**Descripción:** Protocolo para compartir recursos en red. Samba es su implementación en Linux.

### SMBClient
Herramienta para interactuar con recursos compartidos.
- **Parámetros:**
    - `-L`: Enumera los recursos compartidos disponibles en el servidor.
    - `-U`: Especifica el nombre de usuario y contraseña para autenticación.
    - `-c`: Especifica un comando directo a ejecutar en el servidor.

### SMBMap
Herramienta avanzada para listar permisos y contenido.
- **Parámetros:**
    - `-H`: Dirección IP o nombre de host.
    - `-P`: Puerto TCP (por defecto 445).
    - `-u`: Nombre de usuario.
    - `-p`: Contraseña.
    - `-d`: Dominio.
    - `-s`: Recurso compartido específico a enumerar.

### Parámetros adicionales útiles
- `--download <ruta>`: En `smbmap` para descargar un archivo directamente.
- `-N`: En `smbclient` para intentar conexión sin contraseña (Null Session).