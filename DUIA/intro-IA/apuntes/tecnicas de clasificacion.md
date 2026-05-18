flujo de trabajo en IA:
preparacion de datos => aprendizaje => evaluacion

si se deduce un valor discreto => clasificacion
si se deduce un valor continuo => regresion

la clasificacion tiene como objetivo organizar y categorizar los datos en clases diferentes.
- se crea un modelo basandose en la distribucion de los datos
- el modelo es luego usado para clasificar nuevos datos
- dado el modelo, se puede predecir la clase de un nuevo dato

en las tecnicas de clasificacion, el conjunto de datos se parte en 2:
- training data -> derivar clasificador (modelo)
- testing data

## construccion del modelo - aprendizaje
cada tupla se supone que pertenece a una clase predefinida dada por cada uno de los atributos (etiqueta de clase)
el conjunto de todas las tuplas usadas para la construccion del modelo se llama conjunto de entrenamiento

evaluacion del modelo: 
- Se compara la etiqueta conocida de una muestra de testeo con el resultado de aplicar el modelo de clasificación
- Accuracy rate es el porcentaje de muestras del conjunto de test que son correctamente clasificadas por el modelo 
- El conjunto de test es independiente del conjunto de entrenamiento (método holdout)

## tecnicas de clasificacion principales

## evaluacion de los metodos de aprendizaje supervisado:
- obtener conjunto de datos
- particionar los datos
- elegir metricas de evaluacion
- relizar los experimentos
- interpretar y analizar

entrenamiento: se usa para aprender el modelo (ej. 70%)
validacion: calibracion y ajuste de parametros (ej. 10%)
prueba (testing) opcional: se usa para testear el modelo aprendido (por ej. 30%)

### matriz de confusion
util para estimar medidas de evaluacion de la clasificacion
se pueden detectar diferencias entre la clase real y la predicha por el modelo.
(falsos negativos y falsos positivos)

### metricas
las que se elijan priorizar cuando se evalua un modelo depende de los costos, beneficios y riesgos del problema especifico
#### accuracy o exactitud
proporcion de todas las clasificaciones que fueron correctas
en conjuntos desbalanceados (como intrusion en redes o deteccion de fraudes), donde hay una clase minoritaria que es la que nos importa.
-> alto valor de accuracy no implica detectar la clase minoritaria

#### recall
tasa de verdaderos positivos
la proporcion de todos los positivos reales que se clasificaron correctamente como positivos

#### tasa de falsos positivos
proporcion de todos los negativos reales que se clasificaron incorrectamente como positivos

#### specificity
mide cuantas observaciones negativas se clasificaron correctamente

#### precision
proporcion de todas las clasificaciones positivas que son realmente positivas

#### F1-score
combina precision y recall en una sola metrica. mejora cuando ambas son altas

#### negative predictive value
el numero de verdaderos negativas dividido por el numero total de items negativos

#### ROC-AUC
se utiliza para evaluar el rendimiento de un modelo de clasificacion binaria.
mide la capacidad del modelo para distinguir entre clases positivas y negativas

la curva ROC es una grafica que representa la tasa de verdaderos positivos frente a la tasa de falsos positivos en diferentes configuraciones de umbral.

es la probabilidad de pertenencia a la clase real.

AUC es el area bajo la curva ROC. es la probabilidad que el modelo clasifique una observacion positiva elegida al azar por encima de una negativa

### problemas multiclase

#### macro-averaging
calcula el valor de la metrica de evaluacion para cada clase y los promedia
se considera que todas las clases son igualmente importantes

#### weighted-averaging
se calcula promediando las puntuaciones para esa metrica de cada clase y considerando el soporte de cada una.

#### micro-averaging
suma las desiciones de todas las clases.
las clases mas populares dominan por sobre el resto.

## que metrica elegir
recall: se usa cuando los falsos negativas son mas costosos que los falsos positivos
tasa de falsos positivos: se usa cuando los falsos negativos son mas costosos que los falsos positivos
precision: cuando es importante que las predicciones positivas sean precisas

