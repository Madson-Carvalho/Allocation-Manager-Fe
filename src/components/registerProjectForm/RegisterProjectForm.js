import CustomInput from "../customInput/CustomInput";
import CustomInputSubmit from "../customInputSubmit/CustomInputSubmit";
import Form from "../form/Form";
import httpPost from "../../utils/httpRequest/httpPost";
import httpPut from "../../utils/httpRequest/httpPut";
import {useEffect, useState} from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import formatDateToInput from "../../utils/formatDate/formatDateToInput";

const RegisterProjectForm = ({isEditMode, idToEdit, setReloadFlag, reloadFlag, setOpen}) => {
    const [disabled, setDisabled] = useState(false)
    const [projectToSave, setProjectToSave] = useState({
        name: "",
        projectHours: "",
        projectCoordinator: "",
        fundingSource: "",
        totalProjectValue: "",
        initialDate: "",
        deliveryDate: ""
    });

    useEffect(() => {
        httpGet(`projects/find-by-id/${idToEdit}`, (data) => {
            if (data.initialDate) {
                data.initialDate = formatDateToInput(data.initialDate);
            }
            if (data.deliveryDate) {
                data.deliveryDate = formatDateToInput(data.deliveryDate);
            }

            setProjectToSave(data);
        })
    }, [idToEdit])

    const handleChange = (event) => {
        const {id, value} = event.target;
        setProjectToSave({...projectToSave, [id]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true) 

        const formattedData = {
            ...projectToSave,
            initialDate: new Date(projectToSave.initialDate).toISOString(),
            deliveryDate: new Date(projectToSave.deliveryDate).toISOString()
        };

        !isEditMode ? httpPost('projects/create-project', formattedData, setDisabled) : httpPut('projects/update-project', formattedData, setDisabled)
        setTimeout(() => {
            setReloadFlag(!reloadFlag);
            setOpen(false);
        }, 3000);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <CustomInput id='name' label='Nome' type='text' value={projectToSave.name} onChange={handleChange}
                         required={true}/>
            <CustomInput id='projectHours' label='Horas de projeto' type='number' value={projectToSave.projectHours}
                         required={true}
                         onChange={handleChange}/>
            <CustomInput id='projectCoordinator' label='Coordenador do projeto' type='text'
                         value={projectToSave.projectCoordinator}
                         onChange={handleChange} required={true}/>
            <CustomInput id='fundingSource' label='Fonte financiadora' type='text' required={true}
                         value={projectToSave.fundingSource} onChange={handleChange}/>
            <CustomInput id='totalProjectValue' label='Valor total do projeto' type='number' required={true}
                         value={projectToSave.totalProjectValue} onChange={handleChange}/>
            <CustomInput id='initialDate' label='Data inicial' type='date' required={true}
                         value={projectToSave.initialDate} onChange={handleChange}/>
            <CustomInput id='deliveryDate' label='Data final' type='date' required={true}
                         value={projectToSave.deliveryDate} onChange={handleChange}/>
            <CustomInputSubmit disabled={disabled}/>
        </Form>
    )
}

export default RegisterProjectForm;