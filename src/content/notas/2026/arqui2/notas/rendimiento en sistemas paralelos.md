nueva formula de rendimiento para P procesadores:
$$T_{CPU}= \frac {RI}{P} * \frac {1}{IPC} * t_{ciclo}$$

limites del paralelismo
La máxima aceleración ideal, p, se verá limitada por el tamaño de la parte secuencial del problema

fs = fraccion secuencial
fn/p = fraccion paralelizable (nunca es 100% paralelizable en la practica)

![[Pasted image 20260907155004.png]]

si tengo infinitos procesadores, la parte paralelizable va a tener a 0
