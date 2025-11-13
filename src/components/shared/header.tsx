import { ReactElement } from "react"
import Link from 'next/link';

interface HeaderProps {
    logo: ReactElement;
    navLinks: { label: string; href: string }[];
    ctaText?: string | null;
    ctaHref?: string | null;
}

export default function Header({ logo, navLinks, ctaText, ctaHref }: HeaderProps) {
    return (
        <header>
            <div className="container">
                <Link className="logo" href="">
                    {logo}
                </Link>
                <nav>
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
                {ctaText && ctaHref && (
                    <Link className="cta" href={ctaHref}>
                        {ctaText}
                    </Link>
                )}
            </div>
        </header>
    )
}