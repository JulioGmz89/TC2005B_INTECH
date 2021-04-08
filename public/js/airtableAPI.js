function fetchAirtableData(id_proyecto) {
    fetch(`http://localhost:3000/proyecto/${id_proyecto}/airtable_data`) //cambiar dirección
    .then(response => response.json())
    .then(data => {
        //Guardar coockie
        var d = new Date();
        d.setTime(d.getTime() + (exdays2460601000));
        var expires = "expires="+ d.toUTCString();
    });
};