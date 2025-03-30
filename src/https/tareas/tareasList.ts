import axios from "axios";
import { ITarea } from "../../types/ITarea";
import { API_PROYECTS } from "../../utils/constantes";
import { IProyecto } from "../../types/IInterfaces";

// tener tareas por objetos
export const getProyectoTareas = async ( proyecto: IProyecto ) => {
    try {
        const response = await axios.get<{ tareas: ITarea[]}>(`${API_PROYECTS}/${proyecto.id}`);
        const t: ITarea[] = (response.data.tareas);
        console.log(`tareas de ${proyecto.nombre}: ${t}`)
        return t;
    } catch (err) {
        console.error("algo salio mal en getProyectoTareas: ", err)
    }
}

// actualizar los proyectos
export const putProyectoTareas = async (proyecto: IProyecto, tareas: ITarea[]) => {
    try {
        const response = axios.put<IProyecto>(`${API_PROYECTS}/${proyecto.id}`, {
            tareas
        })
        return (await response).data
    } catch (err) {
        console.error("algo salio mal en putProyectoTareas: ", err)
    }

}