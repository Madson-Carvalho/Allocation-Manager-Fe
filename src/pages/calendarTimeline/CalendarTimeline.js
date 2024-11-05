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
    const DAY_IN_MILISECONDS = 86400000;

    const [allocations, setAllocations] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cardPosition, setCardPosition] = useState({top: 0, left: 0});

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

    const currentYear = moment().year();

    const minZoomDate = items.length > 0
        ? moment.min(items.map(item => moment(item.start_time)))
        : moment(`${currentYear}-01-01`);

    const maxZoomDate = items.length > 0
        ? moment.max(items.map(item => moment(item.end_time)))
        : moment(`${currentYear}-12-31`);

    const [filters, setFilters] = useState({
        employeeId: '',
        projectId: '',
        startDate: '',
        endDate: ''
    });

    const mountFilter = () => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });
        return params;
    };

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

    return (
        <BasePage title='Calendar Timeline'>
            <EmployeeSelector/>
            <ProjectSelector/>
            <Timeline
                className="custom-timeline"
                groups={groups}
                items={items}
                onItemClick={(itemId) => handleItemClick(itemId)}
                onItemMove={(itemId, newStart, newEnd) => handleItemMove(itemId, newStart, newEnd)}
                defaultTimeStart={moment(minZoomDate)}
                defaultTimeEnd={moment(maxZoomDate)}
                lineHeight={100}
                itemHeight={100}
                dragSnap={DAY_IN_MILISECONDS}
                canMove={true}
                canResize={true}
                canChangeGroup={true}
                showCursorTime={true}
            />
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
