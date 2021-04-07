/**
 * @brief Consultas y metodos para la administracion de los usuarios
 * @param {*} nombre -> Nombre completo del usuario
 * @param {*} email -> Email del usuario
 * @param {*} password -> Password del usuario
 */

const db = require("../utils/database");
const bcrypt = require('bcryptjs');

module.exports = class User {

    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    /**
     * @brief Save se encarga de guardar los atributos de @User en nuestra base de datos
     * @return Datos guardados o un error en caso de no haber sido guardados 
     */
    save() {
        return bcrypt.hash(this.password, 12)
            .then((passwordEncriptado) => {
                return db.execute(
                    'INSERT INTO usuario (nombre_usuario, email_usuario, password_usuario) VALUES (?, ?, ?)',
                    [this.nombre, this.email, passwordEncriptado]
                );
            }).catch(err => console.log(err));
    }
    
    /**
     * @brief fetchOne genera una consulta para tener los datos de un usuario
     * @param {*} email -> parametro que usamos para comparar en la base de datos
     * @returns Todos los registros  en los que aparezca el email del usuario
     */

    static fetchOne(email) {
        return db.execute('SELECT * FROM usuario WHERE email_usuario=?', [email]);
    }

    // static editName(newName, id) {
    //     return db.execute('UPDATE perros SET nombre = ? WHERE perros.id = ?', [newName, id]);
    // }
}