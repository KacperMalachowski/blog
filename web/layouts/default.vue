<script lang="ts" setup>
import Header from "~/components/PageHeader.vue";
import Footer from "~/components/PageFooter.vue";
</script>

<template>
  <Header />
  <main class="main">
    <slot />
  </main>
  <Footer />
</template>

<style scoped>
.main {
  position: relative;
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  max-width: calc(var(--main-width) + var(--gap) * 2);
  margin: auto;
  padding: var(--gap);
}
</style>
