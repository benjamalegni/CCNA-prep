- una arquitectura de computadora se compone de un procesador, modulos de memoria y un conjunto de modulos de e/s
- sistema de interfaces de e/s conecta la computadora al mundo exterior
- los tipos de perifericos son diversos: teclado, monitos, impresora, scanner

dispositivos e/s son diversos en
- comportamiento: **entrada,salida,almacenamiento**
- usuario: **humano, maquina**
- tasa de datos: la velocidad maxima a la que se pueden transferir datos entre el dispositivo de e/s y la memoria principal o procesador
![[Pasted image 20250729163731.png]]

### medidas de performance
- ancho de banda (throughput) - **cantidad de info que puede ingresar (o salir) y ser comunicada a traves de una interconexion al procesador o memoria desde el dispositivo de e/s por unidad de tiempo**
1. vol de info transmitida en un cierto tiempo
2. numero de ops por unidad de tiempo

- tiempo de respuesta (latencia): **tiempo total que requiere realizar una op de entrada o salida**
	- este tiempo es muy importante cuando en el desarrollo de sistemas de tiempo real

- muchas apps requieren alto ancho de banda y bajos tiempos de respuesta


### performance
disenar un sistema de e/s que cumpla con las restricciones significa
1. encontrar el enlace mas debil del sistema (componente que limita el diseno)
	- procesador y sistema de memoria
	- la interconexion subyacente (bus)
	- los controladores de e/s
	- los dispositivos de e/s
2. reconfigurar el nodo mas debil para alcanzar los requerimientos de ancho de banda o latencia
3. determinar los requerimientos del resto de los componentes y reconfigurarlos para soportar la latencia o ancho de banda

### buses
es un canal de comunicacion compartido (conj reducido de cables que conecta multiples subsistemas) que soporta gran numero de dispositivos con latencias y tasas de transferencias de datos muy variadas

- pros:
	- versatil - se pueden agregar nuevos dispositivos de forma sencilla e intercambiarlos a otros sistemas de computadoras que usan el mismo standard de bus
	- bajo costo - un conjunto reducido de cables se comparten entre varios componentes
- cons:
	- crea un cuello de botella: el ancho de banda del bus limita el throughput maximo

velocidad maxima del bus esta limitada por
- longitud
- nro de dispositivos conectados al bus

**componentes**:
- lineas de direccion
- lineas de datos
- lineas de comando
- lineas de interrupcion
- lineas de acuse de interrupcion
- lineas de arbitraje de buses

## tipos de buses
**principal**: (propietario, de procesador-memoria)
- cortos y de alta velocidad
- adaptado al sistema de memoria para maximizar ancho de banda
- optimizado para transferencias de bloque de cache\
**backplane** (ATA, PCIexpress)
- se utiliza como bus intermedio que conecta buses de e/s al bus principal
**bus de e/s** (SCSI, USB, Firewire)
- generalmente es largo y lento
- soportan una amplia gama de dispositivos de e/s
- se conecta al bus de memoria del procesador o al backplane

## chipset
cjto de circuitos integrados utilizados cuya funcion es realizar diversas funciones de hardware, como control de buses, control y acceso a memoria, control de la interfaz I/O y USB, timer, control de senales de interrupcion IRQ y DMA, entre otras

### chipset-arqui actual
- **northbridge:** responsable de interconexion de componentes de alta velocidad del sistema: microprocesador; mem RAM; bus AGP o PCIExpress de video y coms con el southbridge
- **southbridge:** responsable de interconexion de componentes mas lentos del sistema como el bus PS/2 (mouse y teclado), buses PCI, buses PCI Express, etc

*las ultimas placas base no tienen puente norte porque los procesadores de ultima generacion ya lo tienen integrado*
![[Pasted image 20250729170432.png]]

## buses del sistema
FSB (front side bus): lo utilizaban procesadores intel antiguos. Es un bus paralelo con demoras para su uso cuando hay varios componentes. surgieron cuellos de botella

HT (Hyper Transport): en AMD, controlador de memoria dentro del procesador

DMI (direct media interface): respuesta de intel al HT

QPI (quick path interconnect): para utilizar varias tarjetas graficas y en los cuales el controlador PCIe no esta dentro del procesador y con varios procesadores en la misma placa base

FDI (flexible display interface): cuando se tiene una gpu integrada en el procesador este enlace lleva datos desde el procesador hasta las partes del chipset encargadas de visualizacion

