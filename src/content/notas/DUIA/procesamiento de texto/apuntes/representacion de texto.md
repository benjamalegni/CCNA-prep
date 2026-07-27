Los algoritmos de aprendizaje automático necesitan convertir el texto en una representación numérica. Según la técnica, una palabra, oración o documento puede representarse como:
- un vector de características;
- una fila de una matriz documento-término;
- un grafo de unidades lingüísticas y sus relaciones;
- un embedding denso aprendido por una red neuronal.

Una representación adecuada intenta conservar la información relevante para la tarea: forma, frecuencia, orden, estructura sintáctica, significado o contexto. No existe una representación óptima para todos los problemas.

## Familias de representación
### Representaciones tradicionales
Se basan principalmente en unidades léxicas y estadísticas de frecuencia.

- Son simples, interpretables y eficientes.
- Cada dimensión suele corresponder a una característica conocida, como una palabra o un n-grama.
- Producen vectores dispersos y de alta dimensionalidad cuando el vocabulario es grande.
- Capturan poco contexto y, en su forma básica, ignoran el orden de las palabras.
- Pueden sufrir la **maldición de la dimensionalidad** (*curse of dimensionality*) y sobreajuste.

### Representaciones distribuidas

Aprenden vectores densos de dimensión fija a partir de los datos.

- Distribuyen la información semántica entre dimensiones que no suelen ser interpretables por separado.
- Acercan en el espacio vectorial las unidades usadas en contextos similares.
- Pueden ser estáticas, con un único vector por palabra, o contextuales, con un vector distinto según la oración.
- Requieren datos de entrenamiento o un modelo preentrenado.

### Representaciones basadas en grafos

Modelan explícitamente relaciones entre palabras, frases, oraciones u otras unidades. Permiten conservar información de coocurrencia, orden, sintaxis o semántica que una bolsa de palabras omite.

## Modelos tradicionales

### One-hot encoding

Cada término del vocabulario corresponde a una dimensión. El vector de una palabra contiene un `1` en su posición y `0` en las demás.

- Es interpretable y no introduce supuestos semánticos.
- Genera vectores muy dispersos.
- Dos palabras diferentes siempre son ortogonales, aunque sus significados sean cercanos.
- No representa de forma directa palabras fuera del vocabulario.

### Bag of Words

**Bag of Words (BoW)** representa un documento mediante la presencia o frecuencia de sus términos.

- Cada característica corresponde a un término del vocabulario.
- Ignora el orden de aparición.
- Pierde gran parte de la estructura sintáctica y del contexto.
- Es una base simple y efectiva para clasificación, recuperación de información y otros problemas con datos moderados.

### Bag of n-grams

Un **n-grama** es una secuencia contigua de `n` tokens. Una palabra aislada es un unigrama o 1-grama; dos palabras contiguas forman un bigrama.

Bag of n-grams extiende BoW al usar esas secuencias como características:

- conserva información de orden local;
- puede capturar expresiones como “no funciona”;
- aumenta rápidamente el número de características al crecer `n`;
- necesita más datos para estimar de forma confiable las frecuencias.

Los n-gramas también pueden construirse sobre caracteres. Esto ayuda a representar información morfológica, errores ortográficos y palabras desconocidas.

## Ponderación de características

La ponderación asigna un valor a cada característica de la representación. La distinción fundamental es:
- **Métodos no supervisados:** calculan los pesos sin utilizar las etiquetas de clase.
- **Métodos supervisados:** utilizan las etiquetas; la relevancia de una característica puede variar entre clases.

### Métodos no supervisados

#### Frecuencia de término

La **term frequency (TF)** mide cuántas veces aparece un término en un documento. Puede utilizarse como conteo absoluto, frecuencia relativa o una transformación sublineal, por ejemplo:

$$
\operatorname{tf}(t,d)=1+\log(f_{t,d})
$$

para $f_{t,d}>0$.

#### Frecuencia de documento e IDF

La **document frequency (DF)** es la cantidad de documentos que contienen un término. Los términos presentes en muchos documentos suelen ser menos discriminativos.

La **inverse document frequency (IDF)** reduce su peso:

$$
\operatorname{idf}(t)=\log\left(\frac{N}{\operatorname{df}(t)}\right)
$$

donde $N$ es el número de documentos. En la práctica suelen emplearse versiones suavizadas para evitar divisiones por cero y otros casos extremos.

#### TF-IDF

Combina la importancia local de un término en un documento con su capacidad de distinguir ese documento dentro de la colección:

$$
\operatorname{tfidf}(t,d)=\operatorname{tf}(t,d)\cdot\operatorname{idf}(t)
$$

