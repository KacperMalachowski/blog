export type Post = {
  id: number;
  title: string;
  slug: string;
  summary: string
  content: string;
  author?: string;
  publishedAt: Date;
};

export type PaginationOptions = {
  page: number;
  pageSize: number;
};

type PaginationResponse = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Posts = {
  data: Post[];
  pagination?: PaginationResponse;
};