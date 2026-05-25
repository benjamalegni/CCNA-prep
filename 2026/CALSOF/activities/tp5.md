1. Explicar la diferencia entre Verificación y Validación. Dar 2 ejemplos concretos de cada una. 

	verificacion es un proceso formal e interno en el cual se verifica el producto que se esta desarrollando. En cambio validacion se refiere al testeo por parte de usuarios.

	verificacion se centra en preguntarse si lo que esta haciendo se esta haciendo correctamente y validacion se centra en preguntarse si el sistema hace lo que el usuario necesita

	ejemplos: verificacion: unit testing, linting
	validacion: UAT, demos, prototipos

2. Explicar la pirámide de testing. ¿Por qué se recomienda tener muchos unit tests y pocos E2E? 
	porque los unit tests son los menos costosos de la suite de test. son modulares y ayudan a mantener un control en lo que hacen ciertas partes del codigo. los tests e2e son muy costosos y por lo tanto no se usan tanta cantidad de estos, pero igualmente tienen una alta importancia.
	
3. Definir qué es un Unit Test según Khorikov. ¿Qué significa que sea determinista? 
	define 3 puntos principales:
	- verifica una pequena porcion de comportamiento
	- lo hace rapido
	- lo hace de forma aisladas a otros tests
	con determinista se refiere a que si no cambia el codigo siempre va a devolver el mismo resultado
	
4. Explicar los 4 pilares de un buen unit test (protección contra regresiones, resistencia al refactoring, feedback rápido y mantenibilidad). 
	- proteccion contra regresiones: debe detectar que no al implementar funcionalidades no se rompen otras funcionalidades ya implementadas
	- resistencia al refactoring: no debe fallar si se cambia el comportamiento interno, solo verifica con interacciones al exterior
	- feedback rapido: debe ejecutarse rapidamente
	- mantenibilidad: deben ser facil de leer, de entender y de modificar
	
5. Definir: false positive y false negative. ¿Cuál es más dañino para un equipo y por qué? 
	- false positive es un error de testing que sucede aunque el sistema funcione correctamente
	- false negative es un error del sistema que no es dectado por la suite de testing
	es mucho mas peligroso un falso negativo. hay errores que conocemos y podemos preveernos como desarrolladores, pero encontrar aquellos errores que no conocemos y no son detectados puede ser mucho mas riesgoso en comparacion.
6. Explicar el patrón AAA (Arrange / Act / Assert) y por qué se recomienda una sola llamada en Act.
	arrange: importar dependencias, inicializar variables, instanciar objetos, etc.
	act: llamar al segmento que estamos testeando
	assert: verificar que los resultados obtenidos son correctos

ej 2:
que tipo de test aplicar: unit, integration, E2E.
7. Validar que el cálculo de impuestos de una factura sea correcto para distintos porcentajes. 
	unit
8. Verificar que un endpoint REST persiste correctamente un usuario en una base PostgreSQL real. 
	integracion
9. Verificar que el login funciona desde la interfaz web hasta la base de datos. 
	E2E
10. Verificar que el sistema arranca correctamente y responde a un request básico luego del deploy. 
	integracion
11. Verificar que un servicio envía un email cuando se registra un usuario, sin enviar correos reales.
	integracion

ej 3:
```java
public class PasswordValidator {

	public boolean isValid(String password) {
		if (password == null) return false;
		if (password length() < 8) return false;
		boolean hasUpper = false;
		boolean hasLower = false;
		boolean hasDigit = false;
		
	for (char c : password toCharArray()) {
		if (Character isUpperCase(c)) hasUpper = true;
		if (Character isLowerCase(c)) hasLower = true;
		if (Character isDigit(c)) hasDigit = true;
	}
	
	return hasUpper && hasLower && hasDigit;
	}
}
```
a) Escribir al menos 8 unit tests usando JUnit 5 que cubran casos normales y casos borde. 

1. isValid_passwordNull_returnsfalse:
	```java
	@BeforeEach
	public void setUp(){
		validator = new PasswordValidator();
	}
	
	@Test
	public void isValid_passwordNull_returnsFalse(){
		//arrange
		String password = null;
		
		//act
		boolean result = validator.isValid(password);
		
		assertFalse(result, "password null debera retornar false");
	}
	```
2. isValid_passwordVacio_returnsFalse
```java
@Test
public void isValid_passwordVacio_returnsFalse(){
	//arrange
	String password = "";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertFalse(result, "el password debe ser vacio")
}
```
3. isValid_passwordLongitudMenor8Chars_returnsFalse
```java
@Test

public void isValid_passwordLongitudMenor8Chars_returnsFalse(){
	//arrange
	// cumple con los requisitos de mayusculas, minusculas y digitos
	String password = "Ab2";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertFalse(result, "el password tiene menos de 8 caracteres")
}
```
	
