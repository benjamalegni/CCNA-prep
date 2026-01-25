
## 📘 ¿Qué es Auto MDI-X?
- **Auto MDI-X (Automatic Medium-Dependent Interface Crossover)** es una función que permite a un puerto Ethernet **detectar y ajustar automáticamente** los pines de transmisión (Tx) y recepción (Rx).
- Elimina la necesidad de elegir entre **cable directo (straight-through)** o **cruzado (crossover)**.

---

## 🔌 ¿Qué problema resuelve?
- En Ethernet tradicional:
  - Dispositivos **iguales** → cable crossover
  - Dispositivos **distintos** → cable straight-through
- Con **Auto MDI-X**:
  - 👉 **Cualquier cable funciona** (directo o cruzado)

---

## 🧠 ¿Cómo funciona?
- El puerto detecta automáticamente:
  - Qué pines se usan para transmitir
  - Qué pines se usan para recibir
- Si detecta que Tx/Rx no coinciden:
  - Los **invierte internamente** sin intervención del usuario

---

## 🖥️ Dispositivos que lo soportan
- Switches modernos
- Routers modernos
- NICs (tarjetas de red) actuales
- Equipos Ethernet **Gigabit y superiores** (en general)

> ⚠️ **Equipos antiguos** suelen **NO** soportar Auto MDI-X.

---

## 🧪 Ejemplos prácticos

| Conexión | Sin Auto MDI-X | Con Auto MDI-X |
|--------|---------------|---------------|
| PC ↔ PC | Crossover | Cualquier cable |
| Switch ↔ Switch | Crossover | Cualquier cable |
| Router ↔ Router | Crossover | Cualquier cable |
| PC ↔ Switch | Straight | Cualquier cable |

---

## 📌 Ventajas
- Simplifica instalaciones
- Reduce errores humanos
- Ahorra tiempo
- Evita problemas de conectividad física

---

## ❌ Limitaciones
- No existe en equipos viejos
- No corrige:
  - Cable defectuoso
  - Pines mal crimpados
  - Distancias mayores a 100 m
  - Problemas de capa 2 o superiores

---

## 🧠 Relación con el modelo OSI
- Pertenece a la **Capa 1 – Física**
- Actúa antes de que exista comunicación de datos real

---

## 📚 Clave para CCNA
- Si **NO hay Auto MDI-X**, debés elegir el cable correcto
- En escenarios de examen:
  - “Old devices” → **NO Auto MDI-X**
  - “Modern devices” → **Sí Auto MDI-X**

---

## 📝 Frase clave para memorizar
> **Auto MDI-X = el puerto se adapta, no el cable**