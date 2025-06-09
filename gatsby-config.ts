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
        name: `nadinicoco`,
        short_name: `nadinicoco`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `static/icons/photo-icon.png`, // This path is relative to the root of the site
      },
    },
    "babel-plugin-styled-components",
  ],
}
