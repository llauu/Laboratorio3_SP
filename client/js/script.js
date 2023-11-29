// Cargo los tipos de monstruos en el select
const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre lobo"];
const $selTipo = document.getElementById("selTipo");

tipos.forEach((tipo) => {
    const $select = document.createElement("option");
    const $selTipoTxt = document.createTextNode(tipo);

    $select.setAttribute("value", tipo);
    $select.setAttribute("text", tipo);

    $select.appendChild($selTipoTxt);
    $selTipo.appendChild($select);
});

const $txtNombre = document.getElementById("txtNombre");
const $txtAlias = document.getElementById("txtAlias");
const $rdDefensas = document.getElementsByName("defensa");
const $rgMiedo = document.getElementById("rgMiedo");

const $loader = document.getElementById("loader");
const $btnGuardar = document.getElementById("btnGuardar");
const $btnCancelar = document.getElementById("btnCancelar");
const $btnEliminar = document.getElementById("btnEliminar");
let monstruosCargados = [];
let idSeleccionado = -1;
let editando = false;

const $selFiltrarTipo = document.getElementById("selFiltrarTipo");
const $txtPromedioMiedo = document.getElementById("txtPromedioMiedo");
const $filtrarColumnas = document.getElementById("filtrarColumnas");

function Main() {
    ObtenerMonstruos()
        .then((monstruosTraidos) => {
            monstruosCargados = monstruosTraidos;

            CargarMonstruosEnTabla(monstruosCargados);

            $btnGuardar.addEventListener("click", (e) => {
                e.preventDefault();
        
                if(!editando) {
                    // Alta
                    AltaMonstruo();
                }
                else {
                    // Modificacion
                    EditarMonstruo(idSeleccionado);
                }
            });
        
            $btnEliminar.addEventListener("click", (e) => {
                e.preventDefault();
        
                $loader.classList.remove('oculto');
                EliminarMonstruo(idSeleccionado);
            });
        })
        .catch((err) => console.error(err));
} 

function CargarMonstruosEnTabla(monstruos) {
    let tipoFiltra = $selFiltrarTipo.value;
    $txtPromedioMiedo.value = 0;
    
    // Elimino los monstruos q ya estan cargados
    const $tbody = document.getElementById("tbodyMonstruos");

    while($tbody.lastChild) {
        $tbody.removeChild($tbody.lastChild);
    }

    OrdenarMonstruosPorMiedo(monstruos);

    if(tipoFiltra === "Todos") {
        monstruos.forEach((monstruo) => {
            AgregarMonstruoALaTabla(monstruo);
        });
        
        if(monstruos.length > 0) {
            $txtPromedioMiedo.value = CalcularPromedioMiedo(monstruos);
        }
    }
    else {
        const monstruosFiltrados = FiltrarMonstruosPorTipo(monstruos, tipoFiltra);

        monstruosFiltrados.forEach((monstruo) => {
            AgregarMonstruoALaTabla(monstruo);
        });

        if(monstruosFiltrados.length > 0) {
            $txtPromedioMiedo.value = CalcularPromedioMiedo(monstruosFiltrados);
        }
    }
}

function AltaMonstruo() {
    let nombre = $txtNombre.value;
    let alias = $txtAlias.value;
    let defensa = ObtenerDefensa();
    let miedo = $rgMiedo.value;
    let tipo = $selTipo.value;

    if(VerificarMonstruoValido(nombre, alias, defensa, miedo, tipo)) {
        $loader.classList.remove('oculto');

        const monstruo = new Monstruo(nombre, alias, defensa, miedo, tipo);

        CargarMonstruo(monstruo);
    }
    else {
        console.log('Campos no validos.');
        MostrarErrorModal();
    }
}


function EditarMonstruo(idSeleccionado) {
    let nombre = $txtNombre.value;
    let alias = $txtAlias.value;
    let defensa = ObtenerDefensa();
    let miedo = $rgMiedo.value;
    let tipo = $selTipo.value;

    if(VerificarMonstruoValido(nombre, alias, defensa, miedo, tipo)) {
        $loader.classList.remove('oculto');
        
        const monstruo = new Monstruo(idSeleccionado, nombre, alias, defensa, miedo, tipo);
        
        ModificarMonstruo(monstruo);
    }
    else {
        console.log('Campos no validos.');
        MostrarErrorModal();
    }
}


