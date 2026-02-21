import { defineStore } from 'pinia'
import { ref } from 'vue'
import browser from 'webextension-polyfill'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const localResults = ref<any[]>([])
  const apiResults = ref<any[]>([])
  const loading = ref(false)

  async function search(newQuery: string) {
    query.value = newQuery

    if (!newQuery.trim()) {
      localResults.value = []
      apiResults.value = []
      return
    }

    loading.value = true

    try {
      // 1. Search Local Index
      const resp = await fetch(browser.runtime.getURL('data/local-stores.json'))
      const allLocal = await resp.json()
      localResults.value = allLocal
        .filter((s: any) =>
          s.name.toLowerCase().includes(newQuery.toLowerCase())
          || s.category.toLowerCase().includes(newQuery.toLowerCase()),
        )
        .map((s: any) => ({ ...s, source: 'Local Index' }))

      // 2. Search Background API (Open Food Facts)
      const { results } = await browser.runtime.sendMessage({
        type: 'SEARCH_API',
        query: newQuery,
      })
      apiResults.value = results || []
    }
    catch (error) {
      console.error('Search failed:', error)
    }
    finally {
      loading.value = false
    }
  }

  return {
    query,
    localResults,
    apiResults,
    loading,
    search,
  }
})
