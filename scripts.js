const btnEmpezar = document.getElementById('empezar');
const btnReiniciar = document.getElementById('reiniciar');
const tablero = document.getElementById('tablero');
const puntuacion = document.getElementById('puntuacion');
const casilla = document.getElementsByClassName('casilla');
const temporizador = document.getElementById('temporizador');
let contador = 0;
let puntuacionFinal = 0;
puntuacion.innerText = contador;

btnEmpezar.addEventListener('click', () => {
    tablero.style.display = 'grid';
    puntuacion.style.display = 'block';
    btnEmpezar.style.display = 'none';
    temporizador.style.display = 'block';

    cambiarColor();
    cuentaAtras();
    //setTimeout(fin, 30000); //Ejecuta el código de la función fin() cuando pasen 30 segundos
});

Array.from(casilla).forEach(casilla => { //Con Array.from() transformamos el HTMLCollection que devuelve el document.getElementsByClassName('casilla') en un array para poder trabajar con él
    casilla.addEventListener('click', () => {
        //Aquí se gestiona la funcionalidad del contador
        if (casilla.style.backgroundColor === 'red') {
        contador++;
        puntuacion.innerText = parseInt(puntuacion.innerText) + contador; //Se convierte el puntuacion.innerText del principio en número con parseInt() para que no concatenen los números como si fuesen strings
        contador = 0; //Reseteo contador
        puntuacionFinal = puntuacion.innerText;
        cambiarColor();
        } else if (casilla.style.backgroundColor !== 'red' && puntuacionFinal > 0) {
            contador--;
        puntuacion.innerText = parseInt(puntuacion.innerText) + contador;
        contador = 0; //Reseteo contador
        puntuacionFinal = puntuacion.innerText;
        }
    });
})

// Declaramos la varible de los segundos fuera de la función para que su valor persista
let segundos = 30;

const cuentaAtras = () => {
    const intervalo = setInterval(() => {
        temporizador.innerText = segundos;
        segundos--;
        if (segundos === 0) {
            clearInterval(intervalo);
            fin(); // Llama a la función fin() cuando el temporizador llega a cero
        }
    }, 1000);
};

function fin() {
    tablero.style.display = 'none';
    puntuacion.style.display = 'none';
    temporizador.innerText = 'Tu puntuación ha sido de: ' + puntuacionFinal;
    btnReiniciar.style.display = 'inline';

    btnReiniciar.addEventListener('click', () => {
        location.reload();
    });
}

// Variable para almacenar el índice de la casilla actualmente en rojo
let casillaRojaIndex = null;

function cambiarColor() {
    // Si hay una casilla en rojo, se revierte su color
    if (casillaRojaIndex !== null) {
        casilla[casillaRojaIndex].style.backgroundColor = ''; // Revierte el color a transparente
    }

    // Se elige una nueva casilla aleatoria para pintar de rojo
    const nuevoIndex = Math.floor(Math.random() * casilla.length);
    casilla[nuevoIndex].style.backgroundColor = 'red'; // Pinta la nueva casilla de rojo
    casillaRojaIndex = nuevoIndex; // Actualiza el índice de la casilla en rojo
}
