import Header from "../ui/header/Header"
import ListaTareas from "../ui/ListaTareas/ListaTareas"
import ListaSprints from "../ui/ListaSprints/ListaSprints"

const PrincipalScreen = () => {
    return (
        <>
            <Header />
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <ListaSprints />
                <ListaTareas />
            </div>
        </>
    )
}

export default PrincipalScreen
