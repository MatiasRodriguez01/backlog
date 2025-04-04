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
    

    

    return (
        <>
            <div className={styles.containerPrincipalTarea}>
                <p>Titulo: {tarea.titulo}</p>
                <p>Descripcion: {tarea.descripcion}</p>
                <p>Fecha limite: {tarea.fechaLimite}</p>
                <div className={styles.botones}>
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
    )
}

export default Tarea
