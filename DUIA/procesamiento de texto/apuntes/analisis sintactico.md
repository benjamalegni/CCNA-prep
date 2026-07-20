## 1. Definición

El **análisis sintáctico** estudia cómo se combinan las palabras para formar unidades mayores y qué relaciones estructurales existen entre ellas. Su objetivo computacional es asignar a una oración una estructura compatible con la gramática del idioma.

La sintaxis describe organización, categorías y dependencias. Está relacionada con el significado, pero no lo determina por completo: una oración puede ser sintácticamente correcta y semánticamente extraña.

El resultado puede expresarse mediante:

- etiquetas gramaticales para cada token;
- fragmentos o *chunks*;
- un árbol de constituyentes;
- un árbol o grafo de dependencias.

## 2. Rol dentro del pipeline

En un pipeline tradicional de procesamiento de lenguaje natural, el análisis suele organizarse así:

1. Segmentación en oraciones.
2. Tokenización y normalización.
3. Análisis morfológico y lematización.
4. Etiquetado de categorías gramaticales (*POS tagging*).
5. *Chunking* o parsing sintáctico completo.
6. Análisis semántico y tareas posteriores.

Las etapas no son completamente independientes. La categoría gramatical ayuda al parser, pero la estructura sintáctica también puede desambiguar una categoría. Los modelos modernos pueden aprender varias etapas de forma conjunta o realizar la tarea directamente sobre los tokens.

La información sintáctica se utiliza en:

- extracción de información y de relaciones;
- reconocimiento de entidades;
- clasificación y resumen;
- traducción automática;
- respuesta a preguntas;
- análisis de sentimiento y negación;
- corrección gramatical.

## 3. Aspectos que considera

El análisis sintáctico puede considerar:

- **orden de palabras**, que ayuda a identificar funciones y alcance;
- **categorías gramaticales**, como sustantivo, verbo o preposición;
- **morfología y concordancia**, por ejemplo género, número, persona y tiempo;
- **palabras funcionales**, como artículos, auxiliares, conjunciones y preposiciones;
- **dependencias entre palabras**, como sujeto, objeto o modificador;
- **agrupación en frases y cláusulas**;
- **puntuación**, que puede marcar límites y coordinación;
- **construcciones propias del idioma**, incluido su grado de libertad en el orden.

Las *stopwords* no deben eliminarse automáticamente antes del análisis sintáctico. Muchas cumplen una función estructural o alteran el significado: “no”, por ejemplo, introduce negación; las preposiciones y los determinantes ayudan a reconocer relaciones y constituyentes.

Conviene distinguir tres niveles:

- **Palabra o token:** unidad observada que recibe análisis morfológico y gramatical.
- **Frase o sintagma:** grupo de palabras que funciona como una unidad, como un sintagma nominal.
- **Cláusula:** estructura que normalmente contiene un predicado y sus argumentos.

## 4. POS tagging

El **Part-of-Speech tagging (POS tagging)** asigna a cada token una categoría gramatical según su forma y su contexto. Una misma palabra puede recibir etiquetas distintas en oraciones diferentes.

### Categorías

Las clases abiertas incorporan palabras nuevas con facilidad:

- sustantivos;
- verbos;
- adjetivos;
- adverbios.

Las clases cerradas tienen un inventario más estable:

- determinantes;
- pronombres;
- preposiciones o adposiciones;
- conjunciones;
- partículas;
- auxiliares.

El conjunto exacto de etiquetas depende del corpus y del idioma. **Universal POS tags** propone un inventario común, mientras que otros esquemas utilizan categorías más detalladas. La etiqueta POS puede complementarse con rasgos morfológicos como género, número, caso, persona, modo o tiempo.

### Métodos

El etiquetado puede realizarse mediante:

- reglas lingüísticas y diccionarios;
- modelos probabilísticos de secuencia, como HMM o CRF;
- redes recurrentes;
- Transformers y otros modelos contextuales.

