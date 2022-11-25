import { ContentfulRichTextGatsbyReference, RenderRichTextData } from "gatsby-source-contentful/rich-text";

export interface Music {
    id: string;
    title: string;
    cover: File;
    embed: { embed: string }
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>
}

export interface File {
    file: { fileName: string, contentType: string }
    url: string;
    publicUrl: string;
}

export interface GraphQlResponse {
    data: {

    }
}