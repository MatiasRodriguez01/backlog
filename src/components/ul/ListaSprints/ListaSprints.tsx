import Sprint from "../Sprint/Sprint"
import styles from "./ListaSprints.module.css"

const ListaSprints = () => {
  return (
    <>
      <div className={styles.container}>
        <button className={styles.buttonBacklog}>
          <h3>Backlog</h3>
          <span className="material-symbols-outlined">import_contacts</span>
        </button>
        <div className={styles.containerPrincipal}>
          <div className={styles.titulo}>
            <div className={styles.boton}>
              <h2>Lista de Sprints</h2>
              <button>
                <span className="material-symbols-outlined">playlist_add</span>
              </button>
            </div>
            <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
          </div>
          <div className={styles.containerTargetas}>
            <Sprint />
          </div>
        </div>
      </div>
    </>
  )
}

export default ListaSprints
