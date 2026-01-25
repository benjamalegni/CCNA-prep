# Herramienta: route
**Descripción:** Permite visualizar y manipular la tabla de enrutamiento IP del sistema operativo. Es fundamental para identificar por dónde fluye el tráfico de red.

### Comandos y Uso
- `route -n`: Muestra la tabla de rutas en formato numérico (evita la resolución de nombres para mayor velocidad). Es ideal para conocer el **Gateway** (puerta de enlace) del router.

### Parámetros adicionales útiles
- `add default gw <IP>`: Configura una puerta de enlace predeterminada.
- `-v`: Modo verbose para obtener más detalles sobre las rutas.