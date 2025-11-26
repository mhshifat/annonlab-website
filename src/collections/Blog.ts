import { lexicalEditor, LinkFeature } from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';
import { slugify } from 'transliteration';

export const Blog: CollectionConfig = {
  slug: 'blogs',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titleForSlug',
      label: 'Title For Slug',
      type: 'text',
    },
    {
      label: "Category",
      name: "category",
      type: "text"
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      label: "Read Time",
      name: "readTime",
      type: "text"
    },
    {
      label: "Title",
      name: "title",
      type: "richText"
    },
    {
      label: "Excerpt",
      name: "excerpt",
      type: "richText"
    },
    {
      label: "Content",
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures, rootFeatures }) => [
          ...defaultFeatures,
          LinkFeature({
            // Example showing how to customize the built-in fields
            // of the Link feature
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
                admin: {
                  description:
                    'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
                },
              },
            ],
          }),
        ],
      })
    },
    {
      label: "Image",
      name: "image",
      type: "upload",
      relationTo: "media"
    },
    {
      label: "Author",
      name: "author",
      type: "text",
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.titleForSlug) {
          data.slug = slugify(data.titleForSlug, { lowercase: true });
        }
        return data;
      }
    ]
  }
}
