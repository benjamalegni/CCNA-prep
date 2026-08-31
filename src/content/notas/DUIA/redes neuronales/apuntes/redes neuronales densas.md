son las primeras que surgen
en las redes neuronales **no es tan necesario hacer tanto preprocesamiento**

desde regresion lineal hasta redes neuronales:
regresion lineal -> regresion polinomial -> regresion logistica -> redes neuronales

## neuronas y layers
funcion de activacion:
![[Pasted image 20260829092245.png]]
a: el resultado que devuelve la activacion sigmoidea
x: el input
![[Pasted image 20260829093609.png]]
cada una de esas neuronas ocultas son regresores logisticos con una funcion de activacion sigmoidea
todas las features entran a todas las neuronas
sola cada neurona tiene que aprender lo que tenga que aprender

**se combinan las features de entrada para crear nuevas features**

### frameworks para redes neuronales
tensorflow -> mas bajo nivel
keras -> usa tensorflow under the hood, mas alto nivel

en keras, una red neuronal se arma agregando capas de forma secuencial a un modelo tipo Sequential
la layer basica de una red neuronal artificial en keras es la Dense
en una layer del tipo Dense cada neurona esta conectada a todas las salidas de la layer anterior


units => cantidad de neuronas
epochs => nro de pases completos que el algoritmo tiene que hacer sobre el dataset entero para llegar al entrenamiento
batch_size => cantidad de ejemplos por pasada
validation_split => en cada pasada de epoch, entrena y valida con el porcentaje indicado

## hiperparametros
**nro de layers**
es necesario probar con distintos tipos de redes neuronales
esto esta relacionado con el overfitting

mas capas no siempre significa mejores resultados

**funcion de activacion**
por cada neurona en cada layer, cada vector w es distinto
![[Pasted image 20260829101558.png]]
hay variables para elegir la funcion de activacion
![[Pasted image 20260829101958.png]]
- sigmoidea
- reLU
- lineal
- tanh
- leaky reLU
	- evita el problema de las neuronas muertas, teniendo una pequena pendiente positiva para numeros <0
![[Pasted image 20260829102045.png]]
%%>por que usar relu/leaky en hidden layers? %%

clasificacion multiclase
![[Pasted image 20260829103118.png]]
se adecuan estas funciones para atacar problemas de clasificacion multiclase

para usar el algoritmo de regresion softmax para implementar un clasificador multiclase se implementa una ultima capa con funcion de activacion softmax y el label estimado sera el de mayor probabilidad de las salidas
![[Pasted image 20260829103338.png]]
![[Pasted image 20260829103442.png]]

**inicializacion de pesos**
consiste en definir todos los "w" y todos los "b"
si se inicializa mal: 
- el modelo puede aprender muy lento
- desvanecimiento del gradiente
- tener gradientes explosivos

1. aleatoria/uniforme (normal, gaussiana)
2. xavier/glorot
	- para activacion sigmoide o tanh
3. he initialization
	- para relu y leaky relu

# entrenamiento
consta de 2 partes
**forward propagation**
- ajusta los pesos de atras para adelante
aca cuando termino el fit en la ultima layer, puedo saber el error de estimacion

**back propagation**
- es el proceso en el que se lleva el error de estimacion hacia atras, ajustando los "w" y "b". con la funcion de costos, la derivada, etc.
depende de la cantidad de epochs y batch_size puede terminar en un forward propagation
## optimizaciones

Adam: adaptative moment estimation
- dependiendo de como se desarrola el descenso del algoritmo, a veces es necesario tener una tasa de aprendizaje alpha mayor o menor
- el algoritmo de adam puede ajustar la tasa de aprendizaje automaticamente
	- dependiento de si se esta cerca o lejos del minimo


## overfitting
- Evaluación: Train/Test vs Train/Validation/Test 
- Podemos obtener tres valores de error: 
	- Error de Entrenamiento 𝐽𝑡𝑟𝑎𝑖𝑛(𝑤 Ԧ, 𝑏) 
	- Error de Validación 𝐽𝑐𝑣(𝑤 Ԧ, 𝑏) 
	- Error de Testeo 𝐽𝑡𝑒𝑠𝑡(𝑤 Ԧ, 𝑏)

underfitting: 
- complejizar modelo
- buscar features mas representativas
overfitting:
- simplificar el modelo
- seleccionar menos y mejores features
- regularizar

### L2 regularization
previene el overfitting en los modelos de ML
agrega un parametro extra al modelo que busca regular el aprendizaje

se agrega a la funcion costo y busca quitar relevancia a algunos parametros de w
![[Pasted image 20260829114214.png]]
### hiperparametros de regularizacion
**dropout**
es una tecnica de regularizacion para redes neuronales
establece un valor que define la probabilidad de que cada neurona de las diferentes layers sea eliminada momentaneamente de la red neuronal

**gaussian noise**
es una tecnica de regularizacion para redes neuronales
consiste en agregar ruido aleatorio con distribucion gaussiana a las entradas o a las activaciones de una capa durante el entrenamiento

se genera con media=0 y una desviacion estandar configurable σ
