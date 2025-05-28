<script lang="ts" setup>
import BlogSVG from "../assets/images/blog.svg";
import ListLayout from "../layouts/ListLayout.vue";
import config from "../config";
import { onMounted, ref } from "vue";
import { type CMSPosts } from "../service/CMSService";

const cmsClient = config.cms.config[config.cms.type].client;

const posts = ref<CMSPosts>({
  data: [],
});

const fetchPosts = async (page: number = 1, pageSize: number = 20) => {
  try {
    const response = await cmsClient.getPosts({ page, pageSize });
    posts.value = response;
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
    rssURL="blog/rss"
    :items="posts.data"
    :pagination="{
      currentPage: posts.pagination?.page ?? 1,
      totalPages: posts.pagination?.pageCount ?? 1,
      nextPage: () => fetchPosts((posts.pagination?.page ?? 0) + 1),
      prevPage: () => fetchPosts((posts.pagination?.page ?? 0) - 1),
    }"
  />
</template>
