## product backlog
- lista ordenada de los PBIs del sistema
- enumera todas las features, requisitos, mejoras y fixes
- es responsabilidad del P.O
- P.O. y el equipo de desarrollo colaboran para refinar los itemas del product backlog
- evoluciona durante el desarrollo

## PBIs en scrum
- los detalles se negocian en conversaciones
- los PBIs se detallan a medida que se necesitan
- cada PBI representa un valor de negocio

## product backlog en el tiempo
- no todos los PBIs tienen que tener el mismo nivel de detalle al mismo tiempo
- scrum no especifica ningun formato para los PBI

## user stories
- forma de expresar PBI
- descripcion corta de una feature contada desde la perspectiva de la persona que desea la nueva capacidad
- entendibles por gente sin background tecnico
- describen que se debe implementar

# las 3 ces
![[Pasted image 20240927125506.png]]

### card
- suelen escribirse en tarjetas o sticky notes
- como "rol de stakeholder" quiero "objetivo" para "beneficio"

- ej:
	- como estudiante quiero poder inscribirme a un final de una materia para estar habilitado para poder rendirlo
	- como profesor quiero acceder a la lista de los alumnos anotados para un final para saber si tengo que preparar el examen

### conversation
- y los detalles? -> criterio de aceptacion
- test de aceptacion de alto nivel
- ej:
	- como usuario del foro quiero poder subir archivos para poder compartirlos con otros usuarios
- criterios de aceptacion
	- verificar con archivos txt y doc
	- debe soportar gif, jpeg y png
	- asegurarse que funciona con .mp4 pero solo hasta 1 gb
	- no se debe permitir la subida de archivo con derechos de autor

- otro ej:
	- como viajero quiero ver mis viajes pasados para asi saber cuantas millas he acumulado por c uno
- criterios de aceptacion:
	- debe mostrar la cantidad de millas acumuladas por viaje
	- debe mostrar la fecha de expiracion de las millas acumuladas en cada viaje

#### no confundir: criterio de aceptacion (uno o mas por user story)!=criterio de done (uno por projecto)

#### formas de escribir criterios de aceptacion
- no existe una unica forma de escribir los criterios de aceptacion
- algunas formas recomendadas:
	- verificar/testear/checkear que..
	- se debe permitir/poder...
	- demostrar que...
	- dado "precondicion" cuando "ocurre una accion del usuario", entonces "resultado esperado"

#### nivel de detalle
- un beneficio de las user stories es qeu se pueden escribir con distinto nivel de detalle

#### tipos de user stories
- epica: una user story que no podemos estimar cuanto tiempo/esfuerzo nos va a llevar
	- demasiado grande: deberia dividirse en stories mas chicas
	- falta detalle: agregar detalle y reevaluar
	- tecnologia desconocida: investigarla en un sprint
- sprintable/sprint ready: una user story que es lo suficientemente chica y detallada para incluirla en un sprint
![[Pasted image 20240927132631.png]]


### escritura de user stories
- son responsabilidad del P.O.
	- pero no signfica que sea el unico que las escribe
	- todos los involucrados pueden escribir user stories (scrum team + stakeholders)
- workshops de user-story-writing (warm-up)

## criterio INVEST
- independent:
	- una US debe ser tan independiente como sea posible
	- independientes en el orden a ser implementadas
	- la dependencia dificulta implementar US prioritarioas sin implementar antes otras menos prioritarias
- negotiable:
	- una US no es un contrato (promesa de conversacion)
	- el objetivo es implementar la necesidad del cliente
	- apoyarse en los criteris de aceptacion
- valuable:
	- las US se priorizan segun el valor de negocio
	- si no podemos determinar el valor de una US no deberiamos hacerla
	- tener en cuenta: "role" y "so that" para determinar el valor
- estimate:
	- es muy importante enternder el esfuerzo que conlleva la implementacion
	- si no podemos estimar -> dividir la US!
		- en caso de ser epica asignar tiempo para investigar
