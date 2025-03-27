import { FC } from 'react'
import { ISprint } from '../../../types/ISprint'
import { useSprints } from '../../../hooks/useSprints';


type ICardListSprint={
    sprint: ISprint;
    handleOpenModalEdit: (sprint: ISprint)=>void
}
export const CardListSprint: FC <ICardListSprint> = ({sprint, handleOpenModalEdit}) => {

    const {eliminarSprint} = useSprints()
    const eliminarSprintPorNombre= () =>{
        eliminarSprint(sprint.nombre)
    }

    const editarSprint= () =>{
        handleOpenModalEdit(sprint)
    }

  return (
    <div>
        <h3>Nombre: {sprint.nombre}</h3>
        <p>Fecha inicio: {sprint.fechaInicio} </p>
        <p>
            Fecha cierre: <b>{sprint.fechaCierre}</b>
        </p>
        <div>
            <button onClick={editarSprint}>Editar</button>
            <button onClick={eliminarSprintPorNombre}>Eliminar</button>
        </div>
    </div>
  )
}
