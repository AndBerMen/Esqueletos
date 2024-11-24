window.onload = main;

function main() {
    document.getElementById("altaCliente").addEventListener("click", altaCliente);
    cargarClientes();
    actualizarTabla();    
}


/*funciones temporales*/
function visualitzar(){
    window.location.assign("../visualitzar/visualitzar.html");
}

function editar(){
    window.location.assign("../editar/editar.html");
}
/***********/



function altaCliente(){
    window.location.assign("../alta/alta.html");
}

//carga y retorna el objeto clientes
function cargarClientes(){
    const clientes = JSON.parse(localStorage.getItem('Client')) || [];    //coge los clientes almacenados en el local storage y los devuelve
    return clientes;
}

//función para modificar un cliente en específico
function modificarCliente(index){
    const clientes = cargarClientes();      //carga los clientes del localStorage
    const cliente = clientes[index];        //obtiene el cliente seleccionado

    localStorage.setItem("idModificar", cliente.id);

    window.location.assign("../modificar/modificar.html");
}

/*función para eliminar el cliente seleccionado
*se le pasa indice para indicarle el cliente en concreto
*/
function eliminarCliente(indice){
    let clientes = cargarClientes();
    clientes.splice(indice, 1);         //elimina el cliente del array
    guardarClientes(clientes);          //actualizar el localStorage con el array recien eliminado
    actualizarTabla();
}

function visualizarCliente(index){
    const clientes = cargarClientes();      //carga los clientes del localStorage
    const cliente = clientes[index];        //obtiene el cliente seleccionado

    localStorage.setItem("idModificar", cliente.id);

    window.location.assign("../visualitzar/visualitzar.html");
}

//guarda los clientes en el local storage
function guardarClientes(clientes){
    localStorage.setItem('Client', JSON.stringify(clientes));     //guarda en un objeto el cliente
}

