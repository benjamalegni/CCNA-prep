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

puede ser:
- clasificacion binaria: hay 2 clases posibles. ej: fraude / no fraude
- clasificacion multiclase: hay mas de 2 clases posibles. ej: especie de una flor
- clasificacion multietiqueta: un ejemplo puede tener varias clases a la vez. ej: tags de una imagen

## construccion del modelo - aprendizaje
cada tupla se supone que pertenece a una clase predefinida dada por cada uno de los atributos (etiqueta de clase)
el conjunto de todas las tuplas usadas para la construccion del modelo se llama conjunto de entrenamiento

evaluacion del modelo: 
- Se compara la etiqueta conocida de una muestra de testeo con el resultado de aplicar el modelo de clasificación
- Accuracy rate es el porcentaje de muestras del conjunto de test que son correctamente clasificadas por el modelo 
- El conjunto de test es independiente del conjunto de entrenamiento (método holdout)

## tecnicas de clasificacion principales
- arboles de decision
- clasificadores bayesianos / Naive Bayes
- KNN (vecinos mas cercanos)
- SVM (support vector machines)
- regresion logistica
- ensambles, como Random Forest y boosting

## preprocesamiento segun el modelo
antes de entrenar suele ser necesario preparar los atributos:
- KNN, SVM y regresion logistica: conviene escalar datos numericos porque dependen de distancias, margenes o pesos.
- arboles y Random Forest: no necesitan escalado, pero si necesitan que las variables categoricas esten codificadas.
- Naive Bayes: elegir la variante segun el dato: GaussianNB para continuos, MultinomialNB para conteos/texto, BernoulliNB para binarios.
- valores faltantes: imputar o eliminar antes de entrenar, segun el caso.
- pipelines: sirven para aplicar el mismo preprocesamiento en entrenamiento y prediccion sin mezclar datos.

## evaluacion de los metodos de aprendizaje supervisado:
- obtener conjunto de datos
- particionar los datos
- elegir metricas de evaluacion
- realizar los experimentos
- interpretar y analizar

entrenamiento: se usa para aprender el modelo (ej. 70%)
validacion: calibracion y ajuste de parametros (ej. 15%)
prueba (testing): se usa para estimar el rendimiento final del modelo aprendido (ej. 15%)

el conjunto de test deberia usarse al final, no para decidir parametros. si se usa para ajustar decisiones, deja de ser una evaluacion independiente.

### matriz de confusion
util para resumir aciertos y errores de un clasificador.

en clasificacion binaria:
- TP (true positives): positivos reales predichos como positivos.
- TN (true negatives): negativos reales predichos como negativos.
- FP (false positives): negativos reales predichos como positivos.
- FN (false negatives): positivos reales predichos como negativos.

sirve para detectar que tipo de error comete el modelo: falsos positivos o falsos negativos.

### metricas
las que se elijan priorizar cuando se evalua un modelo depende de los costos, beneficios y riesgos del problema especifico
#### accuracy o exactitud
proporcion de todas las clasificaciones que fueron correctas
$$
accuracy = \frac{TP + TN}{TP + TN + FP + FN}
$$
en conjuntos desbalanceados (como intrusion en redes o deteccion de fraudes), donde hay una clase minoritaria que es la que nos importa.
-> alto valor de accuracy no implica detectar la clase minoritaria

#### recall
tasa de verdaderos positivos
la proporcion de todos los positivos reales que se clasificaron correctamente como positivos
$$
recall = \frac{TP}{TP + FN}
$$

#### tasa de falsos positivos
proporcion de todos los negativos reales que se clasificaron incorrectamente como positivos
$$
FPR = \frac{FP}{FP + TN}
$$

#### specificity
mide cuantas observaciones negativas se clasificaron correctamente
$$
specificity = \frac{TN}{TN + FP}
$$

#### precision
proporcion de todas las clasificaciones positivas que son realmente positivas
$$
precision = \frac{TP}{TP + FP}
$$

