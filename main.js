// Obtener el contexto 2D del canvas
const canvas = document.getElementById('canvasJuego');
const contexto = canvas.getContext('2d');

function recortarImagen(imagen, x, y, ancho, alto) {
    // Crear un nuevo canvas del tamaño del cuadrado que queremos recortar
    let canvas = document.createElement("canvas");
    canvas.width = ancho;
    canvas.height = alto;
    
    // Obtener el contexto 2D del canvas
    let contexto = canvas.getContext("2d");
    
    // Dibujar el cuadrado recortado en el canvas
    contexto.drawImage(imagen, x, y, ancho, alto, 0, 0, ancho, alto);
    
    // Crear un nuevo objeto Image con el contenido del canvas
    let nuevaImagen = new Image();
    nuevaImagen.src = canvas.toDataURL();
    
    return nuevaImagen;
}

function escalarImagen(imagen, ancho, alto) {
    let canvas = document.createElement("canvas");
    let contexto = canvas.getContext("2d");
    
    canvas.width = ancho;
    canvas.height = alto;
    
    contexto.drawImage(imagen, 0, 0, ancho, alto);
    
    let imagenEscalada = new Image();
    imagenEscalada.src = canvas.toDataURL("image/png");
    
    return imagenEscalada;  
}



// Definir la clase Jugador
class Jugador {
    constructor(x, y, walkSpriteSheet) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.walkSpriteSheet = new Image();
        this.walkSpriteSheet.src = walkSpriteSheet;
        this.walkFrames = []
        
        this.walkSpriteSheet.onload = () => {
            for(let i=0; i<4; i++){
                // console.log(this.walkSpriteSheet.height)
                let f=recortarImagen(this.walkSpriteSheet, this.walkSpriteSheet.width/4*i,0,this.walkSpriteSheet.width/4,this.walkSpriteSheet.height)
                this.walkFrames.push(f)
            }
        }
    }
}


// Crear un objeto Jugador con posición (100, 100) y spritesheet "jugador.png"
const jugador = new Jugador(0, 0, "src/walk.png");

// Definir una función para dibujar el jugador en el canvas
function dibujarJugador() {
    // console.log("asd")
    // Borrar el canvas antes de dibujar el jugador
    // contexto.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar el jugador en el canvas utilizando el método drawImage() del contexto 2D
    
    
    // console.log(jugador.walkFrames[0])
    contexto.drawImage(jugador.walkFrames[0], jugador.x, jugador.y, 20,20);
}

// Definir una función para actualizar el jugador en cada fotograma
function actualizarJugador(deltaTiempo) {
    // Actualizar la velocidad y posición del jugador en función de this.ax y this.ay
    jugador.vx += jugador.ax * deltaTiempo;
    jugador.vy += jugador.ay * deltaTiempo;
    jugador.x += jugador.vx * deltaTiempo;
    jugador.y += jugador.vy * deltaTiempo;
}

// Llamar a las funciones dibujarJugador() y actualizarJugador() en un bucle de juego
function bucleDeJuego() {
    dibujarJugador();
    actualizarJugador(1/60); // Pasar 1/60 como deltaTiempo para actualizar a 60 fotogramas por segundo
    window.requestAnimationFrame(bucleDeJuego); // Repetir el bucle de juego en el siguiente fotograma
}

// Comenzar el bucle de juego
setTimeout(() => {
    bucleDeJuego();
}, 50);