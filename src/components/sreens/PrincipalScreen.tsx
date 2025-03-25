import Header from "../ul/header/Header"
import ListaTareas from "../ul/ListaTareas/ListaTareas"
import ListaSprints from "../ul/ListaSprints/ListaSprints"

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
