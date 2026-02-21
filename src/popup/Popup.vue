<script setup lang="ts">
import { onMounted, ref } from 'vue'
import browser from 'webextension-polyfill'
import { storeToRefs } from 'pinia'
import { useSearchStore } from './stores/search'
import ResultList from '~/components/ResultList.vue'

const store = useSearchStore()
const { localResults, apiResults, loading } = storeToRefs(store)

const searchQuery = ref('')
const tabs = ['Local Index', 'Open Food Facts']
const activeTab = ref('Local Index')

function handleSearch() {
  store.search(searchQuery.value)
}

onMounted(async () => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (tabs[0]?.id) {
    try {
      const response = (await browser.tabs.sendMessage(
        tabs[0].id,
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
  <div class="p-4 w-80">
    <h1 class="text-xl font-bold mb-4 text-green-700">
      EcoCart Local
    </h1>
    <input
      v-model="searchQuery"
      placeholder="Search local alternatives..."
      class="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      @input="handleSearch"
    >

    <div v-if="loading" class="text-center py-4">
      <div class="animate-pulse text-green-600 font-medium">
        Finding eco-alternatives...
      </div>
    </div>

    <div v-else>
      <div class="flex border-b mb-4">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-3 py-1 flex-1 text-sm font-medium transition-all" :class="[activeTab === tab ? 'border-b-2 border-green-600 text-green-700' : 'text-gray-500 hover:text-green-600']"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'Local Index'">
        <ResultList :results="localResults" />
      </div>

      <div v-else-if="activeTab === 'Open Food Facts'">
        <ResultList :results="apiResults" />
      </div>
    </div>
  </div>
</template>
