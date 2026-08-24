condicionalidad e independencia:
la probabilidad de ocurrencia del evento A puede depender de la ocurrencia de otro evento B. si esa dependencia existe, a la probabilidad asociada de le llama probabilidad condicional. se represnta por P(A/B) y se interpreta como probabilidad de A dado B.

definicion probabilidad condicional:
𝑷 (𝑨 / 𝑩)= 𝑷(𝑨 ∩ 𝑩) / 𝑷(𝑩)

es una generalizacion de la probabilidad de un evento, en donde implicitamente se ha considerado la ocurrencia del evento seguro

esta probabilidad condicional, es generalizcion de la probabilidad de evento, en donde implicitamente se considera la ocurrencia del evento seguro

### regla de multiplicacion
𝑷 (𝑨 ∩ 𝑩) = 𝑷 (𝑨) . 𝑷(𝑩/𝑨)

%%>por que divide por esa interseccion? %%
dados 3 eventos: A, B y C, definimos:
𝑷(𝑨 ∩ 𝑩 ∩ 𝑪)= 𝑷(𝑨) .𝑷(𝑩⁄𝑨).𝑷(𝑪/𝑨 ∩ 𝑩)

### independencia de eventos
dos eventos A y B son independientes cuando la ocurrencia de uno no afecta a la ocurrencia del otro, en terminos de probabilidades

𝑷(𝑨⁄𝑩) = 𝑷(𝑨) 
𝑷(𝑩⁄𝑨) = 𝑷(𝑩)

entonces la regla de multiplicacion resulta que si A y B son independientes: 
𝑷(𝑨 ∩ 𝑩)= 𝑷(𝑨). 𝑷(𝑩)

teorema de la probabilidad total: permite calcula la probabilidad de un suceso B sumando las probabilidades de los distintos caminos o escenarios posibles que llevan a el
- los sucesos Ai deben ser excluyentes
- cubren todas las opciones posibles
$$𝑃(𝐵) = ∑_{i=1}^{n}𝑃(𝐴𝑖 )𝑃(𝐵/𝐴𝑖)$$
### teorema de bayes
es una manipulacion de la probabilidad condicional y del teorema de la probabilidad total
$$𝑃(𝐴_i/𝐵) = \frac{𝑃(𝐴_i)\,𝑃(𝐵/𝐴_i)}{\sum_{i=1}^{n} 𝑃(𝐴_i)\,𝑃(𝐵/𝐴_i)}$$
# variable aleatoria
es una funcion matematica que asigna un valor numerico a cada resultado de un experimento al azar. Se describe como X

variable aleatoria discreta: para espacios muestrales discretos
variable aleatoria continua: para espacios muestrales continuos

para asignar probabilidades a una variable aleatoria es construir su distribucion de probabilidades. esta representa un modelo teorico que describe la forma en que varian los resultados de un experimento aleatorio

