En redes, el **payload** es la **información útil** que se quiere transportar, excluyendo los datos de control.

Cuando un mensaje baja por las capas del modelo OSI:
- Cada capa **agrega su propio header** (y a veces trailer).
- El contenido que recibe una capa superior se convierte en el **payload** de la capa inferior.

### Ejemplo
- **Payload de Capa 4 (TCP/UDP)**: datos de la aplicación (HTTP, DNS, etc.).
- **Payload de Capa 3 (IP)**: segmento TCP/UDP completo.
- **Payload de Capa 2 (Ethernet)**: paquete IP completo.

### Idea clave
> El payload es el dato que **una capa encapsula y transporta**, mientras que los headers y trailers sirven para control y entrega.

En resumen, el payload es “lo importante” del mensaje desde el punto de vista de cada capa.
