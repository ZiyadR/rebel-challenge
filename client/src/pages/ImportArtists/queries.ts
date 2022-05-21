import ajax, { Method } from "../../helpers/ajax";
import useMutation from "../../hooks/useMutation";
import { useQueryClient } from "react-query";
import i18n from "../../Localization/i18n";

export const useImportArtists = () => {
    const uploadQuery = (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return ajax.call('artists/import', Method.POST, formData, true);
    };

    const queryClient = useQueryClient();

    const onSettled = () => {
        queryClient.invalidateQueries('artists');
    };

    return useMutation<number, File>(uploadQuery, { onSettled, successMessage: i18n.t("artistsImported"), redirectPath: "/artists" });;
}