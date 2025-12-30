// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo';
import { uploadthingStorage } from '@payloadcms/storage-uploadthing';
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { triggerRevalidation } from './lib/revalidate';

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog';
import { Newsletter } from './collections/Newsletter';
import { Contact } from './collections/Contact';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  globals: [
    {
      label: "Header",
      slug: "header",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'header' });
          }
        ]
      },
      fields: [
        {
          label: "Logo",
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          label: "CTA Text",
          name: "ctaText",
          type: "text",
        },
        {
          label: "CTA Link",
          name: "ctaLink",
          type: "text",
        },
      ]
    },
    {
      label: "Footer",
      slug: "footer",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'footer' });
          }
        ]
      },
      fields: [
        {
          label: "Email",
          name: "email",
          type: "email",
        },
        {
          label: "Phone",
          name: "phone",
          type: "text",
        },
        {
          label: "Address",
          name: "address",
          type: "textarea",
        },
        {
          label: "Linked In Link",
          name: "linkedInLink",
          type: "text",
        },
        {
          label: "Whats APP Link",
          name: "whatsAppLink",
          type: "text",
        },
        {
          label: "Facebook Link",
          name: "facebookLink",
          type: "text",
        },
        {
          label: "Copyright",
          name: "copyright",
          type: "text",
        },
        {
          label: "Terms Link",
          name: "termsLink",
          type: "text",
        },
        {
          label: "Privacy Link",
          name: "privacyLink",
          type: "text",
        },
        {
          label: "Cookies Link",
          name: "cookiesLink",
          type: "text",
        },
      ]
    },
    {
      label: "Stats",
      slug: "stats",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'stats' });
          }
        ]
      },
      fields: [
        {
          label: "Years In Business",
          name: "yearsInBusiness",
          type: "text",
        },
        {
          label: "Products Owned",
          name: "productsOwned",
          type: "text",
        },
        {
          label: "Completed Projects",
          name: "completedProjects",
          type: "text",
        },
        {
          label: "Countries Served",
          name: "countriesServed",
          type: "text",
        },
      ]
    },
    {
      label: "Homepage",
      slug: "homepage",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'homepage' });
          }
        ]
      },
      fields: [
        {
          label: "General",
          type: "tabs",
          tabs: [
            {
              label: "Hero",
              name: "hero",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  type: "richText",
                },
                {
                  label: "Description",
                  name: "description",
                  type: "richText",
                },
                {
                  label: "CTA Text",
                  name: "ctaText",
                  type: "text",
                },
                {
                  label: "CTA Link",
                  name: "ctaHref",
                  type: "text",
                },
                {
                  label: "Secondary CTA Text",
                  name: "secondaryCtaText",
                  type: "text",
                },
                {
                  label: "Secondary CTA Link",
                  name: "secondaryCtaHref",
                  type: "text",
                },
              ]
            },
            {
              label: "Culture",
              name: "culture",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  type: "richText",
                },
                {
                  label: "Description",
                  name: "description",
                  type: "richText",
                },
              ]
            },
            {
              label: "Skills",
              name: "skills",
              fields: [
                {
                  label: "Links",
                  name: "links",
                  type: "array",
                  fields: [
                    {
                      label: "Image",
                      name: "image",
                      type: "upload",
                      relationTo: "media"
                    },
                  ]
                }
              ]
            },
            {
              label: "What We Serve",
              name: "whatWeServe",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText"
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  type: "richText"
                },
                {
                  label: "Description",
                  name: "description",
                  type: "richText"
                },
                {
                  label: "CTA Text",
                  name: "ctaText",
                  type: "text"
                },
                {
                  label: "CTA Link",
                  name: "ctaLink",
                  type: "text"
                },
                {
                  label: "Steps",
                  name: "steps",
                  type: "array",
                  fields: [
                    {
                      label: "Content",
                      name: "content",
                      type: "text",
                    }
                  ]
                },
              ]
            },
            {
              label: "SEO",
              name: "seo",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  label: "Description",
                  name: "description",
                  type: "text",
                  required: true,
                },
                {
                  label: "Keywords",
                  name: "keywords",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Comma separated keywords for SEO",
                  }
                },
              ]
            }
          ]
        }
      ]
    },
    {
      label: "About Page",
      slug: "about",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'about' });
          }
        ]
      },
      fields: [
        {
          label: "General",
          type: "tabs",
          tabs: [
            {
              label: "Hero",
              name: "hero",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
              ]
            },
            {
              label: "Sub Hero",
              name: "subHero",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  type: "richText",
                },
              ]
            },
            {
              label: "How We Work",
              name: "howWeWork",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  type: "richText",
                },
                {
                  label: "Steps",
                  name: "steps",
                  type: "array",
                  fields: [
                    {
                      label: "Title",
                      name: "title",
                      type: "richText",
                    },
                    {
                      label: "Description",
                      name: "description",
                      type: "richText",
                    },
                    {
                      label: "Image",
                      name: "image",
                      type: "upload",
                      relationTo: "media",
                    },
                  ]
                }
              ]
            },
            {
              label: "SEO",
              name: "seo",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  label: "Description",
                  name: "description",
                  type: "text",
                  required: true,
                },
                {
                  label: "Keywords",
                  name: "keywords",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Comma separated keywords for SEO",
                  }
                },
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Contact Page",
      slug: "contact",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'contact' });
          }
        ]
      },
      fields: [
        {
          label: "General",
          type: "tabs",
          tabs: [
            {
              label: "Hero",
              name: "hero",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
              ]
            },
            {
              label: "Form",
              name: "form",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
                {
                  label: "Description",
                  name: "description",
                  type: "richText",
                },
              ]
            },
            {
              label: "SEO",
              name: "seo",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  label: "Description",
                  name: "description",
                  type: "text",
                  required: true,
                },
                {
                  label: "Keywords",
                  name: "keywords",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Comma separated keywords for SEO",
                  }
                },
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Blogs Page",
      slug: "blogsPage",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'blogsPage' });
          }
        ]
      },
      fields: [
        {
          label: "General",
          type: "tabs",
          tabs: [
            {
              label: "Hero",
              name: "hero",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "richText",
                },
                {
                  label: "Subtitle",
                  name: "subtitle",
                  type: "richText",
                },
                {
                  label: "Description",
                  name: "description",
                  type: "richText",
                },
              ]
            },
            {
              label: "SEO",
              name: "seo",
              fields: [
                {
                  label: "Title",
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  label: "Description",
                  name: "description",
                  type: "text",
                  required: true,
                },
                {
                  label: "Keywords",
                  name: "keywords",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Comma separated keywords for SEO",
                  }
                },
              ]
            }
          ]
        }
      ]
    },
    {
      label: "Testimonials",
      slug: "testimonials",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'testimonials' });
          }
        ]
      },
      fields: [
        {
          label: "Title",
          name: "title",
          type: "richText",
        },
        {
          label: "Subtitle",
          name: "subtitle",
          type: "richText",
        },
        {
          label: "Data",
          name: "data",
          type: "array",
          fields: [
            {
              label: "Author",
              name: "author",
              type: "text"
            },
            {
              label: "Company",
              name: "company",
              type: "text"
            },
            {
              label: "Position",
              name: "position",
              type: "text"
            },
            {
              label: "Content",
              name: "content",
              type: "richText"
            },
            {
              label: "Thumbnail",
              name: "image",
              type: "upload",
              relationTo: "media"
            },
            {
              label: "Logo",
              name: "logo",
              type: "upload",
              relationTo: "media"
            },
          ]
        },
      ]
    },
    {
      label: "Newsletter",
      slug: "newsletter",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'newsletter' });
          }
        ]
      },
      fields: [
        {
          label: "Title",
          name: "title",
          type: "richText",
        },
        {
          label: "Subtitle",
          name: "subtitle",
          type: "richText",
        },
      ]
    },
    {
      label: "Blogs",
      slug: "blogSlides",
      hooks: {
        afterChange: [
          async () => {
            await triggerRevalidation({ type: 'blogSlides' });
          }
        ]
      },
      fields: [
        {
          label: "Title",
          name: "title",
          type: "richText",
        },
        {
          label: "Subtitle",
          name: "subtitle",
          type: "richText",
        },
        {
          label: "CTA Text",
          name: "ctaText",
          type: "text",
        },
        {
          label: "CTA Link",
          name: "ctaLink",
          type: "text",
        },
      ]
    }
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blog, Newsletter, Contact],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
    seoPlugin({
      collections: ["blogs"],
      tabbedUI: true
    }),
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN || '',
        acl: 'public-read',
      }
    })
  ],
})
