# attention
![[Pasted image 20260905104536.png]]
### self-attention
se utiliza cuando los vectores de entrada son de una sola sentencia
![[Pasted image 20260905104520.png]]

#### clasificador de self-attention
```python
i = Input((None,))
e = Embedding(len(words_id) + 1, 60, mask_zero=True, name='base_emb')(i)

# los elementos cero son considerados padding

dq = Dense(60) (e)
dk = Dense(60) (e)

att = Attention()([dq, dk])
attd = Dropout(0.1)(att)

d = GlobalAveragePooling1D()(attd)
d = Dropout(0.1)(d)
d = Dense(100)(d)
d = Dropout(0.1)(d)
d = Dense(1, activation='sigmoid')(d)
```
# tokenizacion
en vez de definir reglas manuales, la idea es descubrir como dividir el texto de alguna manera inteligente

## byte pair encoding
1. todos los tokens en training data van a vocaculario `v`
2. por `k` pasos:
	1. tokenizar los datos tomando el token mas largo
	2. contar la ocurrencias de tokens adyacentes
	3. elegir el par (l,r) que ocurra mas veces
	4. agregarlo al vocabulario `v <- V u {lr}`
3. retornar `v`
## wordpiece

## sentence piece

## tipo de atencion - bidireccional y causal
kvcache

# otros
ray.io sirve para como un framework de computo disenado para escalar workloads de AI y ML
