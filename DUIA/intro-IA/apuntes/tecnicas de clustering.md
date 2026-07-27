clustering o agrupamiento es el proceso de particionar un conjunto de objetos en subconjuntos o clusters con cierto significado.

es una técnica de aprendizaje no supervisado:
- las clases no están predefinidas.
- los grupos deben descubrirse a partir de los datos.
- se usa principalmente como método descriptivo para interpretar un conjunto de datos.

el objetivo es formar subconjuntos disjuntos tales que:
- los ejemplos de un mismo cluster sean muy similares entre sí.
- los ejemplos de clusters diferentes sean muy disímiles entre sí.

un buen agrupamiento tiene:
- **alta similitud intra-cluster:** clusters compactos.
- **baja similitud inter-cluster:** clusters bien separados.

la calidad depende de:
- la medida de similitud o distancia elegida.
- los atributos usados para representar cada objeto.
- la forma elegida para representar cada cluster.

## aplicaciones

- reconocimiento de patrones.
- procesamiento de imágenes y reconocimiento de zonas en GIS.
- segmentación de clientes según sus compras.
- categorización de documentos.
- análisis de web logs.
- detección de comunidades.
- preprocesamiento para otras técnicas de IA.

## hard vs. soft clustering

- **hard clustering:** cada instancia pertenece exactamente a un cluster. no representa incertidumbre sobre su pertenencia.
- **soft clustering:** una instancia puede pertenecer a varios clusters con diferentes grados o probabilidades. ejemplo: Fuzzy C-Means.

# similitud y distancia

la similitud es subjetiva y depende del dominio. para elegir una medida hay que considerar la representación de los datos y el significado de sus atributos.

si hay características heterogéneas, como ingresos, edad, educación y hábitos de consumo, puede ser necesario normalizarlas o definir una medida de similitud específica del problema.

## distancia euclídea

es la distancia en línea recta entre dos vectores:

$$
d(x,y)=\sqrt{\sum_{i=1}^{n}(x_i-y_i)^2}
$$

un valor menor representa mayor cercanía.

## distancia Manhattan

suma las diferencias absolutas de cada dimensión:

$$
d(x,y)=\sum_{i=1}^{n}|x_i-y_i|
$$

## similitud del coseno

mide el ángulo entre dos vectores y no su magnitud:

$$
sim(x,y)=\cos(\theta)=\frac{x\cdot y}{\|x\|\|y\|}
$$

un valor cercano a 1 indica que apuntan en direcciones similares.

también pueden utilizarse el coeficiente de correlación y medidas diseñadas específicamente para el dominio.

# principales enfoques

- algoritmos de particionamiento.
- algoritmos jerárquicos.
- métodos basados en densidad.
- métodos basados en grilla.
- métodos basados en modelos.

# algoritmos de particionamiento

dado un conjunto $D$ de $n$ objetos y una cantidad $k$, construyen una partición de $D$ en $k$ clusters optimizando algún criterio.

encontrar el óptimo global por enumeración exhaustiva de todas las particiones es muy costoso. se utilizan métodos aproximados:
- **K-Means:** representa cada cluster por su centroide.
- **K-Modes:** variante para atributos categóricos.
- **K-Medoids o PAM:** representa cada cluster mediante uno de sus objetos.

# K-Means

K-Means asume que las instancias son vectores de valores reales. cada cluster $C$ se representa mediante su centroide o media:

$$
\mu(C)=\frac{1}{|C|}\sum_{x\in C}x
$$

cada instancia se asigna al cluster cuyo centroide está más cerca.

## algoritmo

dado el número de clusters $k$ y un conjunto de datos:

1. elegir $k$ objetos como centroides iniciales o semillas.
2. asignar cada objeto al centroide más cercano.
3. recalcular el centroide de cada cluster usando la media de sus objetos.
4. repetir la asignación y actualización hasta que no se produzcan cambios o se cumpla un criterio de convergencia.

