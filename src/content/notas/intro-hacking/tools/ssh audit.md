# Auditoría de Servicio SSH
**Puerto por defecto:** 22

### Descripción
Servicio para administración remota segura. Para laboratorios se puede usar el contenedor de **Docker Hub OpenSSH-Server**:
```bash
docker run -d \
  --name=openssh-server \
  --hostname=luka-openssh \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e PASSWORD_ACCESS=true \
  -e USER_PASSWORD=louise \
  -e USER_NAME=luka \
  -e LOG_STDOUT= \
  -p 2222:2222 \
  -v /path/to/openssh-server/config:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/openssh-server:latest

```

### Comandos de Conexión

- ssh -p 2222 luka@127.0.0.1
    
    - -p: Especifica el puerto de conexión (en el ejemplo 2222).
        

### Parámetros adicionales útiles

- -o PreferredAuthentications=password: Fuerza a SSH a pedir contraseña en lugar de usar llaves.
    
- -v: Modo debug para ver dónde falla la conexión.

