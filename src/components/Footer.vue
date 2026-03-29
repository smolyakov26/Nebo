<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Zap, MapPin } from 'lucide-vue-next'
import { footerContent } from '@/content/sections/footer'
</script>

<template>
  <footer class="py-12 sm:py-16 md:py-24 bg-slate-950 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-12 sm:mb-16">
        <a
          href="/"
          class="text-2xl font-black tracking-tighter text-white mb-4 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Zap class="w-6 h-6 fill-sky-500 text-sky-500" />
          {{ footerContent.logo }}
        </a>
        <p class="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          {{ footerContent.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 sm:mb-16">
        <div class="flex flex-col items-center h-full">
          <h4 class="text-[11px] font-bold uppercase tracking-[0.3em] text-sky-500 mb-4 sm:mb-6">
            Навигация
          </h4>
          <ul class="space-y-2 sm:space-y-4 text-sm text-slate-400">
            <li v-for="(item, idx) in footerContent.navigation" :key="idx">
              <a
                v-if="item.href.startsWith('#')"
                :href="item.href"
                class="hover:text-white transition-colors cursor-pointer"
                >{{ item.label }}</a
              >
              <RouterLink
                v-else
                :to="item.href"
                class="hover:text-white transition-colors cursor-pointer"
                >{{ item.label }}</RouterLink
              >
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center h-full">
          <h4 class="text-[11px] font-bold uppercase tracking-[0.3em] text-sky-500 mb-4 sm:mb-6">
            Контакты
          </h4>
          <ul class="space-y-2 sm:space-y-4 text-sm text-slate-400">
            <li class="flex items-center gap-2">
              <MapPin class="w-4 h-4 shrink-0" />
              {{ footerContent.contacts?.[0]?.value }}
            </li>
            <li>
              <a
                v-if="footerContent.contacts?.[1]"
                :href="footerContent.contacts[1].href"
                class="hover:text-white transition-colors cursor-pointer"
                >{{ footerContent.contacts[1].value }}</a
              >
            </li>
            <li>
              <a
                v-if="footerContent.contacts?.[2]"
                :href="footerContent.contacts[2].href"
                class="hover:text-white transition-colors cursor-pointer"
                >{{ footerContent.contacts[2].value }}</a
              >
            </li>
            <li v-if="footerContent.contacts?.[3]">{{ footerContent.contacts[3].value }}</li>
          </ul>
        </div>
      </div>

      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 pt-8 sm:pt-12 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500"
      >
        <p>{{ footerContent.copyright }}</p>
      </div>
    </div>
  </footer>
</template>
