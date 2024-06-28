import Form from "../../components/form/Form";
import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import BasePage from "../../components/basePage/BasePage";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import httpPost from "../../utils/httpRequest/httpPost";
import {ToastContainer} from "react-toastify";
import httpGet from "../../utils/httpRequest/httpGet";
import formatDateToInput from "../../utils/formatDate/formatDateToInput";
import httpPut from "../../utils/httpRequest/httpPut";

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

    const { id } = useParams();
    const isEditMode = !!id;

    const navigate = useNavigate();

    useEffect(() => {
        httpGet(`projects/find-by-id/${id}`, setProjectToSave)
    }, [id])

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

        !isEditMode ? httpPost('projects/create-project', formattedData) : httpPut('projects/update-project', formattedData)
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }

    return (
        <BasePage title='Novo projeto'>
            <Form onSubmit={handleSubmit}>
                <CustomInput id='name' name='name' type='text' label='Nome' placeholder=' ' required={true}
                             value={projectToSave.name} onChange={handleChange}/>
                <CustomInput id='projectHours' name='projectHours' type='number' label='Horas de projeto'
                             placeholder=' ' required={true} value={projectToSave.projectHours} onChange={handleChange}/>
                <CustomInput id='projectCoordinator' name='projectCoordinator' type='text'
                             label='Coordenador do projeto' placeholder=' ' required={true} value={projectToSave.projectCoordinator} onChange={handleChange}/>
                <CustomInput id='fundingSource' name='fundingSource' type='text' label='Fonte financiadora'
                             placeholder=' ' required={true} value={projectToSave.fundingSource} onChange={handleChange}/>
                {/*<CustomInput id='employees' name='employees' type='text' label='Colaboradores' placeholder=' '/>*/}
                <CustomInput id='totalProjectValue' name='totalProjectValue' type='number'
                             label='Valor total do projeto'
                             placeholder=' ' required={true} value={projectToSave.totalProjectValue} onChange={handleChange}/>
                <CustomInput id='initialDate' name='initialDate' type='date' label='Data inicial' placeholder=' '
                             required={true} value={formatDateToInput(projectToSave.initialDate)} onChange={handleChange}/>
                <CustomInput id='deliveryDate' name='deliveryDate' type='date' label='Data final' placeholder=' '
                             required={true} value={formatDateToInput(projectToSave.deliveryDate)} onChange={handleChange}/>
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