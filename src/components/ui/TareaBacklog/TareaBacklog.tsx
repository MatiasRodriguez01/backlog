import { FC, useEffect, useState } from "react";
import styles from './TareaBacklog.module.css'
import backlogStore from "../../../store/backlogStore";
import useBacklog from "../../../hooks/useBacklog";
import { CardTarea } from "../CardTarea/CardTarea";
import { ITarea } from "../../../types/IInterfaces";
import useTareas from "../../../hooks/useTareas";
import { useSpring } from "../../../hooks/useSpring";

interface ITareaCard {
    tarea: ITarea;
    handleOpenModalEdit: (tarea: ITarea) => void;
}


const TareaBacklog: FC<ITareaCard> = ({ tarea, handleOpenModalEdit }) => {


    const [openModalView, setOpenModalView] = useState<boolean>(false)

    const tareaBacklogActiva = backlogStore((state) => state.tareaBacklogActiva)

    const { springs } = useSpring()
    const { deleteTareaBacklog } = useBacklog();
    const { postCrearTarea } = useTareas()

    const [selectValue, setSelectValue] = useState<string>(); 

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectSpring = e.target.value;
        if (selectSpring ) setSelectValue(selectSpring);
    };
    const handleEnviarSpring = (spring: string, task: ITarea) => {
        if (spring) {
            // sacarTaskBacklogASpring(idSpring, task)
            console.log(spring)
            console.log(task)
            const { _id, color, descripcion, estado, fechaLimite, titulo }  = task
            const newTask = { _id_:, color, descripcion, estado, fechaLimite, titulo }

            postCrearTarea(spring, newTask)
        }
    }

    useEffect(() => {
        if (tareaBacklogActiva) {
            console.log("Nueva tarea activa:", tareaBacklogActiva);
        }
    }, [tareaBacklogActiva]);


    return (
        <>
            <div className={styles.tareaContainer} >
                <div className={styles.titulos}>
                    <p>nombre: {tarea.titulo}</p>
                    <p>descripcion: {tarea.descripcion}</p>
                </div>
                <div className={styles.botones}>
                    <button onClick={() => handleEnviarSpring(selectValue!, tarea)} className={styles.botonEnviarProyecto}>enviar a proyectos</button>
                    <select value={selectValue} onChange={handleChangeSelect}>
                        <option value="default" disabled>
                            Seleccione un proyecto
                        </option>
                        {
                            springs ? (
                                springs.map((spring) =>
                                    <option key={spring._id} value={spring._id}>{spring.nombre}</option>
                                )
                            ) : (
                                <option value="">No hay springs</option>
                            )
                        }
                    </select>
                    <button onClick={() => setOpenModalView(true)} className={styles.azul}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button onClick={() => handleOpenModalEdit(tarea)} className={styles.azul}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={() => deleteTareaBacklog(tarea._id!)} className={styles.red}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
            {
                openModalView &&
                <CardTarea
                    tareaa={tarea}
                    handleCloseModal={() => setOpenModalView(false)}
                />
            }
        </>
    );
};

export default TareaBacklog
