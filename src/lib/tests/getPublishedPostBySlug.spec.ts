import { afterEach, describe, test, vi } from "vitest";
import { getPostBySlug } from "../getPublishedPosts";
import { Posts } from '../../mocks/handlers';

describe("Get Published Posts By Slug Tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });


  test("Function return all posts in correct format", async () => {
    const expectedPost = Posts[0];

    const posts = await getPostBySlug(expectedPost.slug);

    expect(posts).toMatchObject({ post: expectedPost});

  })
});