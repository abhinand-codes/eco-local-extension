import { defineStore } from 'pinia'
import { ref } from 'vue'
import browser from 'webextension-polyfill'

export const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const localResults = ref<any[]>([])
  const apiResults = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const cache = new Map<string, { local: any[], api: any[] }>()
  let debounceTimer: any = null

  async function performSearch(newQuery: string) {
    const trimmed = newQuery.trim().toLowerCase()
    if (!trimmed) {
      localResults.value = []
      apiResults.value = []
      loading.value = false
      return
    }

    if (cache.has(trimmed)) {
      const cached = cache.get(trimmed)!
      localResults.value = cached.local
      apiResults.value = cached.api
      loading.value = false
      return
    }

    loading.value = true
    error.value = null

    try {
      const localResp = await fetch(browser.runtime.getURL('data/local-stores.json'))
      const allLocal = await localResp.json()

      const searchTerms = trimmed.split(/\s+/).filter(t => t.length > 0)

      const filteredLocal = allLocal
        .filter((s: any) => {
          const searchableText = `${s.name} ${s.category} ${(s.tags || []).join(' ')}`.toLowerCase()
          return searchTerms.every((term) => {
            const regex = new RegExp(`\\b${term}`, 'i')
            return regex.test(searchableText)
          })
        })
        .map((s: any) => ({ ...s, source: 'Local Index' }))

      localResults.value = filteredLocal

      try {
        const response: any = await browser.runtime.sendMessage({
          type: 'SEARCH_API',
          query: trimmed,
        })
        apiResults.value = response?.results || []
      }
      catch (e) {
        console.warn('Background Search failed:', e)
        apiResults.value = []
      }

      cache.set(trimmed, {
        local: localResults.value,
        api: apiResults.value,
      })
    }
    catch (err: any) {
      console.error('Search system error:', err)
      error.value = 'Failed to fetch results. Check your connection.'
    }
    finally {
      loading.value = false
    }
  }

  function search(newQuery: string) {
    query.value = newQuery

    if (debounceTimer) {
      clearTimeout(debounceTimer)
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
