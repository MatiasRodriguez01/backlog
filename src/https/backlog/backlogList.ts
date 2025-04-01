import axios from "axios";
import { IBacklog, ITarea } from "../../types/IInterfaces";
import { API_BACKLOG } from "../../utils/constantes";

export const putBacklogListController = async (tareas: ITarea[]) => {
    try {
        const response = await axios.put<IBacklog>(API_BACKLOG, {
            tareas 
        });
        return response.data;
    } catch (err) {
        console.error("Algo salio mal en putBacklogController: ", err)
    }
}