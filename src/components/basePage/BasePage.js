import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";

const BasePage = ({children, title, onClick}) => {
    return (
        <>
            <Header/>
            <Main title={title} onClick={onClick}>
                {children}
            </Main>
            <Footer/>
        </>
    )
}

export default BasePage