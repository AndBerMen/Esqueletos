window.onload = main;

function main() {
    document.getElementById("alta").addEventListener("click", alta);
    document.getElementById("filtre").addEventListener("click", filtre);  
   
    // Asignar evento de eliminación a todos los elementos con clase 'eliminar'
    let eliminarBtns = document.querySelectorAll(".eliminar");
    eliminarBtns.forEach(btn => {
        btn.addEventListener("click", eliminar);
    });

    let boton = document.getElementById("dropdown");
    let menu  = document.querySelector("nav");

    boton.addEventListener("click", () => {
        menu.classList.toggle('show');
    });
}

function alta(){
    window.location.assign("../alta/altaEtiqueta.html");
}

function filtre(){
    window.location.assign("llistarEtiquetes.html");
    alert("Se ha filtrado correctamente");
}

function eliminar(){
    alert("Se ha eliminado correctamente");
}
