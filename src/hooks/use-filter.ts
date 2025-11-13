import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react"

export default function useFilter() {
    const pathname = usePathname();
    const navigate = useRouter();

    const filter = useCallback(
        (property: string | Record<string, string>, value?: string) => {
            if (typeof window === "undefined") return;
            const searchParams = new URLSearchParams(window.location.search);

            // Case 1: property is a single string
            if (typeof property === "string") {
                if (!value) {
                    searchParams.delete(property);
                } else {
                    searchParams.set(property, value);
                }
            }

            // Case 2: property is an object (multiple filters)
            else {
                for (const key in property) {
                    const val = property[key];
                    if (!val) {
                        searchParams.delete(key);
                    } else {
                        searchParams.set(key, val);
                    }
                }
            }

            navigate.push(`${pathname}?${searchParams.toString()}`);
            navigate.refresh()
        },
        [pathname, navigate]
    );
    const filterValues = useMemo(() => {
        if (typeof window === "undefined") return;
        const searchParams = new URLSearchParams(window.location.search);
        const values: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            values[key] = value;
        });
        return values;
    }, []);

    return {
        filter,
        filterValues
    };
}