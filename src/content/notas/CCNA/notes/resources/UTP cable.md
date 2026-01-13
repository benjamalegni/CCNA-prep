
## 🔗 Conector utilizado
- Utiliza conector **RJ-45**.
- Es el estándar para redes Ethernet cableadas.

---

## 🧪 Tipos de cableado (pinout)

### 🔁 Cable Directo (Straight-Through)
- Mismo estándar en ambos extremos.
- Uso:
  - PC ↔ Switch
  - Router ↔ Switch

### 🔀 Cable Cruzado (Crossover)
- Estándares distintos en cada extremo.
- Uso (histórico):
  - PC ↔ PC
  - Switch ↔ Switch
- Hoy casi no se usa gracias a **[[auto MDI-X]]**.

---

## 📐 Estándares de cableado

### T568A
- Más común en instalaciones residenciales.

### T568B
- Más común en redes empresariales.
- **Muy usado en CCNA**.

> ⚠️ Importante: ambos extremos deben usar el **mismo estándar** para cable directo.

---

## 📊 Categorías de cables UTP

| Categoría | Velocidad máx. | Uso típico        |
| --------- | -------------- | ----------------- |
| Cat5      | 100 Mbps       | Obsoleto          |
| Cat5e     | 1 Gbps         | Muy común         |
| Cat6      | 1–10 Gbps      | Redes modernas    |
| Cat6a     | 10 Gbps        | Data centers      |
| Cat7/8    | +10 Gbps       | Uso especializado |

---

## 📏 Longitud máxima
- **100 metros** por tramo:
  - 90 m cable fijo
  - 10 m patch cords

---

## ✅ Ventajas del UTP
- Barato
- Flexible
- Fácil de instalar
- Suficiente para la mayoría de las redes LAN

---

## ❌ Desventajas
- Más sensible a interferencias que cables blindados
- No ideal para entornos industriales muy ruidosos

---

## 📌 Puntos clave para CCNA
- UTP es el **cable Ethernet más usado**
- Conocer:
  - Diferencia entre cable directo y cruzado
  - Categorías (Cat5e, Cat6)
  - Longitud máxima (100 m)
- Fundamental para troubleshooting físico (Layer 1)

---

## 🧠 Relación con el modelo OSI
- El cable UTP pertenece a la **Capa 1 – Física**
- Problemas comunes:
  - Cable cortado
  - Mal crimpado
  - Categoría incorrecta


# 10BASE-T, 100BASE-T
![[Pasted image 20260104140552.png]]los pines 1,2 reciben datos y de 3-6 transmiten datos
![[Pasted image 20260104140803.png]]
straight-through cable fue hecho para conectar distinto tipo de dispositivo (PC to router/switch)
![[Pasted image 20260104140854.png]]
crossover cable fue hecho para conectar dispositivos similares porque los routers viejos no tenian auto-sensing ([[auto MDI-X]]) para ajustar conexiones
![[Pasted image 20260104140935.png]]

# 1000BASE-T y 10GBASE-T
![[Pasted image 20260104141133.png]]