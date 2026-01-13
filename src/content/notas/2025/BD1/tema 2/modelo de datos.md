que hace que un dato se convierta en informacion?

cuando utilizamos el lenguaje natural y decimos, por ej, que una persona ha nacido en 1965, el dato (**1965**) va acompanado de su interpretacion (ano de nacimiento de cierta persona)

![[Pasted image 20250515164953.png]]

### dato vs info
que ha ayudado a interpretar los datos?
modelar: **definir un mundo abstracto y teorico. Representar una realidad**
modelo: **conjunto de conceptos para construir una representacion de algo**
![[Pasted image 20250515165104.png]]

## modelo de datos
- es un dispositivo de abstraccion
- proporciona mecanismos de abstraccion
- permite representar esa parte del Universo del Discurso(UdD) que nos permite registrar
- tienen dos niveles: la estructura y la informacion

### esquema vs ejemplar
esquema es la descripcino de la estructura de los datos
es relativamente invariante (en tanto no cambie el UdD)
esta descrito en base a datos qeu se los denomina metadatos

ejemplar son los datos propiamente dicho, y estos si varian a lo largo del tiempo

# Tipos de abstracciones en el MD
- clasificacion / particularizacion: abstraer caracteristicas comunes a un conjunto de ejemplares![[Pasted image 20250515165433.png]]
- agregacion / desagregacion:
	- para obtener una clase
	- para obtener una clase compuesta
	- para obtener una propiedad compuesta
- generalizacion / especializacion: abstraer las caracteristicas comunes a varias clases (subclases) para constituir una clase mas general (superclase)![[Pasted image 20250515165603.png]]
- asociacion / disociacion: utilizada para vincular dos o mas clases. Este nuevo elemento que aparece tiene determinadas caracteristicas que lo distinguen de las clases normales![[Pasted image 20250515165711.png]]

## MD en el proceso de diseno de datos 

![[Pasted image 20250515165743.png]]
==no es posible tener conocimiento completo del mundo real,== enotonces hay que centrar la atencion en la informacino **relevante**, ocultando o ignorando otra que no interese o resulte inadecuada para el proposito requerido

# design de un modelo de datos
etapas para encontrar una forma eficaz de representar la informacion en el mundo computacional:
- identificacion de los datos de la realidad: actores, recursos, objetos, etc. del mundo real de los cuales interesa guardar informacion
- identificacion de relaciones entre datos: deteccion de los vincativos que se dan entre los elementos de las etapas anteriores
- abstraccion de datos y relaciones: representacion simbolica solo de los elementos detectados en las etapas anteriores

## etapas del design de datos
en el **design conceptual de datos** se utiliza un modelo conceptual de datos que represente los objetos del mundo real, los vinculos semanticos entre ellos y las descripciones de ambos

#### entre las metodologias mas difundidas
- modelo de entidades y relaciones extendido - MERExt
- UML
- object-role modeling
- etc.

### modelo de entidades y relaciones
> "el MER puede ser usado como una base para una vista unificada de los datos", adoptando "el enfoque mas natural del mundo real que consiste en entidades e interrelaciones (relaciones)". P.Chen

otros autores lo han extendido dando lugar a una familia de modelo de datos (MER Extendido - MERExt)

### Conceptos Basicos
el modelo (MER) tal como fue propuesto por Chen, distinguia 3 elementos estaticos:
- ### entidades:
	- objeto real o abstracto que existe en la realidad y acerca del cual se desea almacenar informacion
- ## atributos
	- caracteristicas de las entidades o de las relaciones, que proveen detalles descriptivos acerca de ellas
- ## relaciones
	- (o interrelacion) asociacion o vinculacion entre entidades

## representacion de elementos basicos
diagrama de entidades y relaciones (extendido) DERExt

Entidades:
![[Pasted image 20250515171839.png]]

Atributos:
![[Pasted image 20250515171857.png]]

Relaciones entre entidades o entre entidades y relaciones:
![[Pasted image 20250515171918.png]]


### conjunto entidad
abstrayendo las caracteristicas comunes de un conjunto de entidades se obtiene:

