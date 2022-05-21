import React, { useState } from "react";

const usePagination = (count: number, initialRows = 5) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialRows);

    const maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);

    // const goToPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const parsedPage = parseInt(event.target.value, 10);

    //     if(isNaN(parsedPage) || parsedPage < 0) setPage(0);
    //     else if(parsedPage > maxPage) setPage(maxPage);
    //     else setPage(parsedPage - 1);
    // };

    const goToFirstPage = () => {
        setPage(0);
    };

    const goToLastPage = () => {
        setPage(maxPage);
    };

    const nextPage = () => {
        setPage(page => page + 1);
    };

    const prevPage = () => {
        setPage(page => page - 1);
    };

    const changeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return { page, maxPage, rowsPerPage, goToFirstPage, goToLastPage, nextPage, prevPage, changeRowsPerPage };

};

export default usePagination;