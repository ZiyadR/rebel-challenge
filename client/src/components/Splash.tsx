import * as React from 'react';
import { CircularProgress, VStack } from '@chakra-ui/react';

const Splash = () => <VStack spacing={8} justifyContent="center" height="100vh">
    <CircularProgress isIndeterminate thickness="5px" size="150px" color='teal' />
</VStack>;

export default Splash;