import axios from "axios";

import { API_PROYECTS } from "../../utils/constantes";
import { IProyecto, ITarea } from "../../types/IInterfaces";

/// mostrar tareas por proyecto

export const getAllTareaPorProyecto = async (id: number) => {
    try {
        // const posicion = result?.findIndex((proyecto) => proyecto.id === id);
        const response = await axios.get<IProyecto>(`${API_PROYECTS}/${id}`);

        return response.data.tareas

    } catch (err) {
        console.error("algo salio mal en getAllTareaPorProyecto: ", err)
    }
}


export const updateAllTareasPorProyecto = async (idProyecto: number, nuevasTareas: ITarea[]) => {
    try {
        // Obtener proyectos
        // const proyectos = await getProyectosController();
        // const proyecto = proyectos?.find((p) => p.id === idProyecto);

        // if (proyecto) {
        //     const proyectoActualizado: IProyecto = {
        //         ...proyecto,
        //         tareas: nuevasTareas,
        //     };
        //     const response = await editProyectoController(proyectoActualizado);
        //     return response;
        // }
        const response = await axios.put<IProyecto>(`${API_PROYECTS}/${idProyecto}`, {
            tareas: nuevasTareas
        })

        return response.data

    } catch (err) {
        console.error("Error en updateAllTareasPorProyecto: ", err);
        return null;
    }
};