el algoritmo reduce la suma de las distancias cuadradas entre cada objeto y el centroide de su cluster:

$$
SSE=\sum_{j=1}^{k}\sum_{x\in C_j}\|x-\mu_j\|^2
$$

## elección de k: método del codo

al aumentar $k$, los clusters se hacen más pequeños y el SSE disminuye.

procedimiento:
1. ejecutar K-Means para distintos valores de $k$.
2. graficar el SSE en función de $k$.
3. buscar el punto donde agregar más clusters deja de producir una reducción importante: el codo.

es una heurística, por lo que el codo puede no ser claro.

## ventajas

- es eficiente entre los algoritmos de particionamiento.
- su implementación es sencilla.

## desventajas

- hay que conocer $k$ de antemano.
- es sensible al ruido y a valores atípicos.
- el resultado depende de las semillas iniciales.
- distintas semillas pueden cambiar la velocidad de convergencia.
- puede converger a un mínimo local.
- no trabaja directamente con atributos nominales; para ellos puede usarse K-Modes.

la selección de semillas puede apoyarse en heurísticas o en resultados de otros métodos.

# clustering jerárquico

construye una jerarquía de agrupamientos representada mediante un dendrograma. al cortar el dendrograma a diferentes alturas se obtienen distintas cantidades de clusters.

existen dos estrategias:
- **aglomerativa o bottom-up:** comienza con cada ejemplo en su propio cluster y combina los clusters más similares. ejemplo: AGNES.
- **divisiva o top-down:** comienza con todos los ejemplos en un único cluster y lo divide en clusters más pequeños. ejemplo: DIANA.

## clustering aglomerativo

1. colocar cada instancia en un cluster separado.
2. buscar los dos clusters más similares.
3. reemplazarlos por su unión.
4. repetir hasta obtener un único cluster o cumplir un criterio de terminación.

el resultado es un árbol binario.

## similitud entre clusters

además de una medida $sim(x,y)$ entre instancias, hace falta definir cómo comparar dos clusters $C_i$ y $C_j$.

### single link

usa el par de elementos más similares:

$$
sim(C_i,C_j)=\max_{x\in C_i,y\in C_j}sim(x,y)
$$

si se trabaja con distancias, equivale a usar la distancia mínima entre ambos clusters.

### complete link

usa el par de elementos menos similares:

$$
sim(C_i,C_j)=\min_{x\in C_i,y\in C_j}sim(x,y)
$$

si se trabaja con distancias, equivale a usar la distancia máxima.

### average link

usa el promedio de las similitudes entre todos los pares:

$$
sim(C_i,C_j)=\frac{1}{|C_i||C_j|}\cdot
\sum_{x\in C_i}\sum_{y\in C_j}sim(x,y)
$$

## ventajas

- no hace falta conocer $k$ antes de construir la jerarquía.
- el dendrograma permite explorar los datos con diferentes niveles de detalle.
- ofrece más información estructural que una única partición.

## desventajas

- es costoso y no escala bien con muchos ejemplos.
- no puede deshacer una combinación o separación incorrecta.
- elegir dónde cortar el dendrograma e interpretar los grupos tiene un componente subjetivo.

## ejemplo: comunidades de usuarios

un recomendador de películas puede:
- describir cada película mediante género, actores, director y otros atributos.
- definir una medida de similitud entre películas o usuarios.
- agrupar películas vistas para caracterizar los intereses de un usuario.
- agrupar usuarios similares para aplicar filtrado colaborativo y recomendar películas.

# validación del clustering

validar significa evaluar cuantitativamente la calidad de un agrupamiento. es difícil porque normalmente no existen etiquetas verdaderas con las cuales comparar.

un criterio de validación usa índices numéricos para medir distintos aspectos:
- **índices internos:** usan solamente los datos y la partición obtenida.
- **índices externos:** comparan los clusters con etiquetas o clases conocidas.

## criterios internos

