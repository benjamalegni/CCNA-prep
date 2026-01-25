### ejemplo 1
![[Pasted image 20250607013419.png]]
- consulta iterativa:
	- host en cis.poly.edu quiere la direccion IP de gaia.cs.umass.edu
	- servidor contactado responde con el nombre del servidor a contactar
	- "yo no conozco este nombre, pero pregunta a este servidor"

## consultas recursivas
- pone la carga de la resolucion de nombre al servidor contactado
- que pasa en situaciones de alta carga?
![[Pasted image 20250607013601.png]]

### DNS: cache y actualizacion de registros
- una vez que un servidor de nombre conoce un mapeo, este *guarda* (caches) el mapeo
	- las entradas del cache expiran (desaparecen) despues de algun tiempo
	- servidores TLD tipicdamente estan en cache de los servidores de nombre locales
		- asi los servidores de nombre raiz no son visitados con frecuencia

### registros DNS
DNS: es una base de datos distribuida que almacena registros de recursos (resource records, RR)
formato RR: (name, value, type, ttl)


==segun el tipo es lo que tengo almacenado en name y value

type=A
- *name* es un hostname (nombre real o canonico)
- *value* es una direccion IP

type=NS
- *name* es un dominio (e.g. foo.com)
- *value* es el nombre de host de un servidor DNS autoritativo que sabe obtener las direcciones IP de este dominio

type=CNAME
- *name* es un alias para algun nombre real (indicado en type A) www.ibm.com es realmente servereast.backup2.ibm.com
- *value* es el nombre real (canonico)

type=MX
- *value* es el nombre canonico de un servidor de correo que tiene un alias asociado con *name*

