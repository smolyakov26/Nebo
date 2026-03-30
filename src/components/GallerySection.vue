<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { galleryContent } from '@/content'
import { X, Camera, Video } from 'lucide-vue-next'

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const currentFilter = ref<string>(galleryContent.categories[0]?.value ?? 'all')
const modalIndex = ref<number>(-1)

onMounted(() => {
  if (sectionRef.value) {
    observer = new IntersectionObserver(
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
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})

const closeModal = () => {
  modalIndex.value = -1
}

const openModal = (index: number) => {
  modalIndex.value = index
}

const filteredMedia = computed(() => {
  return galleryContent.media.filter(
    (item) => currentFilter.value === 'all' || item.category === currentFilter.value,
  )
})

const featuredItem = computed(() => filteredMedia.value[0])
const gridItems = computed(() => filteredMedia.value.slice(1))
const currentModalItem = computed(() => {
  const idx = modalIndex.value
  if (idx < 0 || idx >= filteredMedia.value.length) return null
  return filteredMedia.value[idx]
})

const getImageWebp = (src: string) => {
  return src.replace('/images/', '/images-optimized/').replace('.jpg', '.webp')
}

const getImageJpeg = (src: string) => {
  return src.replace('/images/', '/images-optimized/')
}
</script>

<template>
  <section id="gallery" ref="sectionRef" class="py-20 bg-slate-950 relative overflow-hidden">
    <div
      class="absolute top-0 left-0 w-full h-full bg-grid opacity-5 pointer-events-none"
      aria-hidden="true"
    />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="text-center mb-12">
        <span class="text-sky-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">{{
          galleryContent.badge
        }}</span>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic leading-none">
          {{ galleryContent.title }} <br />
          <span class="text-slate-600">{{ galleryContent.titleAccent }}</span>
        </h2>
        <p class="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          {{ galleryContent.description }}
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          v-for="category in galleryContent.categories"
          :key="category.value"
          :class="[
            'px-4 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all duration-200',
            currentFilter === category.value
              ? 'bg-sky-600 text-white hover:bg-sky-500'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white',
          ]"
          @click="currentFilter = category.value"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Media Grid -->
      <div class="grid gap-6">
        <!-- Large Featured Item -->
        <div v-if="featuredItem" class="col-span-1 lg:col-span-2 group">
          <div
            class="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            @click="openModal(0)"
          >
            <picture v-if="featuredItem.type === 'image'">
              <source :srcset="getImageWebp(featuredItem.src)" type="image/webp" />
              <img
                :src="getImageJpeg(featuredItem.src)"
                :alt="featuredItem.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </picture>
            <div v-else class="w-full h-full bg-slate-900 flex items-center justify-center">
              <div class="relative">
                <Video class="w-8 h-8 text-sky-400 mb-2" />
                <h3 class="text-white text-[11px] font-bold">{{ featuredItem.title }}</h3>
              </div>
            </div>
            <div
              class="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="text-center">
                <div v-if="featuredItem.type === 'image'">
                  <Camera class="w-6 h-6 text-white mb-2" />
                  <p class="text-[10px] text-white">Посмотреть фото</p>
                </div>
                <div v-else>
                  <Video class="w-6 h-6 text-white mb-2" />
                  <p class="text-[10px] text-white">Посмотреть видео</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Regular Grid Items -->
        <div v-for="(item, index) in gridItems" :key="index" class="group">
          <div
            class="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            @click="openModal(index + 1)"
          >
            <picture v-if="item.type === 'image'">
              <source :srcset="getImageWebp(item.src)" type="image/webp" />
              <img
                :src="getImageJpeg(item.src)"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </picture>
            <div v-else class="w-full h-full bg-slate-900 flex items-center justify-center">
              <div class="relative">
                <Video class="w-8 h-8 text-sky-400 mb-2" />
                <h3 class="text-white text-[11px] font-bold">{{ item.title }}</h3>
              </div>
            </div>
            <div
              class="absolute inset-0 bg-slate-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div class="text-center">
                <div v-if="item.type === 'image'">
                  <Camera class="w-6 h-6 text-white mb-2" />
                  <p class="text-[10px] text-white">Посмотреть фото</p>
                </div>
                <div v-else>
                  <Video class="w-6 h-6 text-white mb-2" />
                  <p class="text-[10px] text-white">Посмотреть видео</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div
    v-if="currentModalItem"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
    @click="closeModal"
  >
    <div class="relative max-w-5xl max-h-[90vh] w-full p-4" @click.stop>
      <button
        @click="closeModal"
        class="absolute top-2 right-2 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 z-10"
      >
        <X class="w-5 h-5 text-white" />
      </button>
      <picture v-if="currentModalItem.type === 'image'">
        <source :srcset="getImageWebp(currentModalItem.src)" type="image/webp" />
        <img
          :src="getImageJpeg(currentModalItem.src)"
          :alt="currentModalItem.title"
          class="w-full h-full max-h-[85vh] object-contain rounded-xl"
        />
      </picture>
      <div v-else class="w-full h-64 bg-slate-800 rounded-xl flex items-center justify-center">
        <Video class="w-12 h-12 text-sky-400" />
      </div>
      <div class="text-center mt-4">
        <h3 class="text-white text-lg font-bold">{{ currentModalItem.title }}</h3>
        <p class="text-slate-400 text-sm">{{ currentModalItem.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .transition-opacity,
  .transition-transform {
    transition: none !important;
  }
}
</style>
