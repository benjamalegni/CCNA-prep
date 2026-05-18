- [x] enumeracion de servicios comunes y gestores de contenido
- [x] conceptos basicos de enumeracion y explotacion 3/1
- [ ] crear calendario interactivo que sea facil para crear reuniones compartidas y que tenga los juegos de linkedin
- [x] crear pagina con astro de mis notas de CCNA con los labs de jeremy's IT lab
- [ ] crear instagram clone (que los links se vean parecidos) para que gente ponga su cuenta y password
- [ ] pasar proyectos de cubepath a servidor propio (incluyendo komanda)
- [ ] 
# contenidos del final AyDA1
- especificar TDA, con operaciones y especificarlas
	- ejemplo TDA cuadricula generico
- clasificar operaciones en constructoras, observadoras, y transformadoras
- clases de c++
	- inicializacion de atributos en la definicion del constructor
- header de c++
- algoritmos divide y conquista (y otras tecnicas de diseno)
- greedy
	- greedy optimo
- programacion dinamica
	- aprender multiplicacion encadenada de matrices
	- top-down
	- bottom-up
- complejidad temporal, ***teorema maestro***
	- si el tiempo de ejecucion de un algoritmo es O(n^2) en el peor caso, es posible que sea O(n^3) sobre algunas entradas? **no***
	- si el tiempo de ejecucion de un algoritmo es O(n^2) en el peor caso, es posible que sea O(n)sobre algunas entradas? **si***
	- si el tiempo de ejecucion de un algoritmo es theta(n^2) en el peor caso, es posible que sea O(n)sobre algunas entradas? **no, porque en la notacion asintotica $\theta$ (theta), el mejor caso debera ser igual al peor de los casos***
	- aprender lo 3 tipos de notaciones asintoticas
- seguimiento de codigo
- multiplicacion de cadena de matrices

realice un seguimineto de algoritmo propuesto para multiplicar 4 matrices M1 x M2 x M3 x M4, donde
M1 es de tamano 5x3
M2 es de tamano 3x2
M3 es de tamano 2x6
M4 es de tamano 6x4
debe quedar claro el orden de la multiplicacion que minimice el numero de operaciones y como se obtiene

#### notas relevantes:
- se le pone const en la declaracion (en el header) y en la implementacion en archivos cpp a aquellas operaciones observadoras que no cambien ningun valor
``` cpp
class MyClass {
public:
    void getValue() const; // Declaration
};

void MyClass::getValue() const { // Definition
    // Function body
}
```
- en el header se declaran como:
```cpp
public:  
    FilaDeClientes();  
  
    // operaciones transformadoras  
    void llamarCliente(bool estaPresente);
```
- en el archivo cpp se van implementando como Clase::metodo(parametros){cuerpo} y no es necesario indicar cual es el tipo de dato que devuelve



# arquitectura de computadoras I

rendimiento/amdahl:
- tiempo de CPU = cantidad de instrucciones * CPI * tiempo de ciclo de reloj

MIPS segmentado
- diagrama del CPU
	- registros se escriben en flanco ascendente (primera mitad del ciclo) y se leen en flanco ascendente (en la segunda mitad de ciclo) para evitar riesgo de datos
	- alu ops:
		- (00) adds, lw, sw
		- (01) sub, beq
		- (10) determined by function field in the instruction
	- 9 senales de control de ctrl unit
	- el resultado de la ALU puede dirigirse al address de la memoria de datos (como con un offset en un sw) o puede dirigirse al registro mem/wb para que luego se escriba en un registro. En este ultimo caso, la memoria principal no recibe el address como input (esto es manejado por el ctrl unit)
	- ahora el input de write register viene desde el mem/wb register para preservar la integridad de los datos en el pipeline
	- fward unit condiciones de forwarding:
		- ex: reg ex/mem.RegWrite y ex/mem.RegisterDestination !=0 (prohibido)
			- si el id/ex.registerSource = ex/mem.registerDestination => forwardA
			- si el id.ex.registerTarget = ex/mem.registerDestination => forwardB
		- mem: reg mem/wb.RegWrite y mem.wb.RegisterDestination !=0 (prohibido)
			- si el id/ex.registerSource = mem/wb.registerDestination => forwardA
			- si el id.ex.registerTarget = mem/wb.registerDestination => forwardB
		- siempre adelatar un dato desde ex (osea el mas nuevo) si hay datos en ambas etapas que cumplan las condiciones de forwarding
		- esta prohibido que el registro destino sea = 0 porque el registro $zero no se puede sobreescribir
	- hazard detection unit funciona para insertar un stall o una burbuja en aquellos casos donde forwarding es fisicamente imposible
	- la comparacion del beq se puede realizar en la etapa ID entre $rs y $rt
	- **la direccion de la instruccion que causa excepciones sera guardada en un exception program counter (EPC) en la etapa ex**
	- el ultimo mux en la etapa ex indica cual sera el registro destino, que cambia para tipo r (\$rd) y tipo I ($rt)
