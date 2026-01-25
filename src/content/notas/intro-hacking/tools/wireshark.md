# Herramienta: Wireshark
**Descripción:** El analizador de protocolos de red más famoso del mundo. Permite ver lo que sucede en tu red a un nivel microscópico.

### Comandos y Uso
- `wireshark captura.cap &>dev/null & disown`: Abre un archivo de captura previo de forma independiente a la terminal para que esta quede libre.

### Parámetros adicionales útiles
- **Filtros de visualización:** `http.request.method == "POST"` o `ip.addr == 192.168.1.1`.