import { useEffect, useState } from "react";
import styles from "./ListaTareas.module.css";
import Tarea from "../Tarea/Tarea";
import { proyectoStrore } from "../../../store/proyectoStore";
import useTareas from "../../../hooks/useTareas";
import ModalTarea from "../ModalTarea/ModalTarea";


const ListaTareas = () => {

  const proyectoActivo = proyectoStrore((state) => state.proyectoActivo);

  const { getTareas, getTareasPorProyecto, tareas } = useTareas();

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);

  useEffect(() => {
    getTareas(proyectoActivo!)
    getTareasPorProyecto(proyectoActivo!)

  }, [proyectoActivo]);


  return (
    <>
      <div className={styles.containerPrincipal}>
        <div className={styles.titulo}>
          <h2>Nombre de la sprint</h2>
        </div>
        <div className={styles.buttonAddTarea}>
          <h2>Tareas en la sprint: </h2>
          <button
            className={styles.containerButton}
            onClick={() => setOpenPopUp(true)}
          >
            Crear Tarea
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
        </div>
        <div className={styles.containerTareas}>
          <div className={styles.pendiente}>
            <div className={styles.titulo}>
              <h2>Pendiente</h2>
            </div>
            {
              proyectoActivo && (tareas.length > 0) ? (
                tareas
                  .filter((tarea) => (tarea.estado === "pendiente"))
                  .map((tarea, index) => (
                    <Tarea key={index} tarea={tarea} />
                  ))
              ) : (
                <p>no hay tareas</p>
              )
            }
          </div>
          <div className={styles.proceso}>
            <div className={styles.titulo}>
              <h2>En proceso</h2>
            </div>
            {
              proyectoActivo && (tareas.length > 0) ? (
                tareas
                  .filter((tarea) => (tarea.estado === "en_proceso"))
                  .map((tarea, index) => (
                    <Tarea key={index} tarea={tarea} />
                  ))
              ) : (
                <p>no hay tareas</p>
              )
            }
          </div>
          <div className={styles.completado}>
            <div className={styles.titulo}>
              <h2>completado</h2>
            </div>
            {
              proyectoActivo && (tareas.length > 0) ? (
                tareas
                  .filter((tarea) => (tarea.estado === "completado"))
                  .map((tarea, index) => (
                    <Tarea key={index} tarea={tarea} />

                  ))
              ) : (
                <p>no hay tareas</p>
              )
            }
          </div>
        </div>
      </div>

      {
        openPopUp &&
        <ModalTarea
          idValue={proyectoActivo?.id}
          handleCloseModal={() => setOpenPopUp(false)} />
      }
    </>
  );
};

export default ListaTareas;
