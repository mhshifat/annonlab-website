import { MetadataRoute } from "next";
import { getPayload } from 'payload';
import config from '@payload-config';
import getServerSideUrl from "@/lib/get-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({ config });
    const results = await payload.find({
        collection: 'blogs',
        limit: 0,
        where: {}
    });

    const url = getServerSideUrl();

    return [
        ...results.docs.map((doc) => ({
            url: `${url}/blogs/${doc.id}`,
            lastModified: new Date(doc.updatedAt),
        })),
    ]
}