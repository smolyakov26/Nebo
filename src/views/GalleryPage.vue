<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import GallerySection from '@/components/GallerySection.vue'
import { useSeoMeta, useHead } from '@unhead/vue'
import { useSchemaOrg } from '@/composables/useSchemaOrg'

useSeoMeta({
  title: 'Фото и видео прыжков с парашютом — НЕБО КАВКАЗА',
  description:
    'Галерея тандем, соло и спортивных прыжков нашего аэроклуба. Лучшие моменты свободного падения.',
  ogTitle: 'Фото и видео прыжков с парашютом — НЕБО КАВКАЗА',
  ogDescription: 'Галерея лучших моментов из жизни аэроклуба НЕБО КАВКАЗА.',
  ogImage: '/images/og-image.svg',
})

useHead({
  link: [{ rel: 'canonical', href: 'https://nebo-kavkaz.ru/gallery' }],
})

const { addBreadcrumb } = useSchemaOrg()
addBreadcrumb([
  { name: 'Главная', url: 'https://nebo-kavkaz.ru' },
  { name: 'Галерея', url: 'https://nebo-kavkaz.ru/gallery' },
])
</script>

<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />

    <main>
      <section class="pt-32 pb-16 relative overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-30">
          <picture>
            <source srcset="/images-optimized/gallery.webp" type="image/webp" />
            <img
              src="/images-optimized/gallery.jpg"
              alt="Галерея"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>
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
              class="bg-sky-600 hover:bg-sky-500 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full inline-block cursor-pointer"
            >
              Тандем-прыжок
            </a>
            <a
              href="/training"
              class="border-2 border-white hover:bg-white hover:text-slate-900 text-white px-12 py-5 text-[11px] font-black uppercase tracking-widest transition-all rounded-full inline-block cursor-pointer"
            >
              Обучение
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
