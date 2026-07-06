- El pre-procesamiento consiste en una serie de pasos para limpiar y estandarizar el texto en una forma que pueda ser consumida por otros sistemas. 
- La idea principal es eliminar el contenido no necesario en uno o más textos para obtener contenido más limpio y fácilmente procesable.


eliminar tags HTML
- estos tag, JS o iframe tipicamente no agregan valor para el analisis y entendimiento del texto
- libreria **beautifulSoup** en python

conversion de case:
Modificar el case de las palabras u oraciones para facilitar algunas tareas, como encontrar coincidencias entre diferentes palabras, mientras a la vez se reduce el tamaño del vocabulario.
- upper => todos caracteres en mayuscula
- lower => todos caracteres en minuscula
- title => primer caracter capitalizado y resto en title
usar casefold() para conversion de case, no rompe la conversion en casos especiales
- Los símbolos y los caracteres especiales usualmente agregan ruido en texto no estructurado. 
	- Caracteres no alfanuméricos. 
	- Dígitos.
- se pueden usar regex para eliminarlos

lo que se tiene que eliminar depende del problema.
- ejemplo, los simbolos de puntuacion podrian ser utiles en las tareas de sentiment analysis u opinion

regex:
se opera caracter por caracter, con un automata
entonces tambien matchearia con otras palabras
ejemplo cool matchea con:
- coolest
- watercooler
- supercool
se puede matchear
- chars particulares
- numeros
- espacios en blanco
	- \s espacio
	- \t tab
	- \n salto de linea
	- \r carriage return
se pueden encontrar secuencias definidas ad-hoc:
\w Hace matching con letras, dígitos y \_. 
\s Hace matching con caracteres de espacios, incluidos los tabs. 
\W Hace matching con lo contrario de \w.
\S Hace matching con lo contrario de \s. 
\d Hace matching con los dígitos. 
\n Hace matching con saltos de línea. 
\D Hace matching con lo contrario de \d. 
\r Hace matching con el carriage return. 
\t Hace matching con tabs.

estos simbolos se escapan con \ 
	- . \ + * ? [ ^ ] $ ( ) { } ! < > | -
- \[ ] conjunto de chars
	- \[a-z]
	- \[\s\d] => matchea con un espacio en blanco o con un digito
- anchors
	- al comenzar la cadena ^
	- al finalizar la cadena $
- cuantificadores
	- * Cero o más {n} n ocurrencias 
	- + Uno o más {n,} n o más ocurrencias 
	+ ? Cero o uno {n,m} Entre n y m ocurrencias
- la cantidad de ocurrencias puede ser
	- naive => tantas veces como querramos
	- cuantificada
		- repeticion fija: \d{2}
		- rango de repetificiones: \d {2,4}
		- repetición flexible. 
			- ?: indica 0 o 1 vez 
			- +: una o más veces 
			- *: 0 o más veces

![[Pasted image 20260627094909.png]]

### normalizacion unicode
hay varias formas:
- NFD
- NFC
- NFKD
- NFKC
donde C:composition, D: decomposition, K: compatibility

2 tipos de equivalencias entre caracteres
- equivalencia canonica
	 - secuencia combinada
	 - orden en las marcas
	 - singleton
- equivalencia de compatibilidad
	- diferencias de fuentes
tambien la compatibilidad abarca diferencias derivadas del formato:
- Variabilidad de fuentes. 
- Cursiva. 
- Caracteres con círculos. 
- Variación en ancho. 
- Variación de tamaño. 
- Rotación. 
- Super, supra índice. 
- Fracciones.

![[Pasted image 20260627100332.png]]
NFD: separa los chars unicode en sus componentes independientes
NFC: primero descompone los chars como NFD, pero vuelve a componer en un unico char
NFKD: separa los chars "fancy" o alternativos en sus componentes (en caso que sea posible). simplifica simbolos compatibles
NFKC: permite normalizar todas las variantes de un char a una unica version comun.
son 2 etapas:
- descomposicion de compatibilidad
- composicion canonica

no cambian la forma original: NFD, NFC
no cambian la longitud original: NFC, NFKC

