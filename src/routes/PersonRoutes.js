import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import ListEmployees from "../pages/listEmployees/ListEmployees";
import CalendarTimeline from "../pages/calendarTimeline/CalendarTimeline";
import RegisterAllocation from "../pages/registerAllocation/RegisterAllocation";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/employees' element={<ListEmployees/>}/>
            <Route path='/react-calendar-timeline' element={<CalendarTimeline/>}/>
            <Route path='/register-allocation' element={<RegisterAllocation/>}/>
        </Routes>
    )
}

export default PersonRoutes;