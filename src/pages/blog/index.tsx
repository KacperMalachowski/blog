import React from "react";
import { GetServerSideProps, NextPage } from "next";
import styles from '../../styles/Home.module.css';
import HomeLayout from "../../layouts/Home";
import Link from "next/link";
import { useAllPostsQuery } from "../../generated/graphql";

const BlogHome: NextPage = () => {
  
  const { loading, error, data } = useAllPostsQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
  <HomeLayout>
    {data && 
      data.posts.map(post => (
        <Link href={`/blog/${post.slug}`} key={post.id}>

        </Link>
      ))
    }
  </HomeLayout>
)};

export default BlogHome;
