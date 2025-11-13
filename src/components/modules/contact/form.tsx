"use client";

import { ReactNode, useState } from "react"
import { toast } from "sonner";

interface ContactFormProps {
    title: ReactNode;
    subtitle: ReactNode;
}

export default function ContactForm({ title, subtitle }: ContactFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await fetch(`/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            setFormData({
                name: '',
                email: '',
                message: '',
            })
            toast.success("Message sent successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Message sending failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="ContactForm">
            <div className="container">
                <h3>{title}</h3>
                <div>{subtitle}</div>

                <form onSubmit={handleSubmit} className="flex items-center flex-col gap-20">
                    <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({
                        ...prev,
                        name: e.target.value
                    }))} placeholder="Your Name" required />
                    <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({
                        ...prev,
                        email: e.target.value
                    }))} placeholder="Your Email" required />
                    <textarea value={formData.message} onChange={(e) => setFormData(prev => ({
                        ...prev,
                        message: e.target.value
                    }))} placeholder="Your Message" required></textarea>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    )
}