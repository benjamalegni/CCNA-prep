## Descripción general

**PasBuster** es una herramienta orientada a la **automatización de pruebas de autenticación**, cuyo objetivo principal es **evaluar la fortaleza de contraseñas y mecanismos de acceso**. Se utiliza comúnmente en **entornos controlados**, como laboratorios, auditorías de seguridad y pruebas de penetración autorizadas.

Su función principal es **probar combinaciones de credenciales** contra un servicio o aplicación para detectar contraseñas débiles, reutilizadas o mal configuradas.

## Para qué sirve PasBuster?
PasBuster se emplea para:
- Evaluar políticas de contraseñas débiles  
- Detectar usuarios con credenciales fácilmente adivinables  
- Verificar protecciones contra fuerza bruta  
- Probar mecanismos de bloqueo, rate limiting y alertas  
- Apoyar auditorías de seguridad y formación en ciberseguridad  
## Concepto de funcionamiento

PasBuster trabaja bajo el principio de **prueba sistemática de credenciales**:
1. Se define un **objetivo de autenticación** (servicio, aplicación o endpoint).
2. Se proporcionan:
   - Una lista de usuarios
   - Una lista de contraseñas (diccionario)
3. La herramienta prueba combinaciones usuario/contraseña.
4. Analiza las respuestas para detectar:
   - Accesos exitosos
   - Errores de autenticación
   - Bloqueos o respuestas anómalas

El proceso puede ser **secuencial o concurrente**, dependiendo de la configuración.
## Tipos de escenarios donde se utiliza

PasBuster puede aplicarse, según su implementación, en escenarios como:

- Servicios de login web
- Accesos SSH o FTP
- Formularios HTTP/HTTPS
- APIs con autenticación básica o tokenizada
- Sistemas internos de laboratorio
## Componentes habituales

Aunque la implementación concreta puede variar, normalmente PasBuster incluye:
- **Motor de pruebas**  
  Gestiona los intentos de autenticación.
- **Gestión de diccionarios**  
  Permite usar listas personalizadas de usuarios y contraseñas.
- **Análisis de respuestas**  
  Distingue entre errores, éxitos y bloqueos.
- **Control de velocidad**  
  Ajusta la frecuencia de intentos para evitar bloqueos inmediatos.

---

## Ventajas

- Automatiza tareas repetitivas
- Facilita auditorías de seguridad
- Permite evaluar configuraciones reales
- Útil en formación y laboratorios
- Ayuda a concienciar sobre contraseñas débiles

---

## Limitaciones

- No rompe cifrados fuertes por sí misma
- Depende de la calidad de los diccionarios
- Puede ser detectada por sistemas de defensa
- No sustituye un análisis de seguridad completo

# Uso de PasBuster: comandos y estructura

La sintaxis típica de PasBuster sigue este patrón:

```bash
pasbuster [opciones] --target <objetivo> --users <archivo_usuarios> --passwords <archivo_passwords>
```

# 1. Definición del objetivo
El objetivo indica **dónde** se realizarán las pruebas de autenticación.

Ejemplos típicos:

`--target http://localhost/login --target ssh://127.0.0.1:22`

En este bloque se define:
- Protocolo (http, https, ssh, ftp, etc.)
- Dirección IP o hostname
- Puerto (si aplica)
- Endpoint o recurso de autenticación

# 2. Archivos de credenciales
PasBuster trabaja normalmente con **diccionarios**.
### Usuarios
Archivo de usuarios (uno por línea):
`admin 
 test
 user`

Uso:
`--users users.txt`
### Contraseñas
Archivo de contraseñas:
`admin 
 password 
 123456`

Uso:
`--passwords passwords.txt`
## 3. Modos de prueba comunes
### Usuario fijo + lista de contraseñas

`pasbuster \   --target http://localhost/login \   --user admin \   --passwords passwords.txt`
Uso típico:
- Auditoría de cuentas críticas
- Verificación de contraseñas débiles
### Lista de usuarios + contraseña fija
`pasbuster \   --target http://localhost/login \   --users users.txt \   --password admin123`
Uso típico:

- Detección de contraseñas reutilizadas
    
### Lista de usuarios + lista de contraseñas
`pasbuster \   --target http://localhost/login \   --users users.txt \   --passwords passwords.txt`
Uso típico:
- Auditoría completa de credenciales
- Laboratorios de seguridad
## 4. Parámetros de control
### Velocidad de intentos
Controla la cantidad de pruebas por segundo:
`--rate 5`

Ejemplo:
`pasbuster \   --target http://localhost/login \   --users users.txt \   --passwords passwords.txt \   --rate 5`
Esto reduce:
- Bloqueos de cuenta
- Detección automática
### Tiempo de espera (timeout)
`--timeout 3`
Evita que la herramienta quede bloqueada por respuestas lentas.
### Número de hilos
`--threads 4`
Ajusta concurrencia.  
Más hilos = más velocidad, pero más ruido.
## 5. Detección de éxito o fallo
PasBuster analiza las respuestas del sistema objetivo mediante:
- Códigos HTTP (200, 302, 401, etc.)
- Mensajes de error
- Cambios en tamaño de respuesta
- Redirecciones

Ejemplo:
`--success-code 302 --failure-code 401`
## 6. Salida y registro de resultados
### Salida por pantalla
Por defecto, PasBuster muestra:
`[FAIL] admin:123456 [FAIL] admin:password [SUCCESS] admin:admin123`
### Guardar resultados en archivo
`--output results.txt`

Ejemplo:
`pasbuster \   --target http://localhost/login \   --users users.txt \   --passwords passwords.txt \   --output results.txt`

## 7. Estructura mental del uso

Antes de ejecutar PasBuster, conviene preguntarse:
1. ¿Qué servicio estoy auditando?
2. ¿Qué tipo de autenticación usa?
3. ¿Tengo permiso?
4. ¿Qué impacto tendrá la velocidad de prueba?
5. ¿Cómo interpretaré los resultados?

## 8. Flujo típico de trabajo
1. Preparar entorno de laboratorio
2. Identificar endpoint de login
3. Crear diccionarios realistas
4. Ejecutar pruebas controladas
5. Analizar resultados
6. Corregir configuraciones inseguras