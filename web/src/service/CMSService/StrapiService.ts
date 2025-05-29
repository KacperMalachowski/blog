import { strapi, type API, type StrapiClient } from "@strapi/client";
import type {
  CMSPaginationOptions,
  CMSPost,
  CMSPosts,
  CMSService,
} from "./types";

export class StrapiService implements CMSService {
  private client: StrapiClient;

  constructor(apiURL: string, apiKey?: string) {
    this.client = strapi({
      baseURL: apiURL,
      auth: apiKey,
    });
  }

  async getPosts(options?: CMSPaginationOptions): Promise<CMSPosts> {
    const posts = this.client.collection("posts");

    try {
      const response = await posts.find({
        pagination: {
          page: options?.page || 1,
          pageSize: options?.pageSize || 20,
        },
      });

      return {
        data: response.data.map(this.convertDocumentToPost),
        pagination: response.meta.pagination,
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  async getPostBySlug(slug: string): Promise<CMSPost | null> {
    const posts = this.client.collection("posts");

    try {
      const response = await posts.find({
        filters: { slug: slug },
        pagination: { page: 1, pageSize: 1 },
      });
      return response.data.length > 0
        ? this.convertDocumentToPost(response.data[0])
        : null;
    } catch (error) {
      console.error(`Error fetching post with slug "${slug}":`, error);
      throw error;
    }
  }

  private convertDocumentToPost(document: API.Document): CMSPost {
    return {
      id: document.id,
      title: document.title,
      summary: document.summary,
      content: document.content,
      slug: document.slug,
      publish_date: new Date(document.publishedAt),
    };
  }
}