promedio macro cuando las clases son igualmente importantes
...
### regresion
MAE (mean absolute error) : desviacion de las predicciones de los valores verdaderos.
RMSE (root mean square error): similar a MAE pero pone mas enfasis en las desviaciones. 

## tecnicas particionamiento
holdout:
- los datos se particiones aleatoriamente en 2 conjuntos. en general training set (2/3 de datos) y test set (1/2 de datos)
- los conjuntos son disjuntos, no mezclarlos. porque el modelo puede llegar a tener overfitting
- con el conjunto de entrenamiento se aprende el modelo
- se utiliza la prueba para prediccion y calculo de performance

limitaciones de holdout:
- asume que tenemos un conjunto lo suficiente grande como para dividirlo
- se realiza una vez y puede no ser representativo
- alternativa: holdout repetitivo - promedio de metricas

k-fold cross validation (generalmente se usa k = 10)
- datos iniciales particionados en k subconjuntos mutuamente excluyentes de aproximadamente igualtamano
- se hace training y testing k veces. exactitud calculada promediando resultados
- usa cada subconjunto para 


todos los datos se utilizan en algun momento para training y testing

stratified cross-validation
- los subconjuntos son armados intentando respetar el porcentaje de samples de cada clase del dataset original

### evaluacion y comparacion de metodos de clasificacion
- exactitud de prediccion
- velocidad
	- tiempo de construccion del modelo
	- tiempo para usarlo
- robustez
	- manejo de valores faltantes y ruido
- escalabilidad
- facilidad de interpretacion
	- nivel de entendimiento provisto por el modelo
- formas de las reglas
	- tamano del arbol de decision

# arboles de decision
representa la relacion existente entre la clase y sus atributos

consta de:
- nodos internos que denotan un test sobre un atributo
- ramas representan la salida de un test
	- todas las tuplas en una rama tienen el mismo valor para el atributo evaluado
- nodos hojas representan las etiquetas de clase 

generacion del arbol:
1. construccion del arbol
2. podado del arbol
	- elminar ramas que reflejen ruido en los datos de entrenamiento

algoritmo:
- greedy:
	- hace una eleccion optimal en cada paso: elegir el mejor atributo para cada nodo del arbol
- divide y conquista recursivo top-down
	- de la raiz a las hojas

como elegir el mejor atributo para particionar:
- aleatoria
- menos valores
- ams valores
- ganancia de informacion
- indice Gini
- razon de ganancia

##### algoritmo ID3
- para construir arboles de decision
- hace uso de Teoria de la informacion desarrollada por Shannon
- construye arbol de arriba hacia abajo
- usa ganancia de la informacion para selccionar atributo para particionar
- minimizar la informacion que necesito para clasificar ejemplo en las particiones resultantes
- mide que tan bien separa los ejemplos de entrenamiento de un conjunto dado de acuerdo a su clasificacion objetivo

utilizacion del arbol
- directamente
- indirectamente


### overfitting
un arbol generado puede hacer sobre-clasificacion debido a ruido o tamano pequeno del conjunto de entrenamiento.
resulta en baja exactictitud de clasificacion de nuevos ejemplos

2 enfoques para evitarlo:
- para entes (pre-poda)
- podado: transformar un subarbol en una hoja
	- usar un conjunto de datos diferentes de entrenamiento

#### ventajas arboles de decision
- facil de interpretar
- es posible derivar reglas
#### desventajas arboles de decision
- costoso cuando hay muchas dimensiones
- un ejemplo solo puede descender por una sola rama
- no considera interacciones entre atributos
- cada decision se basa en un unico atributo y no recupera errores en las ramas
- no incremental
- puede tener overfitting

# clasificador bayesiano
basado en el teorema de bayes

- usa aprendizaje probabilistico para calcular explicitamente las probabilidades de las hipotesis
un clasificador bayesieno simple asume independencia total entre atributos
- funciona bien con grandes conjuntos de datos y tiene alta precision de clasificacion
- es incremental porque cada ejemplo podria aumentar o disminuir la probabilidad de que una hipotesis sea correcta

