<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { Gift, Calendar, Sparkles, RefreshCw, CheckCircle, Heart } from 'lucide-vue-next'
import { useCertificateModal } from '@/composables/useCertificateModal'
import { PHONE } from '@/constants'
import { certificateContent } from '@/content'

const { openModal } = useCertificateModal()
const {
  badge,
  title,
  titleAccent,
  description,
  priceNote,
  denominations,
  features,
  howItWorks,
  cta,
  ctaSection,
} = certificateContent

const iconMap = { Gift, Calendar, Sparkles, RefreshCw, CheckCircle }

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
            src="https://picsum.photos/seed/certificate-hero/1920/1080"
            alt="Подарочный сертификат"
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"
          />
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="max-w-4xl">
            <span
              class="text-rose-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block"
              >{{ badge }}</span
            >
            <h1
              :class="[
                'text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 uppercase italic leading-none',
                isVisible ? 'animate-slide-up' : 'opacity-0',
              ]"
            >
              {{ title }} <br />
              <span class="text-rose-500">{{ titleAccent }}</span>
            </h1>
            <p class="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl">
              {{ description }}
            </p>

            <button
              @click="openModal('18000')"
              class="inline-block bg-rose-600 hover:bg-rose-500 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all skew-x-[-10deg] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
            {{ priceNote }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <button
              v-for="(denom, idx) in denominations"
              :key="idx"
              @click="openModal(denom.value)"
              class="text-center p-8 bg-slate-800/50 border border-white/5 hover:border-rose-500/30 hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <div class="text-3xl md:text-4xl font-black text-rose-500 mb-2">
                {{ denom.amount }}
              </div>
              <div class="text-sm text-slate-400">{{ denom.description }}</div>
            </button>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-950">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-16 uppercase italic text-center">
            ПРЕИМУЩЕСТВА
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div
              v-for="(feature, idx) in features"
              :key="idx"
              class="text-center p-8 bg-slate-900/50 border border-white/5 hover:border-rose-500/30 transition-colors"
            >
              <component
                :is="iconMap[feature.icon as keyof typeof iconMap]"
                class="w-12 h-12 text-rose-500 mx-auto mb-6"
              />
              <h3 class="text-lg font-bold text-white uppercase mb-3">{{ feature.title }}</h3>
              <p class="text-slate-400 text-sm">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-900">
        <div class="max-w-7xl mx-auto px-6">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-16 uppercase italic text-center">
            КАК ЭТО <span class="text-rose-500">РАБОТАЕТ</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="(step, idx) in howItWorks"
              :key="idx"
              class="relative p-8 bg-slate-800/50 border border-white/5"
            >
              <div class="text-6xl font-black text-rose-500/20 mb-4">{{ step.step }}</div>
              <h3 class="text-xl font-bold text-white uppercase mb-3">{{ step.title }}</h3>
              <p class="text-slate-400 text-sm leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-slate-950">
        <div class="max-w-3xl mx-auto px-6 text-center">
          <div class="flex items-center justify-center gap-4 mb-8">
            <Heart class="w-8 h-8 text-rose-500" />
            <span class="text-2xl font-bold text-white">Отличный подарок</span>
          </div>
          <p class="text-slate-300 text-lg leading-relaxed mb-8">
            Прыжок с парашютом — это незабываемый опыт, который останется в памяти навсегда.
            Подарите близкому человеку возможность испытать настоящий полёт!
          </p>
        </div>
      </section>

      <section class="py-24 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-center">
        <div class="max-w-4xl mx-auto px-6">
          <h2 class="text-4xl md:text-6xl font-black mb-8 uppercase italic">
            {{ ctaSection.title }}
          </h2>
          <p class="text-lg mb-12 opacity-90">
            {{ ctaSection.description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <button
              @click="openModal('18000')"
              class="bg-white text-slate-900 px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all skew-x-[-10deg] cursor-pointer inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rose-600"
            >
              <span class="inline-block skew-x-[10deg]">{{ cta.primary }}</span>
            </button>
            <a
              :href="PHONE.link"
              class="border-2 border-white px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-rose-600 transition-all skew-x-[-10deg] cursor-pointer inline-block"
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
