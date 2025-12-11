export const dynamic = 'force-dynamic';

import './blog.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { formatDate } from 'date-fns';
import BlogSlides from '@/components/shared/blogs';
import { Media } from '@/payload-types';
import BlogPreview from '../../../../assets/images/blog-1.png';
import generateMeta from '@/lib/generate-metadata';
import { RichTextWrapper } from '@/components/shared/rich-text';

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const slug = (await params).slug;
    const payload = await getPayload({ config });
    const result = await payload.find({
        collection: 'blogs',
        where: {
            slug: {
                equals: slug,
            },
        },
        limit: 1,
    });

    return generateMeta({ doc: result.docs[0] });
}

export default async function Blog({ params }: { params: { slug: string } }) {
    const slug = (await params).slug;
    const payload = await getPayload({ config });
    const [blogsWithSlug, blogSlides, blogs] = await Promise.all([
        payload.find({
            collection: 'blogs',
            where: {
                slug: {
                    equals: slug,
                },
            },
            limit: 1,
        }),
        payload.findGlobal({
            slug: "blogSlides"
        }),
        payload.find({
            collection: 'blogs',
            limit: 10,            // optional, pagination
            sort: '-createdAt',   // optional, newest first
        })
    ]);

    const result = blogsWithSlug.docs[0];

    return (
        <div className="BlogDetails">
            <div className='container'>
                <div className="BlogDetails__Breadcrumb">
                    <span>Blog</span>
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
                            stroke="#595F6A"
                            strokeWidth="1.125"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>
                        {result?.title ? <RichText data={result.title} /> : 'Blog Title'}
                    </span>
                </div>

                <h1 className='BlogDetails__Title'>{result?.title ? <RichText data={result.title} /> : 'Blog Title'}</h1>

                <div className='BlogDetails__Profile'>
                    <span>{result?.author || 'Author Name'}</span>
                    <span>•</span>
                    <span>{result?.readTime || '12 mins read'}</span>
                    <span>•</span>
                    <span>{result?.createdAt ? formatDate(new Date(result.createdAt), "PP") : '24 Jun 2025'}</span>
                </div>

                <div className='BlogDetails__Content'>
                    {result?.content ? <RichTextWrapper data={result.content} /> : 'Blog Content'}
                </div>
            </div>
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
        </div>
    );
}