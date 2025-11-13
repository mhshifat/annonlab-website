import { PropsWithChildren } from "react";
import { Toaster } from 'sonner';

export default function Providers({ children }: PropsWithChildren) {
    return (
        <>
            <Toaster richColors />
            {children}
        </>
    );
}
