import styles from './Tarea.module.css'

const Tarea = () => {
    return (
        <>
            <div className={styles.containerPrincipalTarea}>
                <p>Titulo: Nombre de la tarea</p>
                <p>Descripcion: nombre descripcion</p>
                <p>Fecha Limite: aaaa/mm/dd</p>
                <div className={styles.botones}>
                    <button className={styles.botonBacklog}>
                        <p>Enviar al Backlog</p>
                        <span className="material-symbols-outlined">add_box</span>
                    </button>
                    <select>
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
