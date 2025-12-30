# On-Demand Revalidation Setup

This website uses **static generation** with **on-demand revalidation**. Pages are generated at build time and only revalidated when content changes in Payload CMS.

## How It Works

1. **Static Generation**: All pages are statically generated at build time for maximum performance
2. **Automatic Revalidation**: When content is updated in Payload CMS, hooks automatically trigger revalidation
3. **Selective Updates**: Only affected pages are revalidated, not the entire site

## Environment Variables

Add the following environment variable to your `.env` file:

```env
REVALIDATE_SECRET=your-secret-key-here
```

**Important**: 
- Use a strong, random secret key
- Never commit this to version control
- Use different secrets for development and production

### Generate a Secret Key

You can generate a secure random key using:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use any secure random string generator
```

## Revalidation Triggers

The following actions automatically trigger revalidation:

### Collections
- **Blogs**: When a blog is created, updated, or deleted
  - Revalidates: `/blogs/[slug]`, `/blogs`, `/`

### Globals
- **Header**: When header content changes
  - Revalidates: `/` (layout)
- **Footer**: When footer content changes
  - Revalidates: `/` (layout)
- **Homepage**: When homepage content changes
  - Revalidates: `/`
- **About Page**: When about page content changes
  - Revalidates: `/about`
- **Contact Page**: When contact page content changes
  - Revalidates: `/contact`
- **Blogs Page**: When blogs page content changes
  - Revalidates: `/blogs`
- **Testimonials**: When testimonials change
  - Revalidates: `/`
- **Stats**: When stats change
  - Revalidates: `/`
- **Blog Slides**: When blog slides content changes
  - Revalidates: `/`
- **Newsletter**: When newsletter content changes
  - Revalidates: `/`

## Manual Revalidation

You can manually trigger revalidation by calling the API endpoint:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_REVALIDATE_SECRET" \
  -d '{
    "type": "homepage",
    "path": ["/"],
    "tag": "homepage"
  }'
```

### API Parameters

- `type` (optional): Type of content (`blog`, `homepage`, `header`, `footer`, `about`, `contact`, `blogsPage`, `testimonials`, `stats`, `blogSlides`, `newsletter`, `all`)
- `path` (optional): Specific paths to revalidate (string or array)
- `tag` (optional): Cache tags to revalidate (string or array)

## Production Setup

### Vercel

1. Add `REVALIDATE_SECRET` to your Vercel environment variables
2. Set `NEXT_PUBLIC_SERVER_URL` to your production domain (optional, auto-detected on Vercel)

### Other Platforms

1. Set `REVALIDATE_SECRET` in your environment variables
2. Set `NEXT_PUBLIC_SERVER_URL` to your production domain (e.g., `https://yourdomain.com`)

## Benefits

✅ **Faster Page Loads**: Pages are pre-rendered and served from CDN  
✅ **Better SEO**: Static pages are fully crawlable  
✅ **Lower Server Costs**: No server-side rendering on every request  
✅ **Instant Updates**: Content changes trigger immediate revalidation  
✅ **Selective Updates**: Only affected pages are regenerated  

## Troubleshooting

### Revalidation Not Working

1. Check that `REVALIDATE_SECRET` is set in your environment
2. Verify the secret matches in both Payload and Next.js
3. Check server logs for revalidation errors
4. Ensure the API route is accessible (not blocked by middleware)

### Pages Not Updating

1. Check Payload logs for hook execution
2. Verify the revalidation API endpoint is responding
3. Check Next.js build logs for revalidation status
4. Try manually triggering revalidation via API

