Depende del contexto
Depende del usuario / stakeholders
Depende del propósito (fitness for purpose)

Calidad = Grado en el que un conjunto de características inherentes cumple con Grado en el que un conjunto de características inherentes cumple con los requisitos (ISO 9000:2005) …y satisface necesidades del usuario en contexto real

### la calidad es multidimensional
- funcionabilidad
- fiabilidad
- usabilidad
- eficiencia
- mantenibilidad
- portabilidad

### perspectivas de calidad
basada en usuario (adecuacion)
basada en fabricante (proceso)
basada en producto (caracteristicas)
basada en valor (precio/beneficio)

## calidad programada vs realizada vs esperada
programada: lo que planificamos
realizada: lo que construimos
esperada/necesaria: lo que el usuario necesita

## Gestión / Aseguramiento / Control 
Gestión (Quality Management): dirigir y coordinar 
- Actividades coordinadas para dirigir y controlar una organización en lo relativo a la calidad, aplicando la política de calidad (objetivos y directrices generales de calidad de una empresa) 
- Normalmente se aplica a nivel de empresa 
Aseguramiento (Quality Assurance): dar confianza / prevenir 
- Orientada a proporcionar confianza en que se cumplirán los requisitos de la calidad 
- Pretende dar confianza en que el producto tiene calidad porque se ha seguido un proceso de confección auditado 
Control (QC): evaluar / detectar 
- Parte de la gestión de la calidad orientada al cumplimiento de los requisitos de la calidad 
- En general, son las actividades para evaluar la calidad de los productos desarrollados

#### software en particular
es intangible
- solo vemos su comportamiento
nunca esta terminado
la complejidad escala rapido

# 3 niveles de calidad (ISO 9126)
- Calidad interna: propiedades del código 
	- acoplamiento 
	- cohesion 
	- legibilidad 
- Calidad externa: comportamiento en pruebas 
	- tests unitarios 
	- tests de integración 
	- cobertura 
- Calidad en uso: experiencia real del usuario 
	- performance real 
	- estabilidad 
	- experiencia

niveles del curso

unit 1: calidad interna
- Calidad de código (clean code, solid, etc.) 
- métricas / smells 
- deuda técnica / refactoring
unit 2: Calidad Externa 
- Unit testing 
- Integration testing - TDD 
unit 3: Calidad en Uso 
- DevOps 
- CI/CD → feedback continuo

# golden rules
- cambios chicos y frecuentes
- tests como red de seguridad
- revision de codigo como aprendizaje
- CI como feedback inmediato

### atributos de calidad
Mantenibilidad → refactors seguros (**lo que mas pagamos a lo largo del tiempo**)
Confiabilidad → menos incidentes 
Performance → costos y UX 
Seguridad → riesgo

calidad = capacidad de cambio

### medida base vs derivada vs indicador
- Base: directas / crudos 
	- líneas de código 
	- cantidad de horas 
	- número de bugs 
- Derivada: combinan datos base para ser mas informativas 
	- defectos por mil líneas de código 
	- velocidad promedio por sprint 
- Indicador: número interpretado bajo un modelo y un criterio 
	- complejidad alta + alta tasa de cambios + baja cobertura = ALTO RIESGO 
	- permite actuar

## objetivos a medir
entender que pasa
controlar
mejorar

1. Entender: ¿qué pasa? 
	a. ¿Dónde se concentran los bugs? 
	b. ¿Qué módulos cambian más seguido? 
	c. ¿Cuánto tardamos en pasar de commit a producción? 
2. Controlar: saber si el sistema se mantiene dentro de ciertos límites aceptables 
	a. que la cobertura no caiga 
	b. que la complejidad no crezca sin control 
	c. que el tiempo de integración no se dispare 
3. Mejorar: entender si los cambios surten efecto 
	a. ¿bajó la complejidad? 
	b. ¿mejoro el lead time?
# GQM (goal-question-metric)
que objetivo buscamos?

1. definir objetivo: que mejorar o entender?
2. formular preguntas: que modulos son mas dificiles de cambiar, donde aparecen mas bugs despues de un cambio?
3. elegir metricas para responderlas: complejidad ciclomatica, frecuencia de cambios, cobertura, etc.

## tipos de metricas
- ### metricas clasicas
	- LOC: lineas de codigo
	- CYCLO: complejidad ciclomatica
	- duplicacion: copy/paste
- ### metricas orientadas a objetos
	- Cohesión: qué tan relacionadas están las responsabilidades dentro de una clase o módulo (alto = mejor) 
	- Acoplamiento: cuánto depende una clase de otras (bajo = mejor) 
	- CBO (Coupling Between Objects)/RFC (Response For a Class): cuantifican cohesión/acoplamiento

mejoras de procesos:
- Medir tiene que ser parte un proceso más grande de mejora 
- CMMI / SPICE / ISO 
	- modelos que intentan sistematizar la calidad 
	- Ingenieria 2  
- Automatización como palanca para integrar métricas en el proceso 
	- Si esperamos que alguien lo haga manualmente: falla 
	- Si está automatizado con el pipeline: es repetible y confiable