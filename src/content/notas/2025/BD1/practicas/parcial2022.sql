--  1. script creacion de tablas
CREATE TABLE ASIGNACION (
    nroUsuario int  NOT NULL,
    zona char(2)  NOT NULL,
    cod_plan int  NOT NULL,
    fecha_desde date  NOT NULL,
    fecha_hasta date  NULL,
    num_dispositivos int  NOT NULL );

CREATE TABLE PLAN (
    cod_plan int  NOT NULL,
    nombre varchar(50)  NOT NULL,
    anio_inicio int  NOT NULL,
    importe int  NOT NULL );

CREATE TABLE PLAN_EMPR (
    cod_plan int  NOT NULL,
    condicion varchar(80)  NOT NULL,
    descuento decimal(5,2)  NOT NULL );

CREATE TABLE PLAN_PART (
    cod_plan int  NOT NULL,
    caracteristica varchar(80)  NOT NULL);

CREATE TABLE USUARIO (
    nroUsuario int  NOT NULL,
    zona char(2)  NOT NULL,
    apell_nombre varchar(50)  NOT NULL,
    ciudad varchar(20)  NOT NULL,
    fecha_nacim date  NOT NULL);

CREATE TABLE ZONA (
    cod_zona char(2)  NOT NULL,
    nombre varchar(30)  NOT NULL);

-- asignacion de primary keys y foreign keys
ALTER TABLE PLAN ADD CONSTRAINT PLAN_pk 
   PRIMARY KEY (cod_plan);

ALTER TABLE PLAN_PROM ADD CONSTRAINT PLAN_EMPR_pk 
   PRIMARY KEY (cod_plan);

ALTER TABLE PLAN_TRAD ADD CONSTRAINT PLAN_PART_pk 
   PRIMARY KEY (cod_plan);

ALTER TABLE USUARIO ADD CONSTRAINT USUARIO_pk 
   PRIMARY KEY (nroUsuario);

ALTER TABLE ZONA ADD CONSTRAINT ZONA_pk 
   PRIMARY KEY (cod_zona);

ALTER TABLE ASIGNACION ADD CONSTRAINT FK_ASIGNACION_US
    FOREIGN KEY (nroUsuario, zona, cod_plan)
    REFERENCES USUARIO (nroUsuario, zona, cod_plan)
    ON UPDATE CASCADE;

ALTER TABLE PLAN_EMPR ADD CONSTRAINT FK_PEMPR_PLAN
    FOREIGN KEY (cod_plan)
    REFERENCES PLAN (cod_plan)
    ON UPDATE CASCADE;

ALTER TABLE PLAN_PART ADD CONSTRAINT FK_PPART_PLAN
    FOREIGN KEY (cod_plan)
    REFERENCES PLAN (cod_plan)
    ON UPDATE CASCADE;

ALTER TABLE USUARIO ADD CONSTRAINT FK_USUARIO_ZONA
    FOREIGN KEY (zona)
    REFERENCES ZONA (cod_zona);


1. a. es erronea la declaracion de PK de usuario: segun el esquema, deberia tener como pks (nroUsuario, zona)
b. falta declarar las PKs para asignacion
c. hay que declarar una clave con nroUsuario, zona y otra clave con cod_plan. cod_plan no es parte de la tabla Usuario

2. listar datos de los usuarios de zona B1 o C1 menosres de 35 anios, con con algun plan para empresas asignado pero ninguno con descuento.

SELECT * FROM usuario u
WHERE zona IN ('B1', 'C1')
AND age (fecha_nacim) < 35
AND NOT EXISTS (SELECT 1 FROM asignacion a
            JOIN plan_empr p ON a.cod_plan = p.cod_plan
            WHERE a.nroUsuario = u.nroUsuario
            AND pe.descuento > 0);

- se ha considerado erroneamente el identificador de usuario, deberia ser (nroUsuario, zona) en lugar de solo nroUsuario
- es incorrecta la verificacion de edad
- no asegura que cada usuario selecionado tenga algun plan de empresas asignado

