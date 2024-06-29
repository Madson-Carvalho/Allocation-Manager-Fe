import './Informations.css';
import BasePage from "../../components/basePage/BasePage";
import GanttCharts from '../../components/ganttCharts/GanttCharts';
import httpGet from "../../utils/httpRequest/httpGet";
import {useEffect, useState} from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";
import Modal from "../../components/modal/Modal";

const Informations = () => {
    const [data, setData] = useState(null);
    const [project, setProject] = useState(null);
    const [rows, setRows] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    //#region Dados aleatorios
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomDateInRange(startDate, endDate) {
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();
        const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
        return new Date(randomTimestamp);
    }
    //#endregion

    useEffect(() => {

        if(project && project.employees.length === 0){
            setShowModal(true)
        }

        if (project && project.employees.length > 0) {
            const row = project.employees.map(employee => ([
                employee.name,
                employee.name,
                getRandomDateInRange(new Date('2024-01-01'), new Date('2024-06-01')),
                getRandomDateInRange(new Date('2024-06-31'), new Date('2024-12-31')),
                getRandomInt(50, 100),
                getRandomInt(0, 100),
                null
            ]));
            setRows(row);
            setShowModal(false);
        }else{
            setRows(null);
        }

    }, [project]);

    const handleProjetoChange = (event) => {
        setProject(null);
        const projetoSelecionado = data.find(p => p?.name === event.target.value);
        setProject(projetoSelecionado);
    };

    const closeModal = () => setShowModal(false);

    return (
        <>
            <BasePage title={"projeto em perspectiva Gantt"}>
                {data && <CustomSelect label="Projeto" options={data} onChange={handleProjetoChange} required={true}/>}
                {rows && rows.length > 0 ? (
                    <GanttCharts columns={columns} rows={rows}/>
                ) : (
                    <Modal show={showModal} handleClose={closeModal}>
                        <h2>Não há colaboradores para este projeto.</h2>
                    </Modal>
                )}
            </BasePage>
        </>
    );
};

export default Informations;
