/**
 * @brief Consultas para el manejo de airtable
 */

/**
 * @db conexión con la base de datos
 */
const Airtable = require('airtable');
const models = require('./proyectos');
const db = require("../utils/database");

/**
 * @brief Se genera una clase para el manejo de la conexión
 * @param {*} id_proyecto
 * @param {*} user_key
 * @param {*} base_key
 */
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
}