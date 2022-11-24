const ALL_CONTENTFUL_POSTS = `
      {
        allContentfulPost {
          edges {
            node {
              id
              type
              createdAt
              title
              postId
              content {
                raw
              }
              media {
                id
                description
                filename
                publicUrl
                placeholderUrl
                file {
                  url
                }
              }
            }
          }
        }
      }`

const ALL_CONTENTFUL_MUSICS = `{
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

const ALL_CONTENTFUL_PHOTOS = `{
    allContentfulPhoto {
      edges {
        node {
          description {
            raw
          }
          media {
            filename
            file {
              fileName
              url
            }
            url
            title
          }
          title
        }
      }
    }
  }`

module.exports = { ALL_CONTENTFUL_POSTS, ALL_CONTENTFUL_MUSICS, ALL_CONTENTFUL_PHOTOS }