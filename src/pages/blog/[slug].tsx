import { NextPage, NextPageContext } from "next";
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

PostPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { slug } = query;
  return await getPostBySlug(slug as string);
};

interface Props {
  post: GraphCMSPostType;
}

export default PostPage;

const StyledMarkdown = styled(ReactMarkdown)`
  width: 75em;
  margin: 0 auto;
`; 
