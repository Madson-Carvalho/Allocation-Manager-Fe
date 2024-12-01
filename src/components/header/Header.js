import "./Header.css";
import {Link, useLocation} from "react-router-dom";
import logo from "../../assets/images/favico.ico-removebg-preview.png";
import getPath from "../../utils/getPath";

const Header = () => {
    const currentPath = useLocation();
    return (
        <header>
            <Link to={'/'}><img src={logo}/></Link>
            <nav>
                <Link to={'/'} title="Home" className={getPath('/', currentPath) ? "selected" : ""}>home</Link>
                <Link to='/employees' title="Colaboradores" className={getPath('/employees', currentPath) ? "selected" : ""}>colaboradores</Link>
                <Link to={'/react-calendar-timeline'} title="Gantt" className={getPath('/react-calendar-timeline', currentPath) ? "selected" : ""}>gantt</Link>
            </nav>
        </header>
    )
}

export default Header;