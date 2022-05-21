import React from 'react';
import { chakra, HStack, IconButton, Select } from "@chakra-ui/react"
import { FaAngleRight, FaAngleLeft, FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


interface Props {
    rowsOptions?: number[],
    page: number;
    maxPage: number;
    rowsPerPage: number;
    // goToPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
    nextPage: () => void;
    prevPage: () => void;
    changeRowsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TablePagination = ({ page, maxPage, rowsPerPage, rowsOptions = [5, 10, 20, 40], goToFirstPage, goToLastPage, nextPage, prevPage, changeRowsPerPage }: Props) => {
    const { t } = useTranslation();

    return (
        <HStack minWidth="356px" spacing={4} justifyContent="flex-end" p={2}>
            <IconButton
                variant="link"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                aria-label="first page"
                onClick={goToFirstPage} disabled={page === 0}
                icon={<FaAngleDoubleLeft color="gray" />}
                display={{ base: "none", md: "initial" }}
            />
            <IconButton
                variant="link"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                aria-label="previous page"
                onClick={prevPage}
                disabled={page === 0}
                icon={<FaAngleLeft color="gray" />}
            />
            <IconButton
                variant="link"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                aria-label="next page"
                onClick={nextPage}
                disabled={page === maxPage}
                icon={<FaAngleRight color="gray" />}
            />
            <IconButton
                variant="link"
                _hover={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                aria-label="last page"
                onClick={goToLastPage}
                disabled={page === maxPage}
                icon={<FaAngleDoubleRight color="gray" />}
                display={{ base: "none", md: "initial" }}
            />

            <chakra.span>
                {t("pageXofY", { x: page + 1, y: maxPage + 1 })}
            </chakra.span>
            {/* <chakra.span>
                |
            </chakra.span>
            <chakra.span>
                {t('goToPage')}:
                <Input
                    ml={1}
                    type="number"
                    value={page + 1}
                    onChange={goToPage}
                    style={{ width: '100px' }}
                />
            </chakra.span> */}
            <Select
                width="initial"
                value={rowsPerPage}
                onChange={changeRowsPerPage}
            >
                {rowsOptions.map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        {t('show')}{' '}{pageSize}
                    </option>
                ))}
            </Select>
        </HStack>
    )
}

export default TablePagination;