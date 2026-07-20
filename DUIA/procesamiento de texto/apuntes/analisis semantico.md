## Definición y contexto

El **análisis semántico** describe el proceso de comprender el lenguaje natural. La semántica se ocupa de la determinación de lo que realmente significa una oración al relacionar características sintácticas y desambiguar palabras con múltiples definiciones para el contexto dado.

es la abstraccion mayor de analisis sintactico

En el pipeline de NLP, el análisis semántico se sitúa después del análisis sintáctico y antes del análisis del discurso:
1. Pre-procesamiento léxico
2. Análisis morfológico
3. Análisis sintáctico
4. **Análisis semántico** ←
5. Integración del discurso
6. Análisis pragmático

Este nivel implica la interpretación apropiada del significado de las oraciones, en lugar del análisis a nivel de palabras o frases individuales. La estructura y el contexto ayudan en la comprensión.

## Componentes del análisis semántico
El análisis semántico trabaja con cuatro componentes fundamentales:
- **Entidades:** instancias particulares (Tandil, Juan, Pedro, María).
- **Conceptos:** categorías de las entidades (personas, ciudades).
- **Relaciones:** conexión entre entidades y conceptos (Tandil es una ciudad).
- **Predicados:** estructuras verbales, por ejemplo roles semánticos.

Las tareas principales del análisis semántico son:
- **Word Sense Disambiguation (WSD)**
- **Semantic Role Labeling (SRL)**
- **Named Entity Recognition (NER)**

## Semántica léxica
La **semántica léxica** se refiere al análisis del significado de cada uno de los ítems léxicos: palabras, sub-palabras, afijos, palabras compuestas y frases.

Se trata de la relación entre los ítems léxicos, el significado de las oraciones y su sintaxis. Cada ítem léxico tiene su propia sintaxis, forma y significado, pero también obtiene significado a partir de los ítems léxicos que lo rodean (contexto y posición).

### Relaciones léxicas
todo esto va a estar mapeado en wordnet
#### Homonyms
Palabras que se pronuncian igual, se escriben igual o ambas, pero tienen distinto significado. Es un super-grupo de homographs y homophones.
- **Homographs:** palabras que se escriben igual, pueden o no pronunciarse igual.
  - *Ellen has a strong **interest** in computational linguistics.*
  - *Ellen pays a large amount of **interest** on her credit card.*
- **Homophones:** palabras que tienen la misma pronunciación, pero se escriben diferente.
  - *The **pair** worked hard in the **pear** plantation.*
- **Heterographs:** homophones pero no homographs. La acepción correcta depende de la escritura.
- **Heteronyms:** homographs pero no homophones. La acepción correcta depende de la pronunciación.
  - *I am using a **lead** pencil.* / *Please **lead** the soldiers to the camp.*

#### Polysemes
Similar a homonyms pero los significados están relacionados. Ejemplo con *bank*:
1. Institución financiera.
2. El edificio de la institución financiera.
3. Tener una cuenta bancaria.
4. Ganar una suma de dinero.
5. Depositar dinero en una cuenta.
6. Un amontonamiento de tierra, arena o nieve.
7. Acumulación de nubes o niebla.
8. Una hilera de cosas.
9. La vera del río.
No todas las acepciones de *bank* están relacionadas, por lo que también es un caso de homonyms.
#### Capitonyms
Palabras que tienen la misma escritura pero el significado cambia según si están capitalizadas:
- **March** (mes) / **march** (marcha)
- **May** (mes) / **may** (puede)

#### Synonyms y Antonyms
- **Sinónimos:** palabras diferentes con el mismo significado en algún contexto. Diferente en escritura y pronunciación, intercambiables dependiendo del contexto. Es una relación entre acepciones, no sobre la palabra en sí.
  - *big*, *huge*, *large*: *The house is big/huge/large* (sinónimos).
  - Pero *He is my **big** brother* ≠ *He is my **huge** brother* (no siempre son intercambiables).

- **Antónimos:** relación binaria de oposición. Tres tipos:
  - **Graduación:** antónimos en una escala o medida.
  - **Complementarios:** no pueden medirse en ninguna escala (dividir/unir).
  - **Relacionales:** las palabras tienen alguna relación entre ellas (doctor/paciente).

#### Hyponyms y Hypernyms
- **Hyponyms:** palabras que son sub-clase de otras palabras. Tienen una acepción y contexto determinados.
- **Hypernyms:** palabras que actúan como super-clases. Tienen una acepción más amplia.

