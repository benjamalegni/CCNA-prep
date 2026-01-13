el modelo relacional utiliza una coleccion de **tablas (relaciones)** para representar tanto los datos como las relaciones entre estos datos
las relaciones son estructuras logicas mantenidas por el admin de los datos. Es una combinacion de 3 componentes:
- **estructurales**: define el esquema de los datos como una coleccion de relaciones
- **de integridad**: de los datos se mantiene en el modelo relacional, utilizando claves primarias y extranjeras
- **de manipulacion**: usa las herramientas del algebra relacional y el calculo relacional

![[Pasted image 20250520151354.png]]
## elementos del modelo relacional
*definicion matematica:*
- si A y B son conjuntos de datos, una relacion R puede definirse como: **R⊆ AxB**
	- " R esta incluida o es igual al producto cartesiano de AxB" 
en general -> para un conjunto de dominios (conj. de datos homogeneos) D...**Dn** (no necesariamente distintos), R es un subconjunto del producto cartesiano de los n dominios:
R ⊆ D1 x D2 x ... x Dn (n es el grado de la relación)

#### ejemplo de la relacion MEDICO (grado 5)
MEDICO **⊆** Matricula x NyApell x Especialidad x DNI x ClinicaEjerce

Matricula = {x/x es un entero de 6 digitos}
Nombre = {x/x es una cadena de caracteres alfabeticos de tamano 40}
Especialidad = {Cardiologia, Endocrinologia, Pediatria, Traumatologia, ...}
DNI = {x/x es un entero de 8 digitos >= 1000000}
ClinicaEjerce = {C. Paz, C. Modelo, C. Chacabuco, S. Tandil, Cons. Privado}

==MEDICO== estara dada por cualquier combinacion de instancias de estos 4 dominios.


formalmente un esquema relacional es:
**R ≡ <R, Dep>**

donde: 
**R = {R1, R2, ..., Rm}** es el conjunto de relaciones
Dep es el conjunto de dependencias entre datos (restricciones)
	RD restricciones del dominio
	DF dependencias funcionales
	DI dependencias de inclusion
	RN restricciones de nulidad
==esquema de relacion== se expresa **esq(Ri)** y representa el conjunto de atributos que componen cada Ri.
- **tuplas** se indican mediante **t, t', t''** y **subtupla** de t correspondiente al conjunto de atributos Z se indica mediante t[Z]
- el conjunto de subtuplas correspondientes a Z, en una relacion R se denomina **proyeccion**: **∏subZ (R)**
- cada esquema de relacion esta asociado con un **valor o estado de relacion r sub i**

![[Pasted image 20250520152615.png]]
![[Pasted image 20250520152652.png]]

### dependencias funcionales
- una Dependencia Funcional (DF) es una restriccion sobre el conjunto de tuplas que pueden aparecer en una relacion R
- sea una relacion R y X,Y dos subconjuntos de esq(R). La dependencia funcional
	- X -> Y (X determina Y)
se verifica en R si en *ninguna instancia aceptable* de R pueden existir 2 tuplas t1, t2 tales que:
	t1[X] = t2[X]
	t1[Y] =/= t2[Y]
==es decir que si dos tuplas t1 y t2 tienen valores identicos para los atributos X,  TAMBIEN deben tener valores iguales para los atributos Y==

definicion: la dependencia funcional general
	**R:A1, ..., Am →  B1, ..., Bn**

se satisface en $$
R_i
$$ solo si: 
**∀t, t’ ∈ R, (t.A1=t’.A1 ∧ ... ∧ t.Am= t’.Am ⇒ t.B1=t’.B1 ∧ ... ∧ t.Bm=t’.Bm )**

*Ejemplos*:
MÉDICO: Matricula → NyApell, Especialidad, DNI, ClinicaEjerce 
Equivalente a:

MEDICO: Matricula → NyApell
MEDICO: Matricula → Especialidad 
MEDICO: Matricula → DNI
MEDICO: Matricula → ClinicaEjerce

## claves
- def informal: una **clave** de una relacion R es un conjunto de atributos $$A_1, ..., A_n$$ tal que para cualquier tupla su valor es unico.
- formalmente: una **clave** de una relacion es un conjunto de atributos $$A_1, ..., A_n$$ tal que para cualquier otro atributo B, se satisface:
	$$R(A_1,..., A_n, B)$$
	$$A_1,..., A_n -> B$$
	este ultimo es dependencia funcional
- una clave **minimal** es un conjunto de atributos de R que es clave, y para el cual ningun subconjunto de atributos de R es clave
- habitualmente se las denomina: *superclave y clave (minimal)* respectivamente

