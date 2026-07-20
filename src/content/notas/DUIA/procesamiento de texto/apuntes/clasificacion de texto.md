## tipos de tareas de clasificacion

### clasificacion binaria
- 1 tarea, 2 labels
- ejemplo: clasificacion de sentimiento (positivo o negativo)
- ejemplo: clasificacion en POS (noun, verb, adj, adv...)

### clasificacion multiclase
- 1 tarea, >2 labels
- ejemplo: clasificacion de peliculas en genero mas representativo
- cada instancia pertenece a una unica clase

### clasificacion multilabel
- 1 tarea, >2 labels
- cada instancia puede pertenecer a varias clases simultaneamente
- ejemplo: detectar multiples emociones en un texto (angry, sad, happy, excited)
- ejemplo: clasificacion de peliculas en generos (una pelicula puede ser comedia Y drama)

### clasificacion multitarea
- >1 tarea (pueden estar relacionadas o no)
- por cada tarea, 2 o >2 labels
- ejemplo: tarea 1 = clasificacion POS, tarea 2 = NER
- ejemplo: tarea 1 = clasificacion de texto en categorias, tarea 2 = deteccion de sentimiento

## clasificacion multilabel

### notacion formal
- n documentos, m features (caracteristicas)
- $X_{ij}$: feature j del documento i
- $X_i$: vector de features del documento i
- **unilabel:** $Y = \{Y_j\}$ (una unica clase por documento)
- **multilabel:** $Y = \{Y_j, Y_k, ...\}$ (multiples clases por documento)

### enfoques

#### metodos de adaptacion
- modifican algoritmos de aprendizaje existentes para soportar problemas multilabel directamente

#### metodos de transformacion
transforman el problema multilabel en varios problemas de clasificacion de una unica label

hay 3 estrategias principales:

##### clasificadores independientes
- entrenar un clasificador por cada una de las etiquetas
- cada clasificador es independiente
- **problemas:**
	- puede dar lugar a combinaciones de etiquetas que no tienen sentido
	- o incluso que no son correctas en la realidad
	- ignora correlaciones entre clases que podrian ayudar a la clasificacion

##### concatenacion de clasificadores (classifier chains)
- entrenar un clasificador y usar su output como una feature en el siguiente
- se construye un "pipeline" donde un clasificador informa a otro, en lugar de informarse entre ellos de forma simultanea
- **requiere determinar cual es el orden optimo de clasificadores**
- **problema:** si el primer clasificador se equivoca, se propaga el error al resto de los clasificadores

##### label powerset
- tratar todas las combinaciones de las clases como si fueran una clase unica
- entrenar un clasificador multi-class
- el powerset (conjunto potencial) representa todas las combinaciones posibles
- **problemas:**
	- el numero de clases resultantes puede ser exponencial
	- aprender un clasificador multi-class con muchas clases puede ser costoso
	- todas las clases son aprendidas de forma independiente, no se aprende "semantica" de las variaciones de las clases
	- la distribucion de clases resultantes va a ser desbalanceada y dispersa

## evaluacion de clasificacion multilabel

en un problema de una unica label, se compara la real con la predicha directamente. en multilabel, los resultados pueden ser "parcialmente correctos" o "parcialmente incorrectos", por lo que se requieren metricas adaptadas.

hay dos familias de metricas:
- **basadas en labels:** se calculan de forma separada por cada uno de los labels y luego promediadas. no tienen en cuenta relaciones entre los labels ni correlaciones entre clases. e.g., average precision.
- **basadas en instancias:** se calculan por cada una de las instancias y luego promediadas por todo el conjunto. e.g., accuracy, hamming loss.

### precision

#### precision (samples)
de todas las labels que se predijeron, cuantas de esas son correctas.

$$Precision = \frac{y \cap \hat{y}}{\hat{y}}$$

ejemplo: $Precision = \frac{2}{3} = 0.66$

para multiples instancias:

$$Precision = \frac{1}{n} \sum_{i=0}^{n} \frac{y_i \cap \hat{y}_i}{\hat{y}_i}$$

#### precision (label)
se calcula por cada label individualmente usando la matriz de contingencia:

$$Precision_l = \frac{TP}{TP + FP}$$

ejemplo con 3 labels (A, B, C):

| asignado/era | A | B | C |
|---|---|---|---|
| A | 1 | 1 | 0 |
| no A | 0 | 1 | 0 |
| B | 1 | 0 | 0 |
| no B | 1 | 1 | 0 |
| C | 2 | 1 | 1 |
| no C | 1 | 0 | 0 |

- $Precision_A = \frac{1}{1+0} = 1$
- $Precision_B = \frac{1}{1+1} = 0.5$
- $Precision_C = \frac{2}{2+0} = 1$

### recall

#### recall (samples)
de todas las labels que eran correctas, cuantas fueron predichas.

$$Recall = \frac{y \cap \hat{y}}{y}$$

ejemplo: $Recall = \frac{2}{3} = 0.66$

#### recall (label)
se calcula por cada label individualmente:

$$Recall_l = \frac{TP}{TP + FN}$$

ejemplo:
- $Recall_A = \frac{1}{1+1} = 0.5$
- $Recall_B = \frac{1}{1+0} = 1$
- $Recall_C = \frac{2}{2+1} = 0.66$

### matriz de contingencia

se utiliza para evaluar la performance de clasificacion y ayuda a visualizarla. tiene cuatro elementos:

