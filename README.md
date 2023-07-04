![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/URJC.jpeg?raw=true)


# Balloon World Championship
#### Juegos en Red 19/10/2022


[![IMAGE ALT TEXT](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/youtube.png?raw=true")](https://www.youtube.com/watch?v=upU5jlswTfo)

#### Juegos en Red 04/07/2023


[![IMAGE ALT TEXT](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/[youtube.png?raw=true")](https://www.youtube.com/watch?v=nmIc5BYNxwg)



###### Juego de Deportes
<img src= "https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Astar%20chiquito.jpeg?raw=true" width = "200">

##### Daniel Capilla Sánchez 
Correo: d.capilla.2020@alumnos.urjc.es
Github: Dacapi89
##### Daniel Álvarez Franco
Correo: nn.maqueda.2020@alumnos.urjc.es 
Github: MrsNoelya
##### Noelia Nayara Maqueda Soto
Correo:  d.alvarez.2020@alumnos.urjc.es
Github: DanWfram
##### Álvaro Martín Hita
Correo: a.martin.2020@alumnos.urjc.es  
Github: MakarovHitita
## **ÍNDICE**
-  **INTRODUCCIÓN**    
1.1. Concepto del Juego    
1.2. Características Principales    
1.3. Género    
1.4. Propósito y Público Objetivo    
1.5. Jugabilidad    
1.6. Estilo Visual    
1.7. Alcance    
- **MECÁNICAS DEL JUEGO**   
2.1. Mecánicas Básicas    
2.2. Un Toque    
2.3. Obstáculos    
2.4. Power Ups    
2.5. Temporizador y Puntos    
2.6. Selección de Nivel    
2.7. Personajes    
- **INTERFAZ**    
3.1. DIAGRAMA DE FLUJO    
3.2.  PANTALLA PRINCIPAL DE CARGA    
3.3.  MENÚ PRINCIPAL    
3.4. CONFIGURACIÓN    
3.5. SELECCIÓN DE ESCENARIO    
3.6. NIVEL    
3.7. FIN DE NIVEL    
3.8. MENÚ DE PAUSA    
- **ARTE**   
4.1. META GENERAL DEL ARTE    
4.2. ARTE 2D    
4.3. AUDIO    
- **REFERENCIAS**   

## INTRODUCCIÓN
###### 
Este es el documento de diseño del Balloon World Championship. Un videojuego para navegador en PC, realizado con el game framework Phaser. Este documento tiene como objetivo principal mostrar los elementos que estará compuesto Balloon World Championship.
### 1.1. Concepto del Juego
###### 
Como su propio nombre indica, estamos ante un videojuego que trata sobre el deporte que se puso de moda en el año 2021. Jugadores/as de distintas nacionalidades compiten en una extraña pero divertida competición de globos de aire, que consiste en que el globo no toque el suelo.
### 1.2. Características Principales
###### 
El videojuego sigue las mismas reglas que el deporte original:
Dos o más jugadores, metidos en una sala preparada con distintos obstáculos y tendrán que rivalizar para ver quien no llega a elevar el globo del suelo. Si el rival no logra golpear al balón, el contrario gana un punto y el que acumule más puntos en un tiempo determinado gana. 
### 1.3. Género
###### 
Balloon World Championship es un videojuego de deportes. Género que requiere de habilidad y precisión para poder jugarlos. Al exigir habilidad, se puede mejorar en ellos a través de la práctica continua al videojuego. Como se trata de un juego que tiene que tiene que ser lo más parecido a el de la realidad, no suele tener una gran historia.

También, Balloon World Championship es un videojuego en 2D de plataformas, que se caracteriza por tener que caminar, correr, saltar o escalar sobre una serie de plataformas, con enemigos, mientras se interactúa con objetos para poder completar el juego. Género surgido a comienzo de la década de 1980 y que sigue manteniendo bastante popularidad en la actualidad.
### 1.4. Propósito y Público Objetivo
###### 
El principal propósito de este videojuego es sin lugar a dudas, permitir a aquellos usuarios que les fascinó aquel evento y/o el deporte, puedan jugar y experimentar algo parecido a través de un videojuego.

El público objetivo de Balloon World Championship no tiene ningún rango específico de edad, por lo tanto, lo podrán jugar niños de a partir de 7 años hasta edades más mayores. Lo indispensable para poder jugar a este videojuego es tener una computadora.
### 1.5. Jugabilidad
###### 
La jugabilidad sería, en resumen, una mezcla del Basketball Heads mezclado con plataformas. La base de la jugabilidad es: un personaje con una mano puede elevar un globo para evitar que toque el suelo o alguno de los obstáculos del escenario. Para mayor dificultad y diversión, se mezclan las plataformas para obligar a tu rival a subir por ellas para no perder.
   Al comienzo de la partida, los dos jugadores aparecerán en los extremos inferiores del escenario, y el globo entre ambos, y elevado del suelo. Al empezar, los jugadores deberán tocar el globo para evitar que caiga y perder los dos. Una vez uno lo toque, el globo cambiará de color para indicar a quien le toca. Los jugadores estarán resaltados de un color (rojo o azul) y así sabrán a quién le toca golpear el globo.
   Si el globo toca el suelo, el jugador que debía golpearlo pierde punto, y se vuelve a empezar. Si el globo toca un obstáculo, el que le deba de golpear tiene 5 segundos para darle antes de perder. El ciclo sigue hasta que se acabe el temporizador. Los jugadores, como se ha podido deducir del párrafo anterior, no pueden tocar el globo dos veces seguidas o perderán el punto.
   A medida que pase el tiempo, podrán aparecer power ups aleatorios en el escenario. Cuando el globo toca un power up, se activa: los verdes se activan para el último que tocó el globo, los naranjas para el que tiene que golpearlo, y los blancos se activan sin importar quien tocase el globo la última vez. Estos power ups tienen distintos efectos, tales como: caída lenta o rápida,“el suelo es lava”,“sin manos”, …
   Los personajes, elegibles en la pantalla de selección de partida, tendrán distintas habilidades, sin llegar a romper el juego. Ejemplos: el español tiene más tiempo para golpear el globo en un obstáculo, el brasileño tiene doble salto, el francés golpea el globo más alto.
### 1.6. Estilo Visual
###### 
El estilo visual de Balloon World Championship es del tipo pixel art. Un estilo que encaja a la perfección con la idea y mecánica del juego, puesto que lo más importante es la jugabilidad y no tanto los gráficos. El estilo pixel art define muy bien todos los aspectos de un escenario y tiene un gran acabado con los personajes.
### 1.7. Alcance
###### 
Desde nuestro estudio, tenemos pensado en añadir más nacionalidades a Balloon World Championship, para así ampliar el repertorio de personajes. También pensamos en sacar diferentes skins al globo para darle un toque más divertido.
## MECÁNICAS
### 2.1. Mecánicas Básicas
###### 
Los personajes podrán Moverse en las 4 direcciones clásicas (arriba, abajo, izquierda y derecha), así como la combinación de ambas, en total 8 direcciones. 
Los personajes también podrán Saltar siempre que lo hagan desde una superficie. También, el jugador podrá lanzar el globo en una de las tres direcciones posibles: hacia arriba, hacia el noreste y hacia el noroeste.
También existen Plataformas, las cuales estarán dispuestas en el aire y les servirán a los jugadores para llegar a lugares más altos si lo necesitan.
Si el Globo Toca el Suelo o las plataformas, el último jugador en golpearlo gana punto y se vuelve a sacar.
### 2.2. Un Toque
###### 
El globo solo puede ser Tocado Una Vez por jugador. Para volver a lanzarlo, deberán esperar a que el rival lo toque. 
Para diferenciar qué jugador debe golear el globo, este Cambiará de Color.
### 2.3. Obstáculos
###### 
Al igual que hay plataformas, hay Obstáculos Distribuidos por el escenario. Los jugadores podrán moverse por estos obstáculos, como si de otra plataforma se tratase. 
Si el Globo Toca un Obstáculo, el que debe golpear el globo tiene 5 segundos para sacarlo de ahí o perderá el punto.
### 2.4. Power Ups
###### 
Durante la competición, aparecerán Aleatoriamente distribuidos por el escenario distintos Power Ups, los cuales se activan cuando el globo los toca desde cualquier dirección.
   Los power ups tienen un Símbolo que indica su efecto y un Reborde de 3 Colores diferentes: verde, naranja y blanco. Los verdes se activa para el último jugador en tocar el globo, los naranjas para el que debe de tocarlo, y los blancos no importan quien golpeó el globo por última vez, ya que se activan siempre.
   Los efectos de los power ups pueden ir desde Alteraciones de las Capacidades de los jugadores: mayor salto, mayor velocidad de movimiento, lanzamiento de globo más alto; como Cambios en la propia Jugabilidad: “suelo es lava”, “punto doble”, caída rápida o lenta, …
### 2.5. Temporizador y Puntos
###### 
El objetivo principal de la partida será conseguir el Mayor Número de Puntos posibles en el Tiempo Determinado.
### 2.6. Selección de Nivel
###### 
Antes de empezar la partida, los jugadores, tanto en local como online, podrán Personalizar el Escenario. Esta personalización se resume en: selección de plataformas, selección de obstáculos, fondo, temporizador y frecuencia de power ups.
### 2.7. Personajes
###### 
Los personajes, jugadores de países, tendrán distintas Habilidades Pasivas, las cuales serán únicas, pero no demasiado poderosas para no romper la experiencia de juago. Algunas de estas habilidades son, por ejemplo: el personaje brasileño tiene doble salto, el español lanza el globo más alto, el francés tiene más tiempo para golpear el globo en un obstáculo, …
## INTERFAZ
### 3.1. DIAGRAMA DE FLUJO
###### 

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Flujo.jpeg?raw=true)

### 3.2.  PANTALLA PRINCIPAL DE CARGA
###### 
Esta pantalla de carga aparecerá por unos breves segundos antes de que aparezca el menú principal, mostrando el logo de la empresa desarrolladora.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Astar.jpeg?raw=true)

### 3.3.  MENÚ PRINCIPAL
###### 
Este es el menú principal que consta de dos opciones:
- Play: lleva a la selección de escenario del juego.
- Settings: abre el menú de configuración.

![Menú Principal](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Menu.jpeg?raw=true")

### 3.4. CONFIGURACIÓN
###### 
En el menú de configuración tenemos las siguientes opciones: 
- Volumen de música: permite seleccionar al jugador la intensidad del sonido del juego. 
- Controles: muestra al jugador los controles para poder jugar de manera correcta al videojuego.
- Créditos: muestra todas las personas que se han encargado en el desarrollo del videojuego.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Settings.jpeg?raw=true)

### 3.5. SELECCIÓN DE ESCENARIO
###### 
En el menú de selección de escenario, el jugador tendrá la opción de elegir qué escenario le gustaría jugar. Solo podrá elegir entre dos escenarios. Si el jugador desea volver al menú principal, también lo podrá hacer desde este menú. 

![Selección de Escenario](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Levels.jpeg?raw=true)

### 3.6. NIVEL
###### 
Se pueden encontrar dos características en el HUD del nivel: 
- Arriba a la izquierda se encuentra el tiempo restante de la partida hasta que esta finalice.
- Abajo a la derecha hay un botón para pausar la partida.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Levels.jpeg?raw=true)

### 3.7. FIN DE NIVEL
###### 
En esta pantalla se muestra que jugador ha logrado salir victorioso y el número de puntos de todos los jugadores. 

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Victory.jpeg?raw=true)

### 3.8. MENÚ DE PAUSA
###### 
En el menú de pausa, el jugador podrá continuar con su partida en donde la había dejado en el momento antes de entrar al menú, acceder al menú de configuración, o bien salir al menú principal del juego. 

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Pausa.jpeg?raw=true)

