"use client"

import { NavBar } from '../component/navbar/navbar'
import { ThemeProvider } from '../theme/ThemeProvider'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { Box } from '@chakra-ui/react'


function MyApp({ Component, pageProps }){
    const [socket, setSocket] = useState(undefined)
    const [lamp, setLamp] = useState(false)

    const handleSendData = () => {
        setLamp(val => !val)
        socket.emit("lamp", lamp)
    }

    useEffect(() => {
        const websocket = io("http://localhost:3000")
        // setSocket(websocket)
        // socket.on('data', () => {
        //     console.log(data)
        // })
    }, [])

    return <>
        <ThemeProvider>
            <React.Fragment>
                <Box width="100%" height="100vh" overflow="hidden">
                    <NavBar />
                    <Component {...pageProps} />    
                </Box>
            </React.Fragment>
        </ThemeProvider>
    </>
}

export default MyApp
