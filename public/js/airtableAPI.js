async function fetchAirtableData(id_proyecto) {
    console.log('log 1');
    const res = await fetch(`http://localhost:3000/proyecto/${id_proyecto}/airtable_data`); //cambiar dirección
    const data = await res.json();
    sessionStorage.setItem(`airtable-data-${id_proyecto}`, data);
    console.log('log 2');
    
}


async function getAirtableData(id_proyecto) {
    let data = {}
    // Try to retreive data from local storage
    data = sessionStorage.getItem(`airtable-data-${id_proyecto}`);
    data = JSON.parse(data);
    if (data === null){
        // Fetch data from server
        await fetchAirtableData(id_proyecto);
        console.log('log 3');
        data = sessionStorage.getItem(`airtable-data-${id_proyecto}`);
        data = JSON.parse(data);
    }
    return data;
}


function sincronizeAirtable(id_proyecto) {
    // Fetch all data in airtable
    // Fetch all tareas_casouso_proyecto in current db
    // Merge both data
    // .. change airtable data from array to dict with id row as key
    // .. loop all rows in db data
    // .... search for id in airtable dict
    // .... if it exists
    // ...... check if both data still the same
    // .... if exists in db but not in airtable, 
    // ...... queue an instruction to add row in airtable
    // ...... remove register from airtable dict
    // .. if airtable dict is not empty
    // .... loop remainding rows in airtable dict
    // ...... queue an instruction to add row in db
    // Display in user interface
}