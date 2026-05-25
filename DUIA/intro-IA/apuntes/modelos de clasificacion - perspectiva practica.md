# modelos principales
DecisionTreeClassifier
SVC
- kernels
Naive Bayes (asume que todas las clases son independientes de las otras, por eso naive)
- categorical BN: para atributos categoricos
- gaussianBN: asume que los atributos siguen una distribucion normal
- multinomialNB: disenado para que los datos que representan conteos de frecuencia
- bernoulliNB: se utiliza cuando las caracteristicas son binarias
KNN

| Modelo                     | Cuándo usarlo                                                                 | Preprocesamiento necesario                             | Ventajas                                                             | Desventajas                                                                         | Parámetros importantes                                                  |
| :------------------------- | :---------------------------------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| DecisionTreeClassifier     | Datos tabulares; cuando importa interpretar decisiones                        | Codificar categóricas; no necesita escalado            | Fácil de interpretar; captura relaciones no lineales; permite reglas | Tiende a overfitting; sensible a cambios en datos; puede generar árboles grandes    | criterion, max_depth, min_samples_split, min_samples_leaf, class_weight |
| RandomForestClassifier     | Buen modelo general para datos tabulares                                      | Codificar categóricas; no necesita escalado            | Más robusto que un árbol; reduce overfitting; buena precisión        | Menos interpretable; más costoso; muchas variables pueden hacerlo pesado            | n_estimators, max_depth, max_features, min_samples_leaf, class_weight   |
| KNeighborsClassifier (KNN) | Problemas simples donde la cercanía entre puntos tiene sentido                | Escalado obligatorio; codificar categóricas            | Simple e intuitivo; no entrena un modelo complejo                    | Predicción lenta; sensible a ruido, outliers y escala; sufre con muchas dimensiones | n_neighbors, weights, metric, p                                         |
| GaussianNB                 | Datos numéricos continuos que se parecen a distribuciones normales            | No requiere escalado obligatorio; manejar faltantes    | Muy rápido; funciona bien con pocos datos; útil como baseline        | Supone independencia entre atributos; asume distribución normal                     | var_smoothing                                                           |
| MultinomialNB              | Clasificación de texto con conteos o TF-IDF                                   | Vectorizar texto con CountVectorizer o TfidfVectorizer | Muy eficiente para texto; rápido; simple                             | No sirve bien con valores negativos; independencia fuerte entre features            | alpha, fit_prior                                                        |
| BernoulliNB                | Features binarias: presencia/ausencia de palabras o eventos                   | Binarizar atributos o usar representación booleana     | Bueno para texto binario; rápido                                     | Pierde información de frecuencia; independencia fuerte                              | alpha, binarize, fit_prior                                              |
| CategoricalNB              | Atributos categóricos discretos                                               | Codificar categorías como enteros; no usar one-hot     | Adecuado para variables categóricas puras                            | No sirve para variables continuas sin discretizar                                   | alpha, fit_prior, min_categories                                        |
| SVC                        | Clasificación con fronteras complejas; datos medianos; texto o alta dimensión | Escalado muy recomendado; codificar categóricas        | Muy potente; kernels permiten separar datos no lineales              | Puede ser lento; requiere ajustar parámetros; menos interpretable                   | C, kernel, gamma, degree, class_weight                                  |
| LogisticRegression         | Clasificación binaria o multiclase como baseline fuerte e interpretable       | Escalado recomendado; codificar categóricas            | Rápida; interpretable; devuelve probabilidades; buena baseline       | Frontera principalmente lineal; puede quedarse corta con relaciones complejas       | C, penalty, solver, max_iter, class_weight                              |

