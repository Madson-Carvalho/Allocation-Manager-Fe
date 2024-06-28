import BasePage from "../../components/basePage/BasePage";
import Form from "../../components/form/Form";
import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import {useState} from "react";
import httpPost from "../../utils/httpRequest/httpPost";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";

const RegisterEmployees = () => {
    const [employeeData, setEmployeeData] = useState({
        name: null,
        email: null,
        workeHours: null,
        jobRole: null,
        wage: null,
        qualification: null,
        specializations: null
    })

    const navigate = useNavigate();

    const handleChange = (event) => {
        setEmployeeData({...employeeData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        httpPost('employees/create-employee', employeeData);
        setTimeout(() => {
            navigate('/employees');
        }, 3000);
    }

    return (
        <BasePage title='Novo colaborador'>
            <Form onSubmit={handleSubmit}>
                <CustomInput id='name' name='name' type='text' label='Nome' placeholder=' ' required={true}
                             onChange={handleChange}/>
                <CustomInput id='email' name='email' type='email' label='E-mail' placeholder=' ' required={true}
                             onChange={handleChange}/>
                <CustomInput id='workHours' name='workHours' type='number' label='Horas de trabalho' placeholder=' '
                             required={true} onChange={handleChange}/>
                <CustomInput id='jobRole' name='jobRole' type='text' label='Cargo' placeholder=' ' required={true}
                             onChange={handleChange}/>
                <CustomInput id='wage' name='wage' type='number' label='Salário/h' placeholder=' '
                             onChange={handleChange}/>
                <CustomInput id='qualification' name='qualification' type='text' label='Formação' placeholder=' '
                             onChange={handleChange}/>
                <CustomInput id='specializations' name='specializations' type='text' label='Especializações'
                             placeholder=' ' onChange={handleChange}/>
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
    )
}

export default RegisterEmployees