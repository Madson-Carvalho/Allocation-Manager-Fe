import Timeline from "react-calendar-timeline";
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css'
import BasePage from "../../components/basePage/BasePage";
import {useEffect, useState} from "react";
import httpGet from "../../utils/httpRequest/httpGet";
import FilterPage from "../../components/filterPage/FilterPage";
import './CalendarTimeline.css';

const CalendarTimeline = () => {
    const [allocations, setAllocations] = useState([]);

    const [filters, setFilters] = useState({
        employeeId: '',
        projectId: '',
        startDate: '',
        endDate: ''
    });

    const filtersConfig = [
        {name: 'employeeId', type: 'text', placeholder: 'Employee ID'},
        {name: 'projectId', type: 'text', placeholder: 'Project ID'},
        {name: 'startDate', type: 'date', placeholder: 'Start Date'},
        {name: 'endDate', type: 'date', placeholder: 'End Date'},
    ];

    useEffect(() => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });

        const url = `allocation/find-all?${params.toString()}`;
        httpGet(url, setAllocations);
    }, [filters]);

    const groups = allocations?.map(allocation => ({
        id: allocation.project.projectId,
        title: allocation.project.name,
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

    return (
        <BasePage title='Calendar Timeline'>
            <FilterPage filtersConfig={filtersConfig} filters={filters} setFilters={setFilters}/>
            <Timeline
                className="custom-timeline"
                groups={groups}
                items={items}
                onItemClick={(itemId, e) => console.log(itemId)}
                defaultTimeStart={moment("2024-10-20T22:00")}
                defaultTimeEnd={moment("2024-10-20T23:00")}
            />
        </BasePage>
    )
}

export default CalendarTimeline;