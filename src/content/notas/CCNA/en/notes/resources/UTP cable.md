## Connector Standard
- Terminates with an **RJ-45 (8P8C)** connector.
- Industry standard for wired local area network (LAN) Ethernet connections.

---

## Wiring Pinout Types

### Straight-Through Cable
- Identical wiring standard on both ends (either T568A-T568A or T568B-T568B).
- Typical use cases:
  - PC / Host ↔ Switch
  - Router ↔ Switch
  - Server ↔ Switch

### Crossover Cable
- Different wiring standards on opposite ends (T568A on one end, T568B on the other).
- Historical use cases:
  - PC ↔ PC
  - Switch ↔ Switch
  - Router ↔ Router
  - Router ↔ PC (both are MDI devices)
- Largely replaced today thanks to **[[auto MDI-X]]**.

---

## Termination Standards

### T568A
- Pinout order: White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown.
- Common in residential and government installations.

### T568B
- Pinout order: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown.
- Predominant standard in enterprise networks and heavily referenced on CCNA.

> ⚠️ Both cable ends must adhere to the **same standard** to create a valid straight-through cable.

---

## UTP Cable Categories

| Category | Max Speed | Bandwidth | Typical Use |
|----------|-----------|-----------|-------------|
| Cat 5 | 100 Mbps | 100 MHz | Legacy / Obsolete |
| Cat 5e | 1 Gbps | 100 MHz | Common baseline |
| Cat 6 | 1–10 Gbps (10G up to 55m) | 250 MHz | Standard modern office LAN |
| Cat 6a | 10 Gbps (full 100m) | 500 MHz | Data centers / high-density |
| Cat 7/8 | 25–40 Gbps (short runs) | Up to 2000 MHz | Specialized enterprise / DC |

---

## Maximum Distance
- **100 meters (328 feet)** total channel link:
  - 90 m permanent horizontal solid-core cabling
  - 10 m stranded patch cords combined

---

## Advantages of UTP
- Low cost and widely available
- Lightweight, thin, and highly flexible
- Quick and straightforward termination
- Meets bandwidth requirements for the vast majority of LAN deployments

---

## Disadvantages
- Susceptible to electromagnetic interference (EMI) and radio frequency interference (RFI)
- Susceptible to crosstalk between adjacent pairs
- Not suitable for electrically noisy industrial environments without shielding (STP)

---

## CCNA Exam Key Points
- UTP is the **most prevalent Ethernet media**
- Remember:
  - Straight-through vs crossover pinouts
  - Performance categories (Cat 5e, Cat 6, Cat 6a)
  - 100 m distance limitation
  - Fundamental to Layer 1 Physical Layer troubleshooting

---

## OSI Model Mapping
- Operates strictly at **Layer 1 – Physical Layer**
- Common faults:
  - Damaged or pinched wire pairs
  - Incorrect pinout crimping (split pairs)
  - Exceeding the 100-meter run length
  - Category mismatch

---

# 10BASE-T, 100BASE-T
![[Pasted image 20260104140552.png]]
Pins 1 and 2 transmit, while pins 3 and 6 receive (or vice versa depending on MDI vs MDI-X):
![[Pasted image 20260104140803.png]]
Straight-through cables connect dissimilar device types (e.g. PC to switch):
![[Pasted image 20260104140854.png]]
Crossover cables were required to connect like devices before auto-sensing interfaces (**[[auto MDI-X]]**):
![[Pasted image 20260104140935.png]]

# 1000BASE-T and 10GBASE-T
![[Pasted image 20260104141133.png]]
Gigabit Ethernet uses all 4 twisted pairs simultaneously for bidirectional transmission.
