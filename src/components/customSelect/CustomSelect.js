import './CustomSelect.css';

const CustomSelect = ({name, id, options, label}) => {
    return (
        <div className="input-group defaultInputs">
            <select name={name} id={id}>
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