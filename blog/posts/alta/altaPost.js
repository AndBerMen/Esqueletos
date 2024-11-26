window.onload = main;

function main() {
    document.getElementById("botonAlta").addEventListener("click", alta);
    document.getElementById("botonTornar").addEventListener("click", tornar);

    let boton = document.getElementById("dropdown");
    let menu  = document.querySelector("nav");

    boton.addEventListener("click", () => {
        menu.classList.toggle('show');
    });
}

function alta(){
    window.location.assign("../llistat/llistarPosts.html");
}

function tornar(){
    window.location.assign("../llistat/llistarPosts.html");
}
