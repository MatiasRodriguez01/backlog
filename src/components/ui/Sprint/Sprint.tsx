import { FC, useState } from 'react';
import { ISpring } from '../../../types/IInterfaces'
import styles from './Sprint.module.css'
import { useSpring } from '../../../hooks/useSpring';
import { CardProyect } from '../CardProyect/CardProyect';
import { springStore } from '../../../store/springStore';

type ISprinta = {
    spring: ISpring;
    handleOpenModalEdit: (proyecto: ISpring) => void;
}

const Sprint: FC<ISprinta> = ({ spring, handleOpenModalEdit }) => {

    const { eliminarString } = useSpring();

    const setSpringActivo = springStore((state) => state.setSpringActivo);

    const activo = () => {
        setSpringActivo(null)
        setSpringActivo(spring)
    }

    const [openModalView, setOpenModalView] = useState<boolean>(false)


    return (
        <>
            <div onClick={activo} className={styles.containerSprint}>
                <p><b>nombre: </b>{spring.nombre}</p>
                <p><b>inicio: </b>{spring.fecha_inicio}</p>
                <p><b>cierre: </b>{spring.fecha_cierre}</p>
                <div className={styles.containerBotones}>

                    <div className={styles.botones}>
                        <button
                            onClick={() => setOpenModalView(true)}
                            className={styles.botonAzul}>
                            <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button
                            onClick={() => handleOpenModalEdit(spring)}
                            className={styles.botonAzul}>
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                            onClick={() => eliminarString(spring._id!)}
                            className={styles.botonRojo}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>

            {
                openModalView &&
                <CardProyect
                    spring={spring}
                    handleCloseModal={() => setOpenModalView(false)}
                />
            }
        </>
    )
}

export default Sprint
