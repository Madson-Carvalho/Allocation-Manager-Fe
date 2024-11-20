import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import ListEmployees from "../pages/listEmployees/ListEmployees";
import Informations from "../pages/informations/Informations";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/employees' element={<ListEmployees/>}/>
            <Route path='/informations' element={<Informations/>}/>
        </Routes>
    )
}

export default PersonRoutes;