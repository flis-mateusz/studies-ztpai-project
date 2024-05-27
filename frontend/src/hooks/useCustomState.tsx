import { useState, useEffect, useRef } from 'react';

export function useCustomState<T>(init: T): [T, (newState: T, callback?: (state: T) => void) => void] {
    const [state, setState] = useState<T>(init);
    const cbRef = useRef<((state: T) => void) | undefined>();

    const setCustomState = (newState: T, callback?: (state: T) => void): void => {
        cbRef.current = callback;
        setState(newState);
    };

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
        }
        cbRef.current = undefined;
    }, [state]);

    return [state, setCustomState];
}
