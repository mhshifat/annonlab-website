import { ReactNode } from "react";

interface CultureProps {
    title: ReactNode;
    subtitle: ReactNode;
    description: ReactNode;
}

export default function Culture({ title, subtitle, description }: CultureProps) {
    return (
        <section className="culture">
            <div className="container">
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <div>{description}</div>
            </div>
        </section>
    )
}