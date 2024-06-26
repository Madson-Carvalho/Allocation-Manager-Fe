import './CustomSelect.css';

const CustomSelect = ({name, id, options, label, required, onChange, value, style}) => {
    return (
        <div className="input-group defaultInputs" style={style}>
            <select name={name} id={id} value={value} required={required} onChange={onChange}>
                <option value={''}>-- Selecione uma opção --</option>
                {options.map(option => (
                    <option value={option.value}>{option.name}</option>
                ))}
            </select>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomSelect