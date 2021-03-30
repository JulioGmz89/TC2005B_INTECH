const db = require('../models/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    save() {
        return bcrypt.hash(this.password, 12)
            .then((passwordEncriptado) => {
                return db.execute(
                    'INSERT INTO usuario (nombre_usuario, email_usuario, password_usuario) VALUES (?, ?, ?)',
                    [this.nombre, this.email, passwordEncriptado]
                );
            }).catch(err => console.log(err));
    }
    
    static fetchOne(email) {
        return db.execute('SELECT * FROM usuario WHERE email_usuario=?', [email]);
    }

    // static editName(newName, id) {
    //     return db.execute('UPDATE perros SET nombre = ? WHERE perros.id = ?', [newName, id]);
    // }
}