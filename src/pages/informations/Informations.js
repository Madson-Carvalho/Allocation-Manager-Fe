import './Informations.css';
import BasePage from "../../components/basePage/BasePage";
import GanttCharts from '../../components/ganttCharts/GanttCharts';


const Informations = () => {
    return (
        <BasePage url='/gantt-charts' title={'hello'}>
            <GanttCharts/>
        </BasePage>
    )
}

export default Informations;