todos los modelos de clasificacion en scikit learn estan dentro de la categoria de predictores. tienen 2 metodos principales.
- fit(X, y). ejemplos X y clases y.
- predict(X'): permite predecir las clases de la matriz de ejemplos X', una vez entrenado.
```python 
>>> from sklearn.tree import DecisionTreeClassifier
>>> clf = DecisionTreeClassifier()
>>> X= [[1, 2, 3], # 2 ejemplos, 3 atributos
		[11, 12, 13]]

>>> y = [0, 1] # clases de cada elemento

>>> #Entrena el modelo

>>> clf.fit(X, y)
```
prediccion:
```python 
>>> clf.predict(X)
array([0,1])
>>> clf.predict([[4,5,6],[14,15,16]])
array([0,1])
```

se pueden usar pipelines que use transformers y predictores
```python
>>> from sklearn.preprocessing import StandardScaler
>>> from sklearn.pipeline import make_pipeline

>>> # Crea el pipeline
>>> pipe = make_pipeline(
>>>          StandardScaler(),
>>> 	     DecisionTreeClassifier()
>>> 	     )
>>>
```
# evaluacion
## metricas de evaluacion
- accuracy: entre los datos de testing y training resultantes del modelo
- precision (habilidad para no etiquetar con positivo un ejemplo negativo), 
- recall (habilidad para encontrar todos los ejemplos positivos)
- f-measure (media harmonica de precision y recall (con β=1 por defecto))

	precision, recall y f-measure pueden medirse en macro, average, micro

- ROC AUC
	- en problemas binarios
	- en problemas multiclase: OVR y OVO

### ROC AUC
con problemas multiclase
- se debe convertir el problema en un problema binario
	- one vs rest (OVR): calcula el AUC de cada clase contra el resto y luego promedia
	- one vs one (OVO): calcula el AUC entre pares de clase y luego promedia
## metodos de evaluacion
- macro: se calcula el promedio de las métricas binarias, con igual peso para todas las clases. 
- weighted: tiene en cuenta el desbalance de las clases, se calcula el promedio ponderado por la cantidad de instancias de cada clase. 
- micro: en lugar de sumar la métrica por clase, este método suma los dividendos y divisores que componen las métricas por clase para calcular un cociente general. Ej: Precisionmicro=∑TP / ∑(TP+FP) 
	- **En problemas multiclase, Precision_micro=Recall_micro=F1_micro=Accuracy**

### holdout
![[Pasted image 20260516164756.png]]
### crossvalidation 
pueden llegar a ser bastante costosos
- cross_val_score (accuracy)
	![[Pasted image 20260516164856.png]]

- cross_validate (no solo analiza accuracy como cross_val_score)
	![[Pasted image 20260516164934.png]]
	lista de metricas soportadas por cross_validate:
	- accuracy 
	- precision_macro, _micro, _weighted 
	- recall_macro, _micro, _weighted 
	- f1_macro, _micro, _weighted 
	- roc_auc 
	- roc_auc_ovo (one-vs-one) 
	- roc_auc_ovr (one-vs-rest)
- cross_val_predict
	![[Pasted image 20260516165131.png]]
	la funcion classification_report permite generar un reporte con metricas generales por clase, usando las predicciones generadas con cross_val_predict

NOTA: ejemplos de un mismo grupo no deben aparecer en training y testing
#### crossvalidation splitting
se particiona mediante el metodo split(X, y=None, groups=None)
hay distintos tipos:
- KFold: realiza split en k folds consecutivos
- StratifiedKFold: mantiene proporcion de clases en folds
- RepeatedKFold y RepeatedStratifiedKFold: repite n veces el metodo con diferentes splits
- GroupKFold y GroupStratifiedKFold: cada grupo aparece exactamente una vez en cada fold
![[Pasted image 20260516165635.png]]

### training, validation y testing
![[Pasted image 20260516165245.png]]
se separan de antemano datos se training y testing.
solo se hace el training con la seccion de los datos de training.
luego se compara el modelo con los datos de testing y se conoce el accuracy

# modelo final
![[Pasted image 20260516165730.png]]
```python
>>> import joblib
>>> # Crea el pipeline                
>>> pipe = make pipeline (             
>>>         StandardScaler(),
>>> 		DecisionTreeClassifier()                       
>>> 		)

>>> iris = load iris()

>>> # Entreno el modelo final        
>>> pipe.fit(iris.data, iris.target)

>>> # Persisto el modelo final
>>> joblib.dump (pipe, "pipeline final.pkl")
```
#### preguntas
- como funciona naive bayes => se basa en predicciones
- cross_validate y cross_val_score, parte los datos primero en distintos folds
	- elige un conjunto de training y separa un conjunto de los folds (creo que no parte 2 veces)
	- luego hace los fits del modelo con alguno de los folds
	- luego se analizan los resultados de las predicciones con distintas metricas
training, validation y testing
- se usa en competiciones de machine learning, donde se hace el folding con los datos ya definidos de training y despues se vuelve a comparar con los datos reservados de testing. https://mlcontests.com/


tp 4. 
a. definir clases categoricas (no intentar con parametros como el largo del cuerpo del pinguino)

consultas
tengo que transformar los datos de X_test tambien para poder usar predict? con transformar solo X_train tengo errores
accuracy 0.99 muy alta, me parece raro

acomodar pipeline
y usar cross validation
usar no random state para ver como varia el accuracy