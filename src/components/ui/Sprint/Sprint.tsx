import { FC, useState } from 'react';
import { IProyecto } from '../../../types/IInterfaces'
import styles from './Sprint.module.css'
import { useProyecto } from '../../../hooks/useProyecto';
import { CardProyect } from '../CardProyect/CardProyect';
import { proyectoStrore } from '../../../store/proyectoStore';

type ISprinta = {
    proyecto: IProyecto;
    handleOpenModalEdit: (proyecto: IProyecto) => void;
}

const Sprint: FC<ISprinta> = ({ proyecto, handleOpenModalEdit }) => {

    const { eliminarProyecto } = useProyecto();

    const setProyectoActivo = proyectoStrore((state) => state.setProyectoActivo);

    const activo = () => {
        setProyectoActivo(null)
        setProyectoActivo(proyecto)
    }

    const [openModalView, setOpenModalView] = useState<boolean>(false)


    return (
        <>
            <div onClick={activo} className={styles.containerSprint}>
                <b><h3>nombre: </h3>{proyecto.nombre}</b>
                <b><h3>descripcion: </h3>{proyecto.descripcion}</b>
                <p><b>inicio: </b>{proyecto.fechaInicio}</p>
                <p><b>cierre: </b>{proyecto.fechaCierre}</p>
                <div className={styles.containerBotones}>

                    <div className={styles.botones}>
                        <button
                            onClick={() => setOpenModalView(true)}
                            className={styles.botonAzul}>
                            <span className="material-symbols-outlined">visibility</span>
                        </button>
                        <button
                            onClick={() => handleOpenModalEdit(proyecto)}
                            className={styles.botonAzul}>
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                            onClick={() => eliminarProyecto(proyecto.id!)}
                            className={styles.botonRojo}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
            </div>

            {
                openModalView &&
                <CardProyect
                    sprintt={proyecto}
                    handleCloseModal={() => setOpenModalView(false)}
                />
            }
        </>
    )
}

export default Sprint
