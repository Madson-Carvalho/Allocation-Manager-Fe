import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import RegisterProject from "../pages/registerProject/RegisterProject";
import ListEmployees from "../pages/listEmployees/ListEmployees";
import RegisterEmployees from "../pages/registerEmployees/RegisterEmployees";
import Informations from "../pages/informations/Informations";
import ListProjects from "../pages/listProjects/ListProjects";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/list-projects' element={<ListProjects/>}/>
            <Route path='/create-project' element={<RegisterProject/>}/>
            <Route path='/employees' element={<ListEmployees/>}/>
            <Route path='/create-employee' element={<RegisterEmployees/>}/>
            <Route path='/informations' element={<Informations/>}/>
        </Routes>
    )
}

export default PersonRoutes;