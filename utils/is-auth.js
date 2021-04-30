/**
 * @brief Esta funcion revisa si el usuario esta autenticado en el sistema
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * @returns si el usuario no esta conectado lo redirige a /login
 */

module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/login');
    }
    next();
}