import './GanttCharts.css';
import {Chart} from 'react-google-charts';

export default function GanttCharts({ id, columns, rows}) {
    const data = [columns, ...rows];

    const options = {
        height: 400,
        gantt: {
            trackHeight: 60,
            barHeight: 30,
        },
    };

    return (
        <Chart chartType="Gantt" data={data} options={options} rootProps={{ 'data-testid': '1' }}/>
    );
}
