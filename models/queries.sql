-- Obtener info proyectos dado usuario
select  nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto from Proyecto P, Usuario_Proyecto UP
where UP.email_usuario = '' and UP.id_proyecto = P.proyecto;


-- Obtener estado y duracion de la tarea en dado proyecto
select T.estado_tarea, T.tiempo_tarea from Proyecto P, PuntosAgiles PA, Tarea_Complejidad TC, Tarea T
where P.id_proyecto = PA.id_proyecto and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_tarea = T.id_tarea and 
P.id_proyecto = 3;

-- Obtener estado y duracion de la tarea en dado proyecto && status 
select count(T.id_tarea), T.estado_tarea, T.tiempo_tarea from Proyecto P, PuntosAgiles PA, Tarea_Complejidad TC, Tarea T
where P.id_proyecto = PA.id_proyecto and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_tarea = T.id_tarea and 
P.id_proyecto = 3 and T.estado_tarea = 'DONE';


-- Obtener estado y duracion de la tarea en dado proyecto && status
select T.estado_tarea, T.tiempo_tarea, U.nombre_usuario from Proyecto P, PuntosAgiles PA, Tarea_Complejidad TC, Tarea T, Usuario U
where P.id_proyecto = PA.id_proyecto and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_tarea = T.id_tarea and 
P.id_proyecto = 3 and T.estado_tarea = 'DONE';


-- Todas las tareas de todos los proyectos de un usuario
select T.nombre_tarea, P.nombre_proyecto from Tarea T, Proyecto P, PuntosAgiles PA 
where P.id_proyecto = PA.id_proyecto and PA.email_usuario = '';

-- Todos los proyectos completados: nombre, Integrantes, nu. tareas, hrs. dedicadas, hrs. estimadas
select P.id_proyecto, yecto, P.nombre_proyecto, U.nombre_usuario
from Proyecto P, Usuario U
where P.status_proyecto = true
order by P.nombre_proyecto

select P.nombre_proyecto, count(T.id_tarea) as 'num_tareas'
from Proyecto P, Tarea T
where P.id_proyecto = T.id_proyecto


-- Toda la info del proyecto dado un id
select P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, P.fechaInicio_proyecto, 
sum(T.tiempo_tarea) from Proyecto P, Tarea T;

-- Toda la info de proyecto por caso de uso dado
select P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, P.fechaInicio_proyecto
from Proyecto P, CasoUso CU, Tarea T, Tarea_CasoUso TCU
where CU.id_casoUso = '' and CU.id_proyecto = P.id_proyecto and T.estado_tarea = 'DONE'
and T.id_tarea = TCU.id_tarea and TCU.id_proyecto = P.id_proyecto;

-- Todas las tareas de un proyecto
select distinct count(id_tarea) as 'todas_tareas' from Tarea
where id_proyecto = '';

-- 



-- 

-- 


/*
- por caso uso:
	- nombre
	- nu. de tareas completadas
	- nu total de tareas

- grafica principal
	- tiempo estimado
	- tiempo real
	- 
- grafica 2
	- tareas terminadas en tiempo
	- tareas terminadas tarde
	- tareas terminadas antes
- por integrante
	- tareas asignadas
	- tareas en progreso
	- tareas completadas
- grafica 4
	- casos de uso
		- nombre
		- nu. total de horas
		- horas realizadas


## PROYECTO (casoUso)
- todos los casos de uso del proyecto
- por caso de uso:
	- nombre
	- integrantes
	- fecha de inicio
	- fecha estimada
	- nu. de tareas completadas
	- nu. total de tareas
	- nu. de horas estimadas del total de tareas
	- nu. de horas reales del total de tareas


## PROYECTO (ptosAgiles)
- fase (categoria)
- nombre del proyecto
- tareas del proyecto
	- nombre
- del usuario, por tarea, por nivel
	- ptos agiles min
	- ptos agiles max
- promedio de la ptos agiles de todos los integrantes


## PTOS. AGILES (proyecto)
- categorias
- tareas
- del usuario, por tarea, por nivel
	- ptos agiles min
	- ptos agiles max


## PERFIL
- proyectos asignados del usuario
- proyectos terminados del usuario
- proyectos en progreso del usuario
- nombre del usuario
- email del usuario

 */