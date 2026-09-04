A fundamental networking diagnostic utility used to test end-to-end host reachability.
Measures the round-trip time (RTT) for packets sent from the originating host to a destination computer.

Utilizes 2 core ICMP message types:
- **ICMP Echo Request**: Sent by the source host to test reachability.
- **ICMP Echo Reply**: Returned by the destination host acknowledging receipt.

Example Wireshark packet capture when running ping:
![[Pasted image 20260116205416.png]]
