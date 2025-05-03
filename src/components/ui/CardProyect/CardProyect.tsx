import { FC } from 'react'
import styles from "./CardProyect.module.css"
import { ISpring } from '../../../types/IInterfaces';


type ICardProyect = {
    spring: ISpring;
    handleCloseModal: () => void
}
export const CardProyect: FC<ICardProyect> = ({ spring, handleCloseModal }) => {

    return (
        <div className={styles.modalContainer}>
            <div className={styles.contentPopUp}>
                <p><b>Nombre: </b>{spring.nombre}</p>
                <p><b>Fecha inicio: </b>{spring.fecha_inicio}</p>
                <p><b>Fecha cierre: </b>{spring.fecha_cierre}</p>
                <p><b>Fecha color: </b>{spring.color}</p>
                <button onClick={handleCloseModal}>Cancelar</button>
            </div>
        </div>
    )
}
