import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaProyecto from "../ui/ListaProyectos/ListaProyecto"

const PrincipalScreen = () => {
    return (
        <>
            <Header />
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <ListaProyecto />
                <ListaTareas />
            </div>
        </>
    )
}

export default PrincipalScreen
