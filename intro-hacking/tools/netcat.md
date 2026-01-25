## ¿Qué es Netcat?
**Netcat (nc)** es una herramienta de red multipropósito que permite **leer y escribir datos a través de conexiones TCP y UDP**.  
Se usa para **debugging**, **transferencia de archivos**, **escuchar puertos**, **pivoting** y **post-explotación**.

> Suele llamarse *“la navaja suiza de networking”*.

---

## Sintaxis básica
```bash
nc [opciones] <host> <puerto>
```
## Parámetros más importantes

### 🔌 Conectividad
- `-l` → modo **listen** (escuchar conexiones)
- `-p <puerto>` → puerto local (a veces implícito)
- `-u` → usar **UDP** (por defecto es TCP)
- `-v` → verbose
- `-n` → no resolver DNS (más rápido)
- `-w <segundos>` → timeout
- `-z` → modo escaneo (sin enviar datos)
---

### 🖥️ Ejecución / shells

- `-e <programa>` → ejecuta programa al conectar _(no siempre disponible)_
- `-c <comando>` → ejecuta comando (algunas versiones)

> ⚠️ `-e` suele estar deshabilitado en versiones modernas por seguridad.

### Escuchar un puerto (listener)

`nc -lvnp 4444`
- `-l` listen
- `-v` verbose
- `-n` sin DNS
- `-p` puerto