## ARTE
### 4.1. META GENERAL DEL ARTE
###### 
El acercamiento artístico busca ser agradable e inocente, ya que se trata de un juego casual de deportes, por ende el arte contendrá en mayor medida escenarios artísticos sobresaturados y alegres. 
### 4.2. ARTE 2D
###### 
- Pantalla de menú.     
- Sprites de personajes. 
- GUI y botones.
- Texturas del fondo de ambiente.
- Tiles del nivel.   
- Sprites de objetos y entidades.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Fondo.jpeg?raw=true)

<img src = "https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Francia.jpeg?raw=true" width = "200">
<img src = "https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Esp.jpeg?raw=true" width = "100">

<img src = "https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Tiles.jpeg?raw=true" width = "200">

### 4.3. AUDIO
###### 
Dado el ambiente del juego, se dará música en escala mayor  con ritmo, mientras que la música de inicio será anunciando de manera épica el videojuego (parecido al tema de la Champions League), la música que se use mientras se esté en una partida también tendrá un toque de intriga, al tratarse de una competición.
Por esto mismo se tiene como referencia la temporada 2 de la serie inazuma eleven, la cual mezcla el concepto sobrenatural misterioso con el fútbol. 

## REFERENCIAS
- Estructura del GDD: https://github.com/dsaltares/sion-tower/blob/master/doc/gdd/gdd.pdf
- Reglas oficiales de la Balloon World Cup: https://balloonworldcup.pro/reglas-de-juego/

