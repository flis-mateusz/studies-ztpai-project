export interface IMutationMethodCallbacks<T> {
    onSuccess: (data: T) => void;
    onError: (error: unknown) => void;
}

export type INoPOSTData = Record<string, never>