import { PropsWithChildren } from "react";
import './global.css';

export default function Layout({
    children
}: PropsWithChildren) {
    return (
        <>
            {children}
        </>
    )
}