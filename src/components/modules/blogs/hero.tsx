import { ReactNode } from "react";

interface BlogsHeroProps {
    title: ReactNode;
    subtitle: ReactNode;
    description: ReactNode;
}

export default function BlogsHero(props: BlogsHeroProps) {
    return (
        <section className="hero">
            <div className="container">
                <h5>{props.subtitle}</h5>
                <h3>{props.title}</h3>
                <div>{props.description}</div>
            </div>
        </section>
    )
}