import { useState } from "react";
import styles from "./Backlog.module.css";
import ModalTarea from "../ModalBacklog/ModalTarea";
import backlogStore from "../../../store/backlogStore";
import useTareas from "../../../hooks/useTareas";
import Tarea from "../Tarea/Tarea";
import { ITarea } from "../../../types/IInterfaces";
import { tareaStore } from "../../../store/tareaStore";

const Backlog = () => {
  const setTareaActiva = backlogStore((state) => state.setTareaActiva);

  const tareaAct = tareaStore((state) => state.tareaActiva);

  const { getTareas, getTareasPorProyecto, tareas } = useTareas();

  const [openModalTarea, setOpenModalTarea] = useState(false);

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(null);
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  return (
    <>
      <div className={styles.containerPrincipal}>
        <div className={styles.titulo}>
          <h2>Backlog</h2>
        </div>
        <div className={styles.buttonAddTarea}>
          <h2>Tarea en backlog</h2>
          <button
            className={styles.containerButton}
            onClick={() => setOpenModalTarea(true)}
          >
            crear tarea
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
        </div>
      
        <div className={styles.containerTareas}>
          {tareaAct && tareas.length > 0 ? (
            tareas
              .filter((tarea) => tarea.estado === "pendiente")
              .map((tarea, index) => (
                <Tarea
                  key={index}
                  handleOpenModalEdit={handleOpenModalEdit}
                  tarea={tarea}
                />
              ))
          ) : (
            <>
              <p>no hay tareas</p>
            </>
          )}

          {tareaAct && tareas.length > 0 ? (
            tareas
              .filter((tarea) => tarea.estado === "en_proceso")
              .map((tarea, index) => (
                <Tarea
                  key={index}
                  handleOpenModalEdit={handleOpenModalEdit}
                  tarea={tarea}
                />
              ))
          ) : (
            <>
              <p>no hay tareas</p>
            </>
          )}

          {tareaAct && tareas.length > 0 ? (
            tareas
              .filter((tarea) => tarea.estado === "completado")
              .map((tarea, index) => (
                <Tarea
                  key={index}
                  handleOpenModalEdit={handleOpenModalEdit}
                  tarea={tarea}
                />
              ))
          ) : (
            <>
              <p>no hay tareas</p>
            </>
          )}
        </div>
      </div>

      {openModalTarea && (
        <ModalTarea
          idValue={undefined}
          handleCloseModal={() => setOpenModalTarea(false)}
        />
      )}
    </>
  );
};

export default Backlog;
