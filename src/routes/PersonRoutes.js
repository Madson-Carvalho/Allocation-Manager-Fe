import {Route, Routes} from "react-router-dom";
import Home from "../pages/home/Home";
import RegisterProject from "../pages/registerProject/RegisterProject";

const PersonRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/create-project' element={<RegisterProject/>}/>
        </Routes>
    )
}

export default PersonRoutes;