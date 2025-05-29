<script lang="ts" setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import type { CMSPost } from "../service/CMSService";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type Props = {
  title: string;
  description: string | { import: string };
  rssURL?: string;
  items: Array<CMSPost>;
  pagination?: {
    currentPage: number;
    totalPages: number;
    nextPage?: () => void;
    prevPage?: () => void;
  };
};

const props = defineProps<Props>();
</script>

<template>
  <Header />
  <main class="main">
    <header class="list-header">
      <h1>
        {{ props.title }}
        <RouterLink :to="props.rssURL" v-if="props.rssURL">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="23"
          >
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </RouterLink>
      </h1>
      <div
        class="list-description"
        v-if="typeof props.description === 'string'"
      >
        {{ props.description }}
      </div>
      <div
        class="list-description"
        v-else-if="typeof props.description === 'object'"
      >
        <img
          :src="props.description.import"
          alt="Description Image"
          class="list-description-image"
        />
      </div>
    </header>

    <article class="entry" v-for="item in props.items" :key="item.id">
      <RouterLink :to="`/blog/${item.slug}`">
        <header class="entry-header">
          <h2>{{ item.title }}</h2>
        </header>
        <div class="entry-content">
          <p>{{ item.summary }}</p>
        </div>
        <footer class="entry-footer">
          <span>{{ item.publish_date.toLocaleString() }}</span>
        </footer>
      </RouterLink>
    </article>

    <footer
      class="list-footer"
      v-if="props.pagination && props.pagination.totalPages > 1"
    >
      <nav class="pagination">
        <RouterLink
          v-if="props.pagination.prevPage"
          :to="`blog?page=${props.pagination.currentPage - 1}`"
          class="prev"
        >
          {{ t("pagination.prev") }}
        </RouterLink>

        <RouterLink
          v-if="props.pagination.nextPage"
          :to="`blog?page=${props.pagination.currentPage + 1}`"
          class="next"
        >
          {{ t("pagination.next") }}
        </RouterLink>
      </nav>
    </footer>
  </main>
  <Footer />
</template>

<style scoped lang="scss">
.main {
  position: relative;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  max-width: calc(var(--main-width) + var(--gap) * 2);
  margin: auto;
  padding: var(--gap);
}

.list-header {
  h1 {
    font-size: 40px;
  }
}

.pagination {
  display: flex;

  a {
    color: var(--theme);
    font-size: 13px;
    line-height: 36px;
  }
}

.entry {
  position: relative;
  margin-bottom: var(--gap);
  padding: var(--gap);
  background: var(--entry);
  border-radius: var(--radius);
  transition: transform 0.1s;
  border: 1px solid var(--border);

  &:active {
    transform: scale(0.98);
  }
}

.entry-header {
  h2 {
    margin: 0.5rem 0;
    line-height: 1.3;
  }
}

.entry-content {
  margin: 0.5rem 0;
  color: var(--secondary);
  font-size: 14px;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
}

.entry-footer {
  color: var(--secondary);
  font-size: 13px;
}

</style>
