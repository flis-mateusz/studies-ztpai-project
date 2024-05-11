import {Method} from 'axios'
import {useMutation, UseMutationOptions} from '@tanstack/react-query'
import {IBasicAxiosRequestParams, useBasicAxiosRequest} from "@hooks/useBasicAxiosRequest.tsx";
import {ContentTypeHeader} from "@/types/IUtil.ts";

export interface IAxiosMutationOptions<T, TVariables> extends IBasicAxiosRequestParams {
    method: Exclude<Method, "GET" | "get">
    mutationOptions: UseMutationOptions<T, unknown, TVariables>
}

export const useAxiosMutation = <TVariables, T = unknown>(
    url: string,
    options: IAxiosMutationOptions<T, TVariables>
) => {
    if (options.method === 'PATCH') {
        options.contentType = ContentTypeHeader.JSON_MERGE_PATH
    }

    const {mutation} = useBasicAxiosRequest<T, TVariables>(url, options)

    return useMutation<T, unknown, TVariables>({...options.mutationOptions, mutationFn: mutation})
}
