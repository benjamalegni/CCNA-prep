**Neighbor Discovery Protocol (NDP)** is the suite of mechanisms used by **IPv6** allowing devices on the same local network segment to:
- Discover one another
- Determine link-layer addresses (MAC addresses)
- Discover available default routers
- Maintain reachability information for active neighbors

NDP replaces functions provided in IPv4 by **ARP, ICMP Router Discovery, and basic DHCP**.

## Core Functions
1. **Address Resolution**: Resolves an IPv6 address into a Layer 2 MAC address (IPv6 equivalent to ARP).
2. **Router Discovery**: Identifies on-link routers and discovers default gateway prefixes.
3. **Stateless Address Autoconfiguration (SLAAC)**: Allows hosts to configure their own IPv6 addresses using router advertisements.
4. **Neighbor Unreachability Detection (NUD)**: Checks whether neighbor nodes are still reachable.
5. **Duplicate Address Detection (DAD)**: Verifies that a newly configured unicast IPv6 address is unique on the link.
6. **Redirection**: Routers can inform hosts of a better first-hop gateway for a given destination.

## ICMPv6 Message Types
Neighbor Discovery utilizes 5 dedicated **ICMPv6** messages:
- **Router Solicitation (RS)**: Sent by hosts to locate routers on the link.
- **Router Advertisement (RA)**: Broadcast by routers periodically or in response to an RS, containing prefix and configuration flags.
- **Neighbor Solicitation (NS)**: Sent to discover a neighbor's link-layer address or verify reachability.
- **Neighbor Advertisement (NA)**: Responds to an NS with the sender's MAC address.
- **Redirect**: Sent by routers to inform hosts of a more optimal path.

---

## Key Differences vs IPv4
- **Eliminates ARP**: All address discovery runs natively inside ICMPv6.
- **Eliminates Broadcasts**: Replaces broadcast flooding with targeted **Solicited-Node Multicast** groups for far greater bandwidth efficiency.
- **Built-in Autoconfiguration**: Enables SLAAC without needing a stateful DHCP server.
