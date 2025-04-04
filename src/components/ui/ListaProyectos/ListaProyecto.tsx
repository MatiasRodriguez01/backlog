import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import styles from "./ListaProyecto.module.css"
import { useProyecto } from "../../../hooks/useProyecto"
import { ModalProyecto } from "../Modal/ModalProyecto"
import { proyectoStrore } from "../../../store/proyectoStore"
import { IProyecto } from "../../../types/IInterfaces"
import Sprint from "../Sprint/Sprint"


interface ListaProyectoProps{
  setIsBacklogView: Dispatch<SetStateAction<boolean>>;
  isBacklogView: boolean;
}
const ListaProyecto: FC<ListaProyectoProps> = ({setIsBacklogView, isBacklogView}) => {

  const setProyectoActivo = proyectoStrore((state) => state.setProyectoActivo)
  const {getProyectos, proyectos } = useProyecto();

  
  const [openModalSprint, setOpenModalSprint] = useState(false)
  // const sprints = sprintStore((state)=>state.sprints)

  const handleOpenModalEdit = (tarea: IProyecto) => {
    setProyectoActivo(null);
    setProyectoActivo(tarea);
    setOpenModalSprint(true);
  };

  const handleCloseModal = () => {
    setOpenModalSprint(false);
  };

  useEffect(() => {
    const getAllProyects = async () => {
      getProyectos()
    }

    getAllProyects()
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
                setProyectoActivo(null)
              }}
              >
                <span className="material-symbols-outlined">playlist_add</span>
              </button>
            </div>
            <hr style={{ width: '80%', height: '0.1vh', backgroundColor: 'grey' }} />
          </div>
          <div className={styles.containerTargetas}>
            {proyectos.length > 0 ?(
              proyectos.map((proyecto, index)=>(
                <Sprint key={index} handleOpenModalEdit={handleOpenModalEdit} proyecto={proyecto}/>
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
// import { useEffect, useState } from "react";
// import styles from "./ListaProyecto.module.css";
// import { useProyecto } from "../../../hooks/useProyecto";
// import { ModalProyecto } from "../Modal/ModalProyecto";
// import { proyectoStrore } from "../../../store/proyectoStore";
// import { IProyecto } from "../../../types/IInterfaces";
// import Sprint from "../Sprint/Sprint";
// import Backlog from "../BacklogPage/Backlog";



// const ListaProyecto = () => {
//   const setProyectotActivo = proyectoStrore(
//     (state) => state.setProyectotActivo
//   );

//   const { getProyectos, proyectos } = useProyecto();

//   useEffect(() => {
//     getProyectos();
//   }, []);

//   const [openModalSprint, setOpenModalSprint] = useState(false);
//   // const sprints = sprintStore((state)=>state.sprints)
//   const [isBacklogView, setIsBacklogView] = useState(false)

//   const handleOpenModalEdit = (tarea: IProyecto) => {
//     setProyectotActivo(tarea);
//     setOpenModalSprint(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModalSprint(false);
//   };


//   return (
//     <>
//       <div className={styles.container}>
//         {/* Botón para alternar entre Backlog y Sprint */}
//         <button
//           className={styles.buttonBacklog}
//           onClick={() => setIsBacklogView(!isBacklogView)}
//         >
//           {isBacklogView ? "Volver" : "Backlog"}
//         </button>

//         {/* Cambia la vista según el estado */}
//         {isBacklogView ? (
//           <Backlog/>
//         ) : (
//           <div className={styles.containerPrincipal}>
//             <div className={styles.titulo}>
//               <div className={styles.buttonSprints}>
//                 <h2>Lista de Sprints</h2>
//                 <button
//                   onClick={() => {
//                     setOpenModalSprint(true);
//                     setProyectotActivo(null);
//                   }}
                  
//                 >
                  
//                   <span className="material-symbols-outlined">playlist_add</span>
//                 </button>
//               </div>
//               <hr
//                 style={{
//                   width: "80%",
//                   height: "0.1vh",
//                   backgroundColor: "grey",
//                 }}
//               />
//             </div>
//             <div className={styles.containerTargetas}>
//               {proyectos.length > 0 ? (
//                 proyectos.map((proyecto) => (
//                   <Sprint
//                     key={proyecto.id}
//                     handleOpenModalEdit={handleOpenModalEdit}
//                     proyecto={proyecto}
//                   />
//                 ))
//               ) : (
//                 <div>
//                   <h3>No hay sprints</h3>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//         {openModalSprint && (
//           <ModalProyecto handleCloseModal={handleCloseModal} />
//         )}
//       </div>
//     </>
//   );
// };

// export default ListaProyecto;
