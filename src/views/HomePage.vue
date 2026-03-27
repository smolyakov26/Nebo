<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import FormatsSection from '@/components/FormatsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactsSection from '@/components/ContactsSection.vue'
import Footer from '@/components/Footer.vue'
import { FORMATS } from '@/data/formats'
import { useBookingModal } from '@/composables/useBookingModal'
import { homeCtaContent } from '@/content'

const { openModal } = useBookingModal()
const { badge, title, titleAccent, primaryCta, secondaryCta } = homeCtaContent
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />
    <main>
      <Hero />
      <QuoteSection />
      <FormatsSection :formats="FORMATS" />
      <ExperienceSection />
      <AboutSection />
      <ContactsSection />

      <section class="py-48 bg-sky-600 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-0 left-0 w-full h-full bg-grid" />
        </div>
        <div class="max-w-4xl mx-auto px-6 relative z-10">
          <span class="text-[11px] font-black uppercase tracking-[0.5em] mb-12 block text-sky-200"
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
              href="tel:+79991234567"
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
