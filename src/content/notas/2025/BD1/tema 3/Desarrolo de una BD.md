## ciclo de vida de una BD
- la creacion de una BD, generalmente es una operacion dificil, larga y costosa que no puede improvisarse
- las decisiones relativas a todo el proceso de creacion de creacion de una BD no involucran solo a los informaticos sino a varios sectores de la empresa
- es necesario que las organizaciones tengan un *plan de trabajo* detallado para la **concepcion** de la BD
- comienza la etapa de **diseno logico y fisico** de la BD para continuar luego con la **carga y optimizacion** de la misma

## metodologia
vamos a seguir una metodologia para el desarrollo de una BD relacional
transformaremos nuestro DERExt en 2 pasos
- primer paso: transformacion a un **modelo logico relacional**
- segundo paso: transformacion del modelo logico relacional al **modelo fisico de la BD** (tablas, restricciones, etc)
para esta ultima transformacion utilizamos un lenguaje especifico de los BDMS, denominado **SQL**

# diseno de bases de datos
- en contextos de desarrollo de proyectos es deseable utilizar herramientas computacionales para facilitar el diseno de BD y construir modelos de datos
- generalmente usan un **modelo binario** -> lograr transformacion sin perdida de semantica
- a partir del modelo -> obtener el **esquema de base de datos**
![[Pasted image 20250527164210.png]]

## etapas en el diseno de BD
![[Pasted image 20250527164750.png]]

## esquemas de base de datos
- una base de datos relacional consiste en un **conjunto de tablas**, a cada una de las cuales se le asigna un nombre exclusivo dentro del **esquema de cada usuario**
- el conjunto de objetos (tablas, vistas, procedimientos), conforman el esquema de un usuario
- cada **fila** de la tabla representa una relacion entre un conjunto de valores. Dado que cada tabla es un conjunto de dichas relaciones, hay una fuerte correspondencia entre *el concepto de tabla y el concepto matematico de relacion*, del que toma su nombre el modelo de datos relacional
- cada tabla posee un conjunto de *columnas cabeceras* (**atributos**) cuyo nombre debe ser unico dentro de la tabla
- para cada atributo hay un conjunto de valores permitidos, llamado **dominio** de ese atributo
- las columnas **pueden ser de distintos tipos:** numericos (estatura, cantidad de hijos), alfanumericos (nombre, direccion), fechas (fecha de nacimiento, fecha de ingreso a la compania), booleano (posee auto propio, termino el secundario)
- todos los datos registrados **en una columna deben ser del mismo tipo**
	![[Pasted image 20250527165138.png]]

#### ejemplo
![[Pasted image 20250527165237.png]]

