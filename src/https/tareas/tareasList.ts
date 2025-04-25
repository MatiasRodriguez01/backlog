import axios from "axios";

import { API_PROYECTS } from "../../utils/constantes";
import { IProyecto, ITarea } from "../../types/IInterfaces";
import { editProyectoController, getProyectosController } from "../proyectos/proyectoController";
import Swal from "sweetalert2";

/// mostrar tareas por proyecto

export const getAllTareaPorProyecto = async (id: number) => {
    try {
        const result = await getProyectosController();
        if (result){
            const posicion = result?.findIndex((proyecto) => proyecto.id === id);
            const response = await axios.get<{ proyectos: IProyecto[]}>(API_PROYECTS);
    
            return response.data.proyectos[posicion].tareas
        }
        
    } catch (err) {
        console.error("algo salio mal en getAllTareaPorProyecto: ", err)
    }
}


export const updateAllTareasPorProyecto = async (idProyecto: number, nuevasTareas: ITarea[]) => {
    try {
        // Obtener proyectos
        const proyectos = await getProyectosController();
        const proyecto = proyectos?.find((p) => p.id === idProyecto);

        if (proyecto) {
            const proyectoActualizado: IProyecto = {
                ...proyecto,
                tareas: nuevasTareas,
            };
            const response = await editProyectoController(proyectoActualizado);
            return response;
        }

    } catch (err) {
        Swal.fire("Error", "Tarea creada correctamente", "error")
        console.error("Error en updateAllTareasPorProyecto: ", err);
        return null;
    }
};