<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionHeader from './SectionHeader.vue'
import GridBackground from './GridBackground.vue'
import BaseButton from './BaseButton.vue'
import { formatsContent } from '@/content'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useImageTransform } from '@/composables/useImageTransform'

const { openModal } = useBookingModal()
const { isVisible, elementRef } = useScrollAnimation()
const { getImageWebp, getImageJpeg } = useImageTransform()

import { useBookingModal } from '@/composables/useBookingModal'
</script>

<template>
  <section id="formats" ref="elementRef" class="py-32 bg-slate-950 relative overflow-hidden">
    <GridBackground color="sky" />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeader
        :badge="formatsContent.badge"
        :title="formatsContent.title"
        :subtitle="formatsContent.subtitle"
        :description="formatsContent.description"
      />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <article
          v-for="(format, idx) in formatsContent.formats"
          :key="format.id"
          :style="{ animationDelay: `${idx * 0.1}s` }"
          :class="[
            'group relative bg-slate-900/50 border border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer focus-within:ring-2 focus-within:ring-sky-500',
            isVisible ? 'animate-slide-up' : 'opacity-0',
          ]"
          tabindex="0"
          role="article"
        >
          <div class="aspect-[4/5] overflow-hidden relative">
            <picture>
              <source :srcset="getImageWebp(format.image)" type="image/webp" />
              <img
                :src="getImageJpeg(format.image)"
                :alt="format.title"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </picture>
            <div
              :class="`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent opacity-90`"
            />

            <div class="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
              <div :class="`w-8 sm:w-12 h-1 bg-gradient-to-r ${format.color} mb-3 sm:mb-4`" />
              <h3 class="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2 uppercase italic">
                {{ format.title }}
              </h3>
              <p
                class="text-sky-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-3 sm:mb-4"
              >
                {{ format.subtitle }}
              </p>
              <p
                class="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                {{ format.description }}
              </p>

              <div class="flex justify-between items-center pt-4 sm:pt-6 border-t border-white/10">
                <div class="flex gap-3 sm:gap-6">
                  <div v-for="(stat, sIdx) in format.stats" :key="sIdx">
                    <div class="text-white font-black text-sm sm:text-lg">{{ stat.value }}</div>
                    <div class="text-[8px] sm:text-[9px] text-slate-400 uppercase font-bold">
                      {{ stat.label }}
                    </div>
                  </div>
                </div>
                <div class="text-white font-black text-sm sm:text-base">{{ format.price }}</div>
              </div>
            </div>
          </div>

          <div class="flex">
            <RouterLink
              :to="format.route"
              class="flex-1 bg-white text-slate-900 py-3 sm:py-4 text-[10px] sm:text-[11px] font-black uppercase tracking-widest md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center cursor-pointer"
            >
              ПОДРОБНЕЕ
            </RouterLink>
            <BaseButton
              @click="openModal(format.id)"
              color="sky"
              size="sm"
              class="flex-1 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500"
            >
              ЗАБРОНИРОВАТЬ
            </BaseButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
    opacity: 1;
  }

  article img {
    transition: none;
  }

  article p.text-slate-300 {
    opacity: 1;
  }

  article .translate-y-full {
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
