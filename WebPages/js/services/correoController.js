
//
// Proxis con los web services del controlador
//
function enviarCorreo(email) {

    const baseUrl = `https://localhost`;
    const controllerName = `Correo`;
    const action = "Enviar";
    const port = `7161`;
    const url = `${baseUrl}:${port}/${controllerName}/${action}`;
     
    const data = {
        Destinatario: email,
        Asunto: "Test",
        Cuerpo: "Test"
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
        .then(response => response)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al llamar al servicio web:', error);
            throw error;
        });
}