function SeleccionarMonstruo(fila) {
    if(!editando) {
        editando = true;

        const $nombre = fila.childNodes[0].textContent;
        const $alias = fila.childNodes[1].textContent;
        const $defensa = fila.childNodes[2].textContent;
        const $miedo = fila.childNodes[3].textContent;
        const $tipo = fila.childNodes[4].textContent;
        
        $txtNombre.value = $nombre;
        $txtAlias.value = $alias;
        $rgMiedo.value = $miedo;
        $selTipo.value = $tipo;

        $rdDefensas.forEach((defensa) => { 
            if(defensa.value === $defensa) {
                defensa.checked = true;
            }
        });

        $btnGuardar.textContent = "Editar";
        $btnCancelar.classList.remove("oculto");
        $btnEliminar.classList.remove("oculto");

        idSeleccionado = ObtenerIdMonstruoSeleccionado(monstruosCargados, $nombre, $alias, $defensa, $miedo, $tipo);
        
        $btnCancelar.addEventListener("click", (e) => {
            editando = false;
            $btnGuardar.textContent = "Guardar";
            $btnCancelar.classList.add("oculto");
            $btnEliminar.classList.add("oculto");
        });
    }
}


function ObtenerIdMonstruoSeleccionado(monstruos, nombre, alias, defensa, miedo, tipo) {
    let id = -1;

    monstruos.forEach((monstruo) => {
        if(monstruo.nombre == nombre && monstruo.alias == alias && monstruo.defensa == defensa && monstruo.miedo == miedo && monstruo.tipo == tipo) {
            id = monstruo.id;
        }
    });

    return id;
}


function MostrarErrorModal() {
    $('#modalAviso').modal('show');

    const $modalAviso = document.getElementById("modalAviso");

    $modalAviso.addEventListener("click", (e) => {
        $('#modalAviso').modal('hide');
    });
}


function ObtenerDefensa() {
    let defensaSeleccionada = null;

    $rdDefensas.forEach((defensa) => {
        if(defensa.checked) {
            defensaSeleccionada = defensa.value;
        }
    });

    return defensaSeleccionada;
}


function VerificarMonstruoValido(nombre, alias, defensa, miedo, tipo) {
    if(nombre === "") {
        return false;
    }

    if(alias === "") {
        return false;
    }

    if(defensa === null || defensa === undefined) {
        return false;
    }

    if(miedo === "") {
        return false;
    }

    if(tipo === "") {
        return false;
    }

    return true;
}


function AgregarMonstruoALaTabla(monstruo) {
    const $tbody = document.getElementById("tbodyMonstruos");
    const $fila = document.createElement("tr");

    $fila.classList.add("filaMonstruo");

    const $nombre = document.createElement("td");
    const $alias = document.createElement("td");
    const $defensa = document.createElement("td");
    const $miedo = document.createElement("td");
    const $tipo = document.createElement("td");

    const $nombreTxt = document.createTextNode(monstruo.nombre);
    const $aliasTxt = document.createTextNode(monstruo.alias);
    const $defensaTxt = document.createTextNode(monstruo.defensa);
    const $miedoTxt = document.createTextNode(monstruo.miedo);
    const $tipoTxt = document.createTextNode(monstruo.tipo);

    $nombre.appendChild($nombreTxt);
    $alias.appendChild($aliasTxt);
    $defensa.appendChild($defensaTxt);
    $miedo.appendChild($miedoTxt);
    $tipo.appendChild($tipoTxt);

    $fila.appendChild($nombre);
    $fila.appendChild($alias);
    $fila.appendChild($defensa);
    $fila.appendChild($miedo);
    $fila.appendChild($tipo);

    $tbody.appendChild($fila);  

    $fila.addEventListener("click", () => {
        SeleccionarMonstruo($fila);
        
        // Esto hace que cuando se seleccione un monstruo, se haga scroll hasta el formulario
        document.body.scrollIntoView({ behavior: 'smooth' });
    });
}

function FiltrarMonstruosPorTipo(monstruos, tipo) {
    const monstruosFiltrados = monstruos.filter((monstruo) => monstruo.tipo === tipo);

    return monstruosFiltrados;
}

function CalcularPromedioMiedo(monstruos) {
    let promedio = 0;

    monstruos.forEach((monstruo) => {
        promedio += parseInt(monstruo.miedo);
    });

    promedio /= monstruos.length;

    return promedio;
}


function OrdenarMonstruosPorMiedo(monstruos) {
    monstruos.sort((m1, m2) => m2.miedo - m1.miedo);
}


$selFiltrarTipo.addEventListener('change', function() {
    CargarMonstruosEnTabla(monstruosCargados);
});


$filtrarColumnas.addEventListener('change', function() {
    let checkboxes = document.querySelectorAll('#filtrarColumnas input[type="checkbox"]');

    for (let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
                let filas = document.getElementsByClassName("filaMonstruo");
                
                for (let j = 0; j < filas.length; j++) {
                    filas[j].childNodes[i].classList.add('oculto');;
                }

                document.getElementsByTagName("td")[i].classList.add('oculto');
        }
        else {
            let filas = document.getElementsByClassName("filaMonstruo");
            
            for (let j = 0; j < filas.length; j++) {
                filas[j].childNodes[i].classList.remove('oculto');;
            }

            document.getElementsByTagName("td")[i].classList.remove('oculto');
        }
    }
});


// -------------------------------------------------------
window.onload = () => {
    Main();
}