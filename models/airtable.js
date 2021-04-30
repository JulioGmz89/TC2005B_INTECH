/**
 * @brief Consultas para el manejo de airtable
 */


/**
 * @db conexión con la base de datos
 */
const Airtable = require('airtable');
const models = require('./proyectos');
const db = require("../utils/database");



 module.exports.RegistrarKeys = class AirtableModel{    
     constructor(id_proyecto, user_key, base_key){
        this.id_proyecto = id_proyecto;
        this.user_key = user_key;
        this.base_key = base_key;
    }
    
    /**
     * 
     * @returns se guardan @base_key y @user_key en la base de datos
     */
    save(){
        const query = `update proyecto set userKey_proyecto = '${this.user_key}', baseKey_proyecto = '${this.base_key}' where id_proyecto = '${this.id_proyecto}'`;
        return db.query(query);
    }

    /**
     * 
     * @param {*} id_proyecto 
     * @returns @id_proyecto , @userKey_proyecto , @baseKey_proyecto
     */
    static fetchKeys(id_proyecto){
        const query = `select id_proyecto, userKey_proyecto, baseKey_proyecto from proyecto where id_proyecto = '${id_proyecto}'`
        return db.query(query);
    }
}


module.exports.AirtableConection = class AirtableConection {
    constructor(id_proyecto, userKey_proyecto, baseKey_proyecto){
        this.id_proyecto = id_proyecto;
        this.data = [];
        console.log(userKey_proyecto, baseKey_proyecto)
        if (userKey_proyecto == null || baseKey_proyecto == null){
            return;
        }
        this.base = new Airtable({apiKey: userKey_proyecto}).base(baseKey_proyecto);
    }

    async fetchAll() { 
        let todos = await this.base('Tasks').select({
            //maxRecords: 3,
            view: "Global view"
        }).all();
        for(let i = 0; i < todos.length; i++){
            todos[i] = todos[i].fields;
        }
        this.data = todos;
    }

    async createAirtable(fields) {
        this.base('Tasks').create(fields, function(err, records) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('\nInserted in AIRTABLE ', records.length, ' records.\n');
          });   
    }

    async updateAirtable(fields) {
        let tempList = [];
        for (let i = 0; i < fields.length; i++) {
            let recordId = fields[i].RecordId;
            delete fields[i].RecordId;
            let tempDic = {
                "fields":fields[i], 
                "id":recordId
            };
            tempList.push(tempDic);
        }
        this.base('Tasks').update(tempList, function(err, records) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('\nUpdated in AIRTABLE ', records.length, ' records.\n');
          });
    }

    async deleteAirtable(fields) {
        this.base('Tasks').destroy(fields, function(err, deletedRecords) {
			if (err) {
				console.error(err);
				return;
			}
			console.log('\nDeleted in AIRTABLE ', deletedRecords.length, ' records.\n');
		});
    }
}


module.exports.fetchTareas = function fetchTareas(id_proyecto) {
    return db.query(
        `select TCU.id_tareaCasoUso, T.id_tarea, CU.id_casoUso, T.nombre_tarea, CU.nombre_caso, T.tiempo_tarea, TCU.estado_tareaCasoUso, CU.fechaInicio_caso, CU.fechaFinalizacion_caso, CU.iteracion_caso, CU.complejidad_caso
        from tarea T, casouso CU, proyecto P, tarea_casouso TCU
        where P.id_proyecto = ${id_proyecto} and P.id_proyecto = CU.id_proyecto and CU.id_casoUso = TCU.id_casoUso and TCU.id_tarea = T.id_tarea;`
        );
}
