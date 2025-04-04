import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaProyecto from "../ui/ListaProyectos/ListaProyecto"
import { useState } from "react";
import Backlog from "../ui/BacklogPage/Backlog";
import styles from './PrincipalScreen.module.css'

const PrincipalScreen = () => {
    const [isBacklogView, setIsBacklogView] = useState(false);
    return (
        <>
            <Header />
            <div className={styles.containerPage}>
                <ListaProyecto setIsBacklogView={setIsBacklogView} isBacklogView={isBacklogView} />
                {
                    isBacklogView ?  <ListaTareas /> : <Backlog />
                }
            </div>
        </>
    )
}

export default PrincipalScreen
