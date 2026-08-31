regresion: estima un valor numerico continuo
clasificacion: clasifica en clases discretas

## gradiente descendente
el gradiente descendente es un algoritmo de optimizacion iterativo que encuentra de forma automatica el valor minimo de una funcion matematica

minimina el error cuadratico medio
- es importante el error cuadratico medio porque devuelve una funcion convexa
![[Pasted image 20260828183742.png]]
![[Pasted image 20260828184111.png]]
lo que multiplica a alfa en esta formula es la derivada
![[Pasted image 20260828184256.png]]

%%>que pasa si quiero minimizar una funcion que no sea el mse? %%

osea a w se le resta la pendiente de la recta y por ende se acerca al minimo local
el gradiente descente cumple con cualquier funcion de perdida que cumpla con las condiciones
1. diferenciabilidad
2. escalar
usos comunes fuera de mse:
- binary cross-entropy (log loss)
- categorical cross-entropy
- MAE
- huber loss


el learning rate define las modificaciones que va a hacer en cada paso del gradient descent. es un **hiperparametro**

el problema es cuando hay mas de un minimo local
![[Pasted image 20260828185242.png]]

### regresion lineal multiple
asi se ve cuando hay varias features
![[Pasted image 20260828185826.png]]

### regresion polinomial
se usan features polinomiales
se adapta mejor a datos con formas curvas
### regresion logistica
quiero estimar una clase con un valor numerico (la probabilidad de que pertenezca a determinada clase)
refiere a problemas de clasificacion

funcion sigmoidea
- devuelve un valor entre 0 y 1
- su resultado se puede interpretar como una probabilidad

**usamos la funcion sigmoidea por encima de la funcion lineal**
y nos da como resultado la probabilidad de que el X pertenezca a una clase

limite de decision lineal es la reacta que separa las diferentes clases de datos

tambien se puede hacer regresion logistica no lineal
![[Pasted image 20260828201143.png]]

***funcion de costo***
ya no sirve la funcion de costo cuadratica porque ya no es convexa cuando uso la funcion sigmoidea
%%> por que no sirve exactamente?%%
![[Pasted image 20260828201529.png]]
esta si es una funcion convexa
![[Pasted image 20260828201715.png]]

# perceptron
el primer modelo formal de neurona artificial
![[Pasted image 20260828202800.png]]
%%> que es la union sumadora y funcion de activacion?%%

hasta la funcion de activacion esto es igual hasta la regresion lineal
si se usa una funcion sigmoidea como funcion de activacion es lo mismo que 
la funcion de activacion escalon dejaba como salida 0 o 1
![[Pasted image 20260828203304.png]]

los perceptrones se conectan entre ellos formando una red



