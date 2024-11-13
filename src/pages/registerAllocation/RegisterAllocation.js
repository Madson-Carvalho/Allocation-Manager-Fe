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
import formatDateToInput from "../../utils/formatDate/formatDateToInput";

const RegisterAllocation = () => {

    const navigate = useNavigate();

    const [allocationData, setAllocationData] = useState({
        employee: null,
        project: null,
        startDate: null,
        endDate: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        let startDateFormat = new Date(allocationData.startDate).toISOString().slice(0, 19) + 'Z';
        let endDateFormat = new Date(allocationData.endDate).toISOString().slice(0, 19) + 'Z';

        setAllocationData({
            ...allocationData,
            startDate: startDateFormat,
            endDate: endDateFormat
        });

        httpPost('/allocate-employee-the-project', allocationData)
        setTimeout(() => {
            navigate('/react-calendar-timeline');
        }, 3000);
    }

    const handleChange = (event) => {
        setAllocationData({...allocationData, [event.target.name]: event.target.value})
    }

    const handleChange2 = (employee) => {
        setAllocationData({...allocationData, employee: employee})
    }

    const handleChange3 = (project) => {
        setAllocationData({...allocationData, project: project})
    }

    return (
        <BasePage title="Cadastrar Alocação">
            <Form onSubmit={handleSubmit}>
                <EmployeeSelector title="Colaborador" required={true} setValue={handleChange2}/>
                <ProjectSelector title="Projeto" required={true} setValue={handleChange3}/>
                <CustomInput id='startDate' name='startDate' type='datetime-local' label='Data inicial' placeholder='' required={true} onChange={handleChange}/>
                <CustomInput id='endDate' name='endDate' type='datetime-local' label='Data final' placeholder='' required={true} onChange={handleChange}/>
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