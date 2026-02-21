<script setup lang="ts">
defineProps<{ results: any[] }>()
</script>

<template>
  <div v-if="results.length === 0" class="text-gray-500 py-10 text-center italic">
    No sustainable alternatives found for this search.
  </div>
  <div v-else class="space-y-3">
    <div
      v-for="item in results"
      :key="item.id || item.name"
      class="group p-3 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50 transition-all shadow-sm"
    >
      <div class="flex justify-between items-start">
        <a
          :href="item.url"
          target="_blank"
          class="text-green-700 font-bold hover:underline"
        >
          {{ item.name }}
        </a>
        <span class="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase font-bold group-hover:bg-green-100 group-hover:text-green-700">
          {{ item.source }}
        </span>
      </div>

      <p v-if="item.brand" class="text-sm text-gray-600 mt-1 italic">
        Brand: {{ item.brand }}
      </p>

      <div v-if="item.tags" class="flex flex-wrap gap-1 mt-2">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="text-[9px] px-1 bg-green-100 text-green-800 rounded"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
