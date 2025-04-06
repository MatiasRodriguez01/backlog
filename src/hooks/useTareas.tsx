import { tareaStore } from '../store/tareaStore'
import { useShallow } from 'zustand/shallow'
import { getAllTareaPorProyecto } from '../https/tareas/tareasList'
import { ITarea } from '../types/IInterfaces'
import { createTareaController, deleteTareaController, updateTareaController } from '../https/tareas/tareaController'
import Swal from 'sweetalert2'

const useTareas = () => {

    const {
        tareas,
        tareaActiva,
        setTareas,
        setTareaActiva,
        setAgregarTarea,
        setEditarTarea,
        setEliminarTarea

    } = tareaStore(
        useShallow((state) => ({
            tareas: state.tareas,
            tareaActiva: state.tareaActiva,
            setTareas: state.setTareas,
            setTareaActiva: state.setTareaActiva,
            setAgregarTarea: state.setAgregarTarea,
            setEditarTarea: state.setEditarTarea,
            setEliminarTarea: state.setEliminarTarea
        })))

    const getTareas = async (idProyecto: string) => {
        try {
            const data = await getAllTareaPorProyecto(idProyecto);
            console.log(data)
            if (data) setTareas(data)
        } catch (err) {
            console.error("error al mostrar las tareas: ", err)
        }
    }

    const postCrearTarea = async (idProyecto: string, nuevaTarea: ITarea) => {
        setAgregarTarea(nuevaTarea);
        try {

            const result = await createTareaController(idProyecto, nuevaTarea);
            console.log(result)
            if (result) {
                Swal.fire("Exito", "Tarea creada correctamente", "success")
            } else {
                Swal.fire("Error", "Tarea creada correctamente", "error")

            }
        } catch (err) {
            setEliminarTarea(nuevaTarea.id!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const putEditarTarea = async (idProyecto: string, tareaActualizada: ITarea) => {
        const estadoPrevio = tareas.find((tarea) =>
            tarea.id === tareaActualizada.id
        );
        setEditarTarea(tareaActualizada);
        try {
            await updateTareaController(idProyecto, tareaActualizada);
            Swal.fire("Exito", "Tarea actualizada correctamente", "success")
        } catch (err) {
            setEditarTarea(estadoPrevio!)
            console.error("error al agregar tareas: ", err)
        }
    }

    const deleteTarea = async (idProyecto: string, idTarea: string) => {
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
            await deleteTareaController(idProyecto, idTarea)
            Swal.fire("Eliminado", "La tarea se elimino correctamente", "success")
        } catch (error) {
            if (estadoPrevio) setAgregarTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar tarea: ", error);

        }
    }

    const crearTareaParaProyectos = async (idProyecto: string, nuevaTarea: ITarea) => {
        setAgregarTarea(nuevaTarea);
        try {

            const result = await createTareaController(idProyecto, nuevaTarea);
            console.log("Esta tarea se envio a su proyecto: ", result)
        } catch (err) {
            setEliminarTarea(nuevaTarea.id!)
            console.error("error al agregar tareas: ", err)
        }
    }


    const enviarTareaAlBacklog = async (tareaAEliminar: ITarea) => {
        const idTarea = tareaAEliminar.id;
        const estadoPrevio = tareas.find((tarea) => tarea.id === idTarea);

        setEliminarTarea(tareaAEliminar.id!)
        try {
            await deleteTareaController(tareaAEliminar.idProyecto!, idTarea!)
            
            Swal.fire("Exito", "Tarea fue enviada al backlog correctamente", "success")
        } catch (error) {
            if (estadoPrevio) setAgregarTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar tarea: ", error);

        }
    }

    return {
        tareas,
        tareaActiva,
        getTareas,
        setTareaActiva,
        postCrearTarea,
        putEditarTarea,
        deleteTarea,
        crearTareaParaProyectos,
        enviarTareaAlBacklog
    }
}

export default useTareas
