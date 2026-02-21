<script setup lang="ts">
import { onMounted, ref } from 'vue'
import browser from 'webextension-polyfill'
import { storeToRefs } from 'pinia'
import { useSearchStore } from './stores/search'
import { useFavorites } from './composables/useFavorites'
import ResultList from '~/components/ResultList.vue'

const store = useSearchStore()
const { localResults, apiResults, loading, error } = storeToRefs(store)

const searchQuery = ref(store.query || '')
const tabs = ['Local Index', 'Open Food Facts', 'Favorites']
const activeTab = ref('Local Index')
const favorites = ref<any[]>([])

const { getAllFavorites } = useFavorites()

async function loadFavorites() {
  favorites.value = await getAllFavorites()
}

function handleSearch() {
  store.search(searchQuery.value)
}

onMounted(async () => {
  await loadFavorites()
  const activeTabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (activeTabs[0]?.id) {
    try {
      const response = (await browser.tabs.sendMessage(
        activeTabs[0].id,
        { type: 'GET_PAGE_CONTEXT' },
      )) as { title?: string }

      if (response?.title) {
        searchQuery.value = response.title
        store.search(response.title)
      }
    }
    catch {
      console.warn('No content script context available')
    }
  }
})
</script>

<template>
  <div class="p-4 w-80 min-h-[400px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <h1 class="text-xl font-black mb-4 text-green-700 dark:text-green-500 flex items-center gap-2">
      <Logo class="w-6 h-6" />
      EcoCart Local
    </h1>

    <div v-if="error" class="mb-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-[10px] font-bold flex items-center gap-2 shadow-sm">
      <div class="i-pixelarticons-alert-circle w-4 h-4 flex-shrink-0" />
      {{ error }}
    </div>

    <div class="relative mb-4">
      <input
        v-model="searchQuery"
        placeholder="Search local alternatives..."
        class="w-full p-2.5 pl-9 border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 dark:bg-gray-800 transition-all shadow-sm dark:shadow-none"
        @input="handleSearch"
      >
      <div class="absolute left-3 top-3.5 text-gray-400">
        <div class="i-pixelarticons-search w-4 h-4" />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-green-500 border-t-transparent shadow-sm" />
    </div>

    <div v-else>
      <div class="flex border-b border-gray-100 dark:border-gray-800 mb-4 overflow-x-auto no-scrollbar">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-4 py-2 flex-1 text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest"
          :class="[activeTab === tab ? 'border-b-2 border-green-600 text-green-700 dark:text-green-400' : 'text-gray-400 dark:text-gray-600 hover:text-green-600 dark:hover:text-green-500']"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="activeTab" class="min-h-[200px]">
          <div v-if="activeTab === 'Local Index'">
            <ResultList :results="localResults" />
          </div>

          <div v-else-if="activeTab === 'Open Food Facts'">
            <ResultList :results="apiResults" />
          </div>

          <div v-else-if="activeTab === 'Favorites'">
            <ResultList :results="favorites" />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