| | asignado yes | asignado no |
|---|---|---|
| **era yes** | **True Positive (TP):** se asigno la label y era correcta | **False Negative (FN):** no se asigno la label y era correcta |
| **era no** | **False Positive (FP):** se asigno la label y era incorrecta | **True Negative (TN):** no se asigno la label y no era correcta |

### sumarizacion de metricas por clase

#### micro average
- suma los TP, FP y FN de todas las clases
- calcula la metrica de forma global
- peso igual para cada instancia
- util cuando hay clases desbalanceadas

$$Precision_{micro} = \frac{\sum_l TP_l}{\sum_l TP_l + FP_l}$$

$$Recall_{micro} = \frac{\sum_l TP_l}{\sum_l TP_l + FN_l}$$

ejemplo: $Precision_{micro} = \frac{1+1+2}{1+0+1+1+2+0} = \frac{4}{5} = 0.8$

#### macro average
- calcula la metrica por clase individualmente
- promedia los resultados
- peso igual para cada clase
- util para ver el desempeño promedio sin importar frecuencia

$$Precision_{macro} = \frac{1}{L} \sum_{l=1}^{L} \frac{TP_l}{TP_l + FP_l}$$

$$Recall_{macro} = \frac{1}{L} \sum_{l=1}^{L} \frac{TP_l}{TP_l + FN_l}$$

ejemplo: $Precision_{macro} = \frac{1 + 0.5 + 1}{3} = \frac{2.5}{3} = 0.83$

#### weighted average
- calcula la metrica por clase
- promedia ponderando por la cantidad de verdaderos positivos de cada clase
- mas peso para clases mas frecuentes
- balancea entre micro y macro en presencia de desbalance

$$Precision_{weighted} = \sum_{l=1}^{L} \frac{n_l}{N} \frac{TP_l}{TP_l + FP_l}$$

$$Recall_{weighted} = \sum_{l=1}^{L} \frac{n_l}{N} \frac{TP_l}{TP_l + FN_l}$$

ejemplo: $Precision_{weighted} = \frac{2}{6} \cdot 1 + \frac{1}{6} \cdot 0.5 + \frac{3}{6} \cdot 1 = 0.91$

ejemplo recall:
- $Recall_{micro} = \frac{1+1+2}{1+1+1+0+2+1} = \frac{4}{6} = 0.66$
- $Recall_{macro} = \frac{0.5 + 1 + 0.66}{3} = \frac{2.16}{3} = 0.72$
- $Recall_{weighted} = \frac{2}{6} \cdot 0.5 + \frac{1}{6} \cdot 1 + \frac{3}{6} \cdot 0.66 = 0.83$

### hamming loss
- es util cuando esperamos que no sea perfecto
- puede que esta metrica no le de importancia a labels que son raras *pero son importantes*

- fraccion promedio de labels incorrectas
- cuenta cuantas veces el par (instancia, label) esta mal clasificado
- funcion de pérdida, a menor valor, mejor resultado. 0 = resultado perfecto
- promedia los errores y tolera predicciones parcialmente correctas

$$Hamming \ Loss = \frac{1}{L} \sum_{i=1}^{L} 1(\hat{y}_i \neq y_i)$$

para multiples instancias:

$$Hamming \ Loss = \frac{1}{nL} \sum_{i=1}^{n} \sum_{j=1}^{L} 1(\hat{y}_j \neq y_j)$$

ejemplo: con y = (1,0,1) e $\hat{y}$ = (1,1,1), $Hamming \ Loss = \frac{1}{3} = 0.33$ (solo 1 de 3 posiciones esta mal)

- adecuada cuando no se espera perfeccion total en la prediccion
- en datasets con gran disbalance de labels, esta metrica puede no dar suficiente importancia a labels raras pero importantes

### exact match ratio
- requiere que el conjunto de etiquetas predicho coincida exactamente con el real
- enfoque "todo o nada": o acierto perfecto o fallo total

$$Exact \ Match \ Ratio = \frac{1}{n} \sum_{i=1}^{n} 1(\hat{y}_i = y_i)$$

ejemplo: con y = (1,0,1) e $\hat{y}$ = (1,1,1), $Exact \ Match \ Ratio = 0$ (no coinciden exactamente)

- no distingue entre predicciones completamente incorrectas y parcialmente correctas
- puede ser demasiado estricta en aplicaciones reales

### 0/1 loss
- complemento de Exact Match Ratio

$$0/1 \ loss = \frac{1}{n} \sum_{i=1}^{n} 1(\hat{y}_i \neq y_i)$$

- mide la proporcion de instancias en las que la prediccion no coincide exactamente con las etiquetas verdaderas
- al igual que EMR, no considera parcialmente correctas las predicciones
- penaliza incluso los errores menores

### comparacion entre hamming loss, exact match ratio y 0/1 loss

ejemplo: y = (1,0,1), $\hat{y}$ = (1,1,1)

| metrica | valor | que mide |
|---|---|---|
| Hamming Loss | 1/3 | evalua errores individuales por etiqueta, penaliza FP y FN por separado, permite medir predicciones parcialmente correctas |
| Exact Match Ratio | 0 | evalua si todas las etiquetas predichas coinciden exactamente con las reales |
| 0/1 Loss | 1 | complemento de EMR, mas estricta, no tolera errores parciales |

- **Hamming Loss** es mas flexible: hace una iteracion por instancia y por etiqueta
- **EMR y 0/1 Loss** son mas estrictas: solo hacen una comparacion por instancia y una prediccion parcialmente correcta cuenta como incorrecta