4. isValid_passwordSinMayuscula_returnsFalse

```java
@Test

public void isValid_passwordSinMayuscula_returnsFalse(){
	//arrange
	String password = "abcdefg2";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertFalse(result, "el password debe tener al menos una mayuscula")
}
```

5. isValid_passwordSinMinuscula_returnFalse
```java
@Test

public void isValid_passwordSinMinuscula_returnsFalse(){
	//arrange
	String password = "ABCDEFG2";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertFalse(result, "el password debe tener al menos una minuscula")
}
```
6. isValid_faltaNumero_returnFalse
```java
@Test

public void isValid_passwordSinMinuscula_returnsFalse(){
	//arrange
	String password = "abcdEFGH";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertFalse(result, "el password debe tener al menos un numero")
}
```

edge cases:
7. isValid_contrasenaMuyLarga_returnsTrue
```java
@Test

public void isValid_contrasenaMuyLarga_returnsTrue(){
	//arrange
	String password = "sadkjsdaflkdsjfljlaskfjasdlkfjASDFASDFsldkfjdsl9809890384";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertTrue(result, "el password cumple los requisitos de minusculas, mayusculas y numeros. debe retornar true")
}
```

8. isValid_soloCaracteresEspeciales_returnsTrue
```java
@Test

public void isValid_soloCaracteresEspeciales_returnsTrue(){
	//arrange
	String password = "@#($*#$(^%(%@8)))";
	
	//act
	boolean result = validator.isValid(password);
	
	//assert
	assertTrue(result, "la password debera tener al menos 1 minuscula,  1 mayuscula y 1 numero. De lo contrario, retorna false")
}
```
d. indicar que tipo de cobertura se logra (line vs branch) y que casos faltan si existieran
se logra cobertura de lineas 100%
cobertura de branches 100%
hay otros dos edge cases que tambien podrian abordarse:
- que pasa cuando se usan caracteres extendidos, si por regla del negocio solo aceptan caracteres ASCII estandar entonces deberia restringirse el uso de estos
- que pasa con los caracteres blancos, debatir si se podria usar una contrasena como "A b c 8 a a a a", por ejemplo.

ej 4. test doubles
```java
public interface EmailSender {
	void send(String to, String subject, String body);
}

public class UserService {
	private final EmailSender emailsender;
	
	public UserService(EmailSender emailSender) {
		this emailSender = emailSender;
	}

	public void register (String email) {
		if (email == null || !email.contains.("@")) {
			throw new Illegal ArgumentException("Invalid email");
		}
	
		// simulalégica de registro...
		emailSender.send(email, "Welcome", "Thanks for registering!");

	}
}
```
a) Escribir un unit test usando Mockito que verifique que se llama a send() exactamente una vez. 
```java
@Test
public void register_enviaMail1Vez_returnsTrue(){
	//arrange
	EmailSender mockEmailSender = Mockito.mock(EmailSender.class);
	
	UserService userService = new UserService(mockEmailSender);	
	
	//act
	
	userService.register("lukabenjaminmalegni@gmail.com");
	
	//assert
	verify(mockEmailSender, times(1)).send("lukabenjaminmalegni@gmail.com","Welcome", "Thanks for registering!")

}
```
b) Escribir un unit test que verifique que con email inválido se lanza excepción y NO se envía correo. 
```java
@Test
public void register_emailInvalido_returnsException(){
	//arrange
	EmailSender mockEmailSender = Mockito.mock(EmailSender.class)
	
	UserService userService = new UserService(mockEmailSender);
	
	//act
	
	// 	userService.register("benjita");
	// eso romperia el test asi que hay que usar assertThrows.
	
	assertThrows(IllegalArgumentException.class, () -> {
		userService.register("benjita");
	});
	
	//assert
	// verifica que nunca llamo al send porque primero tiro una excepcion
	verify(mockEmailSender, never()).send(anyString(),anyString(),anyString())
}
```

c) Explicar si en este caso se está usando un mock o un stub, y por qué. 
se esta usando un mock porque estamos analizando el comportamiento de la clase, en cambio si estuvieramos usando stub solo nos centrariamos en lo que devuelve esa accion
stub siempre requiere que un metodo no sea void, por lo que es obligatorio usar mock en estas situaciones.

