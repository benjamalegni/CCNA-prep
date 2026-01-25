# Punteros y listas

tipos de memoria;

-estatica:

- se asigna memoria cuando se define la variable
- no se puede usar mas de lo definido, tampoco menos. Es necesario marcar limites
- arreglos, matrices, variables de tipo integer, record.

-dinamica:

- se asigna memoria en ejecucion (por demanda)
- no se asignan ni mas ni menos de lo necesario
- su uso es mas engorroso
- se hace mediante el mecanismo de punteros

## puntero:

es un tipo de variable en el cual se almacena la direccion a un dato (simple o compuesto). Permite manejar direcciones ‘apuntando’ a un elemento.

asignacion en memoria dinamica

```pascal
type
tipofactura = record
	numero:integer;
	importe:real;
	tipo:char;
end;

var
	factura1:tipofactura;
	factura2:tipofactura;
	lafactura: ^tipofactura;

begin
	new(lafactura);
	lafactura^.numero:=34;
```

si se abre mas de una vez el new, el puntero queda inaccesible

```pascal
type
listafactura=^tipofactura
 
tipofactura = record
	...
	siguientefactura:listafactura;
end;

begin
	new(lafactura);
	lafactura^.numero:=34;
	new(lafactura^.siguientefactura);
```

analizar este codigo

```pascal
program CrearListaSinProcedures;
{ Este programa crea una lista de enteros de longitud variable hasta que el usuario entre un valor menor o igual a cero}
type
		PuntNodo = ^NodoLista;
		NodoLista = Record
			Nro :Integer;
			sig :PuntNodo
end;

var
	Lalista, cursor: PuntNodo;
	valor: integer;

begin
Lalista:= nil;
readln(valor);

if valor > 0 then begin { creo primer nodo de la lista}
	new(Lalista);
	laLista^.Nro:= valor;
	laLista^.sig:= nil; {no hay otro nodo}
	cursor:= Lalista; {guardo en cursor el INICIO de la lista}
	readln(valor);
		While (valor > 0) do begin
				new(cursor^.sig);
				cursor:= cursor^.sig;
				cursor^.Nro:=valor;
				cursor^.sig:=nil;
				readln(valor);
		end; { del while}
end; { del if}

end.
```

recordar

- diferenciar el puntero inicial de los auxiliares para los recorridos
- cuidar el uso del inicial. nunca perder el primer nodo
- nombres significativos a los punteros para no confundirse ni confundir
- crear los punteros con new o inicializar a nil.

## borrar un nodo

para borrar un nodo es necesario pararse con el cursor desde el principio e ir avanzando por los nodos hasta que este en el anterior del nodo que quiero borrar

cuando se borra 

```pascal
aEliminar:=cursor^.sig;
cursor^.sig:=cursor^.sig^.sig;
dispose(aEliminar);
aEliminar:=nil;
```

se le asigna nil a aEliminar porque el nodo al que apunta ya no existe.

## alta de un nodo

```pascal
aAgregar^.sig:=cursor^.sig;
cursor^.sig:=aAgregar;
```

## punteros como parametros

- por referencia: se pasa la propia variable, por lo que toda la modificacion impactara de igual forma que si estuviera en el modulo invocador.
- por copia: se pasa una copia de la variable, por lo que toda modificacion de su valor no impactara, pero si todos los cambios que se hagan en los nodos de la lista. lo que se copia es el puntero, no todos los nodos, por eso si se modifica algun nodo en la copia, se modifica en el original.