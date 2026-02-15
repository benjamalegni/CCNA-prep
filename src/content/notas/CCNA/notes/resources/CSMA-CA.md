**CSMA/CA** (_Carrier Sense Multiple Access with Collision Avoidance_) es el protocolo de control de acceso al medio utilizado fundamentalmente en redes inalámbricas (estándar IEEE 802.11 / Wi-Fi). A diferencia de la versión cableada (CD), este protocolo se centra en **evitar** la colisión antes de que ocurra, ya que en un medio inalámbrico es difícil o imposible detectar una colisión mientras se transmite.

### Desglose de componentes
1. **Carrier Sense (Detección de Portadora):** El dispositivo escucha el espectro de radiofrecuencia para verificar si el canal está libre antes de intentar transmitir.
2. **Multiple Access (Acceso Múltiple):** Múltiples dispositivos compiten por el uso del mismo canal de frecuencia.
3. **Collision Avoidance (Evitación de Colisiones):** En lugar de transmitir apenas el canal está libre, el protocolo introduce esperas aleatorias y confirmaciones para minimizar la probabilidad de choque.
    
### Funcionamiento del Algoritmo
El proceso sigue una lógica preventiva estricta:
1. **Escucha y Espera DIFS:** El nodo escucha el canal. Si está libre, debe esperar un tiempo fijo llamado **DIFS** (_Distributed Inter-Frame Space_).
2. **Backoff Aleatorio (Contienda):** Tras el tiempo DIFS, el nodo no transmite inmediatamente. Genera un número aleatorio de "slots" de tiempo (temporizador de backoff) y comienza una cuenta regresiva mientras el canal siga libre.
3. **Transmisión:** Cuando el temporizador llega a cero, el nodo envía la trama completa.
4. **Confirmación (ACK):** Dado que el emisor no puede escuchar colisiones mientras transmite, requiere una confirmación explícita.
    - El receptor, si recibe los datos sin errores (CRC correcto), espera un tiempo corto (**SIFS**) y envía un **ACK** (_Acknowledgement_).
    - **Si no llega el ACK:** El emisor asume que hubo una colisión o interferencia y repite el proceso (aumentando la ventana de backoff).
### Mecanismo Opcional: RTS/CTS
Para solucionar el problema del "nodo oculto" (nodos que no se escuchan entre sí pero colisionan en el punto de acceso), se puede usar un paso previo:
- **RTS (Request to Send):** El emisor pide permiso para transmitir.
- **CTS (Clear to Send):** El punto de acceso da "luz verde" y reserva el canal, silenciando a los demás nodos.

> **Nota técnica:** CSMA/CA es necesario porque las radios inalámbricas generalmente operan en **Half-Duplex** y la señal transmitida es mucho más potente que la recibida, lo que "ensordece" al dispositivo e impide detectar colisiones entrantes (Collision Detection) simultáneamente.