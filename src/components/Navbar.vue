<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Zap, Menu, X } from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { formatsContent } from '@/content/sections/formats'

const route = useRoute()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const mobileMenuId = 'mobile-menu'
const { openModal } = useBookingModal()

const isHomePage = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollToSection = (sectionId: string) => {
  closeMobileMenu()

  if (!isHomePage.value) {
    window.location.href = `/#${sectionId}`
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  closeMobileMenu()
  if (isHomePage.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.location.href = '/'
  }
}

const handleMobileCallback = () => {
  openModal('callback')
  closeMobileMenu()
}
</script>

<template>
  <nav
    :class="[
      'fixed top-4 left-4 right-4 z-50 transition-all duration-700 rounded-2xl',
      isScrolled
        ? 'bg-slate-950/90 backdrop-blur-xl py-4 border border-white/10 shadow-lg'
        : 'bg-slate-950/80 backdrop-blur-xl py-6 border border-white/5',
    ]"
    role="navigation"
    aria-label="Основная навигация"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <div class="flex items-center gap-12">
        <a
          href="/"
          class="text-2xl font-black tracking-tighter flex items-center gap-2 text-white focus-visible:outline-none"
          @click.prevent="scrollToTop"
        >
          <Zap class="w-6 h-6 fill-sky-500 text-sky-500" />
          <span>НЕБО-КАВКАЗА</span>
        </a>
        <div
          class="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400"
        >
          <RouterLink
            v-for="format in formatsContent.formats"
            :key="format.id"
            :to="format.route"
            class="hover:text-white transition-colors cursor-pointer focus-visible:text-white font-sans"
          >
            {{ format.title.split(' ')[0] }}
          </RouterLink>
          <RouterLink
            to="/training"
            @click="closeMobileMenu"
            class="hover:text-white transition-colors cursor-pointer focus-visible:text-white font-sans"
          >
            Обучение
          </RouterLink>
          <RouterLink
            to="/certificate"
            @click="closeMobileMenu"
            class="hover:text-white transition-colors cursor-pointer focus-visible:text-white font-sans"
          >
            Сертификат
          </RouterLink>
          <RouterLink
            to="/gallery"
            @click="closeMobileMenu"
            class="hover:text-white transition-colors cursor-pointer focus-visible:text-white font-sans"
          >
            Галерея
          </RouterLink>
          <a
            @click.prevent="scrollToSection('about')"
            class="hover:text-white cursor-pointer focus-visible:text-white text-left"
            role="menuitem"
          >
            О нас
          </a>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="handleMobileCallback"
          class="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          ОБРАТНЫЙ ЗВОНОК
        </button>
        <button
          class="lg:hidden min-w-11 min-h-11 text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-2 flex items-center justify-center"
          @click="toggleMobileMenu"
          :aria-expanded="mobileMenuOpen"
          :aria-controls="mobileMenuId"
          aria-label="Открыть меню"
        >
          <X v-if="mobileMenuOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        :id="mobileMenuId"
        class="lg:hidden mx-4 mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-lg"
        role="menu"
      >
        <div
          class="px-6 py-8 flex flex-col gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400"
        >
          <RouterLink
            v-for="format in formatsContent.formats"
            :key="format.id"
            :to="format.route"
            @click="closeMobileMenu"
            class="hover:text-white cursor-pointer focus-visible:text-white text-left"
            role="menuitem"
          >
            {{ format.title.split(' ')[0] }}
          </RouterLink>
          <RouterLink
            to="/training"
            @click="closeMobileMenu"
            class="hover:text-white cursor-pointer focus-visible:text-white text-left"
            role="menuitem"
          >
            Обучение
          </RouterLink>
          <RouterLink
            to="/certificate"
            @click="closeMobileMenu"
            class="hover:text-white cursor-pointer focus-visible:text-white text-left"
            role="menuitem"
          >
            Сертификат
          </RouterLink>
          <RouterLink
            to="/gallery"
            @click="closeMobileMenu"
            class="hover:text-white cursor-pointer focus-visible:text-white text-left"
            role="menuitem"
          >
            Галерея
          </RouterLink>
          <a
            href="#about"
            @click.prevent="scrollToSection('about')"
            class="hover:text-white cursor-pointer focus-visible:text-white text-left"
            role="menuitem"
          >
            О нас
          </a>
          <button
            @click="handleMobileCallback"
            class="bg-sky-600 text-white py-4 text-center cursor-pointer hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-full"
            role="menuitem"
          >
            ОБРАТНЫЙ ЗВОНОК
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none !important;
  }
}
</style>
