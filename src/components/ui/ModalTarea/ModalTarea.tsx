

import styles from './ModalTarea.module.css'
import { ITarea } from '../../../types/IInterfaces'
import { tareaStore } from '../../../store/tareaStore';
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import useTareas from '../../../hooks/useTareas';
// import { proyectoStrore } from '../../../store/proyectoStore';

interface IModalTarea {
    idValue?: number;
    handleCloseModal: VoidFunction;
}


const initialState: ITarea = {
    id: 0,
    idProyecto: 0,
    titulo: "",
    estado: "",
    descripcion: "",
    fechaLimite: ""
}


const ModalTarea: FC<IModalTarea> = ({ idValue, handleCloseModal }) => {

    const tareaActva = tareaStore((state) => state.tareaActiva);
    // const proyectoActivo = proyectoStrore((state) => state.proyectoActivo);
    const setTareaActva = tareaStore((state) => (state.setTareaActiva))

    const { putEditarTarea, postCrearTarea } = useTareas()

    const [formValues, setFormValues] = useState<ITarea>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (tareaActva) {
            putEditarTarea(idValue!, formValues)
        } else {
            postCrearTarea(idValue!, { ...formValues, id:  Date.now(), idProyecto: idValue })
        }
        setTareaActva(null)
        handleCloseModal()
    }

    useEffect(() => {
        if (tareaActva) setFormValues(tareaActva);
        console.log("tareaActva: ", tareaActva)
    }, []);

    return (
        <div className={styles.containerPrincipalPopUp}>
            <div className={styles.contentPopUp}>
                <div>
                    <h2>{tareaActva ? "Editar tarea" : "Crear tarea"}</h2>
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
                            {tareaActva ? "Editar tarea" : "Crear tarea"}
                        </button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default ModalTarea
