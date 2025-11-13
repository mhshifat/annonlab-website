export const dynamic = 'force-dynamic';

import Culture from '@/components/modules/home/culture';
import './home.css';
import Hero from "@/components/modules/home/hero";
import WhoWeAre from '@/components/modules/home/who-we-are';
import Stats from '@/components/shared/stats';
import Skills from '@/components/modules/home/skills';
import WhatWeServe from '@/components/modules/home/what-we-serve';
import Testimonials from '@/components/shared/testimonials';
import TestimonialPng from '../../assets/images/testimonial-avatar.png';
import BlogSlides from '@/components/shared/blogs';
import BlogPreview from '../../assets/images/blog-1.png';
import Newsletter from '@/components/shared/newsletter';
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react';
import { Media } from '@/payload-types';

export async function generateMetadata() {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: 'homepage',
    select: {
      seo: true,
    }
  })
  const seo = result?.seo;

  return {
    title: seo?.title || "Homepage",
    description: seo?.description || "",
    keywords: seo?.keywords || [],
  }
}

export default async function Homepage() {
  const payload = await getPayload({ config });

  const [homepage, stats, testimonials, blogSlides, newsletter, blogs] = await Promise.all([
    payload.findGlobal({
      slug: "homepage"
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
      <Hero
        title={homepage.hero?.title ? <RichText data={homepage.hero.title} /> : <>Software that works<br /> for Real people</>}
        subtitle={homepage.hero?.subtitle ? <RichText data={homepage.hero.subtitle} /> : "Engineering what the future needs"}
        description={homepage.hero?.description ? <RichText data={homepage.hero.description} /> : <>We are a team of experienced and creative<br /> designers and developers.</>}
        ctaText={homepage.hero?.ctaText || "Share your project idea"}
        ctaHref={homepage.hero?.ctaHref || "/contact"}
        secondaryCtaText={homepage.hero?.secondaryCtaText || "Our works"}
        secondaryCtaHref={homepage.hero?.secondaryCtaHref || "/works"}
      />

      <WhoWeAre />

      <Culture
        title={homepage.culture?.title ? <RichText data={homepage.culture.title} /> : "Company & culture"}
        subtitle={homepage.culture?.subtitle ? <RichText data={homepage.culture.subtitle} /> : <>We are committed to finding innovative &<br /> unconventional solutions. Pushing<br /> boundaries to exceed client goals.</>}
        description={homepage.culture?.description ? <RichText data={homepage.culture.description} /> : <>We aim to develop and promote various services with advanced and latest technologies. Our goal is to ensure the highest level of quality and overall client satisfaction by delivering a perfect product within the given time.</>}
      />

      <Stats
        yearsInBusiness={stats?.yearsInBusiness || "10+"}
        productsOwned={stats?.productsOwned || "4+"}
        completedProjects={stats?.completedProjects || "12+"}
        countriesServed={stats?.countriesServed || "6+"}
      />

      <Skills
        links={homepage.skills?.links?.map((item) => ({
          src: (item.image as Media)?.url || "",
          alt: (item.image as Media)?.alt || "",
        })) || []}
      />

      <WhatWeServe
        title={homepage.whatWeServe?.title ? <RichText data={homepage.whatWeServe.title} /> : "What we serve"}
        subtitle={homepage.whatWeServe?.subtitle ? <RichText data={homepage.whatWeServe.subtitle} /> : <>From concept to<br /> code - we do it all</>}
        description={homepage.whatWeServe?.description ? <RichText data={homepage.whatWeServe.description} /> : <>Our software teams help our customers build<br /> customized software solutions - everything from web<br /> to desktop to enterprise to mobile and beyond.</>}
        ctaText={homepage.whatWeServe?.ctaText || "Contact us"}
        ctaLink={homepage.whatWeServe?.ctaLink || "/contact"}
        steps={homepage.whatWeServe?.steps?.map((item) => item.content || "") || []}
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
          logo: (item.logo as Media)?.url ? <img src={(item.logo as Media).url!} /> : "",
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
          link: `/blogs/${blog.id}`,
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