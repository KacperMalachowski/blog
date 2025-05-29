import { createRouter, createWebHistory } from "vue-router";
import i18n from "./i18n";

import Home from "./views/Home.vue";

const routes = [
  {
    path: "",
    component: Home,
  },
  {
    path: "blog",
    component: () => import("./views/Blog.vue"),
  },
  {
    path: "projects",
    component: () => "Projects",
  },
  {
    path: "about",
    component: () => "AboutMe",
  },
  {
    path: "archive",
    component: () => "Archive",
  },
  {
    path: "tags",
    component: () => "Tags",
  },
];

const i18nRoutes = i18n.global.availableLocales.map((locale) => ({
  path: `/${locale}`,
  children: routes,
}));


const router = createRouter({
  history: createWebHistory(),
  routes: i18nRoutes,
  linkActiveClass: "active",
});

router.beforeResolve((to, _from, next) => {
  // If the route has a locale prefix, set the locale in i18n
  // Otherwise, use the default locale
  const locale = to.path.split("/")[1];

  if ((i18n.global.availableLocales as string[]).includes(locale)) {
    (i18n.global.locale.value as string) = locale;
    next();
  } else {
    next({ path: `/${i18n.global.fallbackLocale.value}${to.fullPath}` });
  }
});

export default router;
