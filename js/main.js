

// Import de estilos 
import '../assets/styles/style.scss';

// Crer luego de () ARREGLO QUE ALMACENE LOS COLORES, MUESTRE UNA ACCION Y UN SONIDO PARA CADA COLOR por los id del index
let colors = ['red', 'blue', 'green', 'yellow'];

// PATRON DEL JUEGO (variable global)
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

// EVENTO AL QUE EL USUARIO LE ESTA DANDO CLICK
$('.container__row__btn').click(function() {
  let userColor = $(this).attr('id');
  
  gameClicksP.push(userColor);

  playSound(userColor);

  animateclick(userColor);

  checkAnswer(gameClicksP.length - 1); 
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

  // USAR NUMERO ALEATORIO PARA LLAMAR EL BOTON SELECCIONADO
  let randomColor;
  randomColor = colors[randomNumber];

  // Almacenar el numero en el patron 
  gameP.push(randomColor);

        //tiempo en el que desaparece al dar click fadeIn=lo aparece
  $('#' + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor); 
}

// FUNCION PARA CONFIRMAR LOS CLICKS DEL USUARIO
function checkAnswer(currentlevel) {
  if(gameP[currentlevel] === gameClicksP[currentlevel]) {
    if(gameP.length === gameClicksP.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // Mostrar sonido de error
    playSound('wrong');
      // clase para finalizar el juego
    $('body').addClass('game-over');

      // Cambiar titulo para poder reiniciarlo
      $('#level-title').text('Game Over, please restart!');
  
      // Quitar la clase agregada
      setTimeout(() => {
        $('body').removeClass('game-over');
      }, 400);

      // Llamar funcion para reiniciar el juego
      startOver();
    }
}


// Crear una funcion para EMULAR SONIDOS POR CADA COLOR
function playSound(color) {
  let audio = new Audio('../assets/sonidos/' + color + '.mp3');

  audio.play();
}


// FUNCION PARA ANIMAR EL CLICK
function animateclick(userColor) {
  $('#' + userColor).addClass('pressed');

  //QUITAR LA CLASE AGREGADA
  setTimeout(() => {
    $('#' + userColor).removeClass('pressed');
  }, 100);
}

// FUNCION PARA REINICIAR EL JUEGO
function startOver() {
  level = 0;
  gameP = [];
  start = false;
}


