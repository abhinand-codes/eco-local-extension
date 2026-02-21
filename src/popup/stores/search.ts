import { defineStore } from 'pinia'
import { ref } from 'vue'
import browser from 'webextension-polyfill'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const localResults = ref<any[]>([])
  const apiResults = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // In-memory cache
  const cache = new Map<string, { local: any[], api: any[] }>()
  let debounceTimer: any = null

  async function performSearch(newQuery: string) {
    const trimmed = newQuery.trim()
    if (!trimmed) {
      localResults.value = []
      apiResults.value = []
      loading.value = false
      return
    }

    // Check cache
    if (cache.has(trimmed.toLowerCase())) {
      const cached = cache.get(trimmed.toLowerCase())!
      localResults.value = cached.local
      apiResults.value = cached.api
      loading.value = false
      return
    }

    loading.value = true
    error.value = null

    try {
      // 1. Search Local Index
      const localResp = await fetch(browser.runtime.getURL('data/local-stores.json'))
      if (!localResp.ok)
        throw new Error('Local database unreachable')

      const allLocal = await localResp.json()
      const filteredLocal = allLocal
        .filter((s: any) =>
          s.name.toLowerCase().includes(trimmed.toLowerCase())
          || s.category.toLowerCase().includes(trimmed.toLowerCase()),
        )
        .map((s: any) => ({ ...s, source: 'Local Index' }))

      localResults.value = filteredLocal

      // 2. Search Background API (Open Food Facts)
      try {
        const response = await browser.runtime.sendMessage({
          type: 'SEARCH_API',
          query: trimmed,
        })
        apiResults.value = response?.results || []
      }
      catch (e) {
        console.warn('API Search failed:', e)
        apiResults.value = []
        // Don't fail the whole search if only API fails
      }

      // Update cache
      cache.set(trimmed.toLowerCase(), {
        local: localResults.value,
        api: apiResults.value,
      })
    }
    catch (err: any) {
      console.error('Core search failed:', err)
      error.value = 'Search system unavailable. Please try again.'
    }
    finally {
      loading.value = false
    }
  }

  function search(newQuery: string) {
    query.value = newQuery

    if (debounceTimer)
      clearTimeout(debounceTimer)

    if (!newQuery.trim()) {
      loading.value = false
      localResults.value = []
      apiResults.value = []
      return
    }

    loading.value = true
    debounceTimer = setTimeout(() => {
      performSearch(newQuery)
    }, 300)
  }

  return {
    query,
    localResults,
    apiResults,
    loading,
    error,
    search,
  }
})
