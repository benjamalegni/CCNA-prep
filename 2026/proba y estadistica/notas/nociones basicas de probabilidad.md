la probabilidad estudia la incertidumble asociada a variables definidas a partir de experimentos aleatorios, y permite asignar una medida al grado de certeza de que dichas variables tomen un determinado valor

### fenomeno aleatorio
1. el experimento puede repetirse, y en las mismas condiciones cada vez
2. el conjunto de todos los resultados posibles del experimento es conocido
3. el resultado particular del experimento no puede predecirse

espacio muestral (s) => el cjto formado por todos los resultados posibles de un experimentos aleatorio
- cada resultado posible se le llama punto o elemento

los espacios muestrales pueden ser:
- discretos: puntos o elementos en el son contables o numerables. pueden ser finitos o infinitos
- continuos: los resultados estan en un intervalo de R, en un conjunto denso, no discreto. Por lo tanto siempre es infinito e innumerable

suceso o evento: subconjunto de elementos del espacio muestral

dos eventos son **mutuamente excluyentes** si la ocurrencia de uno implica la imposibilidad del otro (A ∩ B = ∅)
son **colectivamente exhaustivos** si entre todos cubren todo el espacio muestral (su union es Ω)

## sucesos o eventos
A siendo un suceso cualquiera
- suceso contrario o complementario (A^c)
	- es formado por los elementos que no estan en A
- suceso union (A U B)
	- formado por los elementos que estan en A o en B
- suceso interseccion
	- suceso formado por los elementos que estan en A y B

### leyes de conjuntos
- idempotencia: A U A = A ; A ∩ A = A
- asociativa: (A U B) U C = A U (B U C) ; (A ∩ B) ∩ C = A ∩ (B ∩ C)
- conmutativa: A U B = B U A ; A ∩ B = B ∩ A
- distributiva: A U (B ∩ C) = (A U B) ∩ (A U C)
- identidad: A U ∅ = A ; A ∩ Ω = A ; A ∩ ∅ = ∅ ; A U Ω = Ω
- complemento: A U A^c = Ω ; A ∩ A^c = ∅ ; (A^c)^c = A ; Ω^c = ∅ ; ∅^c = Ω
- de morgan: (A U B)^c = A^c ∩ B^c ; (A ∩ B)^c = A^c U B^c

para describir espacios muestrales se usan **diagrama de arboles**
- las probabilidades basicas con las que se ubican en el primer nivel del diagrama de arbol

principio fundamental de conteo: si un primer evento ocurre de n maneras, un segundo de m maneras, un tercero de r maneras, etc., entonces el numero de maneras en que pueden realizarse en ese orden es n·m·r

## def axiomatica de probabilidad (kolmogorov)

dado un espacio muestral s, se define una funcion de probabilidad P que asigna a cada suceso A un numero real P(A), que cumple:

- axioma 1 (no negatividad): P(A) >= 0 para todo suceso A
- axioma 2 (certeza): P(s) = 1
- axioma 3 (aditividad): si A1, A2, ... son sucesos disjuntos dos a dos (A_i ∩ A_j = ∅ si i ≠ j):
	- P(A1 U A2 U ...) = P(A1) + P(A2) + ...

todo lo demas se deduce de estos 3 axiomas

### propiedades derivadas de los axiomas

- P(∅) = 0
	- el suceso imposible tiene probabilidad 0
- P(A^c) = 1 - P(A)
	- A y A^c son disjuntos y entre ambos cubren s
- 0 <= P(A) <= 1
	- por los axiomas 1 y 2, usando la propiedad anterior
- monotonia: si A ⊆ B entonces P(A) <= P(B)
	- B = A U (B ∩ A^c), y B ∩ A^c es disjunto con A

- ***P(A U B) = P(A) + P(B) - P(A ∩ B)*** - > importante
	- aditividad para sucesos cualesquiera (no necesariamente disjuntos)
	- si son disjuntos, P(A ∩ B) = ∅ = 0 y queda la suma directa

### enfoques para determinar probabilidad
- clasico: $$P(A) = \frac{n(A)}{n(\Omega)}$$
	- casos favorables sobre casos igualmente posibles
	- debilidad: usa "igualmente posibles", que ya equivale a "con igual probabilidad" (define con lo definido); ademas los eventos reales no siempre son igualmente posibles
- frecuentista (von mises): $$P(A) = \lim_{n\to\infty} \frac{n(A)}{n}$$
	- se asocia a resultados de experimentos reales repetidos muchas veces, no solo a conteos teoricos en espacios muestrales
	- debilidad: supone que el experimento puede definirse con precision y repetirse infinitamente
ambas debilidades se superan con la definicion axiomatica (kolmogorov)

