<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '../popup/stores/search'
import ResultList from '~/components/ResultList.vue'

const store = useSearchStore()
const { localResults, apiResults, loading } = storeToRefs(store)

const searchQuery = ref('')
const tabs = ['Local Index', 'Open Food Facts']
const activeTab = ref('Local Index')

function handleSearch() {
  store.search(searchQuery.value)
}
</script>

<template>
  <main class="w-full h-full bg-white">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <Logo class="w-8 h-8" />
        EcoCart Helper
      </h1>

      <div class="mb-6 bg-green-50 p-4 rounded-lg border border-green-100">
        <h2 class="text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">
          Global Search
        </h2>
        <input
          v-model="searchQuery"
          placeholder="Search stores or products..."
          class="w-full p-2 border border-green-200 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          @input="handleSearch"
        >
      </div>

      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-4" />
        <p class="text-green-600">
          Finding alternatives...
        </p>
      </div>

      <div v-else>
        <div class="flex border-b mb-4">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="px-4 py-2 flex-1 text-sm font-bold transition-colors" :class="[activeTab === tab ? 'border-b-2 border-green-600 text-green-700 bg-green-50' : 'text-gray-500 hover:bg-gray-50']"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
          <div v-if="activeTab === 'Local Index'">
            <ResultList :results="localResults" />
          </div>

          <div v-else-if="activeTab === 'Open Food Facts'">
            <ResultList :results="apiResults" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
