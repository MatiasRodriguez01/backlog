import { ChangeEvent, FC } from "react";
import { ITarea } from "../../../types/IInterfaces";
import styles from "./Tarea.module.css";
import useTareas from "../../../hooks/useTareas";
import { tareaStore } from "../../../store/tareaStore";
import useBacklog from "../../../hooks/useBacklog";

interface ITareaCard {
    tarea: ITarea;
    handleEditTarea: (tarea: ITarea) => void;
}

const Tarea: FC<ITareaCard> = ({ tarea, handleEditTarea }) => {

    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    const { putEditarTarea, deleteTarea } = useTareas();
    const { postCrearTareaBacklog } = useBacklog();

    const handleEstadoChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const nuevoValor = event.target.value;
        setTareaActiva(tarea)
        const tareaNueva: ITarea = {
            ...tarea,
            estado: nuevoValor
        }
        putEditarTarea(tarea.idProyecto!, tareaNueva)
        setTareaActiva(null)
    };

    const handleaBacklog = (tarea: ITarea) => {
        deleteTarea(tarea.idProyecto!, tarea.id!)
        postCrearTareaBacklog({...tarea, id: undefined})
        console.log("Enviado al backlog")
    }
    

    const activo = () => {
        setTareaActiva(null)
        setTareaActiva(tarea)
    }

    return (
        <>
            <div onClick={activo} className={styles.containerPrincipalTarea}>
                <p>Titulo: {tarea.titulo}</p>
                <p>Descripcion: {tarea.descripcion}</p>
                <p>Fecha limite: {tarea.fechaLimite}</p>
                <div className={styles.botones}>
                    <button className={styles.botonBacklog} onClick={() => handleaBacklog(tarea)}>
                        <p>Enviar al Backlog</p>
                        <span className="material-symbols-outlined">add_box</span>
                    </button>
                    {/* Select con estado controlado */}
                    <select value={tarea.estado} onChange={handleEstadoChange}>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="completado">Completado</option>
                    </select>
                    <button className={styles.azul} >
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button className={styles.azul} onClick={() => handleEditTarea(tarea)}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={() => deleteTarea(tarea.idProyecto!, tarea.id!)} className={styles.red}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Tarea;
