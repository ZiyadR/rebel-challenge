import React from 'react'
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

export const Card = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    maxWidth="100%"
    overflowX="auto"
    shadow="md"
    rounded={{ sm: 'lg' }}
    {...props}
  />
)