#### F1-score
combina precision y recall en una sola metrica. mejora cuando ambas son altas
$$
F1 = 2 \cdot \frac{precision \cdot recall}{precision + recall}
$$

#### negative predictive value
proporcion de predicciones negativas que realmente eran negativas
$$
NPV = \frac{TN}{TN + FN}
$$

#### ROC-AUC
se utiliza para evaluar el rendimiento de un modelo de clasificacion binaria.
mide la capacidad del modelo para distinguir entre clases positivas y negativas

la curva ROC es una grafica que representa la tasa de verdaderos positivos frente a la tasa de falsos positivos en diferentes configuraciones de umbral.

AUC es el area bajo la curva ROC. es la probabilidad que el modelo clasifique una observacion positiva elegida al azar por encima de una negativa

#### Precision-Recall AUC
evalua la relacion entre precision y recall para distintos umbrales.
es especialmente util cuando hay clases desbalanceadas y la clase positiva es la importante.

#### umbral de decision
muchos modelos devuelven una probabilidad o score. por defecto suele usarse 0.5, pero se puede cambiar el umbral:
- bajar el umbral suele aumentar recall, pero tambien puede aumentar falsos positivos.
- subir el umbral suele aumentar precision, pero puede perder positivos reales.

### problemas multiclase

#### macro-averaging
calcula el valor de la metrica de evaluacion para cada clase y los promedia
se considera que todas las clases son igualmente importantes

#### weighted-averaging
se calcula promediando las puntuaciones para esa metrica de cada clase y considerando el soporte de cada una.

#### micro-averaging
suma las decisiones de todas las clases.
las clases mas populares dominan por sobre el resto.

## que metrica elegir
- accuracy: sirve si las clases estan balanceadas y todos los errores cuestan parecido.
- recall: usar cuando los falsos negativos son mas costosos que los falsos positivos.
- precision: usar cuando los falsos positivos son mas costosos que los falsos negativos.
- specificity o baja tasa de falsos positivos: usar cuando importa no marcar negativos como positivos.
- F1-score: usar cuando se necesita balance entre precision y recall.
- ROC-AUC: sirve para comparar separacion general entre clases.
- Precision-Recall AUC: suele ser mejor que ROC-AUC cuando hay fuerte desbalance de clases.

promedio macro cuando las clases son igualmente importantes.
promedio weighted cuando se quiere respetar el peso de clases mas frecuentes.
promedio micro cuando se quiere medir rendimiento global acumulando todos los aciertos y errores.

### nota: metricas de regresion
no son metricas de clasificacion, pero sirven para problemas donde la salida es numerica continua:
MAE (mean absolute error) : desviacion de las predicciones de los valores verdaderos.
RMSE (root mean square error): similar a MAE pero pone mas enfasis en las desviaciones. 

## tecnicas de particionamiento
holdout:
- los datos se particionan aleatoriamente en 2 conjuntos. en general training set (2/3 de datos) y test set (1/3 de datos)
- los conjuntos son disjuntos. no deben mezclarse porque la evaluacion dejaria de ser independiente
- con el conjunto de entrenamiento se aprende el modelo
- se utiliza la prueba para prediccion y calculo de performance

limitaciones de holdout:
- asume que tenemos un conjunto lo suficiente grande como para dividirlo
- se realiza una vez y puede no ser representativo
- alternativa: holdout repetitivo - promedio de metricas

k-fold cross validation (generalmente se usa k = 10)
- datos iniciales particionados en k subconjuntos mutuamente excluyentes de aproximadamente igual tamano
- se hace training y testing k veces. exactitud calculada promediando resultados
- en cada iteracion se usa 1 subconjunto como test y los otros k-1 como training

todos los datos se utilizan en algun momento para training y testing

stratified cross-validation
- los subconjuntos son armados intentando respetar el porcentaje de samples de cada clase del dataset original

