<script setup lang="ts">
import ListLayout from "~/layouts/list.vue";
import BlogSVG from "@/assets/images/blog.svg";
import type { Post, Posts } from "~/types/cms";
import type { MetaResponsePaginationByPage } from "@nuxtjs/strapi";

const { find } = useStrapi<Post>()
const { locale } = useI18n();

const posts = ref<Posts>({ data: [] })

const fetchPosts = async (page: number = 1, pageSize: number = 20) => {
  try {
    const response = await find("posts", {
      locale: locale.value,
      pagination: {
        page,
        pageSize,
      }
    });

    const pagination: MetaResponsePaginationByPage = (response.meta.pagination as MetaResponsePaginationByPage);
    
    posts.value = {
      data: response.data.map((post: Post) => ({
        ...post,
        publishedAt: new Date(post.publishedAt),
      })),
      pagination: {
        page: pagination.page,
        pageCount: pagination.pageCount,
        pageSize: pagination.pageSize,
        total: pagination.total,
      },
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
<ListLayout
  title="Blog"
  :description="{ import: BlogSVG }"
  :rss-url="`/${locale}/rss/blog`"
  :items="posts.data"
  :pagination="{
    currentPage: posts.pagination?.page ?? 1,
    totalPages: posts.pagination?.pageCount ?? 1,
    nextPage: () => fetchPosts((posts.pagination?.page ?? 0) + 1),
    prevPage: () => fetchPosts((posts.pagination?.page ?? 0) - 1),
  }"
   />
</template>