import { useEffect, useState } from "react"
import { sprintStore } from "../../../store/sprintStore"
import styles from "./ListaSprints.module.css"
import { ISprint } from "../../../types/ISprint"
import { useSprints } from "../../../hooks/useSprints"
import { CardListSprint } from "../CardList/CardListSprint"
import { ModalSprint } from "../Modal/ModalSprint"

const ListaSprints = () => {

  const setSprintActivo = sprintStore((state)=>state.setSprintActivo);

  const {getSprints, sprints} = useSprints();

  useEffect(()=>{
    getSprints()
  },[]);
  const [openModalSprint, setOpenModalSprint] = useState(false)
  // const sprints = sprintStore((state)=>state.sprints)

  const handleOpenModalEdit = (tarea: ISprint) => {
    setSprintActivo(tarea);
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
              }}
              >
                <span className="material-symbols-outlined">playlist_add</span>
              </button>
            </div>
            <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
          </div>
          <div className={styles.containerTargetas}>
            {sprints.length > 0 ?(
              sprints.map((el)=>(
                <CardListSprint handleOpenModalEdit={handleOpenModalEdit} sprint={el}/>
              ))
            ):(
              <div>
                <h3>No hay sprints</h3>
              </div>
            )}
            {/* <Sprint /> */}
          </div>
        </div>
      {openModalSprint && <ModalSprint handleCloseModal={handleCloseModal}/>}
      </div>
    </>
  )
}

export default ListaSprints
