# Ejecucion dinamica vs estatica

## cambios en tiempo de ejecucion

- hacer algo dinamico
- se puede cambiar algo sin tener que crear un objeto nuevo
- por ej valores de atributos

para cambiar el nombre de una persona cualquiera (clase) no pensamos en crear una persona nuevo con un nuevo nombre

xx = new Persona(”Carlos”);

el nombre de la persona apuntado por la variable xx paso de ser luis a carlos

pero presenta varios problemas

se creo un nuevo objeto el cual tiene el nombre Carlos y la varible xx apunta a ese objeto (ademas es una superclase). los demas objetos no se enteraron del cambio, por lo tanto si a cata se le pide el nombre del padre sigue siendo luis

lo que se hace normalmente: al cambiar un atributo de un objeto usamos el set de la clase

xx.setNombre(”Carlos”)

en este caso los demas objetos se enteraron del cambio, por lo tanto si a cata(hija de carlos) se le pide el nombre del padre devuelve el valor actualizado

### atributo vs comportamiento

- para cambiar el valor de un atributo no pensamos en crear un nuevo obj sino usar set
- que pasa cuando pensamos en cambiar el comportamiento de un objeto? es decir si antes algo se ordenaba por prioridad ahora queremos que sea por memoria?

### procesadores

abstraer a la clase de la forma de almacenamiento de las tareas

el procesador no tiene por que involucrarse fon Formas de guardar elementos

surge Cola de Tareas. se separa la funcionalidad de Procesador de la del almacenamiento

se delega la responsabilidad propia del ordenamiento a la cola de Tareas

si se cambia la cola de tarea con la que trabaja el procesador se puede cambiar la forma de orden que este utiliza , pero no se crea un objeto procesador nuevo

### empleados

una empresa tiene un grupo de empleados, de las cuales guarda nombre, dni y sueldo. algunos empleados cobran un sueldo fijo. hay otros empleados que cobran un sueldo fijo mas un monto x hora extra y otros que cobran un sueldo fijo mas una comision x ventas