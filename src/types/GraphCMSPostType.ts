type graphcmsPostType = {
  id: string;
  title: string;
  excerpt: string;
  content: {
    markdown: string;
  };
  slug: string;
  coverImaage: {
    id: string;
    url: string;
  };
  author: {
    id: string;
    name: string;
  };
  date: number;
};

export default graphcmsPostType;
