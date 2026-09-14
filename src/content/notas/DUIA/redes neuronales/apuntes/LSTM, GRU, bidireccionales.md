## datos secuenciales
es la parte mas importante de las redes recurrentes

importa el orden, porque cada dato depende o esta relacionado con los anteriores o posteriores en la secuencia
el valor de un dato puede influir en los siguientes

ejemplos:
- textos
- series temporales
- senales de audio o videos

se puede pensar el tiempo como una caracteristica mas. es mas, podria pasarse como una feature por ejemplo
**el problema es que la arquitectura no lo tendria implicito, seria tomada como una caracteristica mas**
# redes recurrentes
el texto es un ejemplo de que el orden de la oracion es importante.
con tecnicas tradicionales se pierde la informacion del orden

en las redes neuronales recurrentes, su entrada esta compuesta de una instrancia de diferentes pasos temporales

![[Pasted image 20260911191907.png]]

reciben dos entradas simultaneas:
- el dato Xt
- el estado oculto anterior (a_t-1 o h_t-1)

estas redes tienen el problema de vanishing gradient y exploding gradient, osea le cuesta aprender secuencias largas

1. vanishing gradient:
	- no aprende a largo plazo
	- la red pierde la capacidad de aprender dependencias a largo plazo
2. exploding
	- extremadamente inestable o fallido
	- suele requerir tecnicas como clipping para controlarlo

multiplicar mucho para atras lleva a vanishing gradient

# GRU
gated recurrent unit
![[Pasted image 20260911184447.png]]
son modelos de celdas temporales diferentes
%%> cual era el modelo de celda temporal anterior?%%

![[Pasted image 20260911184827.png]]
esas son compuertas sigma (forget en codigo) son una funcion matematica **fija**

**en resumen basico: lo que sale es una mezcla entre x\[t] con lo que sabia la red de la celda temporal anterior**

la red aprende a olvidar o a recordar o anterior como parte del entrenamiento


# LSTM
(la solucion vieja)
long-short-term memory
![[Pasted image 20260911185822.png]]
esta a diferencia de GRU, tiene 4, una compuerta mas
tiene otra entrada:
- Xt (la entrada actual)
- H_t-1 (el estado oculto anterior)
- C_t-1 (un vector de contexto)
aca hacia falta el contexto de los datos que estan entrando, **permite que la red recuerde cosas que ocurrieron hace muchos pasos atras**
![[Pasted image 20260911190351.png]]
#### como soluciona GRU no tener contexto?
compuerta de reinicio (reset-gate r_t): decide que tan importante es el pasado para la nueva propuesta de memoria.

igualmente se sigue utilizando LSTM para secuencias muy largas que exijan un control de memoria mas complejo y preciso

# RNN bidireccional
hay dos redes en paralelo:
- una hacia adelante (t=1->T)
- otra hacia atras (t =T->1)
en cada paso t, el estado que se expone combina ambos sentidos

en texto es muy bueno, porque **combina lo que paso hasta ahora con lo que va a pasar mas adelante**

ventaja: cada posicion tiene contexto completo, pasado y futuro.  util cuando toda la secuencia esta disponible de antemano
desventaja: no sirve para generacion autoregresiva
%%> que es generacion autoregresiva?%%

keras: Bidirectional(LSTM(128, return_sequences=True))

## usos LTSM
**sequence to sequence**
- por ejemplo ver si una red aprende a predecir el resultado de la suma a traves de dataset de suma resueltas
- S2S es  un tipo de arquitectura de red neuronal profunda disenada para convertir una secuencia de datos en otra secuencia de datos

representacion de la suma con LTSM S2S
- Caracteres validos (12 en total): 0,1, 2, ..,9, +,“ “.
- Entrada suma de numeros de hasta 3 cifras. Se necesitan 7 caracteres maximo.
- Los caracteres se pueden representar con representacion one-hot.
- El conjunto de entrenamiento se puede representar con matrices de 3 dimensiones: instancias X pasos de tiempo X caracteristicas (caracteres codificados en one-hot en este caso).
- la salida de la red puede ser de hasta 4 caracteres, en este caso, se represnta la distribucion de probabilidad para cada caracter
- en caso de que las secuencias sean mas cortas, se completa con el caracter " "

## sequence to sequence (seq2seq)
son una arquitectura de redes neuronales disenada para transformar una secuencia de entrada en una secuencia de salida, de longitud posiblemente diferente

se usa para todo lo relacionado para convertir una secuencia en otra secuencia

se compone de:
1. encoder
	- procesa seq de entrada
	- resume la informacion en un vector de contexto
2. decoder
	- genera la secuencia de salida
	- utiliza el vector de contexto como codificador como punto de partida

aplicaciones:
- traduccion
- **electrocardiogramas**: cuando se hace data augmentation, con cuidado. generando nuevas secuencias a partir de seniales
- pregunta-respuesta


para el problema de la suma:
![[Pasted image 20260911192920.png]]

```python
i = Input((MAXLEN, len(chars))) 
d = LSTM(128, return_sequences=False)(i) 
d = RepeatVector(DIGITS+1)(d) 
d = LSTM(128, return_sequences=True)(d) 
d = Dense(len(chars), activation='softmax')(d) 
model = Model(i, d) 
model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"]) 
model.summary()
```

un repeat vector en LSTM es la capa de conversion que toma el vector bidimensional y lo repite una cantidad especifica de veces para transformarlo en una secuencia tridimensional

las LSTM que tienen marcado return_requences son los encoders, y las que si tienen retorno son decoders

cada matriz LSTM tiene su matriz de pesos

es llevar la generacion de analisis de texto al limite


