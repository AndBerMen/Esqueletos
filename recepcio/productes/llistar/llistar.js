window.onload = main;

function main() {
    document.getElementById("altaProducte").addEventListener("click",nuevoProducto);
    //obtenerProductos();
}

function nuevoProducto(){
    window.location.assign("../../recepcio/productes/alta/alta.html");
}

function obtenerProductos() {
    let arrProductos = JSON.parse(localStorage.getItem("Product")) || [];
    let tbody = document.getElementById("files");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    arrProductos.forEach(function(product) {
        let row = document.createElement('tr');

        let eliminarCell = document.createElement('td');
        let eliminarBtn = document.createElement('button');
        eliminarBtn.appendChild(document.createTextNode('Eliminar'));
        eliminarBtn.className = 'btn btn-primary btn-lg';
        eliminarBtn.onclick = function() { eliminar(product.id); };
        eliminarCell.appendChild(eliminarBtn);

        let modificarCell = document.createElement('td');
        let modificarBtn = document.createElement('button');
        modificarBtn.appendChild(document.createTextNode('Modificar'));
        modificarBtn.className = 'btn btn-primary btn-lg';
        modificarBtn.onclick = function() { modificar(product.id, product.name, product.description, product.volume, product.weight, product.lotorserial, product.sku, product.image_url); };
        modificarCell.appendChild(modificarBtn);

        let nameCell = document.createElement('td');
        nameCell.appendChild(document.createTextNode(product.name));

        let descriptionCell = document.createElement('td');
        descriptionCell.appendChild(document.createTextNode(product.description));

        let volumeCell = document.createElement('td');
        volumeCell.appendChild(document.createTextNode(product.volume));

        let weightCell = document.createElement('td');
        weightCell.appendChild(document.createTextNode(product.weight));

        let lotorserialCell = document.createElement('td');
        lotorserialCell.appendChild(document.createTextNode(product.lotorserial));

        let skuCell = document.createElement('td');
        skuCell.appendChild(document.createTextNode(product.sku));

        let image_urlCell = document.createElement('td');
        image_urlCell.appendChild(document.createTextNode(product.image_url));

        row.appendChild(eliminarCell);
        row.appendChild(modificarCell);
        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(volumeCell);
        row.appendChild(weightCell);
        row.appendChild(lotorserialCell);
        row.appendChild(skuCell);
        row.appendChild(image_urlCell);

        tbody.appendChild(row);
    });
}


function eliminar(id) {
    let arrProductos = JSON.parse(localStorage.getItem("Product")) || [];
    arrProductos = arrProductos.filter(function(product) {
        return product.id !== id;
    });
    localStorage.setItem("Product", JSON.stringify(arrProductos));
    obtenerProductos();
}


function modificar(id, name, description, volume, weight, lotoreserial, sku, image_url) {
    let product = {
        id: id,
        name: name,
        description: description,
        volume: volume,
        weight: weight,
        lotoreserial: lotoreserial,
        sku: sku,
        image_url: image_url
    };
    localStorage.setItem("modProducto", JSON.stringify(product));
    window.location.assign("../modificar/modificar.html");
}