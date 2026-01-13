## captura de requerimientos
- la especificacion de los requerimientos debe ser ==clara, sin abiguedades, en forma consistente y compacta==
- un requerimiento es una condicion o capacidad que debe cumplir el sistema que se desarrollara y que proviene directamente de los usuarios finales
- un requerimiento es una condicion o necesidad de un usuario para resolver un problema o alcanzar un objetivo
- de la ==definicion, seleccion e implementacion== de los requerimientos depende el exito del proyecto
- los requerimientos son importantes porque permiten:
	- llegar a un acuerdo entre el cliente y los usuarios de los que el sistema deberia hacer pero no como lo hara
	- ayudar al equipo de desarrollo a comprender lo que el sistema deberia hacer
	- delimitar el producto de software a construir
	- servir de base para la planificacion de la iteraciones de un proyecto
	- definir la interfaz de usuario del sistema

![[Pasted image 20240912170133.png]]

## requerimientos funcionales
- relacionados con la descripcion del comportamiento funcional del producto deseado
- la funcionalidad es especificada en terminos de entradas, procesos y salidas
- una vista dinamica prodria considerar aspectos como el control, el tiempo de las funciones (de comienzo a fin) y su comportamiento en situaciones excepcionales

## requerimientos no funcionales
- juegan un papel crucial en el diseño y desarrollo del sistema de informacion
- pueden definirse como consideraciones o restricciones asociadas a un servicio del sistema
- suelen llamarse tambiar ==requerimientos de calidad== o ==no comportamentales== en contraste con los comportamentales
- pueden ser tan criticos como los funcionales

# captura de requerimientos: problemas
- dificultad en el seguimiento de los cambios en los requerimientos
- dificultad en la especificacion de los requerimienots
- errores en la deteccion de las caracteristicas esperadas para el software
- mala organizacion
- los requerimientos no son siempre obvios y provienen en fuentes diferentes
- los requerimientos no son siempre faciles de expresar de manera clara mediante palabras
- existen diferentes tipo de requerimientos a diferentes niveles de detalle
- el numero de requerimientos puede volverse inmanejable si no se controla
- existen varias partes interesadas y responsables, lo que significa que los requerimientos necesitan ser gestionados por grupos de personas de funciones cruzadas
- los requerimientos cambian ya sea durante el desarrollo del proyecto como una vez que el sistema ya esta funcionando

# captura de requerimientos: tecnicas de especificacion
- casos de uso(UML)
- historias de usuario (metodos agiles)

### probar el software (testing)
- pertenece a una actividad denominada verificacion y validacion V&V
- V&V son las actividades que aseguran que el software respeta su especificacion y satisface las necesidades de los clientes
- ==validacion==: estamos construyendo el producto correcto?
- ==verificacion==: estamos construyendo el producto correctamente?
- la verificacion consiste en corroborar que el programa respeta su especificacion; y validacion significa corroborar que el programa satisface las espectativas del usuario
- segun Dijkstra: "si uno de los casos de prueba detecta un error el programa es incorrecto, pero si ninguno de los casos de prueba encuentra un error no podemos decir que el programa es correcto"
- proceso **destructivo** de tratar de encontrar defectos en el codigo
- se debe ir con una actitud negativa para demostrar que algo es incorrecto
- el desarrollo exitoso del testing es cuando se encuentran errores NO cuando no se encuentran

## desarrollo de software: Las 4 P
el software como producto se desarrolla en forma gradual, cada version es unica y se obtiene como resultado de la ejecucion de un proyecto
![[Pasted image 20240912171254.png]]
### personal
quien hace que? el factor humano es fundamental para el exito del proyecto. las personas son los principales autores de un proyecto de software
las personas asumen diferentes roles, conformando el ==equipo de desarrollo==
- analista de sistemas
- diseñadores
- programadores
- arquitectos
- analistas de pruebas
- lideres de proyectos
- revisores tecnicos

factores para conformar el equipo de desarrollo:
- experiencia en el dominio de la aplicacion
- experiencia en la plataforma y el lenguaje de programacion
- habilidad para resolver problemas
- habilidad de comunicacion
- adaptabilidad
- actitud
- personalidad

### proyecto
una ejecucion unica. es un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado unico, en este caso un producto de software.

integra personas, utiliza proceso y herramientas para obtener como resultado un producto de software

al principio se debe adaptar el proceso y el ciclo de vida al proyecto
un proyecto tiene las siguientes caracteristicas:
- ==temporal:== posee fecha de comienzo y finalizacion
- ==productos, servicios o resultados unicos:== los resultados que se obtienen por similares que sean dos proyectos, tienen caracteristicas que los hacen unicos
- ==orientado a objetivos==: los objetivos deben ser claros, cuando todos comprenden lo que hay que lograr; y alcanzables cuando es factible de hacerse
- ==elaboracion gradual==: desarrollo en pasos que aumenta mediante incrementos

