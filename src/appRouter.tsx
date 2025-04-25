import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrincipalScreen from './components/sreens/PrincipalScreen'

const appRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrincipalScreen />} />
      </Routes>

    </BrowserRouter>

  )
}
export default appRouter