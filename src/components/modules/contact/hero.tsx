import { ReactNode } from "react";

interface ContactHeroProps {
    title: ReactNode;
}

export default function ContactHero(props: ContactHeroProps) {
    return (
        <section className="hero">
            <div className="container">
                <h3>{props.title}</h3>
            </div>
        </section>
    )
}