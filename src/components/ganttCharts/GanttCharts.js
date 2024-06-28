import './GanttCharts.css';
import {Chart} from 'react-google-charts';

export default function GanttCharts({columns, rows}) {
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
