<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import GallerySection from '@/components/GallerySection.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />

    <main>
      <section class="pt-32 pb-16 relative overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-30">
          <img src="/images/gallery.jpg" alt="Галерея" class="w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"
          />
        </div>

        <div class="max-w-7xl mx-auto px-6 relative z-10">
          <h1 class="text-5xl md:text-7xl font-black text-white uppercase italic">Галерея</h1>
        </div>
      </section>

      <GallerySection />

      <section class="py-24 bg-slate-900">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic">
            ХОТИТЕ ТАКЖЕ?
          </h2>
          <p class="text-slate-300 text-lg mb-8">
            Запишитесь на прыжок или полёт и создайте свои собственные воспоминания
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/tandem"
              class="bg-sky-600 hover:bg-sky-500 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all skew-x-[-10deg] inline-block cursor-pointer"
            >
              <span class="inline-block skew-x-[10deg]">Тандем-прыжок</span>
            </a>
            <a
              href="/training"
              class="border-2 border-white hover:bg-white hover:text-slate-900 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all skew-x-[-10deg] inline-block cursor-pointer"
            >
              <span class="inline-block skew-x-[10deg]">Обучение</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
