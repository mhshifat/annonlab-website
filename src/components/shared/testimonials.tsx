"use client";

import { ReactNode, useEffect } from "react";

export interface TestimonialCardDetails {
    id: string;
    image: string;
    content: ReactNode;
    author: ReactNode;
    position: ReactNode;
    company: ReactNode;
    logo: ReactNode;
}

interface TestimonialsProps {
    title: ReactNode;
    subtitle: ReactNode;
    data: TestimonialCardDetails[];
}

export default function Testimonials({ data, title, subtitle }: TestimonialsProps) {
    useEffect(() => {
        let swiperInstance: any;
        const timeout = setTimeout(() => {
            if (typeof window !== "undefined" && window.Swiper) {
                swiperInstance = new window.Swiper('.testimonials .swiper', {
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    slidesPerView: 1.07,
                    spaceBetween: 30,
                    breakpoints: {
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        480: { slidesPerView: 1, spaceBetween: 30 },
                        640: { slidesPerView: 1.07, spaceBetween: 30 },
                    },
                    centeredSlides: false,
                    navigation: {
                        nextEl: '.testimonials .swiper-button-next',
                        prevEl: '.testimonials .swiper-button-prev',
                    }
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
    }, []);

    return (
        <section className="testimonials">
            <div className="container">
                <h5>{title}</h5>
                <h3>{subtitle}</h3>

                <div className="swiper">
                    <div className="swiper-wrapper">
                        {data.map(item => (
                            <div key={item.id} className="swiper-slide">
                                <div className="testimonial">
                                    <div className="avatar">
                                        <img src={item.image} alt="" />
                                        <button>
                                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M39.9993 4.16699C20.2091 4.16699 4.16602 20.2101 4.16602 40.0003C4.16602 59.7907 20.2091 75.8337 39.9993 75.8337C59.7897 75.8337 75.8327 59.7907 75.8327 40.0003C75.8327 20.2101 59.7897 4.16699 39.9993 4.16699ZM31.666 26.667L54.9993 40.0003L31.666 53.3337V26.667Z" fill="#A3E635" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="content">
                                        <div className="p">{item.content}</div>
                                        <div>
                                            <div>
                                                <h5>{item.author}</h5>
                                                <small>{item.position}, {item.company}</small>
                                            </div>
                                            {item.logo}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="testimonials-slider-controls">
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
        </section >
    )
}