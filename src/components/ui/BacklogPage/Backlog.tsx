import { useEffect, useState } from "react";
import styles from "./Backlog.module.css";
import ModalTarea from "../ModalBacklog/ModalTarea";
import backlogStore from "../../../store/backlogStore";
import { ITareaBacklog } from "../../../types/IInterfaces";
import useBacklog from "../../../hooks/useBacklog";
import { ListGroup } from "react-bootstrap";
import TareaBacklog from "../TareaBacklog/TareaBacklog";

const Backlog = () => {
  const setTareaActivaBacklog = backlogStore((state) => state.setTareaActivaBacklog);

  const { getTareasBacklog, tareasBacklog } = useBacklog();

  const [openModalTarea, setOpenModalTarea] = useState<boolean>(false);

  const handleOpenModalEdit = (tarea: ITareaBacklog) => {
    setTareaActivaBacklog(null);
    setTareaActivaBacklog(tarea);
    setOpenModalTarea(true);
  }; 

  useEffect(() => {
    const getAllTareasBacklog = async () => {

      getTareasBacklog()
      console.log("tarea en backlog.tsx: ", tareasBacklog)
    }

    getAllTareasBacklog()
  }, [])

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

        <div className={styles.containerPrincipalTareas}>
          <ListGroup className={styles.containerTareas}>
            {
              tareasBacklog.length > 0 ? (
                tareasBacklog.map((tarea) => (
                  <ListGroup.Item key={tarea.id}>
                      <TareaBacklog tarea={tarea} handleOpenModalEdit={handleOpenModalEdit} />
                  </ListGroup.Item>
                ))
              ) : (
                <>
                  <p>no hay tareas</p>
                </>
              )
            }

          </ListGroup>

        </div>

      </div>

      {openModalTarea && (
        <ModalTarea
          idProyecto={null}
          handleCloseModal={() => setOpenModalTarea(false)}
        />
      )}
    </>
  );
};

export default Backlog;
