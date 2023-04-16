require('dotenv').config({
  path: '.env'
})

module.exports = {
  siteMetadata: {
    title: `Nadi Nicoco Website`,
    description: `Art and stuff. Music, photography, and more. `,
    author: `Nicolette Nicoco`,
    siteUrl: `https://nadinicoco.com/`,
  },
  plugins: [
    `gatsby-plugin-preload-fonts`,
    'gatsby-plugin-typescript',
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      }
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: 'VCR OSD Mono',
            file: `https://fonts.cdnfonts.com/css/vcr-osd-mono`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "babel-plugin-styled-components",
  ],
}
