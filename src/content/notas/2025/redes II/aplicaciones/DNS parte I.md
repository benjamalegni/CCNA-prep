Domain Name System
(sistema de nombres de dominio)

- personas: muchos identificadores:
	- dni, nombre, # pasaporte
- host y router en internet:
	- direccion IP (32 bits) - usada para direccionar datagramas (ideal por ser maquina)
	- "nombre" e.g. www.yahoo.com - son usados por humanos
- Q: quien mapea entre nombres y direcciones IP?

### Domain Name System:  
- base de datos distribuida implementada en una jerarquia de muchos servidores de nombres
- protocolo de capa aplicacion permite a host, routers, y servidores de nombre comuniscarse para resolver nombre (traduccion nombre/direccion)
- no esta orientado al uso directo de los usuarios, ellos usan nombres
	- DNS es funcion central de la Internet implementada como protocolo de capa aplicacion
	- la idea de diseno de Internet es dejar la complejidad en la "periferia" de la red


### servicios DNS
- traduccion de nombre de host a direccion IP
- alias para host
	- nombre canonico (*servidor1.animas.unicen.edu.ar*) y alias (*unicen.edu.ar*)
	- nombre canonico: CNAME en RFC1035
- usamos alias para servidor de correo
- distribucion de carga
	- servidores web replicados: conjunto de direcciones IP para un nombre canonico (e.g. relay1.west-coast.amazon.com), servidor DNS rota entre direcciones IP

*por que no centralizar DNS?
- seria punto unico de falla
- volumen de trafico, muchos necesitan el DNS
- seria una base de datos centralizada distante con grandes retardos de acceso
- mantencion, es mejor que cada dominio gestione sus nombres
*por que no seria escalable!!!

### base de datos jerarquica y distribuida![[Pasted image 20250607011718.png]]
- cliente desea IP de www.amazon.com; 1ra aprox:
	- cliente consulta al servidor raiz para encontrar servidor DNS de com
	- cliente consulta servidor DNS TLD (top level domain) de com para obtener servidor DNS de amazon.com
	- cliente consulta servidor DNS amazon.com para obtener direccion IP de www.amazon.com

### DNS: servidores de nombre en raiz
- sus direcciones IPs estan contenidas en el software DNS
- son 13 distribuidos en todo el mundo
- su ubicacion se puede ver en: http://www.root-servers.org/
- son contactados cuando un servidor DNS local no conoce la IP de quien maneja un dominio de nivel superior (TLD)
![[Pasted image 20250607012208.png]]

## TLD y servidores autoritativos
- top-level domain (TLD) servers: responsable por com, org, net, edu, etc. y todos los dominios superiores de cada pais: uk, fr, ca, jp, cl, etc
	- network solutions mantiene servidores para el TLD de com
	- educause para el TLD de edu
	- Nic (network information center) para el TLD de de Argentina (www.nic.ar)
- servidores DNS autoritativos: son servidores DNS de las organizaciones y proveen mapeos autoritativos entre hostname e IP (e.g. web y mail)
	- estos pueden ser mantenidos por la organizacion o el proveedor de servicio

### servidor de nombre local
- no pertenece estrictamente a la jerarquia
- cada ISP (ISP residencial, compania, universidad tiene uno)
	- tambien son llamados "servidor de nombre por omision" (default name server)
- cuando un host hace una consulta DNS, esta es enviada a su servidor DNS local
	- actua como proxy, re-envia consulta dentro de la jerarquia