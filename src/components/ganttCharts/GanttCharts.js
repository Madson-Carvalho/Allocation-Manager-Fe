import './GanttCharts.css';
import {Chart} from 'react-google-charts';

export default function GanttCharts({columns, projects}) {

    const rows = ([
        projects[0].name,
        projects[0].projectCoordinator,
        new Date(projects[0].project?.initialDate),
        new Date(projects[0].project?.deliveryDate),
        null,
        null,
        ""
    ]);

    console.log(columns)
    console.log(rows);

    const data = [columns, ...rows];

    const options = {
        height: 400,
        gantt: {
            trackHeight: 30,
        },
    };

    return (
        <Chart
            chartType="Gantt"
            data={data}
            options={options}
        />
    );
}
