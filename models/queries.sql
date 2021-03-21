-- Obtener estado y duracion de la tarea en dado proyecto
select T.estado_tarea, T.tiempo_tarea from Proyecto P, PuntosAgiles PA, Tarea_Complejidad TC, Tarea T
where P.id_proyecto = PA.id_proyecto and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_tarea = T.id_tarea and 
P.id_proyecto = 3;

-- Obtener estado y duracion de la tarea en dado proyecto && status 
select T.estado_tarea, T.tiempo_tarea from Proyecto P, PuntosAgiles PA, Tarea_Complejidad TC, Tarea T
where P.id_proyecto = PA.id_proyecto and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_tarea = T.id_tarea and 
P.id_proyecto = 3 and T.estado_tarea = 'DONE';

select T.estado_tarea, T.tiempo_tarea from Proyecto P, CasoUSo CU