### producto
el resultado. es el conjunto de artefactos o componentes aue se obtienen como salida de cada una de las actividades definidas en un proceso, que se ejecutan en un proyecto

se obtiene como consecuencia de una evolucion y refinamiento continuo de los modelos

el ***producto es mas que codigo***, el producto que se obtiene es un sistema de software

un ***artefacto/diagrama/modelo*** se refiere a cualquier documentacion creada, producida, cambiada o utilizada por las personas en el desarrollo del sistema

un ***sistema de software*** es la sumatoria de todos los artefactos que se necesitan para representarlo en una forma comprensible para las maquinas, los trabajadores y los interesados

### proceso
como se hacen las cosas? un proceso de soft define un conjunto completo de actividades necesarias para transformar los requerimientos de un usuario en un producto

proporciona un marco de trabajo, una estructura que puede tomarse como referencia para definir el plan que guiara el proyecto

contiene ademas de la definicion de las actividades, procedimientos y metodos, la identificacion de las herramientas que permitan la automatizacion de las actividades y facilite el trabajo

el proceso contiene actividades relacionadas con las disciplinas tecnicas, de gestion y de soporte o protectoras

el *ciclo de vida del proceso de desarrollo de software* indica las fases/etapas del proceso y el orden en el que se llevaran a cabo

## ciclo de vida de un sistema
- para el diseño y desarrollo de un producto de software se aplican metodologias, modelos y tecnicas que permiten resolver problemas
- se han definido varias metodologias de desarrollo que ayudan a desarrollar software de calidad
- *de acuerdo a las caracteristicas del producto a desarrollar sera el ciclo de vida que se debe utilizar*

## modelos de ciclo de vida
un modelo de proceso o ciclo de vida, es una representacion abstracta de un proceso
- cada modelo representa un proceso desde una perspectiva particular y asi proporciona informacion parcial sobre el proceso
- cada modelo de ciclo de vida ayuda al desarrollador a ordenar el trabajo a ser realizado durante la construccion del producto
- cada modelo de ciclo de vida indica en que orden se desarrollaran las etapas del ciclo de vida
#### existen varios ciclos de vida
- secuencial
- iterativo/incremental
- etc.

# tipos de ciclos de vida
### 100% secuencial:
requerimientos -> arquitectura -> desarrollo -> test
### 100% iterativo:
requerimientos, arquitectura, desarrollo, test -> requerimientos, arquitectura, desarrollo, test -> ...

## en cascada (waterfall method)
- considera que las actividades (o etapas) del proceso de desarrollo: requerimientos, analisis, diseño, implementacion y prueba, son etapas separadas que para continuar con la siguiente se debe completar totalmente la anterior
- la ==retroalimentacion con el cliente se realiza una vez que el producto ha sido terminado==
- es muy costoso volver a las etapas anteriores para realizar modificacion por un malentendido en los requerimientos


## ciclo de vida incremental
- el software se desarrolla gradualmente, por funcionalidades que incrementan el producto
- luego de cada ciclo es posible realizar una entrega de software parcial al cliente
![[Pasted image 20240913165901.png]]


## ciclo de vida iterativo
- el problema es dividido en subproblemas mas pequeños
- una iteracion es la aplicacion de un pequeño ciclo de vida en cascada a un subproblema identificado
- el objetivo es tener en claro la problematica que se esta intentando resolv
![[Pasted image 20240913170046.png]]

## ciclo de vida iterativo e incremental
- el software se desarrolla gradualmente, por funcionalidades que incrementan el producto
- se aplican pequeños ciclos de vida en cascada (iteraciones)
- luego de cada ciclo es posible realizar una entrega de software parcial al cliente
 ![[Pasted image 20240913170238.png]]


### metodologia de desarrollo de software
- una metodologia define una forma disciplinada de desarrollar software con el objetivo de hacerlo mas predecible y eficiente
- una metodologia describe el ciclo de vida a utilizar, es decir como las etapas del ciclo de vida se desarrollaran y los artefactos a generar durante el desarrollo del producto
- de acuerdo a las caracteristicas del producto se definira la metodologia de desarrollo de software a utilizar. **existen varios tipos de metodologias**:
	- ==orientado a datos o funcion:== sistemas de informacion clasicos
	- ==orientado a objetos:== encapsula datos y funciones en el mismo lugar
	- ==metodos agiles==: requerimientos cambiantes
	- ==metodos formales==: validacion de requerimientos formalmente (sistemas donde la vida humana es la entidad principal de proyecto)

#### proceso de desarrollo de software
- define la metodologia de desarrollo de software a utilizar y los roles necesarios para el desarrollo.
- una *metodologia de desarrollo* de software define el ciclo de vida que se utilizara y los artefactos que se deben generar en cada una de las etapas del ciclo de vida.
- el **ciclo de vida** de un sistema define el orden en el cual las etapas del ciclo de vida se desarrollaran
- las etapas del ciclo de vida definen las actividades necesarias para desarrollar un sistema