## teorema de bayes
El teorema de Bayes permite actualizar la probabilidad de una hipótesis a partir de nueva evidencia.  
  
La fórmula general es:  
  
$$
P(H|E) = \frac{P(E|H) \cdot P(H)}{P(E)}
$$

- `P(H|E)` es la probabilidad posterior: la probabilidad de que la hipótesis `H` sea verdadera dado que ocurrió la evidencia `E`.
- `P(E|H)` es la verosimilitud: la probabilidad de observar la evidencia `E` si la hipótesis `H` es verdadera.
- `P(H)` es la probabilidad previa: la probabilidad inicial de la hipótesis antes de observar la evidencia.
- `P(E)` es la probabilidad de la evidencia.

### clasificador naive

hay diferentes modelos de clasificador de bayes
- gaussian naive bayes
- multinomial naive bayes (generalmente para categorizar texto)
- burnoulli naive bayes

ventajas del clasificador naive bayes:
- eficiente en tiempos de entrenamiento y clasificacion
- robusto a atributos irrelevantes

desventajas: 
- hace suposicion fuerte de independencia entre los atributos

# vecinos mas cercanos (KNN)
aprendizaje basado en instancias (lazy learning)
en lugar de hacer generalizaciones, compara instancias nuevas con instancias vistas en memoria

funcionamiento:
cada ejemplo se puede representar como un punto en un espacio n-dimensional, para un ejemplo en particular los k ejemplos mas cercanos en el espacio son sus vecinos mas cercanos

- en clasificacion: se asigna la clase mas cercana
- en regresion: ...

escoger el valor de K:
- si K es muy pequeno el modelo sera sensilo a valores atipicos
- si K es muy grande, probablemente se le asigne la clase mayoritaria

entrenamiento:
- almacena los ejemplos de entrenamiento
prediccion:
- calcula la distancia del nuevo ejemplo con todos los ejemplos de entrenamiento
- identifica k vecinos mas cercanos
- usa las clases de los k vecinos para determinar la clase del ejemplo


ventajas:
- algoritmo simple/intuitivo
- no requiere la construccion de un modelo explicito
- buena precision si el numero de ejemplos es suficientemente grande

desventajas:
- requiere alto espacio de almacenamiento
- sensible a ruido en ejemplos y caracteristicas, tambien a presencia de outliers
- lento para prediccion
- desbalance en tiempos de entrenamiento/prediccion
	- dependiendo del dominio puede no ser la mejor opcion


# SVM - support vector machines
es un clasificador binario que intenta encontrar un hiperplano que separa en dos clases de datos:
- positivos
- negativos

encontrar el hiperplano que **maximice el margen**, dado por 2 vectores de soporte
el margen es el ancho en que pueden desplazarse los limites, hasta encontrarse un punto de alguna de las clases.

entrenamiento:
- encontrar el hiperplano con margen maximo
prediccion:
- una vez encontrado w y b, permite conocer el valor de y 

cuando los datos no son linealmente separables, las SVM utilizan **kernels** para transformar los datos en un espacio de mayor dimension donde si son separables.
kernel lineal, kernel polinomial, kernel RBF (radial basis function)

ventajas SVM:
- buena precision, especialmente en datos altamente dimensionales como texto
- eficiente para prediccion
desventajas SVM:
- clasificacion binaria
- trabaja en el espacio de numeros reales, se necesita convertir valores discretos a numericos
- requiere ajustes de kernels y parametros

# otras tecnicas de prediccion-clasificacion
- regresion
- algoritmos geneticos para clasificacion
- redes neuronales (densas)
- deep learning (CNN, RNN, GAN, etc)
- ensambles de clasificadores
	- random forests

### ensambles de clasificadores
se pueden crear n clasificadores y luego quedarme con la clase qeu resulte de la combinacion de los votos de las clases (la opinion mayoritaria)

- bagging: como suponer con varios doctores y quedarme con la opinion mayoritaria
- boosting: pondero cada diagnostico segun la confiabilidad personal a cada medico


### random forests
metodo de aprendizaje conjunto (ensamble) combina multiples arboles de desicion para generar precisiones mas precisas y estables

