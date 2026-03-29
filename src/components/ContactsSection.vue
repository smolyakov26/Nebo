<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-vue-next'
import { useBookingModal } from '@/composables/useBookingModal'
import { contactsContent } from '@/content/sections/contacts'

const { openModal } = useBookingModal()

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const iconMap: Record<string, typeof MapPin> = {
  MapPin,
  Phone,
  Mail,
  Clock,
}

const contacts = [
  { icon: 'MapPin', label: 'Адрес', value: contactsContent.address },
  {
    icon: 'Phone',
    label: 'Телефон',
    value: contactsContent.phone,
    href: `tel:${contactsContent.phone.replace(/\s/g, '')}`,
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: contactsContent.email,
    href: `mailto:${contactsContent.email}`,
  },
  { icon: 'Clock', label: 'Режим работы', value: contactsContent.hours },
]

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
</script>

<template>
  <section id="contacts" ref="sectionRef" class="py-32 bg-slate-900 relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-grid opacity-10 pointer-events-none" />

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <span class="text-sky-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">{{
          contactsContent.badge
        }}</span>
        <h2 class="text-5xl md:text-6xl font-black text-white uppercase italic leading-none">
          {{ contactsContent.title }}
          <span class="text-slate-600">{{ contactsContent.titleAccent }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div :class="['space-y-6', isVisible ? 'animate-slide-in-left' : 'opacity-0']">
          <div class="bg-slate-950/50 border border-white/10 rounded-2xl p-8 space-y-6">
            <div v-for="(contact, idx) in contacts" :key="idx" class="flex items-start gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-sky-600/20 flex items-center justify-center shrink-0"
              >
                <component :is="iconMap[contact.icon]" class="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <div class="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {{ contact.label }}
                </div>
                <a
                  v-if="contact.href"
                  :href="contact.href"
                  class="text-white hover:text-sky-400 transition-colors cursor-pointer"
                >
                  {{ contact.value }}
                </a>
                <div v-else class="text-white">{{ contact.value }}</div>
              </div>
            </div>
          </div>

          <button
            @click="openModal('tandem')"
            class="w-full bg-sky-600 hover:bg-sky-500 text-white py-5 text-[11px] font-black uppercase tracking-widest transition-colors rounded-xl flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <Send class="w-5 h-5" />
            {{ contactsContent.cta }}
          </button>

          <div class="hidden md:flex justify-center gap-4">
            <a
              v-for="social in contactsContent.socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              class="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <span class="text-sm font-bold text-white">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <div
          :class="[
            'rounded-2xl overflow-hidden border border-white/10 shadow-xl h-[400px] lg:h-[500px]',
            isVisible ? 'animate-slide-in-right' : 'opacity-0',
          ]"
        >
          <iframe
            :src="contactsContent.mapUrl"
            width="100%"
            height="100%"
            style="border: 0; background: #1e293b"
            title="Карта NEBO-KMV"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-slide-in-left,
  .animate-slide-in-right {
    animation: none;
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
