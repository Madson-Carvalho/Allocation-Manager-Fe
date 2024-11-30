import {useEffect, useState} from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import httpPost from "../../utils/httpRequest/httpPost";
import httpPut from "../../utils/httpRequest/httpPut";
import CustomInput from "../customInput/CustomInput";
import CustomInputSubmit from "../customInputSubmit/CustomInputSubmit";
import Form from "../form/Form";

const RegisterEmployeeForm = ({isEditMode, idToEdit, setReloadFlag, reloadFlag, setOpen}) => {
    const [disabled, setDisabled] = useState(false)
    const [employeeData, setEmployeeData] = useState({
        name: null,
        email: null,
        workInSeconds: null,
        jobRole: null,
        wage: null,
        qualification: null,
        specializations: null
    });

    useEffect(() => {
        httpGet(`employees/find-by-id/${idToEdit}`, setEmployeeData)
    }, [idToEdit]);

    const handleChange = (event) => {
        const {id, value} = event.target;
        setEmployeeData({...employeeData, [id]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true) 

        !isEditMode ? httpPost('employees/create-employee', employeeData, setDisabled) : httpPut('employees/update-employee', employeeData, setDisabled)
        setTimeout(() => {
            setReloadFlag(!reloadFlag);
            setOpen(false);
        }, 3000);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <CustomInput id='name' type='text' label='Nome' required={true} value={employeeData.name}
                         onChange={handleChange}/>
            <CustomInput id='email' type='email' label='E-mail' required={true} value={employeeData.email}
                         onChange={handleChange}/>
            <CustomInput id='workInSeconds' type='number' label='Horas de trabalho' required={true}
                         value={employeeData.workInSeconds} onChange={handleChange}/>
            <CustomInput id='jobRole' type='text' label='Cargo' required={true} value={employeeData.jobRole}
                         onChange={handleChange}/>
            <CustomInput id='wage' type='number' label='Salário/h' value={employeeData.wage} onChange={handleChange}/>
            <CustomInput id='qualification' type='text' label='Formação' value={employeeData.qualification}
                         onChange={handleChange}/>
            <CustomInput id='specializations' type='text' label='Especializações' value={employeeData.specializations}
                         onChange={handleChange}/>
            <CustomInputSubmit disabled={disabled}/>
        </Form>
    )
}

export default RegisterEmployeeForm;