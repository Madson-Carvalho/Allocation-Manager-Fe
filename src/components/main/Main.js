import './Main.css';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';

const Main = ({children, title, onClick}) => {
    const buttonStyle = {
        alignSelf: 'flex-end',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '4rem',
        height: '2.5rem',
        backgroundColor: '#2A63A9',
        paddingTop: '-2rem',
        textDecoration: 'none',
        borderRadius: '1.5rem'
    }

    return (
        <main>
            <div className="headerPage">
                <h2>{title}</h2>
                <IconButton aria-label="add" onClick={onClick} style={buttonStyle}>
                    <Add/>
                </IconButton>
            </div>
            {children}
        </main>
    )
}

export default Main;