## restricciones de dominio
**dominio** es una expresion de los valores permitidos para una columna en una tabla
cuando se define una tabla, se asigna a cada columna un **tipo de dato** (por ej, caracter o numero entero) que proporciona un dominio amplio. Adicionalmente ==se puede definir un conjunto valido de valores (ej numeros enteros de 0 y 10 para una nota==
un DBMS no almacenara datos que violen esa restriccion adicional


### tipos de datos
def. de datos en PostgreSQL
[https://www.postgresql.org/docs/15/ddl.html](https://www.postgresql.org/docs/11/ddl.html)

tipos de datos PostgreSQL
[https://www.postgresql.org/docs/15/datatype.html](https://www.postgresql.org/docs/11/datatype.html)

tipos de datos compuestos
**[https://www.postgresql.org/docs/15/rowtypes.html](https://www.postgresql.org/docs/11/rowtypes.html)**

### dependencia funcional
un atributo Y de una relacion **depende funcionalmente** de otro atributo (o conjunto de ellos) X de la relacion si a todo valor (o conjunto de valores) de X le corresponde siempre el mismo valor de Y

X->Y
determinante -> determinado
![[Pasted image 20250527165616.png]]

### restricciones de nulidad
el **valor nulo** se utiliza para representar un estado **desconocido**. Todos los tipos de datos dan soporte a la presencia de valores nulos.
una **restriccion de nulidad** impiden que se entren valores nulos en una columna (*siempre* se debe proporcionar un valor)
se utiliza **NOT NULL** para asegurarse que a una columna determinada de una tabla no se le asigne nunca el valor nulo, entonces cualquier operacion de insercion o actualizacoin que intente colocar un valor nulo en esa columna fallara

# SQL
structured query language
**lenguaje para la definicion y manipulacion de datos**
- desarrolado inicialmente en laboratorio s de investigacion de IBM
- estandar desde 1986 - numerosas revisiones (SQL: 1999 incorporo caracteristiacas relevantes: triggers y OO - otras versiones incorporaron nuevas caracteristicas)

es declarativo: se indica *que datos* se requieren, sin especificar como
- *lenguaje de definicion de datos (DDL)*: permite crear y modificar el esquema de la base, tablas, restriccoines, vistas, etc
- *lenguaje de manejo de datos(DML)*: permite consultar (seleccion) y actualizar datos (insercion, modificacion, eliminacion)

###### otras posibilidades:
- SQL Procedural: lenguaje de programacion para escribir PSM (persistent stored modules): triggers, funciones y stored procedures
- SQL empotrado: manipulacion de datos empotrada desde un lenguaje anfitrion
- lenguajes de 4ta generacion (4GL): generadores de formulation, informes, graficos

## tablas en SQL
- en SQL no existe un orden para las filas de una tabla. Cuando se lee una tabla, las filas apareceran en un orden aletorio, a menos que se especifique uno
- las columnas contienen la informacion de los campos de la tabla: nombre, tipo de dato y restricciones asociadas a la columna
- las filas contiene los regiestros o instancias


### como transformar DERExt a tablas
![[Pasted image 20250527170714.png]]


### repaso: reglas de transformacion de entidades
las reglas de transformacion del DERExt al esquema relacional de bases de datos para entidades son las siguientes:
- se crea una **tabla por cada entidad**, con el mismo nombre de la entidad
- el **identificador de la entidad** se tranforma en la **clave primaria** de dicha tabla
- todo **atributo simplemente valuado** de la entidad se transforma en un atributo de dicha tabla
- los **atributos obligatorios** llevan una leyenda de NOT NULL

- los **atributos compuestos** se despliegan es sus partes componentes, como si fueran univaluados o se crea un tipo compuesto (create TYPE en SQL)
- los **atributos obligatorios** se indican con la leyenda NOT NULL (en vertabelo la N significa NULL)
- los **atributos multivaluados** se proyectan en otra tabla conjuntamente con la clave de la entidad o de la (inter)relacion

### algunos tips
- podemos utilizar la sentencia CREATE TYPE para mantener el nombre del tipo compuesto
- esta opcion no esta implementada en vartabelo, hay que hacerlo de forma manual
- como lo hacemos?
- nombres de tablas y columna (remendable NO usar camelcase). Podemos tener problemas a la hora de usar las tablas... mejor usar guion bajo _

## notaciones en herramientas CASE
como son las notaciones entre las relaciones en las herramientas CASE (computer aided software engineering)?
algunas notaciones:
- IDEF1X![[Pasted image 20250527172637.png]]
- UML ![[Pasted image 20250527172650.png]]
- Barker![[Pasted image 20250527172704.png]]

notacion crow's foot o pata de fallo o tambien conocida como notacion IE
![[Pasted image 20250527172944.png]]

### derivacion de entidades
![[Pasted image 20250527173031.png]]
![[Pasted image 20250527173133.png]]

## creacion de tablas
- cada columna debe tener un determinado tipo de dato
- el tipo de dato limita el conjunto de valores posibles que se pueden asignar a una columna
![[Pasted image 20250527174614.png]]
![[Pasted image 20250527174658.png]]

### derivacion de relaciones binarias 1:N
los atributos identificadores de la entidad (clave de la relacion) del 'lado 1', se agregan como atributos en la tabla correspondiente a la _entidad del 'lado n'_ -> constituyen una **clave extranjera**
![[Pasted image 20250527174837.png]]
![[Pasted image 20250527174847.png]]

### derivacion de relacion unarias 1:N (o N:1)
![[Pasted image 20250527174945.png]]

### derivacion de relaciones unarias y binarias N:N
- se crea una **nueva tabla**, cuya clave es la yuxtaposicion de los identificadores (claves) de cada una de las entidades principales
- nombre de tabla: nombre indicado en el rombo o puede renombrarse
- cada una de las tablas, por separado es una clave extranjera referida a la tabla (entidad) de la cual proviene

### derivacion de atributos en relaciones
- los atributos de una relacion del DERExt pueden ser del mismo tipo que los de una entidad
- si la relacion que describen es designativa (1:N) entonces se incluyen en la tabla del lado N, derivandolos en forma analoga a los de las entidades
- si la relacion es asociativa (binaria N:N o ternaria), se derivan en la tabla producto de la relacion, tambien de forma analoga a los de las entidades

### derivacion de relaciones binarias N:N
![[Pasted image 20250527180038.png]]

## creacion de tablas
![[Pasted image 20250527180305.png]]
![[Pasted image 20250527180336.png]]

### derivacion de relaciones binarias 1:1
![[Pasted image 20250527180449.png]]
![[Pasted image 20250527180530.png]]

### relaciones ternarias N:N:N
como fue mencionado en la lectura de *cardinalidades*
cardinalidad N:N:N

- un profesor, para cada materia puede utilizar **muchos** libros
- un profesor, puede utilizar cada libro para **muchas** materias
- un libro, en un materia puede ser utilizado por **muchos** profesores
![[Pasted image 20250527195252.png]]

## derivacion de relaciones ternarias (N:N:N)
![[Pasted image 20250527195311.png]]

## derivacion de relaciones ternarias (N:1:1)
![[Pasted image 20250527195341.png]]

## derivacion de relaciones ternarias (1:1:1)
![[Pasted image 20250527195359.png]]

### derivacion de jerarquias
- se crea una tabla por la **entidad supertipo** (con los atributos en comun incluido su identificador) y una tabla por cada una de las **entidades subtipo** (con los atributos propios)
- la **clave de la tabla subtipo** es la clave de la tabla del **supertipo**
- para las jerarquias exclusivas, que deben incluir el **atributo discriminante** (tipo), este se debe agregar a la tabla correspondiente a la entidad supertipo
![[Pasted image 20250527195841.png]]

## derivacion de entidades debiles
entidades debiles: **tienen dependencia de existencia y de identificacion**
su clave se forma con el identificador propio (clave parcial) mas el identificador (clave) de la entidad fuerte
![[Pasted image 20250528001700.png]]

## derivacion de agregaciones
![[Pasted image 20250528001717.png]]

## sintaxis para las sentencias SQL
- {alternativas}, entre llaves se colocaran los terminos **que pueden repetirse**, es decir darse una o mas veces en la misma sentencia
- [opcional], entre corchetes se colocaran las palabras que son **opcionales** en la sentencia, es decir que pueden colocarse o pueden obviarse

## SQL - DDL
por ej algunas sentencias SQL para la definicion de datos (DDL - data definition language)

CREATE TABLE <nom_tabla> (...); -> creacion de una tabla
ALTER TABLE <nom_tabla> ...; -> modificacion de una tabla
DROP TABLE <nom_tabla> ; -> eliminacion de una tabla

## SQL - DML
por ej algunas sentencias para el manejo de datos (DML - data manipulation language)

INSERT INTO <nom_tabla> (...) VALUES (...); -> insercion de registros
UPDATE <nom_tabla> SET (...) WHERE (...); -> modificacion de registros
DELETE FROM <nom_tabla> WHERE (...); -> borrado de registros
SELECT <lista_atrib> FROM <lista_tablas> WHERE (...) -> consulta de datos

## sentencia create table
CREATE TABLE [IF NOT EXISTS] nombre_tabla(
{nombre_columna tipo_dato [NOT NULL | NULL | DEFAULT default_expr]
[restriccion_de_columna[...],}
{restriccion_de_tabla}
});

IF NOT EXISTS significa SI NO EXISTE por lo tanto, esto es util para validar que la tabla sea creada en caso que no exista, si existe y se ejecutara la sentencia sin el IF NOT EXISTS la sentencia daria error

donde restriccion_de_columna es:
[CONSTRAINT constraint_name]
{UNIQUE index_parameters |
PRIMARY KEY index_parameters |
REFERENCES reftable [(refcolumn)]}s

y restriccion_de_tabla es:
[CONSTRAINT constraint_name]
{UNIQUE (column_name [,...]) |
PRIMARY KEY (column_name [,...]) |
FOREIGN KEY (column_name [,....])
}

# tips
- agregar un prefijo a las tablas que indique a que practico/ejercicio corresponden
	- -> ayuda a mantener ordenadas las resoluciones de los ejercicios
	- -> es probable que haya otra tabla de igual nombre en otro practico
	- por ej: CREATE TABLE TP1_EJ1_ARTICULO...
- dar nombres descriptivos a las restricciones y demas objetos del esquema y prefijarlos para identificarlos facilmente
	- ==clave primaria: PK_
	- ==clave extranjera: FK_
	- ==unique: UQ_

## modificacion de tablas
una vez creada una tabla es posible realizar algunas modificaciones en su definicion (ej, agregar o quitar columnas, especificar valores por defecto, incorporar restricciones o quitarlas, etc). La sintaxis de postgreSQL

ALTER TABLE *tabla* ADD COLUMN *columna tipo* -> agrega columna
ALTER TABLE *tabla* DROP COLUMN *columna* -> borra una columna
ALTER TABLE *tabla* RENAME COLUMN columna_vieja TO columna_nueva -> renombra una columna

ALTER TABLE *tabla columna* TYPE *nuevo_tipo*  -> cambia el tipo de dato
ALTER TABLE *tabla* ALTER COLUMN *columna* [SET DEFAULT *value* | DROP DEFAULT] -> asigna o elimina el valor por defecto
ALTER TABLE *tabla* ALTER COLUMN *columna* [SET NOT NULL | DROP NOT NULL] -> asigna o elimina la restriccion de nulidad
ALTER TABLE *tabla* ADD CONSTRAINT *nombre definicion_de_constraint* -> agrega una restriccion

## modificacion de tablas - ejemplos
ALTER TABLE Alumno
	ADD COLUMN condicion VARCHAR(10) DEFAULT ´Regular´;
		-> incorpora una nueva columna en Alumno con un valor por defecto

ALTER TABLE Instituto
	DROP COLUMN encargado;
		-> elimina la columna encargado de Alumno

ALTER TABLE Curso
	ADD CONSTRAINT U_tit UNIQUE (titulo);
		-> define una restriccion de unicidad para el titulo del curso

ALTER TABLE Ofrece
	DROP CONSTRAINT Fk_Ofrece_Cur;
		-> elimina la restriccion de clave extranjera en Ofrece

ALTER TABLE *Alumno* ALTER COLUMN *condicion*
	SET DEFAULT 'Libre';
		-> define un valor por defecto para una columna

ALTER TABLE *Alumno* ALTER COLUMN *condicion*
	DROP DEFAULT;
		-> elimina la definicion del valor por defecto para una columna

ALTER TABLE Alumno ALTER COLUMN *tutor*
	SET NOT NULL;
		-> define una restriccion de nulidad para la columna (OJO)!!!

ALTER TABLE Alumno ALTER COLUMN *tutor*
	DROP NOT NULL;
		-> elimina una restriccion de nulidad para la columna

ALTER TABLE *Alumno condicion* TYPE VARCHAR(30);


ALTER TABLE Alumno
	ADD CONSTRAINT Pk_Alumno PRIMARY KEY (LIBRETA);
		-> incorpora la restriccion de clave primaria a la tabla Alumno

ALTER TABLE Alumno
	ADD CONSTRAINT Fk_Alumno_Univ FOREIGN KEY (nom_univ)
		REFERENCES Universidad (nom_univ)
		->incorpora la restriccion de clave extranjera a la tabla Alumno que referencia a la tabla Universidad


## borrado de tablas
DROP TABLE nombre_tabla[CASCADE | RESTRICT]
- -> se elimina la definicion de la tabla y todas las filas que contiene 

- si es RESTRICT, se rechaza si hay objetos definidos a partir de la tabla (es la opcion por defecto)
- si es CASCADE, se eliminan *todos* los objetos dependientes de la tabla (tambien los objetos que dependan a su vez de ellos)
	- -> tener precaucion en su uso


# sitio para generar datos aleatoriamente
https://www.mockaroo.com/
