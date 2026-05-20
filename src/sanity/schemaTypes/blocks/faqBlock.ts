import { defineType, defineField } from 'sanity'
import { HelpCircle } from 'lucide-react'

export const faqBlock = defineType({
    name: 'faqBlock',
    title: 'FAQ Section',
    type: 'object',
    icon: HelpCircle as any,
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'Frequently Asked Questions',
        }),
        defineField({
            name: 'questions',
            title: 'Questions & Answers',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', type: 'string', title: 'Question' },
                        { name: 'answer', type: 'text', title: 'Answer' },
                    ]
                }
            ]
        })
    ],
    preview: {
        select: {
            title: 'heading',
            questions: 'questions'
        },
        prepare({ title, questions }) {
            return {
                title: title || 'FAQ Section',
                subtitle: questions ? `${questions.length} questions` : 'No questions added',
            }
        },
    },
})