**conjunto entidad o** entidad para algunos autores
- representa el tipo de entidades o la estructua generica que describe un conjunto de ejemplares, tuplas o su instacion en un determinado momento
- se lo identifica con un **nombre** (en singular por lo general) que caracteriza el conjunto entiedad (aunque generalmente es mencionado simplemente como entidad)

por ejemplo hablamos de los constructores de las diapositivas anteriores
todas las entidades de un conjunto tienen el mismo conjunto de atributos que interesa modelar. Todos los ejemplares de CONSTRUCTOR, tendran tipo y nro de documento, nombre, apellido

cada conjunto entidad necesita un **identificador principal:** atributo o conjunto de ellos que permite identificar a cada una de las tuplas(ejemplares) que componen el conjunto entidad

Esta formado por instancias, que son entidades, cada uno representa simbolicamente a un objeto del mundo real, distinguible entre otros.
Se describe por medio de sus propios atributos
los objetos individuales son tupla o ejemplares de la entidad

(conjunto) Entidad
![[Pasted image 20250515172446.png]]

## Identificacion de entidades
- uno de los problemas que exitiran en el design del MERExt es la decision de si un determinado objeto o concepto se modela como una entidad o no
- por ej, el color podria se habitualmente una propiedad de una entidad (como es el caso del color de un auto) pero en una fabrica de pinturas probablemente seria apropiado modelar el color como una entidad con sus propias propiedades o caracteristicas

las 3 propiedades inherentes de las entidades:
1. tiene sentido que exista (existencia propia), esto siempre evaluado en el contexto de un sistema destinado a manejar informacion
2. cada ejemplar de un tipo de entidad debe poder distinguirse de los demas
3. todos los ejemplares de un tipo de entidad deben tener las mismas propiedades

pero... la 2da propiedad supone la obligacion de un identificador que permita distinguir los distintos ejemplares de un tipo de entidad, lo que tampoco es universalmente aceptado (ni por alguno autores, ni por los modelos, ni por los productos) como hacemos cuando existen ejemplares 'iguales'?

la 3ra propiedad es relativa: exactamente las mismas? las mismas entre las que nos interesan? como determinar el conjutno de propiedades?

respuestas: experiencia en el design, astucia en la definicion de identificadores, y otras destrezas..

## Atributos
- los atributos son caracteristicas que describen las entidades y las relaciones
- cada atributo tiene asociado un **dominio de definicion** (entero, cadena de caracteres, fechas, etc) y puede tomar un cierto valor dentro del dominio
- se dibujan junto a la entidad que describen

para definir un atributo es necesario tener en en cuenta sus particuaridades en el contexto de la entidad o relacion. Se debe interpretar su rol, cardinalidad, presencia, composicion y origen

para representar estas caracteristicas se utilizan los siguientes simbolos:
![[Pasted image 20250516172808.png]]
#### **rol**:
de acuerdo al rol o papel que juega dentro de la entidad, es la tercer parte del dibujo del atributo

- dentro de los atributos de una entidad siempre va a existir uno o varios atributos que identifican univocamente a cada uno de los ejemplares de la misma
- cada uno de estos conjuntos de atributos se denominan **identificadores candidatos(IC)**
- cada uno de los IC deben cumplir la condicion de ser minimo y univoco
- dentro de los IC de una entidad se selecciona uno como **principal** y el resto como **alternativos**

**identificador**: identifica univocamente cada uno de los ejemplares de la entidad
**identificador alternativo:** es otro identificador de la entidad que puede cumplir el rol de identificador principal
**descriptor:** es un atributo que representa una caracteristica de la entidad
![[Pasted image 20250516173253.png]]

#### **presencia**:
indica si:
- siempre se encontrara un valor para ese atributo (obligatorio)
- habra casos en los que este ausente (opcional)
![[Pasted image 20250516173643.png]]

##### si combinamos el *rol y la presencia* podemos tener:
**descriptor obligatorio:** representa una caracteristica de la entidad que siempre contara con un valor
**descriptor opcional**: representa una caracteristica de la entidad, pero no puede haber ejemplares que no cuenten con un valor
**unico opcional:** los valores no pueden repetirse en distintos ejemplares de la entidad, pero pueden existir ejemplares para los que no se cuente con un valor
![[Pasted image 20250516173926.png]]

