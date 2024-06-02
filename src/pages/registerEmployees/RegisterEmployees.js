import BasePage from "../../components/basePage/BasePage";
import Form from "../../components/form/Form";
import CustomInput from "../../components/customInput/CustomInput";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";

const RegisterEmployees = () => {
    return (
        <BasePage title='Novo colaborador'>
            <Form>
                <CustomInput id='name' name='name' type='text' label='Nome' placeholder=' '/>
                <CustomInput id='email' name='email' type='email' label='E-mail' placeholder=' '/>
                <CustomInput id='workHours' name='workHours' type='number' label='Horas de trabalho' placeholder=' '/>
                <CustomInput id='jobRole' name='jobRole' type='text' label='Cargo' placeholder=' '/>
                <CustomInput id='wage' name='wage' type='number' label='Salário/h' placeholder=' '/>
                <CustomInput id='academicEcation' name='academicEcation' type='text' label='Formação' placeholder=' '/>
                <CustomInput id='specializations' name='specializations' type='text' label='Especializações'
                             placeholder=' '/>
                <CustomInput id='seniority' name='seniority' type='text' label='Senioridade' placeholder=' '/>
                <CustomInputSubmit/>
            </Form>
        </BasePage>
    )
}

export default RegisterEmployees