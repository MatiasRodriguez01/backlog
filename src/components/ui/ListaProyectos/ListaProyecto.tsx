import { useEffect, useState } from "react"
import styles from "./ListaProyecto.module.css"
import { useProyecto } from "../../../hooks/useProyecto"
import { CardProyect } from "../CardProyect/CardProyect"
import { ModalProyecto } from "../Modal/ModalProyecto"
import { proyectoStrore } from "../../../store/proyectoStore"
import { IProyecto } from "../../../types/IInterfaces"

const ListaProyecto = () => {

  const setProyectotActivo = proyectoStrore((state) => state.setProyectotActivo);

  const {getProyectos, proyectos} = useProyecto();

  useEffect(()=>{
    getProyectos()
  },[]);

  const [openModalSprint, setOpenModalSprint] = useState(false)
  // const sprints = sprintStore((state)=>state.sprints)

  const handleOpenModalEdit = (tarea: IProyecto) => {
    setProyectotActivo(tarea);
    setOpenModalSprint(true);
  };

  const handleCloseModal = () => {
    setOpenModalSprint(false);
  };

  return (
    <>
      <div className={styles.container}>
        <button className={styles.buttonBacklog}>
          <h3>Backlog</h3>
          <span className="material-symbols-outlined">import_contacts</span>
        </button>
        <div className={styles.containerPrincipal}>
          <div className={styles.titulo}>
            <div className={styles.buttonSprints}>
              <h2>Lista de Sprints</h2>
              <button
              onClick={()=>{
                setOpenModalSprint(true)
                setProyectotActivo(null)
              }}
              >
                <span className="material-symbols-outlined">playlist_add</span>
              </button>
            </div>
            <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
          </div>
          <div className={styles.containerTargetas}>
            {proyectos.length > 0 ?(
              proyectos.map((el)=>(
                <CardProyect handleOpenModalEdit={handleOpenModalEdit} sprint={el}/>
              ))
            ):(
              <div>
                <h3>No hay sprints</h3>
              </div>
            )}
            {/* <Sprint /> */}
          </div>
        </div>
      {openModalSprint && <ModalProyecto handleCloseModal={handleCloseModal}/>}
      </div>
    </>
  )
}

export default ListaProyecto
