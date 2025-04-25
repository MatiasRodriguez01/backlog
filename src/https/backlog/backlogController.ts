import axios from "axios";
import { ITareaBacklog } from "../../types/IInterfaces";
import { API_BACKLOG } from "../../utils/constantes";
import { putBacklogListController } from "./backlogList";

export const getAllTareasBacklogController = async () => {
    try {
        const response = await axios.get<{ tareas: ITareaBacklog[] }>(API_BACKLOG);
        const result: ITareaBacklog[] = (response.data.tareas)
        return result
    } catch (err) {
        console.error("algo salio mal en getAllTareasBacklogController: ", err)
    }
}

export const createTareaBacklogController = async (nuevaTarea: ITareaBacklog) => {
    try {
        const tareasBacklog = await getAllTareasBacklogController();
        if (tareasBacklog) {
            console.log("IF createTareaBacklogController: ", tareasBacklog)
            await putBacklogListController([...tareasBacklog, nuevaTarea])
        } else {
            console.log("ELSE - createTareaBacklogController: no exite vamos a crear tareas!!")
            await putBacklogListController([nuevaTarea])
        }
        return nuevaTarea;
    } catch (err) {
        console.error("Algo salio mal en el createTareaBacklogController: ", err)
    }
}

export const updateTareaBacklogController = async (tareaActualizada: ITareaBacklog) => {
    try {
        const tareasBacklog = await getAllTareasBacklogController();
        if (tareasBacklog) {
            const result = tareasBacklog.map((tarea) =>
                tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
            );
            console.log("updateTareaBacklogController: ", tareaActualizada)
            await putBacklogListController(result)
            return tareaActualizada;
        }
    } catch (err) {
        console.error("Algo salio mal en el updateTareaBacklogController: ", err)
    }
}

export const deleteTareaBacklogController = async (idTarea: number) => {
    try {
        const tareasBacklog = await getAllTareasBacklogController();
        if (tareasBacklog) {
            const result = tareasBacklog.filter((tarea) => tarea.id !== idTarea);
            console.log("deleteTareaBacklogController ID: ", idTarea)
            await putBacklogListController(result)

        }
    } catch (err) {
        console.error("Algo salio mal en el deleteTareaBacklogController: ", err)
    }
}