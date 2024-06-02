import './Form.css';

const Form = ({children}) => {
    return (
        <form className='custom-form'>
            {children}
        </form>
    )
}

export default Form