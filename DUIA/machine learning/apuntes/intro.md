machine learning es un conjunto de algoritmos que le permiten aprender a una computadora

ML es un subconjunto de la IA
ML se centra en reconocer patrones necesarioa para resolver una tarea

hay IA sin machine learning. a* por ejemplo.

### dentro de machine learning
representation learning:
	=> intenta aprender formas de describir cosas (features: valores numericos que describe una propiedad de un dato)
		=> deep learning (la forma mas comun y util): utilizacino de redes neuronales artificiales para procesar datos complejos y reconocer patrones de forma autonoma

que se hace en este modulo
- estudiar y curar una BD, calibrar y evaluar algoritmos de ML.
- identificar problemas de ML y el tipo de algoritmos existentes para aproximar una solucion (nunca se va a resolver 100% el problema)
- aprender los algoritmos mas usados, no todos.

# ML definicion
como se aprende

datos de entrada: X (vectores)
etiqueta: y
modelo: y_sombrero = f_tita(X)
medida de error (loss function): J(tita)
la idea es quedar con los titas mas pequenos posible, osea la menor medida de error


## ciclo de vida ML
1. tomar el caso de uso del negocio e identificar la tarea a resolver
	 - que datos hay disponibles
	 - identificar el problema que se necesita resolver
	 - que modelos existen para este problema
2. preparar los datos necesarios para entrenar el algoritmo
	- juntar y curar los datos
	- division de datos en test y training
3. entrenar el modelo
	- entrenar el modelo
	- evaluar la configuracion del modelo sobre los datos de validacion
	- recalibrar y repetir 1 y 2 si la performance no es satisfactoria
4. evaluar el modelo final sobre los datos de test

# los datos
cada individuo es descrito por una coleccion de caracteristicas
la cantidad de features que se tienen definira la dimensionalidad =>  d

## matriz de diseno
conjunto de observaciones y sus vectores de caracteristicas asociados suele representarse en una matriz de diseno
d(dimensionalidad) x n(cantidad de entradas)

## formato de archivo de la matriz de diseno
.csv
.txt
.dat

o archivos con compresion que permiten almacenar objetos
.mat
.pkl


# practica
curacion de datos
- de donde provienen los datos
- que proceso se uso para extraerlo
- con cuantos datos cuento
- hay valores nulos?
	- que porcentaje de las muestras contienen valores null? por ej: 2% podrian borrarse
- son lo suficientemente heterogeneos
- podria haber algun tipo de sesgo?
	- mirar variables criticas, evaluar en grupos minoritarios
- features con valores invalidos o outliers
	- usar grafica boxplot que se vayan de los pivotes para intentar encontrar esos outliers
- labels incorrectos: analisis manual, descartar muestras y repetir etiquetado.


variables
- cuantitativas
- cualitativas/categoricas
	- nominales: no tiene orden
	- ordinales: tiene orden

LabelEncoder: no respeta el orden de la secuencia.
OrdinalEncoder: te permite controlar el orden.


siempre al empezar con el analisis de datos comenzar usando un describe
mirando una matriz de confusion con un heatmap se pueden empezar a concluir cosas al mirar los datos


en deep learning usar cross validation es prohibitivo por los tiempos, aunque es el standard

70% datos de entrenamiento
- 90% del 70% de entrenamiento
- 10% del 70% de calibrado
30% datos de testing

los datos de test no tienen que ser tan chicos porque sino no sera tan representativo
tambien mantener un buen numero de entradas para el validation set

aleatorizar el sampling => no hacerlo a mano ni en el orden en el que vienen
si hay etiquetas, asegurarse que la distribucion sea similar en cada conjunto

las muestras deben ser IID
- independientes
- identicamente distribuidos => que los dos representen a la misma poblacion. suffle=true en train_test_split

problema de data leakage:
- cuando se usan datos de test para entrenar el algoritmo (sobreestimacion de performance)
	training y test no deberan compartir individuos
- normalizacion / estandarizacion hay que aplicarlos usando estadisticas de los datos de entrenamiento (no de todo el dataset completo)
- evitar el leakage implicito


## normalizacion - feature scaling
para poder ver las escalas (distancia euclidea)
se puede ver que mi medida de las distancias es sensible a la ubicacion de mis muestras en el plano


## reduccion de dimensionalidad
se puede ir de d dimensiones a 2 dimensiones (una proyeccion)
son operaciones matriciales que nos pueden llevar de d dimensiones a p dimensiones

se va a perder informacion
### PCA
intenta representar la mayor cantidad de varianza en esas proyecciones
va a estar ordenado de mayor a menor
se usa con descriptores geneticos
### t-SNE
intenta mostrar una muestra que tenga una misma distancia que en las muestras originales
preserva relaciones locales: puntos cercanos en el espacio original deberian quedar cercanos en la proyeccion
es util para visualizar clusters, pero no tanto para interpretar distancias globales

### UMAP
parecido a t-SNE, sirve para proyectar datos de muchas dimensiones a 2D o 3D para visualizarlos
intenta preservar tanto estructura local como parte de la estructura global de los datos
es mas rapido que t-SNE y suele escalar mejor con datasets grandes
hiperparametros importantes:
- n_neighbors: controla que tan local o global es la estructura que intenta conservar
- min_dist: controla que tan separados quedan los puntos en la proyeccion
