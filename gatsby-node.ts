import { GatsbyNode } from "gatsby";
import path from "path";
import { ALL_CONTENTFUL_XSOUND, ALL_CONTENTFUL_VIDEOART } from "./queries";
import { GraphQlResponse, VideoArtResponse, XSoundResponse } from "./src/types/GraphQLResponses";

const CATEGORIES = ["x-sound", "x-art", "cyborg-text"].slice(0, 2);

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage, createNode } = actions;

  console.log(ALL_CONTENTFUL_XSOUND);
  // try {
  const xSoundResults: GraphQlResponse = await graphql(ALL_CONTENTFUL_XSOUND);

  const videoArtResults: GraphQlResponse = await graphql(ALL_CONTENTFUL_VIDEOART);

  console.log(`Got ${xSoundResults?.data?.allContentfulXSound.edges.length} music results.`)
  console.log(`Got ${videoArtResults?.data?.allContentfulVideoArt.edges.length} video art results.`)

  const { xSound, videoArt } = {
    xSound: (xSoundResults?.data?.allContentfulXSound.edges.map(({ node }) => node) || []) as XSoundResponse[],
    videoArt: (videoArtResults?.data?.allContentfulVideoArt.edges.map(({ node }) => node) || []) as VideoArtResponse[],
  };

  // create page for x-sound, this page has a link to music and viual
  const xSoundTemplate = path.resolve(`./src/templates/x-sound.tsx`);
  createPage({
    path: `/x-sound`,
    component: xSoundTemplate
  })

  // create page for all music
  const musicTemplate = path.resolve(`./src/templates/music.tsx`);
  createPage({
    path: `/x-sound/music`,
    component: musicTemplate,
    context: { xSound }
  });

  // create page for all video art
  const videoArtTemplate = path.resolve(`./src/templates/video-art.tsx`);
  createPage({
    path: `/x-sound/visual`,
    component: videoArtTemplate,
    context: { videoArt }
  })


  // for (let category of CATEGORIES) {
  //   console.log('creating page for category: ', category)
  //   createPage<{ category: any[], title: string }>({
  //     path: `/${category.replace(' ', '')}`,
  //     component: path.resolve(`src/templates/category-list.tsx`),
  //     context: {
  //       category: categoryResults[category],
  //       title: category,
  //     }
  //   })

  //   const categoryTemplate = path.resolve(`./src/templates/${category.replace(' ', '')}.tsx`);
  //   categoryResults[category].forEach((entry: any) => {
  //     console.log(entry.id)
  //     createPage({
  //       path: `/${category.replace(' ', '')}/${entry.id}`,
  //       component: categoryTemplate,
  //       context: {
  //         [category.replace(' ', '')]: entry
  //       },
  //     })
  //   })
  // }
}