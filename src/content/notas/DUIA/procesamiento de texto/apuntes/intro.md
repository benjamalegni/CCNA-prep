3 tps incrementales
- notebooks
- exploran conceptos vistos en clase
- son opcionales

evaluacion mediante certificacion NVIDIA
- workshop + certificacion
- building transformer-based natural language processing applications
- es obligatoria
- vale aprox 200 usd pero es gratis por este curso

es un poco mas complicado el texto que con otro tipo de datos

## que es el procesamiento de lenguaje natural
es la rama de la ciencia de la computacion que se enfoca en el desarrollo de sistemas que permitan a las computadoras comunicarse con las personas

- leer
- descifrar
- comprender
- dar sentido
a lenguajes humanos

se puede usar para:
- recuperar info
- encontrar info relevante a la consulta de usuarios
- corrector ortografico y gramatico
- sugerir alternativas para los errores
- prediccion de palabras
- predecir cual es la proxima palabra que tiene mayor probabilidad de ser escrita por el usuario
- hacer resumenes
- clasificacion de texto
	- asignar una o + categorias predefinidas a un texto
- responder preguntas
- extraccion de informacion
- traduccion:
	- pueden haber sesgos de genero, donde dependiendo de la accion puede variar el genero del usuario
- analisis de sentimientos
- reconocimiento de caracteres (OCR)
- sintetizacion de voz
	- producir audio a partir de un texto
- sistemas de dialogo, antes de los LLM era bastante complicado

## NLP, NLU, NLG
NLP:
Procesamiento de Lenguaje Natural 
Capacidad para descomponer, entender y analizar el significado de lo que se le dice ya sea por voz o texto, y así, determinar la acción a realizar respondiendo en el mismo lenguaje en el que el humano se comunica durante la interacción.

NLU:
Entendimiento de Lenguaje Natural 
Capacidad que tiene la máquina para interpretar y comprender el propósito de alguna petición de entradas de datos no estructuradas y convertirlas de forma estructurada.

NLG:
Generación de Lenguaje Natural 
Es el proceso de generar de manera automática lenguaje natural mediante datos estructurados de texto o voz.

![[Pasted image 20260626191539.png]]

## niveles de dificultad
facil:
- La mayoría resueltos (y sin necesidad de LLMs). 
- Spell checking. 
- Algunas tareas de clasificación. 
- Algunas tareas de reconocimiento de **entidades**.

medio:
- Si bien hay un buen progreso y los LLMs ayudaron mucho, todavía puede haber errores. 
- Information retrieval. 
- Sentiment analisis. 
- Machine translation. 
- Information extraction.

dificil:
- Los LLMs han avanzado estas tareas a pasos agigantados, pero todavía falta! 
- Question answering. 
- Summarization. 
- Dialog systems. 
- Resolución de tareas con diversos pasos y “razonamiento”.

por que es dificil hacer esto?
- las reglas que usamos en el lenguaje no son facil de entender para las computadoras
- reglas son abstractas: ej sarcasmo, ironia
- reglas de bajo nivel
	- ej. formacion de plurales y excepciones
- semantica y ambiguedad
	- polisemia -> palabras que pueden tener mas de un significado
- fonetica y fonologia
	- heteronimos -> palabras que se escriben igual, pero tienen distinto significado cuando son pronunciadas distinto
- sintaxis y ambiguedad
- analisis del discurso
	- cuando se hace referencia a alguien o algo pero no se especifica claramente, solo se indica su pronombre
- parafraseo
## desafios con el cliente
**no entiendo lo que estas pidiendo:**

- Múltiples intents en una única pregunta 
	- El cliente realiza múltiples preguntas al mismo tiempo. 
	
- Puede haber también errores ortográficos. 

- Qué debería hacer el bot? 
	- Poder resolver los errores ortográficos, separación de palabras. 
	- Identificar los tópicos de interés para el cliente. 
	- Presentar las diferentes opciones al cliente.

**Asumir que comprende el contexto y tiene memoria.** 
- Si el cliente no provee suficiente información, el bot debe pedir más información. 
- Luego, la información previa y la actual debe ser combinada para brindar una respuesta más completa o precisa, más “útil”. 

**Qué debería hacer el bot?** 
- Comprender que el tópico “boat” es algo en lo que el cliente está interesado, pero las opciones son amplias. 
- Pedir más información. 
- Complementar la nueva información con la previa.

**Errores en las entidades** 80% de las consultas a chatbots tienen errores ortograficos
- Errores de ortografía son una parte natural de la interacción con los clientes. 
- Por ejemplo, en este caso el cliente quiere el pronóstico del tiempo, pero escribe mal el lugar. 
- Qué debería hacer el bot? 
- Aplicar corrección ortográfica antes de continuar con las tareas.

**Misma palabra, distinto significado (ambigüedad)**
- Comprender el lenguaje depende de la habilidad para distinguir la importancia de las diferentes palabras en diferentes oraciones.
- que deberia hacer el bot? deberia determinas que palabras son importantes para la consulta del usuario

**Mantener el flujo de conversación.** 
- El bot debería ser capaz de determinar y mantener el flujo de conversación basado en la entrada del cliente. 
- Qué debería hacer el bot? 
	- Tratar de encontrar coincidencias entre la información interna que posee (por ejemplo, su entrenamiento y flujos) y la información que ofrece el cliente. 
	- Ofrecer una sensación de servicio pro-activo.

**Tratar los falsos positivos.** 
- Un cliente hace un pedido que el bot debería saber cómo responder, pero todavía no aprendió como. 
- Qué debería hacer el bot? 
	- Tratar de identificar las partes relevantes de la conversación y ofrecer asistencia basado en las partes que se conocen y reconocer qué es lo que no se conoce/entiende. 

## como hacemos el procesamiento de lenguaje natural?
manualmente:
- Requiere de especialistas para definer y formalizar el conocimiento requerido. 
- Difícil, propenso a errores, require de tiempo. 
- Las reglas requieren definir todas sus excepciones e irregularidades. 
- Costoso para desarrollar. 
- Habilidades y capacidades limitadas.

de forma automatica:
- Uso de métodos de aprendizaje de máquina para la automáticamente adquirir el conocimiento a partir de corpus. 
- Se lo define como enfoques “estadísticos”, “empíricos” o “basados en corpus”.

las LLM pueden hacer el preprocesamiento?
si.
- Los LLMs pueden encargarse de muchas tareas de preprocesamiento: 
- Limpieza y estandarización de texto. 
- Corrección ortográfica y normalización. 
- Tokenización, lematización e incluso etiquetado gramatical. 
- Enriquecimiento o reescritura del texto con sinónimos o mejor estructura.

aunque pueden tener desventajas:
- **Falta de control.** La salida puede variar o ser inconsistente. 
- **Costo.** Las llamadas a la API o el cómputo pueden ser caros a gran escala. 
- **Latencia.** Son más lentos que los pipelines tradicionales. 
- **Explicabilidad.** Es más difícil rastrear o depurar lo que hicieron.

cuando usar:
- se necesita enriquecer o reescribir el texto mas alla de una simple limpieza
- texto de entrada muy ruidoso, escaso o carece de estructura
	- ejemplo: un json roto. evitamos tener que hacer un parser json.
cuando no:
- cuando la velocidad es prioridad, consistencia o bajo costo
- solo se requieren transformaciones estandar o basadas en reglas

# workflow
![[Pasted image 20260626200621.png]]
![[Pasted image 20260626200649.png]]

text pre-processing:
transformar el textto en una forma que sea analizable

analisis lexico/morfologico:
"la unidad minimo de significado" => morfema
no se analiza nada mas que las palabras en esta etapa

analisis sintactico:
Involucra el análisis de las palabras en una oración considerando reglas gramáticas que muestran las relaciones entre las palabras.

analisis semantico:
analiza el significado del texto, mapea estructuras sintacticas y objetos respecto al dominio de la tarea

integracion del discurso:
analisis de la estructura y significado del texto mas alla de una sola oracion, encontrando relaciones entre ellas

analisis pragmatico:
se reinterpreta el texto a lo que realmente significa
probablemente necesita aspectos externos
Involucra estudiar aspectos del lenguaje que requieren conocimiento externo.

# bibliotecas
- NLTK
	- basica
	- estandar
	- tiene varias cosas para hacer, es bastante completa
	- buen punto de partida
	- tokenizacion rapida
	- soporte
	- puede llegar a ser complicada
	- lenta para grandes cantidades de texto
- spaCy (probablemente la unica que usaremos)
	- evolucion de NLTK
	- mas rapida y eficiente que NLTK
	- soporta word vectors
	- Soporta tokenización para más de 75 idiomas. 
	- Interfaz de pipeline extensible. 
	- Se basa en modelos estadísticos. 
	- Análisis léxico, sintáctico y semántico. 
	- Integración con otras librerías.
	- no esta todo pensado para todos los idiomas
	- *no soporta multilenguaje*
- flair
	- construida con PyTorch
	- orientada a DL
	- incluye word vectors populares
	- tiene modelos pre-entrenados y tambien permite entrenar nuestros propios modelos
- gensim:
	- un poco reducida
	- topic modeling
	- disenada para la exploracion de documentos
	- es eficiente
	- esta hecho para modelado no supervisado de texto
	- no te da un pipeline completo
- textblob
	- una de las mas rapidas
	- basada en NLTK
	- una de sus funcionalidades mas destacadas es la traduccion
- standford-nlp stanza
	- multi-proposito
	- mayor ventaja es la escalabilidad
		- permite procesar mucho texto
	- buena opcion para scraping de fuentes publicas
	- sentiment analysis
	- tiene parte en java, y complejiza un poco su uso
- allenNLP
	- basada en PyTorch
	- especializada en DL
	- requiere mucha config
	- tiene soporte para un monton de moddelos
- hugging face
	- es un repositorio de modelo pre entrenados
	- API de inferencia
	- modelos de LLMs
	- soporta diferentes backends

comparacion:
![[Pasted image 20260626202129.png]]

## NLPaaS
amazon comprehend
gnla
![[Pasted image 20260626202219.png]]

El objetivo final es leer, descifrar, comprender y dar sentido a los lenguajes humanos de una forma que sea valiosa.