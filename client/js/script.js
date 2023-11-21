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


// Main AJAX y AXIOS
function Main() {
    ObtenerMonstruos()
        .then((monstruosTraidos) => {
            monstruosCargados = monstruosTraidos;

            CargarMonstruosEnTabla(monstruosCargados);
    
            $btnGuardar.addEventListener("click", (e) => {
                e.preventDefault();
        
                if(!editando) {
                    // Alta
                    AltaMonstruo(monstruosCargados);
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

// Con fetch y async/await:
// async function Main() {
//     // Con fetch:
//     // monstruosCargados = await ObtenerMonstruos();

//     CargarMonstruosEnTabla(monstruosCargados);
    
//     $btnGuardar.addEventListener("click", (e) => {
//         e.preventDefault();

//         if(!editando) {
//             // Alta
//             AltaMonstruo(monstruosCargados);
//         }
//         else {
//             // Modificacion
//             EditarMonstruo(idSeleccionado);
//         }
//     });

//     $btnEliminar.addEventListener("click", (e) => {
//         e.preventDefault();

//         EliminarMonstruo(idSeleccionado);
//     });
// }


function ObtenerUltimoId(monstruos) {
    if(monstruos.length > 0) {
        return monstruos[monstruos.length - 1].id;
    }
    else {
        return 0;
    }
}


function CargarMonstruosEnTabla(monstruos) {
    if(monstruos !== undefined) {
        monstruos.forEach((monstruo) => {
            AgregarMonstruoALaTabla(monstruo);
        });
    }
}


function AltaMonstruo(monstruos) {
    let nombre = $txtNombre.value;
    let alias = $txtAlias.value;
    let defensa = ObtenerDefensa();
    let miedo = $rgMiedo.value;
    let tipo = $selTipo.value;
    
    if(VerificarMonstruoValido(nombre, alias, defensa, miedo, tipo)) {
        $loader.classList.remove('oculto');
        
        let id = ObtenerUltimoId(monstruos);

        const monstruo = new Monstruo(id + 1, nombre, alias, defensa, miedo, tipo);

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
    const $tabla = document.getElementById("tablaMonstruos");
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

    $tabla.appendChild($fila);

    $fila.addEventListener("click", () => {
        SeleccionarMonstruo($fila);
        
        // Esto hace que cuando se seleccione un monstruo, se haga scroll hasta el formulario
        document.body.scrollIntoView({ behavior: 'smooth' });
    });
}


window.onload = () => {
    Main();
}