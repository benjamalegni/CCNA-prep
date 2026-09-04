## What is Auto MDI-X?
- **Auto MDI-X (Automatic Medium-Dependent Interface Crossover)** is a feature allowing an Ethernet port to **automatically detect and adjust** transmit (Tx) and receive (Rx) pin connections.
- It eliminates the requirement to choose between a **straight-through cable** or a **crossover cable**.

---

## What Problem Does It Solve?
- In traditional Ethernet:
  - **Like devices** → Crossover cable
  - **Unlike devices** → Straight-through cable
- With **Auto MDI-X**:
  - 👉 **Any cable works** (straight-through or crossover)

---

## How Does It Work?
- The port automatically detects:
  - Which pins are being used to transmit
  - Which pins are being used to receive
- If it detects that Tx and Rx pins are conflicting:
  - It **internally reverses the transmit and receive pairs** without user intervention.

---

## Supported Devices
- Modern switches
- Modern routers
- Modern Network Interface Cards (NICs)
- **Gigabit Ethernet and faster** interfaces (mandated by IEEE 802.3ab standards)

> ⚠️ **Legacy devices** often do **NOT** support Auto MDI-X.

---

## Practical Examples

| Connection | Without Auto MDI-X | With Auto MDI-X |
|------------|--------------------|-----------------|
| PC ↔ PC | Crossover | Either cable |
| Switch ↔ Switch | Crossover | Either cable |
| Router ↔ Router | Crossover | Either cable |
| PC ↔ Switch | Straight-through | Either cable |

---

## Advantages
- Simplifies network installations
- Reduces human error
- Saves troubleshooting time
- Avoids physical connectivity issues

---

## Limitations
- Not available on legacy hardware
- Cannot fix:
  - Defective/broken cables
  - Poorly crimped pins
  - Distances exceeding 100 meters
  - Layer 2 or higher configuration issues

---

## OSI Model Relationship
- Operates at **Layer 1 – Physical Layer**
- Acts before active data communication begins

---

## CCNA Exam Tip
- If **Auto MDI-X is disabled or unavailable**, you must choose the correct cable type.
- On exam scenarios:
  - "Legacy / Old devices" → **Assume NO Auto MDI-X**
  - "Modern devices" → **Auto MDI-X supported**

---

## Key Takeaway
> **Auto MDI-X = the port adapts, not the cable.**
