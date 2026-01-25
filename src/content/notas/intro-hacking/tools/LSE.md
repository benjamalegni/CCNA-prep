## 📘 ¿Qué es LSE?
- **Linux Smart Enumeration (lse.sh)** es un **script de post-explotación** para sistemas Linux.
- Se usa para **enumerar configuraciones inseguras** y posibles vectores de **escalada de privilegios**.
- Muy popular en **CTFs, labs y pentesting real**.

---

## 🎯 ¿Para qué sirve?
- Detectar:
  - Archivos SUID peligrosos
  - Permisos incorrectos
  - Credenciales expuestas
  - Servicios mal configurados
  - Binarios explotables
- Ahorrar tiempo frente a enumeración manual.

---

## 🚀 Uso básico
```bash
./lse.sh

⚙️ Modos de ejecución
Opción	Función
-l 1	Enumeración básica (rápida)
-l 2	Enumeración completa (recomendada)
-s	Modo silencioso
-i	Modo interactivo