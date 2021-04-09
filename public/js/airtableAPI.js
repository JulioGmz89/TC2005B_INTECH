

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
    console.log(airtable_data[0]);
    // Fetch all tareas_casouso_proyecto in current db
    let tareasDB = await getTareasDB(id_proyecto);
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