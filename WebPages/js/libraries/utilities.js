//
// Encriptar
//

//
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

//
// COOKIES
//

// Función para establecer una cookie
function setCookie(nombre, valor, expiracionEnDias) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + expiracionEnDias);

    const cookieValor = encodeURIComponent(valor) + "; expires=" + fechaExpiracion.toUTCString() + "; path=/";
    document.cookie = nombre + "=" + cookieValor;
}

// Función para obtener el valor de una cookie
function getCookie(nombre) {
    const nombreEQ = nombre + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nombreEQ) === 0) {
            return decodeURIComponent(cookie.substring(nombreEQ.length, cookie.length));
        }
    }
    return null;
}

// Función para cargar contenido desde un archivo
async function cargarContenidoHtml(url, contenedorId) {
    const response = await fetch(url);
    const contenido = await response.text();
    document.getElementById(contenedorId).innerHTML = contenido;
}

//
function getInputValueByName(name) {
    const emailInput = document.querySelector('input[name="' + name + '"]');
    return emailInput.value;
}

//
function setInputValueByName(name, value) {
    const emailInput = document.querySelector('input[name="' + name + '"]');
    emailInput.value = value;
}

// para navegación a una página
function redirectToPage(page) {
    window.location.assign(page);
}

// para recargar una página
function refreshPage() {
    window.location.href = getCurrentPage();
}

function getCurrentPage() {
    var rutaActual = window.location.pathname;
    return rutaActual.substring(rutaActual.lastIndexOf('/') + 1);
}