import BasePage from "../../components/basePage/BasePage";
import Form from "../../components/form/Form";
import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import {useEffect, useState} from "react";
import httpPost from "../../utils/httpRequest/httpPost";
import {useNavigate, useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import httpGet from "../../utils/httpRequest/httpGet";
import httpPut from "../../utils/httpRequest/httpPut";

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

    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();

    useEffect(() => {
        httpGet(`employees/find-by-id/${id}`, setEmployeeData)
    }, [id])

    const handleChange = (event) => {
        setEmployeeData({...employeeData, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        !isEditMode ? httpPost('employees/create-employee', employeeData) : httpPut('employees/update-employee',employeeData);
        setTimeout(() => {
            navigate('/employees');
        }, 3000);
    }

    return (
        <BasePage title='Novo colaborador'>
            <Form onSubmit={handleSubmit}>
                <CustomInput id='name' name='name' type='text' label='Nome' placeholder=' ' required={true}
                             value={employeeData.name} onChange={handleChange}/>
                <CustomInput id='email' name='email' type='email' label='E-mail' placeholder=' ' required={true}
                             value={employeeData.email} onChange={handleChange}/>
                <CustomInput id='workeHours' name='workeHours' type='number' label='Horas de trabalho' placeholder=' '
                             required={true} value={employeeData.workeHours} onChange={handleChange}/>
                <CustomInput id='jobRole' name='jobRole' type='text' label='Cargo' placeholder=' ' required={true}
                             value={employeeData.jobRole} onChange={handleChange}/>
                <CustomInput id='wage' name='wage' type='number' label='Salário/h' placeholder=' '
                             value={employeeData.wage} onChange={handleChange}/>
                <CustomInput id='qualification' name='qualification' type='text' label='Formação' placeholder=' '
                             value={employeeData.qualification} onChange={handleChange}/>
                <CustomInput id='specializations' name='specializations' type='text' label='Especializações'
                             placeholder=' ' value={employeeData.specializations} onChange={handleChange}/>
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