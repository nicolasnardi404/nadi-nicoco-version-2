import { GatsbyNode } from "gatsby";
import path from "path";
import { ALL_CONTENTFUL_MUSICS, ALL_CONTENTFUL_VIDEOART } from "./queries";
import { BasicPost, Music } from "./src/types/music.js";

const CATEGORIES = ["x-sound", "x-art", "cyborg-text"].slice(0, 2);

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage, createNode } = actions;

  console.log(ALL_CONTENTFUL_MUSICS);
  // try {
  const musicResults: {
    errors?: any;
    data?: any;
  } = await graphql(ALL_CONTENTFUL_MUSICS);

  const videoArtResults: {
    errors?: any;
    data?: any;
  } = await graphql(ALL_CONTENTFUL_VIDEOART);

  console.log(`Got ${musicResults?.data?.allContentfulMusic.edges.length} music results.`)
  console.log(`Got ${videoArtResults?.data?.allContentfulVideoArt.edges.length} video art results.`)

  const categoryResults: { [key: string]: any } = {
    'x-sound': (musicResults?.data?.allContentfulMusic.edges.map(({ node }) => node) || []) as Music[],
    'x-art': (videoArtResults?.data?.allContentfulVideoArt.edges.map(({ node }) => node) || []) as BasicPost[],
  };

  for (let category of CATEGORIES) {
    console.log('creating page for category: ', category)
    createPage<{ category: any[], title: string }>({
      path: `/${category.replace(' ', '')}`,
      component: path.resolve(`src/templates/category-list.tsx`),
      context: {
        category: categoryResults[category],
        title: category,
      }
    })

    const categoryTemplate = path.resolve(`./src/templates/${category.replace(' ', '')}.tsx`);
    categoryResults[category].forEach((entry: any) => {
      console.log(entry.id)
      createPage({
        path: `/${category.replace(' ', '')}/${entry.id}`,
        component: categoryTemplate,
        context: {
          [category.replace(' ', '')]: entry
        },
      })
    })
  }
}