## ACTUALIZACIÓN FASE 2
###### 
En esta fase, el equipo de desarrollo y diseño, se ha creado el videojuego Balloon World Championship basandose en el GDD. El videojuego se ha implementado de manera local (hay 2 jugadores que pueden jugar al videojuego desde el mismo teclado y ordenador).

### ESCENAS
###### 
La **primera escena** se trata del logo del grupo a modo de introdución y un mensaje para continuar hacia la siguiente pantalla.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_Intro.png?raw=true)

###### 
La **segunda escena** contiene el menú principal del juego con el logo del videojuego. De momento solo hay dos botones para interactuar, que es el de PLAY (de manera local) y el de créditos. Todos los botones, van a a tener asociados a su derecha la tecla que los acciona. Para las siguientes fases, se tiene pensado en añadir más botones, como el de opciones y el de online.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_InicioV2.png?raw=true)

###### 
La **tercera escena** trata sobre el escenario donde se realiza el torneo de globos de aire. En él, competirán 2 jugadores por haber quién consigue más puntos. El escenario de fondo se  encuentra en movimiento mientras que la plataforma y el suelo está estático.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_Partida.png?raw=true)
###### 
La **cuarta escena** viene de la escena anterior, en concreto del botón de pausa situado en la esquina inferior derecha, en el que hay que pulsar la tecla P para interactuar con él. Este pausa el estado en el que se encuentra la partida dando al jugador dos opciones de momento: continuar con la partida o por el contrario volver al menú principal.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_Pausa.png?raw=true)
###### 
La **última escena** enseña el resultado de la partida que se ha jugado previamente ha modo de ranking. En ella hay dos botones uno para volver a jugar (Enter) y otro para ir al menú principal (P).

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_Ranking.png?raw=true)

