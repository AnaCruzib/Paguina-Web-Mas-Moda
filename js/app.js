const carrito = document.getElementById('carrito');
const ropas = document.getElementById('lista-ropa');
const listaRopas = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


cargarEventListeners();

function cargarEventListeners(){
    ropas.addEventListener('click', comprarRopa);
    carrito.addEventListener('click', eliminarRopa);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

function comprarRopa(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const ropa = e.target.parentElement.parentElement;
        leerDatosRopa(ropa);
    }
}

function leerDatosRopa(ropa){
    const infoRopa = {
        imagen: ropa.querySelector('img').src,
        titulo: ropa.querySelector('h4').textContent,
        precio: ropa.querySelector('.precio span').textContent,
        id: ropa.querySelector('a').getAttribute('date-id')
    }
    insertarCarrito(infoRopa);
}

function insertarCarrito(ropa){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${ropa.imagen}" width=100>
    </td>
    <td>${ropa.titulo}</td>
    <td>${ropa.precio}</td>
    <td>
    <a href="#" class="borrar-ropa" data-id"${ropa.id}">X</a>
    </td>
    `;
    listaRopas.appendChild(row);
    guardarRopaLocalStorage(ropa);
}

function eliminarRopa(e){
    e.preventDefault();

    let ropa,
    ropaId;

    if(e.target.classList.contains('borrar-ropa')){
        e.target.parentElement.parentElement.remove();
        ropa = e.target.parentElement.parentElement;
        ropaId = ropa.querySelector('a').getAttribute('data-id');
    }
    eliminarRopaLocalStorage(ropaId);
}

function vaciarCarrito(){
    while(listaRopas.firstChild){
        listaRopas.removeChild(listaRopas.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

function guardarRopaLocalStorage(ropa){
    let ropas;
    ropas = obtenerRopasLocalStorage();
    ropas.push(ropa);
    localStorage.setItem('ropas', JSON.stringify(ropas))
}

function obtenerRopasLocalStorage(){
    let ropasLS;

    if(localStorage.getItem('ropas')=== null){
        ropasLS = [];
    }
    else{
        ropasLS = JSON.parse(localStorage.getItem('ropas'));
    }
    return ropasLS;
}

function leerLocalStorage(){
    let ropasLS;

    ropasLS = obtenerRopasLocalStorage();

    ropasLS.forEach(function(ropa){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src="${ropa.imagen}" width=100>
    </td>
    <td>${ropa.titulo}</td>
    <td>${ropa.precio}</td>
    <td>
    <a href="#" class="borrar-ropa" data-id${ropa.id}">X</a>
    `;
    listaRopas.appendChild(row);
    });
}

function eliminarRopaLocalStorage(ropa){
    let ropasLS;

    ropasLS = obtenerRopasLocalStorage();
    ropasLS.forEach(function(ropasLS,index){
        if(ropasLS.id === ropa){
            ropasLS.splice(index, 1)
        }
    });
    localStorage.setItem('ropas',JSON.stringify(ropasLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}