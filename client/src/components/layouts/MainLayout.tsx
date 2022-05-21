import React, { ReactNode } from 'react';
import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';
import { setPageTitle } from '../../helpers/utils';

const Layout = ({
    children,
    title
}: {
    children: ReactNode,
    title?: string,
}) => {
    setPageTitle(title);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box minH="100vh" bg={bgColor}>
            <Sidebar
                onClose={() => onClose}
                display={{ base: 'none', lg: 'block' }}
            />

            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <Sidebar onClose={onClose} />
                </DrawerContent>
            </Drawer>

            <Header title={title} onOpen={onOpen} />

            <Box ml={{ base: 0, lg: "18rem" }} m={4}>
                <Box w="1500px" maxW={["100%", "100%","100%", "calc(100% - 2rem)","calc(100% - 2rem)", "calc(100% - 6rem)"]} m="auto">
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default Layout;