### data leakage
ocurre cuando informacion del conjunto de test entra, directa o indirectamente, en el entrenamiento.

ejemplos comunes:
- escalar o imputar usando todo el dataset antes de separar training/test.
- elegir hiperparametros mirando el resultado del test.
- tener ejemplos casi repetidos en training y test.

para evitarlo: separar datos primero y ajustar transformaciones solo con training. si hay grupos relacionados, usar splits por grupo.

### desbalance de clases
cuando una clase tiene muchos mas ejemplos que otra, accuracy puede ser enganosa.

formas simples de manejarlo:
- usar metricas adecuadas: recall, precision, F1 o Precision-Recall AUC.
- usar stratified split o stratified cross-validation.
- ajustar el umbral de decision.
- usar pesos de clase (`class_weight`) si el modelo lo permite.
- aplicar oversampling o undersampling cuando haga falta.

### underfitting y overfitting
- underfitting: el modelo es demasiado simple y falla tanto en entrenamiento como en test.
- overfitting: el modelo aprende detalles/ruido del entrenamiento y generaliza mal en datos nuevos.

para reducir overfitting: mas datos, regularizacion, poda, limitar complejidad del modelo o usar validacion/cross-validation.

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

## ajuste de hiperparametros
los hiperparametros son decisiones del modelo que se fijan antes de entrenar.

ejemplos:
- KNN: `k`, metrica de distancia, ponderacion por distancia.
- arboles: profundidad maxima, minimo de ejemplos por hoja, criterio (`gini` o `entropy`).
- SVM: `C`, `kernel`, `gamma`.
- regresion logistica: `C`, penalizacion, solver.
- Random Forest: cantidad de arboles, profundidad, cantidad de atributos por split.

se ajustan con validation set o cross-validation. herramientas comunes: `GridSearchCV` y `RandomizedSearchCV`.
no conviene ajustar hiperparametros mirando el conjunto de test.

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
	- eliminar ramas que reflejen ruido en los datos de entrenamiento

algoritmo:
- greedy:
	- hace una eleccion optima en cada paso: elegir el mejor atributo para cada nodo del arbol
- divide y conquista recursivo top-down
	- de la raiz a las hojas

como elegir el mejor atributo para particionar:
- aleatoria
- menos valores
- mas valores
- ganancia de informacion
- indice Gini
- razon de ganancia

criterios mas usados:
- entropia: mide el desorden o impureza de un conjunto. es 0 si todos los ejemplos son de la misma clase.
- ganancia de informacion: mide cuanto baja la entropia al separar por un atributo. ID3 elige el atributo con mayor ganancia.
- indice Gini: mide impureza. es 0 cuando el nodo es puro.
- razon de ganancia: corrige la ganancia de informacion para no favorecer demasiado atributos con muchos valores distintos.

##### algoritmo ID3
- para construir arboles de decision
- hace uso de teoria de la informacion desarrollada por Shannon
- construye arbol de arriba hacia abajo
- usa ganancia de informacion para seleccionar atributo para particionar
- minimizar la informacion que necesito para clasificar ejemplos en las particiones resultantes
- mide que tan bien separa los ejemplos de entrenamiento de un conjunto dado de acuerdo a su clasificacion objetivo

utilizacion del arbol
- directamente
- indirectamente


### overfitting
un arbol generado puede hacer sobre-clasificacion debido a ruido o tamano pequeno del conjunto de entrenamiento.
resulta en baja exactitud de clasificacion de nuevos ejemplos

2 enfoques para evitarlo:
- parar antes (pre-poda)
- podado: transformar un subarbol en una hoja
	- usar un conjunto de validacion diferente al entrenamiento

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
un clasificador bayesiano simple asume independencia total entre atributos
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
Naive Bayes elige la clase mas probable combinando:
- probabilidad previa de la clase
- probabilidad de observar los atributos dada esa clase

la idea central es:
$$
clase = \arg\max P(clase) \cdot \prod_i P(atributo_i|clase)
$$

