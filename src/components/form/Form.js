import './Form.css';

const Form = ({children, onSubmit}) => {
    return (
        <form className='custom-form' onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form