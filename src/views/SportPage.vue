<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import {
  IdCard,
  BookOpen,
  Shield,
  FileText,
  HeartPulse,
  Plane,
  Wind,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { PHONE } from '@/constants'
import { sportContent } from '@/content'

const { openModal } = useBookingModal()
const {
  badge,
  title,
  titleAccent,
  description,
  price,
  priceNote,
  altitudes,
  requiredDocuments,
  features,
  cta,
  ctaSection,
  additionalInfo,
} = sportContent

const iconMap = {
  IdCard,
  BookOpen,
  Shield,
  FileText,
  HeartPulse,
  Plane,
  Wind,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle2,
}

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
          <picture>
            <source srcset="/images-optimized/home/sport_main.webp" type="image/webp" />
            <img
              src="/images-optimized/home/sport_main.png"
              alt="Спорт прыжок"
              class="w-full h-full object-cover"
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
              class="text-emerald-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block"
              >{{ badge }}</span
            >
            <h1
              :class="[
                'text-4xl sm:text-5xl md:text-8xl font-black text-white mb-8 uppercase italic leading-none',
                isVisible ? 'animate-slide-up' : 'opacity-0',
              ]"
            >
              {{ title }} <br />
              <span class="text-emerald-500">{{ titleAccent }}</span>
            </h1>
            <p class="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
              {{ description }}
            </p>
            <div class="text-4xl font-black text-white mb-2">{{ price }}</div>
            <p class="text-slate-400 text-sm mb-2">{{ priceNote }}</p>
            <p class="text-emerald-400 text-sm font-medium">
              Высота: {{ altitudes.min }} - {{ altitudes.max }} {{ altitudes.unit }}
            </p>

            <button
              @click="openModal('sport')"
              class="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {{ cta.primary }}
            </button>
          </div>
        </div>
      </section>

      <section class="py-24 bg-slate-900">
        <div class="max-w-7xl mx-auto px-6">
          <h2
            class="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 uppercase italic text-center"
          >
            НЕОБХОДИМЫЕ ДОКУМЕНТЫ
          </h2>
          <p class="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
            Для совершения спортивных прыжков в нашем аэроклубе необходимо иметь следующие
            документы:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(doc, idx) in requiredDocuments"
              :key="idx"
              class="p-6 bg-slate-800/50 border border-white/5 hover:border-emerald-500/30 transition-colors relative"
            >
              <div
                class="absolute top-0 left-0 w-8 h-8 bg-emerald-600 text-white flex items-center justify-center text-sm font-bold"
              >
                {{ idx + 1 }}
              </div>
              <div class="flex items-start gap-4 pt-2">
                <div
                  class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0"
                >
                  <component
                    :is="iconMap[doc.icon as keyof typeof iconMap]"
                    class="w-6 h-6 text-emerald-500"
                  />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white mb-2">{{ doc.title }}</h3>
                  <p class="text-slate-400 text-sm mb-2">{{ doc.description }}</p>
                  <p v-if="doc.note" class="text-emerald-400 text-xs italic">{{ doc.note }}</p>
                </div>
              </div>
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
              class="text-center p-8 bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-colors"
            >
              <component
                :is="iconMap[feature.icon as keyof typeof iconMap]"
                class="w-10 h-10 text-emerald-500 mx-auto mb-4"
              />
              <div class="text-3xl font-black text-white mb-1">{{ feature.title }}</div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {{ feature.subtitle }}
              </div>
            </div>
          </div>

          <div class="bg-slate-900/50 border border-white/5 p-8 md:p-12">
            <div class="flex items-start gap-4 mb-8">
              <component :is="iconMap['AlertCircle']" class="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h2 class="text-3xl font-black text-white mb-4 uppercase italic">
                  {{ additionalInfo.title }}
                </h2>
                <ul class="space-y-3">
                  <li
                    v-for="(item, idx) in additionalInfo.items"
                    :key="idx"
                    class="flex items-start gap-3 text-slate-300"
                  >
                    <component
                      :is="iconMap['CheckCircle2']"
                      class="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                    />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
        <div class="max-w-4xl mx-auto px-6">
          <h2 class="text-4xl md:text-6xl font-black mb-8 uppercase italic">
            {{ ctaSection.title }}
          </h2>
          <p class="text-lg mb-12 opacity-90">
            {{ ctaSection.description }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <button
              @click="openModal('sport')"
              class="bg-white text-slate-900 px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all rounded-full cursor-pointer inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
            >
              {{ cta.primary }}
            </button>
            <a
              :href="PHONE.link"
              class="border-2 border-white px-12 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all rounded-full cursor-pointer inline-block"
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
