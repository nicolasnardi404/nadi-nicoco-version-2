export const ALL_CONTENTFUL_XSOUND = `{
  allContentfulXSound {
    edges {
      node {
        id
        title
        cover {
          url
          file {
            fileName
            contentType
          }
          filename
          publicUrl
        }
        embed {
          embed
        }
        date
        locations
        category
        description {
          raw
        }
      }
    }
  }
}`

export const ALL_CONTENTFUL_VIDEOART = `{
  allContentfulVideoArt {
    edges {
      node {
        title
        location {
          lat
          lon
        }
        embed {
          embed
        }
        date
        category
        description {
          raw
        }
      }
    }
  }
}`

export const ALL_CONTENTFUL_POETRY = `{
  allContentfulPoetry {
    nodes {
      poem {
        raw
      }
      date
      title
      id
    }
  }
}`