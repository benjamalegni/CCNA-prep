**CSMA/CD** (_Carrier Sense Multiple Access with Collision Detection_) es un protocolo de control de acceso al medio utilizado en redes Ethernet para gestionar la transmisión de datos en un canal compartido. Su función principal es evitar la corrupción de datos cuando dos dispositivos intentan transmitir simultáneamente.

### Desglose de componentes
1. **Carrier Sense (Detección de Portadora):** Antes de transmitir, el dispositivo "escucha" el medio físico (cable). Si detecta voltaje (señal en curso), asume que el canal está ocupado y espera.
2. **Multiple Access (Acceso Múltiple):** Indica que múltiples nodos están conectados al mismo medio físico y compiten por su uso.
3. **Collision Detection (Detección de Colisiones):** El dispositivo monitorea el medio _mientras_ transmite. Si detecta una amplitud de onda superior a la propia (interferencia constructiva), identifica que ha ocurrido un choque de señales.
### Funcionamiento del Algoritmo
El proceso opera bajo la lógica "escuchar-transmitir-verificar":
1. **Monitoreo:** El nodo verifica si el canal está libre.
2. **Transmisión:** Si el canal está libre, comienza el envío de la trama.
3. **Verificación Continua:** Durante la transmisión, el nodo sigue escuchando.
    - **Si no hay colisión:** La transmisión finaliza con éxito.
    - **Si hay colisión:**
        1. Se detiene la transmisión de datos inmediatamente.
        2. Se envía una **Señal de Atasco (Jamming Signal)** de 32 bits para asegurar que todos los nodos en la red detecten la colisión.
        3. Se ejecuta el algoritmo de **Backoff Exponencial Binario**: el nodo espera un tiempo aleatorio antes de intentar transmitir nuevamente (para evitar que ambos nodos reintenten al mismo tiempo exacto).
> **Nota técnica:** CSMA/CD es exclusivo de redes **Half-Duplex** (como las basadas en Hubs o cable coaxial). En las redes modernas con Switches y operación **Full-Duplex**, las colisiones no ocurren, por lo que este protocolo no se utiliza.