import { PropsWithChildren } from "react";
import { Toaster } from 'sonner';
import { NavigationProgress } from "./navigation-progress";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <>
            <Toaster richColors />
            <NavigationProgress
                showFullPageLoader={true}
            />
            {children}
        </>
    );
}
