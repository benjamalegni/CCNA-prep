son condiciones (reglas o chequeos) que restringen los valores posibles de datos en la BD

el dbms evita manipulaciones de datos que no verifiquen las restricciones de integridad especificadas en la BD:
- rechazando operaciones (altas, bajas, modificaciones)
- realizando acciones reparadoras sobre los datos
ambas respuestas deben dejar las BD en un estado consistente

## tipos de restricciones de integridad

por su naturaleza:
- RI inherentes o implicitas: no requieren ser especificadas (valores de atributo atomicos, una relacion no puede tener tuplas duplicadas)
- RI explicitas: expresadas en el modelo de datos, deberan especificarse mediante el DLL (restricciones de dominio, de clave, de nulidad, de integridad referencial)
- RI semanticas o "reglas de negocio": establecen restricciones a incorporar a la BD
	- se pueden plantear en forma declarativa o procedural

por los estados involucrados:
- RI de estado: restringen los valores que pueden tomar los datos 
	- Unicidad: no puede haber claves repetidas
	- (No) Nulidad: el valor de un atributo (no) puede ser nulo
	- Dominio: los valores de un atributo deben pertenecer a un conjunto definido (Ej. un precio tiene 2 decimales y no puede ser negativo)
	- Cardinalidad de una relación: número de veces que una entidad participa de una relación (Ej: un empleado pueden estar en hasta 3 proyectos)
	- Participación en una relación: puede ser obligatoria u opcional (Ej: Un empleado debe/puede estar vinculado a un área)
- RI de transición: restringen los posibles cambios de valores entre estados sucesivos de los datos (Ej: el sueldo básico no puede decrecer) 
	   → implica conocer el estado “anterior” y el “nuevo” para compararlos  
	   este tipo de RI no pueden plantearse en forma declarativa sino procedural (vía triggers)

ejemplo:
```sql
CREATE TABLE Orders ( 
	OrderID int NOT NULL, 
	OrderNumber int NOT NULL, 
	CONSTRAINT PK_Order PRIMARY KEY (OrderID) 
	);
```
```sql
ALTER TABLE Employees 
ADD CONSTRAINT UC_Email UNIQUE (Email);
```

- RI referencial: previene tener entradas huerfanas y asegura consistencia logica entre tablas relacionadas
	- son condiciones sobre los valores de las claves extranjeras FK
	ejemplo:
```sql
CREATE TABLE Pedidos ( 
	pedido_id INT PRIMARY KEY, 
	cliente_id INT, total DECIMAL(10,2), 
	FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id) 
	ON DELETE RESTRICT -- Evita borrar clientes con pedidos activos 
	);
```

#### acciones referenciales (para RIR's)
rechazo de la operacion:
- NO ACTION: rechaza la operación si hay registros que referencian esa clave. Es la opción por defecto.
- RESTRICT: similar a NO ACTION, pero se chequea antes que otras restricciones.
acepta la operacion y realiza acciones reparadoras adicionales:
- CASCADE: propaga la operación. Si se borra/modifica el área, se borran/modifican también los empleados que la referencian.
- SET NULL: coloca NULL en la FK de los registros referenciantes. Solo funciona si la FK admite nulos.
- SET DEFAULT: coloca el valor por defecto en la FK. Solo funciona si hay default válido.

#### tipos de matching
afectan cuando la FK puede tener varias columnas y pueda contener null
indican los requisitos que deben cumplir con conjuntos de valores de la FK en R, respececto de los correspondiente en la clave referenciada en R'

- MATCH SIMPLE: opción por defecto. Si alguna columna de la FK es NULL, no se exige que el resto coincida con una clave existente.
- MATCH PARTIAL: si hay algunos valores no nulos, esos valores deben coincidir parcialmente con una fila de la tabla referenciada.
- MATCH FULL: o todos los valores de la FK son NULL, o todos deben estar completos y coincidir con una clave existente. No permite mezclas parciales de NULL y valores.
![[Pasted image 20260527184005.png]]