hay diferentes modelos de clasificador de bayes
- gaussian naive bayes
- multinomial naive bayes (generalmente para categorizar texto)
- bernoulli naive bayes

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

- en clasificacion: se asigna la clase mayoritaria entre los k vecinos
- en regresion: se puede promediar el valor de los k vecinos

distancias comunes:
- euclidea
- manhattan

tambien se puede ponderar el voto: vecinos mas cercanos pueden pesar mas que vecinos lejanos.

escoger el valor de K:
- si K es muy pequeno el modelo sera sensible a valores atipicos
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
- necesita escalado si los atributos tienen magnitudes muy diferentes
- desbalance en tiempos de entrenamiento/prediccion
	- dependiendo del dominio puede no ser la mejor opcion


# SVM - support vector machines
es un clasificador originalmente binario que intenta encontrar un hiperplano que separa en dos clases de datos:
- positivos
- negativos

encontrar el hiperplano que **maximice el margen**, dado por 2 vectores de soporte
el margen es el ancho en que pueden desplazarse los limites, hasta encontrarse un punto de alguna de las clases.

entrenamiento:
- encontrar el hiperplano con margen maximo
prediccion:
- una vez encontrado el hiperplano, clasifica segun de que lado cae el nuevo ejemplo

cuando los datos no son linealmente separables, las SVM utilizan **kernels** para transformar los datos en un espacio de mayor dimension donde si son separables.
kernel lineal, kernel polinomial, kernel RBF (radial basis function)

parametros importantes:
- `C`: controla el equilibrio entre margen amplio y errores de clasificacion.
- `kernel`: define la forma de la frontera de decision.
- `gamma`: en kernels como RBF, controla que tan local es la influencia de cada punto.

ventajas SVM:
- buena precision, especialmente en datos altamente dimensionales como texto
- eficiente para prediccion
desventajas SVM:
- originalmente binaria; para multiclase se usa one-vs-rest o one-vs-one
- trabaja en el espacio de numeros reales, se necesita convertir valores discretos a numericos
- requiere ajustes de kernels y parametros
- suele necesitar escalado

# regresion logistica
aunque se llame "regresion", se usa mucho para clasificacion.

idea:
- aprende una frontera de decision lineal.
- estima la probabilidad de pertenecer a una clase.
- luego aplica un umbral para decidir la clase final.

en clasificacion binaria suele predecir:
$$
P(y=1|X)
$$

ventajas:
- buena baseline para comparar con modelos mas complejos
- rapida e interpretable
- puede devolver probabilidades

desventajas:
- funciona mejor cuando la separacion entre clases es aproximadamente lineal
- requiere codificar variables categoricas y suele beneficiarse del escalado
- puede quedarse corta ante relaciones muy complejas

# otras tecnicas de prediccion-clasificacion
- algoritmos geneticos para clasificacion
- redes neuronales (densas)
- deep learning (CNN, RNN, GAN, etc)
- ensambles de clasificadores
	- random forests

### ensambles de clasificadores
se pueden crear n clasificadores y luego quedarse con la clase que resulte de combinar sus predicciones.

- bagging: entrena varios modelos en subconjuntos distintos y combina sus votos. ayuda a reducir varianza.
- boosting: entrena modelos secuencialmente, dando mas peso a los errores anteriores. puede lograr alta precision, pero es mas sensible a ruido.


### random forests
metodo de aprendizaje conjunto que combina multiples arboles de decision para obtener predicciones mas estables.

idea:
- cada arbol se entrena con una muestra aleatoria de los datos.
- en cada split se considera solo un subconjunto aleatorio de atributos.
- la prediccion final se decide por voto mayoritario.

ventajas:
- suele mejorar la precision respecto de un unico arbol.
- reduce overfitting.
- funciona bien como modelo general para datos tabulares.

desventajas:
- es menos interpretable que un unico arbol.
- puede ser mas costoso en memoria y tiempo.
