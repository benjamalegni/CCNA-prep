# python - datos complejos
- tuplas: permite almacenar varios datos inmutables:
	- ```python
	  >>> mi_tupla = ('cadena de texto', 15, 2.8, 'otro dato' , 25) 
	  >>> print(mi_tupla[1]) # 15 
	  >>> print(mi_tupla[1:4]) # (15, 2.8, 'otro dato') 
	  >>> print(mi_tupla[3:]) # ('otro dato', 25) 
	  >>> print(mi_tupla[:2]) # ('cadena de texto', 15)
	  ```
- listas: 
	- ```python
	  >>> print(mi_lista[1:4]) # [15, 2.8, 'otro dato']
	  ```
- diccionarios: guardan valores en pares key:value
	- ```python
		mi_mapa = {'clave_1': valor_1, 'clave_2': valor_2, 'clave_7': valor_7} 
		vacio = dict()
	  ```
## elementos del lenguaje:
- asignacion multiple:
	- ```python
	  a, b, c = 'string', 15, True
	  ```
- retorno multiple
	- ```python
	 def mi_funcion():
		 return 'Hola', 12, [1,2,3]
	 texto, numero, lista = mi_funcion()
	  ```
- parametros indeterminados por posicion:
	- ```python
	def indeterminados_posicion(*args):
		for arg in args:
			print arg
	indeterminados_posicion (5, "Hola", [1,2,3,4,5])
	  ```
- parametros indeterminados por nombre:
	- ```python
	def indeterminados_nombre(**kwargs):
		for kwarg in kwargs:
			print kwarg, "=>", kwargs[kwarg]
	indeterminados_nombre(n=5, c="Hola", l=[1,2,3,4,5])
	  ```
# pandas
datos como tablas
estructuras de datos:
- dataframe
- series

creacion de un dataframe:
 - como un diccionario mapeando nombres de columnas a sus respectivas series:
 - ```python
	   city_names = pd.Series(['San Francisco', 'San Jose', 'Sacramento'])
	   population = pd.Series([852469, 1015785, 485199])
	   pd.DataFrame({'City name': city_names, 'Population': population})
   ```
  - desde un archivo
  - ```python
    california_housing_dataframe = pd.read_csv("url.csv", sep=",")
    california_housing_dataframe.describe()
    ```

### funciones utiles de pandas
hist(name) - muestra al distribucion de valores de una columna
```python 
california_housing_dataframe.hist('housing_median_age')
```

acceso a datos:
- utilizando operaciones de diccionarios y listas
```python
cities['City name']
```
- utilizando operaciones de diccionarios y listas
```python
cities[0:2]
```

manipulacion de datos:
- agregar series a un df existente
```python 
cities['Area square miles'] = pd.Series([56.86, 176.42, 93.34])
cities['Population density'] = cities['Population'] / cities['Area square miles']
```
- apply() y funciones lambda
```python
population.apply(lambda val: val>1000000)
```
