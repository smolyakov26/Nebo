<script setup lang="ts">
import { Award, ShieldCheck, ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { experienceContent } from '@/content/sections/experience'

const iconMap: Record<string, typeof Award> = {
  Award,
  ShieldCheck
}
</script>

<template>
  <section id="experience" class="py-16 sm:py-24 md:py-32 bg-slate-900 relative">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">
        <div class="lg:col-span-6">
          <div class="text-center md:text-left">
            <span class="text-sky-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 sm:mb-6 md:mb-8 block"
              >{{ experienceContent.badge }}</span
            >
            <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.9] mb-8 sm:mb-10 md:mb-12 uppercase italic">
              {{ experienceContent.title }} <br />
              <span class="text-slate-600">{{ experienceContent.subtitle }}</span> <br />
              {{ experienceContent.subtitleAccent }}
            </h2>
          </div>
          <div class="space-y-4 sm:space-y-6 md:space-y-8">
            <div
              v-for="(feature, idx) in experienceContent.features"
              :key="idx"
              tabindex="0"
              class="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-slate-800/50 border border-white/5 shadow-sm hover:border-sky-500/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
            >
              <div
                class="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0"
              >
                <component :is="iconMap[feature.icon]" class="w-5 sm:w-6 h-5 sm:h-6 text-sky-500" />
              </div>
              <div>
                <h4 class="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 uppercase">
                  {{ feature.title }}
                </h4>
                <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="text-center md:text-left mt-8 sm:mt-10 md:mt-12">
            <RouterLink to="/training" class="group flex items-center justify-center md:justify-start gap-4 text-white cursor-pointer inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded">
              <span
                class="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-sky-500 pb-1 group-hover:border-white transition-colors"
                >{{ experienceContent.cta }}</span
              >
              <ArrowRight class="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-2 transition-transform text-sky-500" />
            </RouterLink>
          </div>
        </div>

        <div class="lg:col-span-6 relative lg:pl-16 hidden md:block">
          <div class="relative aspect-square">
            <div class="absolute inset-0 border-2 border-sky-500/20 translate-x-4 translate-y-4" />
            <img
              src="https://picsum.photos/seed/training/800/800"
              alt="Обучение прыжкам с парашютом"
              class="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
              referrerPolicy="no-referrer"
            />
            <div class="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-orange-600 p-6 sm:p-8 z-20 skew-x-[-10deg] shadow-xl">
              <div class="skew-x-[10deg] text-center">
                <div class="text-3xl sm:text-4xl font-black text-white">100%</div>
                <div class="text-[10px] font-bold text-orange-200 uppercase tracking-widest">
                  Успешных курсантов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  img {
    transition: none;
  }
  
  .group:hover .group-hover\:translate-x-2 {
    transform: translateX(0);
  }
}
</style>
