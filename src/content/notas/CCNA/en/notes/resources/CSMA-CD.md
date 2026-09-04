**CSMA/CD** (*Carrier Sense Multiple Access with Collision Detection*) is a media access control protocol historically used in Ethernet networks to manage transmissions over a shared physical channel. Its core role is to detect and mitigate data corruption when two devices attempt to transmit simultaneously.

### Component Breakdown
1. **Carrier Sense**: Before transmitting, the device listens to the physical wire. If electrical voltage/signaling is detected, the channel is assumed busy and the station waits.
2. **Multiple Access**: Multiple network nodes share and contend for access to the same physical medium.
3. **Collision Detection**: The device continues monitoring the wire *while* transmitting. If it senses a voltage level or wave amplitude higher than its own signal, it detects that a collision has occurred.

### Algorithm Operation
The protocol operates under a "listen-transmit-verify" logic:
1. **Carrier Sense**: The node checks whether the wire is idle.
2. **Transmission**: If idle, the node begins frame transmission.
3. **Continuous Collision Monitoring**: During transmission, the transceiver listens:
   - **If no collision occurs**: The transmission completes successfully.
   - **If a collision occurs**:
     1. Transmission stops immediately.
     2. A 32-bit **Jamming Signal** is broadcast across the wire to ensure all stations detect the collision.
     3. A **Truncated Binary Exponential Backoff** algorithm is invoked: the station waits for a randomized backoff interval before attempting retransmission (preventing nodes from colliding repeatedly at the exact same moment).

> **Technical note**: CSMA/CD is only used in **Half-Duplex** environments (such as legacy hub-based or coaxial networks). Modern Ethernet networks using switches operate in **Full-Duplex**, meaning collision domains are eliminated and CSMA/CD is disabled.
