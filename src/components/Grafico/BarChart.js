import {Bar} from "react-chartjs-2";
import moment from "moment";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({datasets, title}) => {

    const chartData = {
        labels: moment.months(),
        datasets: [{
            label: '',
            data: datasets,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    return <Bar data={chartData} options={options}/>;
};

export default BarChart;