# normalización

- La normalización es una técnica formal de análisis y organización de datos.
- Busca evitar o reducir la redundancia y prevenir anomalías de actualización.
- Fundamenta el diseño lógico mediante herramientas algorítmicas aplicadas a las dependencias funcionales obtenidas del Universo del Discurso.
- Es un procedimiento gradual basado en reglas aplicables a las relaciones.
- Requiere analizar las dependencias funcionales entre atributos.
- Está basada en el concepto de **formas normales**.

Objetivo: hallar una descomposición de relaciones con anomalías en otras relaciones con propiedades deseables: redundancia mínima y ausencia de anomalías de actualización, salvo casos excepcionales.

La descomposición se logra aplicando la operación de **proyección** `π`.

## redundancia y anomalías de actualización

La redundancia no es solo “datos repetidos”: puede provocar problemas al insertar, modificar o borrar datos.

- **Anomalía de inserción**: no se puede registrar cierta información si falta otra.
- Ejemplo: no poder registrar una carrera nueva si todavía no tiene alumnos inscriptos.
- **Anomalía de actualización**: un mismo dato aparece en varias tuplas y debe modificarse varias veces.
- Ejemplo: si Pierre renueva la visa, hay que actualizar varias filas.
- **Anomalía de borrado**: al borrar una tupla se pierde información que no se quería eliminar.
- Ejemplo: si se borra la única inscripción a una carrera, se pierde también la información de esa carrera.

## descomposición de relaciones

Problema: a partir de una relación `R` con anomalías de actualización, queremos obtener otras relaciones mediante descomposición, sin anomalías y sin pérdida de información.

Como no se puede analizar caso por caso, se establecen reglas abstractas que permitan lograr soluciones correctas.

Una descomposición correcta debe:

- reducir anomalías de actualización
- permitir reconstruir la relación original sin pérdida de información
- evitar que aparezcan tuplas falsas al ensamblar
- conservar las dependencias funcionales cuando sea posible

Si al recomponer las relaciones aparecen filas que no existían en la relación original, la descomposición produjo pérdida de información.

Ejemplo de descomposición problemática:

```sql
CAMPEON(Nombre, Raza, Peso, Cuidador)
CRIADERO(Criadero, Raza)
```

Al unir por `Raza` aparecen combinaciones falsas, porque una misma raza puede estar asociada a más de un criadero.

## formas normales

El grado de normalización se establece por la forma normal alcanzada.

Las formas normales en orden creciente son:

- `1FN`
- `2FN`
- `3FN`
- `FNBC` o Boyce-Codd
- `4FN`
- `5FN`
- `DKNF` o domain/key normal form

En la materia el objetivo es aprender a pensar al menos en `3FN` / `FNBC`.

## 1FN
Una relación está en **1FN** si y solo si todos los atributos contienen valores atómicos.

Esto significa que en la intersección de cada fila y columna debe existir un solo valor. No puede haber grupos repetitivos ni conjuntos de valores en una celda.

Ejemplo de problema:

```sql
ALUEXT(NbreAlumno, Pasaporte, FechaVisa, CódigoCarrera, Carrera)
```

Si `CódigoCarrera` y `Carrera` contienen varios valores para un mismo alumno, la relación no está en `1FN`.

Soluciones posibles:

- **Vertical**: generar una tupla por cada carrera del alumno.
- Ventaja: todos los campos tienen valores válidos.
- Desventaja: aparecen más tuplas y se repiten datos del alumno.
- **Horizontal**: crear columnas `CódigoCarrera1`, `CódigoCarrera2`, etc.
- Ventaja: se mantiene una tupla por alumno.
- Desventaja: hay que prever una cantidad máxima de columnas y aparecen muchos nulos.

La solución vertical cumple mejor la idea relacional, aunque todavía puede tener redundancia.

## 2FN
Conceptos necesarios:

- **Atributo no-clave**: atributo que no pertenece a ninguna clave candidata. También se llama atributo no-primo o secundario.
- **Dependencia funcional plena**: `Y` depende funcional y plenamente de `X` si `X -> Y` y no existe un subconjunto propio `X' ⊂ X` tal que `X' -> Y`.
- **Dependencia funcional parcial**: ocurre cuando un atributo depende de una parte de una clave compuesta, no de la clave completa.

Una relación está en **2FN** si y solo si:

- está en `1FN`
- cada atributo no-clave depende funcional y plenamente de cada clave candidata

Antes de analizar `2FN` conviene:

- generar un conjunto minimal de dependencias funcionales
- hallar las claves candidatas
- mirar especialmente los atributos no-clave

### ejemplo 2FN

```sql
TRABAJA(IdEmpl, IdProy, NbreProy, TiempoDedic)
```

Dependencias funcionales:

```txt
IdProy -> NbreProy
IdEmpl, IdProy -> TiempoDedic
```

Clave candidata:

```txt
<IdEmpl, IdProy>
```

`NbreProy` no depende plenamente de la clave candidata, porque depende solo de `IdProy`. Entonces `TRABAJA` no está en `2FN`.

Descomposición:

```sql
PROYECTO(IdProy, NbreProy)
DEDICACION(IdEmpl, IdProy, TiempoDedic)
```

El atributo común `IdProy` es clave en una de las relaciones, lo que ayuda a que la descomposición sea sin pérdida.

## descomposición sin pérdida

Una descomposición de `R` es **sin pérdida** si permite recuperar íntegramente las tuplas originales al ensamblar las proyecciones mediante join.

Para recuperar las tuplas originales, el conjunto de atributos en común debe ser clave en al menos una de las relaciones proyectadas.

Además, al menos una clave candidata de la relación original debe quedar contenida en alguna proyección.

Cada proyección se lleva las dependencias funcionales que le corresponden.

## dinámica del proceso de normalización

