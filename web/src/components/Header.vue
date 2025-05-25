<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";

const { t, locale, availableLocales } = useI18n();
const router = useRouter();

if (localStorage.getItem("pref-theme") === "dark") {
  document.body.classList.add("dark");
} else if (localStorage.getItem("pref-theme") === "light") {
  document.body.classList.remove("dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark");
}

const toggleTheme = () => {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.setItem("pref-theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("pref-theme", "dark");
  }
};

const changeLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem("locale", newLocale);
  const currentPath = router.currentRoute.value.path;
  const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLocale}`);
  router.push({ path: newPath });
};
</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        <RouterLink :to="{ path: `/${locale}` }" class="nav-link" title="Home">
          Kacper Małachowski
        </RouterLink>
        <div class="logo-switches">
          <button
            @click="toggleTheme"
            id="theme-toggle"
            accesskey="t"
            title="(Alt+T)"
            aria-label="Toggle theme"
          >
            <svg
              id="moon"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg
              id="sun"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>

          <select
            @change="changeLocale($event.target.value)"
            aria-label="Change language"
            class="lang-switch"
            :value="locale"
          >
            <option v-for="lang in availableLocales" :key="lang" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>
      </div>
      <ul id="menu">
        <li>
          <RouterLink to="blog" class="nav-link">
            {{ t("header.blog") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="projects" class="nav-link">
            {{ t("header.projects") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="about" class="nav-link">
            {{ t("header.about") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink to="archive" class="nav-link">
            {{ t("header.archive") }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: calc(var(--nav-width) + var(--gap) * 2);
  margin-inline-start: auto;
  margin-inline-end: auto;
  line-height: var(--header-height);

  a {
    display: block;
  }
}

.logo,
#menu {
  display: flex;
  margin: auto var(--gap);
}

.logo {
  flex-wrap: inherit;

  a {
    font-size: 24px;
    font-weight: 700;
  }
}

button#theme-toggle {
  font-size: 26px;
  margin: auto 4px;
}

body {
  &.dark #moon {
    vertical-align: middle;
    display: none;
  }

  &:not(.dark) #sun {
    display: none;
  }
}

.logo-switches {
  display: inline-flex;
  margin: auto 4px;
}

.lang-switch {
  margin: auto 4px;
  padding: 4px;
  font-size: 16px;
  border: none;
  border-radius: var(--radius);
  background: var(--code-bg);
  color: var(--content);
}

#menu {
  list-style: none;
  word-break: keep-all;
  overflow-x: auto;
  white-space: nowrap;

  li + li {
    margin-inline-start: var(--gap);
  }

  a {
    font-size: 16px;
  }

  .active,
  a:hover {
    font-weight: 500;
    border-bottom: 2px solid currentColor;
  }
}
</style>
