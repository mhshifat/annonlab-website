import Link from "next/link";
import { ReactNode } from "react";

interface HeroProps {
    title: ReactNode;
    subtitle: ReactNode;
    description: ReactNode;
    ctaText: ReactNode;
    ctaHref: string;
    secondaryCtaText: ReactNode;
    secondaryCtaHref: string;
}

export default function Hero(props: HeroProps) {
    return (
        <section className="hero">
            <div className="container">
                <span>{props.subtitle}</span>
                <h3>{props.title}</h3>
                <div>{props.description}</div>
                <div className="actions">
                    <Link className="cta" href={props.ctaHref}>
                        {props.ctaText}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12C22 17.5228 17.5229 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5229 2 22 6.47715 22 12Z" stroke="#0E131B" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M15 9L8 16" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.11274C10 8.11274 14.8288 7.70569 15.5616 8.43847C16.2944 9.17125 15.8873 14 15.8873 14" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <Link href={props.secondaryCtaHref}>{props.secondaryCtaText}</Link>
                </div>
            </div>
        </section>
    )
}