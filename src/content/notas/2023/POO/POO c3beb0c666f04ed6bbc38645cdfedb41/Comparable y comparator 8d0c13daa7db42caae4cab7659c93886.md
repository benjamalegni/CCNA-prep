# Comparable y comparator

## comparable:

- cuando una clase implementa la interfaz Comparable esta oblgada a definir el metodo:
    
    public int compareTo(Object o)
    
- este metodo permite comparar instancias de dicha clase entre si. Por ejemplo, si mi clase Persona implementa Comparable, puedo hacer

```java
Persona p1 = new Persona(...)
Persona p2 = new Persona(...)
int comparacion = p1.compareTo(p1);
```

- si una clase implemente Comparable se habilita la posibilidad de usar el metodo Collections.sort(List) para ordenar listas de ese tipo de objetos

```java
ArrayList<Persona> personas = new ArrayList<>();
personas.add(p1);
personas.add(p2);
Collections.sort(personas);
```

- los elementos se ordenan segun la logica del compareTo
- si los objetos almacenados no son Comparable, entonces no puedo utilizar Collections.sort(List)
- Comparable solo me permite definir una forma de comparar los elementos (lo que me establezca el compareTo), y esa forma no puede cambiar
- si , por ejemplo, quiero modificar la forma en la que mi lista de Personas se ordena, no puedo hacerlo. Tengo que cambiar el compareTo y recompilar todo el codigo
- y si quiero cambiar la forma en la que se ordenan las personas? que hace cuando quiero que algo pueda cambiar dinamicamente?

## Comparator

- cuando una clase implementa la interfaz Comparator, debe implementar el metodo:
    
    public int compare(Object o1, Object o2);
    
- en este metodo, se comparan los dos objetos de la forma que se necesite, por ej puedo tener una clase:
    
    ```java
    ComparadorProcesosMemoria implements Comparator{...}
    ```
    
    que compare dos procesos segun su consumo de memoria. y otra clase:
    
    ```java
    ComparadoProcesosCPU implements Comparator{..}
    ```
    
    que compare mis procesos segun su consumo de CPU
    
- definir un Comparator me permite utilizar el metodo
    
    Collections.sort(List,Comparator)
    
- este metodo ordena los elementos de una lista (primer parametro), segun la manera de comparar los elementos de un comparator (segundo parametro)
- en este punto, al especificar un Comparator no es necesario que la clase de los objetos que se van a ordenar (por ej Proceso) sea Comparable
    
    

por ejemplo con Comparator puedo hacer

```java
ArrayList<Proceso> procesos = new ArrayList<>();
procesos.add(p1);
procesos.add(p2);

Comparator comparadorMem = new ComparadorProcesosMemoria();
Collections.sort(procesos, comparadorMem);

Comparator comparadorCPU = new ComparadorProcesosCPU();
Collections.sort(procesos, comparadorCPU);
```

- con este mismo metodo sort
    
    Collections.sort(List, comparator)
    
- puedo ordenar por orden inverso dado por el Comparable
    
    ```java
    Collections.sort(list, Collections.reverseOrder())
    ```
    
- y el orden inverso dado por un comparador dado:
    
    ```java
    ComparadorMemoria comp = new ComparadorMemoria()
    Collections.sort(list, Collections.reverseOrder(comp));
    Collections.sort(list,comp.reversed())
    ```
    

### para evitar hacer casting

- para evitar hacer casting de Object a la clase que queremos comparar, tanto en Comparable como en Comparator podemos indicar el tipo de clase que vamos a comparar

en comparable:

```java
public class Proceso implements Comparable<Proceso>{
	public int compareTo(Proceso otroProceso){...}
}
```

en comparator:

```java
public class ComparadorProcesoCPU implements Comparator<Proceso>{
	public int compare(Proceso p1, Proceso p2){...}
}
```

comparable vs comparator

| comparable | comparator |
| --- | --- |
| se utiliza para ordenar objetos con su orden “natural” | se usa para ordenar objetos de acuerdo a los valores de diferentes atributos |
| utiliza el metodo compareTo(Object otroObjeto) | utiliza el metodo compara(Object o1, Object O2) |
| esta en el paquete java.lang, junto a la clase Object | esta en el paquete java.util |
| debe ser implementado por la clase original, aquella que quiero que sus instancias se puedan comparar(ej: Persona, Computadora, Proceso) | no afecta a la clase original. se implementan clases independientes de la misma |