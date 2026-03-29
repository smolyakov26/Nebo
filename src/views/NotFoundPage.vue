<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { Home } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />
    <main class="pt-40 pb-24">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="text-[12rem] sm:text-[16rem] font-black text-white/10 leading-none">404</h1>
        <div class="relative -mt-16 sm:-mt-24 mb-8">
          <h2 class="text-4xl sm:text-6xl font-black text-white uppercase italic mb-4">
            Страница не найдена
          </h2>
          <p class="text-slate-400 text-lg max-w-md mx-auto">
            Извините, такой страницы не существует. Возможно, она была удалена или вы ввели
            неправильный адрес.
          </p>
        </div>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white px-10 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full cursor-pointer"
        >
          <Home class="w-5 h-5" />
          На главную
        </RouterLink>
      </div>
    </main>
    <Footer />
  </div>
</template>
