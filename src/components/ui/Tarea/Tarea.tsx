<<<<<<< HEAD
import { ChangeEvent, FC, useState } from 'react'
import { ITarea } from '../../../types/IInterfaces'
import styles from './Tarea.module.css'
import useTarea from '../../../hooks/useTareas';
import { CardTarea } from '../CardTarea/CardTarea';

type ITareaCard = {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;
}

const initialState: ITarea = {
    id: "",
    idProyecto: "",
    titulo: "",
    estado: "",
    descripcion: "",
    fechaLimite: ""
}


const Tarea: FC<ITareaCard> = ({ tarea, handleOpenModalEdit }) => {
    const { deleteTarea } = useTarea();

    const [formValues, setFormValues] = useState<ITarea>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
    
            setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
        };

    const [openModalView, setOpenModalView] = useState<boolean>(false)
    
=======
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
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845

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
<<<<<<< HEAD
                    <button className={styles.botonBacklog}
                    >
                        <p>Enviar al Backlog</p>
                        <span className="material-symbols-outlined">add_box</span>
                    </button>
                    {/* <select defaultValue={tarea.estado}>
                        <option value="">pendiente</option>
                        <option value="">en_proceso</option>
                        <option value="">completado</option>
                    </select> */}
                    <select
                        name="estado"
                        onChange={handleChange}
                        value={formValues.estado}
                        required
                        >
                        <option value="pendiente">pendiente</option>
                        <option value="en_proceso">en_proceso</option>
                        <option value="completado">completado</option>
                    </select>

                    <button
                            onClick={() => setOpenModalView(true)}
                            className={styles.botonAzul}>
                            <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button
                            onClick={() => handleOpenModalEdit(tarea)}
                            className={styles.botonAzul}>
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                            onClick={() => deleteTarea(tarea.id!)}
                            className={styles.botonRojo}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
=======
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
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845
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
