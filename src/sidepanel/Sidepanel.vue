<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

onMounted(() => {
  if (store.query) {
    searchQuery.value = store.query
  }
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
            class="w-full p-3 pl-10 border border-green-200 dark:border-green-800 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 transition-all"
            @input="handleSearch"
          >
          <div class="absolute left-3 top-3.5 text-green-600 dark:text-green-400 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-green-700 border-t-transparent mx-auto mb-4 shadow-sm" />
        <p class="text-green-600 dark:text-green-400 font-bold uppercase tracking-widest text-xs">
          Scanning local directories...
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
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
</style>