3. se requiere listar los identificadores de aquellos planes para particulares que hayan sido asignados a todos los usuarios
SELECT cod_plan FROM plan_part p 
WHERE NOT EXISTS ((SELECT nroUsuario, zona
                  FROM usuario u)
                EXCEPT
                  (SELECT nroUsuario, zona
                  FROM asignacion a
                  WHERE a.cod_plan = p.cod_plan));

4. a. DELETE FROM usuario WHERE zona='A2'; -> falla poruqe hay asignaciones (ASIGNACION) que referencian a usuarios afectados por la eliminacion
b. UPDATE asignacion SET nroUsuario=22 WHERE cod_plan=1; -> el usuario que se referencia no existe en la tabla Usuraio, entonces lo se puede proceder
-- falla por incumplir una restriccion de integridad referencial
c. INSERT INTO asignacion VALUES(22, null, 1, ...); -> no se puede poruqe no se puede asignar NULL como parte de la clave, falla sin importar el matching

5. a. 
SELECT p.cod_plan AS PLAN, pp.cod_plan AS PPART, pe.cod_plan AS PEMPR
FROM PLAN p INNER JOIN PLAN_EMPR pe on p.cod_plan = pe.cod_plan
LEFT JOIN PLAN_PART pp on p.cod_plan = pp.cod_plan;

resultado: va a retornar todos los planes de plan y plan_empr que coincidan en codigo + solo los planes part que coincidan con el codigo de estos
si el plan existe en plan_part igual aparece en la fila pero ppart sera null

b. SELECT p.cod_plan AS PLAN, pp.cod_plan AS PPART, pe.cod_plan AS PEMPR
FROM PLAN p INNER JOIN PLAN_EMPR pe on p.cod_plan = pe.cod_plan
INNER JOIN PLAN_PART pp on p.cod_plan = pp.cod_plan;
resultado: retorna todos los planes existentes que sean para particulares y tambien para empresas

c. 
SELECT p.cod_plan AS PLAN, pp.cod_plan AS PPART, pe.cod_plan AS PEMPR
FROM PLAN p RIGHT JOIN PLAN_EMPR pe on p.cod_plan = pe.cod_plan
RIGHT JOIN PLAN_PART pp on p.cod_plan = pp.cod_plan;

resultado: trae todo los planes existentes para particulares sin importar si tal vez son para empresas

d.
SELECT p.cod_plan AS PLAN, pp.cod_plan AS PPART, pe.cod_plan AS PEMPR
FROM PLAN p FULL JOIN PLAN_EMPR pe on p.cod_plan = pe.cod_plan
FULL JOIN PLAN_PART pp on p.cod_plan = pp.cod_plan;

resultado: retorna todos los planes, ya sea particulares y/o para empresas

6. 

En el sistema de gestión de planes de servicios a usuarios se requiere controlar que los usuarios de la
ciudad de Tandil registren no más de 5 asignaciones de planes desde el año 2020 con 3 o más dispositivos.
a) Incorpore el control en SQL estándar mediante el recurso declarativo más restrictivo y utilizando sólo las
tablas/atributos necesarios. Justifique el tipo de restricción usada.

-- se usa asserion cuando se verifica en mas de una table
CREATE ASSERTION chk_asig_usuarios CHECK(
  NOT EXISTS(
    SELECT 1 
    FROM usuario u
    WHERE(u.ciudad='Tandil' AND (u.nroUsuario, u.zona) IN (
        SELECT a.nroUsuario, a.zona
        FROM asignacion a
        WHERE EXTRACT(year from fecha_desde)<=2020 
        AND a.num_dispositivos >= 3
        GROUP BY a.nroUsuario, a.zona
        HAVING COUNT(*) > 5)))
  )
);

b. Determine cuáles de las siguientes opciones son eventos críticos a controlar con una implementación de la
restricción anterior mediante triggers en PostgreSQL. (Nota: las elecciones incorrectas pueden restar puntaje).

