<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
</script>

<template>
  <main class="max-w-2xl mx-auto px-6 py-12 text-gray-800">
    <div class="flex items-center gap-4 mb-8">
      <Logo class="w-12 h-12" />
      <div>
        <h1 class="text-3xl font-bold text-green-700">
          EcoCart Local Configuration
        </h1>
        <p class="text-gray-500">
          Customize how you find sustainable alternatives
        </p>
      </div>
    </div>

    <div class="space-y-8">
      <!-- Search Settings -->
      <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
          <pixelarticons-search class="text-green-600" />
          Search Preferences
        </h2>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">
                Enable Open Food Facts API
              </p>
              <p class="text-sm text-gray-500">
                Search global product database for alternatives
              </p>
            </div>
            <input type="checkbox" checked class="w-5 h-5 accent-green-600">
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">
                Prioritize Canadian Independent Stores
              </p>
              <p class="text-sm text-gray-500">
                Highlight local "Maple Leaf" certified business
              </p>
            </div>
            <input type="checkbox" checked class="w-5 h-5 accent-green-600">
          </div>
        </div>
      </section>

      <!-- Storage Demo (Cleanup) -->
      <section class="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 class="text-lg font-semibold mb-2">
          User Note
        </h2>
        <p class="text-sm text-gray-600 mb-4">
          Add a personal reminder or shopping list note.
        </p>
        <input
          v-model="storageDemo"
          placeholder="e.g. Remember to bring reusable bags"
          class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
      </section>
    </div>

    <footer class="mt-12 text-center text-gray-400 text-sm">
      <p>EcoCart Local v0.0.1 • Powered by Vite & Vue</p>
    </footer>
  </main>
</template>