- branch delay slot
- branch prediction
- riesgos y tecnicas de mitigacion de riesgos (forwarding):
	- de datos
	- de control
	- estructurales
- diferencia riesgos y conflicto
4. Diferencia entre Riesgos y Conflictos
*   Sugerencia: En la literatura de arquitectura, un "Riesgo" (Hazard) es la condición potencial en el hardware que impediría que la siguiente instrucción se ejecute en el ciclo de reloj designado. Un "Conflicto" (a veces usado como sinónimo de riesgo estructural) ocurre cuando dos instrucciones compiten por el mismo recurso de hardware al mismo tiempo. Todo conflicto estructural es un riesgo, pero no todos los riesgos (ej. dependencia de datos) son conflictos de hardware.
5. Excepciones e Interrupciones
*   Mencionaste el EPC (Exception Program Counter). Debes agregar el registro Cause, el cual guarda un código que indica por qué ocurrió la excepción (ej. desbordamiento aritmético vs. código de operación indefinido).
*   Manejo en Pipeline: Cuando ocurre una excepción (ej. en la etapa EX por un add que desborda), el procesador debe hacer flush (descartar) la instrucción actual y todas las instrucciones posteriores en el pipeline (las que están en IF e ID), guardar la dirección de la instrucción en el EPC, y forzar al PC a cargar la dirección de la rutina de manejo del sistema operativo. Las instrucciones anteriores (en MEM y WB) se dejan terminar normalmente.
cache
- LRU y otras tecnicas
- tipos de cache misses
- 
entradas y salidas
- northbridge, southbridge
- lineas de control, lineas de datos, transacciones
- buses sincronos, asincronos
	- protocolo asincrono de handshaking
- arbitros de bus
	- daisy chain
	- arbitraje paralelo centralizado
- modulos de i/o -> funcionalidades
- tecnicas de i/o (con ventajas y desventajas)
	- programadas (polling)
	- manejadas por interrupciones
	- direct memory access (DMA)
- excepciones e interrupciones (mencionar diferencias entre ellas)
	- que modificaciones ocurren en el datapath
- todo eso en profundidad
memoria virtual: 
- Segmentación vs Paginación (y segmentos paginados).
* MMU (Unidad de Gestión de Memoria): Su rol en el hardware.
* TLB (Translation Lookaside Buffer): ¡Importantísimo! Es la caché de la tabla de páginas.
* Integración TLB + Caché: (Punto 4.4 del programa) Cómo interactúan ambas al buscar un dato (¿La caché se accede con dirección virtual o física?).


# coaching
trabajar la presencia en cada paso.
	practicar meditacion o actividades que me hagan estar presentes.

hacer agenda semanal, todos los domingos.
plan con metas semanales, mensuales, de concecion definidas:
tener medio dia libre despues de las 12 todas las semanas
con presencia: tener algo para hacer especial
sin trabajos luego de las 19
que sea realista y con limites
en un mes tener 4 momentos de relax


checkpoint diarios con lo que estuvo dentro del plan del dia y al final del dia hacer el resumen
checkpoint semanal con una planificacion: 
espectativa/realidad, como me voy adaptando
ver que ajusto para la proxima semana, que me gusto que no me gusto 
calculo mensual y de fechas de conseguir resultados viene del semanal. entonces despues de la primer semana puedo hacer el calculo y tener las fechas limites
juntarme con equipos que me motiven a desarrollar habilidades. que puedo aprender de ellos