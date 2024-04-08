<script setup>
import { ref } from "vue";

const colorMode = useColorMode();

const toggleDarkMode = () => {
  switch (colorMode.preference) {
    case "light":
      colorMode.preference = "dark";
      break;
    case "dark":
      colorMode.preference = "light";
      break;
    default:
      colorMode.preference = "dark";
  }
};

const isOpen = ref(false);
</script>

<template>
  <nav class="flex items-center justify-between flex-wrap p-6">
    <div class="flex items-center flex-shrink-0 dark:text-white mr-6">
      <a class="font-semibold text-xl tracking-tight" href="/"> Kacper Małachowski </a>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <input
          type="text"
          placeholder="Search"
          class="block first-letter:bg-gray-100 dark:bg-zinc-700 rounded-full outline-none px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 dark:text-teal-200 dark:hover:text-white mr-4"
        >
          Docs
        </a>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 dark:text-teal-200 hover:text-white mr-4"
        >
          Examples
        </a>
        <a
          href="#responsive-header"
          class="block mt-4 lg:inline-block lg:mt-0 dark:text-teal-200 hover:text-white mr-4"
        >
          Blog
        </a>
        <DarkModeToggler
          @click="toggleDarkMode"
          :dark="$colorMode.preference == 'dark'"
          class="block mt-4 lg:inline-block lg:mt-0"
        />
      </div>
    </div>
  </nav>
</template>
