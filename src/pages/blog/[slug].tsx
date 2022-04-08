import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { getPostBySlug } from "../../lib/getPublishedPosts";
import GraphCMSPostType from "../../types/GraphCMSPostType";

const PostPage: NextPage<Props> = ({ post }) => (
  <>
    <h2>{post.title}</h2>
  </>
);

PostPage.getInitialProps = async ({ query }: NextPageContext) => {
  const { slug } = query;
  return await getPostBySlug(slug as string);
};

interface Props {
  post: GraphCMSPostType;
}

export default PostPage;
