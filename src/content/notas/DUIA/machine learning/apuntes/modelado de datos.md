![[Pasted image 20260530091136.png]]
tarea T = problema a resolver
experiencia E = los datos que necesitamos
performance P = las metricas para evaluarlo

## tipos de problemas de ML
supervisado: se entrenan a partir de muestras (features) y sus etiquetas asociadas (ground truth labels)
- gris:weakly supervised
no supervisado: los modelos descubren patrones en la distribucion de las muestras en un determinado espacio de caracteristicas
- gris:semi supervised
- gris:self-supervised


la forma en la que el algoritmo ve los datos para entrenarse
- batch learning: se aprende sobre un conjunto de datos fijo. si llegan nuevos datos normalmente se reentrena desde cero
- online learning: se entrena incrementalmente alimentandolo secuencialmente con grupos de instancias. el ritmo esta dado por un learning rate.

segun la forma en la que el algoritmo intenta generalizar nuevos datos
- instance-based learning
	- estudia el espacio de caracteristicas y asigna etiquetas en funcion de otros ejemplos que observa en el espacio. suelen estudiar la similitud entre una muestra dada y muestras de entrenamiento
- model-based:
	- el algoritmo usa los datos para aprender un modelo matematico que pueda generalizarse para trabajar con nuevos datos

4 problemas mas tipicos:
- regresion
	- modelos cuya funcion es predecir una variable continua (cuantitativa)
	- se entrenan de forma supervisada
	- se entrena minimizando el error
	- una vez entrenado puede predecir un valor de la variable objetivo sobre nuevas muestras desconocidas 
- clasificacion: 
	- se intenta predecir la etiqueta de clase
	- se entrenan de forma supervisada
	- para problemas de ordinalidad (ordenes) generalmente no es conveniente usar clasificacion
	- para problemas donde se necesite saber mas de una clase, entonces se pueden usar varios clasificadores por estas clases: ejemplo: generos musicales, donde las canciones pueden tener varios generos
- clustering
- deteccion de anomalias
	- identifican muestras que se desvian de una distribucion considerada "normativa"
	- las anomalias son outliers


# etapas del trabajo
hiperparametro => configuracion externa que se define manualmente antes del entrenamiento para controlar como el modelo aprende
parametro => los parametros son una variable interna que el modelo aprende automaticamente a partir de los datos

los datos se parten en 3

1. entrenamiento. se selecciona una configuracion para el modelo
2. validacion. sobre la particion de datos de validacion, utilizando metricas de performance

se repite 1 y 2 hasta conseguir resultados relevantes
3. escogemos la configuracion que mejor anduvo sobre los datos de validacion y evaluamos sobre los datos de test
si hay errores con los datos de test probablemente hubo problemas en el particionado de los datos

el modelo esta determinado por los parametros

### tips
validar y testear con la(s) misma(s) metrica(s)
elegir metricas representativas para el problema

grid search vs random search
sirve para la busqueda de los hiperparametros y probarlos.
grid search: permite controlar mejor la busqueda, pero tiene un costo computacional mas alto
random search: es una busqueda alternativa en la que simplemente se definen los valores de manera random.

## pipeline de modelado
1. definir el problema: tarea T, experiencia E y performance P
2. analizar los datos disponibles
3. separar train, validation y test
4. preprocesar los datos usando solo la informacion de train
5. entrenar modelos baseline
6. ajustar hiperparametros usando validation o cross-validation
7. elegir la mejor configuracion
8. evaluar una sola vez sobre test

el conjunto de test se usa solo al final. si se usa para decidir configuraciones, deja de ser una evaluacion honesta.

## baseline
un baseline es un modelo simple que sirve como punto de comparacion.

ejemplos:
- clasificacion: predecir siempre la clase mayoritaria (`DummyClassifier`)
- regresion: predecir siempre la media o la mediana (`DummyRegressor`)

si un modelo complejo no supera claramente al baseline, probablemente no esta aprendiendo algo util.

## data leakage
data leakage ocurre cuando informacion que no deberia estar disponible durante el entrenamiento termina influyendo en el modelo.

ejemplos:
- escalar o normalizar usando todo el dataset antes de separar train y test
- imputar valores faltantes usando estadisticas globales
- usar informacion futura para predecir el presente
- tener individuos repetidos o relacionados en train y test
- elegir hiperparametros mirando la performance de test

regla practica: todo lo que aprenda parametros del dataset debe hacerse con train y luego aplicarse a validation/test.

## cross-validation
cross-validation permite estimar la performance de forma mas estable que un solo split.

se usa especialmente cuando:
- hay pocos datos
- se quieren comparar modelos
- se estan ajustando hiperparametros

tipos comunes:
- KFold: divide los datos en k folds
- StratifiedKFold: mantiene la proporcion de clases en cada fold
- GroupKFold: evita que ejemplos de un mismo grupo queden en train y test al mismo tiempo
- TimeSeriesSplit: se usa cuando hay orden temporal

## metricas segun el problema
- regresion: MAE, MSE, RMSE, R2
- clasificacion: accuracy, precision, recall, F1, matriz de confusion, ROC-AUC
- clustering: silhouette score, inspeccion visual, coherencia de los grupos
- deteccion de anomalias: precision/recall sobre anomalias y tasa de falsos positivos

la metrica tiene que representar el costo real del error. por ejemplo, en problemas medicos puede importar mas el recall que la accuracy.

## desbalance de clases
si una clase aparece mucho mas que otra, la accuracy puede ser enganosa.

ejemplo: si el 95% de los casos son negativos, un modelo que siempre predice negativo tiene 95% de accuracy pero no detecta positivos.

en estos casos conviene mirar:
- matriz de confusion
- precision
- recall
- F1
- metricas macro o weighted

formas de tratarlo:
- usar class_weight
- hacer oversampling de la clase minoritaria
- hacer undersampling de la clase mayoritaria
- ajustar el threshold de decision


## overfitting y underfitting
overfitting: no generaliza, no anda bien con datos que no se parezcan a los datos de training
- medir sintomas: miro performance en datos que nunca mire
underfitting: es un modelo que no aprendio, no puede hacer nada

ambos son muy malos, pero underfitting es incluso peor
la consecuencia de bajar overfitting a veces da underfitting

| caso | training | validation/test | diagnostico |
| :--- | :--- | :--- | :--- |
| underfitting | malo | malo | modelo muy simple o features pobres |
| overfitting | bueno | malo | el modelo memorizo training |
| buen ajuste | bueno | bueno | generaliza correctamente |

causas comunes de overfitting:
- modelo demasiado complejo
- pocos datos
- mucho ruido en los datos o en las etiquetas
- data leakage
- hiperparametros mal elegidos

## regularizacion
la regularizacion sirve para reducir overfitting penalizando modelos demasiado complejos.

ejemplos:
- L1: puede llevar algunos pesos a cero, util para seleccion de features
- L2: reduce pesos grandes y suaviza el modelo
- arboles: limitar max_depth o aumentar min_samples_leaf
- redes neuronales: dropout, weight decay, early stopping

## modelo final
despues de elegir el modelo y los hiperparametros, se puede reentrenar con train + validation.

luego se evalua una sola vez sobre test.

si se quiere usar el modelo en produccion, conviene guardar el pipeline completo: preprocesamiento + predictor.

curse of dimensionality => no aplica en deeplearning
es un fenomeno donde al anadir features a un dataset crea un incremento exponencial en el volumen de los datos requeridos para representar el espacio con precision.