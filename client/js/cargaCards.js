
let monstruosLS = JSON.parse(localStorage.getItem("monstruos"));

if(monstruosLS !== null) {
    monstruosLS.forEach((monstruo) => {
        //Cargamos las tajetas de los monstruos
        AgregarTarjetaMonstruo(monstruo);
    });
}

function AgregarTarjetaMonstruo(monstruo) {
    const $containerCards = document.getElementById("container-cards");
    const $card = document.createElement("div");
    const $cardBody = document.createElement("div");
    const $titulo = document.createElement("h5");
    const $subtitulo = document.createElement("h6");
    const $defensa = document.createElement("p");
    const $miedo = document.createElement("p");
    const $tipo = document.createElement("p");

    $card.classList.add("card", "mt-5", "mx-2", "bg-info-subtle", "shadow", "cardMonstruo");
    $cardBody.classList.add("card-body");
    $titulo.classList.add("card-title");
    $subtitulo.classList.add("card-subtitle", "mb-2", "text-body-secondary");
    $defensa.classList.add("card-text", "mb-0");
    $miedo.classList.add("card-text", "mb-0");
    $tipo.classList.add("card-text", "mb-0");

    const $tituloTxt = document.createTextNode(`${monstruo.nombre}`);
    const $subtituloTxt = document.createTextNode(`${monstruo.alias}`);

    const $defensaTxt = document.createTextNode(`Defensa: ${monstruo.defensa}`);
    const $miedoTxt = document.createTextNode(`Miedo: ${monstruo.miedo}`);
    const $tipoTxt = document.createTextNode(`Tipo: ${monstruo.tipo}`);

    $titulo.appendChild($tituloTxt);
    $subtitulo.appendChild($subtituloTxt);
    $defensa.appendChild($defensaTxt);
    $miedo.appendChild($miedoTxt);
    $tipo.appendChild($tipoTxt);

    $cardBody.appendChild($titulo);
    $cardBody.appendChild($subtitulo);
    $cardBody.appendChild($defensa);
    $cardBody.appendChild($miedo);
    $cardBody.appendChild($tipo);

    $card.appendChild($cardBody);
    $containerCards.appendChild($card);
}