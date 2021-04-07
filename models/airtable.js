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

module.exports.AirtableConection = class Airtable {
    constructor(id_proyecto){
        this.id_proyecto = id_proyecto;
        this.base = null;
        this.data = [];
        
        models.fetchKeyProyectos(id_proyecto).then (
            data2 => {
            const userKey = data2[0][0]['userKey_proyecto'];
            const baseKey = data2[0][0]['baseKey_proyecto'];
            
            console.log(userKey);
            console.log(baseKey);

            this.base = new Airtable({apiKey: userKey}).base(baseKey); //marca error
            
            //prueba
            this.fetchAll();
            console.log(this.data);
            }
        )
    }

    fetchAll() {
        base('Tasks').select({
            view: "Global view"
        }).eachPage(function page(records, fetchNextPage) {
        
            records.forEach(function(record) {
                const query = {}; 

                query.name = ('Retrieved', record.get('Name'));
                query.estimation = ('Retrieved', record.get('Estimation'));
                query.notes = ('Retrieved', record.get('Notes'));
                query.assigned = ('Retrieved', record.get('Assigned'));
                query.status = ('Retrieved', record.get('Status'));
                query.duration = ('Retrieved', record.get('Duration'));
                query.finishedDate = ('Retrieved', record.get('Finished Date'));
                query.iterations = ('Retrieved', record.get('Iterations'));

                data.push(querry);
            });

            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err); return; }
        });    
    }
}