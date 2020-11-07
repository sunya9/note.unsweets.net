const title = ''
const description = ''
const blogDir = 'note'

export const config = {
  title: (pageTitle?: string) => pageTitle ? `${pageTitle} - ${title}` : title,
  description,
  blogDir
} as const