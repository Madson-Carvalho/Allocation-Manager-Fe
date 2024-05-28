import './CustomInput.css';

const CustomInput = ({type, name, id, label, placeholder}) => {

    return (
        <div className="input-group defaultInputs">
            <input type={type} name={name} id={id} placeholder={placeholder}/>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomInput