import { graphql } from "msw";
import graphcmsPostType from "../types/GraphCMSPostType";

export const Posts: graphcmsPostType[] = [
  {
    id: "1",
    author: {
      id: "1",
      name: "John Smith"
    },
    title: "Why you should test your code?",
    content: {
      markdown: "Any content here?"
    },
    slug: "why-you-should-test-your-code",
    date: 1653134252,
    coverImaage: {
      id: "1",
      url: "/stubimage.png"
    },
    excerpt: "You are testing your software"
  },
  {
    id: "2",
    author: {
      id: "1",
      name: "John Smith"
    },
    title: "Why you test your code wrong?",
    content: {
      markdown: "Any content here2?"
    },
    slug: "why-you-test-your-code-wrong",
    date: 1653134343,
    coverImaage: {
      id: "1",
      url: "/stubimage.png"
    },
    excerpt: "You are testing your software not exactly as it should be"
  }
]

export const graphqlHandlers = [
  graphql.query("Posts", (req, res, ctx) => {
    console.log(res)
    return res(ctx.data({posts: {...Posts}}));
  })
]