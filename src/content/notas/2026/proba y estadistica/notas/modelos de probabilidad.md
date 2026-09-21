un modelo de probabilidad: funcion de una variable aleatoria que permite describir y calcular la probabilidad de uq eocurran distintos eventos

experimento aleatorio -> variable aleatoria:
- discreta (modelos discretos): bernoulli, binomial, geometrico, hipergeometrico, poisson, etc
- continua (modelos continuos): exponencial, gamma, uniforme, normal, asociadas a la distribucion normal, etc.

## ensayo bernoulli:
es un experimento aleatorio donde existe un exito y un fracaso
exito:1
fracado:0

exito -> p
fracaso -> 1-p

funcion masa:
$$P(X=x) = p^x(1-p)^{1-x}; x=0,1$$
- p: probabilidad de éxito (evento que ocurre)
- 1-p: probabilidad de fracaso (evento que no ocurre)
- x: valor que toma la variable (1 si éxito, 0 si fracaso)
- el exponente x anula la p cuando x=0, dejando solo (1-p)
- el exponente 1-x anula el (1-p) cuando x=1, dejando solo p
- representa la probabilidad de que ocurra el resultado x en un solo ensayo

$$f(x) = \left\{ \begin{array}{ll} 1-p & \text{if } x = 0 \\ 1 & \text{if } x = 1 \end{array} \right.$$
esperanza:$$E[X]=p$$
varianza: $$Var(X) = p(1-p)$$
repetir un experimento n veces en forma **independiente** -> modelo binomial

## modelo binomial
modela la cantidad de exitos al repetir un experimento de Bernoulli n veces de manera independiente
funcion masa: $$P(X=x) = \binom{n}{x} p^x (1-p)^{n-x}$$
- n: número de ensayos (veces que se repite el experimento)
- p: probabilidad de éxito en cada ensayo
- 1-p: probabilidad de fracaso en cada ensayo
- x: número de éxitos deseados (0 ≤ x ≤ n)
- $\binom{n}{x}$: combinaciones de n ensayos tomados de a x (formas de elegir qué ensayos son éxitos)
- representa la probabilidad de obtener exactamente x éxitos en n ensayos independientes

## modelo geometrico
modela el numero de fracasos previos a obtener el primer exito en ensayos independiente de bernoulli:
funcion de masa: $$P(X=x) = (1-p)^x p; \quad x = 0, 1, 2, \ldots$$
- p: probabilidad de éxito en cada ensayo
- 1-p: probabilidad de fracaso en cada ensayo
- x: número de fracasos antes del primer éxito
- representa la probabilidad de tener x fracasos antes del primer éxito

funcion de distribucion: $$F(x) = 1 - (1-p)^{x+1}$$
- p: probabilidad de éxito
- x: número de fracasos
- representa la probabilidad acumulada de tener a lo sumo x fracasos antes del primer éxito

esperanza: $$E[X] = \frac{1-p}{p}$$
- p: probabilidad de éxito
- representa el número esperado de fracasos antes del primer éxito

varianza: $$Var(X) = \frac{1-p}{p^2}$$
- p: probabilidad de éxito
- representa la dispersión del número de fracasos alrededor de la media

a mayor probabilidad de exito p, menor sera el numero esperado de intentos necesarios

## modelo hipergeometrico (H(n,N,A))
aplica el muestreo y seleccion de n elementos sin reposicion dentro de una poblacion finita N que contiene A elementos clasificados como exito
funcion de masa: $$P(X=x) = \frac{\binom{A}{x} \binom{N-A}{n-x}}{\binom{N}{n}}$$
- n: tamaño de la muestra (elementos que se extraen)
- N: tamaño total de la población
- A: cantidad de éxitos en la población
- x: número de éxitos en la muestra
- $\binom{A}{x}$: formas de elegir x éxitos del total A
- $\binom{N-A}{n-x}$: formas de elegir los n-x fracasos del resto
- $\binom{N}{n}$: total de formas de elegir n elementos de N
- representa la probabilidad de obtener exactamente x éxitos al extraer n elementos sin reposición

esperanza: $$E[X] = n \frac{A}{N}$$
- n: tamaño de la muestra
- A/N: proporción de éxitos en la población
- representa la cantidad esperada de éxitos en la muestra

varianza: $$Var(X) = n \frac{A}{N} \frac{N-A}{N} \frac{N-n}{N-1}$$
- A/N: proporción de éxitos
- (N-A)/N: proporción de fracasos
- (N-n)/(N-1): factor de corrección por muestreo sin reposición
- representa la dispersión de los éxitos alrededor de la media


### aproximacion de hipergeometrica por binomial
si la poblacino N es grande comparada con el tamano de la muestra n (N>10n o n<5% de N), entonces **la distribucion hipergeometrica se puede aproximar mediante la binomial B(n,p) tomando p=A/N** 
