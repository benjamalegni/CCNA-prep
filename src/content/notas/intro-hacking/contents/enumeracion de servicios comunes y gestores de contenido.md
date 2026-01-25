
##### ftp. puerto 21 (por default)
[[ftp audit]]

usando el contenedor de   
**Docker-FTP-Server**: [https://github.com/garethflowers/docker-ftp-server](https://github.com/garethflowers/docker-ftp-server)

1. se pueden usar scripts de nmap para reconocimiento como: nmap \-sCV \-p21 127.0.0.1  
2. se usa **hydra** para fuerza bruta

probando con ese server se apaga solo porque detecta el ataque de fuerza bruta y se apaga automaticamente al correr este script:

└─$ hydra \-l kali \-P /usr/share/wordlists/rockyou.txt ftp://127.0.0.1:21 \-t 15

si el usuario es anonymous:  
solamente con el comando ftp \<ip del servidor\> me conecto a el

##### ssh. puerto 22 por defecto
[[ssh audit]]

* **Docker Hub OpenSSH-Server**: [https://hub.docker.com/r/linuxserver/openssh-server](https://hub.docker.com/r/linuxserver/openssh-server)

└─$ docker run \-d \\                	   
  \--name=openssh-server \\  
  \--hostname=luka-openssh \`\#optional\` \\  
  \-e PUID=1000 \\    
  \-e PGID=1000 \\  
  \-e TZ=Etc/UTC \\  
  \-e PASSWORD\_ACCESS=true \`\#optional\` \\  
  \-e USER\_PASSWORD=louise \`\#optional\` \\      
  \-e USER\_NAME=luka \`\#optional\` \\  
  \-e LOG\_STDOUT= \`\#optional\` \\  
  \-p 2222:2222 \\  
  \-v /path/to/openssh-server/config:/config \\  
  \--restart unless-stopped \\  
  lscr.io/linuxserver/openssh-server:latest

ssh \-p luka@127.0.0.1

##### Http/https. puerto 443
[[http-ssl]]

➜ `openssl s_client -connect ejemplo.com:443`

Con este comando, podemos **inspeccionar** el **certificado SSL** de un servidor web. El comando se conecta al servidor en el puerto 443 y muestra información detallada sobre el certificado SSL, como la validez del certificado, la fecha de caducidad, el tipo de cifrado, etc

sslyze [tinder.com](http://tinder.com)  
sslscan tinder.com

sudo nmap \--script ssl-heartbleed \-p8443 127.0.0.1

##### smb
[[smb audit]]

es un **protocolo** de comunicación de red utilizado para compartir archivos, impresoras y otros recursos entre dispositivos de red. Es un protocolo propietario de **Microsoft** que se utiliza en sistemas operativos **Windows**. **Samba** es la implementación de smb para linux  
smb client: 

- **\-L**: Este parámetro se utiliza para enumerar los recursos compartidos disponibles en el servidor SMB o Samba.  
* **\-U**: Este parámetro se utiliza para especificar el nombre de usuario y la contraseña utilizados para la autenticación con el servidor SMB o Samba.  
* **\-c**: Este parámetro se utiliza para especificar un comando que se ejecutará en el servidor SMB o Samba.

smbmap:

* **\-H**: Este parámetro se utiliza para especificar la dirección IP o el nombre de host del servidor SMB al que se quiere conectarse.  
* **\-P**: Este parámetro se utiliza para especificar el puerto TCP utilizado para la conexión SMB. El puerto predeterminado para SMB es el 445, pero si el servidor SMB está configurado para utilizar un puerto diferente, este parámetro debe ser utilizado para especificar el puerto correcto.  
* **\-u**: Este parámetro se utiliza para especificar el nombre de usuario para la conexión SMB.  
* **\-p**: Este parámetro se utiliza para especificar la contraseña para la conexión SMB.  
* **\-d**: Este parámetro se utiliza para especificar el dominio al que pertenece el usuario que se está utilizando para la conexión SMB.  
* **\-s**: Este parámetro se utiliza para especificar el recurso compartido específico que se quiere enumerar. Si no se especifica, smbmap intentará enumerar todos los recursos compartidos en el servidor SMB.

# [[wordpress audit]] 

me conecto al docker container de mi pc desde la raspberry mediante  
http:192.168.50.1:31337

El uso de esta herramienta es bastante sencillo, a continuación se indica la sintaxis básica:

➜ `wpscan --url https://example.com`

Si deseas enumerar usuarios o plugins vulnerables en WordPress utilizando la herramienta wpscan, puedes añadir los siguientes parámetros a la línea de comandos:

**➜** `wpscan --url https://example.com --enumerate u`

En caso de querer enumerar plugins existentes los cuales sean vulnerables, puedes añadir el siguiente parámetro a la línea de comandos:

➜ `wpscan --url https://example.com --enumerate vp`

El archivo xmlrpc.php es utilizado por muchos plugins y aplicaciones móviles de WordPress para interactuar con el sitio web y realizar diversas tareas, como publicar contenido, actualizar el sitio y obtener información.

Sin embargo, este archivo también puede ser abusado por atacantes malintencionados para aplicar **fuerza bruta** y descubrir **credenciales válidas** de los usuarios del sitio. Esto se debe a que xmlrpc.php permite a los atacantes realizar un número ilimitado de solicitudes de inicio de sesión sin ser bloqueados, lo que hace que la ejecución de un ataque de fuerza bruta sea relativamente sencilla.

mandando este archivo con└─$ curl \-X POST http://192.168.50.1:31337/xmlrpc.php \-[d@file.xml](mailto:d@file.xml) se listan los usuarios validos

`<?xml version="1.0" encoding="UTF-8"?>`  
`<methodCall>`   
`<methodName>wp.getUsersBlogs</methodName>`   
`<params>`   
`<param><value>\{\{your username\}\}</value></param>`   
`<param><value>\{\{your password\}\}</value></param>`   
`</params>`   
`</methodCall>`

alternativa mas rapida:  
wpscan \--url [http://192.168.50.1:31337](http://192.168.50.1:31337) \-U luka \-P /usr/share/wordlist/rockyou.txt

# [[joomla audit]]
usar joomscan \--url 192.168.50.1:8080 para encontrar vulnerabilidades de joomla

# [[drupal]]
➜ `droopescan scan drupal --url https://example.com`

# [[magento audit]]

Su sintaxis y modo de uso es bastante sencillo, a continuación se comparte un ejemplo:

➜ `php magescan.phar scan:all https://example.com`