import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faHome, faChartGantt, faProjectDiagram} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/favico.ico-removebg-preview.png";

const Header = () => {
    return (
        <header>
            <Link to={'/'}><img src={logo}/></Link>
            <nav>
                <Link to={'/'} title="Home"><FontAwesomeIcon icon={faHome} inverse/> home</Link>
                <Link to={'/list-projects'} title="Projetos"><FontAwesomeIcon icon={faProjectDiagram} inverse/> projetos</Link>
                <Link to='/employees' title='Colaboradores'><FontAwesomeIcon icon={faAddressCard} inverse/> colaboradores</Link>
                <Link to={'/informations'} title="Gráfico de gantt"><FontAwesomeIcon icon={faChartGantt} inverse/> gantt</Link>
            </nav>
        </header>
    )
}

export default Header;