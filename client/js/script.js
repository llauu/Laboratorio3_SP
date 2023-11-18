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

let monstruosLS = JSON.parse(localStorage.getItem("monstruos"));

if (monstruosLS === null) {
    // Si no hay ningun monstruo en el LS, inicializo el array y seteo el id en 1
    monstruosLS = [];
    localStorage.setItem("ultimoID", 1);
}
else {
    // Si hay monstruos en el LS, los cargo en la tabla
    monstruosLS.forEach((monstruo) => {
        AgregarMonstruoALaTabla(monstruo);
    });
}

$btnGuardar.addEventListener("click", (e) => {
    e.preventDefault();

    let nombre = $txtNombre.value;
    let alias = $txtAlias.value;
    let defensa = ObtenerDefensa();
    let miedo = $rgMiedo.value;
    let tipo = $selTipo.value;
    
    if(VerificarMonstruoValido(nombre, alias, defensa, miedo, tipo)) {
        const monstruo = new Monstruo(localStorage.getItem("ultimoID"), nombre, alias, defensa, miedo, tipo);

        $loader.classList.remove("oculto");
    
        setTimeout(() => {
            $loader.classList.add("oculto");
            console.log('Monstruo guardado en el LS');
            AgregarMonstruoALaTabla(monstruo);
        }, 2000);
    
        monstruosLS.push(monstruo);
    
        localStorage.setItem("monstruos", JSON.stringify(monstruosLS));
        localStorage.setItem("ultimoID", Number(localStorage.getItem("ultimoID")) + 1);
    }
    else {
        console.log('Campos no validos.');
        MostrarErrorModal();
    }
});

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
}