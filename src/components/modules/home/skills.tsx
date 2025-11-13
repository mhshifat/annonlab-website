interface SkillsProps {
    links: { src: string; alt: string }[]
}

export default function Skills({ links }: SkillsProps) {
    return (
        <section className="skills">
            <div className="container">
                <div className="lists">
                    {links.map(link => (
                        <img key={link.src} src={link.src} alt={link.alt} />
                    ))}
                </div>
            </div>
        </section>
    )
}