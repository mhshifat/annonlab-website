/**
 * Helper function to trigger Next.js revalidation
 * Called from Payload hooks when content changes
 */
export async function triggerRevalidation(options: {
  type?: 'blog' | 'homepage' | 'header' | 'footer' | 'about' | 'contact' | 'blogsPage' | 'testimonials' | 'stats' | 'blogSlides' | 'newsletter' | 'all';
  path?: string | string[];
  tag?: string | string[];
  slug?: string;
}) {
  const revalidateSecret = process.env.REVALIDATE_SECRET;
  // Determine base URL for revalidation
  let baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  if (!baseUrl) {
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NODE_ENV === 'production') {
      // In production, use the actual domain
      baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    } else {
      baseUrl = 'http://localhost:3000';
    }
  }

  if (!revalidateSecret) {
    console.warn('REVALIDATE_SECRET not set, skipping revalidation');
    return;
  }

  try {
    const paths: string[] = [];
    
    // Add specific paths based on type
    if (options.type === 'blog' && options.slug) {
      paths.push(`/blogs/${options.slug}`);
      paths.push('/blogs');
      paths.push('/');
    } else if (options.type === 'homepage') {
      paths.push('/');
    } else if (options.type === 'header' || options.type === 'footer') {
      paths.push('/', 'layout');
    } else if (options.type === 'about') {
      paths.push('/about');
    } else if (options.type === 'contact') {
      paths.push('/contact');
    } else if (options.type === 'blogsPage') {
      paths.push('/blogs');
    } else if (['testimonials', 'stats', 'blogSlides', 'newsletter'].includes(options.type || '')) {
      paths.push('/');
    }

    // Add custom paths if provided
    if (options.path) {
      const customPaths = Array.isArray(options.path) ? options.path : [options.path];
      paths.push(...customPaths);
    }

    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${revalidateSecret}`,
      },
      body: JSON.stringify({
        type: options.type,
        path: paths.length > 0 ? paths : undefined,
        tag: options.tag,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Revalidation failed:', error);
    } else {
      const result = await response.json();
      console.log('Revalidation successful:', result);
    }
  } catch (error) {
    console.error('Error triggering revalidation:', error);
  }
}