Ejemplo con jerarquía:

| Hyponyms (mismo nivel) | Estructura |
|---|---|
| Chalet es un tipo de **casa** | Chalet → Casa (hiperonimia) |
| Una estructura puede ser una **casa** | Casa → Construcción (hiperonimia) |
| Chalet es un tipo de **construcción** | Chalet → Construcción (hiperonimia transitiva) |

### Relaciones en WordNet

| Relación                 | Categoría                             | Ejemplo                                                        |
| ------------------------ | ------------------------------------- | -------------------------------------------------------------- |
| Synonymy                 | Sustantivo, Verbo, Adjetivo, Adverbio | Pipe/tube, Rise/ascend, Sad/unhappy, Rapidly/speedily          |
| Antonymy                 | Sustantivo, Verbo, Adjetivo, Adverbio | Top/bottom, Rise/fall, Wet/dry, Rapidly/slowly                 |
| Hyponymy                 | Sustantivo                            | Tree/plant                                                     |
| Meronymy                 | Sustantivo                            | Ship/fleet (relación de todo y partes)                         |
| Troponymy                | Verbo                                 | March/walk (jerarquía de maneras de realizar algo)             |
| Entailment               | Verbo                                 | Buy/pay (describen eventos que se suceden unidireccionalmente) |
| Derivation (pertainnyms) | Adjetivo                              | Magnetic/magnetism                                             |

# Word Sense Disambiguation (WSD)
Las palabras suelen tener más de un significado posible (polisemia o heteronimia). Dada una palabra en un contexto y un inventario fijo de potenciales acepciones, WSD decide cuál es la adecuada.

Es relevante para: Machine Translation, Information Retrieval, Text Mining e Information Extraction.

### Tipos de ambigüedad
- **Ambigüedad léxica:** a nivel palabra. Una misma palabra puede tener un significado ambiguo según su contexto.
- **Ambigüedad sintáctica:** diferentes formas de interpretar una secuencia de palabras (estructural, frases preposicionales, coordinación).
- **Ambigüedad semántica:** la estructura sintáctica no es ambigua, pero el significado de las palabras puede ser mal interpretado por contexto. En contextos multi-lengua se asocia a "falsos transparentes".
  - *X e Y están casados.* ¿Juntos? ¿O con otras personas?
### Método de Lesk (1986)
Método basado en diccionarios que no requiere corpus de entrenamiento. Dada una palabra W en un contexto C:
1. Obtener todas las acepciones S de W del diccionario.
2. Comparar las palabras en cada S con las palabras en cada una de las definiciones de las palabras en C.
3. Seleccionar el S con mayor *overlapping* con las definiciones.

Ejemplo con *bank* en contexto *river bank*:
1. S: *sloping land (especially the slope beside a body of water)* → overlap con "river" → **seleccionada**
2. S: *a financial institution that accepts deposits...* → sin overlap con "river"
3. S: *a long ridge or pile* → sin overlap
4. S: *an arrangement of similar objects in a row* → sin overlap

Se pueden agregar ejemplos de uso. En una versión simplificada solo se consideran las palabras (no las definiciones del contexto) y se les puede asignar peso (IDF).

| Pros                          | Contras                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| Simple                        | Muy sensible a los términos en las definiciones                          |
| No requiere datos etiquetados | Las palabras de las definiciones pueden no tener overlap con el contexto |

### Métodos supervisados
Requieren corpus con etiquetas de acepciones. El corpus más grande es **SemCor** (derivado de WordNet, ~352 textos, sub-conjunto de Brown Corpus).

La idea es tener: la palabra a desambiguar, las acepciones correctas (target) y el contexto.

Posibles características para el clasificador:

- Lista de palabras más frecuentes que aparecen junto con la palabra para cada acepción.
- Vector de co-ocurrencias (las palabras representadas por su lemma).
- Información de etiquetas POS y parsing sobre las palabras alrededor.

### WSD con embeddings

#### sense2vec
Basado en word2vec. En lugar de predecir un token dado el contexto, predice el uso correcto dado el contexto.

1. Requiere corpus etiquetados.
2. Cuenta la cantidad de usos de una palabra, donde cada uso es presentado por una etiqueta.
3. Genera un embedding random para cada uno de los usos.
4. Entrena el modelo usando la arquitectura de word2vec.

