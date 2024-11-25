window.onload = main;

function main() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);

    
    let product = JSON.parse(localStorage.getItem("modProducto"));

    if (product) {
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("volume").value = product.volume;
        document.getElementById("weight").value = product.weight;
        document.getElementById("lotorserial").value = product.lotorserial;
        document.getElementById("sku").value = product.sku;
        document.getElementById("image_url").value = product.image_url;
    }
}


function validarName() {
    let name = document.getElementById("name");
    if (!/^[A-Za-z\s]{2,50}$/.test(name.value)) {
        error(name, "El nombre debe tener entre 2 y 30 caracteres");
        return false;
    }
    return true;
}

function validarVol() {
    let volume = document.getElementById("volume");
    if (!/^\d+(\.\d{1,2})?$/.test(volume.value)) {
        error(volume, "Volumen no válido");
        return false;
    }
    return true;
}

function validarWeight() {
    let weight = document.getElementById("weight");
    if (!/^\d+(\.\d{1,2})?$/.test(weight.value)) {
        error(weight, "Peso no válido");
        return false;
    }
    return true;
}


function validarSKU() {
    let sku = document.getElementById("sku");
    if (!/^[A-Z0-9]{8,12}$/.test(sku.value)) {
        error(sku, "El SKU debe tener entre 8 y 12 caracteres");
        return false;
    }
    return true;
}


function validarImage_url() {
    let image_url = document.getElementById("image_url");
    if (!/^(http(s)?:\/\/)?(www\.)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(\?[\w\-~&=]*)?(#[\w\-~]*)?$/.test(image_url.value)) {
        error(image_url, "La URL no es correcta");
        return false;
    }
    return true;
}

function validar(e) {
    borrarError();
    e.preventDefault();

    if (validarName() && validarVol() && validarWeight() && validarSKU() && validarImage_url) {
        enviarFormulario();
        return true;
    } else {
        return false;
    }
}

function error(element, mensaje) {
    const textError = document.createTextNode(mensaje);
    const elementError = document.getElementById("mensajeError");
    elementError.appendChild(textError);
    element.classList.add("error");
    element.focus();
}

function borrarError() {
    let formulario = document.forms[0].elements;
    for (let ele of formulario) {
        ele.classList.remove("error");
    }
    document.getElementById("mensajeError").replaceChildren();
}

function enviarFormulario() {

    
    let product = {
        id: JSON.parse(localStorage.getItem("modProducto")).id,
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        volume: document.getElementById("volume").value,
        weight: document.getElementById("weight").value,
        lotorserial: document.getElementById("lotorserial").value,
        sku: document.getElementById("sku").value,
        image_url: document.getElementById("image_url").value
    };

     let arrProductos = JSON.parse(localStorage.getItem("products")) || [];
     let index = arrProductos.findIndex(p => p.id == product.id);
    


    if (index !== -1) {
        arrProductos[index] = product;
        localStorage.setItem("products", JSON.stringify(arrProductos));
    }

    localStorage.removeItem("modProducto");
    window.location.assign("listaProductos.html");
}