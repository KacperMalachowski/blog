import { Feed } from 'feed';

export const buildFeed = async () => {

  const feed = new Feed({
    id: "https://kacpermalachowski.pl",
    title: 'Posts Feed',
    copyright: "All rights reserved 2020, Kacper Małachowski"
  });


  return feed;
}