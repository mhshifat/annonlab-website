export const dynamic = 'force-dynamic';

import BlogsHero from '@/components/modules/blogs/hero';
import './blogs.css';
import BlogList from '@/components/modules/blogs/blog-list';
import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import Newsletter from '@/components/shared/newsletter';
import { Media } from '@/payload-types';

export async function generateMetadata() {
    const payload = await getPayload({ config });
    const result = await payload.findGlobal({
        slug: 'blogsPage',
        select: {
            seo: true,
        }
    })
    const seo = result?.seo;

    return {
        title: seo?.title || "Blogs",
        description: seo?.description || "",
        keywords: seo?.keywords || [],
    }
}

export default async function Blogs({ searchParams }: { searchParams: { category: string } }) {
    const category = (await searchParams)?.category;
    const payload = await getPayload({ config });

    const [blogsPage, newsletter, blogs, blogWithCategories] = await Promise.all([
        payload.findGlobal({
            slug: "blogsPage"
        }),
        payload.findGlobal({
            slug: "newsletter"
        }),
        payload.find({
            collection: 'blogs',
            limit: 100,            // optional, pagination
            sort: '-createdAt',   // optional, newest first
            where: {
                ...(category ? {
                    category: {
                        equals: category
                    }
                } : {})
            }
        }),
        payload.find({
            collection: 'blogs',
            sort: '-createdAt',   // optional, newest first
            select: {
                category: true,
            },
        }),
    ]);

    return (
        <>
            <BlogsHero
                title={blogsPage?.hero?.title ? <RichText data={blogsPage.hero.title} /> : <>Behind the builds: stories,<br /> insights, and lessons.</>}
                subtitle={blogsPage?.hero?.subtitle ? <RichText data={blogsPage.hero.subtitle} /> : <>Blog</>}
                description={blogsPage?.hero?.description ? <RichText data={blogsPage.hero.description} /> : <>Notes from our journey through pixels, prototypes, and production code.</>}
            />
            <BlogList
                categories={[
                    { label: 'All', value: "all", active: !category },
                    ...blogWithCategories.docs.map(cat => ({
                        label: cat?.category || "Uncategorized",
                        value: cat?.category || "Uncategorized",
                        active: category === cat.category,
                    }))
                ]}
                data={blogs?.docs?.map((blog) => ({
                    title: blog?.title ? <RichText data={blog.title} /> : "Untitled",
                    excerpt: blog?.excerpt ? <RichText data={blog.excerpt} /> : "No excerpt available.",
                    category: blog?.category || "Uncategorized",
                    id: blog.id,
                    image: (blog.image as Media)?.url || '',
                    readTime: blog?.readTime || "Unknown",
                    link: `/blogs/${blog.id}`,
                })) || []}
            />
            <Newsletter
                title={newsletter?.title ? <RichText data={newsletter.title} /> : "Stay in the loop"}
                subtitle={newsletter?.subtitle ? <RichText data={newsletter.subtitle} /> : <>Want to build something cool? Need a problem solved? Or just curious about how<br /> we work? Ping us — we’ll get back before your browser refreshes.</>}
            />
        </>
    )
}