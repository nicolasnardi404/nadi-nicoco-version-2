export const ALL_CONTENTFUL_MUSICS = `{
  allContentfulMusic {
    edges {
      node {
        id
        title
        description {
          raw
        }
        embed {
          embed
        }
        cover {
          file {
            fileName
            contentType
          }
          url
          publicUrl
        }
      }
    }
  }
}`

export const ALL_CONTENTFUL_VIDEOART = `{
  allContentfulVideoArt {
    edges {
      node {
        id
        title
        description {
          raw
        }
        embed {
          embed
        }
      }
    }
  }
}`