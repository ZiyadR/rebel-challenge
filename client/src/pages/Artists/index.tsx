import React, { useState } from 'react';
import { Button, IconButton, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, useDisclosure, Box, Tooltip, Input, Switch, Text } from '@chakra-ui/react'
import { useTranslation } from "react-i18next";
import Layout from '../../components/layouts/MainLayout'
import { Card } from '../../components/Card';
import { useArtistsQuery, useDeleteArtist, useUpdatePayment } from './queries';
import { FaPlus as PlusIcon, FaTrash as DeleteIcon } from "react-icons/fa";
import { Artist } from '../../models';
import Loader from '../../components/Loader';
import ArtistEdit from './ArtistEdit';
import useFilter from './useFilter';
import usePagination from '../../hooks/usePagination';
import useSortableData from '../../hooks/useSortableData';
import ThSort from '../../components/ThSort';
import TablePagination from '../../components/TablePagination';
import { displayMoney } from '../../helpers/utils';
import { ConfirmModal } from '../../components/ConfirmModal';

interface Props {
}

const Artists = (props: Props) => {
    const { t } = useTranslation();

    const [artist, setArtist] = useState<Artist>(null);

    const { isLoading, data: artists } = useArtistsQuery();

    const { filteredArtists, search, handleSearch } = useFilter(artists);

    const { sortedItems: sortedArtists, requestSort, sortConfig } = useSortableData<Artist>(filteredArtists, { key: 'payout', direction: 'descending' });

    const { page, maxPage, rowsPerPage, goToFirstPage, goToLastPage, nextPage, prevPage, changeRowsPerPage } = usePagination(filteredArtists?.length, 10);

    const pageProps = { page, maxPage, rowsPerPage, goToFirstPage, goToLastPage, nextPage, prevPage, changeRowsPerPage };

    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const editArtist = (e: React.MouseEvent<HTMLButtonElement>) => {
        const artistId = Number.parseInt(e.currentTarget?.value, 10);
        const artist = artists.find(b => b.id === artistId);
        setArtist(artist);
        onEditOpen();
    }

    const newArtist = (e: React.MouseEvent<HTMLButtonElement>) => {
        setArtist(null);
        onEditOpen();
    }

    const { mutate: updatePayment } = useUpdatePayment();

    const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = {
            id: Number.parseInt(e.target.value, 10),
            paid: e.target.checked
        }

        updatePayment(status);
    }

    const { mutateAsync: submitDeleteArtist, isLoading: deleteSubmitting } = useDeleteArtist();

    const [deleteId, setDeleteId] = useState(0);

    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const deleteArtist = (e: React.MouseEvent<HTMLButtonElement>) => {
        const artistId = Number.parseInt(e.currentTarget.value, 10);
        setDeleteId(artistId);
        onDeleteOpen();
    }

    const handleDelete = async () => {
        await submitDeleteArtist(deleteId);
        onDeleteClose();
    }

    const overflowX: any = useBreakpointValue({ base: "auto", md: "hidden" });

    if (isLoading) return <Loader />;

    const artistsDisplayed = artists?.length > 0;

    return (
        <Layout title={t("artists")}>
            <Card py={5}>
                <Box overflowX={overflowX}>

                    {isEditOpen ? <ArtistEdit onClose={onEditClose} artist={artist} />
                        : <>
                            {artistsDisplayed && <Box w="450px" maxW="80%" mx={5} my={3}>
                                <Input background="white" borderRadius="sm" placeholder={t('search')} value={search} onChange={handleSearch} />
                            </Box>}

                            {!artistsDisplayed && <Text color="gray.500" mx={5} mb={5}>{t("noArtists")}</Text>}

                            <Table variant="simple">
                                {artistsDisplayed && <Thead>
                                    <Tr>
                                        <ThSort pl={6} sortConfig={sortConfig} requestSort={requestSort} title={t('name')} sortKey="name" />
                                        <ThSort isNumeric sortConfig={sortConfig} requestSort={requestSort} title={t('rate')} sortKey="rate" />
                                        <ThSort isNumeric sortConfig={sortConfig} requestSort={requestSort} title={t('streams')} sortKey="streams" />
                                        <ThSort isNumeric sortConfig={sortConfig} requestSort={requestSort} title={t('totalPayout')} sortKey="payout" />
                                        <ThSort isNumeric sortConfig={sortConfig} requestSort={requestSort} title={t('payoutPerMonth')} sortKey="payoutPerMonth" />
                                        <ThSort sortConfig={sortConfig} requestSort={requestSort} title={t('paid')} sortKey="paid" />
                                        <Th></Th>
                                    </Tr>
                                </Thead>}
                                <Tbody>
                                    {sortedArtists?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(e => (
                                        <Tr key={e.id}>
                                            <Td>
                                                <Button variant="ghost" value={e.id} onClick={editArtist}>{e.name}</Button>
                                            </Td>
                                            <Td isNumeric>{displayMoney(e.rate, 6)}</Td>
                                            <Td isNumeric>{e.streams}</Td>
                                            <Td isNumeric>{displayMoney(e.payout)}</Td>
                                            <Td isNumeric>{displayMoney(e.payoutPerMonth)}</Td>
                                            <Td><Switch value={e.id} isChecked={e.paid} onChange={handlePayment} /></Td>
                                            <Td>
                                                <Tooltip label={t("delete")}>
                                                    <IconButton
                                                        value={e.id}
                                                        onClick={deleteArtist}
                                                        variant="ghost"
                                                        aria-label={t("delete")}
                                                        icon={<DeleteIcon color='teal' />}
                                                    />
                                                </Tooltip>

                                            </Td>
                                        </Tr>
                                    ))}

                                    <Tr>
                                        <Td colSpan={5} borderWidth="1px" borderColor="gray.100" p={0}>
                                            <Button variant="ghost" onClick={newArtist} leftIcon={<PlusIcon size={12} />} w="100%" justifyContent="flex-start" borderRadius={0}>{t('newArtist')}</Button>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                            {artistsDisplayed && <TablePagination {...pageProps} />}

                            <ConfirmModal isOpen={isDeleteOpen} onClose={onDeleteClose} onAccept={handleDelete} isLoading={deleteSubmitting} title={t("deleteArtist")} isDangerous />
                        </>}
                </Box>
            </Card>
        </Layout>
    )
}

export default Artists;