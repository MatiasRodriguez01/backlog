import { ITarea } from "../../types/IInterfaces";
import { getAllTareaPorProyecto, updateAllTareasPorProyecto } from "./tareasList";

export const createTareaController = async (idProyecto: string, nuevaTarea: ITarea) => {
    try {
        const tareas = await getAllTareaPorProyecto(idProyecto);
        if (tareas) {
            await updateAllTareasPorProyecto(idProyecto, [...tareas, nuevaTarea]);
            return nuevaTarea;
        }
    } catch (err) {
        console.error("Algo salio mal en el createTareaController: ", err);
    }
};

export const updateTareaController = async (idProyecto: string, tareaActualizada: ITarea) => {
    try {
        const tareas = await getAllTareaPorProyecto(idProyecto);
        if (tareas) {
            const result = tareas.map((tarea) =>
                tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
            );
            await updateAllTareasPorProyecto(idProyecto, result);
        }
        return tareaActualizada;
    } catch (err) {
        console.error("Algo salio mal en el updateTareaController: ", err);
    }
};

export const deleteTareaController = async (idProyecto: string, idTarea: string) => {
    try {
        const tareas = await getAllTareaPorProyecto(idProyecto);
        if (tareas) {
            const result = tareas.filter((tarea) => tarea.id !== idTarea);
            console.log("proyecto: ", idProyecto, " eliminado!!")
            await updateAllTareasPorProyecto(idProyecto, result);
        }
    } catch (err) {
        console.error("Algo salio mal en el deleteTareaController: ", err);
    }
};
