import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import HomeLayout from "../../layouts/Home";
import { getPostBySlug } from "../../lib/getPublishedPosts";
import GraphCMSPostType from "../../types/GraphCMSPostType";
import ReactMarkdown from 'react-markdown'
import styled from "styled-components";

const PostPage: NextPage<Props> = ({ post }) => (
  <HomeLayout>
    <h2 style={{margin: "0 auto;"}}>{post?.title}</h2>
    <StyledMarkdown children={post?.content.markdown} />
  </HomeLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;
  const post =  await getPostBySlug(slug as string);
  return {
    props: {
      post: post.post
    }
  }
};

interface Props {
  post: GraphCMSPostType;
}

export default PostPage;

const StyledMarkdown = styled(ReactMarkdown)`
  width: 75em;
  margin: 0 auto;
`; 
