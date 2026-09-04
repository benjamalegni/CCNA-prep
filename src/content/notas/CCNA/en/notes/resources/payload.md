In computer networking, the **payload** is the **actual useful data** transported inside a frame, packet, or segment, excluding control protocol overhead (headers and trailers).

As data moves down through the layers of the OSI model:
- Each layer **adds its own header** (and sometimes a trailer).
- The complete Protocol Data Unit (PDU) received from an upper layer becomes the **payload** of the lower layer.

### Encapsulation Example
- **Layer 4 Payload (TCP/UDP)**: Application layer data (e.g., HTTP, DNS, SSH payload).
- **Layer 3 Payload (IP)**: Complete Transport Layer segment (TCP or UDP header + data).
- **Layer 2 Payload (Ethernet)**: Complete Network Layer packet (IP header + data).

### Key Concept
> The payload is the data that **a given protocol layer encapsulates and transports**, while headers and trailers provide delivery, addressing, and control metadata.
