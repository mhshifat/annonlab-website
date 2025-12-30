import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Verify the request is authorized
    const authHeader = req.headers.get('authorization');
    const secret = process.env.REVALIDATE_SECRET;
    
    if (!secret) {
      return NextResponse.json(
        { error: 'REVALIDATE_SECRET not configured' },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { path, tag, type, slug } = body;

    // Revalidate specific paths
    if (path) {
      if (Array.isArray(path)) {
        path.forEach((p: string) => {
          revalidatePath(p);
        });
      } else {
        revalidatePath(path);
      }
    }

    // Revalidate specific tags
    if (tag) {
      if (Array.isArray(tag)) {
        tag.forEach((t: string) => {
          revalidateTag(t);
        });
      } else {
        revalidateTag(tag);
      }
    }

    // Revalidate by type (collection/global)
    if (type) {
      switch (type) {
        case 'blog':
          // Revalidate specific blog post if slug provided
          if (slug) {
            revalidatePath(`/blogs/${slug}`);
          }
          revalidatePath('/');
          revalidatePath('/blogs');
          revalidateTag('blogs');
          break;
        case 'homepage':
          revalidatePath('/');
          revalidateTag('homepage');
          break;
        case 'header':
        case 'footer':
          revalidatePath('/', 'layout');
          revalidateTag('layout');
          break;
        case 'about':
          revalidatePath('/about');
          revalidateTag('about');
          break;
        case 'contact':
          revalidatePath('/contact');
          revalidateTag('contact');
          break;
        case 'blogsPage':
          revalidatePath('/blogs');
          revalidateTag('blogs-page');
          break;
        case 'testimonials':
        case 'stats':
        case 'blogSlides':
        case 'newsletter':
          revalidatePath('/');
          revalidateTag('globals');
          break;
        default:
          // Revalidate all pages if type is 'all'
          if (type === 'all') {
            revalidatePath('/', 'layout');
            revalidatePath('/blogs');
            revalidatePath('/about');
            revalidatePath('/contact');
          }
      }
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path,
      tag,
      type 
    });
  } catch (error: any) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Error revalidating', message: error.message },
      { status: 500 }
    );
  }
}