### buses - estructura
lineas de control:
- senales de request y acknowledgements
- indica tipo de info de las lineas de datos

lineas de datos:
- datos, direcciones, comandos

transaccion:
- master envia el comando (y la direccion)
- slave recive o envia los datos
- dos tipos de transacciones:
	- entrada entrada de datos desde e/s a la memoria
	- salida: salida de datos desde la memoria al dispositivo de e/s

### buses sincronos y asincronos
bus sincrono (ej. procesador-memoria)
- incluye clock en las lineas de control y tiene protocolo fijo de comunicacion asociado al clock
- **pros**: muy poca logica y puede funcionar a altas velocidades
- **cons**:
	- todos los dispositivos que se comunican en el bus deben usar la misma frecuencia de reloj
	- para evitar skew del reloj no pueden ser largos

bus asincrono (ej: buses de e/s)
- no esta sincronizado, entonces requiere protocolo de handshaking y lineas de control (ReadReg, Ack, DataRdy)
- pros:
	- soporta diferentes velocidades de dispositivos
	- puede ser largo y evita skews
- cons:
	- lento

#### protocolo asincrono de handshaking
![[Pasted image 20250729173514.png]]
![[Pasted image 20250731092247.png]]
master realiza un ReadReq y escribe la direccion (addr) en la linea de datos
1. slave mira ReadReq, lee addr y activa el acuse (Ack)
2. master mira Ack, desactiva las senales de ReadReq y libera las lineas de datos 
3. slave mira que la senal ReadReq este baja y desactiva Ack
4. cuando el dato esta disponible, el Slave lo coloca en la lineas de datos y activa DataRdy
5. master mira DataRdy, lee el dato y activa la senal de Ack
6. slave mira la senal de ack, libera las lineas de datos y desactiva DataRdy
7. master mira que DataRdy este baja y desactiva Ack

### arbitro de bus
si varios dispositivos pueden necesitar el bus al mismo tiempo, se requiere un mecanismo de arbitraje

los esquema de arbitraje de buses consideran:
- prioridad de bus: brindar acceso al dispositivo de mayor prioridad
- equidad: se debe brindar el acceso 

los esquemas de arbitraje de buses se pueden dividir en cuatro clases
- **Daisy chain**
- centralizado, **arbitraje paralelo**
- arbitraje distrubuido por autoseleccion: cada dispositivo que desea el bus coloca un codigo que indica su identidad en el bus
- arbitraje distribuido por deteccion de colision: el dispositivo usa el bus cuando no esta ocupado, y si ocurre una colision reintenta mas tarde

- ### arbitraje daisy chain
![[Pasted image 20250731100324.png]]
*un cable para los request*
pros: 
- simple
cons:
- no asegura acceso a todos los dispositivos: un dispositivo de baja prioridad puede esperar por siempre
- **lento**: la senal del daisy chain limita la velocidad

- ### arbitraje paralelo centralizado
*un cable por cada dispositivo para los request*
![[Pasted image 20250731100621.png]]
pros: 
- flexible, puede garantizar equidad
cons:
- hardware de arbitro mas complicado
se utiliza esencialmente en todos los buses de memoria de procesador y en buses de e/s de alta velocidad

## sistema de e/s
amplia variedad de perifericos con diversas operaciones

no es practico conectar un dispositivo directamente a la GPU debido a que:
- entregan datos a diferentes velocidades y en diferentes formatos
- todos son mas lentos que la CPU y la RAM

los dispositivos externos generalmente no estan conectados directamente a un bus de la computadora

necesitan modulos de e/s

## modulos de e/s
![[Pasted image 20250731101422.png]]
modulo generico de i/o

**interfaz al CPU y la memoria a traves de:
- bus del sistema
- switch central

**interfaz a uno o mas perifericos a traves de:**
- links de datos

### funciones
##### control y temporizacion
la mem principal y el bus de sistema son compartidos
- el CPU puede comunicarse con mas de un dispositivo en simultaneo
se necesita **coordinar el trafico entre recursos internos y dispositivos externos**
el control de la transferencia de datos desde un dispositivo externo al procesador requiere:
- CPU consulta el estado del modulo de e/s del dispositivo
- el modulo de e/s retorna el estado
- si esta listo el CPU solicita la transferencia de datos
- el modulo de e/s toma los datos del dispositivo
- el modulo de e/s transfiere los datos al CPU 
si el sistema usa un bus, cada interaccion requiere un arbitraje de bus
##### comunicacion del CPU
***decodificacion de comando***: los comandos son recibidos por el modulo de e/s como senales del control del bus: ej: READ SECTOR, WRITE SECTOR 
***datos***: intercambio de info entre CPU y modulos de e/s en el bus de datos
***reporte de datos***: importante para conocer el estado del modulo de e/s. ej: BUSY, READY. pueden existir senales para identificar otros errores
***reconocimiento de direcciones***: los modulos de e/s deben reconocer una unica direccion para cada dispositivo que controla

