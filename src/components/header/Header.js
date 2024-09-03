import "./Header.css";
import {Link, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faHome, faChartGantt} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/favico.ico-removebg-preview.png";
import getPath from "../../utils/getPath";

const Header = () => {
    const currentPath = useLocation();
    return (
        <header>
            <Link to={'/'}><img src={logo}/></Link>
            <nav>
                <Link to={'/'} title="Home" className={getPath('/', currentPath) ? "selected" : ""}>home</Link>
                <Link to='/employees' title='Colaboradores'>colaboradores</Link>
                <Link to={'/informations'} title="Gantt">gantt</Link>
            </nav>
        </header>
    )
}

export default Header;