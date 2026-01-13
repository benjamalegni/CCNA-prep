# ejercicio Procesador

a un procesador se le asignan tareas, las mismas poseen una prioridad, uso de memoria y uso de cpu. El procesador x ordenas las tareas de acuerdo a la prioridad de las mismas, mientras que otros procesadores las ordenan por uso de cpu o uso de memoria

primer aproximacion:

![Untitled](ejercicio%20Procesador%2061aeebf9722045c4a7aa32f20839c60c/Untitled.png)

clase processor

```java
public class Processor{
	Vector tasks;
	public Processor(){
		tasks=new Vector();
	}
	
	public void execute(){
		if(tasks.size()>0){
			Task next=(Task)tasks.elementAt(0);
			tasks.removeElementAt(0);
			next.execute();
		}
	}
	
	public void addTask(Task task){
		int i=0;
		while ((i<task.size()) && (task.getPriority()>(Task)tasks.elementAt(i).getPriority())
			}
		i++;
}
tasks.insertElementAt(task,i);
//solo ordena por prioridad
```

![Untitled](ejercicio%20Procesador%2061aeebf9722045c4a7aa32f20839c60c/Untitled%201.png)

```java
public void addTask(Task tarea){
	int i=0;
	while ((i<tasks.size())&&(tarea.getMemory()<((Tarea)tasks.elementAt(i)).getMemory()))
	i++;
}
	if(i<tasks.size()){
		tasks.insertElementAt(tarea,i);
	} else{
		tasks.add(tarea);
	}
	
}
```

abstraccion del metodo add

```java
public void addTasks(Task tarea){
	int i=0;
	while(i<tasks.size()&&(this.compare (tarea,((tarea)tasks.elementAt(i))))){
		i++;
	}
	
	if(i<tasks.size()){
		tasks.insertElementAt(tarea,i);
	} else{
		tasks.add(tarea);
	}
}
```

![Untitled](ejercicio%20Procesador%2061aeebf9722045c4a7aa32f20839c60c/Untitled%202.png)

clase CPUProcessor debe implementar el metodo abstracto compare

```java
public boolean compare(Task t1, Task t2){
	return t1.getCPU()<t2.getCPU()'
}

//solo provee la comparacion con el cpu de la tarea
```

ahora se quere incorporar un procesador que agrega las tareas por orden de llegada

la tarea nueva va siempre al final de la lista de tareas

![Untitled](ejercicio%20Procesador%2061aeebf9722045c4a7aa32f20839c60c/Untitled%203.png)

```java
public class OrderProcessor extends Processor{
	@Override
	public void addTask(Task tarea){
		tasks.add(tarea);
	}
	
	public boolean compare(Task t1, Task t2){
		return false;
	} //igual debe implementarlo porque es abstacto en Processor
}
```