import React from "react";
import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { MutationFunction, useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { HttpStatusCode } from "../helpers/ajax";

interface Props {
    /** On success toast message */
    successMessage?: string,
    /** On success redirect to path */
    redirectPath?: string,

    onNotFound?: () => void,
}

const useMutationWithHandlers = <T = unknown, F = void>(mutationFn: MutationFunction<AxiosResponse<T, any>, F>, { successMessage, redirectPath, onNotFound, onSuccess: onSuccessFn, onError: onErrorFn, ...restProps }: Props & UseMutationOptions<AxiosResponse<T>, AxiosError<T>, F>) => {
    const toast = useToast();

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const onSuccess = (data, variables, context) => {
        if (successMessage) {
            toast({
                description: successMessage,
                status: "success",
                isClosable: true,
            });
        }

        if (onSuccessFn) onSuccessFn(data, variables, context);

        if (redirectPath) navigate(redirectPath);
    }

    const onError = (err: AxiosError<T, any>, variables: F, context) => {
        if (err.response.status === HttpStatusCode.NOT_FOUND && onNotFound) {
            onNotFound();
        } else {
            toast({
                description: typeof err.response.data === 'string' ? err.response.data : "Something went wrong. Please try again later.",
                status: "error",
                isClosable: true,
            })

            if (onErrorFn) onErrorFn(err, variables, context)
        }
    }

    return useMutation<AxiosResponse<T>, AxiosError<T>, F>(mutationFn, { onSuccess, onError, ...restProps });
};

export default useMutationWithHandlers;