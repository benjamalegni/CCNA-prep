libreria geneticalgorithm (no es tan avanzado ni flexible)

implementacion de un simple algoritmo genetico
- problemas de optimizacion
- variables reales, enteras o mixtas
- parametro para configurar el algoritmo

estructura del cromosoma:
- numpy.array de dimension n
- puede tomar valores "reales", "int", "boolean", "mixed"
- rango de cada gen del cromosoma
	- \[[ini1 , fin1 ], [ini2 , fin2 ],…[inin , finn ]]

funcion fitness:
def f(X):
	return np.sum(X)
esta funcion es la suma de los elementos solamente (solo aplica a este problema)

- X es un individuo/cromosoma
- retorna valor numerico

llamar al algoritmo
- Import
	 from geneticalgorithm import geneticalgorithm as ga
- Creación del modelo
	 model=ga(function=f, dimension=3, variable_type='real', variable_boundaries=varbound)
- Ejecución del modelo
	 model.run()
	 convergence=model.report
	 solution=model.output_dict

parametros:
- max_num_iteration (def. None) 
	- None: setea un número de interacciones en base a dimensiones, rangos y tamaño de la población. 
- population_size (def. 100) 
	- Número de soluciones en cada iteración 
- mutation_probability (def. 0.1) 
	- Probabilidad de cada gen en cada individuo de mutar.
- elit_ratio (def. 0.01) 
	- Determina el porcentaje de “elite” en la población. 
- crossover_probability (def. 0.5) 
	- Determina la probabilidad de una solución a pasar su genoma a una nueva solución. 
- parents_portion (def. 0.3) 
	- Porción de la población que se completa con miembros de la generación previa.
- crossover_type: (def. uniform) 
	- Tipo de crossover: 
		- one_point 
		- two_point 
		- uniform 
- max_iteration_without_improv (def. None) 
	- Número de iteraciones sin mejoras para terminación del algoritmo.