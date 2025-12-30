"use client";

import useFilter from "@/hooks/use-filter";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface BlogListProps {
    categories: { label: string, value: string, active: boolean }[];
    data: {
        id: string;
        image: string;
        category: string;
        readTime: string;
        title: ReactNode;
        excerpt: ReactNode;
        link: string;
    }[]
}

export default function BlogList({ categories, data }: BlogListProps) {
    const { filter, filterValues } = useFilter();

    return (
        <div className="BlogList">
            <div className="container">
                <ul className="BlogList__Categories">
                    {categories.map((category) => (
                        <li key={category.value} className={(filterValues?.["category"] ? filterValues?.["category"] === category.value : category.active) ? 'active' : ''} onClick={() => filter({
                            category: category.value === "all" ? "" : encodeURIComponent(category.value)
                        })}>
                            {category.label}
                        </li>
                    ))}
                </ul>

                <div className="BlogList__Grid">
                    {data.map((blog) => (
                        <div key={blog.id} className="BlogList__Card">
                            <div className="thumbnail">
                                <Image src={blog.image} alt="" width={400} height={250} loading="lazy" />
                            </div>
                            <div className="content">
                                <div>
                                    <span>{blog.category}</span>
                                    <span>{blog.readTime}</span>
                                </div>
                                <h3>{blog.title}</h3>
                                <div>{blog.excerpt}</div>
                                <Link href={blog.link}>
                                    Read more
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 6.5L6 18" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="square" />
                                        <path d="M8 6H18V16" stroke="#0E131B" strokeWidth="1.5" strokeLinecap="square" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="BlogList__Footer">
                    <button className="BlogList__LoadMore">
                        Load More
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                stroke="#0E131B"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.0001 12.0001H8M12.5002 8.5C12.5002 8.5 16.0001 11.0777 16.0001 12C16.0001 12.9224 12.5002 15.5 12.5002 15.5"
                                stroke="#0E131B"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div> */}
            </div>

        </div>
    )
}