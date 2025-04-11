import { useEffect, useState } from "react";
import styles from "./ListaTareas.module.css";
import Tarea from "../Tarea/Tarea";
import { proyectoStrore } from "../../../store/proyectoStore";
import useTareas from "../../../hooks/useTareas";
import ModalTarea from "../ModalTarea/ModalTarea";
import { tareaStore } from "../../../store/tareaStore";
import { ITarea } from "../../../types/IInterfaces";

import { setEstadoLista } from "../../../hooks/useTareaEstado";


const ListaTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const proyectoActivo = proyectoStrore((state) => state.proyectoActivo);


  const { getTareas, tareas } = useTareas();

  const [openModalTarea, setOpenModalTarea] = useState(false)

  const [tareasPendientes, setTareasPendientes] = useState<ITarea[]>([])
  const [tareasEnProceso, setTareasEnProceso] = useState<ITarea[]>([])
  const [tareasCompletadas, setTareasCompletadas] = useState<ITarea[]>([])

  const handleEditTarea = (tarea: ITarea) => {
    setTareaActiva(null);
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleClickAddTarea = () => {
    setTareaActiva(null) 
    setOpenModalTarea(true)
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
  

  return (
    <>
      <div className={styles.containerPrincipal}>
        <div className={styles.titulo}>
          <h2>{proyectoActivo?.nombre}</h2>
        </div>
        <div className={styles.buttonAddTarea}>
          <h2>Tareas en la sprint</h2>
          <button
            className={styles.containerButton}
            onClick={handleClickAddTarea}
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
                tareasPendientes.map((tarea, index) => (
                  <Tarea key={index} tarea={tarea} handleEditTarea={handleEditTarea} />
                ))
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
                tareasEnProceso.map((tarea, index) => (
                  <Tarea key={index} tarea={tarea} handleEditTarea={handleEditTarea} />
                ))
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
                tareasCompletadas.map((tarea, index) => (
                  <Tarea key={index} tarea={tarea} handleEditTarea={handleEditTarea} />

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
