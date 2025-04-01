import axios from "axios";

import { API_TAREAS } from "../../utils/constantes";
import { ITarea } from "../../types/IInterfaces";

// tener tareas por objetos
export const getAllTareasController = async () => {
    try {
        const response = await axios.get<ITarea[]>(API_TAREAS)
        return response.data;
    } catch (err) {
        console.error("algo salio mal en getProyectoTareas: ", err)
    }
}

// actualizar los proyectos
export const putProyectoTareasController = async (tareas: ITarea[]) => {
    try {
        const response = await axios.put<ITarea[]>(API_TAREAS, {
            tareas
        })
        return response.data;
    } catch (err) {
        console.error("algo salio mal en putProyectoTareas: ", err)
    }

}