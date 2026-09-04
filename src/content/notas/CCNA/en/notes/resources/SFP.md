## What is an SFP?
- **SFP (Small Form-factor Pluggable)** is a compact, **modular transceiver** that slots into switches, routers, and security appliances.
- It converts signals between **electrical ↔ optical** (or electrical ↔ electrical) domains to accommodate various physical media.
- It is **hot-swappable**: it can be inserted or removed without powering down host equipment.

---

## Purpose and Use Cases
- Provides flexible choice of **media type and data rate** without replacing underlying hardware.
- Common uses:
  - Fiber-optic interconnects
  - Copper Ethernet links
  - Long-distance backbone connections
  - Inter-switch uplinks and distribution aggregation

---

## SFP Hardware Components
- **Optical Laser / Transmitter**: Emits encoded light signals
- **Optical Receiver / Photodetector**: Senses received light pulses
- **Electrical Host Interface**: Gold-plated edge connector attaching to the switch/router motherboard
- **Media Port**: LC optical receptacle or RJ-45 copper jack

---

## SFP Types by Transmission Medium

### Fiber Optic SFP
- Uses standard **LC duplex connectors**
- Common standards:
  - **SX (Short Reach)**: Multimode fiber (850 nm wavelength), short distances (up to 550 m)
  - **LX (Long Reach)**: Singlemode fiber (1310 nm wavelength), distances up to 10 km (can also run on multimode up to 550 m)
  - **ZX / EX (Extended Reach)**: Singlemode fiber (1550 nm), extended spans of 40–80 km

### Copper SFP (1000BASE-T)
- Standard **RJ-45 connector**
- Runs Cat5e / Cat6 UTP cabling
- Standard 100-meter distance limit

---

## Common Form Factors and Speeds

| Standard | Maximum Bandwidth |
|----------|-------------------|
| SFP | 1 Gbps |
| SFP+ | 10 Gbps |
| SFP28 | 25 Gbps |
| QSFP+ | 40 Gbps (4 x 10G lanes) |
| QSFP28 | 100 Gbps (4 x 25G lanes) |

> ⚠️ A standard 1G SFP port cannot accept an SFP+ module, but SFP+ ports typically support legacy 1G SFP modules via backwards compatibility.

---

## Typical Fiber Distances

| Type | Fiber Type | Max Distance |
|------|------------|--------------|
| SX | Multimode (MMF) | up to 550 m |
| LX | Singlemode (SMF) | up to 10 km |
| ZX | Singlemode (SMF) | 40–80 km |

---

## Full-Duplex Operation
- SFPs operate in **full-duplex**:
  - Transmit and receive simultaneously without collisions
- Employs either:
  - Two distinct fiber strands (Tx and Rx paths)
  - Or a single fiber strand using **BiDi** technology

---

## BiDi (Bidirectional) SFP
- Uses **a single strand of fiber** for both directions.
- Transmits and receives on two distinct wavelengths over the same core (Wavelength Division Multiplexing).
- Must always be deployed in matched complementary pairs (e.g., 1310 nm TX / 1490 nm RX on one end, and 1490 nm TX / 1310 nm RX on the other).

---

## Advantages
- Modular flexibility and hardware investment protection
- Cost-effective scalability (upgrade optics without replacing line cards)
- Essential for high-speed switch-to-switch and switch-to-router uplinks

---

## Disadvantages
- Higher per-port cost than native fixed-copper ports
- Fiber optic cables and terminations are more delicate than copper
- Optical budget and cleanliness require proper inspection and handling

---

## CCNA Exam Focus Points
- SFP operates at **Layer 1 (Physical Layer)**
- Know differences between:
  - Fiber vs Copper
  - SX (Multimode) vs LX (Singlemode)
  - SFP (1 Gbps) vs SFP+ (10 Gbps)
  - When to choose fiber transceivers over standard twisted pair (distance, bandwidth, EMI immunity)
