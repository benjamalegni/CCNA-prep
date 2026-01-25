### identificador de interfaz (interface ID)
- identifican interfaces (puntos de acceso a la red) en un link
- unicos en el link
- originalmente derivadas de la identificacion de hardware (construidos en formado EUI-64)
- campo obligatorio en prefijos 001 a 111 (excepto multicast)
![[Pasted image 20250518184856.png]]

### generacion de Interface ID
![[Pasted image 20250518185153.png]]
![[Pasted image 20250518185300.png]]
![[Pasted image 20250518185342.png]]

### aspectos a tener en cuenta para la generacion del identificador de interfaz
- seguridad
	- correlacion de actividades del host
	- seguimiento
	- scanning de equipos en la red
	- explotacion de vulnerabilidades de los equipos
- carga computacionall
- facilidad de administracion
- metodo de configuracion
	- manual
	- SLAAC (Stateless Address Auto-Configuration)
	- basado en DHCPv6

### alternativas para la generacion del identificador de interfaz
- configuracion manual
	- IPv4 address
	- service port
	- wordy
	- low-byte
- Stateless Address Auto-configuration (SLAAC)
	- IEEE 802 48-bit MAC o IEEE EUI-64 identifier
	- temporarias (privacy addresses): cambian cada cierto intervalo de tiempo
	- constantes, semanticamente opacas (random) (RFC4941 - Microsoft): ==no cambian==
	- estables, semanticamente opacas (RFC7217): cambian al cambiar de red
- configuracion via DHCPv6
- determinadas por metodos de coexistencia
	- IPv4 address and port (TEREDO)

#### tecnicas de filtrado en IPv6: RTBH
discard-only address block 100::/64
utilizado para remote triggered black gole (RTBH) filtering
![[Pasted image 20250518190035.png]]

![[Pasted image 20250518190119.png]]

### asignacion de direcciones globales a end sites
- consideraciones
	- desde el punto de vista de la red
		- uso racional del espacio de direcciones
	- desde el punto de vista del usuario
		- facil remuneracion
		- suficientes direcciones para no usar NAT
		- tamano de las subredes compatible con ULA
- tipos de end sites
	- corporaciones
		- se asigna generalmente un prefijo /48 o /56
	- usuarios residenciales
		- no hay una asignacion acordada
		- alternativas /60 /64