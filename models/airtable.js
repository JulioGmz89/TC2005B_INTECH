const Airtable = require('airtable');
const models = require('./proyectos');
const db = require("../utils/database");

module.exports.RegistrarKeys = class AirtableModel{
    constructor(id_proyecto, user_key, base_key){
        this.id_proyecto = id_proyecto;
        this.user_key = user_key;
        this.base_key = base_key;
    }

    save(){
        const query = `update proyecto set userKey_proyecto = '${this.user_key}', baseKey_proyecto = '${this.base_key}' where id_proyecto = '${this.id_proyecto}'`;
        return db.query(query);
    }

    static fetchKeys(id_proyecto){
        const query = `select id_proyecto, userKey_proyecto, baseKey_proyecto from proyecto where id_proyecto = '${id_proyecto}'`
        return db.query(query);
    }
}

module.exports.AirtableConection = class AirtableConection {
    constructor(id_proyecto, userKey_proyecto, baseKey_proyecto){
        this.id_proyecto = id_proyecto;
        this.data = [];
        this.base = new Airtable({apiKey: userKey_proyecto}).base(baseKey_proyecto);
    }

    fetchAll() { //Es una funcion asincrona. Necesita un .catch() en algun lado
        let query = {};
        this.base('Tasks').select({
            maxRecords: 3,
            view: "Global view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                query['name'] = record.get('Name');
                query['estimation'] = record.get('Estimation');
                query['notes'] = record.get('Notes');
                query['assigned'] = record.get('Assigned');
                query['status'] = record.get('Status');
                query['duration'] = record.get('Duration');
                query['finishedDate'] = record.get('Finished Date');
                query['iterations'] = record.get('Iterations');

                this.data.push(query); //no me deja utilizar variables fuera de la funcion aunque sean de la misma clase
            });
            fetchNextPage();
            
        }, function done(err) {
            if (err) { console.error(err); return; }
        });
        console.log(data);
    }
}