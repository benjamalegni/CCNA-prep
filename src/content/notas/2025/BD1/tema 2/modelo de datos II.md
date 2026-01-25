## relaciones (interrelaciones)
*una relacion (interrelacion) es una asociacion, vinculacion o correspondencia entre conjuntos de entidades, y se materializa en un conjunto de asociacioens entre dos o mas tuplas o ejemplares del mismo o diferente tipo*

igual que en el caso de las entidades, distinguiremos entre:
- **conjunto relacion:** el tipo de relacion o estructura generica que describe un conjunto de relaciones
- cada relacion, o instancia de relacion, es decir, cada uno de los ejemplares concretos

**CURSA** es una relacion que vincula las entidades ALUMNO y MATERIA
![[Pasted image 20250516181622.png]]
un ejemplar de la relacion CURSA es la vinculacion entre el alumno "123, Carlos, Sanchez" y la materia "EdD, Estructuras de Datos" dado que satisface la frase

"123, Carlos Sanchez cursa la materia EdD, Estructuras de Datos"

## tipo de relacion
Caracteristicas:
- *==nombre==*: al igual que las entidades debe ser unico
- *grado u ==orden==:* es el numeor de tipos de entidades que participan
- *tipo de correspondencia o ==cardinalidad== o multiplicidad:* es el numero maximo de ejemplares de un tipo entidad que pueden estar asociados, en una determinada relacion, con un ejemplar de otro(s)
- puede tener atributos propios
los terminos mas usuales son los subrayados

una relacion R de orden n (n-aria) relaciona n conjuntos de entidades E1... En.

cada instancia en R involucra las entidades E1, ... , En
entonces si:
- n=1 la relacion se denomina UNARIA: una entidad involucrada
- n=2 la relacion se denomina BINARIA: dos entidades involucradas
- n=3 la relacion se denomina TERNARIA: tres entidades involucradas

Tipos de correspondencias:
![[Pasted image 20250516205038.png]]
ej:
![[Pasted image 20250516205105.png]]

#### cardinalidades
- esta info se coloca sobre vinculos (lineas), en el ejemplo encerrado entre parentesis
- la lectura que se hace de las cardinalidades se denomina Look-Across (LA) o Chen-Style, se lee sobre la linea de la 'entidad destino'
- cuantos ejemplares de la entidad E1 puede relacionarse con cada ejemplar de la entidad E2, como maximo y como minimo?
![[Pasted image 20250516205444.png]]

la **cardinalidad maxima** representa el maximo numero de ejemplares de una entidad con los que se puede relacionar otra entidad
- al menos 1 (puede ser 0 o 1)
- como maximo **N** (muchos o varios, es una cantidad variable)
- como maximo **a** (es una cantidad fija de ejemplares)

la **cardinalidad minima** representa el minimo numero de ejemplares de una entidad con los que se puede relacionar otra entidad
- cardinalidad minima 0, un ejemplar de una entidad puede estar relacionado con otro
- cardinalidad minima 1, un ejemplar de una entidad debe estar relacionado al menos con un ejemplar
- cardinalidad minima **a**, un ejemplar de una entidad debe estar relacionado con al menos **a** ejemplares

### relaciones unarias (reflexivas/recursivas)
![[Pasted image 20250516205848.png]]
- cual es la semantica de esta relacion y de sus cardinalidades maximas?
	- cada pieza forma-parte de otra u otras piezas
	- cada pieza esta-formada-por otra u otras piezas
- notas que se describe con hechos afirmativos

### relaciones binarias 1:N
![[Pasted image 20250516210151.png]]
cual es la semantica de esta relacion y de sus cardinalidades maximas? 1:N
cada carrera pertenece a un unico departamento
cada departamento posee muchas carreras

#### entidades fuertes vs debiles
existen dos categorias de tipos de entidades:
- **regulares o fuertes,** son aquellas cuyos ejemplares tienen existencia por si mismos (ej, los ejemplares de ALUMNO)
- **debiles**, en las cuales **la identificacion** y existencia de un ejemplar dependen de **la identificacion** y existencia de un ejemplar de otra entidad. Violaria en cierto aspecto la primera regla de identificacion de entidades, EXISTENCIA PROPIA, ==se puede decir que tienen existencia propia en el contexto de otra entidad padre o fuerte==

por ej:
la identificacion y existencia de una COPIA de un LIBRO depende de la **identificacion** y existencia de un LIBRO ORIGINAL
el RENGLON de un REMITO depende de la **identificacion** y existencia de un ejemplar de REMITO
la **identificacion** y existencia de una PROVINCIA depende de la identificacion y existencia del PAIS al cual pertenece


### relacion entidad debil - entidad fuerte
una *entidad debil* puede ser univocamente identificada *solo* en el contexto de otra *entidad fuerte* o propietaria

entidades fuerte y debil estan vinculadas por una relacion binaria (1,1):( * ,N). *siempre* la cardinalidad del lado 1 es 1 ->
la entidad debil tiene una dependencia de existencia y de identificacion respecto a la entidad fuerte.
![[Pasted image 20250516210817.png]]

#### relaciones binaria: N:N
![[Pasted image 20250516210950.png]]
cual es la semantica de esta relacion y de sus cardinalidades maximas? N:N
cada **alumno** practica varios **deportes**
cada **deporte** es practicado por varios **alumnos**

