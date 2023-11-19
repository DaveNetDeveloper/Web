const baseUrl = `https://localhost`;
const controllerName = `Usuarios`;
const port = `7161`;
const apiUrl = `${baseUrl}:${port}/${controllerName}/`;

var userToken = "iqSSXsiTBZuRkHI+nIjhDGtm9MVoWSNhhT8v2EwCeSw=";

class Usuario {
    constructor(id, nombre, apellidos, correo, activo, contraseña, fechaNacimiento, suscrito, fechaCreacion, puntos) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo, 
        this.activo = activo,
        this.contraseña = contraseña,
        this.fechaNacimiento = fechaNacimiento,
        this.suscrito = suscrito,
        this.fechaCreacion = fechaCreacion,
        this.ultimaConexion = null,
        this.puntos = puntos,
        this.token = null,
        this.expiracionToken = null
    }
    metodo() {
        //console.log(`Hola, soy ${this.nombre} y tengo ${this.puntos} puntos.`);
    }
}

class Filtros {
    constructor() {
        // Propiedad bidimensional para almacenar elementos con clave/valor
        this.elementos = [];
    }

    // Método para agregar un elemento con clave/valor al array bidimensional
    agregarElemento(clave, valor) {
        this.elementos.push([clave, valor]);
    }

    // Método para obtener el valor asociado a una clave
    obtenerValor(clave) {
        const elementoEncontrado = this.elementos.find(elemento => elemento[0] === clave);
        return elementoEncontrado ? elementoEncontrado[1] : undefined;
    }

    // Método para imprimir todos los elementos por consola
    imprimirElementos() {
        this.elementos.forEach(elemento => {
            console.log(`Clave: ${elemento[0]}, Valor: ${elemento[1]}`);
        });
    }
}; 

async function calcularHash(cadena) {
    // Convierte la cadena en un array de bytes (codificación UTF-8)
    const buffer = new TextEncoder().encode(cadena);

    // Calcula el hash utilizando el algoritmo SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

    // Convierte el resultado del hash a una cadena hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}


// Web services del controlador
function Get(id) {

    var nameMethod = "ObtenerUsuario";

    document.addEventListener('DOMContentLoaded', () => {
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` 
            }, 
        };

        const urlConParametro = `${apiUrl}${nameMethod}/${id}`; 

        fetch(urlConParametro, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(entidad => {
            const listaUsuarios = document.getElementById('lista-usuarios');
            const listItem = document.createElement('li');
            listItem.textContent = `${entidad.id}: ${entidad.nombre}`;
            listaUsuarios.appendChild(listItem);

            return entidad;
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error.message);
        });
    });
}

function GetAll() {

    document.addEventListener('DOMContentLoaded', () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        };

        const url = `${apiUrl}ObtenerUsuarios`; 
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(listaEntidades => {
                const listaUsuarios = document.getElementById('lista-usuarios');
                listaEntidades.forEach(entidad => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${entidad.id}: ${entidad.nombre}`;
                    listaUsuarios.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error al recuperar datos:', error.message);
            });
    });
}

function GetByFilters(nameMethod, pFiltros) { //paramName, paramValue) {

    document.addEventListener('DOMContentLoaded', () => {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
        };

        var urlConFiltros = `${apiUrl}${nameMethod}`;
        var isFirstParam = true;
        pFiltros.elementos.forEach(filtro => {
            if (isFirstParam) urlConFiltros = `${urlConFiltros}?`;
            else urlConFiltros = `${urlConFiltros}&`;
            urlConFiltros = `${urlConFiltros}${filtro[0]}=${encodeURIComponent(filtro[1])}`;
            isFirstParam = false;
        });

        fetch(urlConFiltros, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }
                return response.json();
            })
            .then(usuario => {
                const listaUsuarios = document.getElementById('lista-usuarios');
                const listItem = document.createElement('li');
                listItem.textContent = `${usuario.id}: ${usuario.nombre}`;
                listaUsuarios.appendChild(listItem);
            })
            .catch(error => {
                console.error('Error al recuperar datos:', error.message);
            });
    }); 
}

function PatchByFilters(nameMethod, pFiltros) {

    document.addEventListener('DOMContentLoaded', () => {

        var urlConFiltros = `${apiUrl}${nameMethod}`;

        var isFirstParam = true;
        pFiltros.elementos.forEach(filtro => {
            if (isFirstParam) urlConFiltros = `${urlConFiltros}?`; 
            else urlConFiltros = `${urlConFiltros}&`; 
            urlConFiltros = `${urlConFiltros}${filtro[0]}=${encodeURIComponent(filtro[1])}`;
            isFirstParam = false;
        });

        fetch(urlConFiltros, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const listaUsuarios = document.getElementById('lista-usuarios');
            const listItem = document.createElement('li');

            listItem.textContent = `${data.id}: ${data.nombre}`;
            listaUsuarios.appendChild(listItem);
        })
        .catch(error => {
            //console.error('Error al recuperar datos:', error.message);
        });
    });
}

function Delete(id) {

    document.addEventListener('DOMContentLoaded', () => {

        var urlConParametro = `${apiUrl}Eliminar/${id}`;
        fetch(urlConParametro, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
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
    });
}
 
function Post(nameMethod, entidad) {
  
    document.addEventListener('DOMContentLoaded', () => {

        var url = `${apiUrl}${nameMethod}`;
        fetch(url, {
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
                console.log('Datos recibidos:', data);
            })
            .catch(error => {
                console.error('Error al realizar la solicitud POST:', error.message);
            });
    });
}

function Put(nameMethod, entidad) {

    document.addEventListener('DOMContentLoaded', () => {

        var url = `${apiUrl}${nameMethod}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
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
                console.log('Datos recibidos:', data);
            })
            .catch(error => {
                console.error('Error al realizar la solicitud PUT:', error.message);
            });
    });
}