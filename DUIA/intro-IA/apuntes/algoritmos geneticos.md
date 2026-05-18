## computacion evolutiva
es disenar algoritmos de aprendizaje para entornos complejos que imiten procesos adaptativos y evolutivos que se encuentren en la naturaleza

ejemplos:
 - programacion evolutiva
 - estrategia evolutiva
 - **algoritmos geneticos**
 - programacion genetica

# fundamentos
- procedimiento iterativo
- produce una serie de generacion de poblaciones, 1 poblacion por cada iteracion
- cada miembro de la poblacion representa una solucion al problema se le denomina cromosoma
- nuevas soluciones se generan por crossover (recombinacion) y mutacion
- requiere el calculo de una funcion de fitness o aptitud

puede ser comparado con sistemas biologicos
- miembros de una poblacion compiten por sobrevivir
- especies que mejor se adapten a su ambiente son las que tienen mas posibilidades de reproducirse
- hijos son un hibrido de sus padres
- hijos tienen codigo dgenetico independiente al de sus padres
- padres son gradualmente reemplazados por hijos
- poblacion cada vez mas apto y se adapta al ambiente con el paso del tiempo

# componentes
Técnica de codificación gen, cromosoma 
Procedimiento de inicialización creación 
Función de fitness ambiente 
Selección de padres reproducción 
Operadores Genéticos mutación, crossover (recombinación)
![[Pasted image 20260515201719.png]]

# pasos del algoritmo
1. Construir/configurar una población inicial de miembros (agentes, estrategias, posibles soluciones a un problema, etc.). 
2. Evaluar la aptitud de cada miembro de la población actual y descartar a los menos aptos. 
3. Aplicar operaciones genéticas (p. ej., mutación, recombinación) a la población restante (padres) para generar una nueva población (hijos) que reemplace a los miembros menos aptos descartados. 
4. Volver al Paso 2 y repetir.

## poblacion
inicializacion de la poblacion: aleatoria o soluciones conocidas

### tamano de la poblacion
esta variable define la cantidad de soluciones candidatas (individuos) presentes a cada generacion
\+ poblacion => \+ diversidad (fomenta exploracion del espacio de busqueda)

## reproduccion
crossover:
- Puede acelerar considerablemente la búsqueda en las primeras etapas de la evolución de una población 
- Puede conducir al descubrimiento y la retención de combinaciones efectivas

## seleccion de padres
los padres se eligen mediante la funcion de fitness
voy a querer conservar caracteristicas de los individuos que son mejores
hay distintas formas de plantear la funcion de fitness. Algunas de ellas son:
- Selección por rueda de la ruleta 
	- La ruleta gira una cantidad aleatoria y devuelve el cromosoma apuntado por la flecha
- Selección por torneo 
	- se selecciona un par (o grupo) de individuos aleatoriamente
	- dentro de ese grupo, se compara su firness
	- el individuo con mejor fitness gana el torneo y es elegido como padre
	- se repite el proceso hasta obtener cantidad de padres deseada
- Elitismo
	- se copian los N mejores cromosomas a la nueva poblacion y el resto se determinan con otros metodos

# crossover
puede hacerse un crossover de un punto, de 2 puntos o puede ser un crossover uniforme, donde interviene un valor de probabilidad que dice cuando copiar un valor de un padre u otro.
![[Pasted image 20260515202526.png]]

## crossover uniforme
el valor en una posicion dada en el cromosoma de la descendencia corresponde al valor en esa posicion del cromosoma de alguno de los padres (con 50% de probabilidad)
## crossover mutacion
causa un movimiento en el espacio de busqueda, altera genes aleatoriamente y mantiene la diversidad genetica
- puntos de mutacion (bit flip)
	- selecciona un bit aleatorio en el string y cambiarlo
- mutaciones complejas
	- mutar un patron o secuencias de bits
	- intercambio: swap mutation
	- scramble mutation
		- inversion mutation

# evaluacion
El evaluador decodifica un cromosoma y le asigna un valor de fitness
El evaluador es el único nexo entre el algoritmo genético y el problema que se está solucionando 
Se necesita un modelo de evaluación distinto para cada problema

## tecnicas de fitness
la evaluacion es directamente el valor de fitness
Windowing: toma el valor más bajo y asigna a cada cromosoma un valor de fitness igual a la cantidad que excede del mínimo 
Normalización lineal: los cromosomas se ordenan por orden decreciente de valor de evaluación, y se le asigna un valor de fitness que comienza con una constante y decrece linealmente. El valor individual y el decremento son parámetros de esta técnica.

## eliminacion de individuos
Eliminar todos: elimina todos los miembros de la población actual y los reemplaza con el mismo número de cromosomas que fueron creados 

Steady-State: Elimina n de los viejos miembros, y los reemplaza con n nuevos miembros 

Steady-State-No duplicates: igual al anterior pero chequea no incluir cromosomas duplicados en la población. Tiene un costo adicional pero se explora más cantidad del espacio de búsqueda.

## numero de generaciones
El número de generaciones determina cuántas iteraciones o ciclos ejecutará el algoritmo genético. 
Cada generación produce un nuevo conjunto de individuos mediante selección, cruce y mutación. 
Un mayor número de generaciones generalmente permite que el algoritmo tenga más tiempo para explorar el espacio de búsqueda exhaustivamente.

# criterios de terminacion del algoritmo genetico
- se llega al numero maximo de generaciones
- encontrar solucion satisfactoria
- alcanza un nivel de aptitud predefinido
- equilibrio (no se producen mejoras)
- tiempo computacional

# implementacion
Representación de los miembros de la población 
- Tamaño de la población, tasa de mutación, etc. 
- Políticas de selección y eliminación 
- Operadores de cruce y mutación 
- Criterios de terminación ¿Cuándo es suficiente una solución? 
- Especificación de la función de aptitud 
	- La "solución" depende en gran medida de la función de aptitud (la especificación de la "aptitud" suele ser la parte más difícil).

# resumen
ventajas:
- el algoritmo determina que hacer para resolver el problema
- operan de forma simultanea con varias soluciones
- se puede obtener una solucion al problema en cualquier momento
- se puede aumentar la velocidad de evolucion con conocimiento del problema
- facilita la exploracion de soluciones alternativas
- utilizan operadores probabilisticos
- el algoritmo puede ser disenado como un modulo separado de la aplicacion

desventajas:
- puede tardar mucho en converger
- no siempre se puede representar el conocimiento del dominio en la forma que requiere el algoritmo genetico (gran desventaja)

es un algoritmo bio-inspirado, imita comportamiento biologico para resolver un problema (generalmente de optimizacion)

