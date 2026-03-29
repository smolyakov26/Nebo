<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import { heroContent } from '@/content/sections/hero'

const scrollToFormats = () => {
  const element = document.getElementById('formats')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
    <div class="absolute inset-0 z-0 opacity-50" aria-hidden="true">
      <img
        src="https://picsum.photos/seed/skydiving-hero/1920/1080"
        alt=""
        class="w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <div class="animate-fade-in-up">
        <div
          class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          {{ heroContent.badge }}
        </div>
        <h1
          class="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter mb-12 uppercase italic"
        >
          {{ heroContent.title }} <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 animate-gradient"
            >{{ heroContent.titleAccent }}</span
          >
        </h1>

        <div class="flex flex-col md:flex-row items-center justify-center gap-8 mt-16">
          <p
            class="max-w-xs text-slate-300 text-sm leading-relaxed text-left border-l-2 border-sky-500 pl-6"
          >
            {{ heroContent.description }}
          </p>
          <div class="flex gap-4">
            <a
              href="#formats"
              @click.prevent="scrollToFormats"
              class="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 text-[11px] font-black uppercase tracking-widest transition-all skew-x-[-10deg] cursor-pointer inline-block focus-visible:bg-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span class="inline-block skew-x-[10deg]">{{ heroContent.primaryCta }}</span>
            </a>
            <button class="group flex items-center gap-4 text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-full">
              <div
                class="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-all"
                aria-hidden="true"
              >
                <Play class="w-5 h-5 fill-current" />
              </div>
              <span class="text-[11px] font-bold uppercase tracking-[0.2em]">{{ heroContent.secondaryCta }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute right-8 bottom-12 hidden xl:flex flex-col gap-8 items-end" aria-hidden="true">
      <div class="text-right">
        <div class="text-4xl font-black text-white leading-none">4000М</div>
        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Высота выброски
        </div>
      </div>
      <div class="text-right">
        <div class="text-4xl font-black text-white leading-none">200КМ/Ч</div>
        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Свободное падение
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none;
    opacity: 1;
  }
  
  .animate-pulse {
    animation: none;
  }
  
  .animate-gradient {
    animation: none;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
