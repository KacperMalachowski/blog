<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
</script>

<template>
  <footer>
    <span
      >&copy; {{ new Date().getFullYear() }}
      <RouterLink :to="`/${locale}`">Kacper Małachowski</RouterLink></span
    >

    <span
      >{{ t("footer.powered") }}
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer"
        >Vue.js</a
      >
      &amp;
      <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer"
        >Vite</a
      >.
    </span>
  </footer>
</template>

<style scoped lang="scss">
footer {
  font-size: 12px;
  color: var(--secondary);
  max-width: calc(var(--main-width) + var(--gap) * 2);
  margin: auto;
  padding: calc((var(--footer-height) - var(--gap)) / 2) var(--gap);
  text-align: center;
  line-height: 1rem;

  span {
    margin-inline-start: 1px;
    margin-inline-end: 1px;

    &:last-child {
      white-space: nowrap;
    }
  }

  a {
    color: inherit;
    border-bottom: 1px solid var(--secondary);

    &:hover {
      border-bottom: 1px solid var(--primary);
      color: var(--primary);
    }
  }
}
</style>