# clasificacion de texto
les redes recurrentes (LSTM/GRU) pueden utilizarse para clasificar texteo
- se suele utilizar una capa de embedding para clasificar texto
- se suelen usar una o dos capas recurrentes. mas capas pueden tener problemas de "vanishing gradient"
- se puede integrar dropout dentro de las LSTM para evitar el overfitting interno

ejemplo:
![[Pasted image 20260911200735.png]]

las dropout sirven para apagar algunas neuronas y prender otras para no crear caminos preferenciales y por ende, disminuir overfitting

los signos de pregunta son porque no conocemos las dimensiones en principio

### embedding - clasificacion de texto
si codificamos las palabras con one-hot encoding -> esto requiere muchisimo espacio
y no reutiliza pesos

lo que se hace es generar un vector de embedding:
- entrada: un indice entero (i=2)
- salida: vector denso de dimension fija (lookup: W\[i])

ventajas: menor dimensionalidad
entrenamiento eficiente
captura relaciones semanticas
reutiliza pesos mediante lookup (sin multiplicacion)

![[Pasted image 20260911201213.png]]
![[Pasted image 20260911201233.png]]
esto es un problema porque no voy a conocer el tamano del texto
porque el tamano de la secuencia es parte de la estructura de la red


soln 1:   
- padding: Consiste en quedarse con los últimos N elementos de la secuencia. Si la secuencia es más corta que N, se completan los elementos con ceros. 
- bucketing: Se generan los mini-batchs con todas las secuencias del mismo tamaño. Pueden haber batchs de distintos tamaños. Requiere implementar un Sequence en keras.

NOTA: las LSTM usan CuDNN por defecto, que solo es compatible con padding ‘post’ (el padding se agrega a la derecha, al final de la secuencia). Para usar padding ‘pre’ (padding a la izquierda) hay que inicializar las capas LSTM con use_cudnn=False. Esto es más lento ya que se pierde la aceleración de cuDNN

```python
from keras.layers import Input, LSTM, Dropout, Dense, Embedding 
from keras.models import Model i = Input((None,)) 

d = Embedding(len(words_id) + 1, 300, mask_zero=True)(i) 
d = Dropout(0.5)(d) 
d = LSTM(128, return_sequences=True)(d) 
d = Dropout(0.5)(d) 
d = LSTM(128, return_sequences=False)(d) 
d = Dropout(0.5)(d) d = Dense(1, activation='sigmoid')(d) 

model = Model(i, d) 
model.summary() 
model.compile(loss='binary_crossentropy', optimizer='rmsprop', metrics=['bin ary_accuracy'])
```
![[Pasted image 20260911201757.png]]
se pueden usar embeddings pre-entrenados. por ejemplo GloVe

#### global vectors for word representations
GloVe es un algoritmo de embeddings de palabras preentrenados, que representa palabras como vectores densos sobre co-ocurrencias globales
![[Pasted image 20260911202400.png]]
la usa en el contexto de una matriz de co-ocurrencias
%%>que es una matriz de co-ocurrencias?%%

una matriz de coocurrencias es una matriz que tiene relaciones de a pares
- facilita el reconocimiento del texto porque cada palabra la considera en relacion a todas las demas

f(x) pone como un techo de saturacion en la ocurrencia de las palabras

**para algunos casos donde necesito significados bajo un contexto especifico conviene no usar embeddings preentrenados** 

- puede reducir tiempo de entrenamiento
- permite utilizar vocabulario que no esta en el conjunto de entrenamiento. en otro caso, se puede eliminar o utilizar un valor \<unk>
- los embeddings pueden no ajustrarse a la tarea
- los embeddings pueden dejarse fijos o entrenarse

**la restriccion de los embeddings preentrenados es que sea de la misma dimension de los que requiere mi red neuronal**
## generacion de texto
ejemplo:
- dada una secuencia de caracteres, cual es el siguiente?
- (esto no es un transformer como GPT, no tiene idea de la semantica)
![[Pasted image 20260911203716.png]]

```python
generated = '' 
sentence = text[start_index: start_index + maxlen] 
generated += sentence 

for i in range(400): 
	x_pred = np.zeros((1, maxlen, len(chars))) 
	for t, char in enumerate(sentence): 
		x_pred[0, t, char_indices[char]] = 1. 
		
	preds = model.predict(x_pred, verbose=0)[0] 
	next_index = sample(preds, diversity) 
	next_char = indices_char[next_index] 
	
	generated += next_char 
	sentence = sentence[1:] + next_char
```

```python
def sample(preds, temperature=1.0): 
	preds = np.asarray(preds).astype('float64') 
	preds = np.log(preds) / temperature 
	exp_preds = np.exp(preds) 
	preds = exp_preds / np.sum(exp_preds) 
	probas = np.random.multinomial(1, preds, 1) 
	return np.argmax(probas)
```
hay otras tecnicas para la generacion de caracteres mas avanzadas (investigar)
## beam search
Otra técnica utilizada para la generación de secuencias es el beam search. En vez de generar aleatoriamente se va generando las “más” probables:
- tokens especiales \<s> inicio de sentencia, \<e> fin de sentencia
![[Pasted image 20260911204306.png]]
la ventaja de esto es que con el mismo esfuerzo computacional, **se generan muchas alternativas cuando se lo requiera**

conclusiones finales: 
![[Pasted image 20260911204535.png]]

mas alla del texto con redes recurrentes:
- captioning de imagenes
	- show, attend and tell
- reconocimiento de voz
- analisis multimodal de sentimiento
	- integran texto, audio e imagen para determinar emociones o intenciones
		- seq2seq2sentiment
