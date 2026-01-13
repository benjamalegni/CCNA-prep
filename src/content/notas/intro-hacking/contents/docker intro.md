Dockerfile:  
FROM ubuntu  
MAINTAINER luka malegni “[lukabenjaminmalegni@gmail.com](mailto:lukabenjaminmalegni@gmail.com)”

* **FROM**: se utiliza para especificar la imagen base desde la cual se construirá la nueva imagen.  
* **RUN**: se utiliza para ejecutar comandos en el interior del contenedor, como la instalación de paquetes o la configuración del entorno.  
* **COPY**: se utiliza para copiar archivos desde el sistema host al interior del contenedor.  
* **CMD**: se utiliza para especificar el comando que se ejecutará cuando se arranque el contenedor.

docker build \-t my\_first\_image .

1. **`docker build`**: Es la instrucción principal que le dice a Docker que comience el proceso de construcción de una imagen.  
2. **`-t my_first_image`**: Es la opción para **etiquetar** (`-t` por *tag*) la imagen resultante. `my_first_image` es el nombre que le estás dando a esta nueva imagen para poder referirte a ella más tarde.  
3. **`.`**: Significa "directorio actual". Le dice a Docker que busque un archivo llamado `Dockerfile` **en la carpeta donde estás ejecutando el comando**. El `Dockerfile` contiene las instrucciones paso a paso para construir la imagen.

docker images \-\> para listar imagenes  
docker pull debian:latest \-\> para hacer pull de una imagen ya existente 

por cada cambio que se hace en el Dockerfile hay que volver a hacer build de la imagen

docker run \-dit \--name myContainer my\_first\_image \-\> **correr contendor**  
docker ps \-\> **listar contenedores que estan ejecutandose actualmente**  
docker exec \-it myContainer bash \-\> ejecuta en el contenedor myContainer el comando bash 

RUN sirve para ejecutar comandos (por ej instalar paquetes) al inicializar el contenedor

docker ps \-a \-\> muestra contenedores finalizados tambien  
docker rm “id del contenedor” \--force \-\> borrar un contenedor especifico

eliminar todos los contenedores del sistema: **docker rm $(docker ps \-a \-q) \--force**  
eliminar todas las imagenes del sistema: **docker rmi $(docker images \-q)**

imagen debian noninteractive terminal configuracion en Dockerfile:  ENV DEBIAN\_FRONTEND noninteractive

##### port forwarding

Para utilizar el port forwarding, se utiliza la opción “**\-p**” o “**–publish**” en el comando “**docker run**“. Esta opción se utiliza para especificar la redirección de puertos y se puede utilizar de varias maneras. Por ejemplo, si se desea redirigir el puerto 80 del host al puerto 8080 del contenedor, se puede utilizar la siguiente sintaxis:

➜ `docker run -p 80:8080 mi_imagen`

➜ `docker run -v /home/usuario/datos:/datos mi_imagen`

Esto montará el directorio “**/home/usuario/datos**” del host en el directorio “**/datos**” del contenedor. Si se desea especificar una opción adicional, como la de montar el directorio en modo de solo lectura, se puede utilizar la opción “**\-v**” con un formato diferente. Por ejemplo, si se desea montar el directorio en modo de solo lectura, se puede utilizar la siguiente sintaxis:

➜ `docker run -v /home/usuario/datos:/datos:ro mi_imagen`

[https://github.com/vulhub/vulhub](https://github.com/vulhub/vulhub) para encontrar imagenes de docker compose vulnerables