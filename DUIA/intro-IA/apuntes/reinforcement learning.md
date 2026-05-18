aprender a traves de la experiencia real
tenemos un agente realtivo que interactura continuamente con el ambiente y aprende esa interaccion

reactividad significa: elegir que actuara en base a las condiciones del ambiente y aprende de eso
![[Pasted image 20260516144148.png]]


q-learning: el algoritmo clasico basado en tablas para espacios de estados pequenos
- util para espacios de estados pequenos
deep RL: cuando usamos redes neuronales para manejar estados complejos (como pixeles en un video)

# objetivo
aprender a seleccionar las acciones que maximicen la recompensa
![[Pasted image 20260516144657.png]]

## proceso de decision de markov / q-learning
<S, A, P, r>
- S es un set de estados 
- A es un set de acciones 
- P es una función o matriz de probabilidades de transición 
	- P: S x S x A → \[0,1] 
- r es una función de recompensa (o castigo) 
	- r: S x A → ℜ 
- El agente quiere encontrar una política 𝜋: S → A
![[Pasted image 20260516144845.png]]

funciones valor optimas:
![[Pasted image 20260516151054.png]]

### ambientes deterministas
- una accion en un estado siempre produce el mismo resultado
- en estos casos, el valor Q puede actualizarse directamente con el valor esperado del siguiente estado
$$
Q(s,a) = r + γ · max Q(s',a')
$$
- `r`: recompensa inmediata.
- `γ`: factor de descuento.
- `max Q(s',a')`: mejor valor posible desde el nuevo estado.
### ambientes no deterministas
- una misma accion puede producir distintos resultados
- por eso no se reemplaza directamente el valor Q: se actualiza de forma gradual usando una tasa de aprendizaje α.
$$
Q(s,a) = Q(s,a) + α [r + γ · max Q(s',a') - Q(s,a)]
$$

- `α`: learning rate, controla qué tan rápido se actualiza lo aprendido.
	- 0<`α`<1 : learning rate
- El término entre corchetes representa la diferencia entre lo nuevo aprendido y lo que ya se sabía.

Q-learning garantiza convergencia de Q(s,a) a Q*(s,a), ***osea aprende correctamente si***:
- el ambiente se puede modelar como un MDP (markov decision process)
	- provee una manera formal para que un agente de IA interactue con el entorno, aprenda comportamientos y haga decisiones optimas para maximizar las recompensas.
- en cada actualizacion de `Q(s,a)`, el learning rate`α` debe cumplir:
	- `Σ α = ∞`: el agente nunca deja completamente de aprender.
	- `Σ α² < ∞`: pero aprende cada vez más lento, para que el ruido no lo desestabilice.
	- por ejemplo ```α = 1 / n(s,a)``` donde `n(s,a)` es la cantidad de veces que se visito el par estado-accion. entonces el alfa es cada vez menor, se aprende mas lento

## deep q-network
- recibe entrada el estado S y retorna el valor Q para cada accion posible
- 2 consideraciones importantes para DQN:
	1. aprender de pasos consecutivos sesga la red
		- para evitar eso DQN usa un replay buffer: una memoria donde se guardan las experiencias del agente. Cada experiencia con esta forma:
			```(S_t, a_t, r_t, S_{t+1})	```
			- `S_t`: estado actual.
			- `a_t`: acción realizada.
			- `r_t`: recompensa obtenida.
			- `S_{t+1}`: nuevo estado alcanzado.	
		- cuando el buffer se llena, las experiencias mas viejas son reemplazadas por las nuevas
		- DQN toma un conjunto aleatorio de experiencias del buffer, eso rompe la dependencia entre estados consecutivos
	2. la red objetivo (espejo): en q-learning estandar, el "objetivo" (target) depende de la misma tabla que estamos actualizando. se usan 2 redes:
		- q-network que se actualiza a cada paso de entrenamiento
		- target network que es una copia congelada de la anterior que se actualiza tras `k` pasos