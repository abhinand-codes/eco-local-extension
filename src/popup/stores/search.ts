import { defineStore } from 'pinia'
import { ref } from 'vue'

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

    setTimeout(() => {
      localResults.value = [
        { name: 'Sample Local', source: 'Local Index' },
      ]

      apiResults.value = [
        { name: 'Sample API', source: 'Open Food Facts' },
      ]

      loading.value = false
    }, 500)
  }

  return {
    query,
    localResults,
    apiResults,
    loading,
    search,
  }
})
