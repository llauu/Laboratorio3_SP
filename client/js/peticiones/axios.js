const URL = 'http://localhost:3000/monstruos';

function ObtenerMonstruos() {
    return new Promise((resolve, reject) => {
        axios.get(URL)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err.message));
    });
}

function CargarMonstruo(monstruo) {
    axios.post(URL, monstruo)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.message))
        .finally(() => $loader.classList.add('oculto'))
}

function ModificarMonstruo(monstruo) {
    axios.put(URL + '/' + monstruo.id, monstruo)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.message))
        .finally(() => $loader.classList.add('oculto'))
}

function EliminarMonstruo(id) {
    axios.delete(URL + '/' + id)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.message))
        .finally(() => $loader.classList.add('oculto'))
}