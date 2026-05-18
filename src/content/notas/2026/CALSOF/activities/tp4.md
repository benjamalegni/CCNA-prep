2. Para cada uno de los siguientes smells, explicar: 
	- Qué problema estructural revela. 
	- Qué riesgo introduce en la evolución. 
	- Qué refactoring típico lo mitiga. 
	Smells: 
	- Long Method 
		- problema estructural: 
			- dificil de entender
			- fragil y dificil de testear
			- comunmente incluyen logica que podria ser reutilizada
		- riesgo: violacion SRP, mayor probabilidad de bugs, reusabilidad limitada.
		- refactoring: extract method
	- Large Class 
		- problema estructural:
			- mix de responsabilidades
			- dificil de testear
			- alto numero de variables instanciadas
		- riesgo:
			- no delega responsabilidades, violacion SRP
		- refactoring: extract class
	- Feature Envy (metodo que la interesan datos de otras clases mas que las propias)
		- problema estructural: puede indicar que el metodo debe pertenecer a la clase a la que le pide los datos y una encapsulacion pobre
		- riesgo: alta dependencia en datos externos
		- refactoring: mover el metodo a la clase con el que esta mas acoplado
	- Shotgun Surgery 
		- problema estructural: cuando una feature hace modificaciones a muchas clases diferentes.
			- una responsabilidad particular fue divida en un gran numero de clases
		- riesgo:
			- mala organizacion y codigo probablemente duplicado
			- mal mantenimiento
			- riesgo de introducir bugs con cambios dispersos en diferentes clases
		- refactoring:
			- move method
			- move field
	- Data Class (clase que solo contiene datos)
		- problema estructural:
			- otras clases tienen dependencia de esta
		- riesgo:
			- contribuyen a que aparezcan nuevos bugs
		- refactoring:
			- juntar en una misma clase los datos y las operaciones que utilizan los datos
	- Switch Statements
		- problema estructural: mala delegacion de comportamiento, codigo repetido
		- riesgo:
			- duplicacion y fragilidad
			- dificultad para mantener
			- pobre encapsulacion
		- refactoring:
			- polimorfismo
3. a. como un smell local puede revelar un problema arquitectonico mayor?
		un code smell es la manifestacion visible de una decision estructural mal ubicada.
		puede ser un sintoma de que la arquitectura esta forzando a esa parte del sistema a hacer algo que no deberia
b. relacion entre:
- Bajo encapsulamiento 
- Acoplamiento excesivo
- Smells como Feature Envy o Dispersed Coupling
se relacionan en que hay una mala delegacion o una mala ubicacion del comportamiento de una clase
indican una mala distribucion de responsabilidad entre clases

c. ¿Qué riesgos existen al refactorizar sin tests automatizados? 
- se pueden introducir bugs sin darse cuenta
- no detectar regresiones
- miedo a cambiar el codigo
- validacion manual incompleta
- dificultad para saber si fue una refactorizacion real
usar tests automatizados es una forma sistema de verificar que el comportamiento externo del sistema se mantenga igual.