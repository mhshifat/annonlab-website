import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blogs',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: "Category",
      name: "category",
      type: "text"
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
      type: "richText"
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
}
