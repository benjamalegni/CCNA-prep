# acceder a datos
## cargar datasets
- OpenML.org 
- Google Drive 
- Scikit-Learn provee datasets propios 
	- sklearn.datasets 
		- Iris (Clasificación) 
		- Boston (Regresión) 
		- Diabetes(Regresión) 
		- Breast_Cancer (Clasificación)

la libreria pandas tiene 2 estructuras principales:
- series
- dataframes
provee funcionalidad para importar y exportar archivo hacia un dataframe

# analisis exploratorio de datos
pandas tiene un metodo "describe()" que permite generar estadisticas que quesumen la tendencia central, dispersion y la forma de distribucion de un conjunto de datos, excluyendo valores NaN

pairplot arma diagramas que representan pares de atributos graficamente

# preprocesamiento
scikit learn
- Preprocesamiento 
- Clasificación 
- Regresión 
- Clustering 
- Reducción de dimensionalidad 
- Detección de anomalías

## transformeres y preprocesamiento
scikit provee metodos fit y transform

fit: aprende de los valores
	- luego se podria hacer un fit parcial para valores nuevos que vayan surgiendo
transform: aplica la transformacion
## tratamiento de valores faltantes
primero preguntarse si es necesario completar esos datos

si es necesario cuando:
- si los datos son muy pocos
- si justo en las clases minoritarias existen atributos faltantes
- si hay un clase que tiene una excesiva cantidad de atributos faltantes se puede considerar borrar la clase

atencion a la fuga de datos cuando se hace tratamiento de los valores faltantes

## simpleImputer
permite completar valores faltantes
- mean, median, most_frequent, constant.
```python
import numpy as np
from sklearn.impute 
import SimpleImputer 

imp_mean = SimpleImputer(missing_values=np.nan, strategy='mean') 
imp_mean.fit([[7, 2, 3], [4, np.nan, 6], [10, 5, 9]]) 
SimpleImputer() 


X = [[np.nan, 2, 3], [4, np.nan, 6], [10, np.nan, 9]] 
print(imp_mean.transform(X)) 
[[ 7. 2. 3. ] 
[ 4. 3.5 6. ] 
[10. 3.5 9. ]]
```
el transform toma esos valores que aprendio en el fit y se aplica ese valor en los valores NaN de X
imp_mean.statistics_ mostraria los valores aprendidos con fit
Columna 1 → media = 7  
Columna 2 → media = 3.5  
Columna 3 → media = 6

## tratamiento de atributos categoricos
los algoritmos de ML (la mayoria) trabajan con datos numericos. hay que transformar aquellos que sean categoricos:
- ordinales
- nominales


## OrdinalEncoder
permite codificar atributos categoricos en valores numericos
```python
>>> from sklearn.preprocessing import OrdinalEncoder
>>> X = [['alto'], ['bajo'], ['medio']]
>>> enc = OrdinalEncoder (categories=[['bajo', 'medio', 'alto'])
>>> enc. fit (X)
>>> enc.transform([['alto'], ['bajo']])
	
array ([([2.],
		[0.]])`
```

## onehotencoder
permite codificar atributos nomicales, crea atributos ficticios por cada valor unico nominal que se quiera transformar

```python
>>> from sklearn.preprocessing import OneHotEncoder
>>> enc = OneHotEncoder(handle_unknown ='ignore')
>>> X = [['Celeste', 'a'], ['Blanco', 'b'], ['Celeste', 'c']]
>>> enc.fit(X)
>>> enc.categories_

