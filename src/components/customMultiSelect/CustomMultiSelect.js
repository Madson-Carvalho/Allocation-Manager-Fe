import './CustomMultiSelect.css';

const CustomMultiSelect = ({name, id, options, label, required, onChange, value}) => {
    options = [
        {
            "employeeId": "1ee60e4c-57c3-4fb1-b286-7080f7655697",
            "name": "Maria",
            "email": "maria@email.com",
            "workeHours": 40.0,
            "jobRole": "Desenvolvedora",
            "wage": 50000.0,
            "qualification": "ADS",
            "specializations": "Front End",
            "projects": []
        },
        {
            "employeeId": "2d540e4b-653b-450c-b016-6560f6849283",
            "name": "João",
            "email": "joao@email.com",
            "workeHours": 40.0,
            "jobRole": "Gerente",
            "wage": 50000.0,
            "qualification": "Adm",
            "specializations": "Agilidade",
            "projects": []
        },
        {
            "employeeId": "52c67ef4-3ce4-4849-9a56-fc4bfbbdc7c3",
            "name": "Khalifa do Brega",
            "email": "khalifa@email.com",
            "workeHours": 0.0,
            "jobRole": "Desenvolvedor",
            "wage": 40.0,
            "qualification": "ADS",
            "specializations": "Back End",
            "projects": []
        },
        {
            "employeeId": "cf08b871-70ed-48ce-bb2c-79043c60aec2",
            "name": "Lúcifer",
            "email": "estrela@manha.com.br",
            "workeHours": 0.0,
            "jobRole": "Analista",
            "wage": 5000.0,
            "qualification": "ADS",
            "specializations": "Back End",
            "projects": []
        }
    ]

    // uma opção é deixar todo o objeto como value, não sei se isso é possível, mas vale a tentativa
    return (
        <div className="input-group defaultInputs">
            <select className='multiselect' name={name} id={id} value={value} required={required} onChange={onChange}>
                <option value={''}>-- Selecione uma opção --</option>
                {options.map((option, index) => (
                    <option key={index} value={option[index]}>{option.name}</option>
                ))}
            </select>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomMultiSelect;