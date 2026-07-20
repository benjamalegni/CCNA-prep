son modelos de deep learning entrenado con grandes cantidades de texto para predecir la proxima palabra en una secuencia

- basados en arquitectura transforme
- aprenden patrones estradisticos del lenguaje
- su objetivo es minimizar el error al predecir la siguiente palabra

stochastic parrot
- hay aleatoriedad en la generacion de texto
- repiten sin entender patrones presentes en los datos
- no tienen comprension semantica real
- no poseen una memoria estructurada ni modelo del mundo
- pueden sonar expertos pero no razonan

- Los LLMs generalizados están diseñados para comprender y procesar información en una amplia variedad de dominios como derecho, medicina y finanzas. 
- No están restringidos a un campo específico, lo que permite aplicaciones versátiles y adaptables. 
- Resumir textos 
- Traducir idiomas 
- Escribir código 
- Contestar preguntas 
- Generar historias, diálogos, instrucciones, poemas…

## de donde aprenden
- common crawl
- C4 colossal clean crawled corpus
- entre otros

## problemas
- Copyright. 
- Muchos textos están protegidos por derechos de autor. 
- El uso puede no estar cubierto por la doctrina de fair use. 
- Legalmente, sigue siendo una cuestión abierta. 
- Consentimiento. 
- Los sitios pueden indicar que no quieren ser rastreados. 
- Privacidad. 
- Los textos pueden contener datos sensibles como direcciones IP o teléfonos.

# frameworks
- langchain
	- Construcción modular de aplicaciones con LLMs (chatbots, agentes, RAG, cadenas complejas). 
	- Componentes: Prompts, memory, tools, agents, retrievers, chains. 
	- Agentes: Sí, incluye agentes reactivos y planificadores. 
	- Integraciones: OpenAI, HuggingFace, Pinecone, FAISS, SerpAPI, más. 
	- Ideal para: Prototipar rápidamente asistentes y workflows complejos.
- llamaindex
	- Framework para conectar LLMs con fuentes de datos estructuradas y no estructuradas. 
	- Core: Indexado + recuperación + síntesis. 
	- Soporta: PDFs, Notion, SQL, APIs, Google Docs, etc. 
	- Retrievers: Avanzados, permite personalizar cómo se accede a la información. 
	- Ideal para: Construir pipelines robustos de RAG.
- langgraph
	- Framework para construir agentes LLM con lógica de control explícita y flujos dinámicos. 
	- Representa flujos como grafos finitos dirigidos. 
	- Control sobre bucles, paralelismo y transiciones. 
	- Basado en LangChain, pero con más estructura para tareas complejas. 
	- Ideal para aplicaciones donde se necesita razonamiento estructurado, multi-turn y control detallado.


## partes del prompt
![[Pasted image 20260718103623.png]]

prompt engineering:
- Prompt engineering son estrategias y tácticas para obtener mejores resultados de LLMs. 
- Implica diseñar entradas claras y comprensibles para la IA, asegurando que la salida sea relevante y precisa. 
- Si refinamos nuestra solicitud, obtenemos una respuesta más alineada con lo que necesitamos. 
- Un buen prompt puede marcar la diferencia entre una respuesta genérica y una solución útil. 
- Se trata de lograr resultados consistentes, controlables y repetibles. 
- Aunque la palabra "engineering" suene técnica, el enfoque real está en el pensamiento estratégico y la resolución de problemas.

## tipos de prompting
zero-shot
- sin proporcionar ejemplos, solo la instruccion de la tarea
- simple
- requiere menos contexto
- eficiente para tareas comunes

few-shot
- se le muestran varios ejemplos dentro de mismo prompt
- mejora la precision
- transfiere el formato deseado al modelo

few-shot dinamico
- tambien llamados Retrieval-Augmented Prompting
- el modelo accede a una base de ejemplos o conocimiento y selecciona automaticamente los mas relevantes para construir el prompt
- escalable: muchos ejemplos pero solo se usa un subconjunto relevante
- mejora la precision sin sobrecargar el prompt
- ideal para personalizacion o tareas de contexto amplio
- requiere un sistema externo (retrieval, embeddings)
- mas costoso computacionalmente

## RAG
- RAG es una técnica que combina recuperación de información (retrieval) con generación de texto mediante un LLM.
- Sirve para que los modelos respondan preguntas o realicen tareas basadas en conocimiento externo actualizado, sin requerir que toda esa información esté "memorizada" en sus parámetros.
![[Pasted image 20260718105814.png]]

## evaluacion de LLMs
las LLMs pueden generar respuestas factualmente incorrectas con alta fluidez

las alucinaciones pueden ser:
- extrinsecas: contradicen el conocimiento del mundo
- intrinsecas: contradicen el propio contexto de entrada

