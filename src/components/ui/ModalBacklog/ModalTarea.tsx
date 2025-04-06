

import { useShallow } from 'zustand/shallow';
import useBacklog from '../../../hooks/useBacklog';
import { ITarea } from '../../../types/IInterfaces';
import styles from './ModalTarea.module.css'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import backlogStore from '../../../store/backlogStore';

interface IModalTarea {
    idValue?: string;
    handleCloseModal: VoidFunction;
}


const initialState: ITarea = {
    id: "",
    idProyecto: "",
    titulo: "",
    estado: "",
    descripcion: "",
    fechaLimite: ""
}


const ModalTarea: FC<IModalTarea> = ({ idValue, handleCloseModal }) => {

    const {
        tareaBacklogActiva,
        setTareaActiva
    } = backlogStore(
        useShallow((state) => ({
            tareaBacklogActiva: state.tareaBacklogActiva,
            setTareaActiva: state.setTareaActiva
        }))
    )
    // const setTareaActva = backlogStore((state) => (state.setTareaActiva))

    const { putEditarTareaBacklog, postCrearTareaBacklog } = useBacklog()

    const [formValues, setFormValues] = useState<ITarea>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (tareaBacklogActiva) {
            putEditarTareaBacklog(formValues)
        } else {
            postCrearTareaBacklog({ ...formValues, id: new Date().toISOString(), idProyecto: idValue })
        }
        setTareaActiva(null)
        handleCloseModal()
    }

    useEffect(() => {
        if (tareaBacklogActiva) setFormValues(tareaBacklogActiva);
    }, []);

    return (
        <div className={styles.containerPrincipalPopUp}>
            <div className={styles.contentPopUp}>
                <div>
                    <h2>{tareaBacklogActiva ? "Editar tarea" : "Crear tarea"}</h2>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        <input
                            type="text"
                            placeholder='Ingrese un titulo: '
                            onChange={handleChange}
                            value={formValues.titulo}
                            name="titulo"
                            required />
                        <textarea
                            placeholder='Ingrese una descripcion: '
                            onChange={handleChange}
                            value={formValues.descripcion}
                            name='descripcion'
                            required />
                        <select
                            name="estado"
                            // defaultValue={"seleccione un estado"}
                            onChange={handleChange}
                            value={formValues.estado}
                            required
                        >
                            <option value="">seleccione un estado: </option>
                            <option value="pendiente">pendiente</option>
                            <option value="en_proceso">en_proceso</option>
                            <option value="completado">completado</option>
                        </select>
                        <input
                            type="date"
                            name="fechaLimite"
                            onChange={handleChange}
                            value={formValues.fechaLimite}
                            required />
                    </div>
                    <div className={styles.buttonCard}>
                        <button className={styles.buttonCancel} onClick={handleCloseModal}>Cancelar</button>
                        <button className={styles.buttonSubmit} type="submit">
                            {tareaBacklogActiva ? "Editar tarea" : "Crear tarea"}
                        </button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default ModalTarea
