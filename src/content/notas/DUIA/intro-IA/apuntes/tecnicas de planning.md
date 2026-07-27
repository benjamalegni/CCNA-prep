los agentes inteligentes necesitan actuar en el mundo que habitan. planning se ocupa de generar un plan: un conjunto de acciones ejecutadas en un orden coherente para alcanzar ciertos objetivos.

es especialmente útil cuando:
- hacen falta varias acciones para llegar al objetivo.
- algunas acciones dependen de otras.
- las acciones interactúan y pueden deshacer condiciones que otras necesitan.

ejemplos de algoritmos y enfoques:
- STRIPS y algoritmos basados en su lenguaje.
- FF (Fast Forward), basado en heurísticas.
- A*, usado por ejemplo en robots móviles.
- GraphPlan.
- HTN (Hierarchical Task Network).
- MCTS (Monte Carlo Tree Search).

## problema de planning
un problema de planning recibe tres entradas:
- una descripción formal del estado inicial del mundo.
- una descripción de las metas u objetivos.
- una descripción de las acciones que pueden realizarse.

la salida es un plan que, al ejecutarse desde un mundo que satisface las condiciones iniciales, alcanza las metas.

un plan puede verse como:
- una secuencia totalmente ordenada de acciones.
- un conjunto parcialmente ordenado, donde solo se especifican las dependencias necesarias.

### dominios de aplicación
- planificación de movimientos de robots.
- procesos industriales y producción.
- business process management.
- construcción y planificación de proyectos.
- manejo de crisis, logística y misiones.
- salud y e-learning.
- configuración de equipos.
- reconocimiento de planes.
- turismo.
- composición de servicios e integración de software.
- computación ubicua y videojuegos.

## simplificaciones del planning clásico
los lenguajes clásicos suelen asumir:
- **tiempo atómico:** cada acción transforma un estado en otro de forma instantánea. no hay acciones simultáneas.
- **efectos determinísticos:** una acción aplicada en un estado siempre produce el mismo resultado.
- **omnisciencia:** el agente conoce completamente el estado inicial y los efectos de sus acciones.
- **única causa de cambio:** el mundo solo cambia por las acciones del agente; no hay otros agentes ni eventos externos.

# representación STRIPS
STRIPS (Stanford Research Institute Problem Solver) es un lenguaje de representación basado en lógica proposicional.

el estado del mundo se representa mediante un conjunto de literales ground, es decir, predicados cuyas variables ya fueron instanciadas.

cada acción se describe con:
- **precondiciones:** literales que deben ser verdaderos antes de ejecutarla.
- **efectos positivos:** literales que pasan a ser verdaderos.
- **efectos negativos:** literales que dejan de ser verdaderos.

una acción solo puede aplicarse si se cumplen sus precondiciones. el nuevo estado se obtiene eliminando sus efectos negativos y agregando sus efectos positivos.

## ejemplo: mundo de los bloques

estado inicial:

$$
\{on(A,Table), on(C,A), on(B,Table), clear(B), clear(C)\}
$$

objetivo:

$$
\{on(B,C), on(A,B)\}
$$

una acción posible es mover C desde A hacia la mesa:

$$
move(C,A,Table)
$$

- precondiciones: $on(C,A)$ y $clear(C)$.
- efectos: $on(C,Table)$, $\neg on(C,A)$ y $clear(A)$.

# espacios de búsqueda

## búsqueda en el espacio de estados

los nodos representan estados completos del mundo y los arcos representan acciones.

### progresión
- comienza en el estado inicial.
- aplica acciones cuyas precondiciones se cumplen.
- genera estados sucesores hasta encontrar uno que satisfaga las metas.

la pregunta es: **¿qué estado obtengo si ejecuto esta acción ahora?**

### regresión
- comienza en el objetivo.
- elige acciones capaces de producir alguno de los objetivos actuales.
- reemplaza esos objetivos por las precondiciones de las acciones.
- continúa hasta que el estado inicial satisface el conjunto de condiciones regresadas.

la pregunta es: **¿qué tendría que ser verdadero antes para poder alcanzar este objetivo?**

## búsqueda en el espacio de planes
los nodos representan planes parcialmente especificados. los arcos son operaciones de refinamiento, por ejemplo agregar una acción o una restricción de orden.

puede trabajar con:
- **orden total:** todas las acciones quedan en una única secuencia.
- **orden parcial:** solo se registran las decisiones de orden esenciales. dos acciones independientes pueden quedar sin ordenar entre sí.

# planning de orden parcial

un plan de orden parcial se representa con la terna:

$$
P = \langle A,O,L \rangle
$$

- $A$: conjunto de acciones.
- $O$: conjunto de restricciones de orden entre acciones.
- $L$: conjunto de links causales.

## links causales

un link causal registra que una acción produce una condición requerida por otra:

$$
A_p \xrightarrow{Q} A_c
$$

