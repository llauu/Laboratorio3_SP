const URL = 'http://localhost:3000/monstruos';

// async function ObtenerMonstruosAsync() {
//     try {
//         const res = await fetch(URL);

//         // Si falla lanzo el error y lo atrapa el catch
//         if(!res.ok) throw res;

//         const data = await res.json();
//         return data;
//     }
//     catch(err) {
//         console.error(`Error ${err.status}: ${err.statusText}`);
//     }
// }

function ObtenerMonstruos() {
    return new Promise((resolve, reject) => {
        fetch(URL)
            .then((res) => res.ok ? res.json() : Promise.reject(res))
            .then((json) => resolve(json))
            .catch((err) => reject(`Error ${err.status}: ${err.statusText}`));
    });
}

function CargarMonstruo(monstruo) {
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(monstruo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.ok ? res.json() : Promise.reject(res))
        .then((json) => console.log(json))
        .catch((err) => console.error(`Error ${err.status}: ${err.statusText}`))
        .finally(() => $loader.classList.add('oculto'));
}

function ModificarMonstruo(monstruo) {
    fetch(URL + '/' + monstruo.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(monstruo),
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => console.log(json))
        .catch((err) => console.error(`Error ${err.status}: ${err.statusText}`))
        .finally(() => $loader.classList.add("oculto"));
}

function EliminarMonstruo(id) {
    fetch(URL + '/' + id, {
        method: "DELETE",
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => console.log(json))
        .catch((err) => console.error(`Error ${err.status}: ${err.statusText}`))
        .finally(() => $loader.classList.add("oculto"));
}

