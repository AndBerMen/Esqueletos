window.onload = main;

function main() {
    document.getElementById("botonTornar").addEventListener("click", tornar);

    let boton = document.getElementById("dropdown");
    let menu  = document.querySelector("nav");

    boton.addEventListener("click", () => {
        menu.classList.toggle('show');
    });
}

function tornar(){
    window.location.assign("../llistat/llistarComentaris.html");
}
