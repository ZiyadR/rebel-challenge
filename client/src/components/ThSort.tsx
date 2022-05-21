import React from 'react';
import { Th, TableColumnHeaderProps, chakra, Button } from '@chakra-ui/react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { SortConfig } from '../models';

interface ThProps {
    title: string,
    sortKey: string,
    sortConfig: SortConfig,
    requestSort: (key: string) => void,
}

const ThSort = ({ title, sortKey, sortConfig, requestSort, ...props }: ThProps & TableColumnHeaderProps) => {
    const sorted = sortKey === sortConfig.key;
    const desc = sortConfig.direction === "descending";

    return (
        <Th p={2} {...props}>
            <Button variant="ghost" _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }} onClick={() => requestSort(sortKey)}>
                {title}
                {sorted && <chakra.span pl="4">
                    {desc ? <FaCaretDown aria-label="sorted descending" /> : <FaCaretUp aria-label="sorted ascending" />}
                </chakra.span>}
            </Button>
        </Th>
    )
}

export default ThSort;