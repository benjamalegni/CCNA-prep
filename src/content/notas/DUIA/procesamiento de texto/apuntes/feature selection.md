las colecciones de texto tienen una alta dimensionalidad
- muchos terminos pueden terminar siendo irrelevantes para discriminar entre clases o contenidos
- mas features incrementan el ruido
- no todos los algoritmos soportan un alto numero de features
- se degrada de la efectividad de los metodos de clasificacion
- los **tiempo de aprendizaje se incremental exponencialmente**

- Curse of Dimensionality: muchas features independientes en relación al número de instancias. 
	- Muchas features que aparecen en una baja cantidad de instancias. 
	- Sparse.

la idea general es seleccionar un subconjunto de features optimal de acuerdo a un cierto criterio

## cuando es importante?
- datos ruidosos
- muchas features de baja frecuencia
- demasiadas features en comparacion a la cantidad de instrancias
- el modelo es complejo

esto se realiza para:
- mejorar velocidad, poder predictivo, simplificar el modelo
- reducir/evitar overfitting, mejorar la generabilizacion del modelo
- interpretabilidad
- eliminar datos irrelevantes
- reducir requerimientos de almacenamiento y tiempo de aprendizaje

#### feature selection vs feature extraction
en feature selection -> se busca reducir el conjunto de features T a T1 donde T1 es un subconjunto de T. Usando T1 se logran resultados mas efectivos en comparacion con cualquier otro subconjunto T2

en feature extraction ->  mapea datos altamente dimensionales a un espacio con menos dimensiones. los metodos intentar generar a partir de T otro conjunto T1 donde las features en T1 no necesariamente existen en T
- un termino en T1 puede ser una combinacion de features de T o una transformacion de alguna feature (o grupo de features) en T

en un contexto no supervisado: minimizar la perdida de informacion
en un contexto supervisado: maximizar la discriminacion entre clases

## tipos de features
relevantes -> se necesitan para tener un buen modelo
irrelevantes -> son simplemente innecesarias
redundantes -> se vuelven irrelevantes en la presencia de otras features

## clasificacion de las tecnicas de feature selection
### por uso de las clases
supervised: clasificacion/regresion (sin features discriminativas)
unsupervised: clustering (sin info de la clase)
semisupervisado: con pocos datos etiquetados + muchos sin etiquetar

### por metodos de seleccion
- filter: independiente del model (usa metricas como informacion, distancia, dependencia)
- wrapper: usa el algoritmo ML como "caja negra" (entrena/valida cada subconjunto)
- embedded: integrado en el proceso de aprendizaje (ej. L1 regularization)

### como se consideran las features
univariado:
- considera features una a una, ignorando relacion entre features
- features pueden ser redundantes (pero no lo sabemos)
- una feature irrelevante por si misma, puede considerar una mejora al ser combinada con otra
- rapido, pero menos optimo

multivariado:
- selecciona conjuntos de features que combinadas tienen un buen poder predictivo
- metodos de busqueda
- mas costoso computacionalmente
	- porque hay un numero exponencial de subconjuntos para analizar
### como se seleccionan las features
generacion secuencial backward
- comienza en el conjunto completo y en cada iteracion se elimina una feature guiados por un criterio que la considera la menos importante
- termina cuando **se alcanza una cantidad minima deseada de features**, se reduce a una unica feature considerada la mas informativa
generacion secuencial forward
- comienza con un conjunto vacio
- se agregan features una por una, segun un criterio que determina cual es la mejor en cada paso
- el conjunto crece hasta:
	- alcanzar un nro deseado de features relevantes
	- alcanzar el conjunto completo si se esta aplicando busqueda exhaustiva
generacion bidireccional
- comienza en ambas direcciones a la vez
- termina cuando una de las busquedas encuentra el mejor subconjunto con m features antes de llegar a la mitad del espacio de busqueda
- ambas busquedas se encuentran en el medio
generacion aleatoria
- inicia la busqueda en direccion aleatoria
- la decision de agregar/eliminar feature se toma de forma aleatoria
- evita quedar atrapado en optimos locales, ya que no sigue un patron fijo

cuando usar cada una:

| metodo                         | cuando usar                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| generacion secuencial backward | cuando se sospecha que hay muchas features irrelevantes o redundantes                                |
| generacion secuencial forward  | cuando se busca construir progresivamente el mejor subconjunto                                       |
| generacion bidireccional       | cuando buscamos un equilibrio de costo computacional y calidad de seleccion                          |
| generacion aleatoria           | cuando el espacio de busqueda es muy grande y se quieren explorar multiples combinaciones (no todas) |
busqueda exhaustiva:
- costosa
- explora todos los subconjuntos posibles para encontrar optimos
- impractica en conjuntos de datos reales con alta dimensionalidad

busqueda heuristica:
- evita busqueda por fuerza bruta usando heuristicas
- mucho mas eficiente
- se comporta como un DFS entre los subconjuntos

busqueda aleatoria:
- lo mejor de exhaustiva y heuristica
- en cada paso se genera un nuevo subconjunto al azar
- no se sabe cuando se alcanza el optimo, pero si se sabe cual es mejor que el anterior
### si las clases/categorias de las instancias se utilizan durante el proceso
supervised
unsupervised
semi-supervised

## metricas filter
Univariadas:
- Chi-cuadrado (χ²), Information Gain, Cross Entropy, Odds Ratio
- Mutual Information, ANOVA F-score
- Correlación (Pearson, Spearman), Varianza Baja, TF/DF
Multivariadas:
- Conditional Mutual Information
- CFS (Correlation-based Feature Selection)
- MRMR (Minimum Redundancy Maximum Relevance)
Categorías:
- Similitud: preserva similitud entre instancias
- Teoría de la información: reduce incertidumbre sobre la variable objetivo
- Estadística: evalúa importancia individual de features

## métodos Wrapper
Evalúan features según el rendimiento predictivo de un algoritmo ML:
1. Elegir subconjunto → 2. Entrenar/validar → 3. Evaluar → 4. Repetir → 5. Seleccionar mejor

- Búsqueda exhaustiva: prueba todos los subconjuntos (costoso, exponencial)
	- Ventaja: considera interacciones entre features
	- Desventaja: alto costo computacional
## métodos embedded
Punto intermedio entre wrapper y filter:
- Integran selección de features en el proceso de aprendizaje
- Consideran interacción con el algoritmo pero son más eficientes
- Evitan reentrenamiento para cada subconjunto
# Evaluación
Criterios:
- Performance de la tarea y generalización
- Complejidad (tiempo)
- Cantidad de features seleccionadas
- Velocidad del proceso

Métodos:
- Ponderación y ranking: ordena features por puntuación, selecciona top-k
- Supervisado: dividir train/test, aplicar FS sobre training, evaluar sobre test
- No supervisado: aplicar FS, ajustar modelo, obtener métricas

# Limitaciones y Desafíos
- Dependencia del tamaño del entrenamiento: los subconjuntos varían con el tamaño del set
- No siempre es posible reducir dimensionalidad: algunas features objetivo dependen de muchas entradas
- Backward Search es lenta en grandes volúmenes de datos
- Subconjuntos aún grandes pueden limitar modelos complejos

Desafíos específicos:
- Datos heterogéneos: técnicas tradicionales asumen i.i.d.; datos en red, múltiples fuentes, estructuras jerárquicas/grafo
- Escalabilidad: datos de terabytes no caben en memoria; preferir algoritmos lineales/sublineales
- Estabilidad: sensibilidad a perturbaciones en datos de entrenamiento (agregar/eliminar muestras, ruido, valores atípicos); reduce confianza en resultados