#### GlossBERT
Adaptación de BERT para la desambiguación basada en las representaciones contextualizadas que genera. Formula un problema de clasificación de oraciones.

1. Para cada oración, construir pares de contexto-gloss (extraídos de WordNet).
2. Considerar todos los *gloss* correspondientes a cada acepción a desambiguar.
3. Se asigna clase "True" a la acepción correcta.
4. También utiliza SemCor.
5. Diversas opciones de combinación de capas: por token (se promedian si hay más de uno) o por oración completa.

## Named Entity Recognition (NER) - reconocimiento de entidades
El **reconocimiento de entidades nombradas** es el primer paso para la extracción de información. Busca identificar y clasificar elementos en el texto en categorías predefinidas:

- Personas
- Organizaciones
- Lugares
- Expresiones temporales
- Cantidades
- Valores monetarios, porcentajes

Ejemplo: *Michael Dell es el CEO de Dell Computer Corporation y vive en Austin Texas.*
→ persona: Michael Dell | organización: Dell Computer Corporation | lugar: Austin Texas

Puede sufrir de **ambigüedad de tipo**: sabemos que es una entidad, pero no de qué tipo.

- *Washington*: nombre de persona, organización, entidad política, ciudad
- *IRA*: persona, organización, entidad política
- *Louis Vuitton*: persona, organización, producto

### Usos de NER
- Categorizar tickets de Customer Support (mejorar tiempos de respuesta).
- Extraer datos de reviews (Customer Feedback, detectar problemas recurrentes).
- Procesos de selección de personal (extraer info de CVs).
- Salud (extraer información de resultados de análisis y reports).
- Búsquedas (mejorar velocidad y relevancia).

### Métodos
- **Basados en léxicos:** utilizan ontologías con palabras o términos relacionados a un tópico particular. Desventaja: requiere actualización constante.
	- funciona mas o menos
	- para cosas que sabemos que no van a cambiar, por ejemplo con personas quizas no me sirva
- **Basados en reglas:** utilizan reglas gramaticales. Sirven para patrones específicos (nombres de calles, números de teléfono). Alta precisión, pero bajo recall.
- **Basados en aprendizaje:** requieren corpus de entrenamiento con ejemplos positivos y negativos. Hay corpus disponibles para medicina, películas, mails, "entidades emergentes".

Los métodos se pueden combinar.
### Caso Booking.ai
Booking utiliza NER para extraer de reviews no estructuradas detalles como lugares, tipo de propiedad y comodidades. Utilizaron datos sintéticos creados a partir de combinaciones y permutaciones de su léxico. En modelos de clasificación tradicional agregaron características como:
- ¿Tiene números?
- ¿Tiene letras?
- ¿Tiene números y letras?
- ¿Contiene hyphens?
- ¿Alterna con mayúsculas en medio del texto?

### Herramientas
spaCy con modelos entrenados con OntoNotes 5 reconocen entidades como PERSON, ORG, GPE, DATE, MONEY, entre otros. Los modelos entrenados con Wikipedia tienen un esquema más general.

## Semantic Role Labeling (SRL)
Un análisis semántico superficial para representar eventos y sus participantes. Para cada cláusula, determina el rol semántico por cada frase nominal que hace de argumento del verbo.

Ejemplo: *El policía detuvo al sospechoso en la escena del crimen*

| Agente     | Predicado  | Objeto        | Ubicación               |
| ---------- | ---------- | ------------- | ----------------------- |
| El policía | detuvo     | al sospechoso | en la escena del crimen |
| ¿Quién?    | ¿Hizo qué? | ¿A quién?     | ¿Dónde?                 |


Es un intermedio entre el parsing y el análisis semántico completo.

### FrameNet - SRL
Centrado en una noción abstracta que generaliza las descripciones de verbos similares y sustantivos. Define tres elementos:

- **Frame:** representaciones esquemáticas de situaciones con distintos participantes, propiedades y roles conceptuales. Por ejemplo, una situación de compraventa. Los frames se encuentran conectados entre sí.
- **Frame Elements:** participantes, propiedades y roles en un frame. Puede incluir agentes u objetos inanimados.
- **Lexical Units:** pairing de un lemma con un significado. Puede incluir formas declinadas (see/saw/seen), expresiones de varias palabras (pick up/New York), y cualquier POS tag.

Los argumentos sintácticos de un verbo se corresponden con los Frame Elements correspondientes al frame asociado.

