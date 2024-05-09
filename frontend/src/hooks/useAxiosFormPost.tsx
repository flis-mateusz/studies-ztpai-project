import axios, {AxiosRequestConfig} from 'axios';
import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {useNavigate, useLocation} from 'react-router-dom';
import {ContentTypeHeader} from "@/types/IUtil.ts";

interface AxiosFormPostOptions<T> extends Omit<AxiosRequestConfig, 'url' | 'method'> {
    accept?: ContentTypeHeader
    mutationOptions: UseMutationOptions<T, unknown, FormData>;
}

export const useAxiosFormPost = <T = unknown>(
    url: string,
    options: AxiosFormPostOptions<T>
) => {
    const navigate = useNavigate();
    const location = useLocation();

    const mutationFn = async (formData: FormData): Promise<T> => {

        const config: AxiosRequestConfig = {
            ...options,
            url: url,
            method: 'POST',
            data: formData,
            headers: {
                Accept: options.accept ? options.accept : ContentTypeHeader.JSON_LD,
                ...options.headers,
                "Content-Type": 'multipart/form-data',
            },
        };

        return axios.request<T>(config)
            .then((res) => res.data)
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate('/login', {state: {from: location}, replace: true});
                }
                throw err;
            });
    };

    return useMutation<T, unknown, FormData>({...options.mutationOptions, mutationFn});
}