Se pueden generar errores de compatilibidad si dos aplicaciones normalizan de distinta forma!! Errores de pérdidas de información que no son triviales de resolver dado que la normalización no puede ser reconstruída sin pérdida.

NFC suele ser la mayor opcion para texto general

la libreria unicode permite normalizar con el metodo normalize() indicando el tipo de procesamiento
## tokenizacion
dividir/descomponer datos textuales en componentes mas pequenos y llamativos llamados tokens
son componentes textualmente independientes y minimos con sintaxis y semantica definidas

##### hay varias formas de realizar la tokenizacion de oraciones:
sent_tokenize por defecto llama a punkt
- punkt
	- Divide el texto una lista de oraciones utilizando un modelo no supervisado que considera abreviaciones, collocations y palabras que comúnmente se encuentran al inicio de las oraciones. 
		- El modelo requiere mucho texto de entrada (idealmente similar al texto que se tokenizará) para el entrenamiento. 
	- Los espacios en blanco en el texto original se mantienen en la salida. Los signos de puntuación al final de las oraciones también son incluidos.
- regexp

##### tokenizacion de palabras
word_tokenize:
- treebankWord tokenizer
	- Utiliza expresiones regulares. 
	- Asume que ya se realizó el tokenizado de oraciones. 
	- Sigue algunas reglas: 
		- Separa los puntos al final de las operaciones. 
		- Separa las comas y comillas simples seguidas por espacios. 
		- Se separa la mayoría de los signos de puntuación. 
		- Separa palabras y sus contracciones	
- toktok tokenizer
	- Es uno de lo más nuevos.
	- Asume que la entrada es una oración por línea, con lo que solo el ultimo punto es tokenizado.
	- En caso de necesidad utiliza expresiones regulares para eliminar otros puntos.
- regexp
![[Pasted image 20260627103735.png]]

spaCy tiene su propio tokenizer y es un poco mas complejo
- divide por caracteres blancos
- analiza cada substring de izq a der
- coincide string con una regla de excepcion?
- puede extraerse un prefijo, sufijo o infijo?
![[Pasted image 20260627104344.png]]
## expansion de contracciones

- Existen varias formas de contracciones y están vinculadas al tipo de verbos auxiliares, negaciones, …. 
- Plantean un problema a NLP dado que: 
	- Agregan un carácter extra en el diccionario. 
	- Generan excepciones al tokenizar y estandarizar. 
- Idealmente, puede tener un mapeo adecuado para las contracciones y sus expansiones correspondientes y luego usarlo para expandir todas las contracciones en un texto.

la mayoria de alternativas no considera el contexto
**resuelve ambiguedades considerando cual es la mayor expansion con mayor probabilidad**

1. contracciones simples que solo matchean con una unica regla son expandidas
2. aquellas que matchen con mas de una regla
   - se reemplaza la contraccion por todas las posibles relgas
   - cada nuevo texto es procesado por un corrector gramatical y calcula una distancia entre los nuevos textos y el original
1. ordenan las hipotesis considerando la cantidad de errores (menor a mayor) y la distancia entre el texto original y las hipotesis (menor a mayor distancia). se selecciona la primera del ranking
la distancia es medida considerando "word move's distance (WMD)" 
la hipotesis mas cercana a la del texto original sera aquella con la menor distancia entre los embeddings correspondientes a la contraccion y la hipotesis

pycontractions esta deprecada

## eliminar stopwords
palabras que tienen poca a ninguna importancia

NLTK, spaCy y Stanford NLP proporcionan sus propias listas (en inglés)
las negaciones estan incluidas en las listas
- **a menudo deben preservarse** para que el significado actual de la oracion no se pierda en las aplicaciones, como en sentiment analysis

![[Pasted image 20260627105511.png]]

## correccion de texto
que hacer ante la presencia de palabras incorrectas en el texto

- palabras con errores ortograficos
- palabras con varias letras repetidas que no contribuyen mucho a su significado general

el objetivo es clasificar diferentes formas de estas palabras a la forma correcta para no terminar perdiendo informacion vital de diferentes tokens en el texto

