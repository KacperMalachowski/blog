import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT!);

export const getPublishedPosts = async (): Promise<graphcmsPostType[]> => {
  const { posts } = await graphcms.request(
    `
    query Posts() {
      posts {
        id
        title
        excerpt
        slug
        coverImage {
          id
          url
        }
        content {
          html
        }
        author {
          id
          name
        }
        date
      }
    }
  `
  );

  return posts;
}

export type graphcmsPostType = {
  id: string,
  title: string,
  excerpt: string,
  content: {
    html: string
  }
  slug: string,
  coverImaage: {
    id: string,
    url: string
  },
  author: {
    id: string,
    name: string
  },
  date: number
}