##### comunicacion de dispositivos
los modulos de e/s deben ser capaces de comunicarse con los dispositivos
involucra envios de comando, estados y datos
![[Pasted image 20250731102230.png]]

##### buffering de datos
los datos que provienen de la mem principal se enviar a un modulo de e/s en **rafagas rapidas** (data burst)
estos datos almacenados en el modulo de e/s y luego enviados al dispositivo a su velocidad
en la direccion opuesta, los datos se almacenan temporalmente para no atar la memoria en una operacion de transferencia lenta

##### deteccion de errores
los modulos de e/s son responsables de la deteccion de errores y de informarlos a la CPU

###### clases de errores
- **fallos mecanicos y electronicos** informados por el dispositivo. ej: atasco de papel, pista de disco incorrecta, etc
- **errores de transmision:** cambios involuntarios en el patron de bits durante la transmision al mudulo de e/s
	- se utilizan codigos de deteccion de errores (ej paridad)

### estructura
existen diferentes estructuras de modulos de e/s
su estructura depende de la complejidad y el numero de dispositivos que controlan
en general un modulo se compone de:
- un conjunto de senales, que conectan el modulo con el CPU
- uno o mas registros de datos, que almacenan los datos transferidos desde y hasta el modulo
- uno o mas registros de estado que proveen el estado actual y pueden funcionar como registros de control (informacion detallada del procesador)

#### diagrama de bloques
![[Pasted image 20250731112838.png]]

#### logica de e/s
la logica dentro del modulo
interactua con el procesador a traves de un conjunto de lineas de control
reconoce y genera direcciones asociadas con los dispositivos externos
- el modulo de e/s tiene una direccion unica o un cjto de direcciones unicas si controla mas de un dispositivo 
interfaces con cada dispositivo

### clasificacion de modulos e/s
**canal de e/s o procesador de e/s:** modulo que asume la mayor parte de la carga de procesamiento
- mainframes

**controlador de e/s o controlador de dispositivo:** es bastante *primitivo* y requiere un control detallado
- microprocesador

### tecnicas de e/s
para operaciones de e/s se pueden utilizar distintas tecnicas
- programadas (polling)
- manejadas por interrupciones
- direct memory access (DMA)

#### programada (polling)
*datos se intercambian entre la CPU y el modulo de e/s*

la CPU ejecuta un programa y envia un comando directamente a la e/s correspondiente:
- verifica estado, lee/escribe comandos, transfiere datos

el modulo de e/s realiza la accion solicitada y establece los bits apropiados en el registro de estado de e/s
- no hay mas acciones para alertar a la CPU

la CPU espera a que el modulo de e/s complete la op
- comprueba periodicamente el reg de estado de e/s

![[Pasted image 20250731195705.png]]

#### manejada por interrupciones
*la CPU emite un comando de e/s a un modulo y continua ejecutando otras intrucciones*

el modulo de e/s interrumpe la CPU cuando se completa el trabajo y solicita servicio para intercambiar datos con la CPU

la CPU ejecuta la transferencia de datos

**evita esperas del CPU y no requiere chequeo repetitivo del dispositivo**
![[Pasted image 20250731195959.png]]
##### operacion:
modulo e/s
- recibe un comando READ desde la CPU
- realiza la lectura de los datos del dispositivo externo
- interrumpe la CPU (linea de control) cuando los datos estan en el registro de datos del modulo de E/S
- espera hasta que la CPU solicite sus datos
- transmite los datos a la CPU (bus de datos) cuando se los solicita
- lista para otra operacion de e/s

procesador:
- envia un comado READ y comienza a realizar otro trabajo
- si se interrumpe:
	- guarda el contexto del programa actual
- procesa la interrupcion
	- lee los datos del modulo de e/s y los almacena en la memoria
- restaura el contexto guardado reanuda la ejecucion interrumpida del programa

