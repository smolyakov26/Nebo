<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import FormatsSection from '@/components/FormatsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactsSection from '@/components/ContactsSection.vue'
import Footer from '@/components/Footer.vue'
import { Gift, Heart } from 'lucide-vue-next'
import { PHONE } from '@/constants'
import { useBookingModal } from '@/composables/useBookingModal'
import { useCertificateModal } from '@/composables/useCertificateModal'
import { homeCtaContent, certificateContent } from '@/content'

const { openModal } = useBookingModal()
const { openModal: openCertModal } = useCertificateModal()
const { badge, title, titleAccent, primaryCta, secondaryCta } = homeCtaContent
const { badge: certBadge, title: certTitle, description: certDescription, cta } = certificateContent
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
          <img
            src="https://picsum.photos/seed/gift-sky/1920/600"
            alt=""
            class="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            @error="($event.target as HTMLImageElement).style.display = 'none'"
          />
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
              <button
                @click="openCertModal('18000')"
                class="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all skew-x-[-10deg] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-rose-600"
              >
                <Gift class="w-5 h-5" />
                <span class="inline-block skew-x-[10deg]">{{ cta.primary }}</span>
              </button>
            </div>
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div class="text-4xl font-black mb-2">18 000 ₽</div>
                <div class="text-sm text-rose-200">Тандем прыжок</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div class="text-4xl font-black mb-2">5 000 ₽</div>
                <div class="text-sm text-rose-200">Ознакомительный</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <div class="text-4xl font-black mb-2">75 000 ₽</div>
                <div class="text-sm text-rose-200">Курс обучения</div>
              </div>
              <div
                class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col items-center justify-center"
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
            <button
              @click="openModal('tandem')"
              class="bg-white text-slate-900 px-16 py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-slate-900 hover:text-white transition-all skew-x-[-10deg] shadow-xl inline-block cursor-pointer focus-visible:bg-slate-900 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-600"
            >
              <span class="inline-block skew-x-[10deg]">{{ primaryCta }}</span>
            </button>
            <a
              :href="PHONE.link"
              class="border-2 border-white px-16 py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-sky-600 transition-all skew-x-[-10deg] inline-block cursor-pointer focus-visible:bg-white focus-visible:text-sky-600"
            >
              <span class="inline-block skew-x-[10deg]">{{ secondaryCta }}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
