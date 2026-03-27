<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Shield, Users, Plane, Award } from 'lucide-vue-next'
import { aboutContent } from '@/content/sections/about'

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const iconMap: Record<string, typeof Award> = {
  Users,
  Shield,
  Award,
  Plane
}

onMounted(() => {
  if (sectionRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <section id="about" ref="sectionRef" class="py-32 bg-slate-950 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div
          :class="[
            'relative',
            isVisible ? 'animate-slide-in-left' : 'opacity-0'
          ]"
        >
          <div class="relative">
            <img
              :src="aboutContent.image"
              :alt="aboutContent.imageAlt"
              class="w-full rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div class="absolute -bottom-8 -right-8 bg-sky-600 text-white p-8 rounded-2xl shadow-xl">
              <div class="text-5xl font-black mb-1">{{ aboutContent.yearsExperience }}</div>
              <div class="text-[11px] font-bold uppercase tracking-widest">{{ aboutContent.yearsLabel }}</div>
            </div>
          </div>
        </div>

        <div
          :class="[
            'space-y-8',
            isVisible ? 'animate-slide-in-right' : 'opacity-0'
          ]"
        >
          <div>
            <span class="text-sky-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block"
              >{{ aboutContent.badge }}</span
            >
            <h2
              class="text-5xl md:text-6xl font-black text-white mb-6 uppercase italic leading-none"
            >
              {{ aboutContent.title }} <br />
              <span class="text-slate-600">{{ aboutContent.titleAccent }}</span>
            </h2>
          </div>

          <p class="text-slate-300 text-lg leading-relaxed">
            {{ aboutContent.description }}
          </p>

          <p class="text-slate-400 leading-relaxed">
            {{ aboutContent.descriptionExtended }}
          </p>

          <div class="grid grid-cols-2 gap-6 pt-4">
            <div
              v-for="(stat, idx) in aboutContent.stats"
              :key="idx"
              class="bg-slate-900/50 border border-white/10 rounded-xl p-6"
            >
              <component :is="iconMap[stat.icon]" class="w-6 h-6 text-sky-500 mb-3" />
              <div class="text-2xl font-black text-white mb-1">{{ stat.value }}</div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {{ stat.label }}
              </div>
            </div>
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
