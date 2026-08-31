## variable aleatoria conjunta
un fenomeno puede requerir dos o mas variables aleatorias relacionadas. para estos casos se usa un conjunto de dos o mas variables aleatorias definidas sobre el mismo espacio muestral que analizan la probabilidad que ocurran ciertos valores de manera simultanea

funcion de probabilidad conjunta: es la probabilidad de que cada una de sus dimensiones sean menores o iguales a valores especificos de sus componentes
$$𝑭_{𝑿𝒀}(𝒙, 𝒚) = 𝑷[𝑿 ≤ 𝒙, 𝒀 ≤ 𝒚]$$
%%>que carajo significa esto?%%

X significa los valores que pueden tomar los elementos
Y significa el valor absoluto de la diferencia entre los elementos

para variables aleatorias conjuntas discretas (se pueden contar en cada una de las dimensiones), la probabilidad tambien puede definirse con la **funcion de masa conjunta**, que expresa la probabilidad de que ambas dimensiones tomen valores especificos de X y de Y
$$P_{𝑿𝒀}(𝒙, 𝒚) = 𝑷[𝑿 = 𝒙, 𝒀 = 𝒚]$$

las dimensiones son cada una de las variables aleatorias que componen la distribucion conjunta
propiedades de la funcion:
- 𝑃(𝑋 = 𝑥𝑖 , 𝑌 = 𝑦𝑗) ≥ 0 ∀𝑥𝑖 , 𝑦𝑗 
- ∑ ∑ 𝑃(𝑋 = 𝑥𝑖 𝑥 , 𝑌 = 𝑦𝑗) = 1
%%> que son las dimensiones? %%

la funcion de probabilidad conjunta de una variable aleatoria conjunta corresponde a la probabilidad de que cada una de sus dimensiones sean menores o iguales a valores especificos de sus componentes:
$$𝐹_{𝑋𝑌} = 𝑃(𝑋 ≤ 𝑥, 𝑌 ≤ 𝑦) = ∑ ∑ 𝑃(𝑋 = 𝑥_𝑖 , 𝑌 = 𝑦_𝑗)$$
esta funcion es no decreciente y toma valores en el intervalo cerrado \[0,1]

### distribuciones marginales
se llaman asi porque salen de los margenes de la tabla de distribucion conjunta: la probabilidad de una variable sin importar el valor de la otra
- P_X(xi) = ∑_j P(X=xi, Y=yj)
- P_Y(yj) = ∑_i P(X=xi, Y=yj)

### distribuciones condicionales
probabilidad condicional aplicada a variables: la conjunta dividida la marginal de la condicion
$$P(X/Y=y_j) = \frac{p_{XY}(x_i,y_j)}{P_Y(y_j)}$$
dada esta nueva v.a. se definen igual su esperanza y varianza condicionadas

### independencia entre variables aleatorias
$$P(X=x_i/Y=y_j) = P(X=x_i) \iff p_{XY}(x_i,y_j) = P_X(x_i)\cdot P_Y(y_j)$$
la conjunta es el producto de las marginales
basta encontrar UN par (xi, yj) que no cumpla para descartar independencia

todo lo anterior se extiende de forma natural a variables continuas: densidad conjunta, marginales y condicionales (integrales en vez de sumas)

### relacion lineal entre dos v.a.
covarianza: medida de la variacion conjunta entre dos variables, dos a dos
$$Cov(X,Y) = E(XY) - E(X)E(Y)$$
- positiva: crecen o decrecen juntas (nube creciente)
- negativa: cuando una crece la otra tiende a decrecer (nube decreciente)
- repartida alrededor de 0: sin relacion lineal
desventajas: depende de las unidades de medida y no esta acotada, no permite decir si la relacion es alta o baja

coeficiente de correlacion: normaliza la covarianza para cuantificar la relacion lineal
$$r = \frac{Cov(X,Y)}{S_x S_y} \text{(muestral)} \qquad \rho = \frac{Cov(X,Y)}{\sigma_x \sigma_y} \text{(poblacional)}$$
toma valores entre -1 y 1:
- r = 1: dependencia funcional lineal directa perfecta (recta creciente)
- 0 < r < 1: correlacion positiva, mas fuerte cuanto mas cerca de 1
- r = 0: sin correlacion lineal (pero puede existir otra dependencia funcional, ej cuadratica)
- -1 < r < 0: correlacion negativa (inversa)
- r = -1: dependencia funcional inversa perfecta (recta decreciente)
se analiza con diagramas de dispersion