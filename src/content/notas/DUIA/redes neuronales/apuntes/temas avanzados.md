# autoencoders
utiles para:
- reduccion de dimensionalidad
- reduccion de ruido
- generacion automatica
- recomendacion

esta disenada para comprimir datos de entrada en una representacino mas pequena y luego reconstruir la entrada original
son utiles para aprender sobre las generalidades del dataset

## variational autoencoders
- modelo generativo basado en redes neuronales
- aprende una representacion latente (espacio z) de los datos
- en lugar de codificar a un punto fijo, codifica a una **distribucion** (media μ y varianza σ²)
- permite generar datos nuevos parecidos a los originales

![[Pasted image 20260912110325.png]]
![[Pasted image 20260912110339.png]]


se puede verificar el error de reconstruccion en base a un dato real y un dato reconstruido por un autoencoder
- si hay un valor que se va del rango, entonces lo puedo considerar una anomalia
# GANs
es una red generativa que aprende a crear datos nuevos realistas
se compone de dos redes neuronales
- generador (G) produce datos sintenticos a partir de ruido aleatorio
- discriminador (D) distingue entre datos reales y generados
entrenamiento adversarial: **G intenta enganar a D, y D intenta detectar falsos**
--> hasta que el discriminador no puede discernir si las imagenes falsas son reales

![[Pasted image 20260912112305.png]]

# YOLO - you only look once
es una arquitectura diseñada para generar los bounding boxes con una sola mirada de imagenes
bounding boxes: asignan un tag a una caja en una imagen

funciona de manera tal:
- dividir una imagen en una grilla de SxS
- predecir si hay un objeto en ese punto de la grilla
- predecir un bounding box por cada elemento de la grilla
- predecir la clase

por cada celda predice un vector con los siguientes elementos:
- P(objeto): prob de que el centro de un objeto esta en la celda
- X, Y: entre 0 y 1 indicando en que parte de la celda esta el centro del bounding box
- W, H: alto y ancho del bounding box escalado a tamano de una celda = 1
- C1, C2, ... , CN: la clase (en realidad es una probabilidad de que pertenezca a la clase Ci)
para permitir mas detecciones, se suele utilizar un mecanismo de anchor boxes. se duplican los elementos del vector. un vector se usa para objetos verticales y el otro para objetos horizontales

![[Pasted image 20260912113012.png]]
### nonmaxsupression
- ordena las boxes por el mas probable
- genera un set de candidatos
- por cada box:
	- si hay un box en el conjunto de cantidatos tal que IoU es superior a un X%, descartar el box
	- sino agregarlo en el set de candidatos
![[Pasted image 20260912113036.png]]


# show and tell: a neural image caption generator
no se usa asi tal cual actualmente, pero su concepto sigue vigente

- **describir automaticamente el contenido de una imagen es un reto en IA**
- combina CV y procesamiento de lenguaje natural
- va mas alla de clasificacion de objetos: requiere capturar relaciones, atributos y actividades
- aplicaciones accesibilidad para personas con discapacidad visual, busqueda de imagenes, analisis de contenido multimedia
![[Pasted image 20260912113228.png]]

# stable difussion
es como cuando se pone un poco de colorante en agua y luego se va distribuyendo en el agua

sintesis de imagenes de alta resolucion requiere gran capacidad computacional
- los modelos de difusion logran alta calidad pero su costo en pixeles es elevado

propuesta: modelos de difusion latente (LDMs) -> aplicar difusion **en un estado comprimido latente** en lugar del espacio de pixeles
beneficio: eficacion computacional sin perder calidad visual

![[Pasted image 20260912113503.png]]
![[Pasted image 20260912113515.png]]
# facenet: a unifies embedding for face recognition
con el objetivo de reconocer caras a traves de embeddings: mientras mas similares los embeddings, mas similares las caras
- usa CNNs entrenadas end-to-end
- optimiza directamente el embedding en lugar de una capa de clasificacion
- cada rostro se representa en un vector compacto de 128 dimensiones.
- solo 128 bytes por rostro, eficiente en memoria y computo

