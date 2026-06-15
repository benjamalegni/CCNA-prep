# espacios vectoriales
es un espacio vectorial solo si se puede:
- suma de vectores u+v pertenece al espacio vectorial
- producto por escalar λv pertenece al espacio vectorial

- generador es el conjunto de todas las combinaciones lineales de todos esos vectores:
	- osea ese conjunto generador puede generar cualquier combinacion lineal de todos sus vectores
	- cuando se pasa de un sistema a una matriz, se escriben los vectores generadores columna por columna, uno vector por cada columna

suma de subespacios vectoriales.
	significa juntar todos los generadores de ambos generadores.
	luego se usa gauss-jordan para ver cuantos de esos vectores son linealmente independientes

interseccion de subespacios S∩T
	se igualan las combinaciones lineales
	luego se pasa todo a un lado de la igualdad y se resuelve el sistema homogeneo

### bases 
es un conjunto de vectores generadores que:
- generan un espacio
- son linealmente independientes
- no son unicas, pero todas tienen la misma dimension

para encontrar una base:
- partiendo de un sistema de ecuaciones
- se despejan algunas variables. en w = (x,y,z,t) las variables libres son "y" y "t".
- puede quedar por ejemplo w = (-y-5/3t, y, -2/3t, t)
- eso se separa en terminos w = y (-1, 1, 0, 0) + t (-5/3, 0, -2/3, 1)
- la base resultante en este caso seria {(-1,1,0,0), (-5/3, 0, -2/3, 1)}

para entontrar una base:
- partiendo de vectores generadores
- una base del subespacio generando se obtiene tomando las columnas originales donde aparecen pivotes.
- por ejemplo en:
	(1, 0, 0, 0
	0, 1, 0, 0
	0 ,0, 1, 0
	0, 0, 0, 0)
- hay base con los vectores originales de las columnas 1, 2 y 3.
- el vector original de la columna 4 no pertenece a la base porque no tiene pivote
### dimension de espacio vectorial
esta dada por la cantidad de vectores que componen la base del espacio vectorial

dim(S+T) = dim(S) + dim(T) - dim(S∩T)
	
### complemento ortogonal:
$$
	S^\perp = \{ w \in \mathbb{R}^n : w \cdot v = 0,\ \forall v \in S \}
$$
	- por ejemplo: sea w=(x,y,z,t) perteneciente a R^4.  y con los vectores generadores (1,1,-1,1) y (1,1,2,3) se hace el calculo de v_1 = w*(1,1,-1,1) y v_2 = w*(1,1,2,3).
	- luego con esos valores obtenidos se busca encontrar una matriz escalonada

- Un vector 𝑣 ϵ 𝑆 y un vector 𝑤 ϵ 𝑆 ⊥ son ortogonales. Es decir, el producto entre los vectores es cero. Con lo cual, debemos verificar si los productos 𝑣1. 𝑤1, 𝑣1. 𝑤2, 𝑣2. 𝑤1 y 𝑣2. 𝑤2 son nulos. 
- Podemos verificar las dimensiones pues: dim(𝑆) + dim(𝑆 ⊥) = dim(ℝ4 ).


## transformaciones lineales
matrices asociadas a transformaciones lineales se obtienen transformando los vectores canonicos y escrtibiendo esos vectores en coordenadas de la base canonica

ejemplo
t(x, y) = (2x + 3y, x − 5y) 
t(1, 0) = (2 · 1 + 3 · 0, 1 − 5 · 0) = (2, 1) 
t(0, 1) = (2 · 0 + 3 · 1, 0 − 5 · 1) = (3, −5) 
Entonces: \[t] = \[ 2 3 
			1 −5 ]

la suma de dos transformaciones solo es posible cuando las matrices tengan la misma dimension

imagen de una transformacion lineal:
- es el resultado de aplicar la transformaciozn
preimagen de una transformacion lineal:
- todos los vectores que caen en H luego de aplicat T
preimagen se escribe como $$T^{-1}(H) $$

H = { (x,y) en R2 : 2x - y = 0 }

Entonces:

T^-1(H) = { (x,y,z) en R3 : T(x,y,z) pertenece a H }

Como:
	T(x,y,z) = (x - 2y + z, y + z)
pedimos que eso cumpla la ecuación de H:
2(x - 2y + z) - (y + z) = 0
- el 2 viene del coeficiente del x y el -1 viene del coeficiente de y

para encontrar una transformacion a partir de ecuaciones es util encontrar primero la base del subespacio

 Un vector (v distinto a 0) es autovector de (T) si al aplicarle (T), no cambia de dirección. Solo se estira, se achica o cambia de sentido



### cuando una matriz es diagonalizable
cuando por cada eigenvalue:
multiplicidad geometrica(eigenvalue) = multiplicidad algebraica

multiplicidad algebraica => el grado maximo del eigenvalue en el polinomio caracteristico
multiplicidad geometrica => son las variables que quedan libres luego de (A−λI)v=0


# proyeccion
no enroscarme con las formulas
ir directamente con esta: $$ P=A(A^{T}A)^{−1}A^{T} $$
