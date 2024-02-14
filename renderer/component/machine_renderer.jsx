import { useEffect, useState } from "react"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { LuRotate3D } from "react-icons/lu";
import { Tooltip } from '@chakra-ui/react'
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import { RiErrorWarningLine } from "react-icons/ri";
import { WiDegrees } from "react-icons/wi";


function angleToRad(angle){
    return Math.PI / 180 * angle
}

export function MachineRender({machineUrl, position=[0, 0, 0], scale=1, data}){
    const { alarmA, alarmB, tempA, tempB, exA, exB } = data
    const [engine, setEngine] = useState(useLoader(GLTFLoader, machineUrl))
    const [engineRot, setEngineRot] = useState(angleToRad(135))
    const [rotate, setRotate] = useState(true);

    const animate = (deltaTime) => {
        setEngineRot(val => val += angleToRad(0.1))
    }

    if(rotate) requestAnimationFrame(animate)

    useEffect(() => {
        console.log(engine)
        setEngine(useLoader(GLTFLoader, machineUrl)) 
    }, [])

    return (
        <>
            <Grid height={"100%"} templateColumns='repeat(3, 0.05fr)' position={"absolute"} top={0} left={0} paddingTop={100} paddingX={10} zIndex={-10}> 
                <Flex paddingY={5} height={"100%"} flexDirection={"column"} width={100}>
                    <Text paddingY={1}>Cylinder</Text>
                    {
                        alarmA.map((value, id) => <Flex paddingY={1} alignItems="center">
                            A{id + 1} &nbsp; {value && <RiErrorWarningLine color={'red'}/>} 
                        </Flex>)
                    }
                    <Flex paddingY={1} alignItems="center">Ex &nbsp;{ exA[0] && <RiErrorWarningLine color={'red'}/>}</Flex>
                </Flex>
                <Flex paddingY={5} paddingX={10} height={"100%"} flexDirection={"column"}>
                    <Text paddingY={1}>Temp</Text>
                    {
                        tempA.map(value => <Text paddingY={1} width={"200%"}>{value} &deg;C</Text>)
                    }
                    <Flex paddingY={1} alignItems="center" width={"200%"}>{exA[1]} &deg;C</Flex>
                </Flex>
            </Grid>
            <Canvas style={{ overflow: "hidden" }} >
                <OrbitControls enableZoom={true} enablePan={true} enableDamping={true} position={[0, 15, -30]}/>
                <ambientLight intensity={20}/>
                <directionalLight position={[2, 1, 1]}/>
                {
                    // engine && 
                    // engine && engine.scene.children.map(scene => {
                    //     return <primitive object={scene} position={position}  scale={scale}/>
                    // })
                    engine &&
                    <primitive object={engine.scene} position={position} rotation-y={engineRot} scale={scale}/>
                }
            </Canvas>
            <Grid height={"100%"} templateColumns='repeat(3, 0.05fr)' position={"absolute"} top={0} right={0} paddingTop={100} paddingX={10} zIndex={-10}>
                <Flex paddingY={5} height={"100%"} flexDirection={"column"} width={100}>
                    <Text paddingY={1}>Cylinder</Text>
                    {
                        alarmB.map((value, id) => <Flex paddingY={1} alignItems="center">
                            B{id + 1} &nbsp; {value && <RiErrorWarningLine color={'red'}/>} 
                        </Flex>)
                    }
                    <Flex paddingY={1} alignItems="center">Ex &nbsp; { exB[0] && <RiErrorWarningLine color={'red'}/>}</Flex>
                </Flex>
                <Flex paddingY={5} paddingX={10} height={"100%"} flexDirection={"column"}>
                    <Text paddingY={1}>Temp</Text>
                    {
                        tempB.map(value => <Text paddingY={1} width={"200%"}>{value} &deg;C</Text>)
                    }
                    <Flex paddingY={1} alignItems="center" width={"200%"}>{exB[1]} &deg;C</Flex>
                </Flex>
            </Grid>
            <Box position={"absolute"} bottom={0} width={"100%"} padding={5}>
                <Flex justifyContent={"center"}>
                    <Tooltip label={rotate ? 'Stop Rotation' : 'Rotate'}>
                        <Button onClick={() => setRotate(rot => !rot)}>
                            <LuRotate3D />
                        </Button>
                    </Tooltip>
                </Flex>
            </Box>
        </>
    )
}