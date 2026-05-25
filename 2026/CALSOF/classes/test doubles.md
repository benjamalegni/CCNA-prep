un test double es un objeto que reemplaza a una dependencia real durante el testing.
permite aislar una unidad bajo prueba de sus colaboradores externos (BD, APIs, emails, servicios)

- STUB
	- Devuelve respuestas predefinidas
- MOCK
	- Verifica interacciones
- SPY
	- Objeto real + observación
- FAKE
	- Implementación simplificada

## STUB - el que siempre tiene la misma respuesta
cuando usarlo:
- Necesitás controlar el retorno de una dependencia 
- No te importa CÓMO se llamó, solo QUÉ devolvió 
- Querés testear tu clase ante distintos escenarios (éxito, error, timeout…) 
- La dependencia real es lenta o tiene efectos secundarios

```java
// Interfaz a reemplazar

interface ClimaService {
	String obtenerClima(String ciudad);
}

// Stub manual

class ClimaServiceStub implements ClimaService {
	public String obtenerClima(String ciudad) {
		return "Soleado”; // siempre, sin importar ciudad
	}
}

// o se puede usar ClimaServiceStub climaStub = (ciudad) -> "Soleado";
// luego lo uso para var saludador = new SaludadorMeteorologico(climaStub)

// Test con Stub
@Test

void deberiaGenerarSaludo() {
	ClimaService stub = new ClimaServiceStub();
	var saludador = new SaludadorMeteorologico(stub);
	String res = saludador.saludar("Buenos Aires");
	assertEquals('Buen dia. Hoy esta Soleado", res);
	// 8 Solo verificamos el resultado final

}
```

## MOCK - el que lleva la cuenta de todo
cuando usarlo:
- Lo importante es que una acción OCURRIÓ (enviar email, loguear, llamar API) 
- Querés verificar con qué argumentos se llamó un método 
- Querés verificar cuántas veces fue invocado 
- Usás Mockito.verify() para las aserciones

```java
// Test con Mock (Mockito)
@Test
void deberiaEnviaremailAlRegistrar() {
	EmailService mockEmail = Mockito.mock(EmailService.class);
	var servicio = new ServicioDeRegistro(mockEmail);
	
	servicio.registrarUsuario("juan@ej.com");
	
	// Verificamos la INTERACCION
	verify(mockEmail, times(1))
		.enviarienvenida("juan@ej.con");
}

@Test
void nodeberiaEnviarEmailSiEmailInvalido() {
	EmailService mockEmail = Mockito.mock(Emailservice.class);
	var servicio = new ServicioDeRegistro(mockEnail);
	servicio.registrarUsuario(""); // email vacio

	// 8 Verificamos que NUNCA se 11am
	verify(mockEmail, never()).enviarBienvenida(any());
}
```

## SPY - el doble que ejecuta codigo real
cuando usarlo:
- Querés el comportamiento REAL del objeto 
- Y también necesitás verificar que ciertos métodos fueron llamados 
- Podés sobreescribir métodos puntuales sin tocar el resto 
- Útil cuando crear un mock completo sería demasiado costoso

```java
// Spy sobre objeto REAL
@Test
void deberiaUsarSumarDeVerdad() {
	Calculadora spy = Mockito.spy(new Calculadora());
	int resultado = spy.sumar(3, 4);
	// Codigo real ejecutado
	assertEquals(7, resultado);
	// Y verificamos la llamada
	verify(spy).sumar(3, 4);
}

@Test
void spyPermiteSobreescribirPuntual() {
	Calculadora spy = Mockito.spy(new Calculadora());
	// Solo este método devuelve falso
	doReturn(999).when(spy).multiplicar(anyInt(), anyInt());
	
	assertEquals(7,   spy.sumar(3, 4));       // REAL
	assertEquals(999, spy.multiplicar(3, 4)); // STUBBED
}
```
## FAKE - la implementacion liviana pero funcional
cuando usarlo:
- La dependencia real es muy costosa (BD, red, filesystem) 
- Un stub sería demasiado rígido para distintos tests 
- Necesitás estados distintos entre tests (guardar, buscar, listar) 
- Ejemplo clásico: repositorio en memoria en lugar de PostgreSQL

```java
// Fake: HashMap en memoria, légica REAL
class ProductoRepositoryFake implements ProductoRepository {
	private final Map<Long, Producto> db = new HashMap<>();
	
	public void guardar(Producto p) {
		db.put(p.getId(), p);
	}
	
	public Optional<Producto> buscarPorId(Long id) {
		return Optional.ofNullable(db.get(id));
	}

	public List<Producto> listarTodos() {
		return new ArraylList<>(db.values());
	}
}

@Test
void deberiaBuscarProductoGuardado() {
	var fake = new ProductoRepositoryFake();
	var servicio = new ServicioProducto(fake);
	
	servicio.agregar(new Producto(1L, "Notebook", 1500.0));
	assertEquals ("Notebook", servicio.buscar(1lL).get().getNombre());
}
```

# resumen de doubles
stub => controlas el entorno
mock => verificas la llamada
spy => real + observas
fake => implementacion liviana


|      | logica propia | controla entorno | verifica llamadas | reemplaza real |
| ---- | ------------- | ---------------- | ----------------- | -------------- |
| STUB | no            | si               | no                | si             |
| MOCK | no            | opcional         | si                | si             |
| SPY  | real          | opcional         | si                | envuelve       |
| FAKE | simple        | si               | no                | si             |
