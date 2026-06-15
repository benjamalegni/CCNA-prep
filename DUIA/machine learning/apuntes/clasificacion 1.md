el objetivo es predecir una variable categorica (discreta y acotada)

Dada una muestra sin etiquetar, el modelo le asigna una clase a la que pertenece.

clasificadores:
regresion logistica
SVM
random forests
K-nearest neighbors

### tipos
segun el numero de clase:
- clasificacion binaria
- clasificacion multiclase, mas de 2 clases(de 0 a k)

en este archivo se ve solo clasificacion binaria
Logistic Regression vs. Linear Regression
Regularización en Logistic Regression
Support Vector Machines
Algunas métricas básicas para evaluar clasificación binaria
Random Forest
K-Nearest Neighbors

Los modelos determinan uno o más límites de decisión (decision boundaries) que permiten separar los datos de entrenamiento en las K clases dadas.
Los puntos que cae dentro / fuera del decision boundary se considerán como pertenecientes a la clase que “envuelven” o separan.
**En otros casos, los modelos asignan una probabilidad de pertenecer a cada clase (one-hot encoding)**

loss function mide el error de un modelo

el parametro stratify en train_test_split permite separar los datos teniendo aproximadamente la misma proporcion de las clases en cada split

## regresion logistica
Puede adaptarse para:
Trabajar con más de dos clases (problemas multiclase)
Problemas que no sean linealmente separables (regresión logística con polinomios de features)

- El modelo se entrena minimizando una función de costo que penaliza las diferencias entre las etiquetas asignadas por el modelo y las disponibles en los datos de entrenamiento.

- La función de costo no es la misma que en problemas de regresión!  
    🡪 El modelo cambió, ahora el modelo predice probabilidades
    
La nueva función de costo es la misma que se usa para minimizar el error de las redes neuronales convolucionales!!  
🡪 Negative log likelihood = multiclass cross-entropy**

![[Pasted image 20260606104005.png]]


### regularizadores en regresion logistica
![[Pasted image 20260606104721.png]]
![[Pasted image 20260606104312.png]]

OJO!
Dependiendo datos, problema, etc… puede pasar que el optimizador  
no converja con el nuevo problema regularizado!  
“Solución”: probar otro optimizador o agregar más iteraciones

## support vector machine (SVM)
estrella de la clasificacion en los 2000s
resuelve un problema de optimizacion con restricciones que permite obtener mejores modelos lineales

se busca maximizar el margen de la recta que divide las muestras => vectores de soporte
maximal margin classifier 

![[Pasted image 20260606105706.png]]
ante este problema de slack variables, se permiten que esten del otro lado del vector.
hay un tradeoff con un margen suficientemente grande
![[Pasted image 20260606110012.png]]

el signo dice de que lado del hiperplano te encontras como entrada
la funcion de costo:
- penaliza errores cometidos en los datos de entrenamiento
- tolera cierto numero de errores
- intenta maximizar el margen entre los support vectors
- incluye un regularizador por defecto

el optimizador podria no converger

## random forest (clasificador)
los nodos hojas ahora tienen la clase predicha en vez de un valor de regresion

outputs:
Clase: votación por mayoría de los árboles de decisión que lo forman.
Probabilidad de pertenecer a una clase: suma de árboles que votaron a favor de la clase / total de árboles
Feature importance: el grado de “utilidad” de cada feature (una especie de feature selection), se calcula evaluando la mejora en el OOB al tener cada feature en cuenta


## KNN
basado en la cercania de los ejemplares
se define por dos parametros:
![[Pasted image 20260606111643.png]]
con un k=1 es muy susceptible a overfitting
k>>1 muy susceptible a underfitting
k=n nos va a dar siempre la clase que mas muestras tenga

- Modelo de clasificación no lineal que no requiere entrenamiento (solamente elegir k y la función de distancia).
- Usar siempre datos de validación para elegirlo.
- Buscar siempre valores de k>1.

- El entrenamiento tiene costo computacional 0, pero el testeo tiene costo n

- Necesito comparar el punto nuevo contra todos los demás!
- Existen algoritmos para hacer esa búsqueda más eficiente (heurísticas).

- Existen herramientas para determinar cuánto peso darle a cada vecino al momento de asignarle una etiqueta al punto.
