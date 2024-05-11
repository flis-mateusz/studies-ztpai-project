import {useLocalStorage} from "@hooks/useLocalStorage.tsx";

export const useToken = () => {
    return useLocalStorage<string | null>("authToken", null)
}