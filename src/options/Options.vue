<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
</script>

<template>
  <main class="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-6 py-16">
      <header class="flex flex-col md:flex-row items-center gap-8 mb-16 text-center md:text-left">
        <Logo class="w-20 h-20 shadow-2xl rounded-3xl p-3 bg-green-50 dark:bg-green-900/20 transform hover:scale-110 transition-transform duration-500" />
        <div>
          <h1 class="text-5xl font-black text-green-800 dark:text-green-500 tracking-tight leading-tight">
            EcoCart Settings
          </h1>
          <p class="text-gray-500 dark:text-gray-400 font-bold text-lg uppercase tracking-widest opacity-80">
            Personalize your sustainable footprint
          </p>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Search Settings -->
        <section class="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
          <div class="flex items-center gap-4 mb-8">
            <div class="p-3 bg-green-100 dark:bg-green-900/40 rounded-2xl group-hover:rotate-12 transition-transform">
              <pixelarticons-search class="text-green-700 dark:text-green-400 w-8 h-8" />
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Search Sources
            </h2>
          </div>

          <div class="space-y-8">
            <label class="group/item flex items-start justify-between cursor-pointer p-5 hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all border border-transparent hover:border-green-100 dark:hover:border-green-900/50 hover:shadow-sm">
              <div class="flex-1 pr-6">
                <p class="font-black text-lg text-gray-900 dark:text-gray-200 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors">Open Food Facts</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 font-medium leading-relaxed mt-1">Access global sustainability rankings and ethical sourcing data</p>
              </div>
              <input type="checkbox" checked class="w-7 h-7 accent-green-600 rounded-lg cursor-pointer">
            </label>

            <label class="group/item flex items-start justify-between cursor-pointer p-5 hover:bg-white dark:hover:bg-gray-800 rounded-2xl transition-all border border-transparent hover:border-green-100 dark:hover:border-green-900/50 hover:shadow-sm">
              <div class="flex-1 pr-6">
                <p class="font-black text-lg text-gray-900 dark:text-gray-200 group-hover/item:text-green-700 dark:group-hover/item:text-green-400 transition-colors">Independent Index</p>
                <p class="text-sm text-gray-400 dark:text-gray-500 font-medium leading-relaxed mt-1">Support local businesses and reduce transport emissions</p>
              </div>
              <input type="checkbox" checked class="w-7 h-7 accent-green-600 rounded-lg cursor-pointer">
            </label>
          </div>
        </section>

        <!-- User Preferences -->
        <section class="bg-white dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col justify-center">
          <h2 class="text-2xl font-black mb-4 text-gray-900 dark:text-white uppercase tracking-tighter">
            User Metadata
          </h2>
          <p class="text-sm text-gray-400 dark:text-gray-500 font-medium mb-8 leading-relaxed max-w-[280px]">
            Personalize how the extension identifies your shopping priorities.
          </p>

          <div class="space-y-6">
            <div>
              <label class="block text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase mb-3 tracking-[0.2em]">Sustainability Tagline</label>
              <input
                v-model="storageDemo"
                placeholder="e.g. Shopping for a greener future"
                class="w-full p-4 border border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/20 focus:border-green-500 focus:outline-none bg-gray-50 dark:bg-gray-800 transition-all font-bold text-gray-700 dark:text-gray-300"
              >
            </div>

            <button class="w-full py-5 bg-green-700 hover:bg-green-800 text-white font-black rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.15em] text-sm active:scale-95">
              Confirm Changes
            </button>
          </div>
        </section>
      </div>

      <footer class="mt-24 pt-10 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-gray-400 dark:text-gray-600 font-black text-xs uppercase tracking-widest">
          © 2026 EcoCart Local v1.0.0
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-gray-400 dark:text-gray-600 hover:text-green-600 transition-colors uppercase font-black text-[10px] tracking-widest">Docs</a>
          <a href="#" class="text-gray-400 dark:text-gray-600 hover:text-green-600 transition-colors uppercase font-black text-[10px] tracking-widest">Privacy</a>
          <div class="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/10 rounded-full border border-yellow-100 dark:border-yellow-900/30">
            <pixelarticons-zap class="text-yellow-600 dark:text-yellow-400 w-4 h-4" />
            <span class="text-yellow-700 dark:text-yellow-500 font-black text-[9px] uppercase tracking-wider">Powered by Vite</span>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>
