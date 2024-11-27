window.onload = main;

let State = JSON.parse(localStorage.getItem('State')) || [];
let Province = JSON.parse(localStorage.getItem('Province')) || [];
let City = JSON.parse(localStorage.getItem('City')) || [];

/////
/////
/////
// Local
let url = 'http://localhost:5001/'
// Servidor
//let url = 'http://10.2.218.254:5001/'

async function postData(url,endPoint, data = {}) {
  try {
    const response = await fetch(url + endPoint, {
      method: 'POST',  // Método HTTP
      headers: {
        'Content-Type': 'application/json'  // Tipo de contenido
      },
      body: JSON.stringify(data)  // Datos JSON a enviar
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud POST');
    }

    const result = await response.json();  // Espera la conversión de la respuesta a JSON
    console.log(result);  // Trabaja con la respuesta

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

// Acces a les dades
async function getNewId(url,endPoint) {
  try {
    const response = await fetch(url + endPoint );  // Reemplaza 'data.json' con la ruta de tu archivo

    if (!response.ok) {
      throw new Error('Error al obtener el archivo JSON');
    }

    const data =  await response.json();
    const maxId = data.reduce((max, ele) => 
      (ele.id > max.id ? ele: max), data[0]);
    const newId= ++ maxId.id;
    return newId + '' ;

  } catch (error) {
    console.error('Error:', error);  // Manejo de errores
  }
}

////
////
////









function main() {
    document.getElementById("botonModificar").addEventListener("click", validar, false);
    
    // Recupera el ID del cliente desde localStorage y asegúrate de que sea un número
    const idCliente = parseInt(localStorage.getItem('idModificar'), 10);
    // Busca el cliente en el array Client utilizando el ID
    const clientes = JSON.parse(localStorage.getItem('Client')) || [];
    const cliente = clientes.find(c => c.id === idCliente);

    if (cliente) {
        // Asegúrate de que cargarPaises esté bien definida para llenar el select de países
        cargarPaises();
        // Carga el país seleccionado
        var paisSeleccionado = cliente.state_id; // Asumiendo que state_id es el ID del país
        var form = document.querySelector('.formulari');

        var provinciaID = "";
        var ciudadID = "";
        // Crea los selects o inputs dependiendo del país seleccionado
        if (paisSeleccionado == 194) { 
            crearSelectProvincias(form); 
            crearSelectCiudades(form);
            crearInputCodigoPostal(form); 
            
            provinciaID = Province.find(variable => variable.name === cliente.province)?.id || "No especificado";
            ciudadID = City.find(variable => variable.name === cliente.city)?.id || "No especificado";
        }
        else{
            // Crear inputs alternativos si no es España
            crearInputProvincia(form); 
            crearInputCiudades(form); 
            crearInputCodigoPostal(form); 

            provinciaID = cliente.province;
            ciudadID = cliente.city;
        }
        
        var provinciaSeleccionada = provinciaID;
        var selectCiudad = document.getElementById('city');
        
        // agregar las ciudades correspondientes a la provincia seleccionada
        City.forEach(function(ciudad) {
            if (ciudad.province_id === provinciaSeleccionada) {
                var opcion = document.createElement('option');
                opcion.value = ciudad.id; // asigna el id de la ciudad como valor
                opcion.textContent = ciudad.name; // asigna el nombre de la ciudad como texto
                selectCiudad.appendChild(opcion); // añade la opción al select de ciudades
            }
        }); 

        // Carga los datos en los campos del formulario
        document.getElementById('name').value = cliente.name;
        document.getElementById('address').value = cliente.address;
        document.getElementById('nif').value = cliente.nif;
        document.getElementById('phone').value = cliente.phone;
        document.getElementById('email').value = cliente.email;
        document.getElementById('state_id').value = paisSeleccionado;
        document.getElementById('province').value = provinciaID; 
        document.getElementById('city').value = ciudadID; 
        document.getElementById('cp').value = cliente.cp; 
    }
    else{
        console.log("Cliente no encontrado");
    }
}

function validar(e) {
    esborrarError();
    e.preventDefault();
    if(
        validarNombre()     && 
        validarDomicilio()  && 
        validarDNI()        && 
        validarTelefono()   && 
        validarCorreo()     &&
        validarPais()       &&
        validarProvincia()  &&
        validarCiudad()     &&
        validarCP()){

        enviarFormulari();
        return true;
    }
    else{
        return false;
    }
}

//valida el nombre o razon social
function validarNombre(){
    const usernameField = document.getElementById('name');

    if(!usernameField.checkValidity()){
        if(usernameField.validity.valueMissing){
            error(usernameField, "El nom es obligatori.");
        }
        else if(usernameField.validity.patternMismatch){
            error(usernameField, "El nom ha de tindre entre 1 y 60 caracters, començar per majúscula y sols poden ser lletres.");
        }
        return false;
    }
    else{   
        return true;
    }
}
//valida el domicilio
function validarDomicilio(){
    const domicilioField = document.getElementById('address');

    if(!domicilioField.checkValidity()){
        if(domicilioField.validity.valueMissing){
            error(domicilioField, "El domicili es obligatori.");
        }
        else if(domicilioField.validity.patternMismatch){
            error(domicilioField, "El domicili no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el DNI
function validarDNI(){
    const dniField = document.getElementById('nif');

    if(!dniField.checkValidity()){
        if(dniField.validity.valueMissing){
            error(dniField,"El dni es obligatori.");
        }
        else if(dniField.validity.patternMismatch){
            error(dniField,"El dni no es válid.");
        }
        return false;
    }
    else{   
        return true;
    }
}
//valida el teléfono
function validarTelefono(){
    const telefonoField = document.getElementById('phone');

    if(!telefonoField.checkValidity()){
        if(telefonoField.validity.valueMissing){
            error(telefonoField,"El teléfon es obligatori.");
        }
        else if(telefonoField.validity.patternMismatch){
            error(telefonoField,"El teléfon no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el correo
function validarCorreo(){
    const correoField = document.getElementById('email');

    if(!correoField.checkValidity()){
        if(correoField.validity.valueMissing){
            error(correoField,"El correu es obligatori.");
        }
        else if(correoField.validity.patternMismatch){
            error(correoField,"El correu no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el pais
function validarPais(){
    const paisField = document.getElementById('state_id');

    if(!paisField.checkValidity()){
        if(paisField.validity.valueMissing){
            error(paisField,"El pais es obligatori.");
        }
        else if(paisField.validity.patternMismatch){
            error(paisField,"El pais no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida la provincia
function validarProvincia(){
    const provinciaField = document.getElementById('province');

    if(!provinciaField.checkValidity()){
        if(provinciaField.validity.valueMissing){
            error(provinciaField,"La provincia es obligatoria.");
        }
        else if(provinciaField.validity.patternMismatch){
            error(provinciaField,"La provincia no es válida.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida la ciudad
function validarCiudad(){
    const ciudadField = document.getElementById('city');

    if(!ciudadField.checkValidity()){
        if(ciudadField.validity.valueMissing){
            error(ciudadField,"La ciutat es obligatoria.");
        }
        else if(ciudadField.validity.patternMismatch){
            error(ciudadField,"La ciutat no es válida.");
        }
        return false;
    }
    else{
        return true;
    }
}
//valida el codigo postal
function validarCP(){
    const cpField = document.getElementById('cp');

    if(!cpField.checkValidity()){
        if(cpField.validity.valueMissing){
            error(cpField,"El codi postal es obligatori.");
        }
        else if(cpField.validity.patternMismatch){
            error(cpField,"El codi postal no es válid.");
        }
        return false;
    }
    else{
        return true;
    }
}

function error(element, missatge) {
    const textError = document.createTextNode(missatge);
    const elementError = document.getElementById("missatgeError")
    elementError.appendChild(textError)
    element.classList.add( "error" )
    element.focus();
}

function esborrarError() {
    let formulari = document.forms[0].elements;
        for (let ele of formulari) {
            ele.classList.remove("error")
        }    
    document.getElementById("missatgeError").replaceChildren(); 
}

//función que carga comunidades autónomas en el select
function cargarPaises(){
    var selectPais = document.getElementById('state_id');
    State.forEach(function(pais){
        var opcion = document.createElement('option');
        opcion.value = pais.id;

        var nombreOpcion = document.createTextNode(pais.name);
        opcion.appendChild(nombreOpcion);

        selectPais.appendChild(opcion);
    });
}

function cargarProvincias() {
    var paisSeleccionado = document.getElementById('state_id').value;
    
    var form = document.querySelector('.formulari');
        
    var divProvincias = document.getElementById("divProvincias");
    var divCiudades = document.getElementById("divCiudades");
    var divCodigoPostal = document.getElementById("divCodigoPostal");
    
    // Limpiar contenido de los contenedores de provincias, ciudades y código postal
    if (divProvincias) {
        divProvincias.parentNode.removeChild(divProvincias); // Elimina el div de provincias
    }
    if (divCiudades) {
        divCiudades.parentNode.removeChild(divCiudades); // Elimina el div de ciudades
    }
    if (divCodigoPostal) {
        divCodigoPostal.parentNode.removeChild(divCodigoPostal); // Elimina el div de código postal
    }
    

   

    if (paisSeleccionado == 194) { // Si se selecciona España
        crearSelectProvincias(divContenedor); // Crear el select de provincias
        crearSelectCiudades(divContenedorCiudades); // Crear el select de ciudades
        crearInputCodigoPostal(divContenedorCodigoPostal);
    } else if (paisSeleccionado && paisSeleccionado != 194) {
        // Crear inputs alternativos si no es España
        crearInputProvincia(divContenedor);
        crearInputCiudades(divContenedorCiudades);
        crearInputCodigoPostal(divContenedorCodigoPostal);
    }
}

function cargarCiudades() {
    var provinciaSeleccionada = document.getElementById('province').value;
    var selectCiudad = document.getElementById('city');
    // limpiar el select de ciudades, manteniendo solo la opción inicial
    while (selectCiudad.options.length > 1) {
        selectCiudad.remove(1);
    }
    
    // agregar las ciudades correspondientes a la provincia seleccionada
    City.forEach(function(ciudad) {
        if (ciudad.province_id === provinciaSeleccionada) {
            var opcion = document.createElement('option');
            opcion.value = ciudad.id; // asigna el id de la ciudad como valor
            opcion.textContent = ciudad.name; // asigna el nombre de la ciudad como texto
            selectCiudad.appendChild(opcion); // añade la opción al select de ciudades
        }
    });
}

// Función para crear el select de provincias
function crearSelectProvincias(form){
    var form = document.querySelector('.formulari');
    var contenedor = document.createElement('div');
    contenedor.className = 'row';
    contenedor.id = 'divCodigoPostal';
    
    // Crear el label para el input de provincia
    var labelProvincia = document.createElement('label');
    labelProvincia.setAttribute('for', 'province'); // Asegúrate de que el 'for' coincida con el ID del input
    labelProvincia.className = 'col-3'; // Clase del label
    labelProvincia.textContent = 'Selecciona una provincia:'; // Texto del label

    var divInput = document.createElement('div');
    divInput.className = 'col-9';

    //Crear el select
    var selectProvincia = document.createElement('select');
    selectProvincia.name = 'province'; // Cambia el nombre si es necesario
    selectProvincia.id = 'province';
    selectProvincia.className = "inputVisualitzar";
    selectProvincia.required = true;
    selectProvincia.setAttribute('onchange', 'cargarCiudades()');

    while (selectProvincia.options.length > 0) {
        selectProvincia.remove(0); // Elimina la primera opción hasta que no queden más
    }

    var optionProvincia =  document.createElement('option');   
    var text = document.createTextNode('Selecciona una provincia');
    optionProvincia.appendChild(text);
    selectProvincia.appendChild(optionProvincia);
    

    //Cargar las provincias
    Province.forEach(function(provincia) {
        var opcion = document.createElement('option');
        opcion.value = provincia.id; // Asegúrate de que 'id' esté disponible
        var optionText = document.createTextNode(provincia.name);
        opcion.appendChild(optionText);
        selectProvincia.appendChild(opcion);
    });
    var br = document.createElement('br');

    contenedor.appendChild(labelProvincia);
    divInput.appendChild(selectProvincia);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);

    form.appendChild(contenedor);
}

function crearInputProvincia(form) {
    var form = document.querySelector('.formulari');
    var contenedor = document.createElement('div');
    contenedor.className = 'row';
    contenedor.id = 'divCodigoPostal';
    
    // Crear el label para el input de provincia
    var labelProvincia = document.createElement('label');
    labelProvincia.setAttribute('for', 'province'); // Asegúrate de que el 'for' coincida con el ID del input
    labelProvincia.className = 'col-3'; // Clase del label
    var text = document.createTextNode ('Selecciona una provincia:');
    labelProvincia.appendChild(text);

    var divInput = document.createElement('div');
    divInput.className = 'col-9';

    // Crear el input de provincia
    var inputProvincia = document.createElement('input');
    inputProvincia.type = 'text';
    inputProvincia.id = 'province'; // Cambiado para que sea único
    inputProvincia.className = "inputVisualitzar";
    inputProvincia.placeholder = 'Teruel'; // Placeholder
    inputProvincia.pattern = '[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]{0,19}'; // Patrón de validación
    inputProvincia.required = true; // Campo requerido
    var br = document.createElement('br');

    // Agregar el label y el input al div de provincia
    contenedor.appendChild(labelProvincia);
    divInput.appendChild(inputProvincia);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);

    form.appendChild(contenedor);
}

function crearInputCiudades(form) {
    var form = document.querySelector('.formulari');
    var contenedor = document.createElement('div');
    contenedor.className = 'row';
    contenedor.id = 'divCodigoPostal';
    
    // Crear el label para el input de provincia
    var labelCiudades = document.createElement('label');
    labelCiudades.setAttribute('for', 'city'); // Asegúrate de que el 'for' coincida con el ID del input
    labelCiudades.className = 'col-3'; // Clase del label
    var text = document.createTextNode ('Selecciona una ciutat:');
    labelCiudades.appendChild(text);

    var divInput = document.createElement('div');
    divInput.className = 'col-9';

    // Crear el input de provincia
    var inputCiudades = document.createElement('input');
    inputCiudades.type = 'text';
    inputCiudades.id = 'city'; // Cambiado para que sea único
    inputCiudades.className = "inputVisualitzar";
    inputCiudades.placeholder = 'Gandia'; // Placeholder
    inputCiudades.pattern = '[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]{0,39}'; // Patrón de validación
    inputCiudades.required = true; // Campo requerido
    var br = document.createElement('br');

    // Agregar el label y el input al div de provincia
    contenedor.appendChild(labelCiudades);
    divInput.appendChild(inputCiudades);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);

    form.appendChild(contenedor);
}

// Función para crear el select de provincias
function crearSelectCiudades(form){
    var form = document.querySelector('.formulari');
    var contenedor = document.createElement('div');
    contenedor.className = 'row';
    contenedor.id = 'divCodigoPostal';
    
    // Crear el label para el input de provincia
    var labelCiutats = document.createElement('label');
    labelCiutats.setAttribute('for', 'city'); // Asegúrate de que el 'for' coincida con el ID del input
    labelCiutats.className = 'col-3'; // Clase del label
    labelCiutats.textContent = 'Selecciona una ciutat:'; // Texto del label

    var divInput = document.createElement('div');
    divInput.className = 'col-9';

    //Crear el select
    var selectCiutats = document.createElement('select');
    selectCiutats.name = 'city'; // Cambia el nombre si es necesario
    selectCiutats.id = 'city';
    selectCiutats.className = "inputVisualitzar";
    selectCiutats.required = true;

    while (selectCiutats.options.length > 0) {
        selectCiutats.remove(0); // Elimina la primera opción hasta que no queden más
    }

    var optionProvincia = document.createElement('option');   
    var text = document.createTextNode('Selecciona una ciutat');
    optionProvincia.appendChild(text);
    selectCiutats.appendChild(optionProvincia);
    var br = document.createElement('br');

    contenedor.appendChild(labelCiutats);
    divInput.appendChild(selectCiutats);
    divInput.appendChild(br);
    contenedor.appendChild(divInput);

    form.appendChild(contenedor);
}

function crearInputCodigoPostal(form) {
    var form = document.querySelector('.formulari');
    var contenedor = document.createElement('div');
    contenedor.className = 'row';
    contenedor.id = 'divCodigoPostal';

    // Crear la etiqueta
    var label = document.createElement('label');
    label.setAttribute('for', 'cp');
    label.classList.add('col-3');
    label.textContent = 'Codi postal:';

    // Crear el contenedor para el input
    var divColSm9 = document.createElement('div');
    divColSm9.classList.add('col-9');

    // Crear el input
    var input = document.createElement('input');
    input.type = 'text';
    input.id = 'cp';
    input.className = "inputVisualitzar";
    input.placeholder = '46770';
    input.pattern = '{1,20}$'; // Pattern para un código postal de 5 dígitos
    input.required = true;

    // Añadir el input al contenedor col-9
    divColSm9.appendChild(input);

    // Añadir la etiqueta y el input al contenedor principal
    contenedor.appendChild(label);
    contenedor.appendChild(divColSm9);

    form.appendChild(contenedor);
}

// enviar dades
function enviarFormulari() {
    const clientes = JSON.parse(localStorage.getItem('Client')) || [];
    const idCliente = parseInt(localStorage.getItem('idModificar'), 10);
    var cliente = clientes.find(c => c.id === idCliente);
    //inicializa la variable para el mensaje de error
    let mensajeError = "";

    const dni = document.getElementById('nif').value;
    const telefono = document.getElementById('phone').value;
    const correo = document.getElementById('email').value;

    //verifica si ya existe un cliente con el mismo DNI
    const dniExistente = clientes.some(client => client.nif === dni && idCliente != client.id);
    if(dniExistente) {
        mensajeError += "Ya existeix un client amb el mateix DNI.\n";
    }
    
    //verifica si ya existe un cliente con el mismo teléfono
    const telefonoExistente = clientes.some(client => client.phone === telefono && idCliente != client.id);
    if(telefonoExistente) {
        mensajeError += "Ya existeix un client amb el mateix teléfono.\n";
    }

    //verifica si ya existe un cliente con el mismo correo
    const correoExistente = clientes.some(client => client.email === correo && idCliente != client.id);
    if(correoExistente) {
        mensajeError += "Ya existeix un client amb el mateix correo.\n";
    }

    //si hay algún error, muestra el mensaje y evita que se guarde el cliente
    if(mensajeError) {
        alert(mensajeError);
        return;  //detiene la función si hay algun duplicado
    }
    
    var provincia, ciudad;
    provincia = document.getElementById('province').value;
    ciudad = document.getElementById('city').value;
    if (parseInt(cliente.state_id) === 194) {
        //busca el nombre de la provincia y la ciudad usando los IDs de `cliente`
        const provinciaNombre = Province.find(variable => variable.id === provincia)?.name || "No especificado";
        const ciudadNombre = City.find(variable => variable.id === ciudad)?.name || "No especificado";
    
        provincia = provinciaNombre;
        ciudad = ciudadNombre;
    }

    clientes[idCliente - 1].name = document.getElementById('name').value;
    clientes[idCliente - 1].address = document.getElementById('address').value;
    clientes[idCliente - 1].nif = document.getElementById('nif').value;
    clientes[idCliente - 1].phone = document.getElementById('phone').value;
    clientes[idCliente - 1].email = document.getElementById('email').value;
    clientes[idCliente - 1].state_id = document.getElementById('state_id').value;
    clientes[idCliente - 1].province = document.getElementById('province').value;
    clientes[idCliente - 1].city = document.getElementById('city').value;
    clientes[idCliente - 1].cp = document.getElementById('cp').value;

    localStorage.setItem('Client',  JSON.stringify(clientes));

    setTimeout(function (){
        listarCliente();
    },1000);
}

//función que vacía todos los campos del formulario
function listarCliente(){
    window.location.assign("../llistar/llistar.html");
}