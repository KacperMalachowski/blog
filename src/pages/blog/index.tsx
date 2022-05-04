import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { getPublishedPosts } from "../../lib/getPublishedPosts";
import GraphCMSPostType from "../../types/GraphCMSPostType";
import styles from '../../styles/Home.module.css';
import HomeLayout from "../../layouts/Home";
import Link from "next/link";

const BlogHome: NextPage<Props> = ({ posts }) => (
  <HomeLayout>
    {posts.map((post) => (
      <Link href={`/blog/${post.slug}`} key={post.id} >
        <div className={styles.card}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
      </Link>
    ))}
  </HomeLayout>
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
