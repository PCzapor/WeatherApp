import { useState, useEffect } from "react";

function useDebounce(value: any, delay: number) {
    const [debouncedVal, setDebouncedVal] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedVal(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedVal;
}
export default useDebounce;
