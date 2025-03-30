import { FC } from 'react'
import styles from "./CardProyect.module.css"
import { useProyecto } from '../../../hooks/useProyecto';
import { IProyecto } from '../../../types/IInterfaces';


type ICardProyect={
    sprint: IProyecto;
    handleOpenModalEdit: (sprint: IProyecto)=>void
}
export const CardProyect: FC <ICardProyect> = ({sprint, handleOpenModalEdit}) => {

    const { eliminarProyecto } = useProyecto()
    const eliminarSprintPorNombre= () =>{
        eliminarProyecto(sprint.id!)
    }

    const editarSprint= () =>{
        handleOpenModalEdit(sprint)
    }


  return (
    <div>
        <p>Nombre: {sprint.nombre}</p>
        <p>Descripcion: {sprint.descripcion}</p>
        <p>Fecha inicio: {sprint.fechaInicio} </p>
        <p>
            Fecha cierre: <b>{sprint.fechaCierre}</b>
        </p>
        <div className={styles.containerBotones}>
            <button onClick={editarSprint}>Editar</button>
            <button onClick={eliminarSprintPorNombre}>Eliminar</button>
        </div>
    </div>
  )
}
