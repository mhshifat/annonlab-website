"use client";

import { Loader2Icon } from "lucide-react";
import { ReactNode, useState } from "react"
import { toast } from "sonner";

interface NewsletterProps {
    title: ReactNode;
    subtitle: ReactNode;
}

export default function Newsletter({ title, subtitle }: NewsletterProps) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await fetch(`/api/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            setEmail("");
            toast.success("Subscribed successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Subscription failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="newsletter">
            <div className="container">
                <h3>{title}</h3>
                <div>{subtitle}</div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tell us your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">
                        {loading ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.4">
                                    <path d="M20.2672 28.6668L28.6654 3.33398L3.33203 11.402L15.3407 16.6587L20.2672 28.6668Z" stroke="#0E131B" strokeWidth="2" strokeLinejoin="round" />
                                    <path d="M15.332 16.6667L19.9987 12" stroke="#0E131B" strokeWidth="2" strokeLinejoin="round" />
                                </g>
                            </svg>
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}