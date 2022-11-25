import { GatsbyNode } from "gatsby";
import path from "path";
import { ALL_CONTENTFUL_POSTS, ALL_CONTENTFUL_PHOTOS, ALL_CONTENTFUL_MUSICS } from "./queries";
import { Music } from "./src/types/music.js";

const CATEGORIES = ["music", "performance", "photo", "post", "video", "writing"].slice(0, 1);

// export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ graphql, actions }) => {
//   const { createPage, createNode } = actions;

//   console.log('hererereres?')
//   // try {
//   const musicResults: {
//     errors?: any;
//     data?: any;
//   } = await graphql(ALL_CONTENTFUL_MUSICS);

//   console.log(musicResults.data);
// }

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage, createNode } = actions;

  console.log('hererereres?')
  console.log(ALL_CONTENTFUL_MUSICS);
  // try {
  const musicResults: {
    errors?: any;
    data?: any;
  } = await graphql(ALL_CONTENTFUL_MUSICS);

  console.log(musicResults.data);

  const categoryResults: { [key: string]: any } = {
    music: (musicResults?.data?.allContentfulMusic.edges.map(({ node }) => node) || []) as Music[],
  };

  for (let category of CATEGORIES) {
    console.log('creating page for category: ', category)
    createPage<{ category: any[], title: string }>({
      path: `/${category}`,
      component: path.resolve(`src/templates/category-list.tsx`),
      context: {
        category: categoryResults[category],
        title: category,
      }
    })

    const categoryTemplate = path.resolve(`./src/templates/${category}.tsx`);
    categoryResults[category].forEach((entry: any) => {
      console.log(entry.id)
      createPage({
        path: `/${category}/${entry.id}`,
        component: categoryTemplate,
        context: {
          music: entry
        },
      })
    })
  }
}