metricas automaticas:
- Faithfulness: la respuesta se ajusta al contexto proporcionado? 
- Técnicas: verificación con retrieval, QA inversa. 
- Factual Consistency: es correcta con respecto a datos externos conocidos? 

Puede usar un ground truth o RAG para contrastar. 
- Context Relevance: la respuesta está relacionada con la entrada? 
- Answer Correctness: la información clave de la respuesta es correcta? 
- Hallucination Detection (DeepEval): puntúa con 0–1 cuánto inventa el modelo.

#### mas alla de la relevancia
la respuesta contiene lenguaje ofensivo, violento o discriminatorio?
	Métricas comunes:
		- Toxicity Score (e.g,. Perspective API)
		- Classifier-based filtering (modelos entrenados para detectar discurso tóxico)

el modelo favorece ciertos grupos o estereotipos?
	Métricas: 
		- Group Fairness: precisión equilibrada entre subgrupos 
		- Directional Bias: evaluar outputs ante prompts neutrales

privacidad:
	tecnicas:
		- Canary Strings: insertar cadenas únicas y ver si el modelo las repite.

robustez y seguridad:
si el modelo es vulnerable a prompts maliciosos
- Ejemplos: 
	- Inyecciones de instrucciones (“Ignore previous instructions...”) 
	- Ataques con codificación adversarial (Unicode, prompts invisibles) 
- Métricas: 
	- Attack Success Rate 
	- Perturbation Robustness

## evaluacion de RAGs
un RAG tiene 2 componentes criticos
- retrieval: se recuperaron los documentos correctos?
- generation: la respuesta es coherente, fiel y util?
![[Pasted image 20260718111242.png]]

### LLMs evaluando LLMs
este metodo tiene estas caracteristicas:
- menor costo
- escalable
- precision variable

acumulacion de errores
inestabilidad
sesgos del evaluador
limitacion semantica

# herramientas de evaluacion de LLMs
deepeval
- Evaluación flexible y modular para tareas generativas. 
- Soporta métricas como: 
	- Faithfulness (al texto fuente). 
	- Toxicity. 
	- Bias. 
	- Factuality. 
- Integración con OpenAI, Hugging Face y otros backends. 
- Soporta testeo manual y automatizado con pruebas tipo unit-test.

ragas
- Retrieval-Augmented Generation Assessment Suite 
- Diseñado para evaluar pipelines de RAG. 
- Métricas integradas: 
	- Context Precision/Recall: relevancia de documentos recuperados. 
	- Faithfulness: qué tanto la respuesta se apega a los documentos. 
	- Answer Correctness: calidad de la respuesta final. 
- Útil para evaluar chatbots con búsqueda y sistemas QA.

promptbench
- Benchmarking para prompts bajo múltiples tareas. 
- Permite: 
	- Comparar variantes de prompts (zero/few-shot) 
	- Evaluar sensibilidad a cambios mínimos 
	- Visualizar outputs con errores, sesgos o alucinaciones

## LLMs y bias
afecta las respuestas del modelo de manera no neutral.
el bias puede distorsionar resultados, afectar decisiones o reproducir injusticias
tiene un paralelo directo con los sesgos cognitivos humanos

## tipos de BIAS
positional: el orden de los elementos en el prompt influye en la respuesta

selection: cuando los ejemnpos usados para entrenar o condicionar estan desequilibrados

recency: modelo dle da mas peso a la informacion que aparece al final del prompt

cultural o demographic: preferencia por perspectivas demograficas mayoritarias

anchoring: los ejemplos o instrucciones iniciales del prompt condicionan la respuesta

acquiescence: tender a elegir respuestas positivas, afirmativas o amables

## estrategias para el mitigamiento del bias
1. Reescribir instrucciones de forma neutra 
	- Evitar formular preguntas que induzcan una respuesta . 
	- Usar lenguaje balanceado . 
2. Forzar razonamiento 
	- Pedir: "Explica tu razonamiento paso a paso“. 
	- Hacer preguntas en dos partes: “Cuál elegís?” → “Por qué?”. 
3. Controlar orden y formato 
	- Aleatorizar el[]() orden de opciones . 
	- Normalizar estructura de entrada (por ejemplo, usar tags: [Opción A]: ...). 
4. Forzar comparación explícita 
	- "Compará ventajas y desventajas de ambas opciones“. 
	- "No decidas hasta que evalúes cada alternativa“. 
5. Meta -instrucciones 
	- “Considerá múltiples puntos de vista”. 
	- “Evitá suposiciones no justificadas por el texto”. 
	- “No respondas hasta haber leído todas las opciones”

## estrategias de diseno de prompts
1. A/B testing entre prompts
2. multi-model check
3. human annotation o crowdsourcing

comparar respuestas en terminos de:
- balance de opiniones
- variedad de argumentos
- posicion final tomada