//actualiza toda la tabla con los nuevos clientes
function actualizarTabla(){
    const tabla = document.getElementById('clientesTable').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; //limpia toda la tabla antes de agregar todas las filas

    const clientes = cargarClientes();      //carga en una constante todos los clientes

    //comprueba si hay clientes para decidir si mostrar la tabla
    if(clientes.length > 0){
        clientes.forEach((cliente, index) => {      //por cada cliente crea una linea
            let tabla = document.getElementById("files");
            let tr = document.createElement("tr");

            // Agregar columna con checkbox
            let tdCheckbox = document.createElement("td"); // Crear la celda
            tdCheckbox.className = "checkBoxth";
            let checkbox = document.createElement("input"); // Crear el checkbox
            checkbox.type = "checkbox";
            tdCheckbox.appendChild(checkbox); // Añadir el checkbox a la celda
            tr.appendChild(tdCheckbox); // Añadir la celda a la fila

            //crea el botón para modificar el cliente
            // const botonModificar = document.createElement("button");
            // const textoModificar = document.createTextNode("Modificar");
            // botonModificar.appendChild(textoModificar);
            // botonModificar.className = "btn btn-primary btn-lg";
            // botonModificar.id =  "modificar";
            // botonModificar.addEventListener("click", function() {
            //     modificarCliente(index);
            // });
            // let tdModificar = document.createElement("td");
            // tdModificar.appendChild(botonModificar);
            // tr.appendChild(tdModificar);
            // tabla.appendChild(tr);
            
            // //crea el botón para eliminar el cliente
            // const botonEliminar = document.createElement("button");
            // const textoEliminar = document.createTextNode("Esborrar");
            // botonEliminar.appendChild(textoEliminar);
            // botonEliminar.className = "btn btn-primary btn-lg";
            // botonEliminar.onclick = function() {
            //     eliminarCliente(index);
            // };
            // let tdEliminar = document.createElement("td");
            // tdEliminar.appendChild(botonEliminar);
            // tr.appendChild(tdEliminar);
            // tabla.appendChild(tr);



            // //crea el botón para visualitzar el cliente
            // const botonVisualizar = document.createElement("button");
            // const textoVisualizar = document.createTextNode("Visualitzar");
            // botonVisualizar.appendChild(textoVisualizar);
            // botonVisualizar.className = "btn btn-primary btn-lg";
            // botonVisualizar.onclick = function() {
            //     visualizarCliente(index);
            // };
            // let tdVisualizar = document.createElement("td");
            // tdVisualizar.appendChild(botonVisualizar);
            // tr.appendChild(tdVisualizar);
            // tabla.appendChild(tr);




            

            //crea y añade el número de ID
            const textoId = document.createTextNode(cliente.id);
            let tdId = document.createElement("td");
            tdId.appendChild(textoId);
            tr.appendChild(tdId);
            tabla.appendChild(tr);

            //crea y añade el nombre del cliente
            const textoNombre = document.createTextNode(cliente.name);
            let tdNombre = document.createElement("td");
            tdNombre.appendChild(textoNombre);
            tr.appendChild(tdNombre);
            tabla.appendChild(tr);

            //crea y añade el domicilio del cliente
            // const textoDomicilio = document.createTextNode(cliente.address);
            // let tdDomicilio = document.createElement("td");
            // tdDomicilio.appendChild(textoDomicilio);
            // tr.appendChild(tdDomicilio);
            // tabla.appendChild(tr);

            //crea y añade el dni del cliente
            const textoDni = document.createTextNode(cliente.nif);
            let tdDni = document.createElement("td");
            tdDni.appendChild(textoDni);
            tr.appendChild(tdDni);
            tabla.appendChild(tr);

            //crea y añade el teléfono del cliente
            const textoTelefono = document.createTextNode(cliente.phone);
            let tdTelefono = document.createElement("td");
            tdTelefono.appendChild(textoTelefono);
            tr.appendChild(tdTelefono);
            tabla.appendChild(tr);

            //crea y añade el correo del cliente
            const textoCorreo = document.createTextNode(cliente.email);
            let tdCorreo = document.createElement("td");
            tdCorreo.appendChild(textoCorreo);
            tr.appendChild(tdCorreo);
            tabla.appendChild(tr);

            //crea y añade el pais del cliente
            // const textoPais = document.createTextNode(cliente.state_id);
            // let tdPais = document.createElement("td");
            // tdPais.appendChild(textoPais);
            // tr.appendChild(tdPais);
            // tabla.appendChild(tr);

            //crea y añade la provincia del cliente
            // const textoProvincia = document.createTextNode(cliente.province);
            // let tdProvincia = document.createElement("td");
            // tdProvincia.appendChild(textoProvincia);
            // tr.appendChild(tdProvincia);
            // tabla.appendChild(tr);

            //crea y añade la ciudad del cliente
            // const textoCiudad = document.createTextNode(cliente.city);
            // let tdCiudad = document.createElement("td");
            // tdCiudad.appendChild(textoCiudad);
            // tr.appendChild(tdCiudad);
            // tabla.appendChild(tr);

            //crea y añade el codigo postal del cliente
            // const textoCP = document.createTextNode(cliente.cp);
            // let tdCP = document.createElement("td");
            // tdCP.appendChild(textoCP);
            // tr.appendChild(tdCP);
            // tabla.appendChild(tr);




            // Crear la celda <td>
            let tdAcciones = document.createElement("td");

            // Crear la primera imagen (papelera) con funcionalidad para eliminar
            let imgPaperera = document.createElement("img");
            imgPaperera.src = "../img/paperera.png";
            imgPaperera.alt = "iconaPaperera";
            imgPaperera.style.cursor = "pointer"; // Cambiar el cursor al pasar por la imagen
            imgPaperera.addEventListener("click", function () {
                eliminarCliente(index); // Función para eliminar
            });

            // Crear la segunda imagen (ojo) con funcionalidad para visualizar
            let imgUll = document.createElement("img");
            imgUll.src = "../img/ull.png";
            imgUll.alt = "iconaUll";
            imgUll.style.cursor = "pointer";
            imgUll.addEventListener("click", function () {
                visualizarCliente(index); // Función para visualizar
            });

            // Crear la tercera imagen (modificar) con funcionalidad para modificar
            let imgModificar = document.createElement("img");
            imgModificar.src = "../img/modificar.png";
            imgModificar.alt = "iconaModificar";
            imgModificar.style.cursor = "pointer";
            imgModificar.addEventListener("click", function () {
                modificarCliente(index); // Función para modificar
            });

            // Agregar las imágenes al <td>
            tdAcciones.appendChild(imgPaperera);
            tdAcciones.appendChild(imgUll);
            tdAcciones.appendChild(imgModificar);

            // Finalmente, agregar el <td> a la fila
            tr.appendChild(tdAcciones);


        });
        document.getElementById('clientesTable').style.display = ''; //muestra la tabla
    }
    else{
        document.getElementById('clientesTable').style.display = 'none'; //oculta la tabla si no hay clientes
    }
}