import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaProyecto from "../ui/ListaProyectos/ListaProyecto"
import { useState } from "react";
import Backlog from "../ui/BacklogPage/Backlog";

const PrincipalScreen = () => {
    const [isBacklogView, setIsBacklogView] = useState(false);
    return (
        <>
            <Header />
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <ListaProyecto setIsBacklogView={setIsBacklogView} isBacklogView={isBacklogView} />
                <div>
                    {isBacklogView ? <Backlog/> : <ListaTareas/>}
                </div>
            </div>
        </>
    )
}

export default PrincipalScreen