El modelo debe resolver ambigüedades a partir del contexto y tratar palabras desconocidas. Para estas últimas son útiles la morfología, los n-gramas de caracteres y las representaciones subléxicas.

Ejemplo:

```text
El/DET banco/NOUN cerró/VERB temprano/ADV ./PUNCT
```

## 5. Shallow parsing / chunking

El **shallow parsing** o **chunking** identifica segmentos no recursivos sintácticamente relevantes sin construir un árbol completo. Suele reconocer:

- sintagmas nominales (NP);
- sintagmas verbales (VP);
- sintagmas preposicionales (PP).

Ejemplo:

```text
[NP El banco] [VP cerró] [ADVP muy temprano].
```

Para modelarlo como etiquetado de secuencia se usan esquemas como **IOB/BIO**:

- `B-NP`: comienzo de un sintagma nominal;
- `I-NP`: continuación del sintagma;
- `O`: token fuera de los chunks considerados.

Una variante como BILOU distingue además unidades de un solo token y el último token de cada segmento.

El chunking es menos expresivo que el parsing completo, pero suele ser más rápido y suficiente para extracción de entidades, términos o patrones locales.

## 6. Gramáticas y parsers

Una **gramática** define qué estructuras son válidas mediante símbolos y reglas. Un **parser** es el procedimiento que busca una o más estructuras compatibles con esas reglas para una oración concreta.

### Gramáticas libres de contexto

Una **Context-Free Grammar (CFG)** contiene reglas como:

```text
S  → NP VP
NP → DET NOUN
VP → VERB NP
```

Los símbolos como `S`, `NP` y `VP` son no terminales; las palabras o categorías léxicas son terminales. Las CFG representan estructuras jerárquicas, pero una misma oración puede admitir más de un árbol.

### Gramáticas probabilísticas

Una **Probabilistic Context-Free Grammar (PCFG)** asigna una probabilidad a cada producción. La probabilidad de un árbol permite ordenar análisis alternativos, aunque el supuesto de independencia entre reglas limita el contexto que puede aprovechar.

### Estrategias de parsing

Entre los algoritmos clásicos se encuentran:

- **CKY:** programación dinámica para gramáticas en forma normal de Chomsky;
- **Earley:** admite CFG generales y procesa producciones incompletas mediante estados;
- **chart parsing:** reutiliza resultados parciales para evitar cálculos repetidos.

Los parsers neuronales aprenden puntuaciones para estructuras y pueden usar representaciones contextuales. Según el formalismo, construyen árboles por transiciones o buscan la estructura de mayor puntuación en un conjunto de candidatos.

## 7. Constituency parsing

El **constituency parsing** representa la oración como una jerarquía de constituyentes.

- Los nodos internos son categorías de frases o cláusulas.
- Las hojas son palabras; con frecuencia se incluyen nodos preterminales con las etiquetas POS.
- Los arcos expresan inclusión estructural y normalmente no llevan etiquetas de relación.

Ejemplo simplificado:

```text
             S
          /     \
        NP       VP
      /   \     /  \
    DET  NOUN VERB  ADVP
     El  banco cerró temprano
```

Esta representación hace explícito que “El banco” forma una unidad y que “cerró temprano” forma otra. Resulta útil para estudiar frases anidadas, coordinación y estructura de cláusulas.

La salida depende del esquema de anotación del *treebank*. Dos corpus pueden analizar una misma construcción con etiquetas o niveles de detalle distintos.

## 8. Dependency parsing

El **dependency parsing** representa relaciones binarias entre palabras.

- Cada nodo corresponde normalmente a un token.
- Una palabra actúa como **cabeza** y otra como **dependiente**.
- Cada arco lleva una etiqueta que describe la relación.
- Una raíz artificial o el predicado principal encabeza la estructura.

Para “El banco cerró temprano”, un análisis posible contiene:

