import './CustomInput.css';

const CustomInput = ({type, name, id, label, placeholder, required, onChange, value}) => {

    return (
        <div className="input-group defaultInputs">
            <input type={type} name={name} id={id} required={required} value={value} onChange={onChange}
                   placeholder={placeholder}/>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomInput