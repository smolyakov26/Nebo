<script setup lang="ts">
import { Shield, Users, Plane, Award } from 'lucide-vue-next'
import SectionHeader from './SectionHeader.vue'
import StatCard from './StatCard.vue'
import GridBackground from './GridBackground.vue'
import { aboutContent } from '@/content'
import { useScrollAnimation } from '@/composables/useScrollAnimation'
import { useImageTransform } from '@/composables/useImageTransform'

const { isVisible, elementRef } = useScrollAnimation()
const { getImageWebp, getImageJpeg } = useImageTransform()

const iconMap: Record<string, typeof Award> = {
  Users: Users,
  Shield: Shield,
  Award: Award,
  Plane: Plane,
}

const aboutImageWebp = getImageWebp(aboutContent.image)
const aboutImageJpeg = getImageJpeg(aboutContent.image)
</script>

<template>
  <section id="about" ref="elementRef" class="py-32 bg-slate-950 relative overflow-hidden">
    <GridBackground color="sky" />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div :class="['relative', isVisible ? 'animate-slide-in-left' : 'opacity-0']">
          <div class="relative">
            <picture>
              <source :srcset="aboutImageWebp" type="image/webp" />
              <img
                :src="aboutImageJpeg"
                :alt="aboutContent.imageAlt"
                class="w-full rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </picture>
            <div
              class="absolute -bottom-8 -right-8 bg-sky-600 text-white p-8 rounded-2xl shadow-xl"
            >
              <div class="text-5xl font-black mb-1">{{ aboutContent.yearsExperience }}</div>
              <div class="text-[11px] font-bold uppercase tracking-widest">
                {{ aboutContent.yearsLabel }}
              </div>
            </div>
          </div>
        </div>

        <div :class="['space-y-8', isVisible ? 'animate-slide-in-right' : 'opacity-0']">
          <SectionHeader
            :badge="aboutContent.badge"
            :title="`${aboutContent.title} ${aboutContent.titleAccent}`"
            :subtitle="undefined"
          />

          <p class="text-slate-300 text-lg leading-relaxed">
            {{ aboutContent.description }}
          </p>

          <p class="text-slate-400 leading-relaxed">
            {{ aboutContent.descriptionExtended }}
          </p>

          <div class="grid grid-cols-2 gap-6 pt-4">
            <StatCard
              v-for="(stat, idx) in aboutContent.stats"
              :key="idx"
              :icon="iconMap[stat.icon]!"
              :value="stat.value"
              :label="stat.label"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-left,
  .animate-slide-in-right {
    animation: none;
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
