import { Feed } from 'feed';
import { getPublishedPosts } from './getPublishedPosts';

const baseUrl = "https://kacpermalachowski.pl";
const date = new Date();

const author = {
  name: 'KAcper Malachwoski',
  email: 'kacperrmaachowskI@gmail.com',
  link: 'https://twitter.com/kacpermaachowsk'
};

export const buildFeed = async () => {

  const feed = new Feed({
    title: `Kacper's Blog`,
    description: `Welcome to my blog!`,
    id: baseUrl,
    link: baseUrl,
    language: `en`,
    image: `${baseUrl}/images/logo.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Kacper Malachowski`,
    updated: date,
    generator: `Next.js using Feed for node.js`,
    author
  });

  const posts = await getPublishedPosts();

  posts.forEach((post) => {
    const url = `${baseUrl}/blog/${post.slug}`
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.content?.html,
      author: [author],
      date: new Date(post.date)
    })
  })

  return feed;
}