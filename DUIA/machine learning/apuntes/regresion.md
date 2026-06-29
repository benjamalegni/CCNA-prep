regresion - definicion:
modelos cuya funcion es predecir una variable continua (cuantitativa, medible y partir de un numero real) a partir de las caracterisitcas de una observacino dada
siempre se entrenan de forma supervisada

aprendizaje:
el algoritmo varia los parametros del modelo optimizando una funcion de perdida, que penaliza que el modelo cometa errores al predecir la variable objetivo sobre los datos de entrenamiento
los hiperparametros del modelo determinan el comportamiento del algoritmo de aprendizaje y, por ende, la naturaleza del modelo de regresion que se obtiene

metricas de evaluacion
permiten comparar los valores obtenidos con los que deberiamos haber obtenido
las necesitamos para:
- calibrar los hiperparametros
- comunicar la efectividad del modelo que entrenamos

error absoluto medio
- mide la distancia entre cada prediccion y el valor real que deberia haberse predicho
- conseva las unidades de la variable

error cuadratico medio
- es como MAE pero en vez de medir el absoluto, toma el cuadrado
- penaliza mas las distancias mas grandes
- ayuda mas a minimizar los errores con distancias grandes

raiz del error cuadratico medio:
- es la raiz cuadrada del MSE

coeficiente de determinacion (R^2)
- indica que porcentaje de la variabilidad de la variable objetivo queda explicado por el modelo
- R^2 = 1 implica ajuste perfecto
- R^2 = 0 implica que el modelo no mejora a predecir siempre la media
- puede ser negativo si el modelo es peor que predecir la media

coeficiente de correlacion de Perason (r)
- mide la fuerza y direccion de una relacion lineal entre dos variables
- r cerca de 1: relacion lineal positiva fuerte
- r cerca de -1: relacion lineal negativa fuerte
- r cerca de 0: no hay relacion lineal clara

### modelos de regresion
si tenemos 2 soluciones de distinta complejidad pero dan el mismo resultado, siempre es conveniente quedarse con el mas simple

regresion lineal
es el mas utilizado y mas basico
- ridge regression
- lasso regression

random forest 
no tiene riesgo de overfitting
- XGBoost. SOTA para datos tabulares

## regresor lineal

![[Pasted image 20260605192355.png]]
la idea es minimizar funciones de perdida

forma analitica:

![[Pasted image 20260605193100.png]]
esto asume que se puede calcular la matriz inversa

no confundir solucion optima con modelo perfecto

fit_intercept ayuda a alinear la ordenada al origen de la funcion lineal

se debe evitar que el algoritmo se base en un parametro especifico, porque puede descartar parametros que son relevantes para el problema

#### regularizador
es como un corset:
un termino adicional a la funcion de perdida que penalice utilizar demasiado una unica feature
![[Pasted image 20260605195641.png]]
lambda > 1: tiene mas peso que MSE
lambda < 1: tiene menos pesos el MSE

lambda es un hiperparametro

### modelo ridge regression
incorpora un regularizador que penaliza si se pesa mucho una variable
tiene un regularizador de Tikonov => a cada uno de los parametros se los eleva al cuadrado uno por uno y luego se hace la raiz de todos
![[Pasted image 20260605200126.png]]
si el vinculo es no lineal, entonces hay un problema
- intenta que no me "case" con una variable


con el alpha/lamba si lo subo mucho se hace underfitting y si lo bajo mucho se hace overfitting
para medir underfitting y overfitting hay que mirar tanto datos de entrenamiento como de validacion


### modelo LASSO
least absolute shrinkage and selection operator

cambia el regularizador (omega)
es el valor absoluto de los pesos tita

este regularizador trata que los parametros sean sparse
tiene el efecto de obtener vectores de parametros ralos, en donde muchos parametros se volveran 0

permite hacer training y feature selection a la vez
## random forests
los arboles de decision overfittea muy facil
random forest resuelve el problema generando un monton de arboles de decision pero por definicion, todos los arboles seran diferentes
luego el promedio de todos los arboles sera la respuesta de mi modelo

bagging: cada arbol se genera a partr de un subconjunto de muestras de entrenamiento, los arboles no ven siempre los mismos patrones
feature bagging: cada arbol usa ademas un subconjunto de caracteristicas (no todas). los arboles no van a abusar de las mismas caracteristicas siempre

tiene un monton de hiperparametros

out-of-bad (oob) error
aprovechando que cada arbol trabaja sobre un subconjunto de los datos de entrenamiento, se puede usar para calcular un error

outputs del algoritmo:
prediccion: promedio de las respuestas de los arboles individuales
uncertainty: la desconfianza del algoritmo sobre la prediccion que dio, a partir del desvio estandar de las respuestas de los arboles

ventajas
- por definicion nunca tiene overfitting
- no necesita datos de validacion para calibrar hiperparametros
- hay heuristicas para seleccionar hiperparametros (cantidad de features = raiz cuadrada del total de features disponibles)

desventajas
- por definicion es no lineal, funciona mal cuando hay una relacion lineal

## XGBOOST
construye un modelo fuerte a partir de un conjunto de modelos debiles entrenados secuencialmente, donde cada nuevo modelo corrige los errores de los anteriores
minimizando una funcion de perdida con gradient descent hasta que se estabilice o converja

tiene muchos hiperparametros
ventajas
- suele ser el que mejor funciona
- bastante autoexplicativo

desventajas:
- mas lentro de entrenar que un RF o modelo lineal
- muchisimos hiperparametros
