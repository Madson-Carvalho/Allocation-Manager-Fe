import './CustomMultiSelect.css';

const CustomMultiSelect = ({name, id, options, label, required, onChange, value}) => {
    options = [
        {name: "Item1", value: 10},
        {name: "Item2", value: 20},
        {name: "Item3", value: 30},
        {name: "Item4", value: 40},
        {name: "Item5", value: 50},
        {name: "Item6", value: 60},
        {name: "Item7", value: 70}
    ];


    // uma opção é deixar todo o objeto como value, não sei se isso é possível, mas vale a tentativa
    return (
        <div className="input-group defaultInputs">
            <select className='multiselect' name={name} id={id} value={value} required={required} onChange={onChange}>
                <option value={''}>-- Selecione uma opção --</option>
                {options.map(option => (
                    <option value={option.value}>{option.name}</option>
                ))}
            </select>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomMultiSelect;