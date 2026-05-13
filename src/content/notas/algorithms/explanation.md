a. explique la tecnica de programacion dinamica a partir del problema de la multiplicacion encadenada de matrices
b. escriba un pseudo-codigo para resulver el problema de la multiplicacion encadenada de matrices utilizando programacion dinamica
c. realice un seguimiento del algorimo propuesto para multiplicar 4 matrices M1 x M2 x M3 x M4

M1 es de tamano 5x3
M2 es de tamano 3x2
M3 es de tamano 2x6
M4 es de tamano 6x4
debe quedar claro el ordenamiento de las multiplicaciones y el numero de operaciones y como se obtiene.

a. la tenica de programacion dinamica se basa en considerar problemas ya resueltos para resolver problemas mas grands. Particularmente en la multiplicacion encadenada de matrices, la idea general es encontrar la forma optima de colocar la separacion entre las matrices para minimizar el numero de operaciones necesarias para multiplicarlas. Esto se logra utilizando una tabla para almacenar los resultados de subproblemas, lo que permite evitar la repeticion de calculos y mejorar la eficiencia del algoritmo.
b.

```
```
n = array.size();
matrix_de_enteros (tamano n) dp inicializar a 0;

Para L desde 2 hasta n hacer:  // L es la longitud de la cadena
    Para i desde 1 hasta n - L + 1 hacer:
        j = i + L - 1
        DP[i][j] = INFINITO
        Para k desde i hasta j - 1 hacer:
            // Costo = costo mitad izq + costo mitad der + costo de multiplicar ambas resultantes
            costo = DP[i][k] + DP[k+1][j] + (D[i-1] * D[k] * D[j])
            Si costo < DP[i][j] entonces:
                DP[i][j] = costo
                S[i][j] = k   // Guardo dónde hice el corte óptimo
Devolver DP[1][n] y S
```
```
c. con los tamanos de esas matrices entonces el array sera: {5,3,2,6,4}

seguimiento:
n=5
se inicializa la matriz de tamano 5x5
se entra los 3 bucles
intenta calcular el costo cuando se hace la separacion entre M1 y M2 (k=1) y ese resultado se guardara en dp porque en este momento esa posicion tiene valor de int_max y cualquier valor que sea el costo va a ser menor.
calcula el costo cuando k=2:
como no esta calculado previamente entonces tambien lo asigna en dp[inicio][final]
lo repite hasta que k=final...
luego variaran el inciio, la longitud a considerarse y el final.
el resultado con costo minimo seran guardados y retornado
