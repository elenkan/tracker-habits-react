import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

type PropsType = {
    colorsValue: number[]
}

const MoodStatistics = ({colorsValue}: PropsType) => {

    const lineChartData = () => {
        // const ctx = canvas.getContext("2d");
        // const colorStart = ["#FFFF00", "#08d9d6"];
        // const colorMid = ["#66ff66", "#cc6699"]
        // const colorEnd = ["#ee82ee", "#ffcc66", "#d7d3d3"]
        //
        // const gradient = ctx.createLinearGradient(0,0,0,150);
        //
        // gradient.addColorStop(0, colorStart);
        // gradient.addColorStop(0.5, colorMid);
        // gradient.addColorStop(1, colorEnd);

        return {
            labels: colorsValue,
            datasets: [
                {
                    data: colorsValue,
                    borderColor: "#08d9d6",
                    fill: true,
                    lineTension: 0.5
                }
            ]
        };
    }
    return (
        <Line
            // @ts-ignore
            type="line"
            width={160}
            height={60}
            data={lineChartData()}
        />
    );
};

export default MoodStatistics;


// import {Chart} from "chart.js";
//
// const bar_ctx = document.getElementById('bar-chart').getContext('2d');
//
// const purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 600);
// purple_orange_gradient.addColorStop(0, 'orange');
// purple_orange_gradient.addColorStop(1, 'purple');
//
// const bar_chart = new Chart(bar_ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 8, 14, 5],
//             backgroundColor: purple_orange_gradient,
//             hoverBackgroundColor: purple_orange_gradient,
//             hoverBorderWidth: 2,
//             hoverBorderColor: 'purple'
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
