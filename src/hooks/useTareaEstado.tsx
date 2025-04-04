import { ITarea } from '../types/IInterfaces'

export const setEstadoLista = (tareas: ITarea[], estado: string) => {
    const result = tareas.filter((tareas) => tareas.estado === estado);
    return result;
}

const useTareaEstado = (tareas: ITarea[]) => {

    const tareasPendientes = setEstadoLista(tareas, "pendiente");
    const tareasEnProceso = setEstadoLista(tareas, "en_proceso");
    const tareasCompletadas = setEstadoLista(tareas, "completado");

    return {
        tareasPendientes,
        tareasEnProceso,
        tareasCompletadas
    }
}

export default useTareaEstado



