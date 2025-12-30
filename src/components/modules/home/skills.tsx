import Image from 'next/image';

interface SkillsProps {
    links: { src: string; alt: string }[]
}

export default function Skills({ links }: SkillsProps) {
    return (
        <section className="skills">
            <div className="container">
                <div className="lists">
                    {links.map(link => (
                        <Image key={link.src} src={link.src} alt={link.alt} width={80} height={80} loading="lazy" />
                    ))}
                </div>
            </div>
        </section>
    )
}