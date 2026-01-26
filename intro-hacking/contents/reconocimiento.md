route \-n para conocer gateway del router

sudo nmap \-p- \-T5 192.168.101.1 \-v \-n  
\-p- todos los puertos  
\-T5 modo ultra loco  
\-v verbose  
\-n no resolución dns (mas rapido)

\--top-ports 500

sudo nmap \-sn 192.168.101.1/24 | grep \-oP ‘\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.’  
\-sn reconoce todos los dispositivos conectados al router considerando la mascara  
grep para mostrar solo las ip de los dispositivos

tcpdump \-i wlan0 \-w captura.cap \-v  
para generar captura de los paquetes  
y luego  
wireshark captura.cap &\>dev/null & disown

sudo nmap \-sT 192.168.101.1  
\-sT modo tcp

##### evasión firewalls

sudo [[nmap]] \-p22 192.168.101.1 \-D 192.168.111.215 \-f \--mtu 8   
\-D disfraza la ip de origen de los paquetes (usando 1 decoy en este caso)  
\-f envia paquetes fragmentados para evitar reconocimiento  
\--mtu 8 hace que los paquetes sean de máximo tamaño 8

sudo nmap \-p22 192.168.101.1 \-D 192.168.111.215, 192.168.111.216, 192.168.111.217, 192.168.111.218, 192.168.111.219, 192.168.111.220, 192.168.111.221, 192.168.111.222, 192.168.111.223, 192.168.111.224, 192.168.111.225, 192.168.111.226, 192.168.111.227, 192.168.111.228, 192.168.111.229, 192.168.111.230  
muchas direcciones ip de origen

sudo nmap \-p22 192.168.101.1 \-D 192.168.111.215 \--source-port 53  
\--source-port asigna un puerto especifico de origen  
sudo nmap \-p22 192.168.101.1 \-D 192.168.111.215 \--source-port 53 \--data-length 21  
\--data-length le suma largo de datos al paquete

sudo nmap \-Pn 192.168.101.1 \--spoof-mac Dell

sudo nmap \-p- \--open \-sS \--min-rate 5000 \-v \-n \-Pn 192.168.101.1  
\-sS syn scan (es mas rapido y discreto)

##### nmap scripts

nmap \-p- 192.168.101.1 \-sCV

* **`-sC`**: (Script Scanning) Le dice a Nmap que ejecute los **scripts de detección de vulnerabilidades y de información predeterminados** (conocidos como *scripts "default"* o `-sC`). Estos scripts son útiles para una enumeración básica de los servicios.  
* **`-sV`**: (Version Detection) Le pide a Nmap que intente **determinar la versión del servicio** que se está ejecutando en los puertos abiertos. Esto es crucial para identificar posibles vulnerabilidades específicas de la versión.

nmap \-p22 192.168.101.1 \--script ftp-anon

script ftp-anon sirve para verificar servicios ftp abiertos que no piden contraseña, permite conectarse como invitado. esta en el conjunto de scripts básicos de reconocimiento

nmap \-p- 192.168.101.1 \--script=”vuln and safe”  
solo corro scripts vuln y safe

**analizar rutas de localhost:**  
python3 \-m http-server 80  
nmap \-p80 192.168.101.1 \--script http-enum

* **default**: Esta es la categoría predeterminada en Nmap, que incluye una gran cantidad de scripts de reconocimiento básicos y útiles para la mayoría de los escaneos.  
* **discovery**: Esta categoría se enfoca en descubrir información sobre la red, como la detección de hosts y dispositivos activos, y la resolución de nombres de dominio.  
* **safe**: Esta categoría incluye scripts que son considerados seguros y que no realizan actividades invasivas que puedan desencadenar una alerta de seguridad en la red.  
* **intrusive**: Esta categoría incluye scripts más invasivos que pueden ser detectados fácilmente por un sistema de detección de intrusos o un Firewall, pero que pueden proporcionar información valiosa sobre vulnerabilidades y debilidades en la red.  
* **vuln**: Esta categoría se enfoca específicamente en la detección de vulnerabilidades y debilidades en los sistemas y servicios que se están ejecutando en la red.

###### *descubrir equipos en red local*

nmap \-sn 192.168.101.0/24  
con ifconfig aparece el netmask

arp-scan \-I eno2 \--localnet

también considerar una mascara mas pequena /24 \-\> /16 para ver si subnetting que nos proporcionaron no es correcto y se pueda acceder a un rango más amplio

/dev/tcp/192.168.101.1/puerto \-\> otra manera de analizar puertos abiertos en una red  
masscan \-p21,22,139,445,8080,80,443 \-Pn 192.168.0.0/16 \--rate=10000

