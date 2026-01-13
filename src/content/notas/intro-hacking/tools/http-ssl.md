# Análisis de HTTP/HTTPS y SSL/TLS
**Puerto por defecto:** 443

### Inspección de Certificados
Permite revisar la validez, caducidad y cifrado del certificado del servidor.
- `openssl s_client -connect ejemplo.com:443`
- `sslyze tinder.com`
- `sslscan tinder.com`

### Escaneo de Vulnerabilidades Específicas
Para detectar fallos críticos como Heartbleed:
- `sudo nmap --script ssl-heartbleed -p8443 127.0.0.1`

### Parámetros adicionales útiles
- `--bugs`: En `sslscan`, para forzar la detección de bugs en sistemas antiguos.
- `--certinfo`: En `sslyze`, para obtener un reporte detallado del certificado.
```