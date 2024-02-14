import { useColorMode, useToken } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from 'chart.js';
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
  
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);
  
export function Throtlle({value}){
    const { colorMode, toggleColorMode } = useColorMode() 
    const theme = useTheme()
    const currentTheme = theme.semanticTokens.colors["chakra-subtle-text"]["_" + colorMode]
    const [currentColor] = useToken('colors',[currentTheme])

    ChartJS.defaults.color = currentColor;

    const data = {
        labels : ['Throtlle'],
        datasets: [
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: 'rgba(53, 162, 235, 0.7)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 2,
                data: [value],
            },
        ],
    };
    
    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'top',
                fontColor: 'red',
                labels: {
                    color: 'red',
                    font: {
                        size: 20
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgb(53, 162, 235)'
                },
            },
            y: {
                suggestedMin: -100,
                suggestedMax: 100,
                position: 'left',
                grid: {
                    color: currentColor
                },
                ticks: {
                    callback: function(value, index, ticks) {
                        return Math.abs(value);
                    },
                    stepSize: 10,
                    color: currentColor
                },
            },
            l: {
                suggestedMin: -100,
                suggestedMax: 100,
                position: 'right',
                grid: {
                    color: currentColor
                },
                ticks: {
                    callback: function(value, index, ticks) {
                        return Math.abs(value);
                    },
                    stepSize: 10,
                    color: currentColor
                },
            },
        },
    };

    return(
        <Chart
            height={600}
            width={150}
            type='bar'
            options={options}
            data={data}
        />
    )
}