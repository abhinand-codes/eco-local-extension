<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFavorites } from '~/popup/composables/useFavorites'

const { results } = defineProps<{ results: any[] }>()

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

onMounted(loadFavorites)
</script>

<template>
  <div v-if="results.length === 0" class="text-gray-400 py-10 text-center italic text-sm">
    No sustainable alternatives found for this search.
  </div>
  <div v-else class="space-y-3">
    <div
      v-for="item in results"
      :key="item.id || item.name"
      class="group p-3 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50 transition-all shadow-sm bg-white"
    >
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <a
              :href="item.url"
              target="_blank"
              class="text-green-800 font-bold hover:underline text-sm sm:text-base"
            >
              {{ item.name }}
            </a>
            <button
              class="text-lg transition-colors focus:outline-none"
              :class="favoriteIds.has(item.id || item.name) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'"
              @click="toggleFavorite(item)"
            >
              ★
            </button>
          </div>
          <p v-if="item.brand" class="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">
            {{ item.brand }}
          </p>
        </div>
        <span class="text-[9px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100 uppercase font-black group-hover:bg-green-100 group-hover:text-green-700 group-hover:border-green-200">
          {{ item.source }}
        </span>
      </div>

      <div v-if="item.tags" class="flex flex-wrap gap-1 mt-2.5">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-100 font-medium"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
