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
                <h5>{title}</h5>
                <h3>{subtitle}</h3>
                <div>{description}</div>
            </div>
        </section>
    )
}