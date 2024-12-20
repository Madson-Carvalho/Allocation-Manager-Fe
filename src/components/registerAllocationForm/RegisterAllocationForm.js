import { useState } from "react";
import httpPost from "../../utils/httpRequest/httpPost";
import EmployeeSelector from "../../pages/registerEmployees/EmployeeSelector";
import ProjectSelector from "../../pages/registerProject/ProjectSelector";
import CustomInput from "../customInput/CustomInput";
import CustomInputSubmit from "../customInputSubmit/CustomInputSubmit";
import Form from "../form/Form";

const RegisterAllocationForm = ({setReloadFlag, reloadFlag, setOpen}) => {
    const [disabled, setDisabled] = useState(false)
    const [allocationData, setAllocationData] = useState({
        employee: null,
        project: null,
        startDate: null,
        endDate: null,
        allocatedHours: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);

        allocationData.startDate = new Date(allocationData.startDate).toISOString();
        allocationData.endDate = new Date(allocationData.endDate).toISOString();
        allocationData.allocatedHours = parseInt(allocationData.allocatedHours);

        httpPost("allocations/allocate-employee-the-project", allocationData, setDisabled);

        setTimeout(() => {
            setReloadFlag(!reloadFlag);
            setOpen(false);
        }, 3000);
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setAllocationData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <EmployeeSelector
                required={true}
                setValue={(value) => handleChange({ target: { id: 'employee', value } })}
                usageContext="allocation-form-context"
            />
            <ProjectSelector
                required={true}
                setValue={(value) => handleChange({ target: { id: 'project', value } })}
                usageContext="allocation-form-context"
            />
            <CustomInput id='startDate' type='datetime-local' label='Data inicial' value={allocationData.startDate}
                required={true} onChange={handleChange} />
            <CustomInput id='endDate' type='datetime-local' label='Data final' value={allocationData.endDate}
                required={true} onChange={handleChange} />
            <CustomInput id='allocatedHours' type='number' label='Horas alocadas diariamente' value={allocationData.allocatedHours}
                         required={true} onChange={handleChange}/>
            <CustomInputSubmit disabled={disabled}/>
        </Form>
    )
}

export default RegisterAllocationForm;