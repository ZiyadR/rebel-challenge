import React from 'react';
import { IconButton, Flex, useColorModeValue, FlexProps, Heading } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

interface Props extends FlexProps {
    title?: string,
    onOpen: () => void,
}
const Header = ({ title, onOpen, ...rest }: Props) => {


    return (
        <Flex
            ml={{ base: 0, lg: "18.5rem" }}
            px={{ base: 4, lg: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', lg: 'flex-end' }}
            {...rest}>

            <IconButton
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Heading m="auto" size='md'>{title}</Heading>

        </Flex>
    );
};

export default Header;