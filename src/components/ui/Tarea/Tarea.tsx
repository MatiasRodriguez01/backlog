import { ChangeEvent, FC, useState } from "react";
import { ITarea, ITareaBacklog } from "../../../types/IInterfaces";
import styles from "./Tarea.module.css";
import useTareas from "../../../hooks/useTareas";
// import useBacklog from "../../../hooks/useBacklog";
import { tareaStore } from "../../../store/tareaStore";
import { CardTarea } from "../CardTarea/CardTarea";
import useBacklog from "../../../hooks/useBacklog";

interface ITareaCard {
    tarea: ITarea;
    handleEditTarea: (tarea: ITarea) => void;
}

const Tarea: FC<ITareaCard> = ({ tarea, handleEditTarea }) => {

    const [openModalView, setOpenModalView] = useState<boolean>(false)

    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    const { deleteTarea, putEditarTarea, tareaActiva } = useTareas();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        setTareaActiva(tarea);
        if (tareaActiva) {
            putEditarTarea(tareaActiva.idProyecto!, { ...tareaActiva, estado: value})
            setTareaActiva(null)
        }
    };

    const { enviarTareaAlBacklog } = useTareas();
    const { crearTareaParaElBacklog } = useBacklog()

    const handleEnviarBacklog = (tarea: ITarea) => {
        const { id, titulo, descripcion, estado, fechaLimite } = tarea;
        const nuevaTarea: ITareaBacklog = {
            id, 
            idProyecto: null,
            titulo, 
            string: "",
            descripcion, 
            estado, 
            fechaLimite
        }
        crearTareaParaElBacklog(nuevaTarea)
        enviarTareaAlBacklog(tarea.idProyecto!, tarea)
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
                    <button onClick={() => handleEnviarBacklog(tarea)}  className={styles.botonBacklog} >
                        <p>Enviar al Backlog</p>
                        <span className="material-symbols-outlined">add_box</span>
                    </button>
                    {/* Select con estado controlado */}
                    <select value={tarea.estado} onChange={handleChange}>
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
            {
                openModalView &&
                <CardTarea
                    tareaa={tarea}
                    handleCloseModal={() => setOpenModalView(false)}
                />
            }
        </>
    );
};

export default Tarea;
