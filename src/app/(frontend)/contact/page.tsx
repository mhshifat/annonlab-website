// Static generation - revalidated on-demand when content changes

import './contact.css';
import ContactHero from "@/components/modules/contact/hero";
import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import ContactForm from '@/components/modules/contact/form';

export async function generateMetadata() {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
        slug: 'contact',
        select: {
            seo: true,
        }
    })
    const seo = result?.seo;

    return {
        title: seo?.title || "Contact Us",
        description: seo?.description || "",
        keywords: seo?.keywords || [],
    }
}

export default async function ContactPage() {
    const payload = await getPayload({ config });

    const [contact] = await Promise.all([
        payload.findGlobal({
            slug: "contact"
        }),
    ]);

    return (
        <>
            <ContactHero
                title={contact?.hero?.title ? <RichText data={contact.hero.title} /> : <>Have something impactful in<br /> mind? Reach out - we’re just<br /> one message away</>}
            />
            <ContactForm
                title={contact?.form?.title ? <RichText data={contact.form.title} /> : <>Get in touch with us</>}
                subtitle={contact?.form?.description ? <RichText data={contact.form.description} /> : <>We’d love to hear from you</>}
            />
        </>
    )
}