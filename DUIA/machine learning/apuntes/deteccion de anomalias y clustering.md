Modelos cuya función es describir un escenario estándar (normativo) y detectar desviaciones de ese escenario (anomalías, outliers)

Se consideran no supervisados, porque se entrenan a partir de conjuntos de datos con muestras que se asumen normativas, y porque se detectan muestras estudiando similitudes

El modelo es una función (densidad de probabilidades) o modelo geométrico que describe una población no-anómala

Dada una muestra nueva, se decide si es anomalía o no en función de qué tan lejos se ubica del escenario normal

- se utiliza cuando hay desbalance de clases
- no se conoce la semantica del problema que queremos resolver

## deteccion de anomalias
detectar muestras que no corresponde con una distribucion dada

- anomaly detection: encuentro outliers sobre un conjunto de datos (unsupervised, uso todos los datos)
- novelty detection: dada una muestra nueva, determino si corresponde o no a la distribucion que conozco (unsupervised, aunque puede ser supervised tambien)

es una alternativa para resolver problemas de clasificacion con clase muy!! sesgada!! - clse minoritaria = anomalia

### diferencias AD vs clasificacion
clasificacion:
- problema supervisado
- cada clase tiene una semantica asociada
- entrenamos con muestras de cada clase

AD:
- problema no supervisado
- solamente la clase "no-anomala" tiene semantica
- entrenamos con muestras no anomalas (o con datos que no sabemos como son)

### anomalias
muestra anomala -> escala de la distribucion de los datos
- outliers vs inliers
- no tiene por que tener semantica asociada
- puede que no podamos detectarla manualmente
- a veces no tenemos datos para evaluar performance
- interpretamos las anomalias despues de predecirlas

### AD / entrenamiento 
con etiquetas:
![[Pasted image 20260613092746.png]]
 - no es muy comun
 - las muestras con etiquetas estan el otro dataset que el de los datos de entrenamiento


si no hay etiquetas:
![[Pasted image 20260613092759.png]]

# modelos
## univariate density estimation
es area bajo la distribucion normal es = 1( probabilidad)

se calcula el medio y varianza del sample

se puede usar una distribucion normal para un problema univariado y si tiene varias features se usan varias distribuciones normales.
en una funcion se asume que las features son independientes aunque no siempre sea el caso

ventajas:
- modelo simple y facil de interpretar
- es barato computacionalmente
- esta bien si la cantidad de muestras es pequena (no lo afecta demasiado)

desventajas:
- se asume normalidad:  si las features no tienen comportamiento gaussiano, hay que gaussianizarlas
	- aplicando transformaciones (log, potencias fraccionarias)
- no considera las relaciones entre las variables porque asume independencia
- necesito tener muestras anomalas para ajustar el epsilon o estar dispuesto a mirar los resultados

## multivariate density estimation
nos da la variabilidad de cada una de las features
es como una cadena de montanas donde cada una nos da su probabilidad

nos permite estudiar como se distribuyen los vectores de caracteristicas de manera conjunta
- Si existen relaciones entre las variables, podemos explotarlas con esta distribución!
- Nos permite caracterizar el espacio normal globalmente en lugar de individualmente.
- Definida para vectores (ya no para variables individuales)

al cambiar los parametros de distribucion:
![[Pasted image 20260613095154.png]]

los cambios en las demas variables rotan la distribucion en una u otra direccion (aumenta la correlacion)

ventajas:
- captura por si mismo las relaciones/correlaciones entre las caracteristicas
- no asume independiencia entre las variables, por ende anda mejor que el univariado si existen relaciones entre ellas
desventajas:
- mas complejo y costoso computacionalmente
- necesito tener mas muestras que features, o no voy a poder calcular la matriz de covarianza inversa
- necesito tener muestras anomalas para ajustar epsilon o estar dispuesto a mirar los resultados

## LOF - local outlier factor
si una clase pertenece a un espacio normal, esta densamente poblado
y si sos un outlier estas alejado del resto de muestras

la idea es tener un score que diga que tan denso es alrededor de mi punto que elija (cuantos vecinos tengo)

reachability distance:
el maximo entre k-distance(B) y la distancia de (A,B) 

local outlier factor: indica que tan outlier es un sample

Ventajas
- Identifica outliers locales en los datos, independientemente del sparsity de las nubes
- Se puede aplicar en cualquier problema en el que podamos definir similaridad entre muestras
- No necesita conocer a priori qué es una anomalía

Desventajas
- No se recomienda utilizarlo cuando hay demasiadas features o datos (mucho costo!)
- Hiperparámetros: K (y eventualmente algún umbral, si no queremos usar 1)

## 1-Class SVM
one class support vector machine = support vector data description

se trabaja en un espacio geometrico, no con una funcion de probabilidad

se habla de SVDD con los kernels que hacen equivalentes a OCSVM porque la matematica es muy complicada

en vez de usar un kernel lineal, uso un kernel de base radialo

**Idea base**
Encontrar un modelo que describa los datos normales, y detectar outliers mirando si caen dentro o fuera

todo lo que esta dentro de la hiperesfera no es anomalo y lo que esta fuera de la hiperesfera es anomalo
- debe ser de radio minimo

### variables de slack
permito una cierta cantidad de variables de slack, que son los errores permitidos que quedan del otro lado de los vectores de soporte