### PropBank - SRL
Orientado a los verbos. Agrega una capa semántica al Penn Treebank. Intenta capturar la estructura predicado-argumento. Diferencias con FrameNet:
- Cada verbo tiene su propio predicado.
- **Más cercano al parsing sintáctico.**
- Anotaciones más simples.

**Argumentos standarizados:**

| Argumento | Rol |
|---|---|
| Arg0 | agent (giver) |
| Arg1 | patient (thing given) |
| Arg2 | instrument/attribute (entity given to) |
| Arg3 | starting point/attribute |
| Arg4 | ending point |
| ArgM | modifier |

Ejemplo: *John broke the window* → arg0: John, arg1: the window

Ejemplo complejo: *Obama met him privately in the White House, on Thursday*
→ arg0: Obama | arg1: him | argM-MNR: privately | argM-LOC: in the White House | argM-TMP: on Thursday

**Pasos del SRL:**
1. Parsear la oración.
2. Encontrar los predicados en la oración.
3. Aplicar word sense disambiguation sobre el predicado para determinar el sujeto.
4. Identificar los argumentos semánticos.

### SRL con BERT
Modifican la entrada a BERT: originalmente era [CLS] oración [SEP] oración [SEP], ahora proponen:
```
[CLS] sentence [SEP] subject [SEP] object [SEP]
```

En la oración, las entidades son enmascaradas. También modifican la entrada para la predicción de predicados.

## Discurso
El discurso trata del análisis de la estructura y el significado del texto **más allá de una sola oración**, haciendo conexiones entre palabras y oraciones.

Involucra la resolución de referencias a elementos anteriores o posteriores en el discurso (por ejemplo, resolución de pronombres). Es uno de los problemas más difíciles; los enfoques recientes se basan en deep learning.

La coreferencia conecta la información del parse tree, named entity recognition e information extraction. Ejemplo:

> *London is the capital and largest city of England and of the United Kingdom. Standing on the River Thames in the southeast of England, London has been a major settlement for two millennia. **It** was founded by the Romans, who named **it** Londinium.*

*It* se refiere a *London*.

## Pragmática
El nivel pragmático se ocupa del uso del conocimiento del mundo real y de comprender cómo eso impacta en el significado. Cómo se usa el lenguaje para lograr los objetivos.

esta en un nivel mayor al del discurso

La influencia del contexto en el significado:
- Al analizar la dimensión contextual de los textos y consultas se obtiene una representación más detallada.
- Involucra el procesamiento de las consultas de los usuarios integrando el historial, objetivos y contexto (hora, lugar).
- Facilita la conversación entre el sistema IR y los usuarios.
- Permite obtener el propósito sobre el cual se planea utilizar la información.

## Aplicaciones de Discurso y Pragmática
### Text Summarization
Resumen automático de textos largos. ¿Por qué?
- Reduce el tiempo de lectura.
- Facilita el proceso de selección de textos.
- Mejora la efectividad de la indexación.
- Los algoritmos son menos parciales que los humanos.
- Los resúmenes personalizados son útiles en sistemas de preguntas y respuestas.

**Tipos:**
- **Extractive Summary:** identifica oraciones importantes del texto y las reproduce textualmente. Solo usa texto existente.
- **Abstractive Summary:** emplea técnicas de NLP más potentes para interpretar texto y generar el resumen. Implica parafrasear, acortar, crear nuevas frases y oraciones. Se desempeña mejor pero es más complicado.
### Information/Fact Extraction
Tarea de extraer automáticamente información estructurada de documentos no estructurados o semiestructurados. Utilizado en: Question Answering, Machine Translation, Entity Extraction, Event Extraction, verificación de información.

### Sentiment Analysis
Las palabras tienen asociadas connotaciones o significados afectivos. Tres dimensiones:
- **Valencia:** cuán placentero es un estímulo (+: happy, pleased, satisfied; -: unhappy, annoyed, despaired).
- **Arousal:** la intensidad de la emoción (+: stimulated, excited, frenzied; -: relaxed, calm, sleepy).
- **Dominance:** el grado de control ejercido (+: in control, influential, dominant; -: controlled, influenced, submissive).

El análisis de sentimientos detecta la polaridad dentro de un texto (positivo o negativo).

