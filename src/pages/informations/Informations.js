import './Informations.css';
import BasePage from "../../components/basePage/BasePage";
import GanttCharts from '../../components/ganttCharts/GanttCharts';
import httpGet from "../../utils/httpRequest/httpGet";
import {useEffect, useState} from "react";
import CustomSelect from "../../components/customSelect/CustomSelect";
import Modal from "../../components/modal/Modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";
import Form from "../../components/form/Form";
import {Multiselect} from "multiselect-react-dropdown";
import multiSelectStyle from "../../utils/multiSelectStyle";
import {ToastContainer} from "react-toastify";
import CustomInputSubmit from "../../components/customInputSubmit/CustomInputSubmit";
import httpPut from "../../utils/httpRequest/httpPut";

const Informations = () => {
    const [data, setData] = useState(null);
    const [project, setProject] = useState(null);
    const [rows, setRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectEmployee] = useState([]);
    const [employees, setEmployee] = useState([]);

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

        if (project && project.employees.length === 0) {
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
        } else {
            setRows(null);
        }

    }, [project]);

    const handleProjetoChange = (event) => {
        setProject(null);
        const projetoSelecionado = data.find(p => p?.name === event.target.value);
        setProject(projetoSelecionado);
    };

    const closeModal = () => setShowModal(false);

    const closeAddNewEmployeeModal = () => {
        setShowAddEmployeeModal(false);
    }

    const handleClick = () => {
        httpGet('employees/find-all', setEmployee)

        setShowAddEmployeeModal(true);
    }

    const options = employees.map(employee => ({
        name: employee.name,
        id: employee.employeeId
    }));

    const handleSelect = (e) => {
        setSelectEmployee(e)
    }

    const handleRemove = (e) => {
        setSelectEmployee(selectedEmployee.filter(x => x.id !== e.id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const employeesSet = new Set(selectedEmployee.map(selected => selected.id));
        const employeesToSave = employees.filter(employee => employeesSet.has(employee.employeeId));

        const updatedProject = {
            ...project,
            employees: [...project.employees, ...employeesToSave]
        };

        httpPut(`projects/update-project`, updatedProject, (response) => {
            setProject(response);
        });

        setShowAddEmployeeModal(false);
    }

    return (
        <>
            <BasePage title={"projeto em perspectiva Gantt"}>
                <div className='gantt-options'>
                    {data &&
                        <CustomSelect label="Projeto" options={data} onChange={handleProjetoChange} required={true}
                                      style={{width: '100%'}}/>}
                    <button className='new-employee' onClick={handleClick}><FontAwesomeIcon icon={faUserPlus}/></button>
                </div>
                {rows && rows.length > 0 ? (
                    <GanttCharts columns={columns} rows={rows}/>
                ) : (
                    <Modal show={showModal} handleClose={closeModal}>
                        <h2>Não há colaboradores para este projeto.</h2>
                    </Modal>
                )}
                <Modal show={showAddEmployeeModal} handleClose={closeAddNewEmployeeModal}>
                    <Form onSubmit={handleSubmit}>
                        <Multiselect options={options}
                                     onSelect={handleSelect}
                                     onRemove={handleRemove}
                                     displayValue={'name'} placeholder='Escolha um colaborador'
                                     closeIcon='close' showArrow={true}
                                     style={multiSelectStyle}
                        />
                        <CustomInputSubmit value='Adicionar' style={{width: '30%'}} disabled={!selectedEmployee.length > 0}/>
                    </Form>
                </Modal>
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
        </>
    );
};

export default Informations;
