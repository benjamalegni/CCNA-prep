### netfilter - IPtables
netfilter es un framework del kernel de linux que permite relizar diversas operaciones con la red como:
- filtrado de paquetes
- traduccion de direcciones y puertos
- restreo de conexiones
- otro tipo de operaciones de manipulacion de paquetes

- sistema de intercepcion de paquetes en su recorrido por el kernel (a partir de v2.4)
- basado en la definicion de puntos especiales en el recorrido que hacen los paquetes por el kernel (puntos de intercepcion o HOOKS)
- en estos HOOKS, es posible colocar codigo para filtrar, inspeccionar o modificar los paquetes
- este codigo implementa diferentes funciones (firewalls, nat, etc)
- implementaciones mas conocidas sobre netfilter
	- IPtables: permite manipular paquetes a nivel IP y transporte
	- ip6tables: IPtables para IP version 6
	- arptables: permite manipular las tablas ARP
	- ebtables: permite manipular los frames ethernet
	- nftables: nueva version de IPtables (incluye todos los anteriores)

la utilidad iptables se utiliza para configurar las reglas de filtrado de netfilter
- quiero autorizar el acceso de las personas a mi servidor web
- quiero autorizar a los usuarios de la LAN a conectarse a internet
- quiero que se pueda hacer ping a internet
- no quiero que algunas personas tengan internet

como funciona?
- filtrado de paquetes (paquet filtering)
- seguimiento de conexiones (connection tracking)
- traduccion de direcciones IP y puertos (nat)

#### conceptos basicos IPtables
- reglas
- cadenas
- tablas

### reglas
una **regla** de iptables especifica un condicion y una accion
![[Pasted image 20241007100814.png]]

### cadenas
las reglas se agrupan en listas ordenadas de reglas, llamadas cadenas y a su vez las cadenas se agrupan en tablas
cadenas:
- input
- forward
- output
- prerouting
- postrouting

una cadena es parte de una tabla, que esta ubicada en cierto punto (HOOK) del recorrido de los paquetes. Las cadenas iptables se llaman igual que los hooks de netfilter

- para cada paquete se va comprobando si se le aplica cada regla de la cadena:
	- si una regla no se aplica a un paquete, se pasa a la siguiente regla de la cadena
	- si una regla si se aplica a un paquete, se ejecuta la accion definida en la dicha

- una cadene puede tener definida una politica, que es la accion por defecto para la cadena (por defecto accept)

### tipos de cadenas
![[Pasted image 20241007101246.png]]
- prerouting: se aplican a los paquetes que llegan a la maquina. Esta cadena se ejecuta antes de comprobar si el paquete es para la propia maquina o hay que reenviarlo
- input: se aplican a los paquetes destinados a la propia maquina. Esta cadena se ejecuta justo antes de entregarlos a la aplicacion local
- forward: se aplican a los paquetes que han llegado a la maquina pero van destinados a otra y hay que reenviarlos
- output: se aplican a los paquetes creados por la propia maquina. Esta cadena se ejecuta justo despues de que la aplicacion le paso los datos a enviar al kernel del sistema operativo y antes de consultar la tabla de encaminamiento
- postrouting: se aplican a los paquetes que salen de la maquina, tanto los creados por ella como los que se reenvian. Esta cadena de ejecuta despues de consultar la tabla de enrutamiento


### tablas
- nat: responsable de reescribir direcciones o puertos
- filter: responsable del filtrado de paquetes
- mangle: responsable de ajustar opciones de paquetes, manejar calidad de servicio, marcado o valores de TTL
- raw: seguimiento que hace el kernel de las conexiones (ej TCP) de la maquina

#### camino de los paquetes
![[Pasted image 20241007103142.png]]

#### camino simplificado de los paquetes
![[Pasted image 20241007103227.png]]

### ejemplo
![[Pasted image 20241007103315.png]]

``` java
iptables -t filter -A INPUT -s 10.0.0.2 -j REJECT // rechaza los del origen especificado
iptables -t filter -A FORWARD -s 10.0.0.3 -j REJECT // rechaza el trafico hacia internet con origen en la PC de IP 10.0.0.3
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```
### comandos 
- iptables {-t tabla} -L {cadena}{-v}
	- lista las reglas. si se omite la cadena el comando actua sobre todas. con -v se mostrara tambien el numero de paquetes y bytes que han cumplido la condicion de cada regla
- iptables {-t tabla} **-D** {cadena}{numregla}
	- borra una regla dado su numero de regla
- iptables {-t tabla} **-A** {cadena}{condicion}{accion}
	- añade una regla al final

### iptables - condiciones
- protocolo
	- -p {protocolo}
- direccion IP
	- -s {dirIP {/mascara}}: direccion origen
	- -d {dirIP {/mascara}}: direccion destino
- puerto
	- --sport {puerto |puertoInicio:puertoFin}: puerto origen
	- --dport {puerto |puertoInicio:puertoFin}: puerto destino
- interfaz
	- -i {interfaz}:interfaz de entrada
	- -o {interfaz}: interfaz de salida

### acciones
- -j ACCEPT
	- acepta el paquete
- -j DROP
	- permite descartar el paquete sin procesarlo
- -j REJECT
	- tiene el mismo efecto que DROP, pero retorna un paquete de error al origen
- -j SNAT --to-source {dirIP}{:puerto}
	- realiza source NAT sobre los paquetes salientes (es decir, se cambia direccion IP y/o puerto origen). solo se puede realizar en la cadena POSTROUTING. Esta regla hace que tambien se cambie automaticamente la direccion de destino del trafico entrante de respuesta al saliente de la misma conexión
- -j DNAT --to-destination {dirIP}{:puerto}
	- realiza destination NAT sobre los paquetes entrantes (es decir, se cambia direccion IP y/o puerto destino). solo se puede realizar en la cadena PREROUTING. Esta regla solo es necesaria para abrir puertos, es decir, permitir trafico entrante nuevo
- -j MASQUERADE --to-source {dirIP}{:puerto}
	- permite realizar enmascarameinto IP o NAPT. esto consiste en que el servidor identifica que uno de los equipos de red intenta conectar a una direccion fuera de esta, y es el mismo servidor el que realiza la peticion, en lugar de que la maquina cliente lo haga. Asi, el servidor toma la direccion IP y puerto de la maquina que hace la solicitud, la "enmascara" con la direccion IP y puerto que le ha sido asignada, la envia, y cuando llega el paquete de respuesta lo "reenvia" a la maquina y puerto que realizo la peticion

### ejemplos
iptables -L -t filter //Lista las cadenas de la tabla filter
iptables –t filter -A INPUT -p tcp -i eth1 --destination-port 21 -j DROP  //borra según protocolo y puerto destino
iptables –t filter -A INPUT –s 10.0.0.2 -j REJECT //rechaza los del origen especificado
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables –t filter -D INPUT 1  //borra la entrada 1
iptables -t nat -A PREROUTING -p tcp --dport 80 -i eth1 -j DNAT --to {IP}:8080
iptables –t filter -A FORWARD -s 10.0.0.2 -j REJECT