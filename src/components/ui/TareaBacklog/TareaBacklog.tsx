import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from './TareaBacklog.module.css'
import { ITarea, ITareaBacklog } from "../../../types/IInterfaces";
import { useProyecto } from "../../../hooks/useProyecto";
import backlogStore from "../../../store/backlogStore";
import useBacklog from "../../../hooks/useBacklog";
import { CardTarea } from "../CardTarea/CardTarea";

interface ITareaCard {
    tarea: ITareaBacklog;
    handleOpenModalEdit: (tarea: ITareaBacklog) => void;
}


const TareaBacklog: FC<ITareaCard> = ({ tarea, handleOpenModalEdit }) => {

    const [openModalView, setOpenModalView] = useState<boolean>(false)

    const { proyectos } = useProyecto();

    const setTareaActivaBacklog = backlogStore((state) => state.setTareaActivaBacklog)

    const { sacarTareaDelBacklog, deleteTareaBacklog, putEditarTareaBacklog, tareaBacklogActiva } = useBacklog();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nombreProyectoSeleccionado = e.target.value;
    
        putEditarTareaBacklog({
            ...tarea,
            string: nombreProyectoSeleccionado,
        });
    
        setTareaActivaBacklog(null); // opcional
    };

    const handleChangeSacarDelBacklog = (tareaEnviar: ITareaBacklog) => {
        if (tareaEnviar.string) {
            const proyecto = proyectos.find((tarea) => tarea.nombre === tareaEnviar.string);
            if (proyecto) {
                const { id, titulo, descripcion, estado, fechaLimite } = tareaEnviar
                const nuevaTarea: ITarea = {
                    id: id,
                    idProyecto: proyecto.id!,
                    titulo: titulo,
                    descripcion: descripcion,
                    estado: estado,
                    fechaLimite: fechaLimite
                }

                sacarTareaDelBacklog(tareaEnviar, nuevaTarea);

            } else {
                console.log("No se envio el proyecto!")
            }
        } else {
            alert("Ingrese una string!!")
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
                    <button onClick={() => handleChangeSacarDelBacklog(tarea)} className={styles.botonEnviarProyecto}>enviar a proyectos</button>
                    <select onChange={handleChange} defaultValue="">
                        <option value="" disabled>
                            Seleccione un proyecto
                        </option>
                        {
                            proyectos ? (
                                proyectos.map((proyecto) => (

                                    <option key={proyecto.id} value={proyecto.nombre}>{proyecto.nombre}</option>
                                ))
                            ) : (
                                <option value="">no hay opciones</option>
                            )
                        }
                    </select>
                    <button onClick={() => setOpenModalView(true)} className={styles.azul}>
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                    <button onClick={() => handleOpenModalEdit(tarea)} className={styles.azul}>
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button onClick={() => deleteTareaBacklog(tarea.id!)} className={styles.red}>
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
