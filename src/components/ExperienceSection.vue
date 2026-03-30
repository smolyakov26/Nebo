<script setup lang="ts">
import { Award, ShieldCheck, ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import SectionHeader from './SectionHeader.vue'
import InfoCard from './InfoCard.vue'
import { experienceContent } from '@/content'
import { useImageTransform } from '@/composables/useImageTransform'

const { getImageWebp, getImageJpeg } = useImageTransform()

const iconMap: Record<string, typeof Award> = {
  Award: Award,
  ShieldCheck: ShieldCheck,
}

const experienceImageWebp = getImageWebp(experienceContent.image)
const experienceImageJpeg = getImageJpeg(experienceContent.image)
</script>

<template>
  <section id="experience" class="py-16 sm:py-24 md:py-32 bg-slate-900 relative">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">
        <div class="lg:col-span-6">
          <SectionHeader
            :badge="experienceContent.badge"
            :title="experienceContent.title"
            :subtitle="experienceContent.subtitle"
          />

          <div class="space-y-4 sm:space-y-6 md:space-y-8">
            <InfoCard
              v-for="(feature, idx) in experienceContent.features"
              :key="idx"
              :icon="iconMap[feature.icon]!"
              :title="feature.title"
              :description="feature.description"
            />
          </div>
          <div class="text-center md:text-left mt-8 sm:mt-10 md:mt-12">
            <RouterLink
              to="/training"
              class="group flex items-center justify-center md:justify-start gap-4 text-white cursor-pointer inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
            >
              <span
                class="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-sky-500 pb-1 group-hover:border-white transition-colors"
                >{{ experienceContent.cta }}</span
              >
              <ArrowRight
                class="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-2 transition-transform text-sky-500"
              />
            </RouterLink>
          </div>
        </div>

        <div class="lg:col-span-6 relative lg:pl-16 hidden md:block">
          <div class="relative aspect-square">
            <div class="absolute inset-0 border-2 border-sky-500/20 translate-x-4 translate-y-4" />
            <picture>
              <source :srcset="experienceImageWebp" type="image/webp" />
              <img
                :src="experienceImageJpeg"
                alt="Обучение прыжкам с парашютом"
                class="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </picture>
            <div
              class="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-orange-600 p-6 sm:p-8 z-20 skew-x-[-10deg] shadow-xl"
            >
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
