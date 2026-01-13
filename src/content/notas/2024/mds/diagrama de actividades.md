### definicion
- representa la vista dinamica (comportamental) del sistema
- es un diagrama de flujo entre actividades
- el flujo puede ser:
	- secuencial
	- con ramas
	- concurrente

## para que sirve?
- describir workflows
- identificar dependecias entre actividades
- apoyar visualmente la especificacion de un caso de uso

### componentes
- actividad
	- una tarea que necesita realizarse
	- no necesariamente software
		(solicitar password)
- transmision(flujo)
	- indica el flujo de control de una actividad a la siguiente
		- -> (flecha)
- estado inicial
	- indica cual es la actividad inicial
		- ○ (un circulo)
- estado final
	- indica cuando termina el flujo de actividades
	- puede haber mas de uno por motivos de "visualizacion"
		- ◎ (circulo relleno)

![[Pasted image 20241110192213.png]]

- branch
	- indica la decision del flujo de control cuando debe tomarse una decision
	- un flujo de entrada y 2 o mas de salida
		- ![[Pasted image 20241110192254.png]]
- guarda
	- condicion de cada flujo de salida de un branch
		- [condicion]
- merge
	- "junta" diferentes flujos en uno solo
	- 2 o mas flujos de entrada y 1 de salida
		- ![[Pasted image 20241110192346.png]]
![[Pasted image 20241110192358.png]]

- fork
	- 1 flujo de entrada y 2 o mas de salida
	- **indica el comienzo de actividades en paralelo**
- join
	- 2 o mas flujos de entrada y 1 de salida
	- tambien llamada barra de sincronizacion
	- indica el final de actividades en paralelo
![[Pasted image 20241110192511.png]]

- swim lanes
	- divide el diagrama en zonas
	- cada zona puede representar clases, roles, tipos de usuario, etc.
	- se representa mediante una linea punteada
		- puede ser horizontal o vertical
![[Pasted image 20241110192600.png]]