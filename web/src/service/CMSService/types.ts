export type CMSPost = {
  id: number;
  title: string;
  slug: string;
  summary: string
  content: string;
  author?: string;
  publish_date: Date;
};

export type CMSPaginationOptions = {
  page: number;
  pageSize: number;
};

type CMSPaginationResponse = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type CMSPosts = {
  data: CMSPost[];
  pagination?: CMSPaginationResponse;
};

export interface CMSService {
  getPosts(options?: CMSPaginationOptions): Promise<CMSPosts>;
  getPostBySlug(slug: string): Promise<CMSPost | null>;
}
