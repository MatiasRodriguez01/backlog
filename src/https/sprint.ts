import axios from "axios"
import { ISprint } from "../types/ISprint"
import { API_URL } from "../utils/constantes" // Imporrtamos la url del json-server

export const getAllSprints = async ()=>{
    try {
        const response = await axios.get<ISprint[]>(API_URL)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const postNuevoSprint = async (nuevoSprint: ISprint)=>{
    try {
        const response = await axios.post<ISprint>(API_URL, {
            nuevoSprint,
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const editarSprint = async (sprintActualizado: ISprint)=>{
    try {
        const response = await axios.put<ISprint>(`${API_URL}/${sprintActualizado.nombre}`, {
            sprintActualizado,
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}


export const eliminarSprintPorNombre = async (tituloSprint:string)=>{
    try {
        const response = await axios.delete<ISprint>(`${API_URL}/${tituloSprint}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}