import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaProyecto from "../ui/ListaProyectos/ListaProyecto"
import { useEffect, useState } from "react";
import Backlog from "../ui/BacklogPage/Backlog";

import styles from './PrincipalScreen.module.css'
import { useProyecto } from "../../hooks/useProyecto";

const PrincipalScreen = () => {
    const [isBacklogView, setIsBacklogView] = useState(false);
    const { proyectoActivo, proyectos } = useProyecto()

    useEffect(() => {
        console.log("Proyecto activo: ", proyectoActivo)
    }, [ proyectoActivo, proyectos])
 
    return (
        <>
            <Header />
            <div className={styles.containerPage}>
                <ListaProyecto setIsBacklogView={setIsBacklogView} isBacklogView={isBacklogView} />
                {
                    isBacklogView ? <Backlog /> : <ListaTareas />
                }
            </div>
        </>
    )
}

export default PrincipalScreen
