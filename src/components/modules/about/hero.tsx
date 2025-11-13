import { ReactNode } from "react";

interface AboutHeroProps {
    title: ReactNode;
}

export default function AboutHero(props: AboutHeroProps) {
    return (
        <section className="hero">
            <div className="container">
                <h3>{props.title}</h3>
            </div>
        </section>
    )
}