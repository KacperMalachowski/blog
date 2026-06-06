import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });
const DATABASE_ID = import.meta.env.NOTION_BLOG_DATABASE_ID;

export interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  lang: 'pl' | 'en';
}

function text(prop: any): string {
  if (prop?.type === 'title') return prop.title.map((t: any) => t.plain_text).join('');
  if (prop?.type === 'rich_text') return prop.rich_text.map((t: any) => t.plain_text).join('');
  return '';
}

export function pageToPost(page: PageObjectResponse): Post {
  const p = page.properties;
  return {
    id: page.id,
    title: text(p['Title']),
    slug: text(p['Slug']),
    summary: text(p['Summary']),
    publishedAt: p['Published']?.type === 'date' ? (p['Published'].date?.start ?? '') : '',
    tags: p['Tags']?.type === 'multi_select' ? p['Tags'].multi_select.map((t: any) => t.name) : [],
    lang: p['Lang']?.type === 'select' ? ((p['Lang'].select?.name ?? 'pl') as 'pl' | 'en') : 'pl',
  };
}

export async function getPosts(lang?: 'pl' | 'en'): Promise<Post[]> {
  const filters: any[] = [{ property: 'Status', select: { equals: 'Published' } }];
  if (lang) filters.push({ property: 'Lang', select: { equals: lang } });

  const res = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: { and: filters },
    sorts: [{ property: 'Published', direction: 'descending' }],
  });

  return (res.results as PageObjectResponse[]).map(pageToPost);
}

export async function getPostContent(pageId: string): Promise<string> {
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const blocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(blocks).parent;
}
