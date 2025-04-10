import axios from "axios";
import { IProyecto, IProyectosList } from "../../types/IInterfaces";
import { API_PROYECTS } from "../../utils/constantes";
import { putProyectoList } from "./proyectoList";


// tener todos los proyectos
export const getProyectosController = async () => {
    try {
        const response = await axios.get<IProyectosList>(API_PROYECTS);
        return response.data;
    } catch (err) {
        console.error("algo salio mal en getProyectosController: ", err)
    }
}

// crear un proyecto nuevo: post
export const createProyectoController = async (newProyecto: IProyecto) => {
    try {
        const proyectosBd = await getProyectosController();
        if (proyectosBd) {
            console.log("IF - : ", proyectosBd)
            await putProyectoList([...proyectosBd.proyectos, newProyecto])

        } else {
            console.log("ELSE - createProyectoController: no exiten vamos a crear proyectos!!")
            await putProyectoList([newProyecto])
        }

        return newProyecto;
    } catch (err) {
        console.error("Algo salio mal en createProyectoController: ", err)
    }
}

// editar un proyecto: put
export const editProyectoController = async (proyectEdit: IProyecto) => {
    try {
        const proyectosBd = await getProyectosController();
        if (proyectosBd){
            const result = proyectosBd.proyectos.map((proyectBd) => 
                proyectBd.id === proyectEdit.id ? { ... proyectBd, ...proyectEdit } : proyectBd
            );
            console.log("editProyectoController: ", result)
            await putProyectoList(result)
        }
        return proyectEdit;
    } catch (err) {
        console.log("algo salio mal en editProyectoController: ", err)
    }
}

// eliminar un proyecto: delete

export const deleteProyectoController = async (idProyect: number) => {
    try {
        const proyectosBd = await getProyectosController();

        if (proyectosBd) {
            const result = proyectosBd.proyectos.filter(
                (proyectBd) => proyectBd.id !== idProyect
            );
            console.log("deleteProyectoController: ", result)
            await putProyectoList(result)
        }

    } catch (err) {
        console.error("Algo salio mal en deleteProyectoDelete: ", err)
    }
}