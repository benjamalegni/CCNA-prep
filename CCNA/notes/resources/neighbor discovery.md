**Neighbor Discovery** es el conjunto de mecanismos que usa **IPv6** para que los dispositivos en la misma red local:
- Se encuentren entre sí
- Obtengan información de red
- Resuelvan direcciones IP ↔ MAC
- Detecten routers disponibles

Reemplaza funciones que en IPv4 hacían **ARP, ICMP Router Discovery y DHCP básico**.
## Para qué sirve
Neighbor Discovery permite:
1. **Autoconfiguración de direcciones (SLAAC)**  
    El host obtiene su dirección IPv6 automáticamente desde los anuncios del router.
2. **Resolución de direcciones**  
    Convierte una dirección IPv6 en dirección MAC (equivalente a ARP en IPv4).
3. **Detección de routers**  
    Encuentra el router por defecto en la red local. 4. **Detección de vecinos alcanzables**  
    Verifica si otro host sigue activo.
5. **Redirecciones**  
    El router puede indicar una mejor ruta dentro de la LAN.

## Mensajes ICMPv6 usados
Neighbor Discovery se basa en **ICMPv6**:
- **Router Solicitation (RS)** → el host pregunta por routers
- **Router Advertisement (RA)** → el router responde con configuración
- **Neighbor Solicitation (NS)** → consulta la MAC de un vecino o verifica alcance
- **Neighbor Advertisement (NA)** → respuesta con la MAC
- **Redirect** → indica una mejor ruta local
---
## Diferencias clave vs IPv4
- No usa **ARP** → todo está integrado en **ICMPv6**
- Permite **autoconfiguración sin DHCP**
- Diseñado para **seguridad y eficiencia multicast**
- Menos broadcast, más uso de **multicast específico**