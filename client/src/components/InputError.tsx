import * as React from 'react';
import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Props {
    text: string,
    params?: object,
}

const InputError = ({ text, params }: Props) => {
    const { t } = useTranslation();

    if(!text) return null;

    return <Text mt="4px" ml="4px" fontSize="0.8rem" color="red.400" letterSpacing="0.03333em">{t(text, params)}</Text>;
};

export default InputError;