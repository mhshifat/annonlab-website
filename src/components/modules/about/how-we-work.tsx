import { ReactNode } from "react"

interface HowWeWorkProps {
    title: ReactNode;
    subtitle: ReactNode;
    steps: { title: ReactNode; description: ReactNode; image: string }[];
}

export default function HowWeWork({ title, subtitle, steps }: HowWeWorkProps) {
    return (
        <section className="how-we-work">
            <div className="container">
                <div>
                    <h4>{title}</h4>
                    <div className="p">{subtitle}</div>
                </div>
            </div>
            <div className="lists">
                <ul>
                    {steps.map((step, index) => (
                        <li key={index}>
                            <div className="container">
                                <div>
                                    <span>{`0${index + 1}`}</span>
                                    <span>{step.title}</span>
                                </div>
                                <div>
                                    {step.description && <div className="p">{step.description}</div>}
                                    {step.image && <img src={step.image} alt="" />}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}