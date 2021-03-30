const db = require("./database");
module.exports = class AirtableModel{
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