import Timeline from "react-calendar-timeline";
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import BasePage from "../../components/basePage/BasePage";
import {useEffect, useState} from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import './CalendarTimeline.css';
import DetailsCard from "../../components/detailsCard/DetailsCard";
import EmployeeSelector from "../registerEmployees/EmployeeSelector";
import ProjectSelector from "../registerProject/ProjectSelector";
import ScaleSelector from "../../components/scaleSelector/ScaleSelector";
import {MONTH, YEAR} from "../../components/scaleSelector/Scales";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CalendarTimeline = () => {

    const VIEW_PROJECTS = 'Visualizar projetos de um colaborador';
    const VIEW_EMPLOYEES = 'Visualizar colaboradores de um projeto';

    const [allocations, setAllocations] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [project, setProject] = useState(null);
    const [filters, setFilters] = useState({employeeId: '', projectId: '', startDate: '', endDate: ''});
    const [cardPosition, setCardPosition] = useState({top: 0, left: 0});
    const [isEmployeeAsGroup, setIsEmployeeAsGroup] = useState(true);

    const [startDate, setStartDate] = useState(moment().startOf(MONTH));
    const [endDate, setEndDate] = useState(moment().endOf(MONTH));
    const [scale, setScale] = useState(YEAR);

    const groupsAsEmployee = allocations?.map(allocation => ({
        id: allocation.employee.employeeId,
        title: allocation.employee.name,
    })) ?? [];

    const itemsAsEmployee = allocations?.map(allocation => ({
        id: allocation.project.projectId,
        group: allocation.employee.employeeId,
        title: allocation.project.name,
        start_time: moment(allocation.startDate),
        end_time: moment(allocation.endDate),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
    })) ?? [];

    const groupsAsProject = allocations?.map(allocation => ({
        id: allocation.project.projectId,
        title: allocation.project.name,
    })) ?? [];

    const itemsAsProject = allocations?.map(allocation => ({
        id: allocation.employee.employeeId,
        group: allocation.project.projectId,
        title: allocation.employee.name,
        start_time: moment(allocation.startDate),
        end_time: moment(allocation.endDate),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
        additionalData: {
            jobRole: allocation.employee.jobRole,
            qualification: allocation.employee.qualification,
            specializations: allocation.employee.specializations
        },
    })) ?? [];

    const groups = isEmployeeAsGroup ? groupsAsEmployee : groupsAsProject;
    const items = isEmployeeAsGroup ? itemsAsEmployee : itemsAsProject;

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            employeeId: employee?.employeeId,
            projectId: project?.projectId,
        }));
    }, [employee, project]);

    useEffect(() => {
        const params = mountFilter();
        const url = `allocation/find-all?${params.toString()}`;
        httpGet(url, setAllocations);
    }, [filters]);

    useEffect(() => {
        const handleMouseClick = (event) => {
            setCardPosition({top: event.clientY, left: event.clientX});
        };
        window.addEventListener("click", handleMouseClick);
        return () => window.removeEventListener("click", handleMouseClick);
    }, []);

    const mountFilter = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });
        return params;
    };

    const handleItemClick = (itemId) => {
        const selectedAllocation = allocations.find(allocation => allocation.id === itemId);
        setSelectedItem(selectedAllocation);
    };

    const toggleView = () => {
        setIsEmployeeAsGroup(prev => !prev);
    };

    return (
        <BasePage url="/register-allocation">
            <button className="btn-toggle-view" onClick={toggleView}>
                {isEmployeeAsGroup ? VIEW_PROJECTS : VIEW_EMPLOYEES}
            </button>
            <div>
                {isEmployeeAsGroup ? (
                    <ProjectSelector setValue={setProject}/>
                ) : (
                    <EmployeeSelector setValue={setEmployee}/>
                )}
            </div>
            {items && items.length > 0 ? (
                <div style={{margin: '2rem'}}>
                    {/*<ScaleSelector*/}
                    {/*    scale={scale}*/}
                    {/*    setStartDate={setStartDate}*/}
                    {/*    setEndDate={setEndDate}*/}
                    {/*    setScale={setScale}*/}
                    {/*/>*/}
                    {employee ? (
                        <p>Funcionário selecionado: {employee?.name}</p>
                    ) : project ? (
                        <p>Projeto selecionado: {project?.name}</p>
                    ) : null}
                    <Timeline
                        key={`${startDate}-${endDate}`}
                        groups={groups}
                        items={items}
                        onItemClick={(itemId) => handleItemClick(itemId)}
                        defaultTimeStart={startDate}
                        defaultTimeEnd={endDate}
                        lineHeight={50}
                        itemHeight={100}
                        canMove={true}
                        canResize={true}
                        canChangeGroup={true}
                    />
                </div>
            ) : (
                <div className="no-allocations-container">
                    <div className="no-allocations-message">
                        <FontAwesomeIcon icon={faExclamationTriangle} color={'red'} fontSize={'60px'}/>
                        <p>Não há alocações para exibir.</p>
                        <p className="no-allocations-description">
                            Verifique se há alocações disponíveis ou se o filtro foi corretamente selecionado.
                        </p>
                    </div>
                </div>
            )}
            {selectedItem && (
                <DetailsCard
                    selectedItem={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    position={cardPosition}
                />
            )}
        </BasePage>
    );

};

export default CalendarTimeline;
