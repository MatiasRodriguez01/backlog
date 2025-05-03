import axios from "axios";
import { ISpring } from "../../types/IInterfaces";

const API_SPRING = 'http://localhost:3000/springs';


// tener todos los proyectos
export const getSpringsController = async () => {
    try {
        const response = await axios.get<ISpring[]>(API_SPRING);
        return response.data;
    } catch (err) {
        console.error("algo salio mal en getSpringsController: ", err)
    }
}

// mostrar una spring por id
export const getSpringByIdController = async (idSpring: string) => {
    try {
        const response = await axios.get<ISpring>(`${API_SPRING}/${idSpring}`);
        return response.data;
    } catch (err) {
        console.error("algo salio mal en getSpringByIdController: ", err)
    }
}

// crear un proyecto nuevo: post
export const createSpringController = async (newProyecto: ISpring) => {
    try {
        const response = await axios.post<ISpring>(API_SPRING, newProyecto);
        return response.data
    } catch (err) {
        console.error("Algo salio mal en createSpringController: ", err)
    }
}

// editar un proyecto: put (Id)
export const editSpringController = async (proyectEdit: ISpring) => {
    try {
        const response = await axios.put<ISpring>(`${API_SPRING}/${proyectEdit._id}`, {
            ...proyectEdit
        });
        return response.data;
    } catch (err) {
        console.log("algo salio mal en editSpringController: ", err)
    }
}

// eliminar un proyecto: delete

export const deleteSpringController = async (idProyect: string) => {
    try {
        const response = await axios.delete<ISpring>(`${API_SPRING}/${idProyect}`);
        return response.data;
    } catch (err) {
        console.error("Algo salio mal en deleteSpringController: ", err)
    }
}