Un término obtiene un peso alto si es frecuente en el documento pero aparece en pocos documentos de la colección.

#### Term variance

**Term variance** mide cuánto varía el peso o la frecuencia de un término entre documentos. Una varianza alta indica que el término no se distribuye uniformemente y puede ayudar a diferenciar documentos.

No es el inverso de term frequency: un término puede tener frecuencia media alta y, al mismo tiempo, una distribución con varianza alta o baja.

#### Term strength

**Term strength** estima la importancia de un término a partir de su tendencia a aparecer en documentos relacionados o similares. La relación puede definirse mediante pares de documentos, vecinos o grupos obtenidos por *clustering*. La definición exacta depende del método usado.

### Métodos supervisados

Necesitan documentos etiquetados y estiman cuánto aporta cada término para distinguir las clases. Entre los criterios habituales se encuentran:

- **information gain**: reducción de incertidumbre sobre la clase al conocer la presencia del término;
- **mutual information**: dependencia estadística entre término y clase;
- **chi-square ($\chi^2$)**: diferencia entre las frecuencias observadas y las esperadas bajo independencia;
- **odds ratio**: relación entre las probabilidades de aparición del término en distintas clases;
- **Gini index**: poder discriminativo basado en la distribución del término entre clases.

Estos métodos pueden usarse tanto para ponderar como para seleccionar características. Su estimación puede ser inestable cuando hay pocos ejemplos etiquetados o clases muy desbalanceadas.

## Representaciones basadas en grafos
Un **graph-of-word** representa el texto como una red. Desafía el supuesto de independencia entre tokens al modelar sus relaciones de forma explícita.

### Construcción

Los nodos pueden representar:

- palabras;
- frases;
- oraciones;
- párrafos;
- documentos.

Los arcos pueden representar:

- coocurrencia dentro de una ventana;
- orden de aparición;
- relaciones sintácticas;
- relaciones semánticas, como sinonimia o antonimia;
- enlaces entre oraciones o documentos.

Decisiones de construcción importantes:

- **Dirigido o no dirigido:** un grafo dirigido puede preservar el flujo u orden del texto; uno no dirigido expresa una relación bilateral.
- **Ponderado o no ponderado:** el peso puede indicar frecuencia, distancia, fuerza de asociación u otra medida.
- **Tamaño de ventana:** una ventana mayor conecta cada término con más vecinos y, por lo tanto, genera un grafo más denso. También reduce la localidad de las relaciones y eleva el costo de construcción.

### Medidas y aplicaciones

Las medidas de centralidad permiten estimar la relevancia de un nodo:

- **PageRank:** asigna importancia según la estructura de enlaces y la importancia de los vecinos.
- **Closeness centrality:** usa las longitudes de los caminos más cortos desde un nodo hacia el resto.
- **Betweenness centrality:** mide con qué frecuencia un nodo aparece en caminos mínimos entre otros pares de nodos.
- **Degree centrality:** considera la cantidad, y eventualmente el peso, de sus conexiones.

Estas representaciones se utilizan en extracción de palabras clave, desambiguación, inferencia textual, resumen, extracción de relaciones y análisis de coherencia narrativa.

![[Pasted image 20260704095347.png]]

## Modelos basados en deep learning

Se apoyan en la **hipótesis distribucional**: las palabras usadas en contextos similares tienden a tener significados relacionados. En lugar de definir manualmente cada dimensión, el modelo aprende embeddings a partir de una tarea de entrenamiento.

### Word embeddings estáticos
Asignan un único vector a cada palabra, independientemente del contexto.

#### Word2Vec
Word2Vec aprende representaciones mediante una tarea predictiva autosupervisada. Sus dos arquitecturas principales son:
- **Continuous Bag of Words (CBOW):** predice la palabra objetivo a partir de las palabras de su contexto.
- **Skip-gram:** usa una palabra objetivo para predecir las palabras que aparecen en su contexto. No predice la ubicación de la palabra.

En su forma básica trata cada palabra como una unidad indivisible, ignora su morfología y no puede representar términos fuera del vocabulario.

#### GloVe
**Global Vectors (GloVe)** aprende embeddings a partir de estadísticas globales de coocurrencia. Optimiza los vectores para que sus productos escalares reflejen relaciones derivadas de las frecuencias de coocurrencia.

A diferencia de Word2Vec, que entrena sobre ventanas locales mediante una tarea predictiva, GloVe aprovecha explícitamente una matriz global de coocurrencias.

#### FastText
FastText representa cada palabra mediante n-gramas de caracteres y aprende vectores para esas subunidades.

- Captura información morfológica.
- Puede construir vectores para muchas palabras no vistas combinando sus n-gramas.
- Resulta útil en idiomas con morfología rica.

