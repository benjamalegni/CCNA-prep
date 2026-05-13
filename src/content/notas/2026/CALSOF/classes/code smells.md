- Known knowns: cosas que sabemos que sabemos 
- Known unknowns: cosas que sabemos que no sabemos 
- Unknown unknowns: cosas que no sabemos que no sabemos

# code smells
- Indicios de problemas en el diseño del código que pueden dificultar:
	- Comprensión
	- Mantenimiento
	- Evolución
- Indican deuda técnica

### cuando usar code smells
- Métodos demasiado largos 
- Clases con muchas responsabilidades 
- Cantidad de parámetros excesivos 
- Código duplicado

### importancia de code smells
- Aumentan la complejidad innecesariamente 
- Dificultan el mantenimiento y la evolución 
- Conducen a errores sutiles o acumulación de deuda técnica 
- Reducen la legibilidad y la colaboración entre equipos

## catalogo de code smells
- Duplicated Code: bloques de código similares o idénticos en diferentes partes del sistema 
- Long Method : Método que realiza demasiadas operaciones, volviéndose difícil de leer y mantener 
- Large Class: Clase que hace demasiado: contiene muchas responsabilidades y comportamientos 
- Divergent Change: Una clase que cambia por múltiples razones: múltiples responsabilidades 
- Shotgun Surgery: Un pequeño cambio requiere modificar múltiples clases o métodos dispersos 
- Data Clumps: Grupos de datos que aparecen juntos repetidamente y deberían estar encapsulados 
- Feature Envy: Método que accede a muchos detalles internos de otra clase 
- Primitive Obsession: uso excesivo de tipos primitivos en lugar de objetos con significado 
- Switch Statements: Uso repetido de estructuras switch en lugar de polimorfism 
- Speculative Generality: Código creado 'por si acaso', pero que no aporta valor real 
- Temporary Field: Atributos que solo se usan en ciertos contextos, dejando al objeto inconsistente

### god class
- Identificación 
	- Centraliza la inteligencia del sistema (o subsistema) 
	- Hace mucho trabajo y delega solo detalles menores a otras clases 
	- Clases grandes y complejas 
	- Acceden directamente a muchos datos de clases satélites 
- Solución 
	- “Partir” la clase mediante la identificación de conjuntos de métodos relacionados
![[Pasted image 20260508102946.png]]

### brain method
- Identificación 
	- Centraliza la inteligencia de la clase 
	- Métodos muy grandes difíciles de entender y debug 
- Solución 
	- Dividir el método (e.g. heurística de comentarios) 
	- Buscar partes duplicadas 
	- Extraer partes del método a otras clases
![[Pasted image 20260508103305.png]]

### brain class
- Identificación 
	- Clases que acumulan mucha inteligencia en la forma de brain methods 
	- Complementa a God Class detectando aquellas clases complejas mas cohesivas o que no acceden a datos de clases satelites 
- Solución 
	- Misma estrategia que los brain methods 
	- Buscar código duplicado entre los brain methods
![[Pasted image 20260508103435.png]]

### intensive coupling
- Identificación 
	- Un método con demasiadas dependencias que se encuentran concentradas en una o pocas clases 
- Solución 
	- Definir un método en la clase proveedora y remplazar las llamadas a los métodos por una única al nuevo método
![[Pasted image 20260508103724.png]]

### dispersed coupling
- Identificación 
	- Un método con demasiadas dependencias que se encuentran dispersas en muchas clases 
	- La operación llama a uno o pocos métodos de cada clase 
	- Los métodos llamados suelen ser muy simples 
- Solución 
	- Muchas veces coinciden con brain methods 
	- Mover funcionalidad a las clases proveedoras 
	- Cambiar las invocaciones a clases de mayor abstracción
![[Pasted image 20260508103914.png]]

### shotgun surgery
- Identificación 
	- Situación inversa a dispersed coupling 
	- Una cambio en un método genera muchos pequeños cambios en métodos y clases 
	- La operación es llamada por varios métodos de diferentes clases 
- Solución 
	- Trasladar responsabilidades a la clase que define el smell desde las clases que la invocan 
	- Si el método es largo y complejo debería ser refactorizado	
![[Pasted image 20260508104127.png]]

### data class
- Identificación 
	- Son clases que solamente contienen datos sin tener funcionalidad compleja (POJO) 
	- Otras clases tienen mucha dependencia con esta 
- Solución 
	- Juntar en la misma clase los datos y las operaciones que utilizan los datos
![[Pasted image 20260508104219.png]]

### feature envy
- Identificación 
	- Son métodos que “están mas interesados” en los datos de otras clases que en los de la propia 
- Solución 
	- Mover el método a la clase con el que esta más acoplado
![[Pasted image 20260508104423.png]]

### refused parent bequest
- Identificación 
	- En una jerarquía un padre define métodos protected que no son utilizados por sus hijos 
- Solución:
![[Pasted image 20260508104500.png]]

### tradition breaker
- Identificación 
	- Una clase que no especializa la clase de la cual hereda 
	- Solo agrega nuevos servicios que no dependen demasiado de la funcionalidad heredada
- Solucion:
![[Pasted image 20260508104548.png]]

# accionar ante code smells
## herramientas para detectar code smells
- SonarQube – duplicación, métodos largos, clases grandes 
- PMD – reglas personalizables para Java 
- ESLint – para JavaScript y TypeScript 
- Pylint – para Python 
- RuboCop – para Ruby 
- IDEs como IntelliJ y Eclipse tienen linters integrados

## errores comunes al detectar smells
- Confundir estilo personal con mal diseño 
- Eliminar smells sin considerar el contexto 
- Aplicar refactorings sin tests 
- Perseguir perfección innecesaria (overengineering)

## cuando refactorizar?
No todos los smells deben eliminarse inmediatamente. 
- ¿Cuándo vale la pena refactorizar? 
- ¿Qué pasa si dejamos un smell? 
- ¿Cómo balancear valor vs esfuerzo?

## Refactorings comunes vs Code Smells 
- Long Method → Extract Method 
- Large Class → Extract Class 
- Data Clumps → Introduce Parameter Object 
- Feature Envy → Move Method 
- Switch Statements → Replace with Polymorphism

## smells y la arquitectura
smells no son solo un problema local

tambien pueden revelar problemas mas profundos:
- Falta de separación de responsabilidades 
- Bajo encapsulamiento 
- Dependencias cruzadas entre módulos

## como institucionalizar el control de code smells
- linters y analizadores en CI/CD
- definir smells que el equipo considera prioritarios
- tener politicas de refactorizacion post-release
- documentar smells conocidos como deuda tecnica

# resumen
- Los Code Smells no son bugs, pero anticipan problemas 
- Detectarlos a tiempo mejora la salud del sistema 
- Las herramientas de análisis estático son grandes aliadas 
- El refactoring continuo es parte de un buen mantenimiento