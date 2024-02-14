import React, { Fragment } from 'react'
import { useGauge } from 'use-gauge'
import { useControls } from 'leva';
import { Flex, useColorMode, useToken } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react'

export function CustomGauge({title, gaugeValue, width, scale}){
    const { colorMode, toggleColorMode } = useColorMode() 
    const theme = useTheme()
    console.log(theme)
    const currentTheme = theme.semanticTokens.colors["chakra-subtle-text"]["_" + colorMode]
    const [currentColor] = useToken('colors',[currentTheme])

    const {
        value,
        diameter,
        minValue,
        maxValue,
        startAngle,
        endAngle,
        numTicks,
    } = useControls('Gauge settings', {
        diameter: { value: 300 },
        value: { value: 0, min: 0, max: 100 },
        minValue: { value: 0 },
        maxValue: { value: 100 },
        startAngle: { value: 90, min: 0, max: 360, step: 1 },
        endAngle: { value: 270, min: 0, max: 360, step: 1 },
        numTicks: { value: 11, min: 0, max: 30, step: 1 },
    });
    
    const {
        offset,
        strokeWidth: arcStrokeWidth,
        color: progressColor,
        strokeLineCap,
    } = useControls('Arc Props', {
        offset: {
            value: 8,
            min: 0,
            max: 100,
            step: 1,
        },
        strokeWidth: {
            value: 24,
            min: 0,
            max: 100,
        },
            color: {
            value: 'cornflowerblue',
        },
        strokeLineCap: {
            value: 'round',
            options: ['butt', 'round', 'square'],
        },
    });
    
    const { color: tickColor, length: tickLength } = useControls('Tick Props', {
        color: {
            value: '#ccc',
        },
        length: {
            value: 10,
            min: 0,
            max: 50,
        },
    });
    
    const {
        baseRadius,
        tipRadius,
        color: needleColor,
        offset: needleOffset,
    } = useControls('Needle Props', {
        baseRadius: {
            value: 12,
            min: 0,
            max: 50,
        },
        tipRadius: {
            value: 2,
            min: 0,
            max: 50,
        },
            color: {
            value: '#374151',
        },
        offset: {
            value: 35,
            min: 0,
            max: 50,
        },
    });
    
    const {
        ticks,
        getTickProps,
        getLabelProps,
        valueToAngle,
        angleToValue,
        getArcProps,
        getNeedleProps,
        getSVGProps,
    } = useGauge({
        startAngle,
        endAngle,
        numTicks,
        diameter,
        domain: [minValue, maxValue],
    });

    const { tip, base, points } = getNeedleProps({
        value : gaugeValue,
        baseRadius,
        tipRadius,
        offset: needleOffset,
    });

    return (
        <Flex padding={10} justifyContent="center"  width={width+'%'}> 
            <svg {...getSVGProps()} style={{ overflow: "visible", maxWidth:"100%"}} transform={`scale(${scale})`}>
                <path 
                    {...getArcProps({
                        offset,
                        startAngle,
                        endAngle,
                    })}
                    fill="none"
                    strokeWidth={arcStrokeWidth}
                    strokeLinecap={strokeLineCap}
                />
                {gaugeValue > minValue && (
                    <path
                        {   ...getArcProps({
                                offset: offset-55,
                                startAngle : startAngle,
                                endAngle: valueToAngle(gaugeValue)
                            })
                        }
                        strokeLinecap = "butt"
                        fill="none"
                        stroke={progressColor}
                        strokeWidth={arcStrokeWidth}
                        // strokeLinecap={strokeLineCap}
                    />
                )}
                <g id="ticks">
                    {ticks.map((angle, key) => {
                        return (
                            <Fragment key={key}>
                                <line
                                    stroke={currentColor}
                                    {...getTickProps({ angle, length: tickLength })}
                                />
                                <text {...getLabelProps({ angle, offset: 25 })} fill={currentColor} fontSize="0.7rem">
                                    {angleToValue(angle)}
                                </text>
                            </Fragment>
                        );
                    })}
                </g>
                <g id="needle">
                    <circle fill='rgba(0, 200, 0, 0.4)' {...base} r={20} />
                    <circle fill={needleColor} {...base} /> 
                    <circle fill={needleColor} {...tip} />
                    <polyline fill={needleColor} points={points} />
                    <circle fill='white' {...base} r={4} />
                </g>
                <text textAnchor="middle" dominantBaseline="middle" y={45} fill={currentColor} fontSize="1.3rem" fontFamily="Helvetica,Arial">
                    {title}
                </text>
                <text textAnchor="middle" dominantBaseline="middle" y={-55} fill={currentColor} fontSize="1rem" fontFamily="Helvetica,Arial">
                    {gaugeValue}
                </text>
            </svg>
        </Flex>
    )
}