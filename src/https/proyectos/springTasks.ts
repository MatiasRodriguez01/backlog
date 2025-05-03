import { ITarea } from "../../types/IInterfaces";
import axios from "axios";

const API_SPRING = 'http://localhost:3000/springs';

export const getTasksBySpringController = async (idSpring: string) => {
    try {
        const response = await axios.get<ITarea[]>(`${API_SPRING}/${idSpring}/tasks`)
        return response.data

    } catch (err) {
        console.error(`Ocurrio un error en getTaskBySpringController: ${err}`)
    }
}

// router.put("/:id/add-task", getSpring, putTaskSpringController);
export const postCreateTaskBySpringController = async (idSpring: string, task: ITarea) => {
    try {
        const response = await axios.put<ITarea>(`${API_SPRING}/${idSpring}/add-task`, {
            ...task
        })
        return response.data

    } catch (err) {
        console.error(`Ocurrio un error en postCreateTaskBySpringController: ${err}`)
    }
}

// router.put("/:id/update-task/:taskId",
export const putUpdateTaskBySpringController = async (idSpring: string, task: ITarea) => {
    try {
        const response = await axios.put<ITarea>(`${API_SPRING}/${idSpring}/update-task/${task._id}`, {
            ...task
        })
        return response.data
    } catch (err) {
        console.error(`Ocurrio un error en postCreateTaskBySpringController: ${err}`)
    }
}

export const deleteTaskBySpringController = async (idSpring: string, idTask: string) => {
    try {
        const response = await axios.delete<ITarea>(`${API_SPRING}/${idSpring}/delete-task/${idTask}`)
        return response.data
    } catch (err) {
        console.error(`Ocurrio un error en postCreateTaskBySpringController: ${err}`)
    }
}