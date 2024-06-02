import Header from "../header/Header";
import Main from "../main/Main";
import Footer from "../footer/Footer";

const BasePage = ({children, title, url}) => {
    return (
        <>
            <Header/>
            <Main title={title} url={url}>
                {children}
            </Main>
            <Footer/>
        </>
    )
}

export default BasePage