a. update de zona en la tabla usuario
b. update de zona en la tabla asignacion => si
c. insert en la tabla plan
d. update de num_dispositivos en la tabla asignacion => si
e. update de nroUsuario en la tabla asignacion => si
f. update fecha_desde en la tabla asignacion => si
g. update de cod_plan en la tabla asignacion
h. update de ciudad en la tabla usuario => si
i. delete en la tabla usuario
j. update de cod_plan en la tabla plan
k. insert en la tabla usuario
l. delete en la tabla asignacion
m. insert en la tabla asignacion 
n. delete en la tabla plan
o. update de nroUsuario en la tabla usuario

c) Justifique cada uno de los eventos seleccionados y escriba en PostgreSQL los encabezados completos de los
triggers requeridos.
CREATE TRIGGER tr_asignacion_tandil
AFTER INSERT OR UPDATE OF num_dispositivos, nroUsuario, fecha_desde, zona ON ASIGNACION
FOR EACH ROW EXECUTE FUNCTION chk_asig_usuarios();

7. CREATE TABLE JUGO (
id INT PRIMARY KEY,
marca VARCHAR(16),
codigo_ean INT );

CREATE TABLE SABOR (
id INT PRIMARY KEY,
marca VARCHAR(16),
sabor VARCHAR(8) NOT NULL );

INSERT INTO JUGO VALUES (1, 'RINDE2', 1151354787), (2, 'TANG', 222353464), (3, 'ADES', NULL), (4, NULL, 542136499);
INSERT INTO SABOR VALUES (1, 'TANG', 'NARANJA'), (2, 'ADES', 'POMELO'), (3, 'BAGGIO', 'NARANJA'), (4, NULL,
'MANZANA');

SELECT marca
FROM JUGO
WHERE marca NOT IN (SELECT marca
FROM SABOR );
Sí, debido a que el valor NULL de la columna marca de la tabla SABOR fuerza a que la comparación dé como
resultado desconocido, entonces no se listará ninguna tupla.

8. a) Liste los datos completos de los países que tienen igual cantidad de ciudades que otro/s país/es (es decir, si
el País A tiene 100 ciudades y el País B tiene 100 ciudades, ambos tienen que estar en el listado).
b) Liste los datos de los Departamentos que tienen trabajando por lo menos al 10 % de los empleados
registrados.
c) Introducir una restricción que permita controlar que ningún empleado tenga un sueldo más alto que el su
jefe.

a. 
SELECT *
FROM pais p
WHERE (
  SELECT COUNT(*) FROM cuidad c1
  WHERE c1.id_pais = p.id_pais
  IN(SELECT COUNT(*) FROM cuidad c2
  WHERE c2.id_pais != p.id_pais
  GROUP BY c2.id_pais))
)


2. 
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-10-28 01:19:24.761

-- tables
-- Table: AREA
CREATE TABLE AREA (
    cod_area char(5)  NOT NULL,
    nom_area varchar(30)  NOT NULL,
    ubicacion varchar(50)  NOT NULL,
    cant_empleados int  NOT NULL,
    responsable varchar(50)  NOT NULL,
    CONSTRAINT AREA_pk PRIMARY KEY (cod_area)
);

-- Table: ETAPA
CREATE TABLE ETAPA (
    id_proy int  NOT NULL,
    cod_area char(5)  NOT NULL,
    id_etapa int  NOT NULL,
    descripcion varchar(200)  NOT NULL,
    fecha_inicio date  NOT NULL,
    fecha_fin date  NULL,
    CONSTRAINT PK_ALQUILER PRIMARY KEY (id_etapa,id_proy,cod_area)
);

-- Table: PROYECTO
CREATE TABLE PROYECTO (
    id_proy int  NOT NULL,
    cod_area char(5)  NOT NULL,
    nombre varchar(50)  NOT NULL,
    presupuesto decimal(10,2)  NOT NULL,
    fecha_inicio date  NOT NULL,
    fecha_fin date  NOT NULL,
    CONSTRAINT PK_CLIENTE PRIMARY KEY (id_proy,cod_area)
);

