import { ReactNode } from "react";

interface AboutSubHeroProps {
    title: ReactNode;
    subtitle: ReactNode;
}

export default function AboutSubHero(props: AboutSubHeroProps) {
    return (
        <section className="sub-hero">
            <div className="container">
                <h4>{props.title}</h4>
                <div className="p">{props.subtitle}</div>
            </div>
        </section>
    )
}