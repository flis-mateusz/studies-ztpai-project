import {useMutation} from '@tanstack/react-query';
import {IAxiosMutationOptions} from "@hooks/useAxiosMutation.tsx";
import {useBasicAxiosRequest} from "@hooks/useBasicAxiosRequest.tsx";

interface AxiosFormPostOptions<T> extends Omit<IAxiosMutationOptions<T, FormData>, 'method'> {
}

export const useAxiosFormPost = <T, >(
    url: string,
    options: AxiosFormPostOptions<T>
) => {
    const {mutation} = useBasicAxiosRequest<T, FormData>(url, {
        ...options,
        method: 'POST',
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })

    return useMutation<T, unknown, FormData>({...options.mutationOptions, mutationFn: mutation});
}