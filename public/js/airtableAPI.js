async function fetchAirtableData(id_proyecto) {
    const res = await fetch(`http://localhost:3000/proyecto/${id_proyecto}/airtable_data`); //cambiar dirección
    const data = await res.json();
    sessionStorage.setItem(`airtable-data-${id_proyecto}`, data);
}


async function getAirtableData(id_proyecto) {
    let data = {}
    // Try to retreive data from local storage
    data = sessionStorage.getItem(`airtable-data-${id_proyecto}`);
    data = JSON.parse(data);
    if (data === null){
        // Fetch data from server
        await fetchAirtableData(id_proyecto);
        data = sessionStorage.getItem(`airtable-data-${id_proyecto}`);
        data = JSON.parse(data);
    }
    return data;
}


async function getTareasDB(id_proyecto) {
    let data = {}
    data = await fetch(`http://localhost:3000/proyecto/${id_proyecto}/db_data`);
    data = await data.json();
    return data;
} 


async function sincronizeAirtable(id_proyecto) {
    // Fetch all data in airtable
    let airtable_data = await getAirtableData(id_proyecto);
    airtable_data = airtable_data.body;

    // Fetch all tareas_casouso_proyecto in current db
    let tareasDB = await getTareasDB(id_proyecto);
    tareasDB = JSON.parse(tareasDB);

    // Merge both data
    // .. change airtable data from array to dict with id row as key
    let tareasAirtable = {}
    for (let i = 0; i < airtable_data.length; i++) {
        if (airtable_data[i]['Id'] != undefined){
            tareasAirtable[airtable_data[i]['Id']] = tareasDB[i];
        }
    }

    console.log(tareasDB);
    /*
    // .. loop all rows in db data
    let i = 0;
    while (i < tareasDB.length) {
        
        // .... search for id in airtable dict
        let dbId = tareasDB[i].id_tareaCasoUso;
        if (dbId in tareasAirtable){
            // .... if it exists check if both data still the same
            tareasAirtable[dbId]['Name'] = `ITC${} - ${nombre_casouso} - ${nombre_tarea} (${nombre_categoria})`;
            tareasAirtable[dbId]['Duration'] = 120 // Calcular la duracion de la tarea
            tareasAirtable[dbId]['Estimation'] = 0.55 // Calcular la estimacion de la tarea
            tareasAirtable[dbId]['Finished Date'] = tareasDB[i].fechaFinalizacion_caso;
            // tareasAirtable[dbId]['Iterations'] = ## Checar que pedo con los IDs de las iteraciones en airtable
            tareasAirtable[dbId]['Status'] = tareasDB[i].estado_caso;
        }
        
        // .... if exists in db but not in airtable,
        else {
            // ...... queue an instruction to add row in airtable
            
            // ...... remove register from airtable dict
            delete airtable_data[i];
        }
        i++;
    }
    // .. if airtable dict is not empty
    if(airtable_data.length != 0){      
        let keys = Object.keys(airtable_data);
        //let values = [id_proyecto, complejidad_caso, nombre_caso, fechaInicio_caso, fechaFinalizacion_caso, iteracion_caso];
        // .... loop remainding rows in airtable dict
        for (let j = 0; j < keys.length; j++) {
            // ...... queue an instruction to add row in db
            fetchPostSync(values, id_proyecto);
            // Display in user interface

            i++;
        }
    }
    */
}


function fetchPostSync(values, id_proyecto) {
    const data = new FormData();
    data.append('data', JSON.stringify(values));
    fetch(`http://localhost:3000/proyecto/${id_proyecto}/sync`, {
        method: 'POST',
        body: data
    })
    .then(function(response) {
        if(response.ok) {
            return response.text()
        } else {
            throw "Error en la llamada Ajax";
        }

    })
}