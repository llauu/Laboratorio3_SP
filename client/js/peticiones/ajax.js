const URL = 'http://localhost:3000/monstruos';

function ObtenerMonstruos() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // ready state change
        // 5 valores: 0, 1, 2, 3, 4
        // cuando vale 4 significa q ya recibimos la respuesta del servidor, este es el que nos interesa

        // ------- setear el evento ready state change
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const json = JSON.parse(xhr.responseText);
                    resolve(json);
                } else {
                    reject(`Error ${xhr.status}: ${xhr.statusText}`);
                }
            }
        };

        // ------- open peticion configura
        xhr.open("GET", URL, true);
        // El tercer parametro es para indicar si es asincrono o no

        // Este try es por si algo falla en el lado del cliente
        // ------- enviar la peticion
        try {
            xhr.send();
        } catch (err) {
            reject(err);
        }
        // En las peticiones GET no se envia nada en los parametros del send
    });
}

function CargarMonstruo(monstruo) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            } 
            else {
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.remove("oculto");
        }
    };
  
    xhr.open("POST", URL, true);
  
    // El application/json;charset=UTF-8 se llama mime type, es el tipo de lo que envio
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
    // Enviar
    try {
        // Como es POST mando todo por body
        xhr.send(JSON.stringify(monstruo));
    } catch (err) {
        console.error(err);
    }
}

function ModificarMonstruo(monstruo) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            } 
            else {
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.remove("oculto");
        }
    };

    xhr.open("PUT", URL + "/" + monstruo.id, true);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  
    try {
        xhr.send(JSON.stringify(monstruo));
    } catch (err) {
        console.error(err);
    }
}

function EliminarMonstruo(id) {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (xhr.getResponseHeader == "application/json") {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                }
            } 
            else {
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.remove("oculto");
        }
    };

    xhr.open("DELETE", URL + "/" + id, true);

    try {
        xhr.send();
    } catch (err) {
        console.error(err);
    }
}