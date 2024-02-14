import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { MachineRender } from '../component/machine_renderer';

export default function AuxEngine2(){
    const machineUrl = "/assets/aux_engine/diesel_engine.gltf"
    const data = {
        alarmA : [true, true, true, true],
        alarmB : [true, true, true, true],
        tempA : [100, 200, 300, 400],
        tempB : [100, 200, 300, 400],
        exA : [true, 100],
        exB : [false, 100]
    }

    return (
        <>
            <Head>
                <title>Aux Engine 3</title>
            </Head>
            <MachineRender machineUrl={machineUrl} position={[0, -1, 0]} scale={2} data={data}/>
        </>
    )
}
