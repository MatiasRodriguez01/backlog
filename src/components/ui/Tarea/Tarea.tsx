import { FC } from 'react'
import { ITarea } from '../../../types/IInterfaces'
import styles from './Tarea.module.css'

interface ITareaCard {
    tarea: ITarea
}

const Tarea: FC<ITareaCard> = ({ tarea }) => {

    // const proyectoActivo = proyectoStrore((state) => (state.proyectoActivo))

    

    return (
        <>
            <div className={styles.containerPrincipalTarea}>
                <p>Titulo: {tarea.titulo}</p>
                <p>Descripcion: {tarea.descripcion}</p>
                <p>Fecha limite: {tarea.fechaLimite}</p>
                <div className={styles.botones}>
                    <button className={styles.botonBacklog}>
                        <p>Enviar al Backlog</p>
                        <span className="material-symbols-outlined">add_box</span>
                    </button>
                    <select defaultValue={tarea.estado}>
                        <option value="">pendiente</option>
                        <option value="">en_proceso</option>
                        <option value="">completado</option>
                    </select>
                    <button className={styles.azul}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button className={styles.azul}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className={styles.red}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Tarea