d) Implementar un FakeEmailSender (sin Mockito) que almacene los correos enviados en memoria, y escribir un test basado en estado (state-based).
```java
public class FakeEmailSender implements EmailSender(){
	// aca hay un code smell introduce parameter object.
	// se podria usar un objeto Email directamente para el metodo send
	private List<String> destinatariosEnviados = new ArrayList<>();
	
		
	// 3. Respetamos la firma original de la interfaz
    @Override
    public void send(String to, String subject, String body) {
        // Lógica de mentira: En lugar de enviar un mail por internet, 
        // simplemente guardamos el destinatario en nuestra lista en memoria.
        destinatariosEnviados.add(to);
    }
    
    // 4. NECESITAMOS un método extra para que el test pueda "ver" el estado
    public List<String> getDestinatariosEnviados() {
        return destinatariosEnviados;
    }
}
		

@Test
public class UserServiceTest(){
	public void register_enviaMail_usandoFake(){
		// arrage
		FakeEmailSender fes = new FakeEmailSender();
		
		UserService userService = new UserService(fes);

		// act
		userService.register("lukabenjaminmalegni@gmail.com")
		
		// assert
		assertTrue(1, fes.getDestinariosEnviados().size();
		assertEquals("lukabenjaminmalegni@gmail.com", fes.getDestinariosEnviados.get(0));
	}
}


```

1. ¿Qué métodos (modos) se usan con verify()?
verify() sirve para comprobar cuántas veces se llamó a un método. Por defecto, si pones verify(mock).metodo(), asume que se llamó exactamente 1 vez. Pero puedes pasarle un segundo parámetro para ser más específico (se llaman Verification Modes):
	*   times(n): Verifica que se llamó exactamente n veces.
        verify(mockEmail, times(3)).send(...); // Exactamente 3 veces
    *   never(): Verifica que NUNCA se llamó (es lo mismo que times(0)).
        verify(mockEmail, never()).send(...);
    *   atLeast(n) / atLeastOnce(): Verifica que se llamó al menos esa cantidad de veces.
        verify(mockEmail, atLeast(2)).send(...); // 2, 3, 100 veces (pero no 0 ni 1)
    verify(mockEmail, atLeastOnce()).send(...); // Igual a atLeast(1)
    *   atMost(n) / atMostOnce(): Verifica que se llamó como máximo esa cantidad de veces.
        verify(mockEmail, atMost(2)).send(...); // 0, 1 o 2 veces.
    *   only(): Verifica que ese método fue el ÚNICO que se llamó en todo el mock.
(Dato clave: dentro de los parámetros del método que verificas, sueles usar Argument Matchers como any(), anyString(), anyInt(), o eq("valorExacto") para no tener que escribir los datos literales si no te importan).
---
2. ¿Qué métodos principales tiene la clase Mockito?
La clase Mockito es una caja de herramientas estáticas. Sus métodos más usados son:
*   mock(Clase.class): Crea el objeto falso (vacío por dentro).
*   spy(objetoReal): Envuelve un objeto real para poder espiarlo.
*   when(...): Es el inicio para crear un Stub. Significa: "Cuando pase esto..."
*   verify(...): Es el inicio para verificar comportamiento. Significa: "Verificá que haya pasado esto..."
*   verifyNoInteractions(mock): Te asegura que nadie tocó ese mock en absoluto durante todo el test.
*   doThrow(Excepcion.class).when(mock)...: Se usa para obligar a un mock a lanzar un error (¡súper útil cuando el método es void y no puedes usar thenReturn!).


# un stub se ve asi
PasarelaDePago stub = (tarjeta, monto) -> true;

luego puede usarse como parametro del construccion del objeto que se va a testear.

el resultado se verifica con assert, no con verify (porque ahi se estaria testeando funcionamiento y eso seria un mock)

## fake vs stub
Respuesta teórica — Fake vs. Stub: ¿Cuándo el Fake tiene sentido? 
- Distintos tests necesitan distintas respuestas (4xxx → aprueba, otras → rechaza) 
- La lógica de decisión es lo suficientemente compleja para ser encapsulada 
- El Stub hardcodeado ya no alcanza para cubrir los escenarios 

¿Cuándo el Stub es suficiente? 
- Solo necesitás que procesar() devuelva true o false para tu test concreto 
- La lógica de la pasarela no es lo que estás testeando 
- Un lambda es suficiente: (t, m) -> true


- se usa assert cuando es stub
	- se puede usar una funcion lambda para implementaciones de una interfaz de un solo metodo: Stub stub = (parametro) -> false;
	- se puede usar when(metodo()).thenReturn(false);
	- luego se usa assertFalse, assertTrue, assertEquals, etc. 
- se usa verify cuando es mock
- cuando hay excepciones se usa assertThrow(IllegalArgumentException.class, ()->metodoALlamar(parametro))
	- y luego se hace assert como. verify(objeto_dependiente, never()).registrarTransaccion(any(), etc)
	- osea nunca se llego a llamar a registrar transaccion porque hubo una excepcion
- 