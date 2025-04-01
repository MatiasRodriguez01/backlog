
import { ITarea } from "../../types/IInterfaces";
import { getAllTareasController, putProyectoTareasController } from "./tareasList";


export const createTareaController = async (nuevaTarea: ITarea) => {
    try {
        const tareas = await getAllTareasController();
        if (tareas) {
            console.log("IF createTareaController: ", tareas)
            await putProyectoTareasController([...tareas, nuevaTarea])
        } else {
            console.log("ELSE - createTareaController: no exite vamos a crear tareas!!")
            await putProyectoTareasController([nuevaTarea])
        } 
        return nuevaTarea;
    } catch (err) {
        console.error("Algo salio mal en el createTareaController: ", err)
    }
}

export const updateTareaController = async (tareaActualizada: ITarea) => {
    try {
        const tareas = await getAllTareasController();
        if (tareas) {
            const result = tareas.map((tarea) => 
                tarea.id === tareaActualizada.id ? {...tarea, ...tareaActualizada} : tarea
            );
            console.log("updateTareaController: ", tareaActualizada)
            await putProyectoTareasController(result)
            return tareaActualizada;
        }
    } catch (err) {
        console.error("Algo salio mal en el updateTareaController: ", err)
    }
}

export const deleteTareaController = async (idTarea: string) => {
    try {
        const tareas = await getAllTareasController();
        if (tareas) {
            const result = tareas.filter((tarea) => tarea.id !== idTarea );
            console.log("deleteTareaController ID: ", idTarea)
            await putProyectoTareasController(result)

        }
    } catch (err) {
        console.error("Algo salio mal en el updateTareaController: ", err)
    }
}