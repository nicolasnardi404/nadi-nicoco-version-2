const path = require("path");
const { ALL_CONTENTFUL_POSTS, ALL_CONTENTFUL_PHOTOS, ALL_CONTENTFUL_MUSICS } = require("./queries.js")

const CATEGORIES = ["music", "performance", "photo", "post", "video", "writing"].slice(0, 1);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  try {
    // const postResults = await graphql(ALL_CONTENTFUL_POSTS);
    const musicResults = await graphql(ALL_CONTENTFUL_MUSICS);

    // const photoResults = await graphql(ALL_CONTENTFUL_PHOTOS);
    const categoryResults = {
      // performance: postResults.data.allContentfulPost.edges,
      music: musicResults.data.allContentfulMusic.edges,
      // photo: photoResults.data.allContentfulPhoto.edges
    };


    // if (result.errors) {
    //   console.log("Error with data", result.errors)
    // }

    for (let category of CATEGORIES) {
      createPage({
        path: `${category}`,
        component: path.resolve(`src/templates/category-list.js`),
        data: { category: categoryResults[category], titlo: category },
        context: {
          category: categoryResults[category],
          title: category,
        }
      })
    }

    // const postTemplate = path.resolve("./src/templates/post.js")
    const musicTemplate = path.resolve("./src/templates/music.js")
    // console.log('resolving', postTemplate)
    // console.log('result', result.data.allContentfulPost.edges)

    // postResults.data.allContentfulPost.edges.forEach(edge => {
    //   console.log('creating page', edge.node.id)
    //   createPage({
    //     path: `performance/${edge.node.id}`,
    //     component: postTemplate,
    //     context: {
    //       post: edge.node
    //     },
    //   })
    // })

    musicResults.data.allContentfulMusic.edges.forEach(edge => {
      console.log(edge.node.id)
      createPage({
        path: `music/${edge.node.id}`,
        component: musicTemplate,
        context: {
          music: edge.node
        },
      })
    })

    // result.data.allContentfulPost.edges.forEach(post => {
    //   console.log(post.node)
    //   createPage({
    //     path: `posts/${post.node.postId}`,
    //     component: postTemplate,
    //     data: post.node,
    //     context: {
    //       postId: post.node.postId
    //     }
    //   })
    // })
  } catch {
    (error => console.log('Error with contentful', error))
  }
}