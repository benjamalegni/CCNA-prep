## elementos
- use case: a use case involves the interaction of actors and the system
- actor: an actor represent a coherent set of roles that use cases play when interacting with these use cases
- activation: interaction between a use case and an actor
- relationships: inclusion, extension, generalization

![[Pasted image 20240925164036.png]]

### relationships
- ==generalization among use cases is just like generalization among classes==
- an include relationship between use cases means that the use case explicitly incorporates the behavior of another use case at a location specified in the base. The included use case never stands alone
- the extend relationship between use cases means that the base use case implicitly incorporated the behavior of another use case at a location specified indirectly by the extending use case

### generalization (HERENCIA)
- if a use case can be developed in different ways so a generalization relationship is needed
- there are as use cases as different development use case alternatives are, and the father
![[Pasted image 20240925164430.png]]

### include
- when 2 or more use cases share a part of behavior so the shared behavior is factorized in a new use case
- the new use case is not a normal use case, that is it will not by activated by an actos (90%)
- when the original use case is activated the included use cases are activated too (always)
- the include relationship is "explicit"
![[Pasted image 20240925165122.png]]

### extend
- if a condition is true a use case needs another to complete its behavior
- the new use case is a normal use case, that is it is activated by an actor (90%)
- when the original use case is activated according to the condition the extend use case is activated
- the extend relationship is "implicit"

![[Pasted image 20240925165348.png]]

## assumption
- is a state that must be reached before the use case can be performed, but does not constitute an actual precondition of this use case, and is not specifically included in the flow of events
- the extra behavior must be handled by another use case
- a given use case does not have to have any associated assumptions. often, a use case will not have any assumptions
- it seems to represent an "order activation" among use cases
 "son verificaciones que se suponen ya están comprobadas (==el caso de uso no tiene que checkearlas==)"