import {useMutation} from '@tanstack/react-query';
import {IAxiosMutationOptions} from "@hooks/useAxiosMutation.tsx";
import {useBasicAxiosRequest} from "@hooks/useBasicAxiosRequest.tsx";

interface IAxiosFormPostOptions<T, TVariables> extends Omit<IAxiosMutationOptions<T, TVariables>, 'method'> {
}

export const useAxiosFormPost = <T = unknown, TVariables = FormData>(
    url: string,
    options: IAxiosFormPostOptions<T, TVariables>
) => {
    const {mutation} = useBasicAxiosRequest<T, TVariables>(url, {
        ...options,
        method: 'POST',
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })

    return useMutation<T, unknown, TVariables>({...options.mutationOptions, mutationFn: mutation});
}