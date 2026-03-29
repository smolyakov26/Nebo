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

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
        <div class="text-center sm:text-left">
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

        <div class="text-center sm:text-left">
          <h4 class="text-[11px] font-bold uppercase tracking-[0.3em] text-sky-500 mb-4 sm:mb-6">
            Контакты
          </h4>
          <ul class="space-y-2 sm:space-y-4 text-sm text-slate-400">
            <li class="flex items-center gap-2 justify-center sm:justify-start">
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

        <div class="text-center sm:text-left sm:col-span-2 md:col-span-2">
          <h4 class="text-[11px] font-bold uppercase tracking-[0.3em] text-sky-500 mb-4 sm:mb-6">
            Соцсети
          </h4>
          <div class="flex gap-4 justify-center sm:justify-start">
            <a
              v-for="social in footerContent.socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span class="text-xs font-bold">{{ social.name }}</span>
            </a>
          </div>
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
