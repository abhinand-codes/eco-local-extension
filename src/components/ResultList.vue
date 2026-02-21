<script setup lang="ts">
defineProps<{ results: any[] }>()
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
        <a
          :href="item.url"
          target="_blank"
          class="text-green-800 font-bold hover:underline text-sm sm:text-base"
        >
          {{ item.name }}
        </a>
        <span class="text-[9px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100 uppercase font-black group-hover:bg-green-100 group-hover:text-green-700 group-hover:border-green-200">
          {{ item.source }}
        </span>
      </div>

      <p v-if="item.brand" class="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">
        {{ item.brand }}
      </p>

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
