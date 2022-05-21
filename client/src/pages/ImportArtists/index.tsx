import React, { useState } from 'react';
import { Button, HStack, VStack, Link, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useImportArtists } from './queries';
import Layout from '../../components/layouts/MainLayout';
import { Card } from '../../components/Card';
import Dropzone from '../../components/Dropzone';
import { FiExternalLink } from 'react-icons/fi'

interface Props {
}

const ImportUsers = (props: Props) => {
    const { t } = useTranslation();

    const [file, setFile] = useState<File>(null);

    const { mutateAsync, isLoading, data } = useImportArtists();

    const upload = () => {
        mutateAsync(file);
    }

    return (
        <Layout title={t("importArtists")}>

            <Card p={5}>
                <VStack spacing={5}>
                    <HStack spacing={3} w="100%">
                        <Link href='https://raw.githubusercontent.com/rebeldotcom/roster-challenge-api-and-ui/main/roster.json' isExternal mb={3} color="teal.500">
                            <HStack alignItems="center" spacing={1}>
                                <Text>{t("sampleFile")}</Text>
                                <Icon as={FiExternalLink} />
                            </HStack>
                        </Link>
                    </HStack>

                    <Dropzone file={file} accept={{ "application/json": [".json"] }} handleFile={setFile} />

                    <HStack spacing={3} w="100%" justifyContent="right">
                        <Button onClick={upload} disabled={file === null} isLoading={isLoading}>{t("upload")}</Button>
                    </HStack>
                </VStack>
            </Card>
        </Layout>
    )
}

export default ImportUsers;
