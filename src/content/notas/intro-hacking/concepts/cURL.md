El comando curl es una única herramienta, pero su comportamiento cambia drásticamente dependiendo de las banderas (flags) que le pases. Aquí están agrupadas por sus casos de uso reales:
1. Peticiones HTTP (Consumir APIs y Webs)
A. GET (Obtener datos)
Es el comportamiento por defecto. Si solo pones una URL, curl hará una petición GET.
# Obtener el HTML de una página o un JSON de una API
curl https://api.ipify.org?format=json
B. POST (Enviar datos)
Para enviar datos (como rellenar un formulario o enviar un JSON). Al usar la bandera -d (data), curl cambia automáticamente el método a POST.
*   Enviar datos de formulario estándar:
curl -d "usuario=admin&password=123" https://mipagina.com/login
*   Enviar un JSON (Lo más común en APIs):
    Necesitas la bandera -H (Header) para decirle al servidor que el contenido es un JSON.
curl -X POST https://api.mipagina.com/usuarios \
     -H "Content-Type: application/json" \
     -d '{"nombre": "Juan", "rol": "admin"}'
C. PUT / DELETE (Actualizar y Borrar)
Para estos métodos, debes especificar explícitamente el verbo HTTP usando -X (eXecute).
# Borrar un recurso (DELETE)
curl -X DELETE https://api.mipagina.com/usuarios/5
# Actualizar un recurso (PUT)
curl -X PUT https://api.mipagina.com/usuarios/5 \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Pedro"}'
---
2. Autenticación y Cabeceras (Headers)
A. Enviar Tokens de Seguridad (Bearer Token)
Casi todas las APIs modernas requieren un token. Lo envías agregando una cabecera con -H.
curl -H "Authorization: Bearer mi_super_token_secreto" https://api.github.com/user
B. Autenticación Básica (Usuario y Contraseña)
Si un sitio web te pide credenciales clásicas, usas la bandera -u (user).
curl -u "mi_usuario:mi_password" https://sitio-privado.com/datos
---
3. Descarga de Archivos
Por defecto, curl imprime el contenido directamente en la terminal. Para descargar archivos físicos, usa estas banderas:
A. Guardar con un nombre personalizado (-o minúscula)
curl -o imagen_descargada.jpg https://ejemplo.com/foto123.jpg
B. Guardar con el nombre original (-O mayúscula)
Extrae el nombre del archivo directamente de la URL.
curl -O https://ejemplo.com/foto123.jpg
C. Reanudar una descarga interrumpida (-C -)
Si se cortó tu conexión a internet, curl puede continuar desde donde se quedó sin empezar de cero.
curl -C - -O https://ejemplo.com/archivo_gigante.zip
---
4. Depuración (Debugging) y Supervivencia
Estas banderas son vitales cuando algo falla y necesitas saber por qué.
A. Seguir redirecciones (-L mayúscula)
curl no sigue redirecciones por defecto. Si haces una petición a http://google.com, no verás nada porque redirige a la versión https. Usa -L (Location) para que lo siga automáticamente.
curl -L http://google.com
B. Modo Verbose / Detallado (-v minúscula)
Te muestra exactamente qué información sale de tu computadora (petición) y qué responde el servidor (cabeceras, SSL, IPs). 
curl -v https://api.mipagina.com
(Las líneas que empiezan con > son lo que tú envías, las que empiezan con < son lo que el servidor responde).
C. Solo ver las cabeceras (-I mayúscula)
Hace una petición tipo HEAD. Útil si quieres saber si un archivo existe (código 200) o qué tamaño tiene (Content-Length), sin descargar el archivo completo.
curl -I https://ejemplo.com/archivo_gigante.iso
---
💡 El Truco de Oro (De curl a Python)
Ya que antes preguntaste por Python (requests), aquí tienes un truco de desarrollo muy popular:
1. Ve a tu navegador (Chrome/Firefox).
2. Abre las Herramientas de Desarrollador (F12) y ve a la pestaña Network (Red).
3. Haz clic derecho sobre cualquier petición de la página web $\rightarrow$ Copy $\rightarrow$ Copy as cURL.
4. Ve a la web curlconverter.com (https://curlconverter.com/), pega ese comando curl, y automáticamente te generará el código exacto y formateado para usarlo con Python requests (o Node.js, PHP, etc).