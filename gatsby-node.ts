import { GatsbyNode } from "gatsby";
import path from "path";
import { ALL_CONTENTFUL_XSOUND, ALL_CONTENTFUL_VIDEOART, ALL_CONTENTFUL_POETRY, ALL_CONTENTFUL_SHORT_MOVIES } from "./queries";
import { GraphQlResponse, VideoArtResponse, XSoundResponse, ShortMovieResponse } from "./src/types/GraphQLResponses";
import { create } from "domain";

const CATEGORIES = ["x-sound", "x-art", "cyborg-text"].slice(0, 2);

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage, createNode } = actions;

  // try {
  const xSoundResults: GraphQlResponse = await graphql(ALL_CONTENTFUL_XSOUND);
  const videoArtResults: GraphQlResponse = await graphql(ALL_CONTENTFUL_VIDEOART);
  const cyborgTextResults: GraphQlResponse = await graphql(ALL_CONTENTFUL_POETRY);
  const shortMoviesResults: GraphQlResponse = await graphql(ALL_CONTENTFUL_SHORT_MOVIES);

  console.log(`Got ${xSoundResults?.data?.allContentfulXSound?.edges.length} music results.`)
  console.log(`Got ${videoArtResults?.data?.allContentfulVideoArt?.edges.length} video art results.`)
  console.log(`Got ${shortMoviesResults?.data?.allContentfulShortMovies?.edges.length} short movies results.`);

  const { xSound, videoArt, cyborgText, shortMovies } = {
    xSound: (xSoundResults?.data?.allContentfulXSound.edges.map(({ node }) => node) || []) as XSoundResponse[],
    videoArt: (videoArtResults?.data?.allContentfulVideoArt.edges.map(({ node }) => node) || []) as VideoArtResponse[],
    cyborgText: (cyborgTextResults?.data?.allContentfulPoetry?.nodes || [])
  };

  // NAVIGATION PAGES ->> temp disabled for now
  // const xSoundTemplate = path.resolve(`./src/templates/x-sound.tsx`);
  // createPage({
  //   path: `/x-sound`,
  //   component: xSoundTemplate
  // })


  // CONTENT PAGES
  // create page for all music
  const musicTemplate = path.resolve(`./src/templates/music.tsx`);
  createPage({
    path: `/x-sound`,
    component: musicTemplate,
    context: { xSound }
  });

  const videoArtTemplate = path.resolve(`./src/templates/video-art.tsx`);
  createPage({
    path: `/x-art`,
    component: videoArtTemplate,
    context: { videoArt }
  })

  const cyborgTextTemplate = path.resolve(`./src/templates/cyborg-text.tsx`);
  createPage({
    path: `/cyborg-text`,
    component: cyborgTextTemplate,
    context: { cyborgText }
  })

  const textMeTemplate = path.resolve(`./src/templates/text-me.tsx`);
  createPage({
    path: `/text-me`,
    component: textMeTemplate,
  })

  const moviesTemplate = path.resolve(`./src/templates/movies.tsx`);
  createPage({
    path: `/movies`,
    component: moviesTemplate,
    context: { shortMovies }
  });
}