import styles from './Sprint.module.css'

const Sprint = () => {
    return (
        <div className={styles.containerSprint}>
            <b><h3>sprint nombre</h3></b>
            <p><b>inicion: </b>Fecha</p>
            <p><b>cierre: </b>Fecha</p>
            <div className={styles.containerBotones}>

                <div className={styles.botones}>
                    <button className={styles.botonAzul}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button className={styles.botonAzul}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className={styles.botonRojo}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sprint
