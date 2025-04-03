import { tareaStore } from '../store/tareaStore'
import { useShallow } from 'zustand/shallow'
import { getAllTareaPorProyecto } from '../https/tareas/tareasList'
import { IProyecto, ITarea } from '../types/IInterfaces'
import { createTareaController, deleteTareaController, updateTareaController } from '../https/tareas/tareaController'
import Swal from 'sweetalert2'

const useTareas = () => {

    const {
        tareas,
        tareasPorProyecto,
        setTareas,
        setTareasPorProyecto,
        setAgregarTarea,
        setEditarTarea,
        setEliminarTarea

    } = tareaStore(
        useShallow((state) => ({
            tareas: state.tareas,
            tareasPorProyecto: state.tareasPorProyecto,
            setTareas: state.setTareas,
            setTareasPorProyecto: state.setTareasPorProyecto,
            setAgregarTarea: state.setAgregarTarea,
            setEditarTarea: state.setEditarTarea,
            setEliminarTarea: state.setEliminarTarea
        })))

    const getTareas = async (proyecto: IProyecto) => {
        try {
            const data = await getAllTareaPorProyecto(proyecto.id!);
            
            if (data) setTareas(data)
        } catch (err) {
            console.error("error al mostrar las tareas: ", err)
        }
    }

    const getTareasPorProyecto = async (proyecto: IProyecto) => {
        try {
            if (proyecto) {
                setTareasPorProyecto(proyecto)
            }
        } catch (err) {
            console.error("error al mostrar las tareas: ", err)
        }
    }

    const postCrearTarea = async (nuevaTarea: ITarea) => {
        setAgregarTarea(nuevaTarea);
        try {
            await createTareaController(nuevaTarea);
            Swal.fire("Exito", "Tarea creada correctamente", "success")
        } catch (err) {
            setEliminarTarea(nuevaTarea.id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarTarea = async (tareaActualizada: ITarea) => {
        const estadoPrevio = tareasPorProyecto.find((tarea) =>
            tarea.id === tareaActualizada.id
        );
        setEditarTarea(tareaActualizada);
        try {
            await updateTareaController(tareaActualizada);
            Swal.fire("Exito", "Tarea actualizada correctamente", "success")
        } catch (err) {
            setEditarTarea(estadoPrevio!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const deleteTarea = async (idTarea: string) => {
        const estadoPrevio = tareasPorProyecto.find((tarea) => tarea.id === idTarea);

        const confirm = await Swal.fire({
            title: "¿Estas seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
        })

        if (!confirm.isConfirmed) return;
        setEliminarTarea(idTarea)
        try {
            await deleteTareaController(idTarea)
            Swal.fire("Eliminado", "La tarea se elimino correctamente", "success")
        } catch (error) {
            if (estadoPrevio) setAgregarTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar tarea: ", error);

        }
    }

    return {
        tareas,
        tareasPorProyecto,
        getTareas,
        getTareasPorProyecto,
        postCrearTarea,
        putEditarTarea,
        deleteTarea
    }
}

export default useTareas
