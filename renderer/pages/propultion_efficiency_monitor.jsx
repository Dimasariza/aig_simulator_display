import Head from 'next/head'
import { MachineRender } from '../component/machine_renderer';

export default function PEM(){
    const machineUrl = "/assets/pem/pem.glb"
    const data = {
        alarmA : [false, true, true, true],
        alarmB : [true, true, true, true],
        tempA : [100, 200, 300, 400],
        tempB : [100, 200, 300, 400],
        exA : [true, 100],
        exB : [false, 100]
    }
    return (
        <>
            <Head>
                <title>Aux Engine 1</title>
            </Head>
            <MachineRender machineUrl={machineUrl} position={[0, 0.5, 0]} scale={0.02} data={data}/>
        </>
    )
}