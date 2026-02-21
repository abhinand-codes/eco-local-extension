<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from './stores/search'
import ResultList from './ResultList.vue'

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
  <div class="p-4 w-80">
    <h1 class="text-xl font-bold mb-4">
      EcoCart Local
    </h1>
    <input
      v-model="searchQuery"
      placeholder="Search local alternatives..."
      class="w-full p-2 border rounded mb-4"
      @input="handleSearch"
    >

    <div v-if="loading" class="text-center">
      Searching...
    </div>

    <div v-else>
      <div class="flex border-b mb-2">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-3 py-1" :class="[activeTab === tab ? 'border-b-2 border-blue-500' : '']"
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
