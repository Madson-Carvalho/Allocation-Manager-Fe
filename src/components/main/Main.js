import './Main.css';

const Main = ({children, title}) => {
    return (
        <main>
            <h2>{title}</h2>
            {children}
        </main>
    )
}

export default Main;