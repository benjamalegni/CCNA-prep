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

tipos de layers:
proceso de feature extraction en una CNN
1. conv layer: filtrar una imagen para un feature particular
2. activacion (ReLU): detectar ese feature dentro de la imagen filtrada. introduce no linealidad
3. pooling: condensar la imagen para mejorar los features
4. dense layers: combinan features y clasifican
![[Pasted image 20260909161854.png]]

**conv + ReLU**
- ReLU:
	- introduce no linealidad al modelo
	- ayuda a solucionar el problema de vanishing gradient
		- osea cuando los valores de los gradientes se vuelven tan pequenos en las capas inciales durante la retropropagacion que el modelo deja de aprender

**pooling layers:**
generalmente se las mete dentro de la layer convolucional (porque no tiene parametros para entrenar)
- max pooling (una de las formas mas usadas en pooling layers):
	- mira una region y escoge el pixel con mas intensidad
	- resalta los features
- average pooling: 
	- se genera un promedio de los valores
![[Pasted image 20260909162349.png]]
las variablas f y s. son cosas que tengo que definir, **pero se usan valores estandar generalmente para casos generales**

![[Pasted image 20260909162525.png]]
la ReLu lo que hace es poner en 0 todo lo negativo. por eso el resultado en las imagenes inferiores

evolucion del diseno de CCNs modernas
- kernels pequenos (3x3): estandar actual -> menos parametros, mas eficiencias
- mas capas -> mas profundiad = patrones jerarquicos mas complejos
- stacking: varias convoluciones seguidas antes de poolin -> representaciones mas ricas

**dense layers:**
- flatten -> convierte los mapas de caracteristicas en un vector
- capas densas -> combinan toda la info
- softmax en la salida -> distribucion de probabilidades por clase

**keras**: existe conv2D y conv3D(para videos, o imagenes medicas)

##### dense vs CNN
que pasa con MNIST con dense vs CNN?
- red densa simple: muchos parametros -> pero no escala bien
- CNN simple: menos parametros, mejor precision

nota: casi siempre se esta usando la funcion de perdida: categorical_crossentropy

##### callbacks (codigo)
**callbacks, permiten hacer algo en el medio del entrenamiento:**
- EarlyStopping: supervisa la metrica val_loss. si no mejora durante 8 epochs, detiene el entrenamiento y restaura automaticamente los mejores pesos alcanzados

### regularizacion en CNNs
dropout: apagar neuronas aleatoriamente durante el entrenamiento -> evitando overfitting
en CNNs se puede aplicar:
- en capas densas finales
- en capas convolucionales (menos usual, pero posible)