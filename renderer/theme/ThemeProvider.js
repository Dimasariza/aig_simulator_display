import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { config } from "./config";
import React from "react";

const theme = extendTheme({config})

export function ThemeProvider({children}){
    return <ChakraProvider theme={theme} transitionDuration="200ms" transition="background-color 200ms linear">
        {children}
    </ChakraProvider>
}