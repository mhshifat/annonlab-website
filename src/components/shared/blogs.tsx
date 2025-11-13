"use client";

import Link from "next/link";
import { ReactNode, useEffect } from "react";

export interface BlogCardDetails {
    id: string;
    image: string;
    category: string;
    readTime: string;
    title: ReactNode;
    excerpt: ReactNode;
    link: string;
}

interface BlogSlidesProps {
    title: ReactNode;
    subtitle: ReactNode;
    ctaText: ReactNode;
    ctaLink: string;
    data: BlogCardDetails[];
}

export default function BlogSlides({ title, subtitle, ctaText, ctaLink, data }: BlogSlidesProps) {
    useEffect(() => {
        let swiperInstance: any;
        const timeout = setTimeout(() => {
            if (typeof window !== "undefined" && window.Swiper) {
                new Swiper('.blogs .swiper', {
                    // Optional parameters
                    // loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    slidesPerView: 2.5,
                    spaceBetween: 24,
                    breakpoints: {
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 1,
                            spaceBetween: 30
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: data.length > 3 ? 2.5 : 1,
                            spaceBetween: 30
                        }
                    },
                    centeredSlides: false,
                    // Navigation arrows
                    navigation: {
                        nextEl: '.blogs .swiper-button-next',
                        prevEl: '.blogs .swiper-button-prev',
                    },
                });
            }
        }, 0);

        return () => {
            if (swiperInstance) {
                swiperInstance.destroy();
            }
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [data.length]);

    return (
        <section className="blogs">
            <div className="container">
                <div className="info">
                    <div>
                        <h5>{title}</h5>
                        <h3>{subtitle}</h3>
                    </div>
                    <Link className="cta" href={ctaLink}>
                        {ctaText}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12C22 17.5228 17.5229 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5229 2 22 6.47715 22 12Z" stroke="#0E131B" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M15 9L8 16" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10 8.11274C10 8.11274 14.8288 7.70569 15.5616 8.43847C16.2944 9.17125 15.8873 14 15.8873 14" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                <div className="swiper">
                    <div className="swiper-wrapper">
                        {data.map(item => (
                            <div key={item.id} className="swiper-slide">
                                <div className="blog">
                                    <div className="thumbnail">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="content">
                                        <div>
                                            <span>{item.category}</span>
                                            <span>{item.readTime}</span>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <div className="p">{item.excerpt}</div>
                                        <Link href={item.link}>
                                            Read more
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.5 6.5L6 18" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="square" />
                                                <path d="M8 6H18V16" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="square" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="blogs-slider-controls">
                        <div className="swiper-button-prev">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.6665 20H33.3331" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.9993 28.3337C14.9993 28.3337 6.66605 22.1963 6.66602 20.0003C6.666 17.8043 14.9993 11.667 14.9993 11.667" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="swiper-button-next">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M33.3335 20H6.66687" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M25.0005 28.3337C25.0005 28.3337 33.3337 22.1963 33.3337 20.0003C33.3337 17.8043 25.0004 11.667 25.0004 11.667" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}