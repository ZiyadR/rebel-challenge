import useQuery from "../../hooks/useQuery";
import { useQueryClient } from "react-query";
import { Artist } from "../../models";
import ajax from "../../helpers/ajax";
import useMutation from "../../hooks/useMutation";
import i18n from "../../Localization/i18n";

export const useArtistsQuery = () => {
    const artistsQuery = async () => {
        const { data } = await ajax.get(`artists`);
        return data;
    }

    return useQuery<Artist[]>('artists', artistsQuery);
}

export const useEditArtist = () => {
    const editArtistQuery = (data) => ajax.put(`artists/${data.id}`, data);

    const queryClient = useQueryClient();

    const onSettled = () => {
        queryClient.invalidateQueries('artists');
    };

    return useMutation(editArtistQuery, { successMessage: i18n.t('changesSaved'), onSettled });;
}

export const useNewArtist = () => {
    const newArtistQuery = (data) => ajax.post("artists", data);

    const queryClient = useQueryClient();

    const onSettled = () => {
        queryClient.invalidateQueries('artists');
    };

    return useMutation(newArtistQuery, { successMessage: i18n.t('changesSaved'), onSettled });;
}

export const useDeleteArtist = () => {
    const artistDeleteQuery = (itemId) => ajax.del("artists/" + itemId, {});

    const queryClient = useQueryClient();

    const onSettled = () => {
        queryClient.invalidateQueries('artists');
    };

    return useMutation(artistDeleteQuery, { successMessage: i18n.t('artistDeleted'), onSettled });;
}

export const useUpdatePayment = () => {
    const statusQuery = (data) => ajax.post("artists/paid", data);
    
    const queryClient = useQueryClient();

    const onMutate = async data => {
        await queryClient.cancelQueries('artists');

        const previousArtists = queryClient.getQueryData<Artist[]>('artists');

        queryClient.setQueryData<Artist[]>('artists', artists => {
            const artistIndex = artists.findIndex(u => u.id === data.id);
            artists[artistIndex].paid = data.paid;

            return artists;
        });

        return { previousArtists };
    };

    return useMutation(statusQuery, { onMutate });
}