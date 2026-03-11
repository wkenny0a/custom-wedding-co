import { groq } from 'next-sanity'

export const homePageQuery = groq`*[_type == "homePage"][0] {
  featuredProducts[]->,
  featuredCategories[]->,
  spotlightProducts[]->,
  featuredTestimonials[]->,
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`

export const categoriesQuery = groq`*[_type == "category"]`

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0]`

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc)`

export const productsByCategoryQuery = groq`*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(_createdAt desc)`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  ...,
  category->,
  relatedProducts[]->,
  styleVariants[] {
    variantName,
    "imageUrl": image.asset->url
  },
  "reviews": *[_type == "review" && references(^._id)] | order(_createdAt desc)
}`
