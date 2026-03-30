<script setup lang="ts">
import { ref, computed } from 'vue'
import { heroContent } from '@/content'
import BaseButton from './BaseButton.vue'

const imageLoaded = ref(true)

const heroImageBase = computed(() => {
  // /images/home/hero-sky.jpg -> /images-cropped/home/hero-sky
  return heroContent.image.replace('/images/', '/images-cropped/').replace('.jpg', '')
})

const heroImageWebpSrcset = computed(() => {
  const base = heroImageBase.value
  return `${base}-sm.webp 400w, ${base}-md.webp 800w, ${base}-lg.webp 1280w, ${base}-xl.webp 1920w`
})

const heroImageJpegSrcset = computed(() => {
  const base = heroImageBase.value
  return `${base}-sm.jpg 400w, ${base}-md.jpg 800w, ${base}-lg.jpg 1280w, ${base}-xl.jpg 1920w`
})

const heroImageFallback = computed(() => {
  return `${heroImageBase.value}-original.jpg`
})

const scrollToFormats = () => {
  const element = document.getElementById('formats')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleImageError = () => {
  imageLoaded.value = false
}
</script>

<template>
  <section class="relative h-screen flex items-center overflow-hidden">
    <!-- Gradient fallback background -->
    <div
      v-if="!imageLoaded"
      class="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900"
      aria-hidden="true"
    />
    <!-- Image background -->
    <div v-else class="absolute inset-0 z-0" aria-hidden="true">
      <picture>
        <source :srcset="heroImageWebpSrcset" type="image/webp" sizes="100vw" />
        <img
          :src="heroImageFallback"
          :srcset="heroImageJpegSrcset"
          alt=""
          class="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          @error="handleImageError"
          sizes="100vw"
        />
      </picture>
    </div>

    <div class="relative z-10 w-full max-w-7xl mx-auto px-6">
      <div class="animate-fade-in-up max-w-xl">
        <div
          class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          {{ heroContent.badge }}
        </div>
        <h1
          class="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase italic"
          style="text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6)"
        >
          {{ heroContent.title }} <br />
          <span class="text-white">{{ heroContent.titleAccent }}</span>
        </h1>

        <p
          class="text-slate-100 text-base leading-[1.6] text-left border-l-2 border-white pl-4 mb-10 drop-shadow-md bg-slate-900/70 backdrop-blur-sm rounded-lg p-4 md:bg-transparent md:backdrop-blur-none md:rounded-none md:p-0 md:border-l-0"
        >
          {{ heroContent.description }}
        </p>

        <BaseButton color="orange" @click="scrollToFormats">
          {{ heroContent.primaryCta }}
        </BaseButton>
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