tomando 3 embeddings -> acortar la distancia entre el anchor y el positivo mientras se agranda la distancia entre el anchor y el negative
- Anchor: Imagen base 
- Positive: Distinta imagen de la misma persona 
- Negative: Imagen de otra persona

![[Pasted image 20260912113853.png]]
![[Pasted image 20260912113907.png]]

# an image es worth 16x16 words
el problema: en CV, los CNNs dominaban debido a sus inductive biases (localidad, translacion)
limitacion: los intentos previos de usar attention en vision dependian aun de convoluciones

vision transformers: la idea es usa transformers tradicionales para hacer imagenes
importancia: permite transferir los avances de NLP a vision, con un modelo escalable y flexible


- Imagen → dividida en parches fijos (ej. 16×16). 
- Cada parche → a un vector mediante proyección lineal. 
- Se añade un token de clasificación \[CLS] y positional embeddings. 
- El Transformer procesa la secuencia con multi-head selfattention. 
- Salida del token \[CLS] → clasificación final mediante MLP.
![[Pasted image 20260912114232.png]]

# human-level control through deep reinforcement learning
![[Pasted image 20260912114255.png]]
al principio generaba movimientos random, y de ahi generaba los rewards

# deep neural networks for youtube recommendations
![[Pasted image 20260912114550.png]]
https://dl.acm.org/doi/epdf/10.1145/2959100.2959190

- Problema: Recomendación de videos en YouTube, con enormes desafíos: 
	- Escala: miles de millones de usuarios y videos. 
	- Frescura: millones de horas de contenido subido cada día. 
	- Ruido: feedback implícito, datos dispersos y metadatos desestructurados. 
- Aporte del paper: Presenta el sistema de recomendación industrial de YouTube basado en redes neuronales profundas, con un pipeline de dos etapas: generación de candidatos y ranking . 
- Modelo: red neuronal que aprende embeddings de usuarios y videos a partir de feedback implícito, formulado como clasificación multiclase extrema, con muestreo negativo para entrenar de forma eficiente. 
- Lección clave: a veces ocultar señales (ej. no usar la última búsqueda tal cual) o redefinir el problema (predecir la próxima vista futura en vez de una vista aleatoria del historial) mejora el rendimiento real, aunque suene contraintuitivo.
# PEFT: parameter-efficient fine-tuning
fine-tunear un LLM completo requiere memoria, computo y tiempo que casi nadie tiene para cada tarea nueva

PEFT: es una familia de tecnicas que congelas casi todos los pesos del modelo base y entrenan solo una pequena fraccion de parametros nuevos
adapters: capas chicas entrenables insertadas entre las capas congeladas del transformer
prompt tuning/prefix tuning: en vez de tocar pesos, se aprenden vectores continuos concatenados a la entrada o a las activaciones

LoRA: es una variantes implementada ene l notebook  -> actualizacion de bajo rango sobre las matrices de atencion

## LoRA: low-rank adaptation of large language models
idea: congelar una matriz de pesos original W0 y aprender una actualizacion de bajo rango ΔW = B·A, con r << d, k.

W = W0 + B·A. Solo A y B son entrenables (r suele ser 4, 8 o 16).

reduce los parametros entrenables en 2-3 ordenes de magnitud frente al fine-tuning completo
el adapter entrenado pesa unos pocos MB, se puede tener un modelo base y muchos adaptadores livianos, uno por tarea

![[Pasted image 20260912120810.png]]

## agentes con LLMs: ReAct
un agente usa un LLM como motor de razonamiento: decide que tool invocar , observa el resultado y repite hasta poder responder

intercada pensamientos (reason) y acciones (act) en el mismo scratchpad de texto, en vez de separar razonamiento y ejecucion. esto reduce alucinaciones: el modelo puede apoyarse en observaciones reales de las herramientas en lugar de inventar hechos.

con langchain se puede implementar este loop
![[Pasted image 20260912121015.png]]

el estado de un agente:
- es una lista que va creciendo
- cada tipo de mensaje tiene un rol distinto: sistema, usuario, asistente (con o sin tool_calls), herramienta

![[Pasted image 20260912121305.png]]
