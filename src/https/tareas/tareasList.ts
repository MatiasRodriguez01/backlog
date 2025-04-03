import axios from "axios";

import { API_TAREAS, API_PROYECTS } from "../../utils/constantes";
import { IProyecto, ITarea } from "../../types/IInterfaces";
import { getProyectosController } from "../proyectos/proyectoController";

/// mostrar tareas por proyecto

export const getAllTareaPorProyecto = async (id: string) => {
    try {
        const result = await getProyectosController();
        const posicion = result?.findIndex((proyecto) => proyecto.id === id);
        const response = await axios.get<{ proyectos: IProyecto[]}>(API_PROYECTS);

        return response.data.proyectos[posicion!].tareas
        
    } catch (err) {
        console.error("algo salio mal en getAllTareaPorProyecto: ", err)
    }
}

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
        const response = await axios.put(API_TAREAS, tareas)
        return response.data;
    } catch (err) {
        console.error("algo salio mal en putProyectoTareas: ", err)
    }

}