import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrincipalScreen from './components/sreens/PrincipalScreen'
import ListaTareas from "./components/ui/ListaTareas/ListaTareas";
import Backlog from "./components/ui/BacklogPage/Backlog";

const appRouter = () => {
  return (
    
      <Routes>
        <Route path="/" element={<PrincipalScreen />} />
        <Route path="/tareas" element={<ListaTareas />} />
        <Route path="/backlog" element={<Backlog />} />
      </Routes>
    

)
}
export default appRouter