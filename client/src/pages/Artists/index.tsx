import React, { useState } from 'react';
import { useBreakpointValue, useDisclosure, Box } from '@chakra-ui/react'
import { useTranslation } from "react-i18next";
import Layout from '../../components/layouts/MainLayout'
import { Card } from '../../components/Card';
import { useDeleteArtist } from './queries';
import { Artist } from '../../models';
import ArtistEdit from './ArtistEdit';
import { ConfirmModal } from '../../components/ConfirmModal';
import ArtistList from './ArtistList';

interface Props {
}

const Artists = (props: Props) => {
    const { t } = useTranslation();

    const [artist, setArtist] = useState<Artist>(null);

    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const { mutateAsync: submitDeleteArtist, isLoading: deleteSubmitting } = useDeleteArtist();

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const handleDelete = async () => {
        await submitDeleteArtist(artist?.id);
        onDeleteClose();
    }

    const overflowX: any = useBreakpointValue({ base: "auto", md: "hidden" });

    return (
        <Layout title={t("artists")}>
            <Card py={5}>
                <Box overflowX={overflowX}>

                    {isEditOpen
                        ? <ArtistEdit onClose={onEditClose} artist={artist} />
                        : <ArtistList setArtist={setArtist} onEditOpen={onEditOpen} onDeleteOpen={onDeleteOpen} />
                    }
                </Box>
                <ConfirmModal isOpen={isDeleteOpen} onClose={onDeleteClose} onAccept={handleDelete} isLoading={deleteSubmitting} title={t("deleteArtist")} isDangerous />

            </Card>
        </Layout>
    )
}

export default Artists;