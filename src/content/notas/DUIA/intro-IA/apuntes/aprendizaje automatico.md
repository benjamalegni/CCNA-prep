es un subconjunto de la IA que permite a los sistemas aprender, identificar patrones y tomar decisiones y tomar decisiones sin necesidad de programacion explicita.

como se clasifican los tipos de aprendizajes automaticos
- aprendizaje supervisado
	a partir de ejemplos dados ya clasificados o etiquetados
- aprendizaje no supervisado
	mediante exploracion de los datos disponibles
- aprendizaje por refuerzo
	aprende tomando decisiones y recibe una recompensa si decision es correcta y penalizacion si la decision es incorrecta
- aprendizaje semi-supervizado
- IA generativa

## aprendizaje supervisado
hay que proporcionarle datos con los resultados correctos conocidos
estos sistemas de ML son "supervisados" en el sentido que un **humano proporciona datos con los resultados correctos conocidos**

#### regresion (clase continua)
por ej: predecir el precio de una casa. se necesita un conjunto de entrenamiento
se usa cuando la variable objetivo es numerica, continua o cuantitativa. 
Busca predecir un valor especificao dentro de un rango infinito de posibilidades

#### clasificacion (clase discreta)
se usa cuando la variable objetivo es categorica o discreta

objetivo:
aprender un modelo a partir de una serie de ejmplos.
hipotesis o modelo: se infiere a partir de los ejemplos, se puede expresar de distintas formas

*revisar el problema del libre stuart russell y peter norvig del modelo de ML para ver si espero para comer en un restaurante o no basandose en distintas preguntas*

## aprendizaje no supervisado
el modelo se entrena con un conjunto de datos sin etiquetar
#### clustering (o agrupamiento)
agrupa puntos de datos similares en clusteres.
hay diferentes tecnicas de clustering.
#### deteccion de anomalias
identifica puntos de datos que se desvian de los patrones normales. Ejemplo transacciones inusuales con tarjetas de credito, sin necesidad de etiquetas de fraude.
- puntuales: dato individual fuera del rango
- contextuales: dato normal en general, pero anomalo en contexto
- colectivas: datos que vistos individualmente, parecen normales, pero en conjunto forman un patron anomalo

## aprendizaje semi-supervisado
combinacion entre el aprendizaje supervisado y el no supervisado

combina datos etiquetados y no etiquetados para construir un modelo supervisado

#### reglas de asociacion
identifica relac
#### reduccion de dimensionalidad

## aprendizaje por refuerzo
el sistema inteligente aprende tomando decisiones y recibe recompensa si tomo la decision correcta y penalizaciones cuando se equivoca

## inteligencia artificial generativa
crea nuevo contenido, texto, imagenes, videos basandose en lo que aprendio del contenido existente

### IA generativa - imagenes
Stable diffusion, firefly, midjourney, etc.

la IAG no dibuja desde cero una imagen.
reconstruye una imagen basada en patrones probabilisticos que ha aprendido, convirtiendo el texto en una guia para estructurar el ruido digital.


### fine tuning:


