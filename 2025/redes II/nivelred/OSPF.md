![[Pasted image 20250525231110.png]]
**eficiente:** vamos a ver que una vez que converge no intercambia sus bases de datos (salvo los cambios) como si lo hace RIP
**escalable:** a diferencia de RIP permite manejar cualquier tamano de red
**seguro:** permite la autenticacion y el cifrado de los datos(hay que habilitarlo)
**jerarquico**: permite dividir un sistema autonomo en areas para optimizar con convergencia
**obtiene el costo:** tiene en cuenta el ancho de banda. Se obtiene como 100.000kbps/ancho de banda del link. En RIP eran saltos

con la base completa de estasdos de enlace ejecuta Dijkstra para obteneer el camino mas corto a cada red destino

# 1. conociendo vecinos
se envia mensaje Hello, los router con OSPF habilitado envian periodicamente un mensaje Hello, para descubrir router adyacentes para luego intercambiar informacion
![[Pasted image 20250525231508.png]]
# 2. intercambio de LSP entre adyacentes
intercambian LSA (son las notificaciones de estado de enlace) entre router adyacentes
las LSA contienen el estado y costo de cada enlace conectado
cuando un router recibe un LSA lo procesa y envia de inmediato a sus adyacentes
![[Pasted image 20250525231620.png]]

# 3. armado de la tabla topologica
una vez que se reciben los diferentes LSA, cada router arma su tabla de topologia denominada LSBD
![[Pasted image 20250525231717.png]]

# 4. corre algoritmo de camino mas corto
con las tablas LSDB completas se ejecuta el algoritmo de camino mas corto SPF y se crea la tabla
![[Pasted image 20250525231904.png]]

## estados que pasa un router
cuando un router OSPF se conecta inicialmente a una red, intenta hacer lo siguiente
- crear adyacencias con los vecinos
- intercambiar informacion de routing
- calcular las mejores rutas
- lograr la convergencia
al intentar lograr la convergencia, OSPF atraviesa varios estados:
- estado down
- estado init
- estado two-way
- estado exstart
- estado exchange
- estado loading
- estado full
![[Pasted image 20250525232037.png]]

## tipos de paquetes


| tipo 1: saludo                                      | para establecer y mantener la adyacencia, se ejecuta por defecto cada 10segs, a los 40 si no se recibio se da de baja   |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| tipo 2: descripcion de base de datos (DBD)          | contiene una lista abreviada de la LSDB del router emisor, y los routers receptores la usan para compararla con su LSDB |
| tipo 3: solicitud de estado de enlace (LSR)         | usado para requerir una entrada completa de BDB                                                                         |
| tipo 4: actualizacion de estado de enlace (LSU)     | respuesta a un LST un LSU contiene 7 tipos de LSA                                                                       |
| tipo 5: acuse de recibe de estado de enlace (LSAck) | <br>acuse de recibo del LSU                                                                                             |

## tipos de LSA
diferentes tipos de LSA (link state advertisement)
![[Pasted image 20250525232412.png]]

## areas OSPF
OSPF escalable y mejora su convergencia ya que permite dividir o agrupar router en areas. Estas areas comparten la base de datos de estados de enlaces
cuando hay multitareas existe la area cero que se denomina backbone y es la area troncal o que tiene comunicacion con todas las areas

R1 y R2 se los denomina ABR, ya que son el punto de conexion entre dos areas
![[Pasted image 20250525232547.png]]

## redes con multiples routers
en una red multiacceso, osea en una misma red varios router, OSPF tiene un protocolo para designar router maestros (DR), esclavos(BDR) y DROTHER
normalmente el DR, se asigna al de la IP mas grande. Y usa la direccion multicast 224.0.0.5 para comunicarse dentro de la red el BDR usara la direccion 224.0.0.6
![[Pasted image 20250525232729.png]]

## distancia administrativa
si un sistema autonomo maneja varios IGP, puede ocurrir que una red me sea informada a un router por mas de un protocolo
en ese sentido se usa la menor distancia administrativa para elegir con cual quedarme
![[Pasted image 20250525232840.png]]
![[Pasted image 20250525232847.png]]