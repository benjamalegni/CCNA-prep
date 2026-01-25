### concepto
- se usan para modelar el flujo de control de una operacion
- muestran los mensajes intercambiados entre un conjunto de objetos para realizar una tarea especifica
- parte de los diagramas de interaccion de UML:
	- secuencia: hace enfasis en el orden en que se envian los mensajes
	- colaboracion: hace enfasis en la organizacion estructural de los objetos
- tiene 2 componentes principales:
	- objetos
	- mensajes

## objetos
- son instancias de las clases contenidad en un diagrama de clases
- graficamente el objeto se dibuja como una rectangulo con su nombre de instancia y clase subrayados
	![[Pasted image 20241015202727.png]]
- la linea de vida indica el tiempo durante el que existe el objeto

## mensajes
- los mensajes son la especificacion de la comunicacion entre objetos
- permiten modelar distintos tipos de acciones
	- call: invocacion de una operacion de un objeto
	- return: valor de retorno de una operacion
	- create: creacion de un objeto
	- destroy: destruccion de un objeto
![[Pasted image 20241015202904.png]]

``` java
public class PasajeFerry{
	private int id;
	private float precio;
	private Pasajero pasajero;
	private Date date;

	public String toString() { return "Precio: "+precio+" Fecha: "+date +" Pasajero: " +pasajero.getNombre()+" "+pasajero.getApellido(); } 
}

public class Pasajero{
	private String nombre;
	private String apellido;

	public String getNombre(){
		return nombre;
	}

	public String getApellido(){
		return apellido;
	}
}

```

el diagrama de secuencia inicia cuando un objeto p de la clase PasajeFerry recibe el mensaje toString()
![[Pasted image 20241015203318.png]]

### diagrama desde codigo fuente
- hagamos el diagrama de secuencia que inicia cuando un objeto p de la clase Puerta recibe el mensaje validarEntrada con el String "12345" como parametro

``` java
public class Puerta{
	private ControlDePuerta control;

	public void validarEntrada(Object o){
		String dni = (String) o;
		Empleado e = this.obtenerDatos(dni);
		boolean tienePermiso = this.validarDNI(dni);

		if(tienePermiso){
			control.abrir(this);
		} else{
			this.solicitarPermTemporal(e);
			control.abrir(this);
		}
	}

	public void solicitarPermTemporal(Empleado e){
		PermisoTemporal permiso = new PermisoTemporal();
		permiso.set(this);
		permiso.setDesde(Date.HOY);
		permiso.setHasta(Date.MANIANA);
		permiso.setDescripcion("");
		e.agregar(permiso);
	}
}
```

![[Pasted image 20241015204228.png]]

## frames
- se usan para representar if/else, while, for...
- operadores
	- alt: es para multiples fragmentos. solo ejecuta el de la condicion verdadera
	- opt: un unico fragmento que solo ejecuta cuando la condicion es verdadera
	- loop: es un fragmento que se ejecuta multiples veces
 ![[Pasted image 20241015204436.png]]
 ![[Pasted image 20241015204455.png]]
