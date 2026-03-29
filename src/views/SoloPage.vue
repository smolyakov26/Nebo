<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { RouterLink } from 'vue-router'
import { Ruler, Wind, Compass, CircleDot, CheckCircle, Target } from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { PHONE } from '@/constants'
import { soloContent } from '@/content'

const { openModal } = useBookingModal()
const {
  badge,
  title,
  titleAccent,
  description,
  price,
  priceNote,
  programSteps,
  features,
  requirements,
  cta,
  ctaSection,
} = soloContent

const iconMap = { Ruler, Wind, Compass, CircleDot, CheckCircle, Target }

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (sectionRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(sectionRef.value)
    return () => observer.disconnect()
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />

    <main>
      <section ref="sectionRef" class="pt-40 pb-24 relative overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-30">
          <img
            src="/images/home/solo_main.jpg"
            alt="Соло прыжок"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"
          />
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="max-w-4xl">
            <span
              class="text-sky-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block"
              >{{ badge }}</span
            >
            <h1
              :class="[
                'text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 uppercase italic leading-none',
                isVisible ? 'animate-slide-up' : 'opacity-0',
              ]"
            >
              {{ title }} <br />
              <span class="text-sky-500">{{ titleAccent }}</span>
            </h1>
            <p class="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
              {{ description }}
            </p>
            <div class="text-4xl font-black text-white mb-2">{{ price }}</div>
            <p class="text-slate-400 text-sm mb-8">{{ priceNote }}</p>

            <button
              @click="openModal('solo')"
              class="inline-block bg-sky-600 hover:bg-sky-500 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all skew-x-[-10deg] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span class="inline-block skew-x-[10deg]">{{ cta.primary }}</span>
            </button>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-900">
        <div class="max-w-7xl mx-auto px-6">
          <h2
            class="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-16 uppercase italic text-center"
          >
            ПРОГРАММА <span class="text-slate-600">ПРЫЖКА</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="(item, idx) in programSteps"
              :key="idx"
              class="relative p-8 bg-slate-800/50 border border-white/5 hover:border-sky-500/30 transition-colors"
            >
              <div class="text-5xl font-black text-sky-500/20 mb-4">{{ item.step }}</div>
              <h3 class="text-xl font-bold text-white uppercase mb-3">{{ item.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-950">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div
              v-for="(feature, idx) in features"
              :key="idx"
              class="text-center p-6 sm:p-8 bg-slate-900/50 border border-white/5 hover:border-sky-500/30 transition-colors"
            >
              <component
                :is="iconMap[feature.icon as keyof typeof iconMap]"
                class="w-8 h-8 sm:w-10 sm:h-10 text-sky-500 mx-auto mb-3 sm:mb-4"
              />
              <div
                class="text-2xl sm:text-3xl font-black text-white mb-1 h-12 flex items-center justify-center"
              >
                {{ feature.title }}
              </div>
              <div
                class="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest"
              >
                {{ feature.subtitle }}
              </div>
            </div>
          </div>

          <div class="bg-slate-900/50 border border-white/5 p-8 sm:p-12">
            <h2 class="text-3xl sm:text-4xl font-black text-white mb-8 uppercase italic">
              ТРЕБОВАНИЯ К УЧАСТНИКУ
            </h2>
            <ul class="space-y-4 mb-8">
              <li
                v-for="(req, idx) in requirements"
                :key="idx"
                class="flex items-start gap-4 text-slate-300"
              >
                <CheckCircle class="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                {{ req }}
              </li>
            </ul>
            <div class="p-6 bg-sky-600/20 border border-sky-500/30 text-center">
              <RouterLink
                to="/training"
                class="inline-block bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                Хотите продолжить обучение?
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-center">
        <div class="max-w-4xl mx-auto px-6">
          <h2 class="text-4xl md:text-6xl font-black mb-8 uppercase italic">
            {{ ctaSection.title }}
          </h2>
          <p class="text-lg mb-12 opacity-90">
            {{ ctaSection.description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <button
              @click="openModal('solo')"
              class="bg-white text-slate-900 px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all skew-x-[-10deg] cursor-pointer inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
            >
              <span class="inline-block skew-x-[10deg]">{{ cta.primary }}</span>
            </button>
            <a
              :href="PHONE.link"
              class="border-2 border-white px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-sky-600 transition-all skew-x-[-10deg] cursor-pointer inline-block"
            >
              <span class="inline-block skew-x-[10deg]">{{ cta.secondary }}</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-up {
    animation: none;
    opacity: 1;
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
