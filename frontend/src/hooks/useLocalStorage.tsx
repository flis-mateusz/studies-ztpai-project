import {useCallback, useState} from "react";

export const useLocalStorage = <T, >(key: string, defaultValue: T): [T, (value: T) => void] => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = useCallback((value: T) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (err) {
            console.error("Error setting localStorage:", err);
        }
    }, [key]);

    return [storedValue, setValue];
};