buscan medir cohesión y separación:
- **cohesión:** qué tan cercanos están los ejemplos dentro de un cluster.
- **separación:** qué tan diferentes están los clusters entre sí.

### overall similarity

pondera la similitud media dentro de cada cluster:

$$
OS=\sum_{j=1}^{k}\frac{n_j}{n}\cdot
\left(\sum_{x\in C_j}\sum_{y\in C_j}\frac{sim(x,y)}{n_j^2}\right)
$$

- $k$: cantidad de clusters.
- $n_j$: cantidad de elementos del cluster $j$.
- $n$: cantidad total de elementos.

cuanto mayor es el valor, mejor es el agrupamiento.

### suma de errores cuadrados

la cohesión puede medirse con la suma de errores cuadrados dentro de los clusters:

$$
WSS=\sum_i\sum_{x\in C_i}\|x-m_i\|^2
$$

$m_i$ es el centroide del cluster $C_i$. un WSS menor indica clusters más compactos.

la separación puede medirse con la suma de errores cuadrados entre clusters:

$$
BSS=\sum_i|C_i|\|m-m_i\|^2
$$

$m$ es el centroide del conjunto completo. un BSS mayor indica centroides más alejados del centro global.

### coeficiente de Silhouette

para cada ejemplo $i$:
- $a(i)$: distancia media desde $i$ hasta los demás puntos de su propio cluster; mide cohesión.
- $b(i)$: menor distancia media desde $i$ hasta los puntos de cualquier otro cluster; mide separación respecto del cluster vecino más cercano.

$$
s(i)=\frac{b(i)-a(i)}{\max\{a(i),b(i)\}}
$$

el coeficiente global es el promedio:

$$
SC=\frac{1}{N}\sum_{i=1}^{N}s(i)
$$

$s(i)$ toma valores entre -1 y 1:
- cercano a 1: el punto está bien asignado.
- cercano a 0: está en el límite entre clusters.
- negativo: en promedio está más cerca de otro cluster que del propio.

## criterios externos

requieren un ground truth con clases conocidas. las clases reales son $C=\{c_1,\ldots,c_n\}$ y el algoritmo produce clusters $K=\{k_1,\ldots,k_m\}$.

### purity

para cada cluster toma la cantidad de ejemplos pertenecientes a su clase dominante:

$$
Purity=\frac{1}{N}\sum_{k=1}^{m}\max_i(n_{ki})
$$

un valor mayor es mejor. está sesgada porque aumentar la cantidad de clusters tiende a aumentar la pureza; si cada punto fuera su propio cluster, sería máxima.

### entropía

si $p_{ij}$ es la proporción de ejemplos de la clase $i$ dentro del cluster $j$, su entropía es:

$$
H_j=-\sum_{i=1}^{n}p_{ij}\log(p_{ij})
$$

la entropía total ponderada es:

$$
H(C,K)=\sum_{j=1}^{m}\frac{n_j}{N}H_j
$$

una entropía menor indica clusters más puros.

### Rand Index

considera todos los pares de ejemplos:
- acuerdo positivo: pertenecen a la misma clase y al mismo cluster.
- acuerdo negativo: pertenecen a clases diferentes y a clusters diferentes.

$$
RI=\frac{\text{acuerdos positivos}+\text{acuerdos negativos}}
{\text{cantidad total de pares}}
$$

un valor mayor indica mayor acuerdo con las clases reales.

### homogeneidad, completitud y V-Measure

- **homogeneidad:** cada cluster contiene solamente miembros de una clase.
- **completitud:** todos los miembros de una misma clase están en el mismo cluster.
- **V-Measure:** media armónica entre homogeneidad $h$ y completitud $c$.

$$
V=2\frac{h\cdot c}{h+c}
$$

## consideraciones finales

- la validación de clustering es compleja y conserva un componente subjetivo.
- conviene analizar varios índices internos y externos en conjunto.
- si clustering es una etapa intermedia, también puede evaluarse por su impacto en la aplicación final.
