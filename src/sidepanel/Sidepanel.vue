<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import browser from 'webextension-polyfill'
import { useSearchStore } from '../popup/stores/search'
import ResultList from '~/components/ResultList.vue'

const store = useSearchStore()
const { localResults, apiResults, loading } = storeToRefs(store)

const searchQuery = ref('')
const tabs = ['Local Index', 'Open Food Facts']
const activeTab = ref('Local Index')

// This handles the user typing manually
function handleSearch() {
  store.search(searchQuery.value)
}

// Logic to extract page context and auto-search
async function syncPageContext() {
  try {
    const activeTabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    })

    if (activeTabs[0]?.id) {
      const response = (await browser.tabs.sendMessage(
        activeTabs[0].id,
        { type: 'GET_PAGE_CONTEXT' },
      )) as { title?: string }

      if (response?.title && !searchQuery.value) {
        searchQuery.value = response.title
        store.search(response.title)
      }
    }
  }
  catch (e) {
    // If we're on a browser internal page or content script hasn't loaded yet
    console.warn('Could not get page context', e)
  }
}

onMounted(async () => {
  // 1. Check if store already has a query (from popup)
  if (store.query) {
    searchQuery.value = store.query
  }
  else {
    // 2. Otherwise, try to auto-search from current page
    await syncPageContext()
  }
})

// Optional: Re-sync context when the tab changes while sidepanel is open
browser.tabs.onActivated.addListener(() => {
  syncPageContext()
})
</script>

<template>
  <main class="w-full h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <div class="p-5">
      <h1 class="text-2xl font-black mb-8 text-green-700 dark:text-green-500 flex items-center gap-2">
        <Logo class="w-8 h-8" />
        EcoCart Helper
      </h1>

      <div class="mb-8 bg-green-50/50 dark:bg-green-900/5 p-5 rounded-2xl border border-green-100 dark:border-green-800/50 shadow-sm transition-all hover:shadow-md">
        <h2 class="text-[10px] font-black text-green-800 dark:text-green-400 uppercase tracking-widest mb-3 opacity-60">
          Global Search
        </h2>
        <div class="relative">
          <input
            v-model="searchQuery"
            placeholder="Search stores or products..."
            class="w-full p-3 pl-10 border border-green-200 dark:border-green-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 transition-all text-sm"
            @input="handleSearch"
          >
          <div class="absolute left-3 top-3.5 text-green-600 dark:text-green-400 opacity-50">
            <div class="i-pixelarticons-search w-5 h-5" />
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-green-700 border-t-transparent mx-auto mb-4" />
        <p class="text-green-600 dark:text-green-400 font-bold uppercase tracking-widest text-[10px]">
          Identifying products...
        </p>
      </div>

      <div v-else>
        <div class="flex border-b border-gray-100 dark:border-gray-800 mb-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-t-xl overflow-hidden shadow-inner">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="['px-6 py-3 flex-1 text-[10px] font-black transition-all uppercase tracking-widest', activeTab === tab ? 'border-b-2 border-green-600 text-green-700 dark:text-green-400 bg-white dark:bg-gray-800' : 'text-gray-400 dark:text-gray-500 hover:text-green-600']"
          >
            {{ tab }}
          </button>
        </div>

        <div class="max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
          <Transition name="fade" mode="out-in">
            <div :key="activeTab">
              <div v-if="activeTab === 'Local Index'">
                <ResultList :results="localResults" />
              </div>

              <div v-else-if="activeTab === 'Open Food Facts'">
                <ResultList :results="apiResults" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </main>
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

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}
</style>
