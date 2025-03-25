import styles from "./Header.module.css"

const Header = () => {
    return (
        <div className={styles.containerPrincipalHeader}>
            <div className={styles.titulo}>
                <h1>Administador de tareas</h1>
            </div>
        </div>
    )
}

export default Header
