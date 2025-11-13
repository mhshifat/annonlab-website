export default function getServerSideUrl() {
    let url = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
        return process.env.VERCEL_PROJECT_PRODUCTION_URL;
    }

    if (!url) {
        url = "http://localhost:3000";
    }

    return url;
}