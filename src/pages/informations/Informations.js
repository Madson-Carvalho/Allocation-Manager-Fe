import './Informations.css';
import BasePage from "../../components/basePage/BasePage";
import GanttCharts from '../../components/ganttCharts/GanttCharts';
import httpGet from "../../utils/httpRequest/httpGet";
import {useEffect, useState} from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";

const Informations = () => {
    const [data, setData] = useState(null);
    const [project, setProject] = useState(null);
    const [rows, setRows] = useState(null);

    useEffect(() => {
        httpGet("projects/find-all", setData);
    }, []);

    const columns = [
        {type: "string", label: "Task Name"},
        {type: "string", label: "Task ID"},
        {type: "date", label: "Start Date"},
        {type: "date", label: "End Date"},
        {type: "number", label: "Duration"},
        {type: "number", label: "Percent Complete"},
        {type: "string", label: "Dependencies"}
    ];

    useEffect(() => {
        if(project){
            const rows = ([
                project?.name,
                project?.projectCoordinator,
                new Date(project?.initialDate),
                new Date(project?.deliveryDate),
                null,
                null,
                ""
            ]);
            setRows(rows)
        }

    }, [project]);

    const handleProjetoChange = (event) => {
        const projetoSelecionado = data.find(p => p.id === parseInt(event.target.value));
        setProject(projetoSelecionado);
    };

    return (
        <>
            <BasePage title={project && project?.name}>
                {data && <CustomSelect label="" options={data} required={true} value={project?.id} onChange={handleProjetoChange} name="teste"/>}
                {rows && <GanttCharts columns={columns} rows={rows}/>}
            </BasePage>
        </>
    );
};

export default Informations;
