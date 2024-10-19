import './Main.css';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';

const Main = ({ children, title, url }) => {
    return (
        <main>
            <div className="headerPage">
                <h2>{title}</h2>
                {url && <Link to={url}>
                    <IconButton aria-label="add">
                        <Add />
                    </IconButton>
                </Link>}
            </div>
            {children}
        </main>
    )
}

export default Main;