[array (['Celeste’, 'Blanco'], dtype=object), array(['a', 'b', 'c'],
dtype=object) ]

>>> enc.transform([['Celeste', 'a'], ['Blanco', 'x']).toarray()
array(((1., 0., 1., 0., 0.], [0., 1., 0., 0., 0.]])

```

## codificacion de etiquetas de clase: LaberEncoder
```python
>>> from sklearn.preprocessing import LabelEncoder
>>> le = LabelEncoder ()

>>> le.fit(["paris", "paris", "tokyo", "amsterdam"])
>>> list (le.classes_)

['amsterdam', 'paris', 'tokyo']

>>> le.transform([ "tokyo", "tokyo", "paris"])

array ([2, 2, 11...)
```

# escalado de valores numericos
muchos modelos de ML son sensibles a la escala de los datos con los que se los entrena
○ StandardScaler ○ MinMaxScaler

## StandardScaler
Estandariza los datos transformándolos para que tengan media 0 y desviación estándar 1 (z-score). x′ = (x−μ) / σ

```python
>>> import numpy as np
>>> from sklearn.preprocessing import StandardScaler
>>> X = np.array([[10], [20], [30], [40], [501])
>>> scaler = StandardScaler()
>>> X scaled = scaler.fit_transform(x)
>>> X scaled
array ([[-1.41421356],                        
[-0.70710678],                                
[ 0.     1,                 
[ 0.70710678],
[ 1.4142135611]])

```

## MinMaxScaler
```python

>>> from sklearn.preprocessing import MinMaxScaler
>>> data = [[-1, 2], [-0.5, 6], [0, 101, [1, 18]]
>>> scaler = MinMaxScaler()

>>> print (scaler.fit_transform(data))

[[0. 0. ]

[0.25 0.25]

[0.5 0.5 ]

[1. 1. ]]
```

## discretizacion de valores continuos
Algunos algoritmos (p.e. reglas de asociación) no soportan valores numéricos continuos. KBinsDiscretizer permite agrupar datos continuos en intervalos. Estrategias: uniform, quantile, kmeans

## transformacion de multiples atributos: ColumnsTransformer
```python
>>> from sklearn.preprocessing import MinMaxScaler
>>> from sklearn.preprocessing import OneHotEncoder
>>> from sklearn.compose import ColumnTransformer
>>> t = [('cat', OneHotEncoder(), [5,6]), ('num', MinMaxScaler(),[0,1,2,3])]
>>> columnTransformer = ColumnTransformer (transformers=t, remainderipassthrough')
>>> dataset = columnTransformer.fit_transform (df)
```
aplica onehotencoder en columnas 5 y 6
aplica minmaxscaler en columnas 0,1,2 y 3

## pipelines 
permiten estructurar una secuencia de transformers con un predictor final (opcional)
```python
>>> from sklearn.preprocessing import StandardScaler
>>> from sklearn.compose import ColumnTransformer
>>> from sklearn.pipeline import make pipeline

# Creamos el pipeline

>>> pipe = make pipeline (
	SimpleImputer (missing values=np.nan, strategy='mean')
	ColumnTransformer (transformers= [(num', StandardScaler(),
	[1,2,31), remainder='passthrough')
)

>>> df = pipe.fit_transform(df)
```

# anotaciones practica
concatenar no es recomendable si trabajamos con clasificacion:
import pandas as pd
combined_data = pd.concat(\[X, y], axis=1)
combined_data

a veces hay que reconvertir a data frame para poder visualizar los datos normalmente 
```python
from sklearn.impute import SimpleImputer


imputer = SimpleImputer(missing_values=np.nan, strategy='mean') # mean, median, most_frequent, constant -> fill_value=25

print(X_con_nan.head())

imputer = imputer.fit(X_con_nan)

imputed_data = pd.DataFrame(imputer.transform(X_con_nan)) # transform retorna {ndarray, sparse matrix} con shape (n_samples, n_features_out)

  

print(imputed_data.head())

imputed_data.columns = X.columns # Agregamos nuevamente los nombres de las columnas

combined_imputed_data = pd.concat([imputed_data, y], axis=1)

  

print(combined_imputed_data)
```

column trasnsformer de sklean.compose:
	transforma columnas
```python
columnTransformer = ColumnTransformer([('stdscaler', StandardScaler(), [0, 1]), ('minmax', MinMaxScaler(), [2])], remainder='passthrough') # OJO, solo para probar los diferentes mecanismos!
```

**Transformación de datos de multiples atributos en pipeline(Scikit-Learn)**

```python
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline, make_pipeline
  
# Creamos pipelines de preprocesamiento tanto para datos numéricos como categóricos
numeric_features = ['sepallength', 'sepalwidth', 'petallength', 'petalwidth']
numeric_transformer = Pipeline(steps=[
('imputer', SimpleImputer(strategy='mean')),
('scaler', MinMaxScaler())])

categorical_features = ['color']
categorical_transformer = Pipeline(steps=[
('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
('onehot', OneHotEncoder())])

ordinal_features = ['size']
ordinal_transformer = Pipeline(steps=[
('imputer', SimpleImputer(strategy='most_frequent')),
('ord', OrdinalEncoder())])

preprocessor = ColumnTransformer(
transformers=[
('num', numeric_transformer, numeric_features),
('cat', categorical_transformer, categorical_features),
('ord', ordinal_transformer, ordinal_features)],remainder='passthrough')

# Creo el pipeline completo de preprocesamiento (sin predictor)
pipeline_completo = make_pipeline(preprocessor)
combined_data_transformado = pipeline_completo.fit_transform(combined_data)
  
# Obtengo nombres de columnas
column_names = pipeline_completo.get_feature_names_out()
  
# Creo DataFrame con nombres
dataset = pd.DataFrame(combined_data_transformado, columns=column_names)

dataset
```


como entrega, pegar el link al collab en tp 2.a dandole permiso de comentador a ariel