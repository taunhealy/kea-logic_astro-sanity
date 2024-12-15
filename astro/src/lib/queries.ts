export const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  sections[]
}`

export const allPagesQuery = `*[_type == "page" && !(_id in path("drafts.**"))] | order(orderRank) { 
  "slug": slug.current,
  "isHomePage": slug.current == "home"
}`