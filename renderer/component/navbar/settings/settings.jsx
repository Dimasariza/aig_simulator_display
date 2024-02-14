import { Button, Menu, MenuButton, MenuGroup, MenuItem, MenuList, SimpleGrid, useColorMode } from "@chakra-ui/react";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function Settings(){
    const { colorMode, toggleColorMode } = useColorMode() 
    const handleClick = () => {
        toggleColorMode();
        const styleEl = document.createElement('style');
        const cssText = document.createTextNode(
            'html * { transition: color, background-color 0.3s ease-out!important }',
        );
        styleEl.appendChild(cssText);
        document.head.appendChild(styleEl);
        setTimeout(() => {
          document.head.removeChild(styleEl);
        }, 300);
    };

    return (
        <Menu>
            <MenuButton 
                as={Button} 
                size='md'
                height='48px'
                width='200px'
                border='2px'
                borderColor='teal.500'
            >
                Settings
            </MenuButton>
            <MenuList>
                <MenuGroup title='Screen Mode'>
                    <SimpleGrid columns={3} spacing={5} padding={5}>
                        <MenuItem onClick={handleClick} closeOnSelect={false}>
                            {
                                colorMode == 'light' ? <MdNightlight size={"5rem"}/> : <MdLightMode size={"5rem"}/>
                            }
                        </MenuItem>
                    </SimpleGrid>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}