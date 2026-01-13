### division de la funcionalidad en niveles:
- un nivel agrupa funciones que corresponden a un mismo grado de abstraccion
- ofrece servicios bien especificados al nivel superior, utilizando los que le son provistos por el nivel inferior

### software de red: ==mayor funcionalidad y complejidad==
- interacciones entre procesos difíciles de prever
- sujeto a cambios
- interoperable

## conceptos de arquitecturas de niveles
- nivel
- servicio
- usuario del servicio
- proveedor del servicio
- protocolo
- interfaz

![[Pasted image 20240918124007.png]]
##### nivel 1: fisico. protocolo: conversion de bits/señales, sincroniza emisor y receptor. canales: cable ethernet, transmision de señales electromagnéticas
##### nivel 2: link. protocolo: corrige errores
##### nivel 3: aplicacion. protocolo: solicita y devuelve valores

## arquitecturas de niveles: modelos OSI/ISO y TCP/IP

![[Pasted image 20240918124753.png]]

##### OSI/ISO
[[niveles OSI]] el modelo OSI fue el primero y se desarrollo en una epoca en la cual tenian mucho desarrollo las redes telefonicas pero las redes de datos no existian practicamente. lo unico que habia era una adaptacion/copia para redes de datos (X.25). Fue desarrollado en un ambito muy cerrado, se creo en base a la idea de que habia una sola forma de transmision (X.25). ==cuando se quiso poner en practica (era de pago) empezaron a surgir problemas con los protocolos por su complejidad==, luego el modelo OSI desaparecio 

##### TCP/IP
es una arquitectura totalmente opuesta a OSI, que "recicla" algunos de los conceptos de OSI/ISO pero estaba orientada a resolver problemas. el merito que tiene es ser totalmente software. junto con el TCP se creo UDP en el nivel de transporte. TCP/IP no trata los aspectos tecnologicos (link layer). lo unico que hace el modelo es como va funcionar IP sobre wifi, IP sobre ethernet o cualquiera sea el medio de transmision. se desarrollo en un ambito abierto donde intervenia la gente de las universidades