#### Cardinalidad:
indica cuantos valores diferentes de un mismo atributo pueden encontrarse para una tupa o ejemplar en una entidad o relacion, puede ser:
- univaluado: un solo valor para una misma tupla o ejemplar (ej. edad)
- multivaluado: si puede haber un conjunto de valores para una misma tupla o ejemplar (ej. telefonos, puede tener varios numeros)
![[Pasted image 20250516174124.png]]


#### Composicion:
indica si el atributo es:
- simple (ej. nombre, nro dni, etc.)
- compuesto: pueden ser divididos en pequenas partes, las cuales representan atributos basicos con existencia independiente (ej. **direccion:** calle, numero, piso, dpto.)
![[Pasted image 20250516174253.png]]

#### origen
indica la procedencia del atributo, puede ser:
- **nativo**: si pertenece a la descripcion de la entidad o relacion
- **derivado**: si su valor se obtiene mediante calculo o algoritmo a partir de otros atributos (por ej, edad obtenido a partir de fecha de nacimiento y fecha actual) 

## reglas de conformacion de atributos (RCA)
es necesario establecer ciertas Reglas de Conformacion de Atributos que respete las restricciones estructurales inherentes del MERExt
- RCA_1: la composicion de los atributos que cumplen el rol de identificadores principales o alternativos puede ser simple o compuesta
- RCA_2: el identificador principal debe ser de presencia obligatoria
- RCA_3: un atributo descriptor puede tener cualquier composicion, cardinalidad, origen (nativo o derivado) y presencia
- RCA_4: un atributo compuesto cumpliendo el rol descriptor, puede tener atributos de cualquier composicion, cardinalidad y presencia
- RCA_5: un atributo multivaluado (cumpliendo obviamente el rol de descriptor) puede tener cualquier composicion, cardinalidad y presencia, aunque un atributo multivaluado cuyas instancias son atributos representa simplemente un atributo multivaluado

- todas las tuplas o ejemplares de un entidad se describen mediante el *mismo* conjunto de atributos (3a. propiedad de entidades)
- (casi) siempre hay un atributo cuyo valor es distinto para cada tupla o ejemplar de una entidad, **atributo identificador** principal (ej.numero de libreta de un alumno)
- algunas entidades pueden tener mas de un atributo identificador, **identificadores alternativos** (ej. documento del alumno)(2da. propiedad de Entidades)

![[Pasted image 20250516175411.png]]
- cada conjunto de entidad debe tener al menos un identificador principal
- ese identificador principal podrian ser un atributo compuesto
- podria ser un atributo multivaluado?
- podria ser un atributo opcional?

# consejos
- las principales ventajas de los modelos ER son que es facil de aprender, facil de usar y muy facil de transformar a especificaciones traducibles a lenguajes de programacion
- **primero** identifique las entidades, si le es posible identifique al menos los atriutos identificadores de las entidades. Luego las relaciones, y finalmente, los atributos de las entidades
- **siempre que sea posible** identificar las relaciones binarias primero. Utilice las relaciones ternarias solo como ultimo recurso
- hay diferentes notaciones de modelo ER, pero todas som muy similares. Para las practicas **seleccione la que utiliza la catedra**, comprenda su semantica y utilicela con todo su potencial. Recuerde que la notacion ER es la principal herramienta de comunicacion de los conceptos de datos con su cliente/profesor/ayudante

	tenga en cuenta que: los enunciado describen casos mas o menos reales y el grado de detalle en las especificaciones puede variar mucho de un problema a otro, para ello podra completarlos con aquellas consideraciones que crea oportunas con el fin de definir mejor el problema, acotar el (UdeD) o ajustarse mejor a una realidad conocida, si las contrasta con la catedra **anotarlas**, no olvidarselas porque pertenecen a la *definicion de su problema*

## restricciones de integridad
- no todos los valores, cambios de valores o estructuras estan permitidas en el mundo real
- estas limitaciones que vienen impuestas por el mundo real y que su gran mayoria pueden plasmarse en el modelo de datos
- dichas limitaciones se las denomina restricciones:
	- restricciones inherentes (del modelo)
	- restricciones de integridad semantica
		- reconocidas por el modelo
		- ajenas al modelo

