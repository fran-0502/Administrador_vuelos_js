// declaracion de var
const aereoInput = document.querySelector('#aereolinea')
const tipoInput = document.querySelector('#tipo');
const desdeInput = document.querySelector('#desde');
const hastaInput = document.querySelector('#hasta');
const idaInput = document.querySelector('#ida');
const vueltaInput = document.querySelector('#vuelta');

const formulario = document.querySelector('#nuevo-vuelo');
const listadoCitas = document.querySelector('#citas');
// console.log(formulario)formulario
// eventos
let boleano
let editar

class vuelos {
    constructor() {
        this.vuelos = [];
    }

    agregarVuelos(vuelo) {
        this.vuelos = [...this.vuelos, vuelo]
        console.log(this.vuelos)
    }

    eliminarVuelo(id) {
        this.vuelos = this.vuelos.filter(vuelos => vuelos.id !== id);
    }

    editarCitas(vueloAc) {

        this.vuelos = this.vuelos.map(vuelos => vuelos.id === vueloAc.id ? vueloAc : vuelos)
    }

}

class ui {

    imprimirAlerta(mensaje, tipo) {
        const divAlerta = document.createElement("div");
        divAlerta.classList.add('text-center', 'alert', 'd-block', 'col-12')
        divAlerta.textContent = mensaje;

        if (tipo === "error") {
            divAlerta.classList.add("alert-danger")
        } else {
            divAlerta.classList.add("alert-success")
        }


        document.querySelector('#contenido').insertBefore(divAlerta, document.querySelector('.agregar-cita'))

        setTimeout(() => {
            divAlerta.remove();
        }, 2000);
    }

    imprimirVuelo({ vuelos }) {

        limpiarHTML()

        vuelos.forEach(vuelos => {

            const { aereolinea, tipo, desde, hasta, ida, vuelta, id } = vuelos;
            const contenedor = document.createElement("div");
            contenedor.classList.add("cita", "p-3")

            const imprimiraereolinea = document.createElement("h3")
            imprimiraereolinea.classList.add("card-title", 'font-weight-bolder')
            imprimiraereolinea.textContent = `aereolinea: ${aereolinea}`
            contenedor.appendChild(imprimiraereolinea)

            const imprimirTipo = document.createElement("p");
            imprimirTipo.innerHTML = `
             <span class="font-weight-bolder">tipo de vuelo:${tipo}</span>
            `

            const imprimirDesde = document.createElement("p");
            imprimirDesde.innerHTML = `
             <span class="font-weight-bolder">Desde:${desde}</span>
            `
            const imprimirhasta = document.createElement("p");
            imprimirhasta.innerHTML = `
             <span class="font-weight-bolder">hasta:${hasta}</span>
            `
            const imprimirida = document.createElement("p");
            imprimirida.innerHTML = `
             <span class="font-weight-bolder">ida:${ida}</span>
            `
            const imprimirvuelta = document.createElement("p");
            imprimirvuelta.innerHTML = `
            <span class="font-weight-bolder" > vuelta:${vuelta}</span >
            `

            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add("btn", "btn-danger", "mr-2");
            btnBorrar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>';
            btnBorrar.onclick = () => eliminarCita(id);

            const btnModificar = document.createElement('button')
            btnModificar.classList.add("btn", "btn-info", "mr-2");
            btnModificar.innerHTML = 'Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>'
            btnModificar.onclick = () => cargarEdicion(vuelos);

            contenedor.appendChild(imprimirTipo)
            contenedor.appendChild(imprimirDesde);
            contenedor.appendChild(imprimirhasta);
            contenedor.appendChild(imprimirida);

            if (vuelos.tipo === "de ida y vuelta") {
                contenedor.appendChild(imprimirvuelta)
            }

            contenedor.appendChild(btnBorrar)
            contenedor.appendChild(btnModificar)
            listadoCitas.appendChild(contenedor)

        })


    }
    localStorage({ vuelos }) {
        localStorage.setItem("vuelos", JSON.stringify(vuelos))
    }

}
const uiseri = new ui();
const administrarVuelos = new vuelos();


manejadorDeEventos()

function manejadorDeEventos() {
    aereoInput.addEventListener('change', datosCitio)
    tipoInput.addEventListener('change', datosCitio);
    desdeInput.addEventListener('change', datosCitio);
    hastaInput.addEventListener('change', datosCitio);
    idaInput.addEventListener('change', datosCitio);
    vueltaInput.addEventListener('change', datosCitio);

    formulario.addEventListener('submit', nuevoVuelo);
    tipoInput.addEventListener('change', verificarTipo);

    document.addEventListener('DOMContentLoaded', () => {
        administrarVuelos.vuelos = JSON.parse(localStorage.getItem('vuelos')) || []
        uiseri.imprimirVuelo(administrarVuelos);
    })

}

