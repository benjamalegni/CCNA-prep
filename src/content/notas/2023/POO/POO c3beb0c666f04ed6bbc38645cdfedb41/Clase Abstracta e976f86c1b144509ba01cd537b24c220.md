# Clase Abstracta

### abstraccion

normalmente usamos la abstraccion para poder referirnos a algo enfocandonos en el aspecto que nos interesa y no en detalles innecesarios.

ejemplo: el concepto de mueble, si digo “para mudarme tengo que llevar todos los muebles”, me enfoco en lo que quiero decir y no en el listado de cada mueble y sus detalles (tipo de mueble, forma, color, etc)

## clase abstracta

en poo se pueden definir clases que representan un concepto abstracto

el concepto de figura geometrica es una clase abstracta

los conceptos abstractos no pueden ser instanciados

puedo tener instancias de una Figura?

la respuesta es NO porque como se calcula su area? cual es su perimetro? el concepto de figura me abstrae comportamiento comun y caracteristicas que deben tener las figuras

el circulo es un elemento concreto al cual le puedo preguntar su area, su perimetro

una clase abstracta es una clase que puede ser extendida, pero no se pueden crear intancias (no se le puede hacer new)

se usa la palabra clave abstract en la declaracion

```java
public abstract class Figura {...}
public abstract class Formula {...}
```

NO SE PUEDE CREAR INSTANCIA DE UNA CLASE ABSTRACTA, si se lo intenta hay error de compilacion

```java
Figura ff  = new Figura();
```

### metodo abstracto

una clase abstracta ademas de metodos(concretos) y atributos posee metodos abstractos 

el metodo abstracto solo puede ser declarado en una clase abstracta

dentro de una clase abstracta tambien se pueden definir metodos no abstractos pero no es una practica recomendableMa

un metodo abstracto define comportamiento comun de todos los objetos de las subclases concretas de la clase abstracta

```java
public abstract class Figura{
	public abstract double getArea();
}
```

si la clase posee un metodo abstracto, la clase es una clase abstracta y por ende debe declararse como abstracta

osea los metodos abstractos estan vacios, el metodo deja la responsabilidad en definir el comportamiento del metodo a las clases que la extienden

## clase abstracta - hijos

una clase que hereda de una clase abstracta debe implementar TODOS los metodos de la clase de la que quereda, o debe declararse abstracta

```java
public class Circulo extends Figura{
// Circulo debe implementar todos los metodos abstractos de Figura, getArea y getPerimetro
}
```

```java
public abstract class FigAreaFija extends Figura{
	double areaFija;
	public double getArea(){
		return areaFija;
	}
	//como no implementa getPerimetro, que tambien era abstracto, debe declararse abstracta la clase
}
```

```java
public class FiguraFija extends FigAreaFija {
//solo debe implementar un metodo abstracto getPerimetro, el otro ya lo implemento FigAreaFija

	double perimetro;
	public double getPerimetro(){
		return perimetro;
	}
}
```

## CUIDADOS

conceptualmente en poo no deben existir clases abstractas que no tengan al menos un metodo abstracto.

esto se aclara porque java permite clases abstractas sin metodos abstractos