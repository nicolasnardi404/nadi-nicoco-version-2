const path = require("path");


// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              id,
              type,
              postId,
              createdAt,
              title,
              content {
                raw
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      console.log("Error with data", result.errors)
    }

    const postTemplate = path.resolve("./src/templates/post.js")
    console.log('resolving', postTemplate)

    result.data.allContentfulPost.edges.forEach(post => {
      console.log(post.node)
      createPage({
        path: `posts/${post.node.postId}`,
        component: postTemplate,
        context: {
          postId: post.node.postId 
        }
      })
    })
  }).catch(error => console.log('Error with contentful', error))
}