const vuelosOBJ = {
    aereolinea: '',
    tipo: '',
    desde: '',
    hasta: '',
    ida: '',
    vuelta: ''
}

function datosCitio(e) {


    vuelosOBJ[e.target.aereolinea] = e.target.value;
    vuelosOBJ[e.target.name] = e.target.value;
    vuelosOBJ[e.target.desde] = e.target.value;
    vuelosOBJ[e.target.hasta] = e.target.value;
    vuelosOBJ[e.target.ida] = e.target.value;
    vuelosOBJ[e.target.vuelta] = e.target.value;
}




function nuevoVuelo(e) {

    e.preventDefault();
    const { aereolinea, tipo, desde, hasta, ida, vuelta } = vuelosOBJ;
    if (boleano) {
        const { aereolinea, tipo, desde, hasta, ida } = vuelosOBJ;
        if (aereolinea === "" || tipo === "" || desde === "" || hasta === "" || ida === "") {
            // console.log("alguno de los campos esta vacio")
            uiseri.imprimirAlerta("Todos los campos son bligatorios", "error")
            return
        }

        if (desde == hasta) {
            uiseri.imprimirAlerta("No puede viajar al mismo pais", "error");
            return
        }
    }
    else {
        if (aereolinea === "" || tipo === "" || desde === "" || hasta === "" || ida === "" || vuelta === "") {
            // console.log("alguno de los campos esta vacio")
            uiseri.imprimirAlerta("Todos los campos son bligatorios", "error")
            return
        }

        if (ida > vuelta) {
            uiseri.imprimirAlerta("revisar los campos de fecha", "error");
            return
        }

        if (desde == hasta) {
            uiseri.imprimirAlerta("No puede viajar al mismo pais", "error");
            return
        }
    }

    if (editar) {
        // console.log("estoy esditando")
        console.log("editando 1")

        formulario.querySelector('button[type=submit]').textContent = 'Crear nuevo vuelo';
        editar = false;

        administrarVuelos.editarCitas({ ...vuelosOBJ })

        uiseri.imprimirAlerta("se ha modificado la cita correctamente")
    } else {
        // generar un id 
        console.log("creando")
        vuelosOBJ.id = Date.now()
        administrarVuelos.agregarVuelos({ ...vuelosOBJ })

        //mensaje  
        uiseri.imprimirAlerta("se ha agregado la cita correctamente")
    }


    formulario.reset();
    reiniciarObjeto();

    uiseri.imprimirVuelo(administrarVuelos);
    uiseri.localStorage(administrarVuelos)

}

function reiniciarObjeto() {
    vuelosOBJ.aereolinea = "";
    vuelosOBJ.tipo = "";
    vuelosOBJ.desde = "";
    vuelosOBJ.hasta = "";
    vuelosOBJ.ida = "";
    vuelosOBJ.vuelta = "";
}

function limpiarHTML() {
    while (listadoCitas.firstChild) {
        listadoCitas.removeChild(listadoCitas.firstChild);
    }
}


function verificarTipo() {
    if (vuelosOBJ.tipo === "solo ida") {
        const ahora = document.querySelector("#vuelta")
        ahora.setAttribute("disabled", "")
        vuelosOBJ.vuelta = "";
        boleano = true;
        return
    } else {
        const ahora = document.querySelector("#vuelta")
        ahora.removeAttribute("disabled", "")
        boleano = false;
        return
    }

}

function eliminarCita(id) {
    console.log(id)

    administrarVuelos.eliminarVuelo(id);

    uiseri.imprimirAlerta("se ha borrado exitosamente")

    uiseri.imprimirVuelo(administrarVuelos)

    uiseri.localStorage(administrarVuelos)
}

function cargarEdicion(vuelo) {
    // console.log(cita)
    const { aereolinea, tipo, desde, hasta, ida, vuelta, id } = vuelo;
    // llnar los input
    aereoInput.value = aereolinea;
    tipoInput.value = tipo;
    desdeInput.value = desde;
    hastaInput.value = hasta;
    idaInput.value = ida;
    vueltaInput.value = vuelta;

    // llenar el objeto 

    vuelosOBJ.aereolinea = aereolinea;
    vuelosOBJ.tipo = tipo;
    vuelosOBJ.desde = desde;
    vuelosOBJ.hasta = hasta;
    vuelosOBJ.ida = ida;
    vuelosOBJ.vuelta = vuelta;
    vuelosOBJ.id = id

    formulario.querySelector('button[type=submit]').textContent = 'Guardar cambios';

    editar = true;
}
