import { PropsWithChildren, Suspense } from "react";
import { Toaster } from 'sonner';
import { NavigationProgress } from "./navigation-progress";
import { PageLoader } from "../shared/page-loader";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <>
            <Toaster richColors />
            <Suspense fallback={<PageLoader />}>
                <NavigationProgress
                    showFullPageLoader={true}
                />
            </Suspense>
            {children}
        </>
    );
}
