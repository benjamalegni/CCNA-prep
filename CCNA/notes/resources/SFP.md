## 📘 ¿Qué es un SFP?
- **SFP (Small Form-factor Pluggable)** es un **transceptor modular** que se inserta en switches, routers o firewalls.
- Convierte señales **eléctricas ↔ ópticas** (o eléctricas ↔ eléctricas) para permitir distintas formas de conexión.
- Es **hot-swappable**: se puede conectar o retirar sin apagar el equipo.

---
## 🔄 ¿Para qué sirve?
- Permite elegir **tipo de medio y velocidad** sin cambiar el equipo.
- Se usa para:
  - Enlaces de fibra óptica
  - Enlaces Ethernet de cobre
  - Conexiones de larga distancia
  - Interconexión entre switches (uplinks)

---

## 🧩 Componentes de un SFP
- **Láser o transmisor** (envía datos)
- **Receptor óptico** (recibe datos)
- **Interfaz eléctrica** hacia el switch/router
- **Conector de fibra o RJ-45** según el tipo

---

## 🔗 Tipos de SFP según el medio

### 🌈 SFP de Fibra Óptica
- Usan conectores **LC**
- Tipos comunes:
  - **SX** → fibra multimodo, corta distancia
  - **LX** → fibra monomodo, larga distancia
  - **ZX** → distancias muy largas

### 🔌 SFP de Cobre
- Conector **RJ-45**
- Usan cable UTP (Cat5e/Cat6)
- Alcance típico: hasta 100 m

---

## 🚀 Velocidades comunes

| Tipo | Velocidad |
|----|-----------|
| SFP | 1 Gbps |
| SFP+ | 10 Gbps |
| SFP28 | 25 Gbps |
| QSFP+ | 40 Gbps |
| QSFP28 | 100 Gbps |

> ⚠️ Un puerto SFP **no acepta SFP+**, pero un puerto SFP+ suele aceptar SFP.

---

## 📏 Alcance típico (fibra)

| Tipo | Fibra | Distancia |
|---|---|---|
| SX | Multimodo | hasta 550 m |
| LX | Monomodo | hasta 10 km |
| ZX | Monomodo | 40–80 km |

---

## 🔁 Full-Duplex
- Los SFP trabajan en **full-duplex**:
  - Transmiten y reciben datos al mismo tiempo
- Usan:
  - Dos fibras (Tx / Rx)
  - O una sola fibra (BiDi)

---

## 🧪 SFP BiDi (Bidireccional)
- Usa **una sola fibra**
- Transmite y recibe con **longitudes de onda distintas**
- Siempre se usan **en pares compatibles** (ej. 1310/1550 nm)

---

## ✅ Ventajas
- Modular y flexible
- Ahorra costos de hardware
- Ideal para uplinks y backbone
- Escalable (solo cambias el módulo)

---

## ❌ Desventajas
- Más caro que UTP
- Requiere compatibilidad (vendor lock-in)
- Fibra más delicada que cobre

---

## 📌 Puntos clave para CCNA
- SFP es **capa 1 (Física)**
- Diferenciar:
  - Fibra vs cobre
  - SX vs LX
  - SFP vs SFP+
- Saber cuándo usar SFP en lugar de UTP
- Muy común en enlaces **switch ↔ switch**

---