/**
 * @brief Consultas a la base de datos
 */

const db = require('./database');



// Projects
const projectsInfoAll = () => `select id_proyecto, nombre_proyecto, descripcion_proyecto from  Proyecto;`;

const projectsInfoUser = (email_usuario) => `select P.id_proyecto, P.nombre_proyecto from Proyecto P, Usuario_Proyecto UP
where P.id_proyecto = UP.id_proyecto and up.email_usuario = '${email_usuario}';`;

const projectInfoId = (id_proyecto) => `select id_proyecto, nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto from  Proyecto
where id_proyecto = '${id_proyecto}';`;

const projectUser = (id_proyecto) => `select U.email_usuario
from Usuario_Proyecto UP, Usuario U
where UP.id_proyecto = '${id_proyecto}' and U.email_usuario = UP.email_usuario;`;

const query = (id_proyecto) => `select U.email_usuario
from Usuario_Proyecto UP, Usuario U
where UP.id_proyecto = '${id_proyecto}' and U.email_usuario = UP.email_usuario;`;