FastText no está entrenado con Wikipedia por definición. Existen modelos preentrenados sobre Wikipedia y otros corpus, pero el algoritmo puede entrenarse con cualquier colección adecuada.

### Embeddings contextuales

Generan una representación distinta de una palabra según la oración en la que aparece. Esto permite diferenciar, por ejemplo, los sentidos de una palabra polisémica.

#### ELMo
ELMo obtiene embeddings contextuales mediante modelos de lenguaje bidireccionales basados en LSTM. Combina representaciones internas de distintas capas para capturar información sintáctica y semántica.

Los Transformers posteriores reemplazaron la recurrencia por atención y permiten procesar relaciones de largo alcance con mayor paralelismo.

### Embeddings de oraciones y documentos

#### Doc2Vec
Extiende ideas de Word2Vec al aprender un vector asociado a cada documento.

- **PV-DM (Distributed Memory):** usa el vector del documento junto con palabras de contexto para predecir una palabra.
- **PV-DBOW (Distributed Bag of Words):** usa el vector del documento para predecir palabras del documento.

#### Sent2Vec
Aprende embeddings de palabras y n-gramas no supervisadamente y representa una oración combinándolos, normalmente mediante un promedio. A diferencia de un promedio de embeddings preentrenados, los componentes se entrenan específicamente para producir buenas representaciones oracionales.

#### Smooth Inverse Frequency
**Smooth Inverse Frequency (SIF)** construye un embedding de oración en dos pasos:

1. Calcula el promedio ponderado de los embeddings de palabras, reduciendo el peso de las palabras muy frecuentes.
2. Resta la proyección sobre el primer componente principal calculado para el conjunto de oraciones.

El segundo paso intenta remover información común, frecuentemente asociada con estructura y frecuencia, que aporta poco a la distinción semántica.

#### InferSent
InferSent es un encoder de oraciones entrenado de forma supervisada sobre tareas de inferencia en lenguaje natural. Busca producir vectores transferibles a otras tareas.

## Transformers

El Transformer procesa secuencias principalmente mediante mecanismos de atención, sin recurrencia. Sus bloques combinan:

- **self-attention multi-cabeza**, que permite relacionar cada token con otros tokens de la secuencia;
- **redes feed-forward**, aplicadas a cada posición;
- **conexiones residuales**;
- **normalización**;
- **información posicional**, necesaria porque la atención por sí sola no codifica el orden.

La atención asigna pesos distintos a los tokens según su relevancia para construir la representación de cada posición. Las múltiples cabezas permiten aprender diferentes tipos de relaciones en paralelo.

### Tipos de arquitectura

#### Encoder

Recibe la secuencia completa y produce representaciones contextualizadas. Normalmente permite atención bidireccional, por lo que cada token puede considerar tanto el contexto izquierdo como el derecho.

Es apropiado para comprensión, clasificación, extracción de entidades y obtención de embeddings. BERT pertenece a esta familia.

#### Decoder

Genera una secuencia token por token. Utiliza atención causal o enmascarada: cada posición solo puede atender a posiciones anteriores durante la generación.

Es apropiado para generación y continuación de texto.

#### Encoder-decoder

El encoder representa la entrada y el decoder genera una salida condicionada por ella. El decoder combina:

- self-attention causal sobre los tokens ya generados;
- cross-attention sobre la salida del encoder.

Esta arquitectura es habitual en traducción, resumen y otras transformaciones de secuencia a secuencia. T5 es un ejemplo.

### BERT

**Bidirectional Encoder Representations from Transformers (BERT)** es un Transformer basado en encoders. Durante el preentrenamiento original utiliza:

- **Masked Language Modeling (MLM):** reconstrucción de tokens ocultos usando contexto de ambos lados;
- **Next Sentence Prediction (NSP):** predicción de la relación entre pares de segmentos en el modelo original.

BERT produce embeddings contextuales. Su uso suele dividirse en:

1. **Preentrenamiento:** aprendizaje autosupervisado sobre grandes corpus no etiquetados.
2. **Fine-tuning:** ajuste de los parámetros con datos etiquetados de una tarea concreta.

También puede utilizarse como extractor de características, aunque la estrategia de *pooling* elegida afecta la calidad de los embeddings de oraciones.

### T5

**Text-to-Text Transfer Transformer (T5)** formula todas las tareas como transformación de texto de entrada en texto de salida. Es un modelo encoder-decoder:

- el encoder usa atención bidireccional sobre la entrada;
- el decoder usa self-attention causal;
- el decoder incorpora cross-attention a las representaciones del encoder;
- su preentrenamiento original usa *span corruption*: reemplaza fragmentos de texto por tokens centinela y aprende a reconstruirlos.

