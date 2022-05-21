import * as React from 'react';
import { CircularProgress, VStack, Image } from '@chakra-ui/react';

const Splash = () => <VStack spacing={8} justifyContent="center" height="100vh">
    <img alt="logo" src="/logo.png" width="100px" />
    <CircularProgress isIndeterminate thickness="5px" size="150px" color='teal' />
</VStack>;

export default Splash;