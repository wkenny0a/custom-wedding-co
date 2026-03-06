import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'announcementBar',
            title: 'Announcement Bar Text',
            type: 'string',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'storySection',
            title: 'Brand Story Text',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'instagramHandle',
            title: 'Instagram Handle',
            type: 'string',
        }),
        defineField({
            name: 'instagramImages',
            title: 'Instagram Grid Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'newsletterHeading',
            title: 'Newsletter Heading',
            type: 'string',
        }),
        defineField({
            name: 'newsletterSubtitle',
            title: 'Newsletter Subtitle',
            type: 'string',
        }),
    ],
})