El proceso suele ser por descomposición sucesiva:

```txt
R universal(atributos) + DF
-> proyecciones en 2FN
-> revisar cada relación para 3FN
-> si alguna no cumple, descomponerla nuevamente
-> revisar FNBC sobre las relaciones resultantes
```

No se normaliza una sola vez sobre la relación original: también se analizan las relaciones que resultan de cada proyección.

## 3FN

Concepto necesario:

- **Dependencia funcional transitiva**: si `X -> Y`, `Y -> Z` y `Y` no determina a `X`, entonces `X -> Z` por transitividad.

En el contexto de `3FN`, se buscan dependencias transitivas donde los atributos intermedios y determinados sean atributos no-clave.

Una relación está en **3FN** si:

- está en `2FN`
- cada atributo no-clave depende funcional y no transitivamente de cada clave candidata

Tip: poner la lupa sobre las dependencias funcionales entre atributos no-clave, por ejemplo `Y -> Z`.

Para pasar de `2FN` a `3FN` se eliminan las dependencias funcionales transitivas.

### ejemplo 3FN

```sql
RESID_UNIV(#Matric, Pabellon, Renta)
```

Dependencias funcionales:

```txt
#Matric -> Pabellon
Pabellon -> Renta
```

Clave candidata:

```txt
<#Matric>
```

Está en `2FN`, porque la clave no es compuesta. Pero no está en `3FN`, porque `Renta` depende transitivamente de `#Matric` mediante `Pabellon`.

Descomposición:

```sql
RESIDE(#Matric, Pabellon)
VALOR_RENTA(Pabellon, Renta)
```

El atributo común `Pabellon` es clave en `VALOR_RENTA`, por eso la descomposición permite ensamblar sin generar tuplas falsas.

## FNBC

Una relación está en **Forma Normal de Boyce-Codd** o **FNBC** si y solo si cada determinante en el conjunto minimal de dependencias funcionales es una clave candidata.

Para convertir una relación de `3FN` a `FNBC`, se proyecta la relación de forma que cada determinante sea clave candidata en su relación.

La `FNBC` es más estricta que `3FN`.

### ejemplo FNBC con atributos equivalentes

```sql
INSCRIBE(LU, DNI, AñoIngreso, IdCarrera)
```

Dependencias funcionales:

```txt
LU -> DNI
DNI -> LU
LU, IdCarrera -> AñoIngreso
```

Claves candidatas:

```txt
<DNI, IdCarrera>
<LU, IdCarrera>
```

`LU` y `DNI` son atributos equivalentes o de diccionario, porque se determinan mutuamente.

La relación está en `2FN` y `3FN`, pero no está en `FNBC`: `LU` y `DNI` son determinantes, pero no son claves candidatas por sí solos.

Descomposición posible:

```sql
I1(LU, DNI)
I2(DNI, IdCarrera, AñoIngreso)
```

O también:

```sql
I1(LU, DNI)
I2(LU, IdCarrera, AñoIngreso)
```

Se elige una de las dos variantes, no ambas.

## FNBC y pérdida de dependencias funcionales

Algunas descomposiciones a `FNBC` pueden ser sin pérdida de información pero con pérdida de dependencias funcionales.

Ejemplo:

```sql
MENU_PREF(DNI, clase, Idplato)
```

Dependencias funcionales:

```txt
DNI, clase -> Idplato
Idplato -> clase
```

Claves candidatas:

```txt
<DNI, clase>
<DNI, Idplato>
```

`Idplato` es determinante, pero no es clave candidata. Entonces no está en `FNBC`.

Descomposición en `FNBC`:

```sql
PLATO(Idplato, clase)
MENU_2(DNI, Idplato)
```

Esta descomposición es sin pérdida de información, pero se pierde la dependencia funcional:

```txt
DNI, clase -> Idplato
```

Esa dependencia perdida debe expresarse como regla de negocio.

## dos caminos para diseñar un modelo de datos

### camino 1: proceso de normalización

Se colocan todos los atributos a almacenar en una relación inicial llamada **relación universal**. Luego se deducen las dependencias funcionales, se normaliza y se obtiene el esquema lógico.

Ejemplo:

```sql
R(DNI, Nombre, Apellido, FechaNac, Categoria, Sueldo, IdDepto, NomDepto)
```

Dependencias funcionales:

```txt
DNI -> Nombre, Apellido, FechaNac, Categoria, IdDepto
Categoria -> Sueldo
IdDepto -> NomDepto
```

Clave candidata:

```txt
<DNI>
```

La relación está en `2FN`, pero no en `3FN`, porque hay dependencias transitivas:

```txt
DNI -> Categoria -> Sueldo
DNI -> IdDepto -> NomDepto
```

Descomposición:

```sql
EMPLEADO(DNI, Nombre, Apellido, FechaNac, Categoria, IdDepto)
CATEGORIA(Categoria, Sueldo)
DEPARTAMENTO(IdDepto, NomDepto)
```

Las relaciones resultantes están en `FNBC`.

### camino 2: diseño top-down

Se construye un modelo conceptual usando `DERExt`, se identifican entidades, atributos e interrelaciones, y luego se transforma al esquema lógico relacional.

Este camino tiene fuerte influencia de la experiencia y criterio del diseñador.

Después de derivar el esquema lógico, conviene aplicar normalización sobre cada relación obtenida para detectar redundancias, anomalías o errores del `DERExt`.

## idea final

Normalizar al mayor grado posible no debe ser un fundamentalismo. El grado de normalización se decide considerando también criterios de eficiencia que se ven más adelante.

Con experiencia en diseño de `DERExt`, generalmente se obtienen modelos lógicos normalizados a `3FN` o `FNBC`, pero igual conviene aplicar normalización para encontrar posibles mejoras.
