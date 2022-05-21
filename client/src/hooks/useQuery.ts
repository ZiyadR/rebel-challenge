import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { QueryKey, QueryFunction, useQuery, UseQueryOptions } from "react-query";
import { useTranslation } from "react-i18next";

interface Props {
}

const useQueryWithHandlers = <T>(queryKey: QueryKey, queryFn: QueryFunction<T, QueryKey>, allOptions?: Props & UseQueryOptions<T, AxiosError<any>, T, QueryKey>) => {

    const toast = useToast();
    const { t } = useTranslation();


    const { isLoading, isError, data, error } = useQuery<T, AxiosError>(queryKey, queryFn, { staleTime: 2 * 60 * 1000, ...allOptions });

    useEffect(() => {
        if (isError) {

            toast({
                description: typeof error.response.data === 'string' ? error.response.data : "Something went wrong. Please try again later.",
                status: "error",
                isClosable: true,
            })
        }
    }, [isError])

    return { isLoading, isError, data };
};

export default useQueryWithHandlers;