import { ITarea } from "../../types/IInterfaces";
import { getAllTareasController, putProyectoTareasController } from "./tareasList";

export const createTareaController = async (nuevaTarea: ITarea) => {
    try {
        const tareas = (await getAllTareasController()) || []; // Evita undefined
        await putProyectoTareasController([...tareas, nuevaTarea]);
        return nuevaTarea;
    } catch (err) {
        console.error("Algo salio mal en el createTareaController: ", err);
    }
};

export const updateTareaController = async (tareaActualizada: ITarea) => {
    try {
        const tareas = (await getAllTareasController()) || [];
        const result = tareas.map((tarea) =>
            tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
        );
        await putProyectoTareasController(result);
        return tareaActualizada;
    } catch (err) {
        console.error("Algo salio mal en el updateTareaController: ", err);
    }
};

export const deleteTareaController = async (idTarea: string) => {
    try {
        const tareas = (await getAllTareasController()) || [];
        const result = tareas.filter((tarea) => tarea.id !== idTarea);
        await putProyectoTareasController(result);
    } catch (err) {
        console.error("Algo salio mal en el deleteTareaController: ", err);
    }
};
