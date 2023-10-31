import { useState } from "react";

export type AsyncFn<T, S extends any[]> = (...args: S) => Promise<T>

export function useLoadingTracker() {
    const [numLoading, setNumLoading] = useState(0);

    function trackLoading<T, S extends any[]>(asyncFn: AsyncFn<T, S>): AsyncFn<T, S> {
        return async (...args) => {
            setNumLoading((x) => x + 1);
            const data = await asyncFn(...args);
            setNumLoading((x) => x - 1);
            return data;
        };
    }

    return { trackLoading, isLoading: numLoading > 0 };
}