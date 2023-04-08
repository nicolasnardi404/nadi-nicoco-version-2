import { ContentfulRichTextGatsbyReference, RenderRichTextData } from "gatsby-source-contentful/rich-text";

export interface File {
    file: { fileName: string, contentType: string }
    url: string;
    filename?: string;
    publicUrl?: string;
}

export interface GraphQlResponse {
    errors?: any;
    data?: { allContentfulXSound: { edges: { node: XSoundResponse }[] } } &
    { allContentfulVideoArt: { edges: { node: VideoArtResponse }[] } }
}

export interface XSoundResponse {
    id: string;
    title: string;
    cover: File;
    embed: { embed: string };
    date: string | null;
    category: string | null;
    locations: string[];
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
}

export interface VideoArtResponse {
    title: string;
    location: { lat: number, lon: number };
    embed: { embed: string };
    date: string | null;
    category: string | null;
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
}