**Léxicos:**
- **VADER:** incluye emojis, creado especialmente para social media.
- **SentiWordNet:** basado en WordNet, asigna valor de polaridad negativa y positiva a cada synset.
- **TextBlob:** asociado a WordNet.
- **AFFIN:** incluye emoticons.

Desventaja de los léxicos: algunas palabras como "bad" o "kill" pueden expresar enojo o felicidad según el contexto.

### Emotion Analysis
Detecta emociones (felicidad, frustración, ira, tristeza). Se suele decir que es la causa de los sentimientos.

**Léxicos:**
- **EmoLex:** léxicos creados manual y automáticamente (hashtags). Para cada término asigna un sentimiento y el nivel de la emoción.
- **SentiSense:** asocia sentimiento y emoción a synsets de WordNet. Disponible en español.

Se puede extender a otros estados afectivos:
- **Humor:** cheerful, gloomy, irritable, listless, depressed.
- **Actitud:** distant, cold, warm, supportive, contemptuous, friendly, liking, loving, hating, valuing, desiring.
- **Personalidad:** nervous, anxious, reckless, morose, hostile, jealous.

### Personality Analysis
Uno de los más estudiados. **Big 5 Personality traits:**

| Rasgo | Polo + | Polo - |
|---|---|---|
| Extraversion vs Introversion | Sociable, asertivo | Distante, reservado, tímido |
| Emotional stability vs Neuroticism | Calmo, sin emociones | Inseguro, ansioso |
| Agreeableness vs Disagreeable | Amistoso, cooperativo | Antagonista, "busca pelea" |
| Conscientiousness vs Unconscientious | Auto-disciplinado, organizado | Ineficiente, descuidado |
| Openness to experience | Intelectual, perspicaz | Superficial, sin imaginación |

### Machine Translation
Convertir automáticamente de un idioma natural a otro, preservando el significado. ¿Por qué es difícil?
- Orden de las palabras.
- Acepciones de las palabras.
- Pronombres.
- Tiempos verbales.
- Idioms.

**Enfoques:**
- Traducción palabra por palabra.
- Transferencia sintáctica.
- Enfoques interlinguales.
- Traducción basada en ejemplos.
- Traducción basada en estadística.
- Redes neuronales.

Sistemas actuales: Google Translate (desde 2016), Microsoft Translate, Facebook Translation, OpenNMT.

### Detección de Tópicos
Métodos para encontrar grupos de palabras (tópicos) dentro de una colección de textos que mejor los representan. Cada texto se describe mediante una distribución de tópicos, y cada tópico por una distribución de palabras.

Métodos: LSA, **LDA**, BERTopic.
*no hay una mejor opcion, hay que probar y elegir la que mejor resultado de*

#### LDA (Latent Dirichlet Allocation)
Método basado en distribución de probabilidades. Asume que los documentos se crean así:
1. Se decide la cantidad de palabras (distribución Poisson).
2. Se elige una mezcla de tópicos (distribución de Dirichlet sobre K tópicos fijos).
3. Para cada palabra: se elige un tópico y se genera la palabra según la distribución del tópico.

**Características:**
- No es relevante el orden de las palabras ni su rol gramatical.
- Se pueden eliminar palabras que aparecen en la mayoría de los documentos (~80-90%).
- El número de tópicos K debe conocerse previamente.
- Una misma palabra puede aparecer en varios tópicos.
- Representa los textos como una mezcla de tópicos.

**Algoritmo:**
1. Crear una representación inicial de los K tópicos asignando palabras de forma random (por ejemplo, uniforme).
2. Para cada palabra w calcular:
   - **P(tópico t | texto d):** proporción de palabras en el documento d asignadas a t. A mayor cantidad de palabras de d en t, mayor probabilidad de que w pertenezca a t.
   - **P(palabra w | tópico t):** proporción de palabras asignadas al tópico t sobre el total. Si w tiene alta probabilidad en t, los textos con w se relacionarán con t.
3. Actualizar: **P(w | t, d) = P(t | d) × P(w | t)**
4. Repetir iterativamente hasta convergencia.
5. Elegir las N palabras con mayor probabilidad de pertenecer a cada tópico.

Se puede hacer selección de palabras y aplicar pre-procesamiento (eliminar stopwords). No existe el K mágico.

#### LSA (Latent Semantic Analysis)

También llamado **LSI (Latent Semantic Indexing)**. Se basa en la idea de que palabras con significados similares tienden a aparecer en los mismos contextos. Utiliza álgebra lineal para descubrir patrones ocultos en la relación documentos-palabras.