-- Table: RECURSO
CREATE TABLE RECURSO (
    id_recurso varchar(10)  NOT NULL,
    nombre varchar(40)  NOT NULL,
    desarrollador varchar(50)  NULL,
    recomendacion text  NOT NULL,
    CONSTRAINT PK_ALOJAMIENTO PRIMARY KEY (id_recurso)
);

-- Table: USO_RECURSO
CREATE TABLE USO_RECURSO (
    id_etapa int  NOT NULL,
    id_proy int  NOT NULL,
    cod_area char(5)  NOT NULL,
    id_recurso varchar(10)  NOT NULL,
    observacion varchar(100)  NULL,
    CONSTRAINT PK_ALQUILER_ALOJ PRIMARY KEY (id_etapa,id_proy,cod_area,id_recurso)
);

-- foreign keys
-- Reference: ETAPA_PROYECTO (table: ETAPA)
ALTER TABLE ETAPA ADD CONSTRAINT ETAPA_PROYECTO
    FOREIGN KEY (id_proy, cod_area)
    REFERENCES PROYECTO (id_proy, cod_area) 
    ON UPDATE  CASCADE 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: PROYECTO_AREA (table: PROYECTO)
ALTER TABLE PROYECTO ADD CONSTRAINT PROYECTO_AREA
    FOREIGN KEY (cod_area)
    REFERENCES AREA (cod_area)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: USO_REC_ETAPA (table: USO_RECURSO)
ALTER TABLE USO_RECURSO ADD CONSTRAINT USO_REC_ETAPA
    FOREIGN KEY (id_etapa, id_proy, cod_area)
    REFERENCES ETAPA (id_etapa, id_proy, cod_area) 
    ON UPDATE  CASCADE 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: USO_REC_RECURSO (table: USO_RECURSO)
ALTER TABLE USO_RECURSO ADD CONSTRAINT USO_REC_RECURSO
    FOREIGN KEY (id_recurso)
    REFERENCES RECURSO (id_recurso) 
    ON UPDATE  CASCADE 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.
--
1. Se requiere controlar que en las etapas descriptas como de “analisis…” iniciadas posteriormente al 31/oct/22 no
se utilicen recursos cuyo nombre contenga “vista” sin que se registre una observación.
a) Determine cuáles de las siguientes opciones son eventos críticos a controlar con una implementación de la
restricción anterior mediante triggers en PostgreSQL. (Nota: las elecciones incorrectas pueden restar puntaje).

a. Modificación de id_recurso en uso_recurso => si
b. Inserción en proyecto
c. Modificación de cod_area en uso_recurso => si
d. Modificación de nombre en recurso => si
e. Inserción en recurso 
f. Modificación de descripcion en etapa => si
g. Modificación de id_proy en etapa
h. Eliminación en proyecto
i.Inserción en etapa
j.Modificación de observacion en uso_recurso
k.Modificación de id_etapa en etapa
l.Modificación de id_recurso en recurso
m. Modificación de id_proy en uso_recurso => si
n. Eliminación en proyecto
o. Inserción en uso_recurso
p. Modificación de fecha_inicio en etapa
q. Modificación de fecha_fin en etapa
r.Eliminación en uso_recurso
s.Modificación de id_etapa en uso_recurso
t.Modificación de cod_area en etapa
u. eliminación en etapa

-- parcialito 2019
sentencia que permita seleccionar los 2 menores id de director y cuentas instituciones dirige cada uno, teniendo en cuenta solo aquellas que son fundacion y que no registran datos historicos de direccion


SELECT id_director, COUNT(*) AS cantidad_instituciones
FROM institucion i
WHERE i.nombre_institucion LIKE '%Fundacion%'
AND NOT EXISTS(
    SELECT 1
    FROM historico h
    WHERE i.nombre_institucion = h.nombre_institucion)
ORDER BY id_director
GROUP BY id_director
LIMIT 2;