### ventajas y desventajas
Ventajas
- Captura no linealidades (le puedo poner el kernel que quiera)
- Muy útil cuando no tenés suficientes muestras anómalas como para intentar entrenar el algoritmo con eso

Desventajas
- Hiperparámetro: factor de proporción de outliers (ν)
- Puede overfittear bastante y dar montones de falsos negativos si el margen de separación entre outliers e inliers es muy chico
- Tenés que estar seguro de no tener demasiado outlier en el training set

## isolation forest
Parte de la premisa que las anomalías suelen ser pocas y differentes, con lo cual pueden ser fácilmente aisladas del resto de las muestras normales

1. elijo feature al azar
2. se samplea un valor de esa feature de manera uniforme y se lo utiliza como umbral
3. repetir 1 y 2 hasta lograr que todas las muestras queden aisladas
4. cuento la cantidad de particiones que necesite para aislar todas las muestras

Ventajas
- No necesita demasiada memoria y no es costoso computacionalmente
- Puede trabajar con features irrelevantes, aunque es preferible quitárselas antes
- Se puede entrenar con/sin anomalías en el training set (con 🡪 más eficiente)
Desventajas
- Hiperparámetros: cantidad de árboles.
- Swamping: si hay muestras normales cerca de las anómalas, usar undersampling.
- Masking: ojo si hay clusters de anomalías, usar undersampling

# clustering
permiten hacer análisis no supervisado de los datos a través de una serie de estrategias que asignan a cada muestra a un agrupamiento o cluster

El hallazgo se hace observando la similitud entre pares de muestras, y agrupando aquellas que son más parecidas entre sí

Tras detectar los clusters, debemos explorar los resultados para entenderlos y asociarles una semántica particular

### diferencia con clasificacion
clasificacion:
- problema supervisado
- cada clase con semantica asociada
- entrenamos con muestras de cada clase

clustering:
- problema no supervisado
- los clusters no tienen semantica a priori
- usamos todos los datos a la vez

### clusters
agrupamiento de muestras en el espacio de caracteristicas
- no tienen semantica asociada
- no conocemos la cantidad
- no hay forma de checkear si los clusters que hallamos estan bien o no
![[Pasted image 20260613110034.png]]

si 2 muestras estan el en el mismo custer, deben estar cerca
si 2 muestras viven en distintos clusters, deben estar bien lejos 

### metricas clustering
no indican calidad en los resultados

#### davies-bouldin index
- Nos da pistas respecto a:
	- Qué tan separados están los clusters entre sí
	- Qué tan densos son internamente
Promedio de las dispersiones y distancias entre los clústers
- Cuanto más bajo, mejor

#### dunn index
Misma idea que el DB Index:
	mejora cuando los clusters están alejados entre sí y son densos
Cociente entre la distancia más chica entre centroides y el máximo de distancia interna en el cluster
Cuanto más alto, mejor
	Si numerador es alto (la distancia más chica entre clusters es alta) y el denominador es bajo (las distancias dentro de un cluster son chicas)

## metodos clustering
### k-means
cluster corresponde a muestras cercanas entre si
si estan cerca, su medida deberia poder identificar el centro de la region donde se encuentran
1. busco K centroides aleatoriamente en el espacio eligiendo K muestras al azar
2. mido distrancias de cada punto a los centroides y los asigno como miembros del cluster mas cercano
repito hasta que los centroides converjan

mas detalles:
- Encontrar la partición S en la que las distancias de cada muestra que la compone y su centroide asociado son mínimas 
- Las particiones son celdas Voronoi
- Necesito determinar a priori el número de clusters (K, hiperparámetro)
- También puedo variar la medida de distancia (por defecto, distancia Euclídea –Minkosvki con p=2–)
- Costoso computacionalmente (en cada iteración tengo que calcular la distancia de cada punto a cada centroide, y los promedios)

***Elbow plot***

Es una herramienta gráfica que nos permite elegir el valor óptimo de K para nuestros datos.
Grafica el número de clusters (K) vs. la suma de distancias al cuadrado entre todas las muestras y los centroides.
Como en K-Means esa suma se reduce a medida que aumentamos K, tiene un perfil monótono decreciente
Si K = número de muestras, entonces la distancia entre cada muestra y el centroide (si misma) es 0.
Punto óptimo: el codo (donde cae el ritmo de decrecimiento!)
### clustering jerarquico
cluster corresponde a muestras cercanas entre si

Dos tipos:
- Aglomerativo: desde abajo hacia arriba, tomamos pares y los vamos uniendo.
- Divisivo: desde arriba hacia abajo, partimos de un solo cluster y lo vamos separando.

Linkage Criterion: qué comparo entre clusters para decidir si unirlos o no.
- Mínima distancia entre todos los puntos de uno y otro?
- Máxima distancia entre todos los puntos de uno y otro?
- Distancia entre centroides?
- Distancias entre los subclusters y el nuevo?

**el dendrograma me permite estudiar muchas solucione en un solo grafico**
puede elegir el nro de clusters haciendo cortes horizontales en el dendrograma
repito el clustering aglomerativo indicando ese numero de clusters para obtener la respuesta final

silhouette_score mientras mas cerca de 1 mejor