<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { Award, ShieldCheck, Plane, Users, Clock, CheckCircle } from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { PHONE } from '@/constants'
import { trainingContent } from '@/content'
import { useSeoMeta, useHead } from '@unhead/vue'
import { useSchemaOrg } from '@/composables/useSchemaOrg'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { openModal } = useBookingModal()
const {
  badge,
  title,
  titleAccent,
  description,
  price,
  priceNote,
  features,
  programSteps,
  requirements,
  included,
  cta,
  ctaSection,
} = trainingContent

useSeoMeta({
  title: 'Обучение парашютному спорту — от 30 000 ₽ | НЕБО КАВКАЗА',
  description:
    'Программа ДОСААФ №2 — базовая подготовка парашютиста. 10 часов теории, практические прыжки с круглым парашютом и системой «Крыло». Группы до 6 человек.',
  ogTitle: 'Обучение парашютному спорту — от 30 000 ₽',
  ogDescription: 'Программа ДОСААФ №2. 10 часов теории + практические прыжки. Группы до 6 человек.',
  ogImage: '/images/og-image.svg',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://nebo-kavkaz.ru/training' }],
})

const { addBreadcrumb, addService } = useSchemaOrg()
addBreadcrumb([
  { name: 'Главная', url: 'https://nebo-kavkaz.ru' },
  { name: 'Обучение', url: 'https://nebo-kavkaz.ru/training' },
])
addService({
  name: 'Обучение парашютному спорту',
  description:
    'Программа ДОСААФ №2 — базовая подготовка парашютиста. 10 часов теории + практические прыжки.',
  price: '30000',
})

const trainingImageWebp = computed(() => {
  return trainingContent.image.replace('/images/', '/images-optimized/').replace('.jpg', '.webp')
})

const trainingImageJpeg = computed(() => {
  return trainingContent.image.replace('/images/', '/images-optimized/')
})

const iconMap = { Award, ShieldCheck, Plane, Users, Clock, CheckCircle }
const { isVisible, elementRef } = useScrollAnimation()
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />

    <main>
      <section ref="elementRef" class="pt-40 pb-24 relative overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-30">
          <picture>
            <source :srcset="trainingImageWebp" type="image/webp" />
            <img
              :src="trainingImageJpeg"
              alt="Обучение прыжкам с парашютом"
              class="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </picture>
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
              @click="openModal('training')"
              class="inline-block bg-sky-600 hover:bg-sky-500 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {{ cta.primary }}
            </button>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-900">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div
              v-for="(feature, idx) in features"
              :key="idx"
              class="text-center p-8 bg-slate-800/50 border border-white/5 hover:border-sky-500/30 transition-colors"
            >
              <component
                :is="iconMap[feature.icon as keyof typeof iconMap]"
                class="w-10 h-10 text-sky-500 mx-auto mb-4"
              />
              <div class="text-3xl font-black text-white mb-1">{{ feature.title }}</div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {{ feature.subtitle }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-950">
        <div class="max-w-7xl mx-auto px-6">
          <h2
            class="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-16 uppercase italic text-center"
          >
            ПРОГРАММА <span class="text-slate-600">ОБУЧЕНИЯ</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="(item, idx) in programSteps"
              :key="idx"
              class="relative p-8 bg-slate-900/50 border border-white/5 hover:border-sky-500/30 transition-colors"
            >
              <div class="text-6xl font-black text-sky-500/20 mb-4">{{ item.step }}</div>
              <h3 class="text-xl font-bold text-white uppercase mb-3">{{ item.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">{{ item.description }}</p>
              <div
                class="flex items-center gap-2 text-sky-500 text-xs font-bold uppercase tracking-wider"
              >
                <Clock class="w-4 h-4" />
                {{ item.duration }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-900">
        <div class="max-w-7xl mx-auto px-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 class="text-4xl md:text-5xl font-black text-white mb-8 uppercase italic">
                ТРЕБОВАНИЯ <br />
                <span class="text-slate-600">К КУРСАНТАМ</span>
              </h2>
              <ul class="space-y-4">
                <li
                  v-for="(req, idx) in requirements"
                  :key="idx"
                  class="flex items-start gap-4 text-slate-300"
                >
                  <CheckCircle class="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  {{ req }}
                </li>
              </ul>
            </div>

            <div class="space-y-8">
              <div class="p-8 bg-green-500/10 border border-green-500/30">
                <h3 class="text-xl font-bold text-white uppercase mb-6 flex items-center gap-3">
                  <CheckCircle class="w-6 h-6 text-green-500" />
                  Включено в стоимость
                </h3>
                <ul class="space-y-3">
                  <li
                    v-for="(item, idx) in included"
                    :key="idx"
                    class="flex items-start gap-3 text-slate-300 text-sm"
                  >
                    <CheckCircle class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="p-6 bg-sky-600/20 border border-sky-500/30">
                <p class="text-slate-300 text-sm mb-4">
                  Хотите сначала попробовать ознакомительный прыжок?
                </p>
                <RouterLink
                  to="/solo"
                  class="inline-block bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all rounded-full cursor-pointer"
                >
                  Ознакомительный прыжок →
                </RouterLink>
              </div>
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
              @click="openModal('training')"
              class="bg-white text-slate-900 px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all rounded-full cursor-pointer inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
            >
              {{ cta.primary }}
            </button>
            <a
              :href="PHONE.link"
              class="border-2 border-white px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-sky-600 transition-all rounded-full cursor-pointer inline-block"
            >
              {{ cta.secondary }}
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
