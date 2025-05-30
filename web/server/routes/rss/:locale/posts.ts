import RSS from 'rss'
import { strapi } from '@strapi/client'

export default defineEventHandler(async (event) => {
  const locale = event.context.params?.locale ?? 'en';
  const runtimeConfig = useRuntimeConfig();
  const strapiUrl = runtimeConfig.strapi.url;
  const baseURL = runtimeConfig.app.baseURL;


  const client = strapi({ baseURL: `${strapiUrl}/api` });
  const posts = client.collection('posts')

  const response = await posts.find({
    locale,
    pagination: {
      page: 1,
      pageSize: 10,
    },
  });

  const feed = new RSS({
    title: `Blog - ${locale}`,
    description: `Latest posts in ${locale}`,
    feed_url: `${baseURL}/rss/${locale}/posts/rss`,
    site_url: baseURL,
  })

  response.data.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${baseURL}/blog/${locale}/${post.slug}`,
      date: new Date(post.publishedAt),
    })
  })

  const feedString = feed.xml({ indent: true });
  event.node.res.setHeader('Content-Type', 'application/xml');
  event.node.res.end(feedString)
})