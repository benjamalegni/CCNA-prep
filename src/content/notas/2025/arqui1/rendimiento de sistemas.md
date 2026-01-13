## rendimiento
- tiempo de respuesta/tiempo de ejecucion/latencia:
	- tiempo transcurrido entre el comienzo y final de un evento
		- una computadora es mas rapida si ejecuta determinado programa en menor tiempo
- incremento de productividad/ throughput/ ancho de banda
	- cantidad de trabajo realizado en un tiempo determinado
		- cantidad de tareas realizadas en un tiempo determinado

- al comparar rendimientos, generalmente se comparan velocidades relativas entre 2 maquinas A y B
- si "A es mas rapida que B" entonces el tiempo de respuesta o el tiempo de ejecucion de A es menor que el de B para una tarea dada
![[Pasted image 20250607180713.png]]

n es el porcentaje adicional de tardanza en un proceso, 1 es la unidad

asumiento que el tiempo de ejecucion es inverso al rendimiento: 
![[Pasted image 20250607180841.png]]
![[Pasted image 20250607180846.png]]

### aceleracion del caso comun
optimizar el rendimiento de las ocurrencias mas frecuentes sobre las menos frecuentes
un diseno que trate de minimizar el tiempo de ejecucion de todas las instrucciones de una CPU determinada seguramente requerira agregados de logica adicional que acrecentara los costes de produccion, por un lado y desmerecera el rendimiento total del equipo en funcionamiento normal

# ley de Amdahl
- es una expresion para estimar la mejora maxima de un sistema conociendo la parte que se mejoro y su factor
- propuesta por Gene Amdahl en 1967:
		"la mejora obtenida en el rendimiento al utilizar algun modo de ejecucion mas rapido esta limitada por la fraccion de tiempo que se pueda usar en ese modo mas rapido"
![[Pasted image 20250608103223.png]]
![[Pasted image 20250608103234.png]]

### ejemplo de problema
==un circuito realiza la operacion de multiplicar en 2,3 microsegundos, de los cuales 0,5 μseg. Se necesitan para el calculo de rebalse del resultado. Se realiza una version optimizada de ese circuito que reduce a la mitad el tiempo de analisis de rebalse
1. hallar la fraccion mejorada
2. hallar la aceleracion mejorada
3. cual es la aceleracion global del nuevo circuito respecto al anterior?

solucion convencional (puesto que se tienen todos los datos)
$T_{original}=2,3μseg$
$T_{original-rebalse}=0,5 μseg$
$T_{nuevo-rebalse}=0,25 μseg$
$T_{mejorado}=2,3 - 0,5 + 0,25 = 2,05μseg$
$Acc_{global}=2,3 / 2,05= 1,21$

Solucion via ley de Amhahl
$F_{mejorada}=0,5μseg/2,3μseg$
$Acc_{mejorada}=0,5 /0,25=2$
![[Pasted image 20250608124705.png]]

### corolario de la ley de Amdahl
"si una mejora es utilizable en un fraccion de una tarea no podemos aumentar la velocidad de la tarea mas que el reciproco de 1 menos esa fraccion"
![[Pasted image 20250608124756.png]]
lo maximo que puede acelerarse es cuando la fraccion de la tarea mejorada se realice en un tiempo tendiente a 0
![[Pasted image 20250608124824.png]]


- # con una mejora
![[Pasted image 20250608124925.png]]

- # caso general con n mejoras:
![[Pasted image 20250608125009.png]]
siendo F0 la fraccion no mejorada y Acc0 (=1) la aceleracion no mejorada
=>
![[Pasted image 20250608125016.png]]

### problema 2
un procesador A realiza una operacion en N segundos. Se optimiza dicha operacion en un procesador B que mejora 2/3 de la misma en un factor de 2,5. Un tercer procesador C (basado en B) optimiza la operacion duplicando la velocidad de la parte que mejora
1. cual seria la aceleracion global si la mejora de C se realiza sobre la fraccion que mejoro B (2/3)?
2. calcular la misma aceleracion si la mejora de C se implementa sobre la fraccion que no mejora B
![[Pasted image 20250608125354.png]]
![[Pasted image 20250608125805.png]]
que sucede si se quiere calcular la aceleracion de C respecto a B?

una vez obtenido B, la proporcion de las fracciones ya no es la misma
![[Pasted image 20250608125846.png]]

como Toriginal !=Tmejorado entonces las fracciones respeco de Tmejorado ya no son 1/3 y 2/3
**problema...** como calcular las nuevas fracciones de B para C?

### problema 2 (recalculando fracciones)
![[Pasted image 20250608130033.png]]
![[Pasted image 20250608130045.png]]

## rendimiento de la CPU
el tiempo de CPU para un programa puede expresarse de dos maneras:

tiempo de CPU = ciclos de reloj de CPU por programa x ciclo de reloj
o tambien:
${Tiempo de CPU} = \frac{\text{Ciclos de reloj de CPU por programa}}{\text{Frecuencia de reloj}}$


### tiempo de CPU final
Tiempo de CPU = RI * CPI * ciclo de reloj
![[Pasted image 20250608130458.png]]

### problema 3
se dispone de un juego de instrucciones en el que cada tipo de instruccion, el porcentaje medio de uso de cada uno y los ciclos mejos necesarios para ejecutarlas se reflejan en la tabla adjunta:

| tipo instruccion | enteros | punto flotante | load | store |
| ---------------- | ------- | -------------- | ---- | ----- |
| promedio de uso  | 45%     | 25%            | 15%  | 15%   |
| CPI (ALU)        | 1       | 6              | 1    | 1     |
| CPI (MEM)        | 3       | 3              | 6    | 6     |
suponiendo que el reloj del sistema se duplica y que el tiempo de acceso a memoria no varia, calcular utilizando la ley de Amdahl el porcentaje obtenido en la mejora

##### solucion:
si el tiempo de acceso a memoria no varia, la mejora propuesta solo afectara a los CPI que se ejecutran en la ALU 
la mejora implica duplicar la frecuencia. por lo tanto el valor de la aceleracion normal es Acc_m=2
la fraccion de tiempo sobre el que se aplica la mejora, solo afecta a los ciclos que se ejecutan en la ALU. por lo tanto la frecuencia mejorada
![[Pasted image 20250608130907.png]]
	aplicando la ley de Amdahl. AG = 1,224. la mejora supone una aceleracion del 22,4%