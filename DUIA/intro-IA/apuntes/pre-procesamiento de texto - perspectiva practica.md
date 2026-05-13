- Eliminación de ruido (ej. en documentos HTML) y reducción a un formato ASCII 
- Conversión a minúsculas 
- Tokenización: divide el texto en entidades significativas (palabras, oraciones, etc.) dados los espacios en blanco presentes y las puntuaciones. 
- Eliminación de stop-words 
- Stemming 
- Identificación de entidades 
- Asignación de pesos a términos

se habla de "corpus" en vez de datasets cuando se refiere a documentos de texto

## CountVectorizer
es un transformer que convierte el texto en una matriz de recuento de tokens
por ejemplo
d_n son los documentos de texto
t_n son un token individual

|     | t_0 | t_1 |
| --- | --- | --- |
| d_0 | 0   | 1   |
| d_1 | 2   | 0   |

### CountVectorizer con remocion de stopwords 
nos permite usar
```python
	vectorizer = CountVectorizer(stop_words="english")
```
### CountVectorizer con ngramas
se le puede agregar el parametro ngram_range (por defecto tendra ngram_range=(1,1))
```python
	vectorizer = CountVectorizer (stop_words='english', analyzer='word', ngram_range(1,2));
```
entonces son las combinaciones de 1 o 2 tokens


### CountVectorizer con stopwords y stemming
stemming reduce palabras parecidas a una misma raiz. ej: running, runs, runner
```python
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import PorterStemmer

stemmer = PorterStemmer()

def stem_tokenizer(text):
    tokens = text.lower().split()
    stems = [stemmer.stem(token) for token in tokens]
    return stems

texts = [
    "I am running",
    "He runs every day",
    "They like running"
]

vectorizer = CountVectorizer(
    stop_words="english",
    tokenizer=stem_tokenizer
)

X = vectorizer.fit_transform(texts)

print(vectorizer.get_feature_names_out())
print(X.toarray())
```
otra opcion:
```python
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem import PorterStemmer
# Creamos el conjunto de documentos que queremos analizar

corpus = ['This is the first fictitious document.',
		'This document is the second Document documented.',
		'And this is the third one.',
		'Is this the first document?']

# Creamos el stemmer
stemmer = PorterStemmer()

# Construimos un analyzer con el preprocesamiento que si provee CountVectorizer

analyzer = CountVectorizer(stop_words='english').build_analyzer()

  

# Definimos una función que suma el stemming al preprocesamiento que provee el analyzer

def stemmed_words(doc):
	return (stemmer.stem(w) for w in analyzer(doc))

  

#Inicializamos y aplicamos el CountVectorizer utilizando la función como analyzer

vectorizer = CountVectorizer(analyzer=stemmed_words) #ngram_range=(1,2)

X = vectorizer.fit_transform(corpus)

features = vectorizer.get_feature_names_out()
```

### Term Frequency - Inverse Document Frequency
TF-IDF
TF-IDF tiene dos partes.
**TF** mide cuántas veces aparece una palabra en un documento:
```
TF = frecuencia de la palabra en el documento
```
**IDF** mide qué tan rara o común es esa palabra en todos los documentos:
```
IDF = importancia según cuántos documentos contienen esa palabra
```
Si una palabra aparece en casi todos los documentos, su IDF baja.
Si aparece en pocos documentos, su IDF sube.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.stem import PorterStemmer

# Creamos el conjunto de documentos que queremos analizar
corpus = ['This is the first fictitious document.',
	'This document is the second Document documented.',
	'And this is the third one.',
	'Is this the first document?']

# Creamos el stemmer
stemmer = PorterStemmer()

# Construimos un analyzer con el preprocesamiento que si provee CountVectorizer
analyzer = TfidfVectorizer(stop_words='english').build_analyzer()

# Definimos una función que suma el stemming al preprocesamiento que provee el analyzer
def stemmed_words(doc):
	return (stemmer.stem(w) for w in analyzer(doc))

#Inicializamos y aplicamos el CountVectorizer utilizando la función como analyzer
vectorizer = TfidfVectorizer(analyzer=stemmed_words)
X = vectorizer.fit_transform(corpus)
features = vectorizer.get_feature_names_out()

# Mostramos los resultados
print(features)
print(X.toarray())
```



todo se resume a intentar genera una matrix de features genericos que representen los datos de texto