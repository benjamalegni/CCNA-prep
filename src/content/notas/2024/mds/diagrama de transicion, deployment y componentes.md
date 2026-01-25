# diagrama de transicion de estados

- representa la vista dinamica (comportamental) del sistema
- son una maquina de estados
	- un diagrama de actividades es un caso especial de diagrama de transicion de estados en el cual la mayoria de los estados son actividades
	- ambos diagramas son utiles para modelar el tiempo de vida de un objeto
		- diagrama de actividades: flujo entre actividades
		- diagrama de transicion de estados: flujo entre estados
- util para objetos reactivos

# definiciones
- **estado:** condicion o una situacion durante la vida de un objeto durante el cual cumple con alguna condicion, realiza una actividad o espera por algun evento
- **evento:** ocurrencia de un estimulo que puede provocar un cambio de estado(transicion)
- **actividad:** ejecucion computacional no atomica dentro de una maquina de estados
- **accion:** es una ejecucion computacional atomica


### componentes
- estado simple y compuesto
- transiciones, incluyendo eventos y acciones
![[Pasted image 20241110174711.png]]

## estado
se compone por:
- nombre
- acciones de entrada y salida: acciones que se ejecutan al entrar y al salir del estado respectivamente. (entry[accion] , do[actividad] ,exit[accion])
- transiciones internas: transiciones que se producen sin que se cambie de estado
- subestados: una estructura anidada de estados

## transicion
se compone por:
- estado inicial
- evento que se dispara
- guarda con la condicion en la que se dispara el evento
- accion(atomica)
- estado final

# diagrama de deployment
- modelan la topologia del hardware en el cual se ejecuta el sistema
- nodos:
	- elemento fisico/virtual que existe en tiempo de ejecucion (ej. server, storage, cloud, VM)
	- representa un recurso computacional
	- generalmente tiene algun tipo de memoria y capacidad de procesamiento
![[Pasted image 20241110190937.png]]


# diagrama de componentes
- los componentes son partes "reemplazables" de un sistema que utilizan y/o proveen un conjunto de interfaces
- modelan elementos que se ejecutan en los nodos:
	- ejecutables
	- bibliotecas
	- tablas
	- documentos
	- otros tipos de archivos
- "empaquetan" elementos logicos como clases e interfaces
![[Pasted image 20241110191103.png]]

## componentes
- cada componente debe tener un nombre
- en general solo se muestra su nombre pero:
	- se puede indicar los servicios que provee (interfaces)
	- detalles del componente como version
![[Pasted image 20241110191152.png]]
![[Pasted image 20241110191222.png]]
![[Pasted image 20241110191230.png]]