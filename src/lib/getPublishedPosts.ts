import GraphCMSPostType from "../types/GraphCMSPostType";
import { graphcms } from "./graphqlClients";

export const getPublishedPosts = async (): Promise<GraphCMSPostType[]> => {
  const { posts } = await graphcms.request(
    `
    query Posts {
      posts {
        id
        title
        excerpt
        slug
        coverImage {
          id
          url
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
};

export const getPostBySlug = async (
  slug: string
): Promise<{ post: GraphCMSPostType }> =>
  await graphcms.request(`
query Post($slug: String!) {
  post(where: {slug: $slug}) {
    id
    title
    excerpt
    slug
    coverImage {
      id
      url
    }
    content {
      markdown
    }
    author {
      id
      name
    }
    date
  }
}
`, {
  slug
});
