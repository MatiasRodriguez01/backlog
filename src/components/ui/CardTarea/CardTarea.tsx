import { FC } from 'react'
import styles from "./CardTarea.module.css"
import { ITarea } from '../../../types/IInterfaces';



type ICardTarea = {
    tareaa: ITarea;
    handleCloseModal: () => void
}
export const CardTarea: FC<ICardTarea> = ({ tareaa, handleCloseModal }) => {

    return (
        <div className={styles.modalContainer}>
            <div className={styles.contentPopUp}>
                <h2>{tareaa.titulo}</h2>
                <p>Descripcion: {tareaa.descripcion}</p>
                <p>Fecha Limite: {tareaa.fechaLimite} </p>
                <button onClick={handleCloseModal}>Cancelar</button>
            </div>
        </div>
    )
}