para conseguir bug bounties  
[hackerone.com](http://hackerone.com)

conseguir emails de dominio y subdominios en phonebook de forma pasiva por la indexación de google:  
[https://hunter.io/search](https://hunter.io/search)

[https://phonebook.cz/](https://phonebook.cz/)

para analizar caras en fotos para osint  
[https://pimeyes.com/en](https://pimeyes.com/en)

##### enumeracion de subdominios activa

gobuster vhost \-u [https://tinder.com](https://tinder.com) \-w /usr/share/SecLists/Discovery/DNS/subdomains-top1millon-5000.txt \-t 20 | grep \-v “403”

* `gobuster vhost`: Ejecuta el modo de fuerza bruta de hosts virtuales de Gobuster.  
* `-u [https://tinder.com](https://tinder.com)`: Define la URL base o el host objetivo (`tinder.com`).  
* `-w /usr/share/SecLists/...`: Especifica la ruta a un **diccionario** (una lista de palabras) que contiene posibles nombres de subdominios a probar.  
* `-t 20`: Establece el número de hilos (concurrencia) a 20 para acelerar el proceso.  
* grep \-v “403” quita las cadenas que contengan el codigo 403

En resumen, está intentando descubrir subdominios ocultos de `tinder.com` probando nombres de una lista popular de diccionarios.

wfuzz \-c \--hc=403 \-t 20 \-w /usr/share/SecLists/Discovery/DNS/subdomains-top1millon-5000.txt \-H “Host: [FUZZ.tinder.com](http://FUZZ.tinder.com)” [https://tinder.com](https://tinder.com)

* **`wfuzz -c -t 20`**: Ejecuta `wfuzz`, mostrando la salida con colores (`-c`) y usando 20 hilos concurrentes (`-t 20`) para acelerar el proceso.  
* \--hc=403 oculta los payloads que devuelven codigo 403  
* **`-w /usr/share/SecLists/Discovery/DNS/subdomains-top1millon-5000.txt`**: Utiliza el *wordlist* (diccionario) especificado para reemplazar el marcador de posición `FUZZ`. Este archivo contiene una lista de posibles nombres de subdominios.  
* **`-H "Host: [FUZZ.tinder.com](http://fuzz.tinder.com)"`**: Introduce el marcador de posición `FUZZ` en la cabecera `Host` de la petición HTTP. `wfuzz` probará cada palabra del *wordlist* en lugar de `FUZZ` (ej. `[www.tinder.com](https://www.tinder.com)`, `api.tinder.com`, etc.).  
* **`[https://tinder.com](https://tinder.com)`**: Especifica la URL base a la que se envían las peticiones (aunque el subdominio se prueba en la cabecera `Host`).

para enumerar dominios pasivamente:

python3 \-m sublist3r \-d tinder.com   
python3 [ctfr.py](http://ctfr.py) \-d [tinder.com](http://tinder.com)

para conocer leaks de logins hasheados y no hasheados (hay que pagar). puedo poner el usuario de un ejecutivo o persona de interés y quizas encuentro algún leak de su cuenta.

* **DeHashed**: [https://www.dehashed.com/](https://www.dehashed.com/)

##### identificar tecnologias web \- BD’s \- CMS

* **Whatweb**: [https://github.com/urbanadventurer/WhatWeb](https://github.com/urbanadventurer/WhatWeb) \-\> ya esta en kali  
* **Wappalyzer**: [https://addons.mozilla.org/es/firefox/addon/wappalyzer/](https://addons.mozilla.org/es/firefox/addon/wappalyzer/) \-\> extension firefox  
* **Builtwith**: [https://builtwith.com/](https://builtwith.com/)

##### fuzzing y enumeración de archivos en servidor web

gobuster dir \-u [https://miwifi.com/](https://miwifi.com/) /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt \-t 50 \-b 403,404 \-x html

* **`gobuster dir`**: Indica que se buscarán directorios y archivos.  
* **`-u [https://miwifi.com/](https://miwifi.com/)`**: Especifica la URL objetivo.  
* **`/usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt`**: Es la lista de palabras (wordlist) que contiene los nombres de directorios/archivos a probar.  
* **`-t 50`**: Establece 50 hilos (threads) para acelerar el proceso.  
* **`-b 403,404`**: Oculta o ignora las respuestas con códigos de estado HTTP 403 (Prohibido) y 404 (No encontrado) en la salida.  
* **`-x html`**: Busca archivos con la extensión `.html` además de directorios.

El objetivo es **descubrir directorios y archivos ocultos** en el servidor probando rápidamente una gran cantidad de nombres comunes de una lista.

┌──(venv)─(kali㉿kali-raspberrypi)-\[\~\]  
└─$ wfuzz \-c \-t 200 \--hc=404,403,301 \-w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt https://miwifi.com/FUZZ/

kill % para matar el proceso  
para buscar archivos html  
wfuzz \-c \-t 200 \--hc=404,403,301 \-w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt [https://miwifi.com/FUZZ.html](https://miwifi.com/FUZZ.html)

para buscar varios tipos de archivos  
wfuzz \-c \-t 200 \--hc=404,403,301 \-w /usr/share/dirbuster/wordlists/directory-list-2.3-medium.txt \-z list,html-txt-php [https://miwifi.com/FUZZ.FUZ2Z](https://miwifi.com/FUZZ.FUZ2Z)

para buscar productos/identificadores en un rango determinado  
wfuzz \-c \-t 200 \--hw=6515 \-z range,1-20000 [https://www.mi.com/shop/buy/detail?product\_id=FUZZ](https://www.mi.com/shop/buy/detail?product_id=FUZZ)
para buscar puertos abiertos con *fuzzing*
wfuzz -c -t 200 -z range,1-65535 "http://192.168.101.1:FUZZ"

ffuf es lo mismo que wfuzz pero escrito en go y mas rapido

burpsuite proxy se puede usar para interceptar paquetes

##### google dorking

site:[tinder.com](http://tinder.com) \-\> forzar que solo aparezca el dominio [tinder.com](http://tinder.com)  
site:[tinder.com](http://tinder.com) filetype:txt  
intext:[tinder.com](http://tinder.com) filetype:pdf \-\> solo mencionan [tinder.com](http://tinder.com) y es de tipo pdf

[https://pentest-tools.com/](https://pentest-tools.com/) | google hacking mas intuitivo y facil

[https://www.exploit-db.com/](https://www.exploit-db.com/) \-\> listado de exploits con script para usarlos
