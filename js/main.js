

// Import de estilos 
import '../assets/styles/style.scss';

// Crer luego de () ARREGLO QUE ALMACENE LOS COLORES, MUESTRE UNA ACCION Y UN SONIDO PARA CADA COLOR por los id del index
let colors = ['red', 'blue', 'green', 'yellow'];

// PATRON DEL JUEGO
let gameP = [];

// GUARDAR EL PATRON DE CLICKS del usuario
let gameClicksP = [];

// Funcion para iniciar el juego (si el usuario no a clikado nada. que no haga nada)
let start = false;
let level = 0;

// Evento para que registre una tecla e inicie el juego (Kaydown registra cuando se da click)
$(document).keydown(() => {
   /*console.log(this):this se refiere el elemento al que le esta aplicando la propiedad (en este caso al doc) */
  if(!start) {
    $('#level-title').text('level ' + level);
    start = true;
    nextSequence();
  }
  /* nextSequence(); (para provarlo) */
});



// Funcion para craer la secuencia del juego 
function nextSequence() {
  gameClicksP = [];

  // Actualizar el nivel
  level++; /*++, va actualizando de 1 en 1 */
  $('#level-title').text('level ' + level);

  // Numeros aleatorios para el patron (usando las funciones de Math)
  let randomNumber = Math.random()*4; /* para crear numeros aleatorios hasta el 4, porque lo que da Math son numeross entre cero y uno */
  randomNumber = Math.floor(randomNumber); /* Para redondearlo */

  // Almacenar el numero en el patron 
  gameP.push(randomNumber);

  // USAR NUMERO ALEATORIO PARA LLAMAR EL BOTON SELECCIONADO
  let randomColor;
  randomColor = colors[randomNumber];

  //tiempo en el que desaparece al dar click fadeIn=lo aparece
  $('#' + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  /* playSound(randomColor); = provar sonidos*/
}

// Crear una funcion para EMULAR SONIDOS POR CADA COLOR
function playSound(color) {
  let audio = new Audio('../assets/sonidos/' + color + '.mp3');

  audio.play();
}









