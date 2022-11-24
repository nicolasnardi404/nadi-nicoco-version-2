const path = require("path");
const { ALL_CONTENTFUL_POSTS, ALL_CONTENTFUL_PHOTOS, ALL_CONTENTFUL_MUSICS } = require("./queries.js")

const CATEGORIES = ["music", "performance", "photo", "post", "video", "writing"].slice(0, 1);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const musicResults = await graphql(ALL_CONTENTFUL_MUSICS);

  const categoryResults = {
    music: musicResults.data.allContentfulMusic.edges,
  };

  for (let category of CATEGORIES) {
    console.log('creating page for category: ', category)
    createPage({
      path: `${category}`,
      component: path.resolve(`src/templates/category-list.js`),
      data: { category: categoryResults[category], title: category },
      context: {
        category: categoryResults[category],
        title: category,
      }
    })
  }

  const musicTemplate = path.resolve("./src/templates/music.js");
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
}