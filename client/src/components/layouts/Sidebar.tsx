import React from 'react';
import { Box, CloseButton, Flex, Icon, useColorModeValue, BoxProps, Divider, Heading, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiUsers, FiArchive } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import useLayoutStore from '../../global-stores/useLayoutStore';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

interface LinkItemProps {
    name: string,
    href: string,
    icon: IconType,
    selected: boolean,
}

interface LinkGroup {
    name: string,
    icon: IconType,
    links: LinkItemProps[],
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
    const { t } = useTranslation();

    const selected = useLayoutStore(state => state.selected);
    const setSelected = useLayoutStore(state => state.setSelected);

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', lg: "18.5rem" }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent={{ base: "space-between", lg: "flex-start" }}>
                <Box width="40px" mr={{ base: 0, lg: 4 }}></Box>
                <Heading color="teal" size="md" as="h4">
                    {t('projectTitle')}
                </Heading>
                <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
            </Flex>

            <Divider />

            <NavItem icon={FiArchive} to='/import-artists' onClick={() => setSelected('/import-artists')} selected={selected === '/import-artists'}>
                {t("importArtists")}
            </NavItem>

            <NavItem icon={FiUsers} to='/artists' onClick={() => setSelected('/artists')} selected={selected === '/artists'}>
                {t("artists")}
            </NavItem>

        </Box>
    );
};

interface NavItemProps {
    selected: boolean,
    icon: IconType,
    to: string,
    children: string,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
}
const NavItem = ({ icon, children, to, selected, onClick }: NavItemProps) => {
    return (
        <Link to={to} style={{ textDecoration: 'none' }} onClick={onClick}>
            <Flex align="center" p="3" px="8" cursor="pointer" bg={selected ? 'gray.100' : 'initial'} _hover={{ bg: 'gray.200' }}>
                {icon && (
                    <Icon mr="4" fontSize="16" color={selected ? 'teal.500' : 'initial'} as={icon} />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default Sidebar;