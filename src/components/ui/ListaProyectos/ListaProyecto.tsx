import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styles from "./ListaProyecto.module.css"
import { useSpring } from "../../../hooks/useSpring"
import { ModalProyecto } from "../Modal/ModalProyecto"
import { springStore } from "../../../store/springStore"
import { ISpring } from "../../../types/IInterfaces"
import Sprint from "../Sprint/Sprint"


interface ListaProyectoProps{
  setIsBacklogView: Dispatch<SetStateAction<boolean>>;
  isBacklogView: boolean;
}
const ListaProyecto: FC<ListaProyectoProps> = ({setIsBacklogView, isBacklogView}) => {

  const setSpringActivo = springStore((state) => state.setSpringActivo)
  const { getSprings, springs } = useSpring();

  
  const [openModalSprint, setOpenModalSprint] = useState(false)
  // const sprints = sprintStore((state)=>state.sprints)

  const handleOpenModalEdit = (tarea: ISpring) => {
    setSpringActivo(null);
    setSpringActivo(tarea);
    setOpenModalSprint(true);
  };

  const handleCloseModal = () => {
    setOpenModalSprint(false);
  };

  useEffect(() => {
    const getAllSprings = async () => {
      getSprings()
    }

    getAllSprings()
  },[]);
  
  return (
    <>
      <div className={styles.container}>
        <button
            onClick={() => setIsBacklogView(!isBacklogView)}
            className={styles.buttonBacklog}
          >
            {isBacklogView ? "Sprint" : "Backlog"}
          </button>
        <div className={styles.containerPrincipal}>
          <div className={styles.titulo}>
            <div className={styles.buttonSprints}>
              <h2>Lista de Sprints</h2>
              <button
              onClick={()=>{
                setOpenModalSprint(true)
                setSpringActivo(null)
              }}
              >
                <span className="material-symbols-outlined">playlist_add</span>
              </button>
            </div>
            <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
          </div>
          <div className={styles.containerTargetas}>
            {springs.length > 0 ?(
              springs.map((spring)=>(
                <Sprint key={spring._id} handleOpenModalEdit={handleOpenModalEdit} spring={spring}/>
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