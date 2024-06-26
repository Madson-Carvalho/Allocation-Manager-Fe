import './GanttCharts.css';
import {Chart} from 'react-google-charts';

export default function GanttCharts() {

    const columns = [
        {type: "string", label: "Task ID"},
        {type: "string", label: "Task Name"},
        {type: "string", label: "Qualification"},
        {type: "date", label: "Start Date"},
        {type: "date", label: "End Date"},
        {type: "number", label: "Duration"},
        {type: "number", label: "Percent Complete"},
        {type: "string", label: "Dependencies"},
    ];

    const rows = [
        [
            "2024Spring",
            "João cleber",
            "back-end",
            new Date(2024, 2, 22),
            new Date(2024, 5, 20),
            null,
            100,
            null,
        ],
        [
            "2024Summer",
            "Madson Carvalho",
            "back-end",
            new Date(2024, 5, 21),
            new Date(2024, 8, 20),
            null,
            100,
            null,
        ],
        [
            "2024Autumn",
            "Gabriel Monteiro",
            "back-end",
            new Date(2024, 8, 21),
            new Date(2024, 11, 20),
            null,
            100,
            null,
        ],
        [
            "2024Winter",
            "Rodrigo Dondé",
            "back-end",
            new Date(2024, 11, 21),
            new Date(2025, 2, 21),
            null,
            100,
            null,
        ],
        [
            "2025Spring",
            "Mayra Carvalho",
            "back-end",
            new Date(2025, 2, 22),
            new Date(2025, 5, 20),
            null,
            50,
            null,
        ],
        [
            "2025Summer",
            "Yuri Grams",
            "back-end",
            new Date(2025, 5, 21),
            new Date(2025, 8, 20),
            null,
            0,
            null,
        ],
        [
            "2025Autumn",
            "Vinicius Paiva",
            "back-end",
            new Date(2025, 8, 21),
            new Date(2025, 11, 20),
            null,
            0,
            null,
        ],
        [
            "2025Winter",
            "Mateus Kons",
            "back-end",
            new Date(2025, 11, 21),
            new Date(2026, 2, 21),
            null,
            0,
            null,
        ],
        [
            "Football",
            "Gilberto Neves",
            "back-end",
            new Date(2024, 8, 4),
            new Date(2025, 1, 1),
            null,
            100,
            null,
        ],
        [
            "Baseball",
            "Regis Queen",
            "back-end",
            new Date(2025, 2, 31),
            new Date(2025, 9, 20),
            null,
            14,
            null,
        ],
        [
            "Basketball",
            "Mauricio Ricardo",
            "back-end",
            new Date(2024, 9, 28),
            new Date(2025, 5, 20),
            null,
            86,
            null,
        ],
        [
            "Hockey",
            "Jorge Matos",
            "back-end",
            new Date(2024, 9, 8),
            new Date(2025, 5, 21),
            null,
            89,
            null,
        ],
    ];

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