- small: que tan chica deberia ser una US?
	- -> depende del equipo y la metodologia
	- en la comunidad de scrum se recomuniendad que pueda pasar a done es no mas de 3-4 dias
- testable: 
	- siempre deberia pensarse en este punto como parte del criterio DONE
	- los criterios de aceptacion pueden servir para determinar lo que debe testearse
-> buenas user stories

##### regla de oro: las US tienen que contener (eventualmente) toda la info necesaria para que un desarrollador pueda implementar esa funcionalidad

##### importante:
- no perder info (todo debe quedar documentado)
- seguir el template
- agregar detalles en los criterios de aceptacion
- dividir las US cuando son demasiado grandes para un sprint
	- se dividen en 2 o mas US

### user story mapping (USM)
- es una tecnica que nos ayuda a construir nuestro product backlog
- el product backlog puede ser dificil de entender en el dia a dia
	- especialmente cuando se empiezan a refinar las user stories
- para mantener la vision del producto se suele utilizar la tecnica de user story mapping
	- permiten ver todas las user stories en contexto
- USM es un enfoque top-down que ayuda a organizar y priorizar las user stories

![[Pasted image 20241001162245.png]]
![[Pasted image 20241001162306.png]]
- en la confeccion del USM participa el scrum team + stakeholders
- usualmente se crea durante un workshop inicial donde se detallen las principales user stories
- pasos para crear el USM
	1. identificar los objetivos
	2. construir el backbone
	3. identificar y agrupar user stories
	4. agregar historias, usuarios y tareas faltantes
	5. priorizar user stories
	6. dividir user stories en releases

1. identificar los objs
	- que hace nuestro producto?
		- que problema estamos intentando resolver? que producto queremos construir o que feature queremos agregar?
		- quien es el usuario para el cual estamos construyendo el producto?
		- por que estamos construyendo este producto? como va a ayudar a los usuarios?
		- -> usuarios y user activities
![[Pasted image 20241001162632.png]]

2. construir el backbone (user tasks)
	- contiene las features de alto nivel
	- posiblemente sean epicas
	- debe "contar la historia" de como cada usuario usa la aplicacion
		- ejemplo para sistema de reserva de alquileres
			- crear cuenta (registrarse)
			- buscar propiedades por diferentes criterios(ciudad, precio, direccion, disponibilidad, etc)
			- ver el "perfil" de la propiedad
			- agregar dato para el pago
			- reservar propiedad
			- escribir un review
3. identificar y agrupar user stories
	- pensar en como etapabilizar la task
	- se agrupan las user stories debajo de la "user task" que mejor la representa
	- en caso de que la user task fuese una epica esto permite refinarla
	- una vez completado se pueden refinar aquellas user stories que sean demasiado complejas
	![[Pasted image 20241001205202.png]]
4. agregar historias, usuarios y tareas faltantes
	- involucrar a los stakeholders para identificar elementos faltantes:
		- usuarios
		- user activities
		- user tasks
		- user stories
5. priorizar user stories
	- desplazar las user stories a lo largo del eje vertical
	- arriba las mas importantes y abajo las menos importantes
	- se puede etiquetar a las user stories, por ej:
		- prioridad alta
		- prioridad media
		- prioridad baja
![[Pasted image 20241001205429.png]]
6. dividir user stories en releases
	- se trazan lineas horizontales, agrupando las historias de usuario en "releases"
		- las user stories ubicadas en las primeras filas definen el minimo producto viable(MVP)
		release!=sprint/iteracion
		![[Pasted image 20241001205610.png]]

### a no olvidar
- user tasks y user activities son verbos
- las stories de un task van ordenadas por criticidad debajo de la misma (en una sola columna)
- deben estar los 4 niveles

## wiki (single source of true)
- espacio para centralizar info importante
	- coding style
	- commit style
	- criterio de done(DoD)
	- documentacion de desarrollos internos (core infrasrtucture)
	- tutoriales de config de ambientes de desarrollo
	- docu de los proyectos en desarrollo
- ==evitamos:==
	- perdida de tiempo
	- info desactualizada
	- info duplicada
	- procesos incorrectos

