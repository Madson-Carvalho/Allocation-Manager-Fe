import './Informations.css';
import BasePage from "../../components/basePage/BasePage";
import GanttCharts from '../../components/ganttCharts/GanttCharts';


const Informations = () => {
    return (
        <BasePage title={'Projeto Alpha'}>
            <GanttCharts/>
        </BasePage>
    )
}

export default Informations;