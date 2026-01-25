# Recursion

## Cuando usar recursion y cuando no

- la estructura de la funcion es recurrente y el algoritmo resulta mas sencillo
- la estructura de datos es recursiva

- hay dificultad en la compresion del algoritmo
- produce demandas excesivas de memoria o tiempo de ejecucion

## Ejemplo factorial:

```pascal
function fact(i:integer):integer;
begin
	if i=0 then
	fact:=1
	else
	fact:=i*fact(i-1);
end;
```

## Ejemplo recorrer lista:

```pascal
procedure implista(p:puntlista);
begin
		if (p<>nil) then begin
		writeln(p^.dato);
		implista(p^.sig);
		end;
end;
```

### Mostrar datos invertidos

```pascal
procedure implistainv(p:puntlista);
begin
	if (p<>nil) then begin
		implistainv(p^.sig);
		writeln(p^.dato);
	end;
end;
```

## Caracteristicas a tener en cuenta:

- un modulo recursivo debera tener una condicion de corte con asignacion de resultado. Osea una condicion y un camino posible con el cual se pueda ejecutar sin invocar la misma funcion y otro que si la invoque. Si simpre se invocara, se haria un bucle infinito por eso es importante plantear ese corte
-