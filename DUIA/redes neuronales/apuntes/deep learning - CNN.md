redes neuronales convolucionales

las redes neuronales densas tenian varias neuronas y cada layer tenia varias neuronas que actuaban en paralelo
# CNN
en imagenes necesito saber que habia en pixeles que estan en otras neuronas, necesito contexto
este tipo de redes neuronales aprovechan patrones locales y comparten pesos

como se representaria una imagen en una red densa?
![[Pasted image 20260907103456.png]]

se busca separar la parte de feature extraction de la parte de la red densa
### CNN - arquitectura basica
![[Pasted image 20260907103655.png]]


#### imagenes como datos
![[Pasted image 20260907103807.png]]


### operador convolucional
es un filtro que se desliza por la imagen, multiplicando y sumando valores
luego genera un feature map
permite detectar patrones locales (bordes, texturas, formas simples)

**el tipo de multiplicacion que hacen no es multiplicacion de matrices comun, se le llama producto de Hadamard o correlacion cruzada, osea multiplica elemento a elemento**

![[Pasted image 20260907104443.png]]



### filtros convolucionales
en imagenes rgb, se pueden utilizar diferentes filtros en cada canal

**kernels como matrices de pesos entrenables**:
- podemos tener una matriz de pesos `w`, que describiran el filtro
- estos pesos son entrenables
- cada capa aprende patrones cada vez mas complejos

feature maps:
- cada filtro genera un mapa de caracteristicas distinto
- resaltan donde aparecen ciertos patrones de la imagen
- son la traduccion intermedia entre imagen y clases
### padding y stride
padding surge para evitar la perdida de datos

![[Pasted image 20260907105820.png]]

*se agregan bordes a la imagen*
- padding 1: un borde de 1 pixel
- padding 2: un borde de 2 pixeles
- etc

- valid convolution: sin padding
- same convolution: con el padding necesario para conservar el tamano de la imagen original

stride: controla el paso que da el filtro
- stride 2: 2 pixeles a la derecha y cuando llego al final de la fila, 2 pixeles abajo
![[Pasted image 20260907110054.png]]

calculo del tamano de la salida
![[Pasted image 20260907110134.png]]

# arquitectura basica de una CNN
lo que esta arriba (de operador convolucional) es la parte que se encarga del feature extraction

CONV layer:
- la misma imagen entra en paralelo a distintos filtros
	- cada salida genera un feature map
![[Pasted image 20260907110535.png]]
