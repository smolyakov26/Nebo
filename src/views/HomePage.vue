<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import FormatsSection from '@/components/FormatsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactsSection from '@/components/ContactsSection.vue'
import Footer from '@/components/Footer.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Gift, Heart } from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { useCertificateModal } from '@/composables/useCertificateModal'
import { homeCtaContent, certificateContent } from '@/content'
import { useSeoMeta, useHead } from '@unhead/vue'
import { useSchemaOrg } from '@/composables/useSchemaOrg'

const { openModal } = useBookingModal()
const { openModal: openCertModal } = useCertificateModal()
const { badge, title, titleAccent, primaryCta } = homeCtaContent
const { badge: certBadge, title: certTitle, description: certDescription, cta } = certificateContent

useSeoMeta({
  title: 'Прыжки с парашютом Ессентуки 2026 — цены от 17 000 ₽ | НЕБО КАВКАЗА',
  description:
    'Прыжки с парашютом в Ессентуках от крупнейшей дропзоны Кавказа. Тандем прыжки 3000м — 17 000 ₽, соло от 7 500 ₽. Аэродром Ессентуки, Ставропольский край.',
  ogTitle: 'Прыжки с парашютом Ессентуки 2026 — цены',
  ogDescription:
    'Тандем прыжки 17 000 ₽, соло от 7 500 ₽. Обучение парашютизму, спортивные прыжки. Аэродром в Ессентуках.',
  ogImage: '/images/og-image.svg',
  ogUrl: 'https://nebo-kavkaz.ru',
  ogType: 'website',
  ogLocale: 'ru_RU',
  robots: 'index, follow',
})

const { addLocalBusiness } = useSchemaOrg()
addLocalBusiness()

useHead({
  link: [{ rel: 'canonical', href: 'https://nebo-kavkaz.ru' }],
})
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <QuoteSection />
      <FormatsSection />

      <section
        class="py-24 bg-gradient-to-r from-rose-600 to-pink-600 text-white relative overflow-hidden"
      >
        <div class="absolute inset-0 opacity-10">
          <picture>
            <source srcset="/images-optimized/gift.webp" type="image/webp" />
            <img
              src="/images-optimized/gift.jpg"
              alt=""
              class="w-full h-full object-cover"
              loading="lazy"
              @error="($event.target as HTMLImageElement).style.display = 'none'"
            />
          </picture>
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                class="text-[11px] font-black uppercase tracking-[0.4em] mb-4 block text-rose-200"
              >
                {{ certBadge }}
              </span>
              <h2 class="text-4xl md:text-6xl font-black uppercase italic mb-6 leading-none">
                {{ certTitle }}
              </h2>
              <p class="text-lg text-rose-100 mb-8 leading-relaxed">
                {{ certDescription }}
              </p>
              <BaseButton color="sky" size="lg" @click="openCertModal('17000')">
                <Gift class="w-5 h-5" />
                {{ cta.primary }}
              </BaseButton>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div class="text-4xl font-black mb-2">17 000 ₽</div>
                <div class="text-sm text-rose-200">Тандем прыжок</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div class="text-4xl font-black mb-2">7 500 ₽</div>
                <div class="text-sm text-rose-200">Самостоятельный</div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col items-center justify-center col-span-2"
              >
                <Heart class="w-8 h-8 mb-2" />
                <div class="text-sm text-rose-200">Идеальный подарок</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />
      <AboutSection />
      <ContactsSection />

      <section class="py-48 bg-sky-600 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-0 left-0 w-full h-full bg-grid" />
        </div>
        <div class="max-w-4xl mx-auto px-6 relative z-10">
          <span
            class="text-[11px] font-black uppercase tracking-[0.5em] mb-12 block text-sky-200"
            >{{ badge }}</span
          >
          <h2
            class="text-6xl md:text-[10rem] font-black leading-[0.8] mb-16 uppercase italic tracking-tighter"
          >
            {{ title }} <br />
            {{ titleAccent }}
          </h2>
          <div class="flex flex-col sm:flex-row justify-center gap-8">
            <BaseButton color="sky" size="lg" @click="openModal('tandem')">
              {{ primaryCta }}
            </BaseButton>
            <BaseButton variant="outline" size="lg" @click="openModal('callback')">
              Обратный звонок
            </BaseButton>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
