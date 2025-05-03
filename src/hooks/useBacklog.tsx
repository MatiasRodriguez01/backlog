import { useShallow } from 'zustand/shallow'
import { ITarea } from '../types/IInterfaces'
import { createTareaBacklogController, deleteTareaBacklogController, getAllTareasBacklogController, updateTareaBacklogController } from '../https/backlog/backlogController'
import Swal from 'sweetalert2'
import backlogStore from '../store/backlogStore'
import { postCreateTaskBySpringController } from '../https/proyectos/springTasks'
import { tareaStore } from '../store/tareaStore'

const useBacklog = () => {

    const {
        setAgregarTareaSpring,
        setEliminarTareaSpring
    } = tareaStore(
        useShallow((state) => ({
            setAgregarTareaSpring: state.setAgregarTarea,
            setEliminarTareaSpring: state.setEliminarTarea
        })))

    const {
        tareasBacklog,
        setTareasBacklog,
        setAgregarTarea,
        setEditarTarea,
        setEliminarTarea
    } = backlogStore(
        useShallow((state) => ({
            tareasBacklog: state.tareasBacklog,
            setTareasBacklog: state.setTareasBacklog,
            setAgregarTarea: state.setAgregarTarea,
            setEditarTarea: state.setEditarTarea,
            setEliminarTarea: state.setEliminarTarea
        }))
    )


    const getTareasBacklog = async () => {
        try {
            const data = await getAllTareasBacklogController();
            if (data) {
                setTareasBacklog(data)
            }
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
            if (nuevaTarea) setEliminarTarea(nuevaTarea._id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarTareaBacklog = async (tareaActualizada: ITarea) => {
        const estadoPrevio = tareasBacklog.find((tarea) =>
            tarea._id === tareaActualizada._id
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
        const estadoPrevio = tareasBacklog.find((tarea) => tarea._id === idTarea);

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


    const sacarTaskBacklogASpring = async (idSpring: string, task: ITarea) => {
        const estadoPrevio = tareasBacklog.find((tarea) => tarea._id === task._id);
        setAgregarTareaSpring(task)
        setEliminarTarea(task._id!)
        try {
            await postCreateTaskBySpringController(idSpring, task)
            await deleteTareaBacklogController(task._id!)
            Swal.fire("Enviado", "La tarea se envio a un proyecto", "success")
        } catch (error) {
            setAgregarTarea(estadoPrevio!)
            setEliminarTareaSpring(task._id!)
            console.log("Algo salio mal al eliminar tarea: ", error);

        }
    }

    return {
        tareasBacklog,
        getTareasBacklog,
        postCrearTareaBacklog,
        putEditarTareaBacklog,
        deleteTareaBacklog,
        sacarTaskBacklogASpring
    }
}

export default useBacklog
