import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import RegisterProject from "../pages/registerProject/RegisterProject";
import ListEmployees from "../pages/listEmployees/ListEmployees";
import RegisterEmployees from "../pages/registerEmployees/RegisterEmployees";
import GanttCharts from "../components/ganttCharts/GanttCharts";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/create-project' element={<RegisterProject/>}/>
            <Route path='/employees' element={<ListEmployees/>}/>
            <Route path='/create-employee' element={<RegisterEmployees/>}/>
            <Route path='/informations' element={<GanttCharts/>}/>
        </Routes>
    )
}

export default PersonRoutes;