import { useEffect, useState } from "react";
import styles from "./ListaTareas.module.css";
import Tarea from "../Tarea/Tarea";
import { proyectoStrore } from "../../../store/proyectoStore";
import useTareas from "../../../hooks/useTareas";
import ModalTarea from "../ModalTarea/ModalTarea";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/IInterfaces";

import { setEstadoLista } from "../../../hooks/useTareaEstado";
import { ITarea } from "../../../types/IInterfaces";

const ListaTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const proyectoActivo = proyectoStrore((state) => state.proyectoActivo);


  const { getTareas, tareas, setTareaActiva } = useTareas();

  const [openModalTarea, setOpenModalTarea] = useState(false)

<<<<<<< HEAD

  useEffect(() => {
    if (!proyectoActivo) return; // Evita que el código se ejecute si no hay proyecto activo
    getTareas(proyectoActivo);
    getTareasPorProyecto(proyectoActivo);
  }, [proyectoActivo]);

  const handleOpenModalEdit = (tarea: ITarea) => {
      setTareaActiva(null);
      setTareaActiva(tarea);
      setOpenModalTarea(true);
    };
=======
  const [tareasPendientes, setTareasPendientes] = useState<ITarea[]>([])
  const [tareasEnProceso, setTareasEnProceso] = useState<ITarea[]>([])
  const [tareasCompletadas, setTareasCompletadas] = useState<ITarea[]>([])

  const handleEditTarea = (tarea: ITarea) => {
    setTareaActiva(null);
    setTareaActiva(tarea);
    setOpenPopUp(true);
  };

  const handleClickAddTarea = () => {
    setTareaActiva(null) 
    setOpenPopUp(true)
  }

  useEffect(() => {
    const getAllTareas = async () => {
      if (proyectoActivo) await getTareas(proyectoActivo.id!);
      console.log("Tareas actualizadas");
    };
  
    getAllTareas();
  }, [proyectoActivo]); // SOLO se dispara cuando cambia el proyecto
  
  useEffect(() => {
    if (tareas.length > 0) {
      setTareasPendientes(setEstadoLista(tareas, "pendiente"));
      setTareasEnProceso(setEstadoLista(tareas, "en_proceso"));
      setTareasCompletadas(setEstadoLista(tareas, "completado"));
    } else {
      setTareasPendientes([]);
      setTareasEnProceso([]);
      setTareasCompletadas([]);
    }
  }, [tareas]); // SOLO reorganiza las tareas si cambian
  
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845

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
<<<<<<< HEAD
            onClick={() => setOpenModalTarea(true)}
=======
            onClick={handleClickAddTarea}
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845
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
<<<<<<< HEAD
                tareas
                  .filter((tarea) => (tarea.estado === "pendiente"))
                  .map((tarea, index) => (
                    <Tarea key={index} handleOpenModalEdit={handleOpenModalEdit} tarea={tarea} />
                  ))
                  
=======
                tareasPendientes.map((tarea, index) => (
                  <Tarea key={index} tarea={tarea} handleEditTarea={handleEditTarea} />
                ))
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845
              ) : (
                <>
                <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
                <p>no hay tareas</p>
                </>
              )
            }
          </div>
          <div className={styles.proceso}>
            <div className={styles.titulo}>
              <h2>En proceso</h2>
            </div>
            {
              proyectoActivo && (tareas.length > 0) ? (
<<<<<<< HEAD
                tareas
                  .filter((tarea) => (tarea.estado === "en_proceso"))
                  .map((tarea, index) => (
                    <Tarea key={index} handleOpenModalEdit={handleOpenModalEdit} tarea={tarea} />
                  ))
=======
                tareasEnProceso.map((tarea, index) => (
                  <Tarea key={index} tarea={tarea} handleEditTarea={handleEditTarea} />
                ))
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845
              ) : (
                <>
                <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
                <p>no hay tareas</p>
                </>
              )
            }
          </div>
          <div className={styles.completado}>
            <div className={styles.titulo}>
              <h2>completado</h2>
            </div>
            {
              proyectoActivo && (tareas.length > 0) ? (
<<<<<<< HEAD
                tareas
                  .filter((tarea) => (tarea.estado === "completado"))
                  .map((tarea, index) => (
                    <Tarea key={index} handleOpenModalEdit={handleOpenModalEdit} tarea={tarea} />
=======
                tareasCompletadas.map((tarea, index) => (
                  <Tarea key={index} tarea={tarea} handleEditTarea={handleEditTarea} />
>>>>>>> fbbfee66312aee5dfe8c2aca29c63e6423584845

                ))
              ) : (
                <>
                <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
                <p>no hay tareas</p>
                </>
              )
            }
          </div>
        </div>
      </div>

      {
        openModalTarea &&
        <ModalTarea
          idValue={proyectoActivo?.id}
          handleCloseModal={() => setOpenModalTarea(false)} />
      }
    </>
  );
};

export default ListaTareas;
