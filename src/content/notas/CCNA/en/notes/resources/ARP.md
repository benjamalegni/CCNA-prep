ADDRESS RESOLUTION PROTOCOL

Used to discover the Layer 2 address (MAC address) of an already known Layer 3 address (IP address).

Consists of 2 messages:
- **ARP Request**: sent as a broadcast (sent to all hosts on the local network).
- **ARP Reply**: sent as a unicast (sent only to the host that initiated the request).
