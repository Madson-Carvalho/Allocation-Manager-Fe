import Form from "../../components/form/Form";
import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import BasePage from "../../components/basePage/BasePage";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import httpPost from "../../utils/httpRequest/httpPost";
import {ToastContainer} from "react-toastify";

const RegisterProject = () => {
    const [projectToSave, setProjectToSave] = useState({
        name: null,
        projectHours: null,
        projectCoordinator: null,
        fundingSource: null,
        totalProjectValue: null,
        initialDate: null,
        deliveryDate: null
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setProjectToSave({...projectToSave, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            ...projectToSave,
            initialDate: new Date(projectToSave.initialDate).toISOString(),
            deliveryDate: new Date(projectToSave.deliveryDate).toISOString()
        };

        httpPost('projects/create-project', formattedData);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }

    return (
        <BasePage title='Novo projeto'>
            <Form onSubmit={handleSubmit}>
                <CustomInput id='name' name='name' type='text' label='Nome' placeholder=' ' required={true}
                             onChange={handleChange}/>
                <CustomInput id='projectHours' name='projectHours' type='number' label='Horas de projeto'
                             placeholder=' ' required={true} onChange={handleChange}/>
                <CustomInput id='projectCoordinator' name='projectCoordinator' type='text'
                             label='Coordenador do projeto' placeholder=' ' required={true} onChange={handleChange}/>
                <CustomInput id='fundingSource' name='fundingSource' type='text' label='Fonte financiadora'
                             placeholder=' ' required={true} onChange={handleChange}/>
                {/*<CustomInput id='employees' name='employees' type='text' label='Colaboradores' placeholder=' '/>*/}
                <CustomInput id='totalProjectValue' name='totalProjectValue' type='number'
                             label='Valor total do projeto'
                             placeholder=' ' required={true} onChange={handleChange}/>
                <CustomInput id='initialDate' name='initialDate' type='date' label='Data inicial' placeholder=' '
                             required={true} onChange={handleChange}/>
                <CustomInput id='deliveryDate' name='deliveryDate' type='date' label='Data final' placeholder=' '
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
    )
}

export default RegisterProject