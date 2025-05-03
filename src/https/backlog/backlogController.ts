import axios from "axios";
import { ITarea } from "../../types/IInterfaces";

const API_BACKLOG = 'http://localhost:3000/backlog'


export const getAllTareasBacklogController = async () => {
    try {
        const response = await axios.get<ITarea[]>(`${API_BACKLOG}/tasks`);
        return response.data
    } catch (err) {
        console.error("algo salio mal en getAllTareasBacklogController: ", err)
    }
}

export const createTareaBacklogController = async (nuevaTarea: ITarea) => {
    try {
        const response = await axios.post<ITarea>(`${API_BACKLOG}/create-task`, nuevaTarea);
        return response.data;
    } catch (err) {
        console.error("Algo salio mal en el createTareaBacklogController: ", err)
    }
}

export const updateTareaBacklogController = async (tareaActualizada: ITarea) => {
    try {
        const response = await axios.put<ITarea>(`${API_BACKLOG}/update-task/${tareaActualizada._id}`, {
            ...tareaActualizada
        });
        return response.data;
    } catch (err) {
        console.error("Algo salio mal en el updateTareaBacklogController: ", err)
    }
}

export const deleteTareaBacklogController = async (idTarea: string) => {
    try {
        const response = await axios.delete<ITarea>(`${API_BACKLOG}/delete-task/${idTarea}`);
        return response.data;
    } catch (err) {
        console.error("Algo salio mal en el deleteTareaBacklogController: ", err)
    }
}