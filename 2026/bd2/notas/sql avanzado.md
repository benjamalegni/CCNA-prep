# CTE
common table expression

es un conjunto de resultados temporal, con nombre propio, funciona como una tabla virtual definida al comizando de una consulta mediante la clausula with

```sql
WITH clientes_activos AS (
	SELECT id, nombre
	FROM clientes
	WHERE estado = 'activo'
)

SELECT *
FROM clientes_activos;
```
- es temporal: desaparece automaticamente al terminar la consulta
- con nombre: se referencia facilmente como una tabla tradicional
- no se guarda: no crea objetos persistentes en base de datos

WITH nombre AS (...)
consulta interna: define el resultado temporal
consulta principal: usa la CTE como una tabla mas, se puede unir con JOIN, filtrar u ordenar

### razones para usar CTE
- legibilidad
	- dividen consultas complejas en pasos con nombre, que se leen de arriba hacia abajo
- reutilizacion
	- una misma CTE puede referenciarse varias veces sin repetir la subconsulta
- encadenamineto
	- varias CTEs separadas por comas, cada una construida sobre la anterior
- recursion
	- con WITH RECURSIVE se recorren jerarquiar: organigramas, categorias, rutas

# consultas recursivas
ejemplo:
```sql
WITH RECURSIVE ejemplo AS (
-- Semilla (Caso Base)
	SELECT 1 n
	UNION ALL
-- Término Recursivo
	SELECT n+1 FROM ejemplo
)

SELECT n FROM ejemplo LIMIT 10;
```
funcionamiento:
1. inicializacion (semilla)
	- se ejecuta la consulta SELECT 1 que genera el primer registro y define el tipo de dato para la columna n
2. union recursiva:
	- la segunda consulta toma los resultados previos e incrementa su valor (n+1) de manera sucesiva y acumulativa
3. limite de parada:
	- la instruccion LIMIT 10 en la consulta final restringe la recursion deteniendo el proceso al alcanzar 10 filas

otro ejemplo:
```sql
WITH RECURSIVE voluntario_coord AS (
-- Semilla (Caso Base)
	SELECT 1 n, id_coordinador, nro_voluntario, nombre, apellido
	FROM voluntario WHERE id_coordinador IS NULL
	UNION ALL

-- Término Recursivo
	SELECT n+1, v.id_coordinador, v.nro_voluntario, v.nombre, v.apellido
	FROM voluntario_coord vc, voluntario v
	WHERE vc.nro_voluntario = v.id_coordinador
)
SELECT * FROM voluntario_coord WHERE n < 3;
```

# agrupamientos multiples
GROUPING:
permite realizar operaciones de agrupacion mas complejas utilizando el concepto de conjuntos de agrupacion
facilita la creacion de informes multidimensionales en una unica consulta estructurada evitando multiples UNION ALL

funcionamiento:
- agrupa por separado por cada conjunto de agrupacion especificado en la consulta
- las funciones de agregacion se calculan de manera independiente para cada grupo
- **equivalente a aplicar GROUP BY de forma individual**

#### GROUPING SETS
```sql
SELECT id_tarea, 
	id_institucion,
	sum(horas_aportadas),
	count(*)
FROM voluntario
WHERE id_institucion IS NOT NULL
GROUP BY GROUPING SETS (
  id_tarea, id_institucion, ()
)

ORDER BY id_tarea, id_institucion;
```
esto evita multiples UNION ALL combinando diferentes niveles de agrupacion de forma eficiente
#### ROLLUP
```sql
SELECT 
	c1, 
	c2, 
	c3, 
	[aggr_func](c4)
FROM table
GROUP BY ROLLUP (
	c1, c2, c3
);
```
ROLLUP realiza una agregacion jerarquica reduciendo dimensiones

total general: anade una ultima fila con la suma o agregacion global

#### CUBE
es una extension de la clausula GROUP BY, **genera todas las combinaciones posibles de subtotales y totales generales** para un conjunto de columnas

GROUP BY CUBE(region, product)

### comparaciones
- grouping sets:
	- deja decir explicitamente que agrupaciones hacer. es la forma mas flexible
- rollup:
	- es un atajo jeraruqico que realiza una agregacion de arriba hacia abajo reduciendo dimensiones
- cube
	- es el metodo mas exhaustivo que genera todas las agrupaciones posibles entre las columnas

# funciones de ventana
son herramientas estadarizadas en SQL:2003

permiten realizar calculos avanzados sin colapsar o agrupar las filas individuales de la consulta, manteniendo la identidad en cada registro original

posgres permite un GROUP BY adicional (no solo cuando tengo que agrupar por una PK)

```sql
SELECT id_institucion, nombre_institucion, COUNT(*)
FROM institucion
GROUP BY id_institucion;
```
esto esta permitido aunque nombre_institucion no este en el GROUP_BY porque la PK determina univocamente el nombre
id_institucion (PK) -> nombre_institucion

- ### clausula OVER
	- siempre contiene una clausula OVER despues del nombre y los argumentos de la funcion ventana
- ### definicion de filas
	- OVER indica como se dividen las filas de la consulta para que las procese la funcion de ventana
- ### PARTITION BY
	- especifica dividir las filas en grupos que comparten los mismos valores

ejemplo OVER:
comparar las horas aportadas de cada voluntario con las horas aportadas en promedio para cada tarea:
```sql
SELECT id_tarea, nro_voluntario,
	horas_aportadas,
	avg(horas_aportadas) OVER 
	(PARTITION BY id_tarea)
FROM voluntario;
```
la instruccion OVER (PARTITION BY...) divide los datos en grupos logicos segun la tarea, permitiendo al promedio calcularse por grupo sin alterar la granularidad de los voluntarios
- granularidad de los voluntarios: cada voluntario mantiene su propia fila

la funcion de ventana **rank()** permite generar una clasificacion ordinal dentro de cada grupo de tareas, ordenando a los voluntarios segun su esfuerzo de mayor a menor
```sql
SELECT id_tarea, nro_voluntario,
	horas_aportadas,
	rank() OVER (
		PARTITION BY id_tarea
		ORDER BY horas_aportadas DESC)
FROM voluntario;
```
**avg()** permite calcular un promedio acumulativo paso a paso dentro de cada particion
```sql
SELECT id_tarea, nro_voluntario,
	horas_aportadas,
	avg(horas_aportadas) OVER (
		PARTITION BY id_tarea
		ORDER BY horas_aportadas)
FROM voluntario;
```
estructura de la sintaxis
```sql
window_function ([arg1, arg2,..]) OVER (
	[PARTITION BY partition_expression]
	[ORDER BY sort_expression
		[ASC | DESC] [NULLS {FIRST | LAST}]] )
```
**PARTITION BY agrupa las filas en particiones para un cálculo aislado. ORDER BY ordena las filas de cada partición.**

![[Pasted image 20260914150938.png]]
