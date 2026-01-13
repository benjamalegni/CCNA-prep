#### what is visual modeling?
"modeling captures essential parts of the system"

visual modeling is modeling using standard graphical notations

### what is UML?
- uml stands for unifies modeling language
- the uml combines de best of the best from
	- data modeling concepts (entity relationship diagrams)
	- business modeling (work flow)
	- object modeling		
	- component modeling

- the UML is the standard language for visualizing, specifying, constructing, and documenting the artifacts of a software-intensive system
- it can be used with all processes, throughout the development life cycle, and across different implementation technologies


## types of UML models
structural diagrams:
- class diagram: models concepts in the application domain, as well as internal concepts invented as part of the implementation of the application
	- classes
	- relationships: association, generalization, dependency
- object diagram: models a set of objects and their relationships. represents static snapshots of instances of the things found in class diagrams
- deployment diagram: models the implementation structure of the application itself, such as organization into components and its deployment onto run-time nodes
- component diagram: models the organization of the model itself


behavioral diagrams:
- use case diagram: models the functionality of the system as perceived by outside users, called actors
	- actors
	- use cases
- interaction diagram: describes sequence of messages exchanges among roles that implement behavior of a system
	- sequence diagrams
	- collaboration diagrams
- statechart diagram: models the possible life histories of an object of a class:
	- states
	- transitions
	- event
	- activities
- activity diagram: shows the computational activities involved in performing a calculation


# use cases (casos de uso)
- a use case specifies the behavior of a system or a part of a system and is a description of a set sequences of actions
- use cases are used to capture the intended behavior of the system in develop
- a use case represents a functional requirement of a system as a whole
- use case: a use case involves the interaction of actors and the system
- actor: an actor represents a coherent set of roles that use cases play when interacting with these use cases
- activation: interaction between a use case and an actor
- relationships: inclusion, extention, generalization
	![[Pasted image 20240921193629.png]]
- a use case describes what a system does but it does not specify how it does it
- a use case is specified describing a flow of events in text clearly, including how and when the use case starts and ends, when the use case interacts with the actors and what objects are exchanged

## actors
- an actor represents a coherent set of roles that use cases play when interacting with these use cases
- an **actor can be:**
	- a human
	- a hardware device
	- another system plays with a system
- according to the role of the actor in the use case an actor can be: primary or secondary. an actor can be primary in a use case and secondary in another use case
- a use case has an only one primary actos and zero or more secondary actors
- an special actos is the clock, that represents a time specific activation of a use case

# use cases description
**nombre del caso de uso:** nombre representativo de dicha funcionalidad
**descripcion breve:** descripcion en un parrafo de lo que hace ese caso de uso
**actor primario/secundario(s):** actores involucrados en el CU
**trigger:** situacion por la que el caso de uso se activa
**curso basico**: flujo de ejecucion ideal
**cursos alternativos:** desviaciones del flujo de ejecucion ideal
**precondicion:** algo que debe ser verdadero (checkeado por el caso de uso) antes de desarrollar su funcionalidad
**postcondicion:** algo que debe ser verdadero (checkeado por el caso de uso) despues de desarrollar su funcionalidad
**suposiciones:** verificaciones que se suponen ya estan comprobadas (el caso de uso no tiene que checkearla)
**casos de uso que extiende:** casos de uso a los que incorpora nueva funcionalidad en situaciones particulares
**casos de uso incluactor primario/secundario(s):** casos de uso que necesita para completar su funcionalidad
**finalizacion del caso de uso:** situaciones por las cuales un caso de uso termina(se desarrollo correctamente, hubo algun alternativo que termino el desarrollo del caso de uso, cancelacion)