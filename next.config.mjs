import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  },
  readingTime: false,
  contentDirBasePath: '/docs',
  
})

export default withNextra({
  reactStrictMode: true,
  output: 'export',
})