#### ej de claves
- en las **relaciones** que representan **entidades** -> su identificador natual (#producto, LU, matricula, DNI, NroPatente, etc)
- en las que representan (inter)**relaciones** -> depende del orden y cardinalidad de la relacion
- la clave se indica subyarando el atributo. (lo highlightee)
		MEDICO = (==Matricula==, NyApell, Especialidad, DNI, ClinicaEjerce)
- si existe otra, se denomina clave alternativa y se indica con subrayado doble. (lo highlightee y puse cursiva)
		MEDICO = (==Matricula==, NyApell, Especialidad, ==*DNI*==, ClinicaEjerce)

### dependencias de inclusion pura
materializan un vinculo esencial entre ejemplares de diferentes relaciones (que representan distintos elementos del MERExt) Pueden ser atributos de una misma relacion

**definicion formal: la dependencia de inclusion (DI)**
R1[Atrib1] ⊆ R2[Atrib2] 
	Siendo Atrib1  Atrib2 listas de atributos
se satisface si y solo si:
	**∏Atrib1 (R1)  ⊆   ∏Atrib2 (R2)**

son restricciones que limitan los posibles valores que pueden tomar ciertos atributos o conjuntos de ellos
restringen los estados validos de los datos. En todo momento, el estado de los datos debe satisfacerlas

### restriccion de integridad referencial
si tenemos una **dependencia de inclusion** entre dos relaciones Ri (izquierda) y Rd (derecha) a traves de los atributos **X e Y: **

Ri [X] ⊆ Rd [Y]
si Y es clave primaria de Rd, tendremos una dependencia de inclusion **basada en clave** y se cumple que:
- X es una **clave extranjera** (foreign key) para Ri (denotaremos claves extranjeras como: **FK**)
- las dependencias de inclusion de este tipo son llamadas ==Restricciones de integridad Referencial (RIR)== y se expresaran
	- $$R_i[FK_i] << R_d[K_d]:(b,md)$$
	**se cambia ⊆ (DI pura)  por << (rir)**

![[Pasted image 20250521143827.png]]

## repaso
en un esquema relacional **R ≡ <R, Dep>**
donde: R={Rsub1, Rsub2, ... , Rsubm} es el conjunto de relaciones
Dep es el conjunto de dependencias entre datos (restricciones)


**RD** restricciones de dominio
	especifica que valores pueden tomar los atributos de las
	tuplas:	
		Matricula: {x/x es un entero de 6 digitos}

**RN** restricciones de nulidad
	especifica que atributos pueden ser nulos
		MEDICO = (==Matricula==, NyApell, Especialidad,==DNI==, ClinicaEjerce,**Especialidad2** -> este ultimo se indica con : **negrita**, * , o aclaracion textual)

**DF** dependencias funcionales: X->Y (X determina Y)

**RIR** restriccion de intergridad referencial: R1[Atrib1] << R2[Atrib2]

# esquema logico
representacion relacional del DERExt

### reglas de transformacion de entidades
**las reglas de transformacion del DERExt al esquema relacional para entidades son las siguientes**
- se crea **una relacion por cada entidad**, con el mismo nombre de la entidad
- el **identificador de la entidad** se transforma en la **clave** de dicha relacion
- todo **atributo simplemente valuado** de la entidad se transforma en un atributo de dicha relacion
- los **atributos compuestos** se despliegan en sus partes componentes, como si fueran univaluados. ==se pierde el nombre==
- los **atributos obligatorios** llevan una leyenda de NO NULO
- los **atributos opcionales** se indican de la misma manera que los obligatorios sin leyenda
- los **atributos multivaluados** se proyectan en otra relacion conjuntamente con la clave de la entidad o de la relacion

con los atributos obligatorios y los atributos opcionales -> se puede hacer a la inversa, indicar solo los posibles nulos

#### derivacion de entidades
![[Pasted image 20250521144926.png]]

atributos multivaluados:
TELEFONO (==LU, telefono==)
MAIL(==LU, mail==)

aspectos a considerar:
como se representaria la **opcionalidad** de telefonos? con la ausencia de tuplas en la relacion TELEFONO para la LU en cuestion
como se representaria la **obligatoriedad** en mails? con una regla extra que indique que 
$$
∏_{LU} (ALUMNO) = ∏_{LU}(MAIL)
$$

![[Pasted image 20250521145247.png]]

### restriccion de integridad referencial (RIR)
la RIR indica que si una relacion Rsub2 tiene una **clave extranjera**(un atributo o conjunto de ellos) que referencia a una **clave primaria** de la relacion Rsub1

**Rsub2(clave extranjera) << Rsub1(clave primaria)**

*todo valor de la clave extranjera o foreign key debe coincidir con un valor de la clave primaria o ser nulo*

Rsub2 se denomina relacion **referenciante**
Rsub1 se denomina relacion **referenciada**

la RIR se completa con la **acciones referenciales**

### derivacion de relaciones binarias 1:N
los atributos identificadores d ela entidad (clave de la relacion) del 'lado 1', se agregan como atributos en la relacion correspondiente a la ==entidad del 'lado N'== -> constituyen una **clave extranjera**
se subrayan con la linea punteada
![[Pasted image 20250521145717.png]]
*formalmente* el esquema relacional se completa indicando las Restricciones de Integridad Referencial (RIR)

**CIUDAD(==IdCiudad==,SedeUnicen)**
**ALUMNO(==LU==, Apellido, Nombre, FechaNac, FechaInscrip, *IdCiudad* (esta punteada))**
	restriccion de integridad referencial
ALUMNO(IdCiudad) << CIUDAD(IdCiudad):(R,C) sería una opción de AR


### relaciones obligatorias y opcionales
![[Pasted image 20250521164251.png]]

### atributos en relaciones binarias N:1
- los atributos de una relacion pueden ser del mismo tipo que los de una entidad
- si la relacion es opcional (0,1) los atributos de la relacion aunque sean obligatorios debieran pasar a ser opcionales para conservar la semantica. Por ej el anio solo es valido si la cerveza pertenece a una marca
![[Pasted image 20250521164808.png]]
![[Pasted image 20250521164813.png]]
si es multivaluado, se deriva como un atributo multivaluado de la entidad principal, la opcionalidad debera quedar expresada como regla del negocio ya que la transformacion no puede preservar la semantica

### derivacion de relaciones: unarias 1:N (o N:1)
![[Pasted image 20250521165618.png]]

### derivacion de relaciones unarias y binarias N:N
- se crea una **nueva relacion** cuya clave es la yuxtaposicion de los identificadores (claves) de cada una de las entidades participantes
- nombre de la relacion: nombre indicado por el rombo
- cada una de las claves, "por separado" es una clave extranjera referida a la relacion (entidad) de la cual proviene

### derivacion de relaciones binarias N:N
![[Pasted image 20250521165753.png]]
... el esquema relacional se completa indicando las restricciones de integridad referencial
![[Pasted image 20250521165839.png]]
Relacion binaria N:N -> 2RIR
![[Pasted image 20250521165917.png]]

### atributos en relaciones binarias N:N
- los atributos se derivan dentro de la nueva relacion
	- ![[Pasted image 20250521171725.png]]
- si es multivaluado, se deriva como tal. -> se pierde la condicion de nulidad

### derivacion de relaciones unarias N:N
![[Pasted image 20250521171828.png]]

### derivacion de relaciones binarias 1:1 -> caso (0,1):(0,1)
los atributos identificadores de la entidad (clave de la relacion) de un lado(uno solo) se agregan como atributos en la relacion correspondiente a la otra entidad -> constituyen una **clave extranjera**
==se subrayan con la linea punteada
![[Pasted image 20250521172010.png]]


### derivacion de relaciones binarias 1:1 -> caso (1,1):(0,1)
los atributos identificadores de la entidad (clave de la relacion) del lado obligatorio (1:1), se agregan como atributos en la relacion correspondiente a la otra entidad -> constituyen una **clave extranjera y una *clave alternativa***
==se subrayan con linea doble y ademas con linea punteada
![[Pasted image 20250521172332.png]]


### derivacion de relaciones binarias 1:1 -> caso (1,1):(1,1)
los atributos identificadores de la entidad (clave de la relacion) del lado obligatorio (1:1), se agregan como atributos en la relacion correspondiente a la otra entidad -> constituyen una **clave extranjera y una *clave alternativa***
![[Pasted image 20250521172507.png]]

### relaciones ternarias
![[Pasted image 20250521172557.png]]
![[Pasted image 20250521172603.png]]
![[Pasted image 20250521172611.png]]
![[Pasted image 20250521172618.png]]
![[Pasted image 20250521172625.png]]
![[Pasted image 20250521172640.png]]

## derivacion de jerarquias
- se crea una relacion por la entidad supertipo (con los atributos en comun) y una relacion por cada una de las entidades subtipo (con los atributos propios)
- la clave de cada una de las entidades subtipo es la misma que para el supertipo
- para las jerarquias exclusivas, que deben incluir el atributo discriminante (tipo), este se debe agregar al esquema de relacion correspondiente a la entidad supertipo

![[Pasted image 20250521172915.png]]

### RIRs en las jerarquias
![[Pasted image 20250521172934.png]]a

### derivacion de entidades debiles
**Entidades Débiles:**  tienen dependencia de existencia y de identificación.
Su clave se forma con el identificador propio (clave parcial) más el identificador (clave) de la entidad fuerte.
![[Pasted image 20250521173047.png]]

### derivacion de agregaciones
![[Pasted image 20250521173105.png]]

#### ejemplo
![[Pasted image 20250521173118.png]]
![[Pasted image 20250521173716.png]]

## diseno logico - REFINAMIENTO
objetivo: obtener un esquema relacional optimizado
procedimiento:
- tomar como punto de partida un **esquema logico (relacional)** obtenido a partir de un esquema conceptual
- registrar todas sus dependencias funcionales
- usarlas para enriquecer y mejorar el diseno

-> normalizacion