La **escena de los créditos**, pulsando la tecla O desde el menú principal, muestra el nombre de las personas que han intervenido en la creación del videojuego, así como la música usada. 

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_Creditos.png?raw=true)

### DIAGRAMAS DE FLUJO

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F2_Pantallas.png?raw=true)

## ACTUALIZACIÓN FASE 3
###### 
En esta fase, el equipo de desarrollo y diseño, se ha implementado un chat y un sistema de login con siguiendo una API rest. 
### ESCENAS
###### 
La **primera escena** se trata de una pantalla de inicio de sesión que permitira al servidor guardar tu paso por este.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Login.png?raw=true)

###### 
La **escena del menu principal** contiene el menú principal del juego con el logo del videojuego, sin embargo el cambio a notar se da en la implementacion de un campo de texto a y un botón con la palabra send, tras usarlo aparceran mensajes en la parte superior, el color azul representa los mensajes de tu actual sesion y los rojos indican los mensajes de el otro jugador y tus mensajes tras haber vuelto a entrar en el servidor.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Pantalla_De_Inicio.png?raw=true)

## ACTUALIZACIÓN FASE 4
###### 
En esta fase, el equipo de desarrollo y diseño, se ha implementado los WebSockets en la url/direcciónIP/Pos.

######
WebSocketPositionHandeler se encarga de distribuir los datos enviados del Cliente1 al Cliente2, y viceversa. Es una comunicación bidireccional. Se abre el socket cuando se inicia una partida online, y se cierra natualmente cuando se acaba. Mientras dura la partida, ambos clientes mandan información, y el servidor notifica de los cambios a ambos clientes.

######
Aplication, ahora nombrado BallonWorldChampionshipAplication, define la interfaz de WebSocket.

### DIAGRAMAS DE FLUJO

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F4_Javascript.png?raw=true)

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/F4_JavaServ.png?raw=true)

