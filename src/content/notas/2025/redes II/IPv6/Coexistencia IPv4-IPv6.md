### motivacion
desarrollo de un plan de transicion de IPv4 a IPv6 gradual
- asegurar convivencia entre los dos protocolos incompatibles
- *inicialmente*: internet IPv4 con algunas redes IPv6
- *finalmente*: internet IPv6 con algunas redes IPv4

definir mecanismos de transicion
- tuneles: transporte de datagrams v6 en redes v4 o viceversa
- translacion: conversion de direcciones v4 a v6 y de v6 a v4
- doble stack: implementacion de ambos protocolos en el mismo equipo

## metodos para la transicion
![[Pasted image 20250518193402.png]]

### 1. doble stack
web server "servidor" (solo v6)
cuando arranca, pide un socket, port 80
el SO asigna 2 direcciones (doble stack) 12.1.1.1 port 80 (v4) y 2001:1234::1 port 80 (v6)
cliente browser (solo v4) quiere comunicarse con "servidor". Pide al DNS un registro A (mapping nombre en direccion v4)
DNS devuelve 12.1.1.1
cliente envia datagram a 12.1.1.1 port 80
SO doble stack: como el server es v6 solamente, cambia v4 a v6 mapped ::ffff:12.1.1.1
web server "servidor" recibe la consulta de ::ffff:12.1.1.1 contesta a esa direccion v6
SO doble stack cambia la direccion v6 mapped por la v4 (12.1.1.1) y envia datagram
browser recibe respuesta desde 12.1.1.1 port 80
![[Pasted image 20250518194325.png]]
![[Pasted image 20250518194348.png]]
![[Pasted image 20250518194400.png]]

### 2. tuneles
metodo ampliamente utilizado 
existen varios tipos de tuneles para comunicar dos equipos IPv6 a traves de la red IPv4:
- IPv6 to IPv4
- teredo
- otros
![[Pasted image 20250518194509.png]]
![[Pasted image 20250518194517.png]]
![[Pasted image 20250518194527.png]]
![[Pasted image 20250518194538.png]]

### traduccion IPv4/IPv6
- poco recomendable pero efectiva
- permiten comunicacaion entre equipos que solo soportan IPv6 con equipos que solo soportan IPv4
- Stateless IP/ICMP translation (SIIT)
	- traduce entre los formatos de cabecera IPv6 y IPv4
	- utiliza el prefijo de red ::ffff:0:0/96 (IPv4 mapeadas)
- NAT64
	- conversion de datagrams IPv4/IPv6
	- almacena mappings propios de NAT
- DNS64
![[Pasted image 20250518194933.png]]

### dual stack lite (DS lite)
 - permite que el ISP desarrolle redes de acceso solo IPv6
 - utiliza tunel IPv4 en IPv6 y NAT
 - funciones
	 - B4 en el router del usuario (encapsulacion)
	 - AFTR en puntos e la red del ISP con acceso a redes IPv4
![[Pasted image 20250518195039.png]]
![[Pasted image 20250518195047.png]]