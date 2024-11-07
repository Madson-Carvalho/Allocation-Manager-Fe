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

const CalendarTimeline = () => {

    const DAY = 'day';
    const WEEK = 'week';
    const MONTH = 'month';
    const YEAR = 'year';

    const [allocations, setAllocations] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [project, setProject] = useState(null);
    const [filters, setFilters] = useState({employeeId: '', projectId: '', startDate: '', endDate: ''});
    const [cardPosition, setCardPosition] = useState({top: 0, left: 0});

    const [startDate, setStartDate] = useState(moment().startOf(MONTH));
    const [endDate, setEndDate] = useState(moment().endOf(MONTH));
    const [scale, setScale] = useState(YEAR);

    const groups = allocations?.map(allocation => ({
        id: allocation.project.projectId,
        title: allocation.project.name
    })) ?? [];

    const items = allocations?.map(allocation => ({
        id: allocation.id,
        group: allocation.project.projectId,
        title: allocation.employee.name,
        start_time: moment(allocation.startDate),
        end_time: moment(allocation.endDate),
        canMove: true,
        canResize: true,
        canChangeGroup: true,
    })) ?? [];

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

    const handleItemMove = (itemId, newStart, newEnd) => {
        const newAllocations = allocations.map(allocation =>
            allocation.id === itemId
                ? {
                    ...allocation,
                    startDate: moment(newStart).toISOString(),
                    endDate: moment(newEnd).toISOString(),
                }
                : allocation
        );
        setAllocations(newAllocations);
    };

    const handleScaleChange = (newScale) => {
        setScale(newScale);
    };

    const handleNext = () => {
        setStartDate(prev => moment(prev).add(1, scale));
        setEndDate(prev => moment(prev).add(1, scale));
    };

    const handlePrevious = () => {
        setStartDate(prev => moment(prev).subtract(1, scale));
        setEndDate(prev => moment(prev).subtract(1, scale));
    };

    return (
        <BasePage title='Calendar Timeline'>
            <div className="selector-container">
                <div className="selector">
                    <EmployeeSelector setValue={setEmployee}/>
                </div>
                <div className="selector">
                    <ProjectSelector setValue={setProject}/>
                </div>
            </div>
            <div className="button-select-scale-timeline">
                <button
                    onClick={() => handleScaleChange(DAY)}
                    className={scale === "day" ? "selected" : ""}>Dia
                </button>
                <button
                    onClick={() => handleScaleChange(WEEK)}
                    className={scale === WEEK ? "selected" : ""}>Semana
                </button>
                <button
                    onClick={() => handleScaleChange(MONTH)}
                    className={scale === MONTH ? "selected" : ""}>Mês
                </button>
                <button
                    onClick={() => handleScaleChange(YEAR)}
                    className={scale === YEAR ? "selected" : ""}>Ano
                </button>
            </div>
            <div>
                <button onClick={handlePrevious}>Anterior</button>
                <button onClick={handleNext}>Próximo</button>
            </div>
            {items && items.length > 0 ? (
                <Timeline
                    key={`${startDate}-${endDate}`}
                    className="custom-timeline"
                    groups={groups}
                    items={items}
                    onItemClick={(itemId) => handleItemClick(itemId)}
                    onItemMove={(itemId, newStart, newEnd) => handleItemMove(itemId, newStart, newEnd)} //TODO VERIFICAR COMO IMPLEMENTAR CORRETAMENTE
                    defaultTimeStart={startDate}
                    defaultTimeEnd={endDate}
                    lineHeight={150}
                    itemHeight={100}
                    canMove={false}
                    canResize={false}
                    canChangeGroup={true}
                />
            ) : (
                <div>
                    Não há alocações para exibir.
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
