import Tarea from "../Tarea/Tarea";
import styles from "./ListaTareas.module.css";

const ListaTareas = () => {
  return (
    <>
      <div className={styles.containerPrincipal}>
        <div className={styles.titulo}>
          <h2>Nombre de la sprint</h2>
        </div>
        <div className={styles.buttonAddTarea}>
          <h2>Tareas en la sprint: </h2>
          <button>
            <p>Crear Tarea</p>
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
        </div>
        <div className={styles.containerTareas}>
          <div className={styles.pendiente}>
            <div className={styles.titulo}>
              <h2>Pendiente</h2>
            </div>
            <Tarea />
            <Tarea />
            <Tarea />
            <Tarea />
          </div>
          <div className={styles.proceso}>
            <div className={styles.titulo}>
              <h2>En proceso</h2>
            </div>
            <Tarea />
          </div>
          <div className={styles.completado}>
            <div className={styles.titulo}>
              <h2>completado</h2>
            </div>
            <Tarea />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListaTareas;
