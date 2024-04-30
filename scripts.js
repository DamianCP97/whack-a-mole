const btnEmpezar = document.getElementById('empezar');
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

    cuentaAtras();
    setTimeout(fin, 30000); //Ejecuta el código de la función fin() cuando pasen 30 segundos
});

Array.from(casilla).forEach(casilla => { //Con Array.from() transformamos el HTMLCollection que devuelve el document.getElementsByClassName('casilla') en un array para poder trabajar con él
    casilla.addEventListener('click', () => {
        contador++;
        puntuacion.innerText = parseInt(puntuacion.innerText) + contador; //Se convierte el puntuacion.innerText del principio en número con parseInt() para que no concatenen los números como si fuesen strings
        contador = 0; //Reseteo contador
        puntuacionFinal = puntuacion.innerText;
    });
})

// Declaramos la varible de los segundos fuera de la función para que su valor persista
let segundos = 30;

const cuentaAtras = () => {
    const intervalo = setInterval(() => {
        temporizador.innerText = segundos;
        cambiarColor();
        segundos--;
        if (segundos === 0) {
            clearInterval(intervalo); //Detiene el intervalo cuando segundos llega a 0
        }
    }, 1000);
};

function fin() {
    tablero.style.display = 'none';
    puntuacion.style.display = 'none';
    temporizador.innerText = 'Tu puntuación ha sido de: ' + puntuacionFinal;
}

function cambiarColor() {
    let i = Math.floor(Math.random() * casilla.length);
    casilla[i].style.backgroundColor = 'red';
}