**Funcionamiento:**
1. Construir una **matriz término-documento** donde cada fila es un término y cada columna es un documento. El valor puede ser frecuencia, TF-IDF o similar.
2. Aplicar **SVD (Singular Value Decomposition)** a la matriz:
   - `A = U × Σ × Vᵀ`
   - **U:** matriz término-tópico (relación entre términos y conceptos latentes).
   - **Σ:** matriz diagonal con los valores singulares ordenados de mayor a menor (representan la importancia de cada dimensión latente).
   - **Vᵀ:** matriz tópico-documento (relación entre conceptos latentes y documentos).
3. Reducir la dimensionalidad manteniendo solo los `k` valores singulares más grandes. Esto genera una representación comprimida de los conceptos latentes.
4. Los tópicos se interpretan observando los términos con mayor peso en cada dimensión latente de U.

**Propiedades:**
- Los documentos y palabras se representan en un espacio de menor dimensión.
- Permite encontrar sinónimos y conceptos relacionados: palabras con vectores cercanos en el espacio reducido comparten significado.
- Las palabras polisémicas pueden ser desambiguadas porque se proyectan en distintas dimensiones según el contexto del documento.
- Es un método **no supervisado** y determinista (misma entrada → mismo resultado).
- La interpretación de los tópicos puede ser subjetiva.

**Limitaciones:**
- puede no ser facil elegir k
- No captura relaciones no lineales.
- Los resultados pueden ser difíciles de interpretar cuando el número de dimensiones es alto.
- La representación es estática: no distingue sentidos de una palabra en distintos documentos.

#### BERTopic
Modelo de detección de tópicos moderno que combina Transformers (BERT), técnicas de reducción de dimensionalidad y algoritmos de clustering. Permite descubrir tópicos con representaciones semánticas ricas.
es una de las tecnicas mas nuevas

**Arquitectura en tres pasos:**

1. **Extracción de embeddings:** se usa un modelo Transformer (por ejemplo, sentence-transformers) para generar embeddings contextuales de cada documento. A diferencia de LDA y LSA, captura el significado semántico profundo del texto.
2. **Reducción de dimensionalidad:** se aplica **UMAP (Uniform Manifold Approximation and Projection)** para reducir los embeddings de alta dimensionalidad a un espacio más bajo. UMAP preserva tanto la estructura local como global de los datos.
3. **Clustering:** se aplica **HDBSCAN** (clustering jerárquico basado en densidad) para agrupar documentos similares. HDBSCAN es robusto al ruido, no requiere especificar el número de clusters de antemano y puede identificar documentos que no pertenecen a ningún tópico.

**Representación de tópicos:**

Después del clustering, BERTopic construye representaciones interpretables de cada tópico usando **c-TF-IDF (class-based TF-IDF)**:

1. Se tratan todos los documentos de un mismo cluster como un solo documento.
2. Se calcula TF-IDF sobre estos "documentos-clase".
3. Las palabras con mayor puntaje c-TF-IDF representan el tópico.

Además, BERTopic permite **diversificar** las palabras representativas del tópico eliminando palabras demasiado similares entre sí.

**Ventajas sobre LDA:**
- No requiere especificar K (el número de tópicos se descubre automáticamente con HDBSCAN).
- Captura significado semántico profundo, no solo co-ocurrencia.
- Puede manejar documentos cortos y largos.
- Identifica documentos ruidosos como "sin tópico".
- Los tópicos suelen ser más interpretables.

**Variantes y extensiones:**
- **c-TF-IDF:** representación base de tópicos.
	este representa temas (clusters) en lugar de documentos individuales
	
- **KeyBERTInspired:** selecciona palabras representativas usando similitud coseno con el embedding del tópico.
- **MaximalMarginalRelevance:** diversifica las palabras para evitar redundancia.
- **LabelTopic:** genera automáticamente un nombre para cada tópico.
- hierarchical: 
	- agrupa temas similares y permite crear subtemas jererquicos
	- ayuda a entender que temas deberian fusionarse y su relacion
- dynamic
- online

**Parámetros importantes:**
- **n_neighbors** en UMAP: controla la estructura local vs global.
- **min_cluster_size** en HDBSCAN: tamaño mínimo de un cluster para ser considerado tópico.
- **min_topic_size:** número mínimo de documentos para formar un tópico.