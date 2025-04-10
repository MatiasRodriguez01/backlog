import { useShallow } from 'zustand/shallow'
import { ITarea, ITareaBacklog } from '../types/IInterfaces'
import { createTareaBacklogController, deleteTareaBacklogController, getAllTareasBacklogController, updateTareaBacklogController } from '../https/backlog/backlogController'
import Swal from 'sweetalert2'
import backlogStore from '../store/backlogStore'
import useTareas from './useTareas'

const useBacklog = () => {
    
    const {
        tareasBacklog,
        tareaBacklogActiva,
        setTareasBacklog,
        setAgregarTarea,
        setEditarTarea,
        setEliminarTarea
    } = backlogStore(
        useShallow((state) => ({
            tareasBacklog: state.tareasBacklog,
            tareaBacklogActiva: state.tareaBacklogActiva,
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
                console.log(tareasBacklog)
            }
        } catch (err) {
            console.error("error al mostrar las tareas del backlog: ", err)
        }
    }

    const postCrearTareaBacklog = async (nuevaTarea: ITareaBacklog) => {
        setAgregarTarea(nuevaTarea);
        try {
            await createTareaBacklogController(nuevaTarea);
            Swal.fire("Exito", "Tarea creada correctamente", "success")
        } catch (err) {
            setEliminarTarea(nuevaTarea.id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarTareaBacklog = async (tareaActualizada: ITareaBacklog) => {
        const estadoPrevio = tareasBacklog.find((tarea) =>
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

    const deleteTareaBacklog = async (idTarea: number) => {
        const estadoPrevio = tareasBacklog.find((tarea) => tarea.id === idTarea);

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
    const crearTareaParaElBacklog = async (nuevaTarea: ITareaBacklog) => {
        setAgregarTarea(nuevaTarea);
        try {
            await createTareaBacklogController(nuevaTarea);
        } catch (err) {
            setEliminarTarea(nuevaTarea.id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const { crearTareaParaProyectos } = useTareas();

    const sacarTareaDelBacklog = async (tareaAEliminar: ITareaBacklog, tareaACrear: ITarea) => {
        const estadoPrevio = tareasBacklog.find((tarea) => tarea.id === tareaAEliminar.id);
        const idProyecto = tareaACrear.idProyecto!;

        setEliminarTarea(tareaAEliminar.id!)
        try {
            await deleteTareaBacklogController(tareaAEliminar.id!)
            crearTareaParaProyectos(idProyecto, tareaACrear)
            Swal.fire("Exito", "Tarea fue extraida al backlog correctamente", "success")
        } catch (error) {
            if (estadoPrevio) setAgregarTarea(estadoPrevio)
            console.log("Algo salio mal al sacar la Tarea Del Backlog : ", error);

        }
    }

    return {
        tareasBacklog,
        tareaBacklogActiva,
        getTareasBacklog,
        postCrearTareaBacklog,
        putEditarTareaBacklog,
        deleteTareaBacklog,
        sacarTareaDelBacklog,
        crearTareaParaElBacklog
    }
}

export default useBacklog
