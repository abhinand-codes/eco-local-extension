<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
</script>

<template>
  <main class="max-w-3xl mx-auto px-8 py-16 text-gray-800">
    <header class="flex items-center gap-6 mb-12">
      <Logo class="w-16 h-16 shadow-lg rounded-2xl p-2 bg-green-50" />
      <div>
        <h1 class="text-4xl font-black text-green-800 tracking-tight">
          EcoCart Configuration
        </h1>
        <p class="text-gray-500 font-medium text-lg">
          Personalize your sustainable shopping experience
        </p>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Search Settings -->
      <section class="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-green-100 rounded-lg">
            <pixelarticons-search class="text-green-700 w-6 h-6" />
          </div>
          <h2 class="text-xl font-bold text-gray-900 line-clamp-1">
            Search Engines
          </h2>
        </div>

        <div class="space-y-6">
          <label class="group flex items-center justify-between cursor-pointer p-4 hover:bg-green-50 rounded-xl transition-colors">
            <div class="flex-1 pr-4">
              <p class="font-bold text-gray-800 group-hover:text-green-800 transition-colors">Open Food Facts</p>
              <p class="text-sm text-gray-500 font-medium">Access global product sustainability data</p>
            </div>
            <input type="checkbox" checked class="w-6 h-6 accent-green-600 rounded-md">
          </label>

          <label class="group flex items-center justify-between cursor-pointer p-4 hover:bg-green-50 rounded-xl transition-colors">
            <div class="flex-1 pr-4">
              <p class="font-bold text-gray-800 group-hover:text-green-800 transition-colors">Canadian Independent Index</p>
              <p class="text-sm text-gray-500 font-medium">Prioritize local "Maple Leaf" certified shops</p>
            </div>
            <input type="checkbox" checked class="w-6 h-6 accent-green-600 rounded-md">
          </label>
        </div>
      </section>

      <!-- User Preferences -->
      <section class="bg-gray-50 p-8 rounded-2xl border border-dashed border-gray-300">
        <h2 class="text-xl font-bold mb-4 text-gray-800">
          User Profile
        </h2>
        <p class="text-sm text-gray-500 font-medium mb-6 leading-relaxed">
          Customize alerts and notes for your shopping trips.
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-black text-gray-400 uppercase mb-2 tracking-widest">Personal Shopping Note</label>
            <input
              v-model="storageDemo"
              placeholder="e.g. Remember to bring reusable bags"
              class="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:outline-none bg-white transition-all font-medium italic"
            >
          </div>

          <button class="w-full py-4 bg-green-700 text-white font-black rounded-xl hover:bg-green-800 shadow-lg hover:shadow-xl transition-all uppercase tracking-widest text-sm">
            Save Changes
          </button>
        </div>
      </section>
    </div>

    <footer class="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
      <p>© 2026 EcoCart Local v0.0.1</p>
      <p class="flex items-center gap-1">
        Built with <pixelarticons-zap class="text-yellow-500" /> & Sustainable Intent
      </p>
    </footer>
  </main>
</template>
