import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { MachineRender } from '../component/machine_renderer';

export default function MainEngines(){
    const machineUrl = "/assets/main_engine/main_engine2.glb"
    const data = {
        alarmA : [true, true, true, true, true, true, true, false],
        alarmB : [true, true, true, true, true, true, true, true],
        tempA : [100, 200, 300, 400, 500, 600, 700, 800],
        tempB : [100, 200, 300, 400, 500, 600, 700, 800],
        exA : [true, 200],
        exB : [false, 500]
    }

    return (
        <Fragment>
            <Head>
                <title>Main Engine</title>
            </Head>

            <MachineRender machineUrl={machineUrl} position={[0, 2.3, 0]} scale={0.15} data={data}/>
        </Fragment>
    )
}
