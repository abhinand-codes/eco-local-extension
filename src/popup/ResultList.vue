<script setup lang="ts">
defineProps<{ results: any[] }>()
</script>

<template>
  <div v-if="results.length === 0" class="text-gray-500">
    No results found.
  </div>
  <div
    v-for="item in results"
    :key="item.id || item.name"
    class="mb-2 p-2 border rounded"
  >
    <a
      :href="item.url"
      target="_blank"
      class="text-blue-600 font-medium"
    >
      {{ item.name }}
    </a>
    <p v-if="item.brand" class="text-sm text-gray-600">
      {{ item.brand }}
    </p>

    <p class="text-xs text-gray-400">
      Source: {{ item.source }}
    </p>
  </div>
</template>