```text
root(cerró)
nsubj(cerró, banco)
det(banco, El)
advmod(cerró, temprano)
```

Relaciones frecuentes incluyen sujeto (`nsubj`), objeto (`obj`), determinante (`det`), modificador adjetival (`amod`), modificador adverbial (`advmod`) y negación, según el esquema de anotación.

### Propiedades y métodos

- Un árbol de dependencias asigna una cabeza a cada token excepto la raíz.
- Una estructura **proyectiva** puede dibujarse sobre la oración sin cruces entre arcos; algunos idiomas y construcciones requieren dependencias no proyectivas.
- Los parsers **transition-based** construyen el análisis mediante una secuencia de acciones.
- Los parsers **graph-based** puntúan arcos o subestructuras y buscan el árbol global de mayor puntuación.

**Universal Dependencies (UD)** define pautas comunes para anotar POS, rasgos morfológicos y dependencias en numerosos idiomas. Busca facilitar la comparación entre lenguas, aunque cada *treebank* puede conservar particularidades documentadas.

## 9. Ambigüedad sintáctica

Una oración es sintácticamente ambigua cuando admite más de una estructura válida. Algunos casos habituales son:

- **Adjunción de sintagma preposicional:** “Vi al hombre con el telescopio” puede indicar el instrumento usado para ver o una propiedad del hombre.
- **Coordinación:** no siempre es evidente qué elementos coordina una conjunción.
- **Alcance de modificadores o negación:** un modificador puede asociarse con distintas partes de la oración.
- **Ambigüedad categorial:** una forma puede pertenecer a más de una categoría gramatical.

La gramática puede generar varios análisis. El parser los ordena usando probabilidades, características léxicas, contexto y representaciones aprendidas. Aun así, algunas ambigüedades no pueden resolverse sin información semántica, discursiva o del mundo.

Un sistema puede devolver:

- el análisis de mayor puntuación;
- los `k` mejores análisis;
- una distribución de probabilidades;
- un bosque compacto que representa múltiples árboles.

## 10. Evaluación y herramientas

### Evaluación

Cada nivel requiere métricas adecuadas:

- **POS tagging:** exactitud por token; también F1 por categoría cuando interesan etiquetas poco frecuentes.
- **Chunking:** precisión, recall y F1 sobre segmentos exactos, considerando tipo y límites.
- **Constituency parsing:** precisión, recall y F1 sobre constituyentes, con o sin etiquetas.
- **Dependency parsing:**
  - **UAS (Unlabeled Attachment Score):** proporción de tokens cuya cabeza fue identificada correctamente;
  - **LAS (Labeled Attachment Score):** proporción con cabeza y etiqueta de relación correctas.

La evaluación debe especificar:

- si incluye puntuación;
- cómo trata tokens múltiples o segmentaciones diferentes;
- qué versión y convenciones del corpus utiliza;
- si el conjunto de prueba pertenece al mismo dominio que el entrenamiento.

La división entre entrenamiento, validación y prueba debe evitar filtraciones. Además de las métricas agregadas, conviene analizar errores por longitud, construcción, etiqueta, dominio y tipo de ambigüedad.

### Herramientas

Algunas herramientas utilizadas para análisis sintáctico son:

- **spaCy:** pipeline eficiente con POS tagging, morfología y dependencias;
- **Stanza:** modelos neuronales y pipelines entrenados sobre Universal Dependencies;
- **UDPipe:** tokenización, etiquetado y dependency parsing para múltiples idiomas;
- **Stanford CoreNLP:** conjunto de herramientas para análisis lingüístico, incluida sintaxis;
- **NLTK:** recursos educativos, gramáticas y parsers clásicos;
- **Benepar:** constituency parsing neuronal.

La elección depende del idioma, el formalismo requerido, el dominio, la precisión esperada, la velocidad y la disponibilidad de modelos. Las etiquetas y relaciones deben interpretarse según la documentación del modelo y del corpus con el que fue entrenado.
