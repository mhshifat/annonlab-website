export const revalidate = 60; // Revalidate every 60 seconds

import AboutHero from '@/components/modules/about/hero';
import './about.css';
import AboutSubHero from '@/components/modules/about/sub-hero';
import Stats from '@/components/shared/stats';
import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import HowWeWork from '@/components/modules/about/how-we-work';
import { Media } from '@/payload-types';
import Image from 'next/image';
import Testimonials from '@/components/shared/testimonials';
import TestimonialPng from '../../../assets/images/testimonial-avatar.png';
import BlogSlides from '@/components/shared/blogs';
import BlogPreview from '../../../assets/images/blog-1.png';
import Newsletter from '@/components/shared/newsletter';

export async function generateMetadata() {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
        slug: 'about',
        select: {
            seo: true,
        }
    })
    const seo = result?.seo;

    return {
        title: seo?.title || "About Us",
        description: seo?.description || "",
        keywords: seo?.keywords || [],
    }
}

export default async function AboutPage() {
    const payload = await getPayload({ config });

    const [about, stats, testimonials, blogSlides, newsletter, blogs] = await Promise.all([
        payload.findGlobal({
            slug: "about"
        }),
        payload.findGlobal({
            slug: "stats"
        }),
        payload.findGlobal({
            slug: "testimonials"
        }),
        payload.findGlobal({
            slug: "blogSlides"
        }),
        payload.findGlobal({
            slug: "newsletter"
        }),
        payload.find({
            collection: 'blogs',
            limit: 10,            // optional, pagination
            sort: '-createdAt',   // optional, newest first
        })
    ]);

    return (
        <>
            <AboutHero
                title={about?.hero?.title ? <RichText data={about.hero.title} /> : <>About Annonlab</>}
            />
            <AboutSubHero
                title={about?.subHero?.title ? <RichText data={about.subHero.title} /> : <>Delivered excellence</>}
                subtitle={about?.subHero?.subtitle ? <RichText data={about.subHero.subtitle} /> : <>At Annonlab, we’re not just building software - we’re building solutions around<br /> people. We believe in clarity, speed, and real collaboration - because your<br /> challenges deserve more than generic fixes.</>}
            />
            <Stats
                yearsInBusiness={stats?.yearsInBusiness || "10+"}
                productsOwned={stats?.productsOwned || "4+"}
                completedProjects={stats?.completedProjects || "12+"}
                countriesServed={stats?.countriesServed || "6+"}
            />
            <HowWeWork
                title={about?.howWeWork?.title ? <RichText data={about.howWeWork.title} /> : <>How we work</>}
                subtitle={about?.howWeWork?.subtitle ? <RichText data={about.howWeWork.subtitle} /> : <>We combine clean code, intentional design, and smart workflows to ship fast and solve what matters most to you.</>}
                steps={about?.howWeWork?.steps?.map(step => ({
                    title: step.title ? <RichText data={step.title} /> : <></>,
                    description: step.description ? <RichText data={step.description} /> : <></>,
                    image: (step.image as Media)?.url || "",
                })) || []}
            />
            {testimonials?.data?.length && <Testimonials
                title={testimonials?.title ? <RichText data={testimonials.title} /> : "Voices of Trust"}
                subtitle={testimonials?.subtitle ? <RichText data={testimonials.subtitle} /> : "Their words, our Motivation"}
                data={testimonials?.data?.map((item) => ({
                    id: item.id!,
                    author: item.author || "John Doe",
                    position: item.position || "CEO, Company",
                    company: item.company || "CEO, Company",
                    content: item?.content ? <RichText data={item.content} /> : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    image: (item.image as Media)?.url || TestimonialPng.src,
                    logo: (item.logo as Media)?.url ? <Image src={(item.logo as Media).url!} alt="Company logo" width={100} height={40} loading="lazy" /> : "",
                })) || []}
            />}

            {blogs.docs?.length && <BlogSlides
                title={blogSlides?.title ? <RichText data={blogSlides.title} /> : "From Our Blog"}
                subtitle={blogSlides?.subtitle ? <RichText data={blogSlides.subtitle} /> : "Insights, stories, and tips"}
                ctaText={blogSlides?.ctaText || "View all"}
                ctaLink={blogSlides?.ctaLink || "/blogs"}
                data={blogs.docs.map((blog) => ({
                    id: blog.id,
                    title: blog.title ? <RichText data={blog.title} /> : "Blog Title",
                    excerpt: blog.excerpt ? <RichText data={blog.excerpt} /> : "Blog excerpt goes here...",
                    image: (blog.image as Media)?.url || BlogPreview.src,
                    link: `/blogs/${blog.slug}`,
                    category: blog.category || "General",
                    readTime: blog.readTime || "5 min read",
                }))}
            />}

            <Newsletter
                title={newsletter?.title ? <RichText data={newsletter.title} /> : "Stay in the loop"}
                subtitle={newsletter?.subtitle ? <RichText data={newsletter.subtitle} /> : <>Want to build something cool? Need a problem solved? Or just curious about how<br /> we work? Ping us — we’ll get back before your browser refreshes.</>}
            />
        </>
    )
}