La formulación texto-a-texto permite tratar con la misma interfaz tareas como traducción, resumen, clasificación y respuesta a preguntas. El costo computacional depende del tamaño de la variante y de las longitudes de entrada y salida; no es una propiedad exclusiva de T5.

### Obtención de una representación del texto

Los Transformers producen un vector por token. Para obtener un único vector de oración o documento pueden usarse:

- el vector de un token especial;
- promedio o máximo sobre los tokens;
- una capa aprendida de *pooling*;
- un modelo entrenado específicamente para semejanza, como un bi-encoder de oraciones.

## Semejanza de texto

La semejanza cuantifica cuán relacionados son dos textos. Se utiliza en recuperación de información, ranking, clasificación, *clustering*, detección de duplicados, desambiguación y búsqueda semántica.

La noción relevante depende del problema:

- semejanza ortográfica o morfológica;
- coincidencia léxica;
- semejanza sintáctica;
- semejanza semántica;
- equivalencia pragmática o específica del dominio.

### Semejanza y distancia

No son siempre “inversamente proporcionales” por definición. Una distancia satisface propiedades matemáticas específicas; una función de semejanza no necesariamente lo hace. En algunos casos se transforma una en otra, por ejemplo $s=1/(1+d)$, pero la transformación debe declararse.

### Medidas basadas en edición

Comparan cadenas contando operaciones necesarias para transformar una en otra.

- **Hamming:** cantidad de posiciones diferentes; requiere cadenas de igual longitud.
- **Levenshtein:** mínimo número de inserciones, eliminaciones y sustituciones de un carácter.
- **Jaro-Winkler:** favorece coincidencias y prefijos comunes; se usa con frecuencia para nombres y registros cortos.

Son útiles para errores tipográficos y cadenas cortas, pero comparan la forma y no la semántica. Su costo crece con la longitud de las cadenas.

### Medidas basadas en secuencias

Analizan subsecuencias compartidas y conservan información parcial de orden. Un ejemplo es la **longest common subsequence (LCS)**. Son útiles para comparar versiones o secuencias similares, aunque tampoco capturan por sí solas equivalencia semántica.

### Medidas basadas en conocimiento

Usan una taxonomía, ontología o red semántica. Algunas medidas para jerarquías léxicas son:

- **path similarity**, basada en la longitud del camino entre conceptos;
- **Wu-Palmer**, basada en la profundidad del ancestro común más específico;
- **Resnik**, basada en el contenido de información del ancestro común.

Su cobertura y calidad dependen del recurso lingüístico y del dominio.

### Medidas basadas en tokens o vectores

#### Jaccard

Para dos conjuntos de tokens $A$ y $B$:

$$
J(A,B)=\frac{|A\cap B|}{|A\cup B|}
$$

No considera frecuencia salvo que se utilice una variante para multiconjuntos o vectores ponderados.

#### Similitud coseno

Para vectores no nulos $x$ e $y$:

$$
\cos(x,y)=\frac{x\cdot y}{\lVert x\rVert_2\lVert y\rVert_2}
$$

La similitud coseno existe sin normalizar previamente los vectores. Si ambos se normalizan a norma 2 unitaria, su producto punto equivale al coseno. La normalización no impide valores negativos: estos dependen de las componentes y del ángulo entre los vectores. Con representaciones no negativas, como TF-IDF, el coseno queda habitualmente entre 0 y 1.

#### Distancias Manhattan y euclidiana
- **Manhattan (norma 1):** suma las diferencias absolutas por dimensión.
- **Euclidiana (norma 2):** mide la longitud de la línea recta entre dos puntos.

Son sensibles a la escala de las características. En espacios de alta dimensión, conviene analizar si la distancia elegida sigue siendo discriminativa.

### Semejanza semántica con embeddings

Los embeddings permiten comparar significados aunque no haya coincidencia exacta de palabras.

- **Promedio de word embeddings:** simple, pero pierde orden y puede diluir palabras informativas.
- **Word Mover's Distance:** calcula el costo mínimo de trasladar la masa de palabras de un texto hacia las palabras del otro en el espacio de embeddings.
- **Bi-encoder:** codifica cada texto por separado; permite indexar vectores y recuperar candidatos eficientemente.
- **Cross-encoder:** procesa ambos textos juntos y predice su relación; suele ser más preciso, pero es más costoso porque cada par debe evaluarse por separado.

La elección de la medida y del modelo debe validarse sobre ejemplos representativos de la tarea: cercanía geométrica y semejanza útil para una aplicación no son necesariamente lo mismo.
