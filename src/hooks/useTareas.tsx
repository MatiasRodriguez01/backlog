import { tareaStore } from '../store/tareaStore'
import { useShallow } from 'zustand/shallow'
import { ITarea } from '../types/IInterfaces'
import Swal from 'sweetalert2'
import { deleteTaskBySpringController, getTasksBySpringController, postCreateTaskBySpringController, putUpdateTaskBySpringController } from '../https/proyectos/springTasks'
import backlogStore from '../store/backlogStore'
import { createTareaBacklogController } from '../https/backlog/backlogController'

const useTareas = () => {

    const { 
        setAgregarTareaBacklog,
        setEliminarTareaBacklog
     } = backlogStore(
        useShallow((state) => ({
            setAgregarTareaBacklog: state.setAgregarTarea,
            setEliminarTareaBacklog: state.setEliminarTarea
        }))
    )

    const {
        tareas,
        setTareas,
        setAgregarTarea,
        setEditarTarea,
        setEliminarTarea
    } = tareaStore(
        useShallow((state) => ({
            tareas: state.tareas,
            setTareas: state.setTareas,
            setAgregarTarea: state.setAgregarTarea,
            setEditarTarea: state.setEditarTarea,
            setEliminarTarea: state.setEliminarTarea
        })))

    const getTareas = async (idProyecto: string) => {
        try {
            const data = await getTasksBySpringController(idProyecto);
            console.log(data)
            if (data) setTareas(data)
        } catch (err) {
            console.error("error al mostrar las tareas: ", err)
        }
    }

    const postCrearTarea = async (idProyecto: string, nuevaTarea: ITarea) => {
        setAgregarTarea(nuevaTarea);
        try {

            const result = await postCreateTaskBySpringController(idProyecto, nuevaTarea);
            console.log(result)
            Swal.fire("Exito", "Tarea creada correctamente", "success")

        } catch (err) {
            setEliminarTarea(nuevaTarea._id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarTarea = async (idProyecto: string, tareaActualizada: ITarea) => {
        const estadoPrevio = tareas.find((tarea) =>
            tarea._id === tareaActualizada._id
        );
        setEditarTarea(tareaActualizada);
        try {
            await putUpdateTaskBySpringController(idProyecto, tareaActualizada);
            Swal.fire("Exito", "Tarea actualizada correctamente", "success")
        } catch (err) {
            setEditarTarea(estadoPrevio!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarEstado = async (idProyecto: string, tareaActualizada: ITarea) => {
        const estadoPrevio = tareas.find((tarea) =>
            tarea._id === tareaActualizada._id
        );
        setEditarTarea(tareaActualizada);
        try {
            await putUpdateTaskBySpringController(idProyecto, tareaActualizada);
        } catch (err) {
            setEditarTarea(estadoPrevio!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const deleteTarea = async (idProyecto: string, idTarea: string) => {
        const estadoPrevio = tareas.find((tarea) => tarea._id === idTarea);

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
            await deleteTaskBySpringController(idProyecto, idTarea)
            Swal.fire("Eliminado", "La tarea se elimino correctamente", "success")
        } catch (error) {
            if (estadoPrevio) setAgregarTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar tarea: ", error);

        }
    }

    const enviarAlBacklog = async (idProyecto: string, tarea: ITarea) => {
        setAgregarTareaBacklog(tarea);
        setEliminarTarea(tarea._id!)
        try {
            await createTareaBacklogController(tarea)
            await deleteTaskBySpringController(idProyecto, tarea._id!)
            Swal.fire("Enviada", "La tarea se envio al backlog", "success")
        } catch (error) {
            setAgregarTarea(tarea)
            setEliminarTareaBacklog(tarea._id!);
            Swal.fire("Error", "No se pudo enviar al Backlog", "error")
            console.error("Algo salio mal cuando enviamos la tarea al backlog: ", error)
        }
    }

    return {
        tareas,
        getTareas,
        postCrearTarea,
        putEditarTarea,
        putEditarEstado,
        deleteTarea,
        enviarAlBacklog
    }
}

export default useTareas
