import axios from "axios";
import { IProyecto, IProyectosList } from "../../types/IInterfaces";
import { API_PROYECTS } from "../../utils/constantes";

export const putProyectoList = async (proyectos: IProyecto[]) => {
    try {
        const response = await axios.put<IProyectosList>(API_PROYECTS, {
            proyectos 
        });
        return response.data;
    } catch (err) {
        console.error("Algo salio mal en putProyectoList: ", err)
    }
}
