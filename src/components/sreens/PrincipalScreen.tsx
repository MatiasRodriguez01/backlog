import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaProyecto from "../ui/ListaProyectos/ListaProyecto"
import { useEffect, useState } from "react";
import Backlog from "../ui/BacklogPage/Backlog";
import styles from './PrincipalScreen.module.css'
import { useProyecto } from "../../hooks/useProyecto";

const PrincipalScreen = () => {
    const [isBacklogView, setIsBacklogView] = useState(()=>{
        const saved = localStorage.getItem('isBacklogView');
        return saved === "true"
    });
    const { proyectoActivo, proyectos } = useProyecto()


    useEffect(() => {
        console.log("Proyecto activo: ", proyectoActivo)
    }, [ proyectoActivo, proyectos])

    useEffect(() => {
        localStorage.setItem('isBacklogView', isBacklogView.toString());
    }, [isBacklogView]);

 
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
