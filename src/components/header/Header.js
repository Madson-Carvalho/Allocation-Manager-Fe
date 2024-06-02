import "./Header.css";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressCard, faHome} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/favico.ico-removebg-preview.png";

const Header = () => {
    return (
        <header>
            <Link to={'/'}><img src={logo}/></Link>
            <nav>
                <Link to={'/'} title="Home"><FontAwesomeIcon icon={faHome} inverse/> home</Link>
                <Link to='/employees' title='Colaboradores'><FontAwesomeIcon icon={faAddressCard} inverse/> colaboradores</Link>
            </nav>
        </header>
    )
}

export default Header;