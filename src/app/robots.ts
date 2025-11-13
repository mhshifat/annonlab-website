import getServerSideUrl from "@/lib/get-url";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const url = getServerSideUrl();
    
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin"],
            },
        ],
        sitemap: `${url}/sitemap.xml`,
    };
}