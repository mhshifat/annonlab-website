import { Blog, Config, Media } from "@/payload-types";
import getServerSideUrl from "./get-url";
import { Metadata } from "next";
import { mergeOpenGraph } from "./merge-open-graph";

function getImageUrl(image?: Media | Config['db']["defaultIDType"] | null) {
    const serverUrl = getServerSideUrl();
    let url = serverUrl + "/logo.png";

    if (image && typeof image === "object" && url in image) {
        const ogUrl = image?.url;
        url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
    }

    return url;
}


export default async function generateMeta(args: { doc: Partial<Blog> }): Promise<Metadata> {
    const { doc } = args || {};

    const ogImage = getImageUrl((doc.meta as { image: string })?.image);
    const title = doc?.meta?.title || "Default Title";
    const description = doc?.meta?.description || "Default Description";
    const url = "/";

    return {
        title,
        description,
        openGraph: mergeOpenGraph({
            title,
            description,
            images: ogImage ? [{ url: ogImage }] : undefined,
            url,
        }),
        alternates: {
            canonical: url,
        }
    }
}