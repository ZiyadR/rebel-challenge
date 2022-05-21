import React, { useState, useMemo } from "react";
import { SortConfig, SortDirection } from "../models";

const compareNumbers = (a: number, b: number) => a - b;

const compareStrings = (a: string, b: string) => {
    var A = a.toUpperCase();
    var B = b.toUpperCase();
    if (A < B) {
        return -1;
    }
    if (A > B) {
        return 1;
    }
    return 0;
}

export const compare = (a, b, sortConfig: SortConfig) => {
    const multiplier = sortConfig.direction === 'ascending' ? 1 : -1;

    if (typeof a[sortConfig.key] === "number" || typeof a[sortConfig.key] === "boolean")
        return multiplier * compareNumbers(a[sortConfig.key], b[sortConfig.key]);
    else if (typeof a[sortConfig.key] === "string")
        return multiplier * compareStrings(a[sortConfig.key], b[sortConfig.key]);

    return 0;
}

const useSortableData = <T>(items: T[], config: SortConfig = { key: '', direction: 'ascending' }) => {
    const [sortConfig, setSortConfig] = useState(config);

    const requestSort = (key: string) => {
        let direction: SortDirection = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";

        setSortConfig({ key, direction });
    };

    const sortedItems = useMemo(() => {
        if (!items) return [];

        const sortableItems = [...items];
        sortableItems.sort((a, b) => compare(a, b, sortConfig));

        return sortableItems;
    }, [items, sortConfig]);

    return { sortedItems, requestSort, sortConfig };
};

export default useSortableData;