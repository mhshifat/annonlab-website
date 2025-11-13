import { type Metadata } from 'next'
import getServerSideUrl from './get-url'

const defaultOpenGraph: Metadata['openGraph'] = {
    type: "website",
    title: "My Awesome Site",
    description: "Welcome to my awesome site where you can find amazing content.",
    siteName: "MyAwesomeSite",
    images: [
        {
            url: `${getServerSideUrl()}/logo.png`,
            alt: "My Awesome Site OG Image"
        }
    ]
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
    return {
        ...defaultOpenGraph,
        ...og,
        images: og?.images ?? defaultOpenGraph?.images
    }
}
