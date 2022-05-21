import { afterEach, describe, test, vi } from "vitest";
import { getPublishedPosts } from "../getPublishedPosts";
import { Posts } from '../../mocks/handlers';

describe("Get Published Posts Tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });


  test("Function return all posts in correct format", async () => {
    const posts = await getPublishedPosts();

    expect(posts).toMatchObject({...Posts});

  })
});