### firewall - filtrado de paquetes
sistema o grupo de sistemas utilizados para separar una maquina o una subred (zona protegida) del resto de la red (zona de riesgo)

==un cortafuegos o firewall es un elemento de hardware o software que se utiliza para controlar las comunicaiones, ya sea permitiendolas o bien prohibiendolas segun las politicas de red que hayan sido definidas==

perimetro interno: donde se situan todos los recursos sensibles a un posible ataque
perimetro externo: donde se situan los recursos menos sensibles que necesitan ser accesibles desde la red externa por motivos funcionales
![[Pasted image 20240923135734.png]]

## como funciona?
- establece politicas de control entre ambos entornos
- filtrado de paquetes, consiste en denegar o permitir el flujo de info entre la red interna que deseamos proteger y el resto o la red externa
- actuan sobre la capa de red y la de transporte de la pila TCP/IP. analizan la cabecera sin llegar a los datos

### firewall - politicas por defecto
existen dos esquemas o politicas por defecto a la hora de configurar un firewall, aceptacion o rechazo
- en la primera se filtran o rechazan conexiones consideradas peligrosas mientras que se acepta o admite todo el resto
- en la segunda se aceptan aquellas conexiones que se consideran legales o validad mientras que se filtra o rechaza el resto

### firewall - limitaciones
que no puedo proteger con un firewall?
trafico que no se puede analizar:
- trafico que no lo atraviesa (puertas traseras)
- ataques desde la red interna
- servicios publicos: e-mail, virus, spam, web, ftp
- robo de info de empleados
- ataques de ingenieria social
- servicios mal configurados

## seguridad - conceptos
- confidencialidad: solo los usuarios autorizados pueden acceder a nuestros recursos, datos e info
- integridad: solo los usuarios autorizados deben ser capacer de modificar datos cuando sea necesario
- disponibilidad: los datos deben estar disponibles para los usuarios cuando sea necesario

- autenticacion: estas realmente comunicandote con lo que piensas que te estas comunicando
