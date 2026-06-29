las metricas de evaluacion permiten evaluar la prediccion respecto a la etiqueta esperada

es importante ver si es la correcta:
- que mide?
- es la correcta?
- cuando se rompe?

# metricas
### accuracy
resumen independiente del numero de clases
esta muy afectada por la distribucion de las muestras

se rompe con problemas de clase sesgada

accuracy = coincidencias/totalmuestras

el problema es que no muestra el comportamiento individual para cada una de las clases

### matriz de confusion
resume aciertos y errores del algoritmo
es extendible a otras clases

a partir de la diagonal superior e inferior se muestran:
- diagonal superior = falsos negativos
- diagonal inferior = falsos positivos

importante! es importante partir de tener criterio en base del sistema en vez de influir de soluciones de kaggle

### sensitivity y specificity
sensitivity: del total de metricas positivas, a cuantas le acerto? 
specificity: del total de metricas negativas, a cuantas le acerto?

depende del problema a cual de estas se le da mayor relevancia


## regresion logistica probabilistica
técnica de clasificación que estima la probabilidad de que ocurra un evento binario

$$
p(X) = \frac{1}{1 + e^{-(\beta_0 + \beta_1X_1 + \dots + \beta_nX_n)}}
$$
### SVM - probabilidades
opcion 1. usar la distancia de la muestra al hiperplano
opcion 2. platt scaling: (Convierte los scores en probabilidades  
aprendiendo un regresor logístico sobre  
los scores de la SVM, que convierta el score en una probabilidad)

### random forest - probabilidades
Tomo la cantidad de árboles que votó por cada clase y la divido por el número total de árboles

XGBoost: 
arboles se entrenan secuencialmente
es probable que al prinicipio voten 50% y 50% a cada clase

se puede usar la formula softmax que convierte esos valores probabilisticos que devuelve XGBoost en probabilidades

### KNN - probabilidades
tomo la cantidad de k vecinos mas cercanos que tengo para cada clase y divido por el valor de k



un clasificador esta descalibrado cuando esta demasiado seguro de lo que esta diciendo


## curvas ROC
receiver operating characteristic

representa la performance de un clasificador binario

se obtiene umbralando los valores de probabilidad de la clase objetivo y calculando los valores de Se/Sp
![[Pasted image 20260612185448.png]]

#### AUC 
area under curve.
permite convertir la curva en un area

modelo random AUC = 0.5
modelo inverso AUC < 0.5
modelo correcto AUC > 0.5
modelo perfecto AUC = 1

# clase sesgada
es que una de mis clases es proporcionalmente mas abundante que las otras

las metricas de evaluacion tiene que ser mas sensibles a la clases minoritarias o no van a reflejar correctamente la performance

## metricas - clase sesgada
precision
- A.K.A. PPV (positive predictive value)
- Proporción de muestras positivas detectadas correctamente entre todas las muestras detectadas como positivas

recall (=sensitivity o TPR)
- Proporción de muestras positivas detectadas correctamente

F1 - score (o valor-F)
- Media armónica de los valores de precision y recall
- Resume en un único valor el balance entre ambas métricas
- Resiste el disbalance en los datos
- Ideal para hacer model selection y evaluar modelos de clase sesgada

**Necesitamos también una curva para evaluar scores/probas
Precision/Recall curve
- Equivalente a la curva ROC, pero en lugar de graficar TPR vs. FPR grafica Precision vs. Recall.
- Mejor indicador que la curva ROC en clases desbalanceadas
- También puede calcularse el area bajo la curva (AUC)**

### estrategias de mitigacion
- pesos en la loss function: penalizar mas los errores de la clase objetivo
- modificar artificialmente la distribucion de muestras
	- undersampling: eliminar muestras aleatoriamente
	- oversampling: eliminar muestras aleatoriamente
	- SMOTE: generar nuevas muestras sinteticas de la clase objetivo


pesos en la loss function:
![[Pasted image 20260612194242.png]]

undersampling:
- es clave la aleatoriedad
- nuevo hiperparametro (la cantidad de muestras que se quieren eliminar)
- heuristicas: igualar proporciones? muy mala porque me quedo sin datos

oversampling:
- no se crean muestras nuevan, se reproducen las que existen
- nuevo hiperparametro: cantidad de muestas a replica
- heuristica: igualar proporciones? me da overfitting

SMOTE:
genera muestras sinteticas que pertenecen a mi clase de interes

1. se elige una muestra al azar
2. se identifican k vecinos mas cercanos de la misma clase
3. se elige un vecino a azar entre los k vecinos
4. se crea muestra sintetica promedio a partir de esas 2

el tema es cuanta cantidad de muestras se crean sin repetirlas
- elegir cantidad razonable de nuevas muestras

# clasificacion multiclase
matriz de confusion: se puede seguir usando pero ahora tiene mas entradas

se toman las metricas para cada una de las clases individualmente y se toma el promedio
## one vs rest
transforma un problema de clasificacion multiclase en varios problema de clasificacion binaria

- facil extension para cualquier modelo
- necesitamos que los clasificadores produzcan scores/probabilidades
	- las clases se deciden en funcion de quien arroja la mayor probabilidad
	- si no hicieramos eso podriamos tener ambiguedades (el modelo para una clase no conoce los modelos de las otras)
- no considera interrelaciones entre las clases

## adaptar el modelo
voy a tener un vector de pesos que va a multiplicar a mi vector de caracteristicas
y se define una matriz

![[Pasted image 20260612202557.png]]
una red neuronal es una secuencia apilada de pesos tita
![[Pasted image 20260612202845.png]]

## tipos de clasificacion
linealmente separables
- pueden separarse en un hiperplano
no lineales
- no pueden separarse en un hiperplano

clasificadores no lineales:
- random forest
- KNN
- buen accuracy en problemas no lineales

clasificadores lineales
- SVM, logistic regression
- siempre buscaran un hiperplano

se puede convertir un espacio no lineal en un espacio separable

# kernel trick
se aplica una transformacion sobre los datos

catalogo de kernels => catalogo de transformaciones que se puede aplicar en un dato para que sea linealmente separable

nuevos hiperparametros:
- funcion K
- cualquier parametro que tenga la funcion

![[Pasted image 20260612204126.png]]

grid search o random search para los hiperparametros

ML: no free lunch: o me lo cocino (lo busco) o lo compro (que alguien me lo diga y lo uso)
