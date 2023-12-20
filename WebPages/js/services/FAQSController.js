﻿//
// Constantes
//

//TODO: refactorizar las variables globales para la URL

let baseUrl6 = `https://localhost`;
let controllerName6 = `FAQS`;
let port6 = `7161`;
let apiUrl6 = `${baseUrl6}:${port6}/${controllerName6}/`;

//var userToken = "qAGlDm9o9oS1Ir+xNlWk3XXHkJy/+nJmBy3KUPoms2w="; // TODO: cambiar por valor de la cookie
 
class FAQ {
    constructor(id, orden, pregunta, respuesta) {
        this.id = id,
            this.orden = orden,
            this.pregunta = pregunta,
            this.respuesta = respuesta
    }
    metodo() {
        //console.log(' ');
    }
} 

//
// Proxies con los web services del controlador 
//
function GetFAQ(id) {

    let nameMethod = "ObtenerFAQ";
    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let urlConParametro = `${apiUrl6}${nameMethod}/${id}`; 

    return fetch(urlConParametro, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(entidad => {
            return entidad;
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error.message);
        }); 
}

function GetFAQS() {

    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let url = `${apiUrl6}ObtenerFAQS`;
    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error.message);
            throw error;
        });
}

function GetFAQByFilters(nameMethod, pFiltros) {

    let requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let urlConFiltros = `${apiUrl6}${nameMethod}`;
    let isFirstParam = true;
    pFiltros.elementos.forEach(filtro => {
        if (isFirstParam) urlConFiltros = `${urlConFiltros}?`;
        else urlConFiltros = `${urlConFiltros}&`;
        urlConFiltros = `${urlConFiltros}${filtro[0]}=${encodeURIComponent(filtro[1])}`;
        isFirstParam = false;
    });

    return fetch(urlConFiltros, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error.message);
        });
}

function PatchFAQByFilters(nameMethod, pFiltros) {

    let requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    }; 

    let urlConFiltros = `${apiUrl6}${nameMethod}`;

    alert(urlConFiltros);

    let isFirstParam = true;
    pFiltros.elementos.forEach(filtro => {
        if (isFirstParam) urlConFiltros = `${urlConFiltros}?`; 
        else urlConFiltros = `${urlConFiltros}&`; 
        urlConFiltros = `${urlConFiltros}${filtro[0]}=${encodeURIComponent(filtro[1])}`;
        isFirstParam = false;
    });

    alert(urlConFiltros);

    return fetch(urlConFiltros, requestOptions)
        .then(response => {
            if (!response.ok) {
                alert('ko: ' + response.status);
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            alert('ok');
            return response.json();
        })
        .then(data => {
            alert('data ok');
            return data;
        })
        .catch(error => {
            //console.error('Error al recuperar datos:', error.message);
            alert('catch error');
            //throw error;
            return error;
        }); 
}

function DeleteFAQ(id) {

    let urlConParametro = `${apiUrl6}Eliminar/${id}`;
    return fetch(urlConParametro, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error al realizar la solicitud DELETE:', error.message);
    });
}
 
function PostFAQ(nameMethod, entidad) {
  
    let url = `${apiUrl6}${nameMethod}`;
    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entidad)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            } 
            return response.json();
        })
        .then(data => { 
            return data;
        })
        .catch(error => { 
            console.error('Error al realizar la solicitud POST:', error.message);
        });
}

function PutFAQ(nameMethod, entidad) {

    let url = `${apiUrl6}${nameMethod}`;
    return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entidad)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            } 
            return response.json();
        })
        .then(data => { 
            return data;
        })
        .catch(error => {
            console.error('Error al realizar la solicitud PUT:', error.message);
        });
} 