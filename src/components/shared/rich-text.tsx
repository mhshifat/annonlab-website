import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { LinkJSXConverter, RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'
import './rich-text.css'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { relationTo, value } = linkNode.fields.doc!
    if (typeof value !== 'object') {
        throw new TypeError('Expected value to be an object')
    }
    const slug = value.slug

    switch (relationTo) {
        case 'articles':
            return `/blog/${slug}`
        case 'blogs':
            return `/blogs/${slug}`
        default:
            return `/${relationTo}/${slug}`
    }
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
})

export const RichTextWrapper: React.FC<{
    data?: SerializedEditorState
    lexicalData?: SerializedEditorState
    className?: string
}> = ({ data, lexicalData, className = '' }) => {
    const content = data || lexicalData
    if (!content) return null

    return (
        <div className={`rich-text-content ${className}`.trim()}>
            <PayloadRichText converters={jsxConverters} data={content} />
        </div>
    )
}