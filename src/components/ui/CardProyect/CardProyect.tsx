import { FC } from 'react'
import styles from "./CardProyect.module.css"
import { IProyecto } from '../../../types/IInterfaces';


type ICardProyect = {
    sprint: IProyecto;
    handleCloseModal: () => void
}
export const CardProyect: FC<ICardProyect> = ({ sprint, handleCloseModal }) => {




    return (
        <div className={styles.modalContainer}>
            <div className={styles.contentPopUp}>
                <h2>{sprint.nombre}</h2>
                <p>Descripcion: {sprint.descripcion}</p>
                <p>Fecha inicio: {sprint.fechaInicio} </p>
                <p>Fecha cierre: <b>{sprint.fechaCierre}</b></p>
                <button onClick={handleCloseModal}>Editar</button>
            </div>
        </div>
    )
}
