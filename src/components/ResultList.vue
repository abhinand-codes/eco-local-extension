<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useFavorites } from '~/popup/composables/useFavorites'

const props = defineProps<{ results: any[] }>()

const { addFavorite, removeFavorite, getAllFavorites } = useFavorites()
const favoriteIds = ref<Set<string>>(new Set())

async function loadFavorites() {
  const favorites = await getAllFavorites()
  favoriteIds.value = new Set(favorites.map((f: any) => f.id))
}

async function toggleFavorite(item: any) {
  const id = item.id || item.name
  if (favoriteIds.value.has(id)) {
    await removeFavorite(id)
    favoriteIds.value.delete(id)
  }
  else {
    await addFavorite({ ...item, id })
    favoriteIds.value.add(id)
  }
}

// Watch results to reload favorites if needed
watch(() => props.results, loadFavorites, { deep: true })

onMounted(loadFavorites)
</script>

<template>
  <div v-if="results.length === 0" class="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
    <div class="text-4xl mb-3 opacity-20">
      🌱
    </div>
    <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300">
      No sustainable alternatives found
    </h3>
    <p class="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-[200px]">
      Try searching for more specific keywords or broaden your search.
    </p>
  </div>
  <div v-else class="space-y-3 pb-4">
    <div
      v-for="item in results"
      :key="item.id || item.name"
      class="group p-3 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-green-200 dark:hover:border-green-800 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all shadow-sm bg-white dark:bg-gray-800/50"
    >
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <a
              :href="item.url"
              target="_blank"
              class="text-green-800 dark:text-green-400 font-bold hover:underline text-sm sm:text-base decoration-green-500/30"
            >
              {{ item.name }}
            </a>
            <button
              class="text-lg transition-transform hover:scale-125 focus:outline-none"
              :class="favoriteIds.has(item.id || item.name) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700 hover:text-yellow-200'"
              title="Add to Favorites"
              @click="toggleFavorite(item)"
            >
              ★
            </button>
          </div>
          <p v-if="item.brand" class="text-[10px] text-gray-500 dark:text-gray-400 mt-1 font-mono uppercase tracking-widest font-black opacity-70">
            {{ item.brand }}
          </p>
        </div>
        <span class="text-[9px] px-1.5 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md border border-gray-100 dark:border-gray-600 uppercase font-black group-hover:bg-green-100 dark:group-hover:bg-green-900/40 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
          {{ item.source }}
        </span>
      </div>

      <div v-if="item.tags" class="flex flex-wrap gap-1 mt-2.5">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="text-[9px] px-1.5 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-100 dark:border-green-800 font-bold"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
