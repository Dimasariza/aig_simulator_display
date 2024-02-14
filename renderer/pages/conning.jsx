import React from 'react'
import Head from 'next/head'
import { Box, Button, Card, CardBody, Flex, SimpleGrid, useColorMode, useToken } from '@chakra-ui/react'
import { CustomGauge } from '../component/gauge'
import { Throtlle } from '../component/thortlle'
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
import { useTheme } from '@emotion/react'
import ExhaustChart from '../component/exhaust_chart'
import CilinderChart from '../component/cilinder_chart'
  
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

function ThrotolleValue(val){
    if(val > 0) return "AHEAD"
    else if(val < 0) return "ASTERN"
    else if(val == 0) return "NEUTRAL"
}

export default function Conning() {
    const { colorMode, toggleColorMode } = useColorMode() 
    const theme = useTheme()
    const currentTheme = theme.semanticTokens.colors["chakra-subtle-text"][colorMode]
    const [currentColor] = useToken('colors',[currentTheme])

    ChartJS.defaults.color = currentColor;

    const thortlleValue = -50
    let temperatureA = [0.1, 1,2,3,4,5,6,7].map(i => Math.random() * 10 + 35)
    let temperatureB = [0.1, 1,2,3,4,5,6,7].map(i => Math.random() * 10 + 35)

    return (
        <>
            <Head>
                <title>Conning</title>
            </Head>

            <Flex height={"100%"} justifyContent="space-between">
                <Box width={"100%"} marginTop={10}>
                    <Flex justifyContent={"center"} marginTop={10} height={200} gap={10}>
                        <ExhaustChart 
                            data={[temperatureA.reduce((partialSum, a) => partialSum + a, 0) / temperatureA.length]}
                            labelName={["T1"]}
                        />
                        <CilinderChart 
                        labelName={["A 1", "A 2", "A 3", "A 4", "A 5", "A 6", "A 7", "A 8"]}
                        data={temperatureA}
                        />
                        <CilinderChart 
                            labelY="right" 
                            labelName={["B 1", "B 2", "B 3", "B 4", "B 5", "B 6", "B 7", "B 8"]}
                            data={temperatureB}
                        />
                        <ExhaustChart 
                            data={[temperatureB.reduce((partialSum, a) => partialSum + a, 0) / temperatureB.length]}
                            labelY="right" 
                            labelName={["T2"]}
                        />
                    </Flex>

                    <Flex gap={1} justifyItems={"center"} paddingY={10} marginTop={10}>
                        {
                            [
                                {title: "Oil Pressure", value: 20, width: 50, scale: 1},
                                {title: "RPM", value: 80, width: 100, scale: 1.5},
                                {title: "Oil Temperature", value: 30, width: 50, scale: 1},
                                // {title: "Temperature", value: 60},
                                // {title: "Temperature", value: 60},
                            ].map(({title, value, width, scale}, key) => 
                                <CustomGauge key={key} title={title} gaugeValue={value} width={width} scale={scale}/>
                            )
                        }
                    </Flex>
                </Box>

                <Flex alignItems="center" margin={10} flexDirection="column">
                    <Card marginBottom={10} colorScheme="red">
                        <CardBody>
                            {
                                ThrotolleValue(thortlleValue)
                            }
                        </CardBody>
                    </Card>
                    <Throtlle value={thortlleValue}/>
                </Flex>
            </Flex>
        </>
    )
}
