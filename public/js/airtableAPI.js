async function fetchAirtableData(id_proyecto) {
    const res = await fetch(`http://localhost:3000/proyecto/${id_proyecto}/airtable_data`); //cambiar dirección
    let data = await res.json();
    data = JSON.parse(data);
    sessionStorage.setItem(`airtable-data-${id_proyecto}`, JSON.stringify(data.body));
}


async function getAirtableData(id_proyecto) {
    let data = {}
    // Try to retreive data from local storage
    data = sessionStorage.getItem(`airtable-data-${id_proyecto}`);
    if (data === null || data === 'undefined'){
        // Fetch data from server
        await fetchAirtableData(id_proyecto);
        data = sessionStorage.getItem(`airtable-data-${id_proyecto}`);
        return data;
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
    // FETCH ALL DATA IN AIRTABLE
    let airtable_data = await getAirtableData(id_proyecto);
    airtable_data = JSON.parse(airtable_data);
    // FETCH TAREAS IN DATABASE
    let tareasDB = await getTareasDB(id_proyecto);
    tareasDB = JSON.parse(tareasDB);
    
    // MERGE BOTH DATA
    // .. change airtable data from array to dict with id row as key
    let tareasAirtable = {}
    for (let i = 0; i < airtable_data.length; i++) {
        if (airtable_data[i]['IdTareaCasoUso'] != undefined){
            tareasAirtable[airtable_data[i]['IdTareaCasoUso']] = airtable_data[i];
        }
    }

    // .. loop all rows in db data
    let i = 0;
    let updateAirtable = {};
    let insertAirtable = [];
    let insertDB = [];
    console.log("DataBase\n",tareasDB);
    console.log("Airtable\n",airtable_data);
    while (i < tareasDB.length) {
        // Search for id in airtable dict
        let dbId = tareasDB[i].id_tareaCasoUso;
        // Check if it exists db ID in airtable
        if (dbId in tareasAirtable){
            // Update airtable data
            if (tareasDB[i].fechaInicio_caso != null) {
                tareasDB[i].fechaInicio_caso = tareasDB[i].fechaInicio_caso.slice(0,10);
            }
            if (tareasDB[i].fechaFinalizacion_caso != null) {
                tareasDB[i].fechaFinalizacion_caso = tareasDB[i].fechaFinalizacion_caso.slice(0,10);
            }

            updateAirtable[dbId] = {};
            updateAirtable[dbId]['Name'] = `IT${tareasDB[i].iteracion_caso} - ${tareasDB[i].nombre_caso} - ${tareasDB[i].nombre_tarea} `;
            updateAirtable[dbId]['Estimation'] =  tareasDB[i].tiempo_tarea;
            updateAirtable[dbId]['StartDate'] = tareasDB[i].fechaInicio_caso;
            updateAirtable[dbId]['Iterations'] = tareasDB[i].iteracion_caso;
            updateAirtable[dbId]['Status'] = tareasDB[i].estado_tareaCasoUso;
            updateAirtable[dbId]['RecordId'] = tareasAirtable[dbId].RecordId;

            delete tareasAirtable[dbId];
        }

        // .... if exists in db but not in airtable,
        else {
            // ...... queue an instruction to add row in airtable
            if (tareasDB[i].fechaInicio_caso != null) {
                tareasDB[i].fechaInicio_caso = tareasDB[i].fechaInicio_caso.slice(0,10);
            }
            if (tareasDB[i].fechaFinalizacion_caso != null) {
                tareasDB[i].fechaFinalizacion_caso = tareasDB[i].fechaFinalizacion_caso.slice(0,10);
            }
            
            let temp = {};
            temp['fields'] = {
                'Name':`IT${tareasDB[i].iteracion_caso} - ${tareasDB[i].nombre_caso} - ${tareasDB[i].nombre_tarea} `, 
                'Estimation':tareasDB[i].tiempo_tarea, 
                'FinishedDate':tareasDB[i].fechaFinalizacion_caso,
                'StartDate':tareasDB[i].fechaInicio_caso,
                'Iterations':tareasDB[i].iteracion_caso,
                'Status':tareasDB[i].estado_tareaCasoUso,
                'IdTareaCasoUso':tareasDB[i].id_tareaCasoUso
            };
            insertAirtable.push(temp);
        }
        i++;
    }    
    // .. if airtable dict is not empty
    /*if(tareasAirtable.length != 0){      
        let keys = Object.keys(airtable_data);
        //let values = [id_proyecto, complejidad_caso, nombre_caso, fechaInicio_caso, fechaFinalizacion_caso, iteracion_caso];
        // .... loop remainding rows in airtable dict
        for (let j = 0; j < keys.length; j++) {
            // ...... queue an instruction to add row in db
            let temp = {};
            temp['estado_tareaCasoUso']
            temp['nombre_tarea']
            temp['nombre_caso']
        }
    }*/

    //Ejecutar cambios
    let airtableKeys = localStorage.getItem(`airtableKeys_${id_proyecto}`); 
    airtableKeys = JSON.parse(airtableKeys);
    if (airtableKeys != null && airtableKeys != undefined){
        postUpdate(id_proyecto, airtableKeys['UserKey'], airtableKeys['BaseKey'],updateAirtable, "update");
        postUpdate(id_proyecto, airtableKeys['UserKey'], airtableKeys['BaseKey'],insertAirtable, "create");
    } else {
        console.warn('No Airtable keys identified for this project');
    }
    // Display in user interface
}


function postUpdate(id_proyecto, userKey_proyecto, baseKey_proyecto, fields, mode) {
    let keys = Object.keys(fields);
    let list = [];
    for (let i = 0; i < keys.length; i++) {
        list.push(fields[keys[i]]);
    }
    const values = {
        'fields':list,
        'userKey':userKey_proyecto,
        'baseKey':baseKey_proyecto,
        'mode':mode
    };
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch(`http://localhost:3000/proyecto/${id_proyecto}/sync/update_airtable`, {
        method: 'POST',
        body: JSON.stringify(values),
        credentials: "same-origin",
        headers:{
            "Accept": "application/json,",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken
        }
    })
    .then(function(response) {
        if(response.ok) {
            return response
        } else {
            throw "Error en la llamada Ajax";
        }

    })
    .catch( error => console.log(error));
}

