import { FC } from 'react'
import styles from "./CardProyect.module.css"
import { IProyecto } from '../../../types/IInterfaces';


type ICardProyect = {
    sprintt: IProyecto;
    handleCloseModal: () => void
}
export const CardProyect: FC<ICardProyect> = ({ sprintt, handleCloseModal }) => {



    return (
        <div className={styles.modalContainer}>
            <div className={styles.contentPopUp}>
                <h2>{sprintt.nombre}</h2>
                <p>Descripcion: {sprintt.descripcion}</p>
                <p>Fecha inicio: {sprintt.fechaInicio} </p>
                <p>Fecha cierre: <b>{sprintt.fechaCierre}</b></p>
                <button onClick={handleCloseModal}>Cancelar</button>
            </div>
        </div>
    )
}
