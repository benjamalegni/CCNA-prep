# Herramienta: Wfuzz
**Descripción:** Un framework de fuzzing web muy versátil que permite inyectar datos en cualquier parte de una petición HTTP.

### Comandos y Uso
- `wfuzz -H "Host: FUZZ.tinder.com" <URL>`: Enumeración de subdominios.
- `wfuzz ... /FUZZ/`: Fuzzing de directorios.
- `wfuzz ... /FUZZ.html`: Fuzzing de archivos específicos.
- `wfuzz -z list,html-txt-php ... FUZZ.FUZ2Z`: Uso de múltiples diccionarios.

### Parámetros del texto
- `-c`: Salida con colores.
- `--hc=403,404`: Oculta respuestas con ciertos códigos de error.
- `--hw=6515`: Oculta respuestas con un número de palabras específico (útil para quitar falsos positivos).
- `-z range,1-20000`: Genera un rango numérico como diccionario.

### Parámetros adicionales útiles
- `--hh=120`: Oculta respuestas con una cantidad de caracteres (chars) específica.
- `-p 127.0.0.1:8080`: Envía el tráfico a través de un proxy (como Burp Suite).