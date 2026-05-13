# espacios vectoriales
- generador es el conjunto de todas las combinaciones lineales de todos esos vectores:
	- osea ese conjunto generador puede generar cualquier combinacion lineal de todos sus vectores

### bases 
es un conjunto de vectores generadores que:
- generan un espacio
- son linealmente independientes

para encontrar una base:
- partiendo de un sistema de ecuaciones
- se despejan algunas variables. en w = (x,y,z,t) las variables libres son "y" y "t".
- puede quedar por ejemplo w = (-y-5/3t, y, -2/3t, t)
- eso se separa en terminos w = y (-1, 1, 0, 0) + t (-5/3, 0, -2/3, 1)
- la base resultante en este caso seria {(-1,1,0,0), (-5/3, 0, -2/3, 1)}
### dimension de espacio vectorial
esta dada por la cantidad de vectores que componen la base del espacio vectorial
	
### complemento ortogonal:
$$
	S^\perp = \{ w \in \mathbb{R}^n : w \cdot v = 0,\ \forall v \in S \}
$$
	- por ejemplo: sea w=(x,y,z,t) perteneciente a R^4.  y con los vectores generadores (1,1,-1,1) y (1,1,2,3) se hace el calculo de v_1 = w*(1,1,-1,1) y v_2 = w*(1,1,2,3).
	- luego con esos valores obtenidos se busca encontrar una matriz escalonada

- Un vector 𝑣 ϵ 𝑆 y un vector 𝑤 ϵ 𝑆 ⊥ son ortogonales. Es decir, el producto entre los vectores es cero. Con lo cual, debemos verificar si los productos 𝑣1. 𝑤1, 𝑣1. 𝑤2, 𝑣2. 𝑤1 y 𝑣2. 𝑤2 son nulos. 
- Podemos verificar las dimensiones pues: dim(𝑆) + dim(𝑆 ⊥) = dim(ℝ4 ).