- $A_p$: acción productora.
- $A_c$: acción consumidora.
- $Q$: efecto de $A_p$ y precondición de $A_c$.

el link expresa dos cosas:
- $A_p$ debe ejecutarse antes que $A_c$.
- la condición $Q$ debe seguir siendo verdadera entre ambas acciones.

## amenazas

una acción $A_t$ amenaza al link

$$
A_p \xrightarrow{Q} A_c
$$

si:
- $A_t$ tiene como efecto $\neg Q$.
- el orden actual permite ubicarla entre $A_p$ y $A_c$, es decir, $O \cup \{A_p < A_t < A_c\}$ es consistente.

la amenaza puede resolverse agregando una restricción de orden:
- **democión:** $A_t < A_p$.
- **promoción:** $A_c < A_t$.

de esta forma la acción que destruye $Q$ queda fuera del intervalo protegido por el link causal.

## plan nulo

los planes completos, incompletos y nulos se representan de la misma manera.

el plan inicial contiene dos acciones especiales:
- $A_0$ o Start: sus efectos representan el estado inicial.
- $A_\infty$ o End: sus precondiciones representan las metas.

inicialmente:

$$
A = \{A_0,A_\infty\}
$$

$$
O = \{A_0 < A_\infty\}
$$

$$
L = \varnothing
$$

la agenda contiene cada meta pendiente junto con la acción que la necesita:

$$
\langle Q,A_\infty \rangle
$$

# algoritmo POP

POP (Partial-Order Planning) refina un plan parcial hasta vaciar su agenda. cuando hay varias acciones u órdenes posibles, debe explorar alternativas y retroceder si una elección falla.

dado un plan $\langle A,O,L\rangle$, una agenda y un catálogo de acciones:

1. **terminación:** si la agenda está vacía, devolver el plan.
2. **selección de objetivo:** elegir de la agenda un par $\langle Q,A_{need}\rangle$.
3. **selección de acción:** elegir una acción $A_{add}$, nueva o ya incluida, que tenga a $Q$ como efecto.
   - si no existe una acción posible, fallar y volver a otra elección.
   - agregar el link $A_{add} \xrightarrow{Q} A_{need}$.
   - agregar la restricción $A_{add} < A_{need}$.
   - si es nueva, incorporarla a $A$.
4. **actualización de objetivos:**
   - quitar $\langle Q,A_{need}\rangle$ de la agenda.
   - si $A_{add}$ es nueva, agregar sus precondiciones a la agenda.
5. **protección de links causales:** para cada amenaza, elegir una promoción o democión consistente. si ninguna sirve, fallar.
6. **invocación recursiva:** continuar con el plan y la agenda actualizados.

## ejemplo del orden parcial

para obtener $on(B,C)$ y $on(A,B)$ desde el estado inicial del mundo de bloques:

1. mover C desde A hacia la mesa, dejando A libre.
2. mover B desde la mesa hacia C.
3. mover A desde la mesa hacia B.

los pasos 2 y 3 sí están ordenados porque B debe estar sobre C antes de poner A sobre B. POP conserva únicamente estas restricciones necesarias y protege las condiciones mediante links causales.

# UCPOP

UCPOP extiende POP para aumentar la capacidad expresiva del lenguaje. agrega:
- variables y unificación.
- precondiciones disyuntivas.
- cuantificación universal.
- efectos condicionales.

el plan pasa a representarse como:

$$
\langle A,O,L,B\rangle
$$

$B$ es una tabla de restricciones y vinculaciones de variables, inicialmente vacía.

## variables y unificación

usar variables permite definir esquemas de acciones y postergar decisiones sobre objetos concretos.

ejemplo:

$$
move(X,Y,Z)
$$

- restricciones: $X \neq Z$, $X \neq Y$, $Y \neq Z$, $Z \neq Table$.
- precondiciones: $clear(X)$, $clear(Z)$ y $on(X,Y)$.
- efectos: $on(X,Z)$, $\neg on(X,Y)$, $\neg clear(Z)$ y $clear(Y)$.

al seleccionar una acción se puede:
- reutilizar una acción existente.
- instanciar un nuevo esquema de acción cuyos efectos unifiquen con el objetivo.

los cambios producidos por la unificación se guardan en $B$. antes de devolver el plan, todas las variables deben quedar instanciadas.

la detección de amenazas también debe considerar si dos literales podrían unificarse. por ejemplo, $\neg clear(X)$ puede amenazar un link que protege $clear(B)$ si las restricciones permiten $X=B$.

## efectos condicionales

un efecto condicional tiene la forma:

$$
when(antecedente, consecuente)
$$

el consecuente ocurre solamente si el antecedente era verdadero antes de ejecutar la acción.

ejemplo:

$$
when(Z \neq Table,\neg clear(Z))
$$