##### tratamiento de interrupciones
![[Pasted image 20250731200518.png]]
1. dispositivo activa senal de interrupcion
2. procesador finaliza la ejecucion de instruccion actual, antes de antender la interrupcion
	- tratamiento similar a excepciones pero no detienen la ejecucion de la instruccion actual
3. procesador activa senal de **acknowledgement (ack)** cuando detecta interrupcion, sirve al dispositivo para remover senal de interrupcion
![[Pasted image 20250731200726.png]]
4. procesador se prepara para transferir el control a la rutina de interrupcion
	- guarda el estado PROGRAM STATUS WORD (**PSW**) y PC
5. procesador carga PC con direccion del programa de tratamiento de instrucciones
	- puede ser un programa, o un programa por cada tipo de interrupcion, o un programa por cada dispositivo o cada tipo de interrupcion
	- la interrupcion **debe indicar su origen**
	- generalmente vector de interrupcion
![[Pasted image 20250731201047.png]]
**software**:
6. se guarda contexto (contenido de regs del procesador)
	- rutina de atencion de interrupciones puede requerir el uso de regs
7. rutina de interrupciones atiende la solicitud
	- puede llegar a requerir comunicaciones con el dispositivo
8. se restaura el contexto del procesador
9. se restaura el PSW y PC
#### memoria de acceso (DMA)
##### desventajas de tecnicas anteriores:
las opciones anteriores **requieren intervencion activa del CPU**
- c/ palabra de datos desde mem a la e/s o viceversa pasaria por el CPU

inconvenientes de e/s programada y manejada por interrupciones
- velocidad de transferencia de e/s esta con frecuencia de atencion a dispositivo
- la CPU gestiona transferencias de e/s

solucion: DMA

##### DMA
requiere un modulo hardware adicional en el bus de sistema

este puede tomar el control del sistema
- para transferir datos desde y hacia la memoria a traves del bus del sistema

usa el bus solo cuando la CPU no lo necesita

obliga a la CPU a suspender la operacion temporalmente
- se denomina cycle stealing ya que el DMA toma el control del bus
- disminuye la velocidad de la CPU pero no tanto como si la CPU realizara la transferencia

![[Pasted image 20250731232946.png]]

###### **operacion:**
cuando la CPU necesita leer o escribir un bloque de datos,
- CPU informa a controlador DMA:
	- op requerida (read, write) - *data register*
	- direccion de dispositivo - *address reg
	- direccion inicial del bloque de memoria para datos - *address reg*
	- cantidad de datos a transferir - *data count
- CPU continua con otros trabajos

DMA se ocupa de la transferencia:
- directamente hacia o desde la memoria sin pasar por la CPU

DMA envia interrupcion cuando finaliza

CPU solo participa al principio y final de la transferencia de datos

###### **configuracion**
puede confiugurarse de distintas formas
- single bus, DMA separado
- single bus, DMA-E/S integradas
- bus de e/s

*single bus, DMA separadoS![[Pasted image 20250731233505.png]]
c/ transferencia usa el bus 2 veces:
- e/s a DMA
- DMA a memoria
CPU se suspende 2 veces
bajo costo pero ineficiente

*single bus, DMA-E/S integradas*
![[Pasted image 20250731233621.png]]
DMA soporta mas de un disp.
- un modulo de e/s
- modulo separado que controla una o mas e/s

c/ transferencia usa el bus una unica vez
CPU se suspende unica vez

*bus de e/s separado*
![[Pasted image 20250731233800.png]]
bus admite todos los dispositivos con DMA habilitados
c/ transferencia usa el bus una unica vez
- DMA a memoria
CPU se suspende unica vez

## evolucion de buses de e/s y drivers de disps
-  Plug and Play (Resuelve problemas de 3rd party)
	- Cuando un nuevo dispositivo se conecta genera una interrupción que atiende el Sistema Operativo, y carga el driver adecuado. 
- Buses Paralelos (Ej: PCI) 
- Buses Seriales 
	- USB (Microsoft/Intel):USB 1.0: 1.5Mb/s, USB 2.0: 60Mb/s 
	- Firewire (Apple) 100 Mb/s 
	- Ventajas de seriales: Más pequeños, económicos, no existen conversaciones cruzadas y más rapidos que los paralelos (operan a mayor frecuencia) 
- Conexiones gráficas 
	- Advanced Graphics Port (AGP) 
	- PCI Express (PCI-e)