en algunos casos si lo corregimos, podemos estar perdiendo informacion relevante, por ejemplo del sentimiento

con regex puedo sustituir caracteres repetidos
```regex
r'(\w*)(\w)\2(\w*)’
```
#### correccion de spelling

- Basado en corpus y frecuencia de palabras. 
	- Ej. Corpus de Gutenberg (corpus de 443 millones de palabras), Wiktionary y el Corpus Nacional Británico. 
- Algoritmo de Norvig → Director de investigación de Google. Precisión del 80% ~ 90%. 
	- Generar un conjunto de palabras candidatas que estén cerca de la palabra a corregir y seleccionar la palabra más probable de este conjunto como la palabra correcta. 
	- Edit distance para medir la semejanza (cuántos cambios tengo que hacer en la palabra para obtener la similar?) 
	- Usar un corpus de palabras correctamente escritas para identificar cual es la palabra “estadísticamente correcta” en relación a su frecuencia. 
- No es provisto por todas las bibliotecas.


# analisis lexico
Se ocupa del estudio a nivel de las palabras con respecto a su significado léxico.
Este nivel de procesamiento lingüístico utiliza el lexicon de un idioma, que es una colección de lexemas individuales. 
Un lexema es una unidad básica de significado léxico; que es una unidad abstracta de análisis morfológico que representa el conjunto de formas o "sentidos" tomados por un solo morfema.
## stemming
morfemas consisten en unidades que son raices y afijos
los afijos son unidades como prefijos, sufijos, etc

stem+afijo=palabra
palabra-afijo=stem

el stemming ayuda a estandarizar las palabras en su raíz base, independientemente de sus inflexiones. 
- Útil para la clasificación, agrupamiento o incluso recuperación de información.

los siguientes algorimos son realmente clasicos (viejos):
porter:
- Uno de los primeros algoritmos. 
- Soporta idioma inglés. 
- Busca eliminar las terminaciones comunes de las palabras para que puedan resolverse a una forma común. 
- Garantiza la reproducibilidad. 
- Poco agresivo. 
- Es un buen algoritmo básico, pero no se recomienda usarlo para ninguna aplicación “real”.
snowball:
- Mejora sobre Porter. 
- Es un poco más rápido que Porter. 
- Más agresivo que Porter. 
- Danish, Dutch, English, Finnish, French, German, Hungarian, Italian, Norwegian, Portuguese, Romanian, Russian, Spanish, Swedish.
lancaster:
- Algoritmo muy agresivo y rápido. 
- A diferencia de Porter y Snowball, las representaciones derivadas no son intuitivas. 
- Los stems pueden ser "confusos". 
- No es recomendable si se quieren stems reconocibles o interpretables. 
- En NLTK, se le pueden agregar más reglas.

del stemming surgen 2 problemas
**overstemming**:
- reduce de sobra
- stems sin sentido
- palabras de origen distinto se reducen al mismo stem
	- university => univers
**understemming:**
- se tienen multiples palabras que son la forma de la otra
- las palabras son mapeadas a diferentes stems, cuando probablemente deban ser mapeados al mismo
## lematizacion
es similar a stemming
**garantizo que la palabra que obtengo garantiza al diccionario**

es mas lenta que el stemming
NLTK utiliza wordnet y la sintaxis y semantica de la palabra como parte del discurso y el contexto para obtener la palabra raiz o lema
- La part-of-speech es extremadamente importante porque si eso está mal, la lematización no será efectiva. 
- Puede funcionar sin part-of-speech, pero podría no ser efectivo.

spaCy es mas facil de usar
- hace part-of-speech y lematizacion juntos

# que incluir en el pipeline
![[Pasted image 20260627112828.png]]
si hacer:
- eliminar ruido
- lowercasing
	- puede depende de la tarea en algunas ocasiones
se podria hacer:
- normalizacion simple
	- standarizar palabras lexicamente similares
	- correccion de spelling
depende la tarea:
- normalizacion avanzada
	- que hacer con palabra que no existen en el diccionario o corpus?
- stemming/lemmatizacion
![[Pasted image 20260627113109.png]]
