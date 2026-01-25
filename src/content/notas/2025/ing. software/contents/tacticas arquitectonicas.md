# 🧩 Tácticas Arquitectónicas de Software

Las tácticas arquitectónicas son estrategias utilizadas para lograr atributos de calidad en un sistema, como disponibilidad, modificabilidad, desempeño, seguridad e integrabilidad. A continuación, se resumen las principales tácticas mencionadas en los apuntes.

---

## ⚙️ Disponibilidad

### Concepto

La disponibilidad busca asegurar que un sistema continúe funcionando ante fallas o interrupciones.

### Tácticas

- **Redundancia:** Tener múltiples servicios o componentes replicados.  
    Ejemplo: si uno falla, el otro puede continuar funcionando.
    
- **Failover:** Conmutación automática hacia un servicio secundario.
    
- **Detección de fallas:** Supervisar y detectar cuándo un servicio deja de responder.
    
- **Recuperación automática:** Reiniciar o restaurar servicios cuando ocurre una falla.
    

### Diferencias entre copias

- **Copia fria:** Tarda más en levantarse y requiere reconfiguración.
    
- **Copia caliente:** Es más rápida, pues ya está activa o en espera.
    

---

## 🔁 Modificabilidad

### Concepto

Facilita realizar cambios en el sistema sin introducir errores ni afectar otras partes.

### Tácticas

- **Separar cohesión y modularidad:** Organizar el código en módulos que se puedan modificar de forma independiente.
    
- **Diseño con patrones:** Crear estructuras que favorezcan la compatibilidad entre subsistemas.
    
- **Uso de interfaces bien definidas:** Evitar dependencias fuertes.
    
- **Inyectar controladores de validación:** Prevenir errores durante la modificación.
    

---

## ⚡ Performance (Desempeño)

### Concepto

Se centra en la eficiencia con la que el sistema responde a las solicitudes del usuario.

### Tácticas

- **Balanceo de carga:** Distribuir solicitudes entre diferentes recursos.
    
- **Eliminación de cuellos de botella:** Detectar procesos lentos y optimizarlos.
    
- **Caching:** Guardar resultados temporales para reducir procesamiento repetido.
    
- **Scheduling:** Reasignar recursos dinámicamente según demanda.
    

---

## 🔒 Seguridad

### Concepto

Busca proteger el sistema frente a ataques y accesos no autorizados.

### Tácticas

- **Limitación de puntos de acceso:** Reducir la superficie de ataque.
    
- **Logging:** Registrar eventos y accesos para auditoría.
    
- **Autenticación y autorización:** Verificar identidad y permisos de usuarios.
    
- **Directrices de encriptación:** Proteger la confidencialidad de datos.
    
- **Aislamiento de bases de datos:** Separar información crítica.
    
- **No revelación de detalles técnicos:** Evitar información útil para atacantes.
    

---

## 🔗 Integrabilidad

### Concepto

Facilita la incorporación de nuevas funciones o componentes al sistema.

### Tácticas

- **Diseño estandarizado:** Uso de estándares de comunicación y protocolos comunes.
    
- **Modificación controlada:** Gestión de versiones para asegurar compatibilidad.
    
- **Pruebas de integración:** Validar la correcta interacción entre sistemas.
    
- **Facilidad de extensión:** Permitir añadir nuevas funcionalidades sin afectar las existentes.
    

---

## 🧠 Ejemplo de Encadenamiento de Tácticas

```yaml
`T1: Bug fixing → T2: Performance overhead → T3: Mejora de arquitectura`
```
Un cambio o corrección puede generar nuevos retos de rendimiento o arquitectura, lo que demuestra la interdependencia de las tácticas.

## 📘 Conclusión

Cada táctica arquitectónica se elige en función del atributo de calidad que se desea priorizar. Comprenderlas y aplicarlas permite diseñar sistemas más robustos, escalables, seguros y mantenibles.