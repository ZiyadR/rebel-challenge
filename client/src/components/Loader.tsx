import * as React from 'react';
import { Spinner, VStack } from '@chakra-ui/react';

const Loader = () => <VStack justifyContent="center" alignItems="center" height="400px">
    <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
    />
</VStack>;

export default Loader;