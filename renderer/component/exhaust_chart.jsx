import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Colors
} from 'chart.js';
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import { useTheme } from '@emotion/react'
import { useColorMode, useToken } from '@chakra-ui/react';
import { useEffect } from 'react';
  
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Colors
);

export default function ExhaustChart({labelY, labelName, data}){
    const maxTemp = 600

    const { colorMode, toggleColorMode } = useColorMode() 
    const theme = useTheme()
    const currentTheme = theme.semanticTokens.colors["chakra-subtle-text"]["_" + colorMode]
    const [currentColor] = useToken('colors',[currentTheme])

    ChartJS.defaults.color = currentColor;

    const temperatureColor = (val) => {
        if(val > maxTemp) return 0
        return (maxTemp - val) / maxTemp * 204
    }
    
    const exhaustData = {
        labels : labelName,
        datasets: [
            {
                type: 'bar',
                borderWidth: 2,
                hoverBackgroundColor: 'hsla(0, 100%, 100%, 0.6)',
                borderColor: data.map(val => `hsla(${temperatureColor(val)}, 82%, 57%, 1)`),
                backgroundColor: data.map(val => `hsla(${temperatureColor(val)}, 82%, 57%, 0.5)`),
                data,
            },
        ],
    };
    
    const exhaustOptions = {
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
                    display: false,
                },
            },
            y: {
                suggestedMin: 0,
                suggestedMax: 600,
                position: labelY,
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
                border: {
                    display: false
                }
            },
        },
    };

    return(
        <>
            <Chart
                type='bar'
                width={"100%"}
                // height={"100%"}
                options={exhaustOptions}
                data={exhaustData}
            />
        </>
    )
} 