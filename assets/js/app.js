// Variables Globales

const formularioUI = document.querySelector('#formulario');
const listaActividadUI =  document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones 
const CrearItem = actividad => {

    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item);
    
    return item;
}

const GuardarDB = () => {

    localStorage.setItem('rutina', JSON.stringify( arrayActividades));

    PintarDB();
}

const PintarDB  = () => {
    
    listaActividadUI.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'));

    if(arrayActividades === null) {
        arrayActividades = [];
    }else {
        arrayActividades.forEach(element => {

            if(element.estado){
                listaActividadUI.innerHTML += `<div id="listaActividades" class="mt-4"><div class="alert alert-success" role="alert"><span class="material-icons float-left mr-2">directions_walk</span>
                <b>${element.actividad}</b> - ${element.estado}<span class="float-right"><span class="material-icons mr-2" style="cursor: pointer;">done</span><span class="material-icons" style="cursor: pointer;">delete</span></span></div></div>`;
            }else {
                listaActividadUI.innerHTML += `<div id="listaActividades" class="mt-4"><div class="alert alert-danger" role="alert"><span class="material-icons float-left mr-2">directions_walk</span>
                <b>${element.actividad}</b> - ${element.estado}<span class="float-right"><span class="material-icons mr-2" style="cursor: pointer;">done</span><span class="material-icons" style="cursor: pointer;">delete</span></span></div></div>`;
            }
        });
    }
}

const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        if(elemento.actividad === actividad){
            indexArray = index;
            
        }
        
    });

    arrayActividades.splice(indexArray, 1)
    GuardarDB();
}

const EditarDB = (actividad) => {
    let indexArray = arrayActividades.findIndex((elemento) => {
        return elemento.actividad === actividad}
    );

    arrayActividades[indexArray].estado = true;
    GuardarDB();
}


// Event Listener

formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();
    let actividadUI = document.querySelector('#actividad').value;

    CrearItem(actividadUI);
    GuardarDB();

    formularioUI.reset();


});

document.addEventListener('DOMContentLoaded', PintarDB);

listaActividadUI.addEventListener('click', (e) =>{
    e.preventDefault();

    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        
        let texto = e.path[2].childNodes[2].innerHTML;
        
        if(e.target.innerHTML === 'delete'){
            // Acion de Eliminar
            EliminarDB(texto);
        }
        if(e.target.innerHTML === 'done'){
            // Acion de Editar
            EditarDB(texto);
        }
    }

});