import './Main.css';
import {Link} from "react-router-dom";

const Main = ({children, title, url}) => {
    return (
        <main>
            <div className="headerPage">
                <h2>{title}</h2>
                {url && <Link to={url}>Novo</Link>}
            </div>
            {children}
        </main>
    )
}

export default Main;