### relaciones opcionales vs obligatorias
![[Pasted image 20250516211051.png]]
cual deberia ser la semantica 'completa' de esta relacion, interpretada en el mundo real?
![[Pasted image 20250516211312.png]]
este diagrama expresa que:
- un alumno practica al menos un deporte y podria practicas varios
- un deporte podria no ser practicado por algun alumno, pero puede ser practicado por uno o mas alumnos
- en la cardinalidad minima
	- 0 indica **OPCIONALIDAD**
	- 1 indica **OBLIGATORIEDAD** (relacion *mandatoria*)

#### relaciones ternarias ![[Pasted image 20250516211441.png]]
diferentes alternativas:
N:N:N
1:1:N
1:N:N
1:1:1

**Cardinalidad N:N:N**
un profesor, para cada materia utiliza **muchos** libros.
un profesor, cada libro lo utiliza para **muchas** materias
un libro, en cada materia es utilizado por **muchos** profesores
![[Pasted image 20250516211652.png]]
hay tuplas que no cumplen las condiciones de la relacion, solo una de cada par es correcta...

### jerarquia
existen situaciones en las cuales distintas entidades pueden compartir caracteristicas comunes (atributos)
- se puede crear un nuevo tipo de entidad llamado **supertipo** que contenga dichas caracteristicas, realizando asi una generalizacion o especializacion de las entidades originales
- los atributos especificos se asocian a entidades denominadas **subtipos**

el proceso anterior en el MERExt lleva a dos conceptos referidos de las jerarquias:
- **la generalizacion:** especifica que varias entidades con ciertos atributos comunes (entidades subtipos) pueden generalizarse en un tipo de entidad de nivel superior (entidad supertipo)
- **la especializacion** esto indica que los subtipos son una especializacion del supertipo. La generalizacion se describe tambien en terminos de herencia, y especifica que todos los atributos y relaciones de un supertipo se propagan en la jerarquia a las entidades de menor nivel.

Las relaciones de supertipo-subtipo se pueden caracterizar segun 2 aspectos:
- la posibilidad de que las tuplas o ejemplares de los subtipos sean conjuntos disjuntos, o no (overlapping) (jerarquas **exclusivas o compartidad**, respectivamente)
- la obligacion de que cada instancia del supertipo deba estar presente en alguno de los subtipos, o no(jerarquias **totales o parciales,** respectivamente)
estas 2 caracteristicas son ortogonales, y por lo tanto conforman un espectro de **4 posibles definiciones** de jerarquias cada una conjunto propio de restricciones de integridad semantica

*exclusiva total, exclusiva parcial, compartida total, compartida parcial*
![[Pasted image 20250516212624.png]]

## agregaciones
es una extension propuesta para modelar interrelaciones entre entidades y relaciones, o entre relaciones
- cual es su significado semantico?
- cuando tiene sentido plantear una agregacion?

como indicar la relacion **trabaja** entre entidades y relaciones?
![[Pasted image 20250519200046.png]]

### dimension temporal
- el tratamiento de la dimension temporal dentro del MERExt es un tema complejo
- es necesario establecer un metodo semantico y grafico que recoja de algun modo en el esquema conceptual el paso del tiempo y su influencia en la forma en que varian los datos
- que opciones tenemos hasta ahora? solo la representacion de un dato de tipo fecha

debemos analizar:
- si los datos que vamos a almacenar van a constituir una base de datos historica o no
- podemos tener que registrar a lo largo del tiempo:
	- los atributos
	- las relaciones

### construccion del DERExt
*no existen reglas que indiquen como construir un modelo de datos, solo principios generales a aplicar junto al criterio del disenador experimentado*

- interpretar las frases expresadas en lenguaje natural, identificando cuales son las *entidades* (datos) y cuales las *relaciones* (entre los datos) en la organizacion
- Chen propuso las siguiente heuristicas:
	- en general, ==un sustantivo es una entidad==, aunque tambien podria ser un atributo (ej: "los ==ALUMNOS== cursan ==MATERIAS==")
	- un verbo o frase verbal puede indicar una relacion entre entidades (ej: "los alumnos ==CURSAN== materias"). Asociaciones entre los datos
- que informacion acerca de las entidades y relaciones deberian registrarse? -> determinar los atributos (de entidades y relaciones)
- respecto de relaciones mas complejas (ternarias, agregaciones, etc.) la experiencia del disenador, las herramientas computacionales que maneje y el conocimiento de las transformaciones en esquemas equivalentes constituyen un recurso fundamental

### decisiones de diseno
- cuando un concepto deberia modelarse como entidad? o como atributo?
- cuando un concepto deberia modelarse como una entidad? o como una relacion?
DEPENDE DE LOS REQUERIMIENTOS DEL CLIENTE


- como definir correctamente el grado de una relacion? es binaria? es ternaria o de orden >3? son varias o es una?
ANALISIS DE TIEMPOS Y ACTORES

- es equivalente una relacion ternaria a dos o mas binarias entre las entidades involucradas?
- es equivalente una relacion ternaria a una agregacion?
NO SIEMPREE

-> EXPERIENCIA Y PRACTICA SON INDISPENSABLES PARA RESOLVER ESTOS INTERROGANTES


## resumen: diseno conceptual de datos
- el diseno conceptual se guia por el **analisis de requisitos**
	- permite obtener una descripcion de alto nivel de los datos que finalmente seran almacenados
- MER/MERExt es uno de los modelos mas populares para el diseno conceptual
	- construcciones expresivas, cercanas a la forma en que los usuarios piensan acerca de sus aplicaciones
	- numerosas herramientas CASE (que generalmente siguen el modelo binario -> no hay relaciones ternarias, que deben ser representadas por 2 o mas binarias -> no siempre equivalentes!!)
- algoritmos de derivacion 'casi automatica' desde el esquema conceptual al esquema logico temprano