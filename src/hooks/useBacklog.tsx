import { useShallow } from 'zustand/shallow'
import { ITarea } from '../types/IInterfaces'
import { createTareaBacklogController, deleteTareaBacklogController, getAllTareasBacklogController, updateTareaBacklogController } from '../https/backlog/backlogController'
import Swal from 'sweetalert2'
import backlogStore from '../store/backlogStore'

const useBacklog = () => {
    
    const {
        tareas,
        tareaActiva,
        setTareas,
        setTareaActiva,
        setAgregarTarea,
        setEditarTarea,
        setEliminarTarea
    } = backlogStore(
        useShallow((state) => ({
            tareas: state.tareas,
            tareaActiva: state.tareaActiva,
            setTareas: state.setTareas,
            setTareaActiva: state.setTareaActiva,
            setAgregarTarea: state.setAgregarTarea,
            setEditarTarea: state.setEditarTarea,
            setEliminarTarea: state.setEliminarTarea
        }))
    )


    const getTareasBacklog = async () => {
        try {
            const data = await getAllTareasBacklogController();
            if (data) setTareas(data)
        } catch (err) {
            console.error("error al mostrar las tareas del backlog: ", err)
        }
    }

    const postCrearTareaBacklog = async (nuevaTarea: ITarea) => {
        setAgregarTarea(nuevaTarea);
        try {
            await createTareaBacklogController(nuevaTarea);
            Swal.fire("Exito", "Tarea creada correctamente", "success")
        } catch (err) {
            setEliminarTarea(nuevaTarea.id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarTareaBacklog = async (tareaActualizada: ITarea) => {
        const estadoPrevio = tareas.find((tarea) =>
            tarea.id === tareaActualizada.id
        );
        setEditarTarea(tareaActualizada);
        try {
            await updateTareaBacklogController(tareaActualizada);
            Swal.fire("Exito", "Tarea actualizada correctamente", "success")
        } catch (err) {
            setEditarTarea(estadoPrevio!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const deleteTareaBacklog = async (idTarea: string) => {
        const estadoPrevio = tareas.find((tarea) => tarea.id === idTarea);

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
            await deleteTareaBacklogController(idTarea)
            Swal.fire("Eliminado", "La tarea se elimino correctamente", "success")
        } catch (error) {
            if (estadoPrevio) setAgregarTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar tarea: ", error);

        }
    }

    return {
        tareas,
        tareaActiva,
        getTareasBacklog,
        setTareaActiva,
        postCrearTareaBacklog,
        putEditarTareaBacklog,
        deleteTareaBacklog
    }
}

export default useBacklog
