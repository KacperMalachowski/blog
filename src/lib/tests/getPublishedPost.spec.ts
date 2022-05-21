import { graphql } from "graphql";
import { afterEach, beforeEach, describe, test, vi } from "vitest";
import graphcmsPostType from "../../types/GraphCMSPostType";
import { getPublishedPosts } from "../getPublishedPosts";
import { Posts } from '../../mocks/handlers';

const graphqlRequestAllPosts = `
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
}`

const originalEnv = process.env;

describe("Get Published Posts Tests", () => {
  beforeEach(() => {
    vi.resetModules();

    process.env = {
      ...originalEnv,
      GRAPHQL_URL_ENDPOINT: "https://graphql-endpoint.example/api/v1/posts"
    }
  })

  afterEach(() => {
    vi.restoreAllMocks();
    process.env = originalEnv
  });
  test("Function return all posts in correct format", async () => {
    const posts = await getPublishedPosts();

    expect(posts).toMatchObject({...Posts});

  })
});