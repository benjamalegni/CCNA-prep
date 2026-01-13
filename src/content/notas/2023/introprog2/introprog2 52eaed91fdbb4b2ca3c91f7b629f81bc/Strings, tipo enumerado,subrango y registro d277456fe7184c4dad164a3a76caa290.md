# Strings, tipo enumerado,subrango y registro

## Strings

Secuencia de caracteres de longitud variable
Max de 255 chars
String[10] tendría un máximo de 10 chars

Operador + sirve para concatenar strings

Operadores relacionales < <= > >= = <>
Se basa en el orden alfabetico
Todas las letras mayusculas estan primero

‘Z’ > ‘a’ true

Length(‘abcde’) 5
Copy(‘1234567’,3,2) ‘34’ recibe un string, la posicion de inicio y cuantos lugares va a tomar

Copy(‘abcdefg’,3,2) ‘cd’

## Tipos enumerados

No agrega nada que no se pueda hacer con los otros tipos de datos
La ventaja es que deja codigo mas claro

Type dia:(lunes,martes,miercoles,jueves,viernes,sabado,domingo)

Cada palabra tiene un numero que empieza desde 0

Dia := miercoles; tiene orden 2
Dia:= succ(dia); toma jueves con orden 3
Dia:= pred(dia); vuelve al miercoles con orden 2

No se puede hacer ni read ni write de dia

Los boolean son un enumerado que tiene false que es 0 y true que es 1

If (dia<sabado) then.. esta bien

For dia:=lunes to viernes do… esta bien

While dia < domingo do begin
Dia := succ(dia)….. esta bien

No se pueden repetir rotulas en distintos enumerados

Function esmenor(mes1,mes2:string):boolean;
Begin
If meses(mes1) < meses(mes2) then
Esmenor:=true
Else
Esmenos:=false

end;

## Subrango

Provee mas control, seguridad y mejor manejo de codigo
Se puede usar sobre un entero o un char o un enumerado y pascal lo sabe automaticamente
En vez de definir que el integer vale uno se pone que vale 1 en 31 por ej
Representa un rango de un tipo, osea una sucesion de valores consecutivos

Type:Notas=0..10 (tipo base:integer)
Type:año=1800..2050 ( tipo base integer)

## Registro record

Estructurado heterogeneo

type alumno = record
Nombre: string[30];
Apellido: string[30];
Dni:integer;
End;

Var misdatos:alumno;

Misdatos.nombre := benja;
Misdatos.apellido := malegni;

Type fecha= record
Dia:1..31;
Mes:1..12;
Año:1950..2050;
End;

Type tipofactura=record
Emision: fecha;
Cliente:integer
…
End;

Var Unafactura:tipofactura;

Dentro de un registro no se puede usar pilas,fila Ni files

Un registro se puede usar dentro de otro registro, dentro de un array y dentro de un archivo

Type datos=record
Dni:integer;
Nrolibreta:integer;
Nombre: string[30];
Apellido: string[30];
Comision: integer;
Promedio: real;
End

Type alumnosintro=file of datos;

Var alumnointro1:alumnosintro;
Indice:integer;

Begin
Assign(alumnointro1, ‘ubicacion’);
Rewrite(alumnointro1);
For indice:=1 to 10 do begin
Leeralumno(alumnointro1);
Write(alumnos,alumno)

Procedure leeralumno(var alu:alumno)
Se hace un read de cada uno de las partes del record

Assign