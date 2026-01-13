problema: contamos con mucha info y en diferentes tipos de almacenamiento


### Base de datos
representa algun aspecto del mundo real, denominado mini-mundo o **universo de discurso** (UdeD)-> si cambia la definicion del UdeD, entonces la BD tambien debe cambiar

es una coleccion de datos logicamente coherente que tienen un significado inherente -> no es correcto denominar BD a un conjunto cualquiera de datos

se disena, construye y completa con datos para un proposito especifico -> hay un grupo de usuarios que estan interesados en esos datos

### su evolucion
durante las ultimas 4 decadas del siglo XX, el uso de las bases de datos crecio en todas las empresas.
pasamos de interactuar indirectamente con las bases de datos a traves de los informes impresos (p.ej: extractos de tarjeta de credito, saldos en las cajas de los bandos o los agentes de reservas de las lineas aereas)
a interactuar directamente con las bases de datos a traves de **cajeros automaticos, celulares, app on-line y muchisimos mas**

con la revolucion de internet a fines de 1990 las organizaciones convirtieron sus procesos permitiendo realizar operaciones por medio de la web, asi hoy es posible:
- accesder al sitio web de un banco y consultar el estado de cuenta y los movimientos
- realizar gestiones del stock de una empresa
- registrar
**en alguno de estos casos se esta accediendo a datos almacenados en una base de datos**

Se sigue evolucionando y para poder atacar algunas falencias/limitaciones de las BD relaciones como son:
- rendimiento
- disponibilidad
- escalabilidad

**aparecen las BD noSQL (not only SQL)**


## BD relacionales
es repositorio en la cual se pueden almacenar datos de manera estructurada, con la menor redundancia posible
Diferentes programas y diferentes usuarios deben poder utilizar estos datos. Por lo tanto, el concepto de base de datos generalmente esta relacionado con el de red


## administracion de BD
#### funciones del DBMS relacional
**construir una BD:** consiste en el proceso de almacenar los datos en algun medio de almacenamiento controlado por el DBMS
**administrar una BD:** brindar la posibilidad de consultar datos especificos y actualizar datos para reflejar cambios producidos en el mundo real
**compartir datos:** permitir que varios usuarios y programas accedan a la BD de forma simultanea
**manejo de transacciones:** administrar la concurrencia en las lecturas y escrituras de los mismos items(registros) de datos

Rapidamente surgio la necesidad de contar con un sistema de administracion para controlar tanto los datos como los accesos de los usuarios
==la administracion de BD se realiza con un SISTEMA DE GESTION DE BASES DE DATOS (SGBD) tambien llamado DBMS(DATABASE MANAGEMENT SYSTEM)==

el **DBMS** es un conjunto de servicios (aplicaciones de software) que permite a los distintos usuarios un facil acceso a la info y proporciona las herramientas para la manipulacion de los datos que se encuentran en la base (insertar, eliminar, editar)

## administracion de bases de datos relacionales
un DBMS presenta las siguientes caracteristicas:
- **INDEPENDENCIA:** los datos se organizan independientemente de las aplicaciones que los vayan a usar (independencia logica) y de los ficheros en los que vayan a almacenarse (independencia fisica)
- los usuarios y las aplicaciones pueden acceder a los datos mediante el uso de **lenguajes de consulta** (p.ej : SQL)
- **CENTRALIZACION:** los datos se gestionan de forma centralizada e independiente de las aplicaciones
funciones:
- **PROTEGER:** incluye la proteccion del sistema contra el funcionamiento defectuoso del hardware o el software (caidas) y la proteccion de la seguridad contra el acceso no autorizado o malintencionado
- **MANTENER:** una gran BD puede tener un ciclo de vida de muchos anos, por lo que el DBMS debe ser capaz de mantener el sistema permitiendo que evolucione segun cambian los requisitos con el tiempo
- **ADMINISTRAR LOS METADATOS:** los metadatos son datos que describen otros datos, es decir que la BD tambien guarda la definicion o info descriptiva de los datos que almacena; esta relacionada con su estructura y los datos que contiene

# arquitectura de un BDMS
![[Pasted image 20250321152958.png]]