si se elige una acción porque su consecuente satisface un objetivo, su antecedente debe agregarse a la agenda.

si el consecuente condicional amenaza un link causal, aparece una tercera forma de protección:
- **confrontación:** agregar la negación del antecedente a la agenda para garantizar que el efecto amenazante no se active.

## precondiciones disyuntivas

solo las precondiciones pueden contener disyunciones, por ejemplo:

$$
clear(A) \lor equal(A,Table)
$$

cuando la agenda contiene un objetivo disyuntivo, se elige uno de sus componentes y se agrega a la agenda. esta elección puede requerir backtracking.

## cuantificación universal

permite expresar condiciones para todos los objetos de un tipo:

$$
\forall X\;(block(X)\rightarrow[clear(X)\land on(X,Table)])
$$

se asume un universo de objetos estático, finito y tipado. por eso una fórmula cuantificada puede convertirse en su **base universal**, es decir, en cláusulas ground.

si los únicos bloques son $A$ y $B$:

$$
\{clear(A),on(A,Table),clear(B),on(B,Table)\}
$$

consideraciones:
- si un objetivo o precondición está cuantificado universalmente, se calcula su base y se planea sobre ella.
- si un efecto tiene cuantificación universal, su base se genera a medida que se crean los links que la necesitan.
- la definición de amenaza se amplía para considerar efectos cuantificados y variables.

## algoritmo UCPOP

1. **terminación:** si la agenda está vacía, devolver $\langle A,O,L,B\rangle$.
2. **reducción del objetivo:** elegir $\langle Q,A_c\rangle$.
   - si $Q$ está cuantificado, calcular su base y agregarla a la agenda.
   - si es una conjunción, agregar cada componente.
   - si es una disyunción, elegir un componente.
   - si es un literal y ya existe entre el productor y $A_c$ un link incompatible que protege $\neg Q$, fallar.
3. **selección de acción:** elegir una acción existente o nueva, consistente con $O$, que tenga un efecto $R$ unificable con $Q$.
   - actualizar $L$, $O$ y $B$.
   - si $R$ es el consecuente de un efecto condicional, agregar su antecedente a la agenda.
4. **habilitación:** si la acción es nueva, agregarla y sumar sus precondiciones a la agenda.
5. **protección:** resolver cada amenaza mediante promoción, democión o confrontación.
6. **recursión:** continuar con el plan refinado.

# ejemplo: problema de los cohetes

estado inicial:

$$
\{at(A,R_1),at(A,R_2),at(A,C_1),at(A,C_2),hasFuel(R_1),hasFuel(R_2)\}
$$

objetivo:

$$
\{at(B,C_1),at(B,C_2)\}
$$

acciones:

### mover un cohete

$$
move(Rocket,From,To)
$$

- precondiciones: $From \neq To$, $at(From,Rocket)$ y $hasFuel(Rocket)$.
- efectos: $at(To,Rocket)$, $\neg at(From,Rocket)$ y $\neg hasFuel(Rocket)$.

### cargar

$$
load(Rocket,Place,Charge)
$$

- precondiciones: $at(Place,Rocket)$ y $at(Place,Charge)$.
- efectos: $in(Rocket,Charge)$ y $\neg at(Place,Charge)$.

### descargar

$$
unload(Rocket,Place,Charge)
$$

- precondiciones: $at(Place,Rocket)$ e $in(Rocket,Charge)$.
- efectos: $at(Place,Charge)$ y $\neg in(Rocket,Charge)$.

un plan posible usa un cohete distinto para cada carga:
- cargar $C_1$ en $R_2$, mover $R_2$ de A a B y descargar $C_1$.
- cargar $C_2$ en $R_1$, mover $R_1$ de A a B y descargar $C_2$.

las dos ramas son independientes y pueden permanecer parcialmente ordenadas.

otro plan puede cargar ambas cargas en un mismo cohete, moverlo una sola vez y luego descargarlas. esto muestra que un problema puede admitir distintos planes válidos.

# otros enfoques

- GraphPlan.
- motion planning basado en muestreo.
- planning basado en teoría de decisión.
- planning probabilístico.
- planning basado en preferencias.
- planning heurístico.
- planning temporal.

## HTN

HTN (Hierarchical Task Network) planifica mediante descomposición jerárquica:
- comienza con tareas abstractas.
- las divide en subtareas cada vez más concretas.
- termina en acciones primitivas ejecutables.

a diferencia de STRIPS, no parte únicamente de acciones primitivas claramente definidas. ejemplos: SHOP, NOAH, UMCP y SIADEX.

## planning basado en LLM

los estados, las acciones y los objetivos pueden describirse en lenguaje natural.

limitaciones:
- los LLM suelen manejar mal restricciones numéricas o temporales estrictas.
- pueden generar planes demasiado optimistas o poco prácticos.
- necesitan restricciones explícitas y algún mecanismo externo que compruebe la validez del plan.