## ACTUALIZACIÓN FASE 3 EXTRAORDINARIA
###### 
La fase se ha mejorado introduciendo cambios estéticos y funcionales. 
### ESCENAS
###### 
La **primera escena** el login ahora muestra mensajes para ayudar al usuario a saber donde se encuentra, además se da a entender que no es un login como tal sino un "introduce un nombre para jugar".
En esta escena se hace un método POST a un archivo de texto para guardar a los jugadores.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/LoginV2.png?raw=true)

###### 
La **escena del menu principal** ahora tiene un chat totalmente en inglés que utiliza los métodos POST y GET para poder entablar conversaciones con otros usuarios. El chat solo está disponible en esta escena. También avisa al resto de jugadores si un usuario ha abandonado la sala.
Se ha introducido como novedad el botón "DELETE USER", que realiza un DELETE borrando el nickname que el jugador ha introducido. Cuando se pulsa el botón manda al usuario un mensaje de retroalimentación.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/InicioV2.png?raw=true)


![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Delete.png?raw=true)

###### 
La **escena de victoria** aparte de mostrar al jugador que ha obtenido más puntos en la partida, ahora muestra un ranking con los jugadores con las puntuaciones más altas. La puntuación se actualiza si esta supera a la anterior con un método PUT al finalizar la partida.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/VictoryV2.png?raw=true)

El diagrama de clases de API REST es el siguiente:

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/FlujoV2.png?raw=true)

###### 
**Instrucciones:** para poder ejecutar el videojuego se tiene que descargar el .zip y la carpeta Ballon World Championship se tiene que agregar al Spring Tool Suit. En principio, no hay que cambiar ninguna dirección ip ya que la coge automáticamente del propio ordenador (location.host), también pasa con el CORS que está puesto para que cualquiera poda acceder a los datos (@CrossMapping origins = "*"). Lanzar en el servidor y abrir una pestaña con la dirección ip de tu ordenador (para verla, poner en el cmd ipconfig) y el puerto :8080.

## ACTUALIZACIÓN FASE 4 EXTRAORDINARIA
###### 
Ahora, en esta fase se establece una comunicación bidireccional entre los clientes y el servidor, en la que se intercambia información como puede ser el tiempo, las posiciones de los jugadores y el globo, y las puntuaciones.

######
PositionHandler sigue siendo nuestra clase en java que maneja todo el intercambio al igual que las conexiones de los distintos WebSockets. Todo se realiza en un mismo documento JSON el cual tiene información como puede ser la posicion de los jugadores o sus puntuaciones.

Para la sincronización se ha seguido un modelo parecido a un Listen Server. En la partida hay un "host" (no es el server sino que goza de privilegios) que se decide según el orden de elección en la sala de espera. Ese "host" manda las posiciones del globo y de las puntuaciones para que el otro cliente que no es el "host" las actualice si su simulación del juego no es parecida al "host". En las posiciones de los jugadores y del globo pude producirse un pequeño lag en el que no es "host".

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/PartidaV2.png?raw=true)

Para que ambos jugadores entren al mismo tiempo en la partida, se ha hecho una sala de espera que hasta que no salga el botón de "continue" no podrán jugar (tiene que haber dos jugadores en la misma pantalla). Cuando sale, los jugadores tendran que darle al botón y en el momento que ambos pulsen el suyo, el servidor les dará paso para que generen la siguiente escena.

![](https://github.com/Dacapi89/Practica-jer-222-23/blob/main/img/Waiting.png?raw=true)

Para la comunicación se ha seguido los siguientes pasos: cuando un jugador entra al modo Online, se crea un Socket y se establece una comunicación(onopen), por el contrario si se sale de la escena se cierra el puerto (onclose). En el servidor, en el momento que se registra dos conexiones, manda un mensaje a los clientes para que rendericen el botón de continuar, botón que al pulsarle, los clientes mandan al servidor información (send()) para que este pueda volver a mandarles el Ok cuando ambos le hayan dado a continuar.
En la partida, se están mandado constantemente información al servidor (posiciones y puntuaciones) y recibiendo información de parte del servidor (onmessage) como puede ser el tiempo de la partida (es calculado en el servidor para que ambos jugadores tengan el mismo).
Al terminar la partida se cierra la conexión.
