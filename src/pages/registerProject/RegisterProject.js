import Form from "../../components/form/Form";
import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import BasePage from "../../components/basePage/BasePage";

const RegisterProject = () => {
    return (
        <BasePage title='Novo projeto'>
            <Form>
                <CustomInput id='name' name='name' type='text' label='Nome' placeholder=' '/>
                <CustomInput id='projectHours' name='projectHours' type='number' label='Horas de projeto' placeholder=' '/>
                <CustomInput id='projectCoordinator' name='projectCoordinator' type='text' label='Coordenador do projeto' placeholder=' '/>
                <CustomInput id='fundingSource' name='fundingSource' type='text' label='Fonte financiadora' placeholder=' '/>
                <CustomInput id='collaborators' name='collaborators' type='text' label='Colaboradores' placeholder=' '/>
                <CustomInput id='projectValue' name='projectValue' type='number' label='Valor total do projeto' placeholder=' '/>
                <CustomInput id='initialDate' name='initialDate' type='date' label='Data inicial' placeholder=' '/>
                <CustomInput id='finalDate' name='finalDate' type='date' label='Data final' placeholder=' '/>
                <CustomInputSubmit/>
            </Form>
        </BasePage>
    )
}

export default RegisterProject
