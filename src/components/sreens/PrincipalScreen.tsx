import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaProyecto from "../ui/ListaProyectos/ListaProyecto"
import { useEffect, useState } from "react";
import Backlog from "../ui/BacklogPage/Backlog";
import styles from './PrincipalScreen.module.css'
import { useSpring } from "../../hooks/useSpring";
import { springStore } from "../../store/springStore";

import { API_BACKLOG, API_SPRING } from "../../utils/constantes";
import useBacklog from "../../hooks/useBacklog";

const PrincipalScreen = () => {
    const [isBacklogView, setIsBacklogView] = useState(false);

    const { getSprings, springs } = useSpring();
    const { tareasBacklog, getTareasBacklog } = useBacklog()

    const springActivo = springStore((state) => state.springActivo);

    useEffect(() => {
        fetch(API_SPRING)
            .then((res) => res.json())
            .then(getSprings)
            .catch((err) => console.error(err));
    }, [springs]);

    useEffect(() => {
        fetch(API_BACKLOG)
            .then((res) => res.json())
            .then(getTareasBacklog)
            .catch((err) => console.error(err));
    }, [tareasBacklog]);

    useEffect(() => {

    }, [springActivo, springs])


    return (
        <>
            <Header />
            <div className={styles.containerPage}>
                <ListaProyecto setIsBacklogView={setIsBacklogView} isBacklogView={isBacklogView} />
                {
                    isBacklogView ? <ListaTareas /> : <Backlog />
                }
            </div>
        </>
    )
}

export default PrincipalScreen
