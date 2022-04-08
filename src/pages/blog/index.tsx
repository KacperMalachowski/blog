import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { getPublishedPosts } from "../../lib/getPublishedPosts";
import GraphCMSPostType from "../../types/GraphCMSPostType";

const BlogHome: NextPage<Props> = ({ posts }) => (
  <>
    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
      </div>
    ))}
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await getPublishedPosts();

  return {
    props: {
      posts,
    },
  };
};

interface Props {
  posts: GraphCMSPostType[];
}

export default BlogHome;
