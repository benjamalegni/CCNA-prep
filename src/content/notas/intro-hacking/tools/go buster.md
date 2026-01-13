# Herramienta: Gobuster
**Descripción:** Herramienta escrita en Go para realizar fuerza bruta sobre URIs (directorios), subdominios y hosts virtuales (vhosts).

### Comandos y Uso
- `gobuster vhost -u <URL> -w <wordlist>`: Descubrimiento de subdominios/hosts virtuales mediante cabeceras Host.
- `gobuster dir -u <URL> -w <wordlist>`: Búsqueda de directorios y archivos ocultos.

### Parámetros del texto
- `-t 20/50`: Número de hilos (concurrencia).
- `-b 403,404`: Excluye códigos de estado HTTP específicos.
- `-x html`: Busca extensiones de archivo específicas.
- `grep -v "403"`: Filtra la salida para ocultar errores de acceso denegado.

### Parámetros adicionales útiles
- `-r`: Sigue redirecciones (301, 302).
- `-k`: Salta la verificación de certificados SSL (útil en entornos de prueba).