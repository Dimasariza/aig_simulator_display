import { Button, Card, CardBody, Flex, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { PiEngineDuotone, PiEngineFill } from "react-icons/pi";
import { useRouter } from "next/router";
import { MdModelTraining } from "react-icons/md";
import { GiBoatPropeller } from "react-icons/gi";
import Settings from "./settings/settings";

function getDisplayTitle(title){
    switch(title){
        case "/main_engine":
        return "Main Engine"
        case "/aux_engine1":
        return "Aux Engine 1"
        case "/aux_engine2":
        return "Aux Engine 2"
        case "/aux_engine3":
        return "Aux Engine 3"
        case "/aux_engine4":
        return "Aux Engine 4"
        case "/aux_engine5":
        return "Aux Engine 5"
        case "/aux_engine6":
        return "Aux Engine 6"
        case "/alarm":
        return "Alarm"
        case "/setting":
        return "Setting"
        case "/conning":
        return "Conning"
        case "/scenario":
        return "Scenario"
        case "/propultion_efficiency_monitor":
        return "PEM"
        default :
        return "EPMS Simulator"
    }
}

export function NavBar(){
    const { asPath, pathname } = useRouter();

    return (
        <Stack>
            <Flex justifyContent="space-between" alignItems="center" padding="1rem">

                <Menu key="Menu">
                    <MenuButton 
                        as={Button} 
                        size='md'
                        height='48px'
                        width='200px'
                        border='2px'
                        borderColor='teal.500'
                    >
                        Menu
                    </MenuButton>
                    <MenuList >
                    <MenuGroup title='Propultion'>
                            <SimpleGrid columns={4} spacing={5} padding={5}>
                                {
                                    [
                                        { nav: "main_engine", title: "Main Engine", icon: <PiEngineFill  size={"5rem"}/> },
                                        { nav: "propultion_efficiency_monitor", title: "PEM", icon: <GiBoatPropeller size={"5rem"}/> },
                                    ].map(({nav, title, icon}, id) => <Fragment key={id}>
                                        <Link href={"/" + nav}>
                                            <MenuItem display={"flex"} flexDirection={"column"}>
                                                { icon }
                                                <Text>
                                                    {title}
                                                </Text>
                                            </MenuItem>
                                        </Link>
                                    </Fragment>
                                    )
                                }
                            </SimpleGrid>
                        </MenuGroup>

                        <MenuGroup title='Generator'>
                            <SimpleGrid columns={4} spacing={5} padding={5}>
                                {
                                    [
                                        { nav: "aux_engine1", title: "Aux Engine 1", icon: <PiEngineDuotone size={"5rem"}/> },
                                        { nav: "aux_engine2", title: "Aux Engine 2", icon: <PiEngineDuotone size={"5rem"}/> },
                                        { nav: "aux_engine3", title: "Aux Engine 3", icon: <PiEngineDuotone size={"5rem"}/> },
                                        { nav: "aux_engine4", title: "Aux Engine 4", icon: <PiEngineDuotone size={"5rem"}/> },
                                        { nav: "aux_engine5", title: "Aux Engine 5", icon: <PiEngineDuotone size={"5rem"}/> },
                                        { nav: "aux_engine6", title: "Aux Engine 6", icon: <PiEngineDuotone size={"5rem"}/> },
                                    ].map(({nav, title, icon}, id) => <Fragment key={id}>
                                        <Link href={"/" + nav}>
                                            <MenuItem display={"flex"} flexDirection={"column"}>
                                                { icon }
                                                <Text>
                                                    {title}
                                                </Text>
                                            </MenuItem>
                                        </Link>
                                    </Fragment>
                                    )
                                }
                            </SimpleGrid>
                        </MenuGroup>

                        <MenuGroup title='Create Scenario'>
                            <SimpleGrid columns={4} spacing={5} padding={5}>
                                {
                                    [
                                        { nav: "scenario", title: "Scenario", icon: <MdModelTraining size={"5rem"}/> },
                                    ].map(({nav, title, icon}, id) => <Fragment key={id}>
                                        <Link href={"/" + nav}>
                                            <MenuItem display={"flex"} flexDirection={"column"}>
                                                { icon }
                                                <Text>
                                                    {title}
                                                </Text>
                                            </MenuItem>
                                        </Link>
                                    </Fragment>
                                    )
                                }
                            </SimpleGrid>
                        </MenuGroup>
                    </MenuList>
                </Menu>

                <Link href="/conning">
                    <Button
                        size='md'
                        height='48px'
                        width='200px'
                        border='2px'
                        borderColor='teal.500'
                    >
                    Conning
                    </Button>
                </Link>

                <Card>
                    <CardBody>
                        {getDisplayTitle(pathname)}
                    </CardBody>
                </Card>

                <Link href="/alarm">
                    <Button
                        size='md'
                        height='48px'
                        width='200px'
                        border='2px'
                        borderColor='teal.500'
                    >
                    Alarm
                    </Button>
                </Link>

                <Settings />
            </Flex>
        </Stack>
    )
}