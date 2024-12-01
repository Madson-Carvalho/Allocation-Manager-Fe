import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import httpPost from "../../utils/httpRequest/httpPost";
import {useState} from "react";
import ProjectSelector from "../registerProject/ProjectSelector";
import EmployeeSelector from "../registerEmployees/EmployeeSelector";
import BasePage from "../../components/basePage/BasePage";
import {ToastContainer} from "react-toastify";
import Form from "../../components/form/Form";
import {useNavigate} from "react-router-dom";

const RegisterAllocation = () => {

    const [allocationData, setAllocationData] = useState({
        employee: null,
        project: null,
        startDate: null,
        endDate: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        allocationData.startDate = new Date(allocationData.startDate).toISOString();
        allocationData.endDate = new Date(allocationData.endDate).toISOString();

        httpPost("allocation/allocate-employee-the-project", allocationData);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setAllocationData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <BasePage title="Cadastrar Alocação">
            <Form onSubmit={handleSubmit}>
                <EmployeeSelector required={true}
                                  setValue={(value) => handleChange({target: {name: 'employee', value}})}/>
                <ProjectSelector required={true}
                                 setValue={(value) => handleChange({target: {name: 'project', value}})}/>
                <CustomInput id='startDate' name='startDate' type='datetime-local' label='Data inicial' placeholder=''
                             required={true} onChange={handleChange}/>
                <CustomInput id='endDate' name='endDate' type='datetime-local' label='Data final' placeholder=''
                             required={true} onChange={handleChange}/>
                <CustomInputSubmit/>
            </Form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BasePage>
    );
};

export default RegisterAllocation;