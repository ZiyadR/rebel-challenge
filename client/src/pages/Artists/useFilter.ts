import React, { useState, useMemo } from "react";
import { Artist } from "../../models";

const useFilter = (artists: Artist[], initialSearch = '') => {
    const [search, setSearch] = useState(initialSearch);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const filteredArtists = useMemo(() => {
        if (!artists) return [];

        let filtered = [...artists];

        if (search !== '') {
            const lowerSearch = search.toLowerCase();

            filtered = filtered.filter(u => u.name.toLowerCase().includes(lowerSearch));
        }

        return filtered;
    }, [artists, search]);

    return { filteredArtists, search, handleSearch };
};

export default useFilter;