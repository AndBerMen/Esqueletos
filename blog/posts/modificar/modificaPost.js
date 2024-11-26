window.onload = main;

function main() {
    document.getElementById("botonGuardar").addEventListener("click", modifica);
    document.getElementById("botonTornar").addEventListener("click", tornar);

    let boton = document.getElementById("dropdown");
    let menu  = document.querySelector("nav");

    boton.addEventListener("click", () => {
        menu.classList.toggle('show');
    });
}

function modifica(){
    window.location.assign("../llistat/llistarPosts.html");
}

function tornar(){
    window.location.assign("../llistat/llistarPosts.html");
}